import { WeatherAPITypes } from "src/gateways/weather/types"
import { OneCallResponse } from "src/types/weather-api.types"

export namespace WeatherServiceTypes {

    export namespace Create {
        export type Parameters = WeatherAPITypes.GetWeather.Params

        export type ReturnType = WeatherAPITypes.GetWeather.ReturnType
    }

    export namespace Get {
        export type Parameters = WeatherAPITypes.GetWeather.Params

        export type ReturnType = Promise<OneCallResponse | null>
    }

}