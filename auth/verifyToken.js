const CONSTANTS = require('./../constants');
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, code:403, message: 'No token provided.' });
    
  jwt.verify(token, CONSTANTS.JWT_KEY, function(err, decoded) {
    if (err)
      return res.status(401).send({ auth: false, code:401, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;