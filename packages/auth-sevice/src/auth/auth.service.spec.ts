import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Role } from "../common/enums/role.enum";

describe("AuthService", () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByProviderAndProviderId: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("validateOAuthUser", () => {
    const mockProfile = {
      id: "123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
    };

    it("should find existing user by provider and provider_id", async () => {
      const mockUser = { id: "1", ...mockProfile };
      mockUsersService.findByProviderAndProviderId.mockResolvedValue(mockUser);

      const result = await service.validateOAuthUser(mockProfile, "google");

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findByProviderAndProviderId).toHaveBeenCalledWith(
        "google",
        "123"
      );
    });

    it("should find existing user by email and update provider info", async () => {
      const mockUser = { id: "123", ...mockProfile };
      mockUsersService.findByProviderAndProviderId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.update.mockResolvedValue({
        ...mockUser,
        provider: "google",
        provider_id: "123",
      });

      const result = await service.validateOAuthUser(mockProfile, "google");

      expect(result).toEqual({
        ...mockUser,
        provider: "google",
        provider_id: "123",
      });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockUsersService.update).toHaveBeenCalledWith("123", {
        provider: "google",
        provider_id: "123",
      });
    });

    it("should create new user if not found", async () => {
      const mockNewUser = {
        id: "1",
        ...mockProfile,
        provider: "google",
        provider_id: "123",
        roles: [Role.ENTREPRENEUR],
      };
      mockUsersService.findByProviderAndProviderId.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockNewUser);

      const result = await service.validateOAuthUser(mockProfile, "google");

      expect(result).toEqual(mockNewUser);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: "test@example.com",
        provider: "google",
        provider_id: "123",
        first_name: "John",
        last_name: "Doe",
        roles: [Role.ENTREPRENEUR],
      });
    });

    it("should handle errors during user validation", async () => {
      mockUsersService.findByProviderAndProviderId.mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        service.validateOAuthUser(mockProfile, "google")
      ).rejects.toThrow("Database error");
    });
  });

  describe("login", () => {
    const mockUser = {
      id: "1",
      email: "test@example.com",
      roles: [Role.ENTREPRENEUR],
    };

    it("should generate JWT token for valid user", async () => {
      const mockToken = "jwt-token";
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(mockUser);

      expect(result).toEqual({ access_token: mockToken });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        roles: mockUser.roles,
      });
    });
  });

  describe("logout", () => {
    it("should successfully logout user", async () => {
      const result = await service.logout("1");
      expect(result).toBe(true);
    });
  });
});
