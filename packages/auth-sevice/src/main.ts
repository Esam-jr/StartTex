import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Update CORS configuration to work with Render
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://starttex.onrender.com",
      "https://starttex.onrender.com/api",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Add session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
      name: "starttex.sid",
    })
  );

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Auth Microservice")
    .setDescription("Authentication and User Management API")
    .setVersion("1.0")
    .addTag("auth", "Authentication endpoints")
    .addTag("users", "User management endpoints")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token",
      },
      "JWT-auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Use PORT from environment variable or default to 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
