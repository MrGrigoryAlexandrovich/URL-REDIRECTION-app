//  loading express
const express = require('express');
//  initializing express
const app = express();
//  loading consumer, redis connection and routes
const cunsumer = require('../src/consumer');
const client = require('./redis-connection');
const routes = require('./routes/routes')
// initializing routes
app.use('/api/routes',routes)

const PORT = 3000 || process.env.PORT;
//  start server
app.listen(PORT, ()=>
{
    console.log("Server run on ",PORT)
})
