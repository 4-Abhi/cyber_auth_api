const jwt = require("jsonwebtoken");

exports.CreateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPYIRE_IN,
    }
  );
  return token;
};
