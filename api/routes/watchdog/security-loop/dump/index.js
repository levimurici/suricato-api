const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const routerPost = require('express').Router()

let data_updated;
var dataLoop = {
    "securityLoop" : {
        "data": 
        {
            "loop": "status"
        }
    }
}

routerPost.post('/', jsonParser, (req, res) => {
    const dataIncoming = req.body
    data_updated = dataIncoming.loop
    dataLoop['securityLoop']['data']['loop'] = data_updated
    console.log(dataLoop)
    res.status(200).json({ status: true })
    res.end()
});

module.exports = {
    routerPost, 
    dataLoop
}