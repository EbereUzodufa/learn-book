import { Repository } from 'typeorm';
import { Passenger } from '../../entities/passenger.entity';

export class PassengerRepository extends Repository<Passenger> {}
