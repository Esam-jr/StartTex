import { Module } from '@nestjs/common';
import { ReviewerController } from './reviewer.controller';
import { ReviewerService } from './reviewer.service';

@Module({
  controllers: [ReviewerController],
  providers: [ReviewerService]
})
export class ReviewerModule {}
