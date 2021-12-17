const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const routerPost = require('express').Router()

var dataSuricatoSoil = {
    "suricatoSoil" : {
        "data": 
        {
            "device": "device/Soil",
            "soil": "89%"
        }
    }
}

routerPost.post('/', jsonParser, (req, res) => {
    const dataIncoming = req.body.suricatoSoil.data
    let dataDevice = dataIncoming.device;
    console.log(dataDevice)
    if(dataDevice == dataSuricatoSoil['suricatoSoil']['data']['device']){
        dataSuricatoSoil['suricatoSoil']['data']['soil'] = dataIncoming.soil
        console.log(dataSuricatoSoil)
    }
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    dataSuricatoSoil
}

/*
EXAMPLE:
{
"suricatoSoil" : {
        "data": 
        {
            "device": "device/Soil",
            "soil": "89%"
        }
    }
} */