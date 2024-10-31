import { Injectable } from '@nestjs/common';
import { WeatherAPIGateway } from '../gateways';
import { WeatherServiceTypes } from './types/weather.service.types'
import { WeatherRepository } from './weather.repository';
import { Weather } from './entities/weather.entity';
import { OneCallResponse } from 'src/types/weather-api.types';

@Injectable()
export class WeatherService {
  constructor(
    private readonly _weatherRepository: WeatherRepository,
    private readonly _weatherApiGateway: WeatherAPIGateway
  ) { }


  async create(createWeatherDto: WeatherServiceTypes.Create.Parameters): WeatherServiceTypes.Create.ReturnType {
    const fetchedWeather = await this._weatherApiGateway.getWeather(createWeatherDto);
    return this._weatherRepository.save(fetchedWeather);
  }

  async get({ exclude, ...where }: WeatherServiceTypes.Get.Parameters): WeatherServiceTypes.Get.ReturnType {
    const oneCallResponse: OneCallResponse = {
      lat: undefined,
      lon: undefined,
      timezone: undefined,
      timezone_offset: undefined,
      current: undefined,
      daily: undefined,
      hourly: undefined,
      alerts: undefined,
      minutely: undefined
    }

    const fieldsToExclude = exclude ? exclude.split(',') : '';
    const oneCallResponseFields = Object.keys(oneCallResponse);
    const select = oneCallResponseFields.filter(field => !fieldsToExclude.includes(field)) as (keyof Weather)[];

    return this._weatherRepository.findOne({ where, select });
  }

}
