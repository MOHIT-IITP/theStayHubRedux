import jwt from "jsonwebtoken";
export const genAuthToken = async (UserId, res) => {
  try {
    const token = jwt.sign({ UserId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate authentication token.");
  }
};