import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OneCallResponse } from 'src/types/weather-api.types';

export class WeatherResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: OneCallResponse) => {
                return Object.entries(data).filter(([, value]) => value).reduce((acc, [key, value]) => {
                    switch (key) {
                        case 'minutely':
                            return { ...acc, [key]: value };
                        case 'current':
                            return { ...acc, [key]: this._curentWeatherMapper(value) }
                        default:
                            const isArray = Array.isArray(value);

                            if (isArray) {
                                const mappedArray = value.map((data) => this._curentWeatherMapper(data))
                                return { ...acc, [key]: mappedArray }
                            }

                            return acc
                    }
                }, {})
            })
        )
    }

    private _curentWeatherMapper(current: any) {
        return {
            sunrise: current.sunrise,
            sunset: current.sunset,
            temp: current.temp,
            feels_like: current.feels_like,
            pressure: current.pressure,
            humidity: current.humidity,
            uvi: current.uvi,
            wind_speed: current.wind_speed
        }
    }
}