const routerPost = require('express').Router()
const { MongoClient, ObjectId, ObjectID } = require('mongodb');
const CONFIG = require('../../../../config/config')

const url = CONFIG.mongodb.url;
const client = new MongoClient(url);
const dbName = CONFIG.mongodb.dbName;
const db = client.db(dbName);
const collection = db.collection('suricatoIot')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

var suricatoToUpdate = {};
var suricatoObject;
var suricatoObjectId;

var update = {};
var filter = {};

async function connect_to_find_data (){
    await client.connect();
    const filteredDocs = await collection.find({ "name": suricatoToUpdate.name }).toArray();
    console.log('Filtered =>', filteredDocs);
    suricatoObject = filteredDocs[0];
    suricatoObjectId = suricatoObject._id.str;

    // filter = { _id: ObjectId(suricatoObjectId) };
    filter = { name: suricatoObject.name };
    update = {
        "info": {
            "type": suricatoToUpdate.info.type,
            "place": suricatoToUpdate.info.place,
            "ipaddr": suricatoToUpdate.info.ipaddr
        },
        "data": {
            "status": suricatoToUpdate.data.status
        }
    }
    // console.log(filter)
    // console.log(update)
    client.close();
}

async function connect_to_and_update_data() {
    await client.connect();
    const suricatoUpdatedResult = await collection.updateOne(filter, {$set: update});
    console.log('Updated =>', suricatoUpdatedResult);
    client.close();
    return 'done'
}

routerPost.post('/', jsonParser, (req, res, next) => {
    suricatoToUpdate = req.body
    console.log('Arriving =>', suricatoToUpdate)

    connect_to_find_data()
    setTimeout(() => connect_to_and_update_data(), 500)
    res.status(200).json({ status: true })
});

module.exports = {
    routerPost, 
    suricatoToUpdate,
}

/* 
http://localhost:3000/motion/update/suricato20
{ 
    "_id" : ObjectId("627c2ac0e8199bdbbaaf313e"), 
    "name" : "suricato20", 
    "info" : {
        "type" : "Motion", 
        "place" : "quarto", 
        "ipaddr" : "192.168.1.14"
    }, 
    "data" : {
        "status" : "UNKNOWN"
    }
}
*/