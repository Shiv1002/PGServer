const NodeRsa = require("node-rsa");
const fs = require("fs");
const pubkey = new NodeRsa(
  "-----BEGIN PUBLIC KEY-----\n" +
    process.env.PUBLIC_KEY +
    "\n-----END PUBLIC KEY-----"
);
const prikey = new NodeRsa(
  "-----BEGIN RSA PRIVATE KEY-----\n" +
    process.env.PRIVATE_KEY +
    "\n-----END RSA PRIVATE KEY-----"
);

function getDecryptedEmail(email) {
  return prikey.decrypt(email).toString("utf-8");
}

function getDecryptedPass(document) {
  return {
    email: document.email,
    passwords: document.passwords.map((passObj) => {
      return {
        id: passObj.id,
        pass: prikey.decrypt(passObj.pass, "utf8"),
        passwordFor: prikey.decrypt(passObj.passwordFor, "utf8"),
        timestamp: passObj.timestamp,
        important: passObj.important,
      };
    }),
  };
}

function getEncryptedEmail(email) {
  return pubkey.encrypt(email, "base64");
}

function getEncryptedPassword(passObj) {
  return {
    ...passObj,
    pass: pubkey.encrypt(passObj.pass, "base64"),
    passwordFor: pubkey.encrypt(passObj.passwordFor, "base64"),
  };
}

module.exports = {
  getDecryptedEmail,
  getDecryptedPass,
  getEncryptedEmail,
  getEncryptedPassword,
};
