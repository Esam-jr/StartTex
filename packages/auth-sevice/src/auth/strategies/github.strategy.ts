import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    const callbackURL = configService.get<string>("GITHUB_CALLBACK_URL");

    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID"),
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: callbackURL,
      scope: ["user", "user:email"],
      passReqToCallback: true,
    });

    this.logger.debug("GitHub callback URL:", callbackURL);
    this.logger.debug("GitHub strategy initialized with config:", {
      callbackURL,
      scope: ["user", "user:email"],
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    try {
      this.logger.debug("GitHub profile received:", profile);
      this.logger.debug("GitHub access token received:", accessToken);

      if (!profile) {
        this.logger.error("No profile received from GitHub");
        throw new Error("No profile received from GitHub");
      }

      const user = {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        firstName: profile.displayName || profile.username,
        lastName: "",
        picture: profile.photos?.[0]?.value,
        accessToken,
      };

      this.logger.debug("Processed user data:", user);

      if (!user.email) {
        this.logger.error("No email found in GitHub profile");
        throw new Error("No email found in GitHub profile");
      }

      return this.authService.validateOAuthUser(user, "github");
    } catch (error) {
      this.logger.error("Error in GitHub validate:", error);
      this.logger.error("Error stack:", error.stack);
      throw error;
    }
  }
}
