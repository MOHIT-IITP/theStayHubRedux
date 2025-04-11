import jwt from "jsonwebtoken";
export const jwtSecret = "2342l23$@#$@#$!@#D@#$SD@#$";
export const genAuthToken = async (UserId, res) => {
  const token = jwt.sign({ UserId }, jwtSecret, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
