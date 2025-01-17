import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FlightBooking } from './flight-booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  paymentStatus: string;

  @ManyToOne(() => FlightBooking, (booking) => booking.payments)
  booking: FlightBooking;
}
