import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookFlightRequestDto } from 'src/flight-booking/dtos/request.dto';
import { FlightBookingRepository } from 'src/flight-booking/repositories/flight.repository';
import { DeepPartial } from 'typeorm';
import { FlightBooking } from '../../entities/flight-booking.entity';
import { Passenger } from '../../entities/passenger.entity';
import { Payment } from '../../entities/payment.entity';
import { PassengerRepository } from '../repositories/passenger.repository';
import { PaymentRepository } from '../repositories/payment.repository';
import { UnitOfWorkService } from './unit-of-work.service';

@Injectable()
export class FlightBookingService {
  constructor(
    @InjectRepository(FlightBookingRepository)
    private readonly flightBookingRepository: FlightBookingRepository,
    @InjectRepository(PassengerRepository)
    private readonly passengerRepository: PassengerRepository,
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly unitOfWork: UnitOfWorkService,
  ) {}

  async bookFlightWithoutUoW(
    request: BookFlightRequestDto,
  ): Promise<FlightBooking> {
    try {
      const { bookingData, passengerData, paymentData } = request;
      // Step 1: Reserve the flight
      const newBookingEntity: DeepPartial<FlightBooking> = new FlightBooking();
      newBookingEntity.flightNumber = bookingData.flightNumber;
      newBookingEntity.departureDate = bookingData.departureDate;
      const booking = await this.flightBookingRepository.save(newBookingEntity);

      // Step 2: Save passenger details
      const newPassengerEntity: DeepPartial<Passenger> = new Passenger();
      newPassengerEntity.name = passengerData.name;
      newPassengerEntity.email = passengerData.email;
      newPassengerEntity.booking = booking;
      await this.passengerRepository.save(newPassengerEntity);

      // Step 3: Process payment
      const payment = { ...paymentData, booking };
      const newPaymentEntity: DeepPartial<Payment> = new Payment();
      newPaymentEntity.amount = paymentData.amount;
      newPaymentEntity.paymentStatus = paymentData.paymentStatus;
      newPaymentEntity.booking = booking;
      await this.paymentRepository.save(payment);

      return booking;
    } catch (error) {
      console.error('Error during booking:', error.message);
      throw error;
    }
  }

  async bookFlightWithUoW(
    request: BookFlightRequestDto,
  ): Promise<FlightBooking> {
    const { bookingData, passengerData, paymentData } = request;

    await this.unitOfWork.startTransaction();
    try {
      // Step 1: Reserve the flight
      const booking = await this.unitOfWork.getManager().save(FlightBooking, {
        flightNumber: bookingData.flightNumber,
        departureDate: bookingData.departureDate,
      });

      // Step 2: Save passenger details
      await this.unitOfWork.getManager().save(Passenger, {
        name: passengerData.name,
        email: passengerData.email,
        booking: booking,
      });

      // Step 3: Process payment
      await this.unitOfWork.getManager().save(Payment, {
        amount: paymentData.amount,
        paymentStatus: paymentData.paymentStatus,
        booking: booking,
      });

      // Commit the transaction
      await this.unitOfWork.commitTransaction();
      return booking;
    } catch (error) {
      // Rollback the transaction if anything fails
      await this.unitOfWork.rollbackTransaction();
      throw new Error('Flight booking failed: ' + error.message);
    } finally {
      // Release the transaction resources
      await this.unitOfWork.release();
    }
  }
}
