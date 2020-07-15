const express = require('express');
const app = express();
const domain = 'localhost';
const port = 8000
const data = require(__dirname + '/country.json')
const fs = require('fs')

app.use(express.urlencoded({extended: false}))


app.get("/country/:name", function(req, res) {
    let name = req.params.name
    let countryObj = data.filter(e => e.name.toLowerCase() === name.toLowerCase() )

   if (countryObj.length === 0) {
       res.status(404).json({error: "404 NOT FOUND"})
   } else {
    res.json(JSON.stringify(countryObj))
    res.status(200)
   }
})

app.get("/regions/:regionName", function (req, res) {
    let regionName = req.params.regionName;
    let regionsObj = data.filter(e => e.region.toLowerCase() === regionName.toLowerCase())
    let regionsCountries = []
    if (regionsObj.length === 0) {
        res.status(404).json({error: "404 NOT FOUND"})
    }
    else {
        regionsObj.map(e => regionsCountries.push(e.name))
        res.json(JSON.stringify(regionsCountries))
        res.status(200)
       }
})

app.get("/subregion/:subregionName", function (req, res) {
    let subregionName = req.params.subregionName;
    let subregObj = data.filter(e => e.subregion.toLowerCase() === subregionName.toLowerCase())
    let subregionArr = []

    if (subregObj.length === 0) {
        res.status(404).json({error: "404 NOT FOUND"})
    }
    else {
        subregObj.map(e => subregionArr.push(e.name) )
        res.json(JSON.stringify(subregionArr))
        res.status(200)
    }
})

app.get("/currencies/:currency", function (req, res) {
    let currencyValue = req.params.currency;
    let currencyObj = data.filter( e => e.currencies[0].name.toLowerCase() === currencyValue.toLowerCase())
    let currencyArr = []

    if (currencyObj.length === 0) {
        res.status(404).json({error: "404 NOT FOUND"})

    }
    else {
        currencyObj.map(e => currencyArr.push(e.name));
        res.json(JSON.stringify(currencyArr));
        res.status(200)
    }
})

app.put("/countries/:countryName", (req, res) => {
    let chemin = req.params.countryName.toLowerCase() //---france (/france)
    let value = req.body                //--- objet envoyé {region : 'bretagne'}
    let key = Object.keys(value)        //--- region key
    // let countryObject = data.filter(e => e.name === chemin)
    let parametre;
 if (data.filter(e => e.name === chemin.length !== 0))
    { 
       for (i = 0; i < key.length; i++) {
        parametre = key[i];
        paramValue = req.body[parametre]
        console.log(parametre)
        console.log(req.body[parametre])
        console.log(chemin)
        data.forEach(element => {
            if (element.name.toLowerCase() === chemin) {
                element[`${parametre}`] = paramValue
                
            }
        });
    }
    fs.writeFileSync('country.json', JSON.stringify(data), 'utf-8')
    res.status(200)
    }
    else {
        res.status(404).json({error: "404 NOT FOUND"})
    }
})

app.delete("/countries/:countryName", function (req, res) {
    let country = req.params.countryName.toLowerCase();

    let newData = data.filter(e => e.name.toLowerCase() !== country)
    if (newData.length === data.length) {
        res.status(404).json({error: "404 NOT FOUND"})
    }
    else {
    fs.writeFileSync('country.json', JSON.stringify(newData), 'utf-8')
    res.status(200)
    
    }

})

app.post("countries/:countryName",)

app.listen(port, function () {
   console.log(`Listening on http://${domain}:${port}/`)
})