const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  .then((data) => {
    console.log(data.data)
    res.json(data.data)
  })
})

app.listen(8081, () => {

})
