import { Controller, All, Req, Res, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ProxyService } from "./proxy.service";

@Controller("api")
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All("*")
  async handleRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      const path = req.path;
      const service = path.split("/")[1]; // First segment is the service name
      const servicePath = path.substring(service.length + 1); // Remove service name from path

      const response = await this.proxyService.forwardRequest(
        service,
        servicePath,
        req.method,
        req.body,
        req.headers
      );

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
