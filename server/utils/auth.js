const jwt = require('jsonwebtoken');
const jwtExpiration = '5h';

const auth = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
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
