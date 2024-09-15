const jwt = require('jsonwebtoken');
const config = require('config');

const middleware = (req, res, next) => {

  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const key = config.get('secretkey');

  try {
    const decode = jwt.verify(token, key);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
module.exports = middleware;
