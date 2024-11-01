import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OneCallResponse, CurrentWeather, Minutely, Hourly, Daily, Alert } from 'src/types/weather-api.types';

@Entity()
export class Weather implements OneCallResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lat: number;

    @Column()
    lon: number;

    @Column()
    timezone: string;

    @Column()
    timezone_offset: number;

    @Column('json', { nullable: true, })
    current?: CurrentWeather;

    @Column('json', { nullable: true, })
    minutely?: Minutely[];

    @Column('json', { nullable: true, })
    hourly?: Hourly[];

    @Column('json', { nullable: true, })
    daily?: Daily[];

    @Column('json', { nullable: true })
    alerts?: Alert[];
}
