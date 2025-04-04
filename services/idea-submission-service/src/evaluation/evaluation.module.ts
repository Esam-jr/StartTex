import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService]
})
export class EvaluationModule {}
