require("dotenv").config();

const PORT = process.env.PORT;
const URI = process.env.MONGOOSE_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

if (!PORT) {
  throw new Error("Port not found!");
}

if (!URI) {
  throw new Error("DB URI not found!");
}

if (!JWT_SECRET) {
  throw new Error("JWT secret not found!");
}

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Google client id not found!");
}

if (!GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client secret not found!");
}

if (!GOOGLE_REDIRECT_URI) {
  throw new Error("Google redirect uri not found!");
}

exports.PORT = PORT;
exports.URI = URI;
exports.JWT_SECRET = JWT_SECRET;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
exports.GOOGLE_REDIRECT_URI = GOOGLE_REDIRECT_URI;
