import { Controller, Post } from '@nestjs/common';
import { BookFlightRequestDto } from 'src/flight-booking/dtos/request.dto';
import { FlightBookingService } from 'src/flight-booking/services/flight-booking.service';

@Controller('flight-booking')
export class FlightBookingController {
  constructor(private readonly flightBookingService: FlightBookingService) {}

  @Post('with-uow')
  async bookFlightWithUoW(request: BookFlightRequestDto) {
    return await this.flightBookingService.bookFlightWithUoW(request);
  }

  @Post('without-uow')
  async bookFlightWithoutUoW(request: BookFlightRequestDto) {
    return await this.flightBookingService.bookFlightWithoutUoW(request);
  }
}
