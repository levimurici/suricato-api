require('dotenv').config();
const app = require('./routes/index')
const CONFIG = require('./config/config.js')

app.listen(CONFIG.api.port, () => console.log('Tá tudo batendo!'))