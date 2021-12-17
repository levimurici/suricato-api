const routerGet = require('express').Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const dataSecurityUpdate = require('../dump/index')

routerGet.get('/', jsonParser, (req, res) => {
    res.status(200).send(dataSecurityUpdate.dataSecurity)
});

module.exports = {
    routerGet
}