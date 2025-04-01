import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-linkedin-oauth2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get<string>("LINKEDIN_CLIENT_ID"),
      clientSecret: configService.get<string>("LINKEDIN_CLIENT_SECRET"),
      callbackURL: configService.get<string>("LINKEDIN_CALLBACK_URL"),
      scope: ["openid", "profile", "email"], // Required for OIDC
      authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
      tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
      profileURL: "https://api.linkedin.com/v2/userinfo", // OpenID UserInfo endpoint
      passReqToCallback: false,
      state: true, // Recommended for security
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    // LinkedIn OIDC profile structure is different from OAuth 2.0
    const user = {
      email: profile.email || profile.emails?.[0]?.value,
      firstName: profile.given_name || profile.firstName,
      lastName: profile.family_name || profile.lastName,
      picture: profile.picture || profile.photos?.[0]?.value,
      accessToken,
    };

    if (!user.email) {
      throw new Error("No email found in LinkedIn profile");
    }

    return this.authService.validateOAuthUser(user, "linkedin");
  }
}
