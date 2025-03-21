import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";

@Injectable()
export class MonitoringLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: process.env.SERVICE_NAME },
      transports: [
        new winston.transports.Console(),
        // Elasticsearch transport for centralized logging
        new ElasticsearchTransport({
          level: "info",
          clientOpts: {
            node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
            auth: {
              username: process.env.ELASTICSEARCH_USERNAME || "elastic",
              password: process.env.ELASTICSEARCH_PASSWORD || "changeme",
            },
          },
          indexPrefix: "starttex-logs",
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
