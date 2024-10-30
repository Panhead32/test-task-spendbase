import { Injectable } from '@nestjs/common';
import { WeatherAPIGateway } from 'src/gateways';
import { WeatherServiceTypes } from './types/weather.service.types'
import { WeatherRepository } from './weather.repository';

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

  get(getWeatherDto: WeatherServiceTypes.Get.Parameters): WeatherServiceTypes.Get.ReturnType {
    return this._weatherRepository.findOne({ where: getWeatherDto });
  }

}
