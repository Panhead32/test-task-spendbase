import { OneCallResponse } from "src/types/weather-api.types"

export namespace WeatherControllerTypes {

    export namespace Create {
        export type ReturnType = Promise<OneCallResponse>

    }

    export namespace Get {
        export type ReturnType = Promise<OneCallResponse>

    }

}