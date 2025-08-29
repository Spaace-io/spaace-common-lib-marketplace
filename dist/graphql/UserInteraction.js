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
exports.UserInteraction = exports.UserInteractionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const enums_1 = require("../database/enums");
var UserInteractionType;
(function (UserInteractionType) {
    UserInteractionType["DAILY_CLAIM"] = "DAILY_CLAIM";
    UserInteractionType["BUY_NOW"] = "BUY_NOW";
    UserInteractionType["SELL_INSTANTLY"] = "SELL_INSTANTLY";
    UserInteractionType["SWEEP_FLOOR"] = "SWEEP_FLOOR";
    UserInteractionType["TWEET_ACTION"] = "TWEET_ACTION";
    UserInteractionType["SHARE_CARD"] = "SHARE_CARD";
    UserInteractionType["LINK_TWITTER"] = "LINK_TWITTER";
    UserInteractionType["FOLLOW_TWITTER_SPAACE"] = "FOLLOW_TWITTER_SPAACE";
    UserInteractionType["LINK_DISCORD"] = "LINK_DISCORD";
    UserInteractionType["FOLLOW_DISCORD_SPAACE"] = "FOLLOW_DISCORD_SPAACE";
})(UserInteractionType || (exports.UserInteractionType = UserInteractionType = {}));
(0, graphql_1.registerEnumType)(UserInteractionType, {
    name: 'UserInteractionType',
});
let UserInteraction = class UserInteraction {
};
exports.UserInteraction = UserInteraction;
__decorate([
    (0, graphql_1.Field)(() => UserInteractionType),
    __metadata("design:type", String)
], UserInteraction.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserInteraction.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.TweetAction, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "tweetAction", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "tweetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "twitterHandle", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "followTwitterTarget", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "discordHandle", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserInteraction.prototype, "followDiscordTarget", void 0);
exports.UserInteraction = UserInteraction = __decorate([
    (0, graphql_1.ObjectType)()
], UserInteraction);
//# sourceMappingURL=UserInteraction.js.map