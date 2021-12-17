const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const routerGet = require('express').Router()
const mqtt = require('mqtt')

/* const mqtt_options = {
    clientId:"mqttjs01",
    username:"steve",
    password:"password",
    clean:true
}; */

let mqtt_status;
var mqqtStatus = {
    "status":  mqtt_status
};

routerGet.get('/', jsonParser, (req, res) => {
const client = mqtt.connect("mqtt://192.168.1.16");
client.on("connect",function(){	
    if (client.connected == true){
        mqqtStatus["status"] = client.connected
    }
    client.end();
});

client.on("error", function(error){
    mqqtStatus["status"] = error.errno
    console.log(`Conexão com mqtt falou: ${mqqtStatus["status"]}`)
});

res.send(mqqtStatus)
})

module.exports = {
    routerGet, 
    mqqtStatus
}