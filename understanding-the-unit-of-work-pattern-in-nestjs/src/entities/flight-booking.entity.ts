import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Passenger } from './passenger.entity';
import { Payment } from './payment.entity';

@Entity()
export class FlightBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNumber: string;

  @Column()
  departureDate: Date;

  @OneToMany(() => Passenger, (passenger) => passenger.booking)
  passengers: Passenger[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
