import { OneCallResponse } from "src/types/weather-api.types";

export namespace WeatherAPITypes {
    export namespace GetWeather {
        export type Params = {
            lat: number;
            lon: number;
            exclude?: string;
        };

        export type Response = OneCallResponse;

        export type ReturnType = Promise<OneCallResponse>
    }
}
