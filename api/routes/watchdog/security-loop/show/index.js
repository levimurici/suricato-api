const routerGet = require('express').Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const dataLoopUpdate = require('../dump/index')

routerGet.get('/', jsonParser, (req, res) => {
    res.status(200).send(dataLoopUpdate.dataLoop)
});

module.exports = {
    routerGet
}