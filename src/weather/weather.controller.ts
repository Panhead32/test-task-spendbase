import { Controller, Get, Post, Body, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherControllerTypes } from './types/weather.controller.types'
import { WeatherResponseInterceptor } from '../common/interceptors/response.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Post()
  async create(@Body() createWeatherDto: CreateWeatherDto): WeatherControllerTypes.Create.ReturnType {
    return this.weatherService.create(createWeatherDto);
  }

  @Get()
  @UseInterceptors(WeatherResponseInterceptor)
  async get(@Query() getWeatherDto: GetWeatherDto): WeatherControllerTypes.Get.ReturnType {
    return this.weatherService.get(getWeatherDto);
  }
}
