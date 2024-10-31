import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather.service';
import { WeatherAPIGateway } from '../../gateways';
import { WeatherRepository } from '../weather.repository';
import { WeatherServiceTypes } from '../types/weather.service.types';
import { OneCallResponse } from 'src/types/weather-api.types';
import { weatherResponse } from './mock/weather.mock';
import { Weather } from '../entities/weather.entity';

describe('WeatherService', () => {
  let service: WeatherService;
  let weatherRepository: WeatherRepository;
  let weatherApiGateway: WeatherAPIGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: WeatherRepository,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: WeatherAPIGateway,
          useValue: {
            getWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    weatherRepository = module.get<WeatherRepository>(WeatherRepository);
    weatherApiGateway = module.get<WeatherAPIGateway>(WeatherAPIGateway);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should fetch weather and save it', async () => {
      const createWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060 };
      const fetchedWeather: OneCallResponse = { ...weatherResponse };
      const savedWeather: Weather = { id: 1, ...fetchedWeather };

      jest.spyOn(weatherApiGateway, 'getWeather').mockResolvedValue(fetchedWeather);
      jest.spyOn(weatherRepository, 'save').mockResolvedValue(savedWeather);

      const result = await service.create(createWeatherDto);

      expect(weatherApiGateway.getWeather).toHaveBeenCalledWith(createWeatherDto);
      expect(weatherRepository.save).toHaveBeenCalledWith(fetchedWeather);
      expect(result).toEqual(savedWeather);
    });

    it('should fetch weather and save it without hourly property', async () => {
      const createWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060, exclude: 'hourly' };
      const { hourly, ...fetchedWeather }: OneCallResponse = { ...weatherResponse };
      const savedWeather: Weather = { id: 1, ...fetchedWeather };

      jest.spyOn(weatherApiGateway, 'getWeather').mockResolvedValue(fetchedWeather);
      jest.spyOn(weatherRepository, 'save').mockResolvedValue(savedWeather);

      const result = await service.create(createWeatherDto);

      expect(weatherApiGateway.getWeather).toHaveBeenCalledWith(createWeatherDto);
      expect(weatherRepository.save).toHaveBeenCalledWith(fetchedWeather);
      expect(result).toEqual(savedWeather);
    });

    it('should fetch weather and save it without daily property', async () => {
      const createWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060, exclude: 'daily' };
      const { daily, ...fetchedWeather }: OneCallResponse = { ...weatherResponse };
      const savedWeather: Weather = { id: 1, ...fetchedWeather };

      jest.spyOn(weatherApiGateway, 'getWeather').mockResolvedValue(fetchedWeather);
      jest.spyOn(weatherRepository, 'save').mockResolvedValue(savedWeather);

      const result = await service.create(createWeatherDto);

      expect(weatherApiGateway.getWeather).toHaveBeenCalledWith(createWeatherDto);
      expect(weatherRepository.save).toHaveBeenCalledWith(fetchedWeather);
      expect(result).toEqual(savedWeather);
    });

    it('should fetch weather and save it without hourly and daily property', async () => {
      const createWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060, exclude: 'hourly,daily' };
      const { daily, hourly, ...fetchedWeather }: OneCallResponse = { ...weatherResponse };
      const savedWeather: Weather = { id: 1, ...fetchedWeather };

      jest.spyOn(weatherApiGateway, 'getWeather').mockResolvedValue(fetchedWeather);
      jest.spyOn(weatherRepository, 'save').mockResolvedValue(savedWeather);

      const result = await service.create(createWeatherDto);

      expect(weatherApiGateway.getWeather).toHaveBeenCalledWith(createWeatherDto);
      expect(weatherRepository.save).toHaveBeenCalledWith(fetchedWeather);
      expect(result).toEqual(savedWeather);
    });
  });

  describe('get', () => {
    it('should return weather data', async () => {
      const getWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060 };
      const weatherData: OneCallResponse = { ...weatherResponse };
      const foundWeather: Weather = { id: 1, ...weatherData };

      jest.spyOn(weatherRepository, 'findOne').mockResolvedValue(foundWeather);

      const result = await service.get(getWeatherDto);

      expect(weatherRepository.findOne).toHaveBeenCalledWith({
        where: getWeatherDto,
        select: [
          'lat',
          'lon',
          'timezone',
          'timezone_offset',
          'current',
          'daily',
          'hourly',
          'alerts',
          'minutely',
        ],
      });
      expect(result).toEqual(foundWeather);
    });

    it('should return weather data without hourly property', async () => {
      const getWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060, exclude: 'hourly' };
      const weatherData: OneCallResponse = { ...weatherResponse };
      const foundWeather: Weather = { id: 1, ...weatherData };

      jest.spyOn(weatherRepository, 'findOne').mockResolvedValue(foundWeather);

      const result = await service.get(getWeatherDto);

      const { exclude, ...where } = getWeatherDto;

      expect(weatherRepository.findOne).toHaveBeenCalledWith({
        where,
        select: [
          'lat',
          'lon',
          'timezone',
          'timezone_offset',
          'current',
          'daily',
          'alerts',
          'minutely',
        ],
      });
      expect(result).toEqual(foundWeather);
    });

    it('should return weather data without hourly and daily property', async () => {
      const getWeatherDto: WeatherServiceTypes.Create.Parameters = { lat: 40.7128, lon: 74.0060, exclude: 'hourly,daily' };
      const weatherData: OneCallResponse = { ...weatherResponse };
      const foundWeather: Weather = { id: 1, ...weatherData };

      jest.spyOn(weatherRepository, 'findOne').mockResolvedValue(foundWeather);

      const result = await service.get(getWeatherDto);

      const { exclude, ...where } = getWeatherDto;

      expect(weatherRepository.findOne).toHaveBeenCalledWith({
        where,
        select: [
          'lat',
          'lon',
          'timezone',
          'timezone_offset',
          'current',
          'alerts',
          'minutely',
        ],
      });
      expect(result).toEqual(foundWeather);
    });
  });
});
