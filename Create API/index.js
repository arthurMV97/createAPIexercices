const express = require('express')
const server = express()

server.get('/', function (req, res) {
    res.send('Simple Text')
    res.status(200)
})

server.get('/teachersName', function (req, res) {
    res.json({thomas: "Thomas Jamais", alban: "Alban Meurice"});    
    res.status(200)

})


server.listen(8080, function () {
    console.log('Server listening on port 8080')
})