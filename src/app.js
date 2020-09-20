const express = require('express');
const app = express();

const cunsumer = require('../src/consumer');

const PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=>
{
    console.log("Server run on ",PORT)
})