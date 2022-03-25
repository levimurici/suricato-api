require('dotenv').config();
const app = require('./routes/index')
const CONFIG = require('./config/config.js')

app.listen(CONFIG.api.port, () => console.log('Tá tudo batendo!'))
console.log("Ip do banco -->",process.env.MONGO_URL)
console.log("Nome da base -->",process.env.MONGO_DBNAME)