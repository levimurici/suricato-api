const routerGet = require('express').Router()
const { MongoClient, ObjectId, ObjectID } = require('mongodb');
const CONFIG = require('../../../config/config')

const url = CONFIG.mongodb.url;
const client = new MongoClient(url);
const dbName = CONFIG.mongodb.dbName;
const db = client.db(dbName);
const collection = db.collection('suricatoIot')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

var suricatoObject = [];
var filter = {};

async function connect_to_find_data (){
    await client.connect();
    const filteredDocs = await collection.find({ "info.place": filter }).toArray();
    suricatoObject = filteredDocs;
    client.close();
}

routerGet.get('/:info', jsonParser, (req, res) => {
    filter = req.params.info;
    console.log(filter)
    connect_to_find_data()
    setTimeout(() => res.status(200).send(suricatoObject), 500)
});

module.exports = routerGet;