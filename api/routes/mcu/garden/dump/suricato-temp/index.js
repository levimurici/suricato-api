const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const routerPost = require('express').Router()

var dataSuricatoTemp = {
    "suricatoTemp" : {
        "data": 
        {
            "device": "device/Temp",
            "humidity": "89%",
            "temperature": "29C"
        }
    }
}

routerPost.post('/', jsonParser, (req, res) => {
    const dataIncoming = req.body.suricatoTemp.data
    let dataDevice = dataIncoming.device;
    console.log(dataDevice)
    if(dataDevice == dataSuricatoTemp['suricatoTemp']['data']['device']){
        dataSuricatoTemp['suricatoTemp']['data']['humidity'] = dataIncoming.humidity
        dataSuricatoTemp['suricatoTemp']['data']['temperature'] = dataIncoming.temperature
        console.log(dataSuricatoTemp)
    }
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    dataSuricatoTemp
}

/*
EXAMPLE:
{
"suricatoTemp" : {
        "data": 
        {
            "device": "device/Temp",
            "humidity": "89%",
            "temperature": "29C"
        }
    }
} */