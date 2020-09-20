const express = require('express');
const client = require('../redis-connection')

const router = express();

router.get('/check/:shortURL',(req,res) => {
        client.hgetall(req.params.shortURL, function(err, reply) {
        if(err)
        console.log(err);
        if(reply)
        {
         res.sendStatus(302);
        }
        else
        res.sendStatus(404);
      });
})

module.exports = router;