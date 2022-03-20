const config = {
    "api": {
        "port": process.env.API_PORT
    },

    "mongodb": {
        "url": process.env.MONGO_URL,
        "dbName": process.env.MONGO_DBNAME,
        "usuario": process.env.MONGO_USERNAME,
        "senha": process.env.MONGO_PASSWORD,
        "host": process.env.MONGO_HOST
    }
}

module.exports = config

// const config = {
//     "api": {
//         "port": 3000
//     },

//     "mongodb": {
//         "url": "mongodb://192.168.1.12:27017",
//         "dbName":"local",
//         "usuario": "root",
//         "senha": "suricato",
//         "host": "dnd-server"
//     }
// }

// module.exports = config
