import { Strategy } from "passport-linkedin-oauth2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
declare const LinkedinStrategy_base: new (...args: any[]) => Strategy;
export declare class LinkedinStrategy extends LinkedinStrategy_base {
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
