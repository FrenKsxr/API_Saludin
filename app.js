const express = require('express')
const app = express();
const cors = require('cors')
const env = require('dotenv').config();
require('./middlewareXXX/cronjob'); // Importa el archivo con el cron job
const { sendWhatsAppMessage } = require('./middlewareXXX/whasa'); 

/*rutas*/
const alarms = require('./routes/alarmsRoutes')
const swaggerUI = require ('swagger-ui-express')
const specs = require('./swagger/swagger')
app.use(cors());/*Permiso pa todos pq luego es un pedo*/



app.use(express.json());

app.use("/docs", swaggerUI.serve,swaggerUI.setup(specs))
app.use('/', alarms)

app.use(express.json());



const PORT = process.env.port

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})