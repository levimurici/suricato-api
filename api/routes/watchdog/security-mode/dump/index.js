const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const routerPost = require('express').Router()

let data_updated;
var dataSecurity = {
    "securityStatus" : {
        "data": 
        {
            "status": "status"
        }
    }
}

routerPost.post('/', jsonParser, (req, res) => {
    const dataIncoming = req.body
    data_updated = dataIncoming.status
    dataSecurity['securityStatus']['data']['status'] = data_updated
    console.log(dataSecurity)
    res.status(200).json({ status: true })
    res.end()
});

module.exports = {
    routerPost, 
    dataSecurity
}