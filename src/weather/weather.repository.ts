import { DataSource, Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherRepository extends Repository<Weather> {
    constructor(
        private _weatherRepository: DataSource,
    ) {
        super(Weather, _weatherRepository.createEntityManager());
    }
}