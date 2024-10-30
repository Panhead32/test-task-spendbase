import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetWeatherDto {
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    lon: number;

    @IsString()
    @IsOptional()
    part?: string;
}



