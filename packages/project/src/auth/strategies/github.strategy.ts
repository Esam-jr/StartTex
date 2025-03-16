import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get("GITHUB_CLIENT_ID"),
      clientSecret: configService.get("GITHUB_CLIENT_SECRET"),
      callbackURL: `${configService.get("OAUTH_CALLBACK_URL")}/github/callback`,
      scope: ["user:email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      email: profile.emails[0].value,
      firstName: profile.displayName?.split(" ")[0],
      lastName: profile.displayName?.split(" ")[1],
      id: profile.id,
    };

    return this.authService.validateOAuthUser(user, "github");
  }
}
