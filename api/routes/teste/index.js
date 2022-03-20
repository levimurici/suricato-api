/* Rotas do suricatoDB */
const { MongoClient } = require('mongodb');
const CONFIG = require('../../config/config.js')

const url = CONFIG.mongodb.url;
const client = new MongoClient(url);
const dbName = CONFIG.mongodb.dbName;
const db = client.db(dbName);
const collection = db.collection('suricatoIot')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const routerGetTest = require('express').Router()

var dataAlarm = {};

async function connect_to_and_get_data() {
    await client.connect();
    // console.log('Conectado para pegar dado teste!');

    dataAlarm = await collection.find({
        "name": "suricato01",
        "data.control": "control"
    }).toArray();
    // console.log(dataAlarm);  
}

routerGetTest.get('/', jsonParser, (req, res) => {
    res.status(200).send(dataAlarm)
});

connect_to_and_get_data()
    .catch(console.error)
    .finally(() => client.close());

module.exports = {
    routerGetTest, 
    dataAlarm,
}