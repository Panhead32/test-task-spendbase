import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    WeatherModule,
  ],
})
export class AppModule { }
