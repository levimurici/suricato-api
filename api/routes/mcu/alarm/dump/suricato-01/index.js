const bodyParser = require('body-parser');
const { dataSuricato02 } = require('../suricato-02');
const jsonParser = bodyParser.json()

const routerPost = require('express').Router()

var control;

var dataSuricato01 = {
    "suricato01" : {
        "data": 
        {
            "device": "device1/Alarm1",
            "control": control
        }
    }
}

routerPost.post('/', jsonParser, (req, res, next) => {
    const dataIncoming = req.body.alarms.suricato
    let dataDevice = dataIncoming.device
    /* console.log(dataDevice) */
    if(dataDevice == dataSuricato01.suricato01['data']['device']){
        dataSuricato01.suricato01['data']['control'] = dataIncoming.control
        /* console.log(dataSuricato01) */
    }
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    dataSuricato01
}