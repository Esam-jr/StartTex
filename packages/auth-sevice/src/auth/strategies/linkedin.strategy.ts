import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-openidconnect";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import axios from "axios";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  private readonly logger = new Logger(LinkedInStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
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
      pkce: true, 
      authorizationParams: {
        response_type: "code",
        prompt: "consent",
      },
    });

    this._oauth2.setAuthMethod("client_secret_post");
    this._oauth2.useAuthorizationHeaderforGET(false);
  }

  async validate(
    req: any,
    iss: string,
    sub: string,
    profile: any,
    accessToken: string
  ): Promise<any> {
    try {
      this.logger.debug("LinkedIn OIDC profile received:", profile);
      this.logger.debug("LinkedIn OIDC access token:", accessToken);

      if (!profile) {
        this.logger.error("No profile received from LinkedIn");
        throw new Error("No profile received from LinkedIn");
      }

      const emailResponse = await axios.get(
        "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const email = emailResponse.data.elements?.[0]?.["handle~"]?.emailAddress;

      if (!email) {
        this.logger.error("No email found in LinkedIn profile");
        throw new Error("No email found in LinkedIn profile");
      }

      const user = {
        id: sub,
        email,
        firstName: profile.given_name || profile.name?.givenName || "",
        lastName: profile.family_name || profile.name?.familyName || "",
        picture: profile.picture || profile.photos?.[0]?.value || "",
        accessToken,
      };

      this.logger.debug("Processed user data:", user);

      return this.authService.validateOAuthUser(user, "linkedin");
    } catch (error) {
      this.logger.error("Error in LinkedIn validate:", error);
      throw error;
    }
  }
}
