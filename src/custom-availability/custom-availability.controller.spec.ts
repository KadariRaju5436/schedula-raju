import { Test, TestingModule } from '@nestjs/testing';
import { CustomAvailabilityController } from './custom-availability.controller';

describe('CustomAvailabilityController', () => {
  let controller: CustomAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomAvailabilityController],
    }).compile();

    controller = module.get<CustomAvailabilityController>(CustomAvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
