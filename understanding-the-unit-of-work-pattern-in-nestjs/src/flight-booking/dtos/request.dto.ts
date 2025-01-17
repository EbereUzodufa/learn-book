import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

class FlightBookingRequestDto {
  @IsNotEmpty()
  @IsString()
  flightNumber: string;

  @IsNotEmpty()
  @IsDate()
  departureDate: Date;
}

class PassengerRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class PaymentRequestDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentStatus: string;
}

export class BookFlightRequestDto {
  bookingData: FlightBookingRequestDto;
  passengerData: PassengerRequestDto;
  paymentData: PaymentRequestDto;
}
