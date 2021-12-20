const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

const jsonParser = bodyParser.json()
app.use(jsonParser)

/* ---------------- Rotas dos MCU  ---------------- */

/* Rotas dos alarmes */
const routerGet = require('./routes/mcu/alarm/show')
app.use('/mcu/alarm/show', routerGet)

const routerPostSuricato01 = require('./routes/mcu/alarm/dump/suricato-01')
app.use('/mcu/alarm/dump/suricato01', routerPostSuricato01.routerPost)

const routerPostSuricato02 = require('./routes/mcu/alarm/dump/suricato-02')
app.use('/mcu/alarm/dump/suricato02', routerPostSuricato02.routerPost)

const routerDataAlarmUpdate = require('./routes/mcu/alarm/data/dataAlarm')
app.use('/mcu/alarm/data-updated', routerDataAlarmUpdate.routerGet)

/* Rotas do jardim */
const routerPostSuricatoEnv = require('./routes/mcu/garden/dump/suricato-env')
app.use('/mcu/garden/dump/suricato-env', routerPostSuricatoEnv.routerPost)

const routerPostSuricatoSoil = require('./routes/mcu/garden/dump/suricato-soil')
app.use('/mcu/garden/dump/suricato-soil', routerPostSuricatoSoil.routerPost)

const routerPostSuricatoTemp = require('./routes/mcu/garden/dump/suricato-temp')
app.use('/mcu/garden/dump/suricato-temp', routerPostSuricatoTemp.routerPost)

const routerDataGardenUpdate = require('./routes/mcu/garden/data/dataGarden')
app.use('/mcu/garden/data-garden-updated', routerDataGardenUpdate.routerGet)

/* ---------------- Rotas Security Mode  ---------------- */
const routerPostSecurityMode = require('./routes/watchdog/security-mode/dump')
app.use('/watchdog/security-mode/dump', routerPostSecurityMode.routerPost)

const routerGetSecurityMode = require('./routes/watchdog/security-mode/show')
app.use('/watchdog/security-mode/update', routerGetSecurityMode.routerGet)

const routerPostLoopMode = require('./routes/watchdog/security-loop/dump')
app.use('/watchdog/security-loop/dump', routerPostLoopMode.routerPost)

const routerGetLoopMode = require('./routes/watchdog/security-loop/show')
app.use('/watchdog/security-loop/show', routerGetLoopMode.routerGet)

/* ---------------- Rotas dos watchdogs  ---------------- */

/* Rotas dos watchdogs */
const routerGetMqtt = require('./routes/watchdog/mqtt')
app.use('/watchdog/mqtt', routerGetMqtt.routerGet)

app.listen(/* config.get('api.port') */3000, () => console.log('Tá tudo batendo!'))