const {dataSuricatoEnv} = require('../dump/suricato-env')
const {dataSuricatoSoil} = require('../dump/suricato-soil')
const {dataSuricatoTemp} = require('../dump/suricato-temp')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const routerGet = require('express').Router()

var dataGarden = {
    "garden" : {
        "suricatoEnv": 
        {
            "device": "device/Env",
            "altitude": "29 meters",
            "temperature": "29C"
        },

        "suricatoTemp": 
        {
            "device": "device4/temperature",
            "humidity": "89%",
            "temperature": "29C"
        },

        "suricatoSoil": 
        {
            "device": "device/Soil",
            "soil": "89%"
        } 
    }
}

routerGet.get('/', jsonParser, (req, res) => {
    /* dataGarden.suricatoEnv["temperature"] = dataSuricatoEnv.data.temperature
    dataGarden.suricatoEnv["altitude"] = dataSuricatoEnv.data.altitude

    dataGarden.suricatoSoil["soil"] = dataSuricatoSoil.data.temperature */

    dataGarden.suricatoTemp["temperature"] = dataSuricatoTemp.data.temperature
    dataGarden.suricatoTemp["humidity"] = dataSuricatoTemp.data.humidity

    res.status(200).send(dataGarden)
});

module.exports = {
    routerGet, 
    dataGarden
}