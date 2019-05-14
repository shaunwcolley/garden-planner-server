const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
models = require('./models')
let plants = []
const getData = async () => {
  try {
    // for (let i = 1; i < 23; i++){
    //   console.log(i)
      let url = "https://www.growstuff.org/crops.json?page=1" // + i instead of 1 for looping through api pages
      const response = await axios.get(url)
      const data = response.data
      let harvestDatedPlants = data.filter(plant => {
        return plant.median_days_to_first_harvest != null || plant.median_days_to_last_harvest != null
      })
      harvestDatedPlants.forEach(plant => {
        let apiId = plant.id
        let name = plant.name
        let firstHarvestDate = plant.median_days_to_first_harvest
        let lastHarvestDate = plant.median_days_to_last_harvest
        setTimeout( () => {models.Plant.findAll({
          where: {
            apiId: apiId
          }
        }).then(result => setTimeout(() => {
          if(result.length == 0) {
            let savedPlant = models.Plant.build({
              name: name,
              apiId: apiId,
              firstHarvestDate: firstHarvestDate,
              lastHarvestDate: lastHarvestDate
            })
            savedPlant.save()
            console.log(name + " was saved")
          } else {
            console.log(name + " already existed")
          }
        },2000))},3000)

        })
      // }
  } catch (error) {
    console.log(error)
  }
}
getData()

app.listen(PORT,function(){
  console.log("Server is growing...")
})
