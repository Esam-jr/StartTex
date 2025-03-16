import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<any>;
    create(userData: any): Promise<any>;
    update(id: string, userData: any): Promise<any>;
}
