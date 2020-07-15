const express = require('express');
const app = express();
const data = require(__dirname + '/country.json')
const dataNames = []
const dataCaps = []
// for (element of data) {
//     dataNames.push(element.name)
// }

data.map(e => {
    dataNames.push(e.name)    
})

// for (element of data) {
//     dataCaps.push(element.capital)
// }
data.map(e => {
    dataCaps.push(e.capital)
})

app.get('/all', function (req, res) {
    res.json(JSON.stringify(data));
    res.status(200)
})

app.get('/names/all', function (req, res) {
    res.json(dataNames)
    res.status(200)
})

app.get('/capitals/all', function (req, res) {
    res.json(dataCaps)
    res.status(200)
})

app.listen(8000, function () {
    console.log('Listening on port 8000')
})