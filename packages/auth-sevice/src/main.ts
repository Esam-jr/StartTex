import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Auth Microservice")
    .setDescription("Authentication and User Management API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(4000);
}
bootstrap();
