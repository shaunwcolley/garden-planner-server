const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const router = express.Router();
const models = require('../models')

router.post('/register', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let pass = bcrypt.hashSync(req.body.pass, saltRounds);
  let zipCode = req.body.zipCode;
  let favVeg = req.body.favVeg;
  models.User.findOne({
    where: {
      email: email
    }
  }).then((userOld) => {
    if(userOld){
      res.json({success:false, message: 'User already registered.'})
      return
    }
    let user = models.User.build({
      firstName,
      lastName,
      pass,
      zipCode,
      favVeg,
      email,
    });
    user.save().then((savedUser) => res.json({success: true, message: 'User was registed!'}));
  })
})


module.exports = router
