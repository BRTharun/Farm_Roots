const jwt = require("../lib/security/jwt");

function verifyToken(req, res, next) {
  try {
    let token = req.headers["authorization"] || null;
    if (!token) {
      throw new Error("Access token is required to consume this service");
    }
    token = token.substring("Bearer ".length);
    const result = jwt.verifyToken(token);
    req.user = result;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = verifyToken;
