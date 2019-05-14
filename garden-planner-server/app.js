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
  models.Plant.findAll()
  .then(result => res.json(result))
})

app.listen(PORT,function(){
  console.log("Server is growing...")
})
