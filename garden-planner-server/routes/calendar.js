const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const authenticate = require('../utils/authenticate');
const models = require('../models');

router.get('/api/calendar/:userId', authenticate, (req, res) => {
  const userId = req.params.userId
  models.Plan.findAll({
    where: {
      userId
    },
    include: [{
      model: models.Cell,
      as: 'cells',
      include: [{
        model: models.Plant,
        as: 'plant',
        include: [{
          model: models.Companion,
          as: 'companion'
        }]
      }],
    }]
  })
  .then(plans => {
    res.json({success: true, plans})
  })
  .catch(error => res.json({success:false, error}))
})

module.exports = router;
