import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { Role } from "../common/enums/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateOAuthUser(profile: any, provider: string) {
    try {
      // First try to find the user by provider ID
      let user = await this.usersService.findByProviderAndProviderId(
        provider,
        profile.id
      );

      if (!user) {
        // If not found by provider ID, try by email
        user = await this.usersService.findByEmail(profile.email);

        if (user) {
          // If user exists with email but different provider, update provider info
          user = await this.usersService.update(user.id, {
            provider,
            provider_id: profile.id,
          });
        } else {
          // Create new user if doesn't exist
          user = await this.usersService.create({
            email: profile.email,
            provider,
            provider_id: profile.id,
            first_name: profile.firstName,
            last_name: profile.lastName,
            roles: [Role.ENTREPRENEUR],
          });
        }
      }

      return user;
    } catch (error) {
      console.error("Error in validateOAuthUser:", error);
      throw error;
    }
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: string) {
    return true;
  }
}
