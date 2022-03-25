const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const CONFIG = require('../config/config.js')

const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(express.json());
app.use(express.urlencoded({extended: true}))

/* ---------------- Teste  ---------------- */
const routerGetTeste = require('./teste')
app.use('/teste/getDBdata', routerGetTeste.routerGetTest)

/* ---------------- Insert ---------------- */
const routerInsertSuricato = require('./mcu/insert')
app.use('/mcu/insert/test', routerInsertSuricato.routerPost)

/* ---------------- Update ---------------- */
const routerUpdateSuricatoAlarm = require('./mcu/alarm/dump')
app.use('/alarm/update', routerUpdateSuricatoAlarm.routerPost)

const routerUpdateSuricatoGarden = require('./mcu/garden/dump')
app.use('/garden/update', routerUpdateSuricatoGarden.routerPost)

/* ---------------- Read ---------------- */
const routerGetAllType = require('./mcu/allData/type')
app.use('/alarm/getAllData/type', routerGetAllType)

const routerGetAllPlace = require('./mcu/allData/place')
app.use('/alarm/getAllData/place', routerGetAllPlace)

const routerGetAlarmData = require('./mcu/alarm/show')
app.use('/alarm/show', routerGetAlarmData)

const routerGetGardenData = require('./mcu/garden/show')
app.use('/garden/show', routerGetGardenData)

/* ---------------- Rotas Security Mode  ---------------- */
const routerPostSecurityMode = require('./watchdog/security-mode/mode')
app.use('/watchdog/dump', routerPostSecurityMode.routerPost)

const routerGetSecurityMode = require('./watchdog/security-mode/mode')
app.use('/watchdog', routerGetSecurityMode.routerGet)

const routerGetSecurityLoop = require('./watchdog/security-mode/mode')
app.use('/watchdog/loop', routerGetSecurityLoop.routerGet)

module.exports = app;