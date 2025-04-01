import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-openidconnect";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  private readonly logger = new Logger(LinkedInStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    const config = {
      issuer: "https://www.linkedin.com",
      authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
      tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
      userInfoURL: "https://api.linkedin.com/v2/userinfo",
      clientID: configService.get<string>("LINKEDIN_CLIENT_ID"),
      clientSecret: configService.get<string>("LINKEDIN_CLIENT_SECRET"),
      callbackURL: configService.get<string>("LINKEDIN_CALLBACK_URL"),
      scope: ["openid", "profile", "email"],
      passReqToCallback: true,
      state: true,
      pkce: false, // Disabled to avoid conflicts with client_secret
      token_endpoint_auth_method: "client_secret_post",
      authorizationParams: {
        response_type: "code",
        prompt: "consent",
      },
    };
    super(config);
    this.logger.debug("LinkedIn Strategy Configuration:", config); // Log the config
  }

  async validate(
    req: any,
    iss: string,
    sub: string,
    profile: any,
    accessToken: string
  ): Promise<any> {
    try {
      this.logger.debug("Access Token Received:", accessToken); // Log the token
      this.logger.debug("LinkedIn OIDC Profile Received:", profile); // Log the profile

      const user = {
        id: sub,
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: profile.picture,
        accessToken,
      };

      this.logger.debug("Processed User Data:", user); // Log the processed user

      if (!user.email) {
        this.logger.error("No email found in LinkedIn profile");
        throw new Error("No email found in LinkedIn profile");
      }

      return this.authService.validateOAuthUser(user, "linkedin");
    } catch (error) {
      this.logger.error("Error in LinkedIn validate:", error);
      throw error;
    }
  }
}
