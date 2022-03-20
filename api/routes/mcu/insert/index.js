const routerPost = require('express').Router()
const { MongoClient } = require('mongodb');
const CONFIG = require('../../../config/config')

const url = CONFIG.mongodb.url;
const client = new MongoClient(url);
const dbName = CONFIG.mongodb.dbName;
const db = client.db(dbName);
const collection = db.collection('suricatoIot')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

let suricatoInserted = {};

async function connect_to_and_insert_data() {
    await client.connect();
    // console.log('Conectado para inserir suricato no banco!');
    const insertResult = await collection.insertOne(suricatoInserted);
    console.log('Inserted documents =>', insertResult);
    return 'done'
}

routerPost.post('/', jsonParser, (req, res, next) => {
    suricatoInserted = req.body
    console.log(suricatoInserted)

    connect_to_and_insert_data()
    .catch(console.error)
    .finally(() => client.close());
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    suricatoInserted,
}