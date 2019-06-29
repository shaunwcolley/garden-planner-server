const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const authenticate = require('../utils/authenticate');
const models = require('../models');

router.get('/api/profile/:id', (req,res) => {
  const id = req.params.id;

  models.User.findByPk(id, { attributes: [
    'id', 'firstName', 'lastName', 'email', 'zipCode', 'favVeg'
  ]})
  .then(user => {
    res.json(user)
  })
  .catch(error => {
      res.json({ message: "There was an error with retrieve user information", error })
    }
  )
})

router.post('/api/profile/update/:id', (req,res) => {
  const id = parseInt(req.params.id)
  
  models.User.update({
    firstName,
    lastName,
    email,
    favVeg,
    zipcode
  }, {
    where: {
      id,
    }
  })
  res.json({success:true, message:'eventual update', user: id, apple: 'pie'})
})

module.exports = router;
