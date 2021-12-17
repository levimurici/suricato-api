const bodyParser = require('body-parser');
const { dataSuricato01 } = require('../suricato-01');
const jsonParser = bodyParser.json()

const routerPost = require('express').Router()

var control;

var dataSuricato02 = {
    "suricato02" : {
        "data": 
        {
            "device": "device2/Alarm1",
            "control": control
        }
    }
}

routerPost.post('/', jsonParser, (req, res, next) => {
    const dataIncoming = req.body.alarms.suricato
    let dataDevice = dataIncoming.device
    /* console.log(dataDevice) */
    if(dataDevice == dataSuricato02.suricato02['data']['device']){
        dataSuricato02.suricato02['data']['control'] = dataIncoming.control
        /* console.log(dataSuricato02) */
    }
    
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    dataSuricato02
}