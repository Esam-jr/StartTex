import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateOAuthUser(profile: any, provider: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    logout(userId: string): Promise<boolean>;
}
