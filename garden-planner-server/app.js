const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
models = require('./models')

app.get('/', (req,res) => {
  res.redirect('/api/plants')
})

app.get('/api/plants', (req,res) => {
  models.Plant.findAll({include: [{
    model: models.Companion,
    as: 'companion'
  }]
})
  .then(result => res.json(result))
})

app.post('/api/save-plan', (req,res) =>{
  let name = req.body.planName
  let plantsInPlan = Object.values(req.body.plantsInPlan)
  let plan = models.Plan.build({
    name: name,
    userId: 1
  })
  plan.save().then(plan => {
    console.log(plan.id)
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

app.get('/api/plans', (req,res) => {
  models.Plan.findAll().then(plans => {
    res.json(plans)
  })
})

app.get('/api/plan/:planId', (req,res) => {
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
    }]
    }]
  })
  .then(plan => {
    console.log(plan)
    res.json(plan)
  })
})

app.listen(PORT,function(){
  console.log("Server is growing...")
})
