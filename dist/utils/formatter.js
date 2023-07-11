"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUsername = exports.isEmail = exports.isAddress = void 0;
const ADDRESS_REGEX = /^0x[0-9a-f]{40}$/i;
function isAddress(address) {
    return ADDRESS_REGEX.test(address);
}
exports.isAddress = isAddress;
// https://www.emailregex.com
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function isEmail(email) {
    return EMAIL_REGEX.test(email);
}
exports.isEmail = isEmail;
const USERNAME_REGEX = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/i;
function isUsername(username) {
    return (username.length >= 3 &&
        username.length <= 24 &&
        USERNAME_REGEX.test(username));
}
exports.isUsername = isUsername;
//# sourceMappingURL=formatter.js.map