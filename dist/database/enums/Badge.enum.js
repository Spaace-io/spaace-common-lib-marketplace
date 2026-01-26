"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeStatus = exports.BadgeConditionType = exports.BadgeRarity = exports.BadgeCategory = void 0;
// Re-export all badge-related enums for convenience
var Badge_entity_1 = require("../tables/Badge.entity");
Object.defineProperty(exports, "BadgeCategory", { enumerable: true, get: function () { return Badge_entity_1.BadgeCategory; } });
Object.defineProperty(exports, "BadgeRarity", { enumerable: true, get: function () { return Badge_entity_1.BadgeRarity; } });
var BadgeCondition_entity_1 = require("../tables/BadgeCondition.entity");
Object.defineProperty(exports, "BadgeConditionType", { enumerable: true, get: function () { return BadgeCondition_entity_1.BadgeConditionType; } });
var UserBadge_entity_1 = require("../tables/UserBadge.entity");
Object.defineProperty(exports, "BadgeStatus", { enumerable: true, get: function () { return UserBadge_entity_1.BadgeStatus; } });
//# sourceMappingURL=Badge.enum.js.map