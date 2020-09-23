const express = require('express');
const client = require('../redis-connection')
const router = express();


router.get('/check/:shortURL',(req,res) => {
        
        client.hgetall(req.params.shortURL, (err, reply) => {
        if(err)
        console.log(err);
        if(reply)
        {
          client.get("shorturl:"+req.params.shortURL,(error,result)=>
          {
            if(error)
            console.log(error)
            if(result)
            {
              if(result==9)
              {
              console.log(result + 'Too Many Requests')
              client.expire("shorturl:"+req.params.shortURL,120)
              res.sendStatus(429);
              }
              else 
              {
                  console.log(result)
                  client.incr('shorturl:'+req.params.shortURL)
                  client.expire("shorturl:"+req.params.shortURL,120)
                  res.redirect(302,'http://'+reply.realURL)
              }
            }
            else
            {
            client.append("shorturl:"+req.params.shortURL,1)
            client.expire("shorturl:"+req.params.shortURL,120)
            console.log(result)
            res.redirect(302,'http://'+reply.realURL)
            }
          })
        }
        else
        res.sendStatus(404);
      });
 
})

module.exports = router;