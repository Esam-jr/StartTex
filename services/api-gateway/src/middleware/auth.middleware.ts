import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { SharedAuthService } from "@starttex/packages/shared/auth-lib";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: SharedAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("No authorization header");
    }

    try {
      const token = authHeader.split(" ")[1];
      const payload = await this.authService.validateUserToken(token);

      // Attach user info to request for downstream use
      req["user"] = payload;

      next();
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
