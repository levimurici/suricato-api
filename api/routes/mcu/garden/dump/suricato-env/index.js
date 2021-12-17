const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const routerPost = require('express').Router()

var dataSuricatoEnv = {
    "suricatoEnv" : {
        "data": 
        {
            "device": "device/Env",
            "altitude": "29 meters",
            "temperature": "29C"
        }
    }
}

routerPost.post('/', jsonParser, (req, res, next) => {
    const dataIncoming = req.body.suricatoEnv.data
    let dataDevice = dataIncoming.device;
    console.log(dataDevice)
    if(dataDevice == dataSuricatoEnv['suricatoEnv']['data']['device']){
        dataSuricatoEnv['suricatoEnv']['data']['altitude'] = dataIncoming.altitude
        dataSuricatoEnv['suricatoEnv']['data']['temperature'] = dataIncoming.temperature
        console.log(dataSuricatoEnv)
    }
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    dataSuricatoEnv
}

/*
EXAMPLE:
{
"suricatoEnv" : {
        "data": 
        {
            "device": "device/Env",
            "altitude": "29 meters",
            "temperature": "29C"
        }
    }
} */