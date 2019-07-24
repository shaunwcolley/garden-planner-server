const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

function authenticate(req, res, next) {
  const headers = req.headers['authorization'];
  try {
    const token = headers.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded) {
        if(decoded.userId) {
          userId = parseInt(decoded.userId);
          console.log(userId);
          console.log('decoded');
          next();
        } else {
          res.status(401).json({message: 'Invalid Token'});
        };
      } else {
        res.status(401).json({message: 'Invalid Token', err: err});
      };
    });
  }
  catch {
    res.status(401).json({message: 'Error in trying to authenticate credentials, please try again.'})
  }


};

module.exports = authenticate;
