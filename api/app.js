require('dotenv').config();
const app = require('./routes/index')
const CONFIG = require('./config/config.js')

app.listen(CONFIG.api.port, () => console.log('Tá tudo batendo!'))
console.log(process.env.MONGO_URL)
console.log(process.env.MONGO_DBNAME)
console.log(process.env.API_PORT)