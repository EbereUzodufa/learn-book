import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightBookingController } from './controllers/flight-booking/flight-booking.controller';
import { FlightBookingRepository } from './repositories/flight.repository';
import { PassengerRepository } from './repositories/passenger.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { FlightBookingService } from './services/flight-booking.service';
import { UnitOfWorkService } from './services/unit-of-work.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FlightBookingRepository,
      PassengerRepository,
      PaymentRepository,
    ]),
  ],
  controllers: [FlightBookingController],
  providers: [UnitOfWorkService, FlightBookingService],
})
export class FlightBookingModule {}
