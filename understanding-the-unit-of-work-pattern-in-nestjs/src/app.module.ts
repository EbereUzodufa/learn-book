import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import connectionOptions from './configs/orm.config';
import { FlightBookingModule } from './flight-booking/flight-booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connectionOptions,
    }),
    FlightBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
