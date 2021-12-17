const routerGet = require('express').Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const dataAlarmOut = require('../data/dataAlarm')

routerGet.get('/', jsonParser, (req, res) => {
    res.status(200).send(dataAlarmOut.dataAlarm)
});

module.exports = routerGet