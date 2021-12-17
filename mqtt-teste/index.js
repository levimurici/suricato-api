const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://192.168.1.16", {clientId:"mqtt_watchdog", clean: true});
let client_status;

client.on("connect",function(){
    if (client.connected == true){
        console.log("connected  "+client.connected);
        client_status = client.connected;
    }
    else {
        console.log("connected  "+client.connected);
        console.log("falhou");
    }
client.end();
});

client.on("error", function(error){
    console.log("Can't connect" + error)
    client_status = error.errno
    process.exit(1);
});