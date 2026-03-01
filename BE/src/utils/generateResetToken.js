const crypto = require("crypto");

exports.generateResetToken = (email) => {
  const rawToken = `${email}:${crypto.randomBytes(32).toString("hex")}`;
  const base64Token = Buffer.from(rawToken).toString("base64");

  const hashedToken = crypto
    .createHash("sha256")
    .update(base64Token)
    .digest("hex");

  return { base64Token, hashedToken };
};
