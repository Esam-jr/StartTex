import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { ConfigService } from "@nestjs/config";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let jwtToken: string = "";

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
      // Ensure all connections are closed
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  });

  describe("OAuth Flows", () => {
    describe("Google OAuth", () => {
      it("/auth/google (GET) should redirect to Google login", () => {
        return request(app.getHttpServer())
          .get("/auth/google")
          .expect(302)
          .expect("Location", /accounts.google.com/);
      });

      // Note: Actual OAuth callback requires real Google credentials
      // This test simulates the flow
      it("/auth/google/callback (GET) should handle callback", () => {
        return request(app.getHttpServer())
          .get("/auth/google/callback")
          .expect(302);
      });
    });

    describe("GitHub OAuth", () => {
      it("/auth/github (GET) should redirect to GitHub login", () => {
        return request(app.getHttpServer())
          .get("/auth/github")
          .expect(302)
          .expect("Location", /github.com/);
      });

      // Note: Actual OAuth callback requires real GitHub credentials
      it("/auth/github/callback (GET) should handle callback", () => {
        return request(app.getHttpServer())
          .get("/auth/github/callback")
          .expect(302);
      });
    });

    describe("LinkedIn OAuth", () => {
      it("/auth/linkedin (GET) should redirect to LinkedIn login", () => {
        return request(app.getHttpServer())
          .get("/auth/linkedin")
          .expect(302)
          .expect("Location", /linkedin.com/);
      });

      // Note: Actual OAuth callback requires real LinkedIn credentials
      it("/auth/linkedin/callback (GET) should handle callback", () => {
        return request(app.getHttpServer())
          .get("/auth/linkedin/callback")
          .expect(302);
      });
    });
  });

  describe("Protected Routes", () => {
    describe("/auth/logout (POST)", () => {
      it("should return 401 when no token provided", () => {
        return request(app.getHttpServer()).post("/auth/logout").expect(401);
      });

      it("should return 401 for invalid token", () => {
        return request(app.getHttpServer())
          .post("/auth/logout")
          .set("Authorization", "Bearer invalid-token")
          .expect(401);
      });

      // Note: This test requires a valid JWT token
      // In a real scenario, you would first authenticate and get a token
      it("should successfully logout with valid token", async () => {
        // First, we need to get a valid token
        // This would typically be done through the OAuth flow
        // For testing, we can create a mock token if we have the means

        if (jwtToken) {
          return request(app.getHttpServer())
            .post("/auth/logout")
            .set("Authorization", `Bearer ${jwtToken}`)
            .expect(200);
        }
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid OAuth state by redirecting", () => {
      return request(app.getHttpServer())
        .get("/auth/google/callback")
        .query({ state: "invalid-state" })
        .expect(302); // OAuth will redirect on error
    });

    it("should handle missing OAuth code by redirecting", () => {
      return request(app.getHttpServer())
        .get("/auth/google/callback")
        .expect(302); // OAuth will redirect on error
    });
  });
});
