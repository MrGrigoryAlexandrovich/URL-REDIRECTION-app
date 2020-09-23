const express = require('express');
const app = express();

const cunsumer = require('../src/consumer');
const client = require('./redis-connection');
const routes = require('./routes/routes')
app.use('/api/routes',routes)

const PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=>
{
    console.log("Server run on ",PORT)
})
