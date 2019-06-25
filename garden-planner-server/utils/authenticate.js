const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const headers = req.headers['authorization'];
  const token = headers.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(decoded) {
      if(decoded.userId) {
        userId = decoded.userId;
        console.log('decoded');
        next();
      }
      res.status(401).json({message: 'Invalid Token'});
    }
    res.status(401).json({message: 'Invalid Token', err: err});
  })
}
