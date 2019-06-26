const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const router = express.Router();

const models = require('../models');

router.post('/register', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const pass = bcrypt.hashSync(req.body.pass, saltRounds);
  const zipCode = req.body.zipCode;
  const favVeg = req.body.favVeg;
  models.User.findOne({
    where: {
      email,
    }
  }).then((userOld) => {
    if(userOld){
      res.json({success:false, message: 'User already registered.'})
      return
    }
    const user = models.User.build({
      firstName,
      lastName,
      pass,
      zipCode,
      favVeg,
      email,
    });
    user.save().then((savedUser) => res.json({success: true, message: 'User was registed!'}));
  })
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const loginPass = req.body.pass;
  models.User.findOne({
    where: {
      email,
    }
  }).then((user) => {
    if(!user) {
      res.json({success: false, message: 'Invalid email.'});
      return
    }
    bcrypt.compare(loginPass, user.pass, (err, response) => {
      if (response) {
        jwt.sign({ userId: user.id }, process.env.JWT_SECRET, (error, token) => {
          if (token) {
            res.json({ success: true, message: 'Logged in.', token, userId: user.id});
            return
          }
          res.status(500).json({ message: 'Unable to generate token', error });
        })
        return
      }
    res.json({ success: false, message: "Invalid Password", err});
    })
  })
})


module.exports = router
