const ADDRESS_REGEX = /^0x[0-9a-f]{40}$/i;

export function isAddress(address: string) {
  return ADDRESS_REGEX.test(address);
}

// https://www.emailregex.com
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isEmail(email: string) {
  return EMAIL_REGEX.test(email);
}

const USERNAME_REGEX = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/i;

export function isUsername(username: string) {
  return (
    username.length >= 3 &&
    username.length <= 24 &&
    USERNAME_REGEX.test(username)
  );
}
