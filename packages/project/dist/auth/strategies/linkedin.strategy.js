"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let LinkedinStrategy = class LinkedinStrategy extends (0, passport_1.PassportStrategy)(passport_linkedin_oauth2_1.Strategy, "linkedin") {
    constructor(configService, authService) {
        super({
            clientID: configService.get("LINKEDIN_CLIENT_ID"),
            clientSecret: configService.get("LINKEDIN_CLIENT_SECRET"),
            callbackURL: `${configService.get("OAUTH_CALLBACK_URL")}/linkedin/callback`,
            scope: ["r_emailaddress", "r_liteprofile"],
        });
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile) {
        const user = {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            id: profile.id,
        };
        return this.authService.validateOAuthUser(user, "linkedin");
    }
};
exports.LinkedinStrategy = LinkedinStrategy;
exports.LinkedinStrategy = LinkedinStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], LinkedinStrategy);
//# sourceMappingURL=linkedin.strategy.js.map