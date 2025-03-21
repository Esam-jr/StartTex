import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get("JWT_SECRET") || "test-secret",
            signOptions: { expiresIn: "1h" },
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("OAuth Endpoints", () => {
    describe("Google Auth", () => {
      it("should initiate Google OAuth flow", async () => {
        const result = await controller.googleAuth();
        expect(result).toBeUndefined();
      });

      it("should handle Google OAuth callback", async () => {
        const mockUser = { id: "1", email: "test@example.com" };
        const mockToken = { access_token: "mock-token" };
        mockAuthService.login.mockResolvedValue(mockToken);

        const result = await controller.googleAuthCallback({ user: mockUser });

        expect(result).toEqual(mockToken);
        expect(authService.login).toHaveBeenCalledWith(mockUser);
      });
    });

    describe("GitHub Auth", () => {
      it("should initiate GitHub OAuth flow", async () => {
        const result = await controller.githubAuth();
        expect(result).toBeUndefined();
      });

      it("should handle GitHub OAuth callback", async () => {
        const mockUser = { id: "1", email: "test@example.com" };
        const mockToken = { access_token: "mock-token" };
        mockAuthService.login.mockResolvedValue(mockToken);

        const result = await controller.githubAuthCallback({ user: mockUser });

        expect(result).toEqual(mockToken);
        expect(authService.login).toHaveBeenCalledWith(mockUser);
      });
    });

    describe("LinkedIn Auth", () => {
      it("should initiate LinkedIn OAuth flow", async () => {
        const result = await controller.linkedinAuth();
        expect(result).toBeUndefined();
      });

      it("should handle LinkedIn OAuth callback", async () => {
        const mockUser = { id: "1", email: "test@example.com" };
        const mockToken = { access_token: "mock-token" };
        mockAuthService.login.mockResolvedValue(mockToken);

        const result = await controller.linkedinAuthCallback({
          user: mockUser,
        });

        expect(result).toEqual(mockToken);
        expect(authService.login).toHaveBeenCalledWith(mockUser);
      });
    });
  });

  describe("logout", () => {
    it("should successfully logout user", async () => {
      const mockUser = { id: "1" };
      mockAuthService.logout.mockResolvedValue(true);

      const result = await controller.logout({ user: mockUser });

      expect(result).toBe(true);
      expect(authService.logout).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
