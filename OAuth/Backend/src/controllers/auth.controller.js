const mongoose = require("mongoose");
const Users = require("../models/user.model");
const Sessions = require("../models/session.model");
const JWT = require("jsonwebtoken");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = require("../config/config");
const { OAuth2Client } = require("google-auth-library");

const bcrypt = require("bcrypt");

const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

exports.google = async (req, res) => {
  try {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });

    return res.redirect(url);
  } catch (error) {
    console.error("Google Error:", error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.callback = async (req, res) => {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).json({
        message: "Authorization code not found!",
      });
    }

    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, picture } = payload;

    let user = await Users.findOne({ email });

    if (!user) {
      user = await Users.create({
        name,
        email,
        image: picture,
        verified: true,
      });
    }

    const sessionId = new mongoose.Types.ObjectId();

    const accessToken = JWT.sign(
      {
        userId: user._id,
        sessionId: sessionId,
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const accessTokenHash = await bcrypt.hash(accessToken, 7);

    await Sessions.create({
      _id: sessionId,
      userId: user._id,
      accessTokenHash: accessTokenHash,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    console.error("Google Callback Error:", error);
    return res.status(500).json({
      message: "Google authentication failed!",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const isAlreadyRegistered = await Users.findOne({ email });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        name: user.name,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    const sessionId = new mongoose.Types.ObjectId();

    const accessToken = JWT.sign(
      {
        userId: user._id.toString(),
        sessionId: sessionId.toString(),
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const accessTokenHash = await bcrypt.hash(accessToken, 7);

    await Sessions.create({
      _id: sessionId,
      userId: user._id,
      accessTokenHash,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access token not found!",
      });
    }

    const decoded = JWT.verify(accessToken, JWT_SECRET);

    const user = await Users.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(401).json({
      message: "Invalid or expired access token!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access token not found!",
      });
    }

    const decoded = JWT.verify(accessToken, JWT_SECRET);

    const session = await Sessions.findOne({
      _id: decoded.sessionId,
      userId: decoded.userId,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid or expired access token!",
      });
    }

    const isMatch = await bcrypt.compare(accessToken, session.accessTokenHash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid or expired access token!",
      });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(401).json({
      message: "Invalid or expired access token!",
    });
  }
};
