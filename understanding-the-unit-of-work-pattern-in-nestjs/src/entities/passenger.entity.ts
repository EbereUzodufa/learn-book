import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FlightBooking } from './flight-booking.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => FlightBooking, (booking) => booking.passengers)
  booking: FlightBooking;
}
