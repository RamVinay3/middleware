const User = require("../models/user");
const jwt= require('jsonwebtoken');
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password } = req.body;

    if (!firstName || !lastName || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with email or mobile already exists",
      });
    }

    await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return res.json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } },
      );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.set({ "Cache-Control": "no-store", Pragma: "no-cache", Expires: "0" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = user.generateAccessToken();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.json({ message: "Access token refreshed" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
