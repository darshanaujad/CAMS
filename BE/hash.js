const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "admin123"; // change if you want
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hashed);
}

hashPassword();