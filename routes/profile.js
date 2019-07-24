const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const authenticate = require('../utils/authenticate');
const models = require('../models');

router.get('/api/profile/:id', authenticate, (req,res) => {
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

router.post('/api/profile/update/:id', authenticate, (req,res) => {
  const id = parseInt(req.params.id)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const favVeg = req.body.favVeg
  const zipCode = req.body.zipCode
  models.User.update({
    firstName,
    lastName,
    favVeg,
    zipCode
  }, {
    where: {
      id,
    }
  }).then(updatedUser => console.log(updatedUser))
  res.json({ success:true, message:'eventual update' })
})

module.exports = router;
