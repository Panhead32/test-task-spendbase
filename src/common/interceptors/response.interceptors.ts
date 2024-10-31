import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ResponseInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map(({ current }) => {
                const res = {
                    "sunrise": current.sunrise,
                    "sunset": current.sunset,
                    "temp": current.temp,
                    "feels_like": current.feels_like,
                    "pressure": current.pressure,
                    "humidity": current.humidity,
                    "uvi": current.uvi,
                    "wind_speed": current.wind_speed
                };
                return res;
            }),
        );
    }
}