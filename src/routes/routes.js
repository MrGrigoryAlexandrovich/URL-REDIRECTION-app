//  loading dependencies and modules
const express = require('express');
const client = require('../redis-connection')
// initializing express
const router = express();

// route for check if exist shortlURL
router.get('/check/:shortURL',(req,res) => {
        
        client.hgetall(req.params.shortURL, (err, reply) => { //select short url if exist
        if(err)
        console.log(err);
        if(reply) //if exist
        {
          client.get("shorturl:"+req.params.shortURL,(error,result)=> // select helper/expire key shorturl:+shortlink key
          {
            if(error)
            console.log(error)
            if(result)    // if exist
            {
              if(result==9)   // if has 10 request in 120sec
              {
              console.log(result + 'Too Many Requests')
              client.expire("shorturl:"+req.params.shortURL,120) // update helper expire time - 120sec
              res.sendStatus(429);  //send status 429 - to many requests
              }
              else  //if has 1 - 9 request in 120sec
              {
                  console.log(result) 
                  client.incr('shorturl:'+req.params.shortURL)  // increase request number
                  client.expire("shorturl:"+req.params.shortURL,120)   // update helper expire time - 120sec
                  res.redirect(302,'http://'+reply.realURL) //  send status 302 and redirect to realURL
              }
            }
            else // if is first request in 120 sec
            {
            client.append("shorturl:"+req.params.shortURL,1) // created helper expire key
            client.expire("shorturl:"+req.params.shortURL,120)  // key expire in 120sec
            console.log(result)
            res.redirect(302,'http://'+reply.realURL) // send status 302 and redirect to realURL
            }
          })
        }
        else  // not exist shortURL
        res.sendStatus(404); 
      });
 
})

module.exports = router;