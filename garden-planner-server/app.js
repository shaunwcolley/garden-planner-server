const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.send('json will go here')
})

const getData = async () => {
  try {
    for (let i = 1; i < 22; i++){
      let url = "https://www.growstuff.org/crops.json?page=" + i
      const response = await axios.get(url)
      const data = response.data
      console.log(i)
      console.log(data[0].name)
    }
  } catch (error) {
    console.log(error)
  }
}
getData()

/*
arr.forEach(function callback(currentValue [, index [, array]]) {
    //your iterator
}[, thisArg]);
*/
app.listen(PORT,function(){
  console.log("Server is growing...")
})
