import { Test, TestingModule } from '@nestjs/testing';
import { ReviewerController } from './reviewer.controller';

describe('ReviewerController', () => {
  let controller: ReviewerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewerController],
    }).compile();

    controller = module.get<ReviewerController>(ReviewerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
