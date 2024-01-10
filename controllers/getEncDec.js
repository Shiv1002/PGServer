const NodeRsa = require("node-rsa");
const fs = require("fs");
const pubkey = new NodeRsa(fs.readFileSync("./public.pem"));
const prikey = new NodeRsa(fs.readFileSync("./private.pem"));

function getDecryptedEmail(email) {
  return prikey.decrypt(email).toString("utf-8");
}

function getDecryptedPass(document) {
  return {
    ...document,
    passwords: document.passwords.map((passObj) => {
      return {
        ...passObj,
        pass: prikey.decrypt(passObj.pass, "utf8"),
        passwordFor: prikey.decrypt(passObj.passwordFor, "utf8"),
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
