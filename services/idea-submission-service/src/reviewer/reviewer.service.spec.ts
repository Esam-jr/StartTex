import { Test, TestingModule } from '@nestjs/testing';
import { ReviewerService } from './reviewer.service';

describe('ReviewerService', () => {
  let service: ReviewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewerService],
    }).compile();

    service = module.get<ReviewerService>(ReviewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
