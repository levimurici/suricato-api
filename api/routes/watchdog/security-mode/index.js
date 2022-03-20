const routerPost = require('express').Router()
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

var modeToUpdate = {};
var update = {};
var filter = {};
var suricatoObject;

async function connect_to_find_data (){
    await client.connect();
    const filteredDocs = await collection.find({ "name": filter }).toArray();
    console.log('Filtered =>', filteredDocs[0]);
    suricatoObject = filteredDocs[0];
    
    client.close();
}

async function connect_to_and_update_data() {
    await client.connect();
    const suricatoUpdatedResult = await collection.updateOne({"name": filter}, {$set: update});
    console.log('Updated =>', suricatoUpdatedResult);
    client.close();
    return 'done'
}

routerPost.post('/', jsonParser, (req, res, next) => {
    modeToUpdate = req.body
    filter = modeToUpdate.name
    console.log('Filter post =>', filter)
    console.log('Object Arriving =>', modeToUpdate)

    update = {
        "data": {
            "status": modeToUpdate.data.status
        }
    }

    connect_to_find_data()
    setTimeout(() => connect_to_and_update_data(), 500)
    res.status(200).json({ status: true })
});

routerGet.get('/:security', jsonParser, (req, res) => {
    filter = req.params.security;
    console.log('Filter get =>',filter)
    connect_to_find_data()
    setTimeout(() => res.status(200).send(suricatoObject), 500)
});

module.exports = {
    routerPost, 
    routerGet
}

/*
EXAMPLE:
{
    "securityStatus" : {
        "data": 
        {
            "status": "status"
        }
    }
}*/