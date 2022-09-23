export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expireIn: process.env.JWT_EXPIRE_IN,
  secretOrPrivateKey: process.env.JWT_SECRET_OR_PRIVATE_KEY,
};
