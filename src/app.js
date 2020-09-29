//loading express and config
const express = require('express')
const app = express()
const config = require('../config')
//define port
const PORT = config.app_port || 8001

//loading consumer, redis connection and routes
const cunsumer = require('./rabbitmq-consumer/consumer')
const client = require('./redis-connection/redis-connection')
const routes = require('./routes/routes')

//initializing routes
app.use('/api/routes',routes)

//start server
app.listen(PORT, ()=> {
    console.log("Server run on ",PORT)
})
