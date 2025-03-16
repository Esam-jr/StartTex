import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-linkedin-oauth2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor(
    configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get("LINKEDIN_CLIENT_ID"),
      clientSecret: configService.get("LINKEDIN_CLIENT_SECRET"),
      callbackURL: `${configService.get("OAUTH_CALLBACK_URL")}/linkedin/callback`,
      scope: ["r_emailaddress", "r_liteprofile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      id: profile.id,
    };

    return this.authService.validateOAuthUser(user, "linkedin");
  }
}
