import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-linkedin-oauth2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, "linkedin") {
  constructor(
    configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["r_emailaddress", "r_liteprofile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { displayName, photos, emails } = profile;
    const [firstName, lastName] = displayName.split(" ");

    const user = {
      email: emails[0].value,
      firstName: firstName || "",
      lastName: lastName || "",
      picture: photos[0].value,
      accessToken,
    };

    return this.authService.validateOAuthUser(user, "linkedin");
  }
}
