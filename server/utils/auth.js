const jwt = require('jsonwebtoken');
const jwtExpiration = '15s';

const auth = {
  signToken: function ({ name, _id }) {
    const payload = { name, _id };
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
  },
  authenticateToken: function (req) {
    let user = null;
    
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      if (decoded) user = decoded;
      
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

module.exports = auth;
