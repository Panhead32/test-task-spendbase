import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherAPIGateway } from 'src/gateways';
import { WeatherRepository } from './weather.repository';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherRepository, WeatherAPIGateway],
})
export class WeatherModule { }
