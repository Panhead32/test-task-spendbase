import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWeatherDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    lon: number;

    @IsString()
    @IsOptional()
    exclude?: string;
}


