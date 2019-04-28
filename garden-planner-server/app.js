const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.send('json will go here')
})


app.listen(PORT,function(){
  console.log("Server is growing...")
})
