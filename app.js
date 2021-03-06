const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const authenticate = require('./utils/authenticate');
const userAuthRoutes = require('./routes/userAuth');
const profileRoutes = require('./routes/profile');
const calendarRoutes = require('./routes/calendar');
const models = require('./models');

app.use('/', userAuthRoutes);
app.use('/', profileRoutes);
app.use('/', calendarRoutes);

app.get('/', (req,res) => {
  res.redirect('/api/plants');
});

app.get('/api/plants', authenticate, (req,res) => {
  models.Plant.findAll({include: [{
    model: models.Companion,
    as: 'companion'
  }]
})
  .then(result => res.json(result))
})

app.post('/api/save-plan', authenticate, (req,res) =>{
  let name = req.body.planName
  let width = req.body.width
  let height = req.body.height
  let userId = req.body.userId
  let plantsInPlan = Object.values(req.body.plantsInPlan)
  let plan = models.Plan.build({
    name: name,
    userId: userId,
    width: width,
    height: height
  })
  plan.save().then(plan => {
    let bulkMaterial = []
    plantsInPlan.forEach((plant,index) => {
      let cell = {
        planId: plan.id,
        plantId: plant.id,
        cellNum: index + 1
      }
      bulkMaterial.push(cell)
    })
    models.Cell.bulkCreate(bulkMaterial,{returning:true}).then(()=> {
      res.json({success:true, message:"Plan Saved."}
      )})
  })
})

app.post('/api/update-plan', authenticate, (req,res) => {
  let plantsInPlan = Object.values(req.body.plantsInPlan)
  let message = []
  plantsInPlan.forEach((plant,index) => {
      setTimeout(() => {if(plant){
        if(plant.cellId != null){
          let cellId = plant.cellId
          models.Cell.update({
            plantId: plant.id
          },
            {
              where: {
              id: cellId
            }
          }).then((updatedPlant) => console.log(updatedPlant))
        }

      }},2500)
  })
  res.json({message: "Cells updated"})
})

app.get('/api/plans/:userId', authenticate, (req,res) => {
  let userId = parseInt(req.params.userId)
  models.Plan.findAll({
    where: {
      userId: userId
    }
  }).then(plans => {
    res.json(plans)
  })
})

app.get('/api/plan/:planId', authenticate, (req,res) => {
  let id = parseInt(req.params.planId)
  models.Plan.findByPk(id, {
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
    order: [
            ['cellNum', 'DESC']
        ]
    }]
  })
  .then(plan => {
    res.json(plan)
  })
})

app.listen(PORT,function(){
  console.log("Server is growing...")
})
