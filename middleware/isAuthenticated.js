const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {

  try {

    
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: 'Invalid token'
    });

  }

};