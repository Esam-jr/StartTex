import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthUser(profile: any, provider: string) {
    let user = await this.usersService.findByEmail(profile.email);

    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        provider,
        providerId: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        roles: [Role.ENTREPRENEUR], // Default role for new users
      });
    }

    return user;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email,
      roles: user.roles 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: string) {
    // Implement token invalidation if needed
    return true;
  }
}