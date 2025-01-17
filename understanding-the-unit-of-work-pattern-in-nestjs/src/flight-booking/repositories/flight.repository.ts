import { Repository } from 'typeorm';
import { FlightBooking } from '../../entities/flight-booking.entity';

export class FlightBookingRepository extends Repository<FlightBooking> {}
