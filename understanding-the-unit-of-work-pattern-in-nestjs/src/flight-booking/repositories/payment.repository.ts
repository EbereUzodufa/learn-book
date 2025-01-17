import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';

export class PaymentRepository extends Repository<Payment> {}
