import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherControllerTypes } from './types/weather.controller.types'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto): WeatherControllerTypes.Create.ReturnType {
    return this.weatherService.create(createWeatherDto);
  }

  @Get()
  get(@Query() getWeatherDto: GetWeatherDto): WeatherControllerTypes.Get.ReturnType {
    return this.weatherService.get(getWeatherDto);
  }
}
