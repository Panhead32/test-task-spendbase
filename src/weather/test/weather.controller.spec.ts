import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../weather.controller';
import { WeatherService } from '../weather.service';
import { CreateWeatherDto } from '../dto/create-weather.dto';
import { GetWeatherDto } from '../dto/get-weather.dto';
import { weatherResponse } from './mock/weather.mock';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call WeatherService.create with correct parameters', () => {
      const createWeatherDto: CreateWeatherDto = { lat: 40.7128, lon: 74.0060 };

      controller.create(createWeatherDto);
      expect(service.create).toHaveBeenCalledWith(createWeatherDto);
    });

    it('should return the result of WeatherService.create', async () => {
      const createWeatherDto: CreateWeatherDto = { lat: 40.7128, lon: 74.0060 };

      const result = { ...weatherResponse };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      const controllerResult = await controller.create(createWeatherDto);
      expect(controllerResult).toBe(result);
    });
  });

  describe('get', () => {
    it('should call WeatherService.get with correct parameters', () => {
      const getWeatherDto: GetWeatherDto = { lat: 40.7128, lon: 74.0060 };

      controller.get(getWeatherDto);
      expect(service.get).toHaveBeenCalledWith(getWeatherDto);
    });

    it('should return the result of WeatherService.get', async () => {
      const getWeatherDto: GetWeatherDto = { lat: 40.7128, lon: 74.0060 };

      const result = { ...weatherResponse };
      jest.spyOn(service, 'get').mockResolvedValue(result);

      const controllerResult = await controller.get(getWeatherDto);
      expect(controllerResult).toBe(result);
    });

    it('should return the result of WeatherService.get without hourly property', async () => {
      const getWeatherDto: GetWeatherDto = { lat: 40.7128, lon: 74.0060, exclude: 'hourly' };

      const result = { ...weatherResponse };
      const { hourly, ...expectedResponse } = result;
      jest.spyOn(service, 'get').mockResolvedValue(expectedResponse);

      const controllerResult = await controller.get(getWeatherDto);
      expect(controllerResult).toBe(expectedResponse);
    });

    it('should return the result of WeatherService.get without hourly and daily property', async () => {
      const getWeatherDto: GetWeatherDto = { lat: 40.7128, lon: 74.0060, exclude: 'hourly,daily' };

      const result = { ...weatherResponse };
      const { hourly, daily, ...expectedResponse } = result;
      jest.spyOn(service, 'get').mockResolvedValue(expectedResponse);


      const controllerResult = await controller.get(getWeatherDto);
      expect(controllerResult).toBe(expectedResponse);
    });
  });
});
