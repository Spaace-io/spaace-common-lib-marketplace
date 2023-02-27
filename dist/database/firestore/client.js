"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const dotenv = require("dotenv");
dotenv.config();
exports.default = new firestore_1.Firestore({ projectId: process.env.FIRESTORE_PROJECT_ID });
//# sourceMappingURL=client.js.map