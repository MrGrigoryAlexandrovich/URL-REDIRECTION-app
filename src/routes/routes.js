const express = require('express');
const client = require('../redis-connection')

const router = express();

router.get('/check/:shortURL',(req,res) => {
        client.hgetall(req.params.shortURL, function(err, reply) {
        if(err)
        console.log(err);
        if(reply)
        {
        res.redirect('http://'+reply.realURL)
        }
        else
        res.sendStatus(404);
      });
})

module.exports = router;