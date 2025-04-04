import { Module } from "@nestjs/common";
import { IdeaModule } from "./idea/idea.module"; // Import Idea Module
import { ReviewerModule } from "./reviewer/reviewer.module"; // Import Reviewer Module
import { EvaluationModule } from "./evaluation/evaluation.module"; // Import Evaluation Module
import { ConfigModule } from "@nestjs/config"; // Import ConfigModule if you need config support

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the configuration available globally
    }),
    IdeaModule, // Add IdeasModule here
    ReviewerModule, // Add ReviewersModule here
    EvaluationModule, // Add EvaluationsModule here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
