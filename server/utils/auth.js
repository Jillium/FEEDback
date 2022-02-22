const jwt = require('jsonwebtoken');
require('dotenv').config();


const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: expiration });
  }
};

// const jwt = require('jsonwebtoken');
// const jwtExpiration = '2hr';
// require("dotenv").config();
// const auth = {
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };
//     return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
//   },
//   authenticateToken: function (req) {
//     let user = null;
//     try {
//       const authHeader = req.headers['authorization'];
//       const token = authHeader && authHeader.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (decoded) user = decoded;
//       return user;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }
// };
// module.exports = auth;