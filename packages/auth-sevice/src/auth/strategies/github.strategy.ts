import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: configService.get<string>("GITHUB_CALLBACK_URL"),
      scope: ["user:email", "read:user"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { username, displayName, photos } = profile;
    const user = {
      email: profile.emails[0].value,
      firstName: displayName || username,
      lastName: "",
      picture: photos[0].value,
      accessToken,
    };

    return this.authService.validateOAuthUser(user, "github");
  }
}
