import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any): Promise<{
        access_token: string;
    }>;
    githubAuth(): Promise<void>;
    githubAuthCallback(req: any): Promise<{
        access_token: string;
    }>;
    linkedinAuth(): Promise<void>;
    linkedinAuthCallback(req: any): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<boolean>;
}
