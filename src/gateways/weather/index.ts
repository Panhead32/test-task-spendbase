import axios, { AxiosInstance } from 'axios';
import { WeatherAPITypes } from './types';

export class WeatherAPIGateway {
    constructor(private axiosInstance: AxiosInstance) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
            params: {
                appid: process.env.WEATHER_API_KEY,
            }
        });
    }

    public async getWeather(params: WeatherAPITypes.GetWeather.Params): WeatherAPITypes.GetWeather.ReturnType {
        const { data } = await this.axiosInstance.get<WeatherAPITypes.GetWeather.ReturnType>('', { params });
        return data;
    }
}