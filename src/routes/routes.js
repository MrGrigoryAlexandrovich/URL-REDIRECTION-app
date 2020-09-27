//  loading dependencies and modules
const express = require('express')
const client = require('../redis-connection/redis-connection')
// initializing express
const router = express()

// route for check if exist shortlURL
router.get('/check/:shortURL',(req,res) => {
        
        //select shorturl key if exist
        client.hgetall(req.params.shortURL, (err, reply) => { 
        if(err)
        console.log(err)

        //  if exist shortURL
        if(reply) {  

          //  RATE LIMIT CODE - BONUS
          //  select helper/expire key shorturl:+shortlink key for rate limit
          client.get("shorturl:"+req.params.shortURL,(error,result)=> {
            if(error)
            console.log(error)

            // if exist
            if(result)  {

               // if has 10 request in 120sec sendStatus 429 and refresh  expire to 120sec -> first request is null - last is 9
              if(result==9)  {
              client.expire("shorturl:"+req.params.shortURL,120) 
              res.sendStatus(429)  
              }

              //  if has 1 - 9 request in 120sec increase request number - > update expire time and redirect to realURL with status 302
              else  {
                  client.incr('shorturl:'+req.params.shortURL)  
                  client.expire("shorturl:"+req.params.shortURL,120)   
                  res.redirect(302,reply.realURL) 
              }
            }

            // if is first request in 120 sec create shorturl helper - value is null, set key expire to 120sec and redirect
            else {
            client.append("shorturl:"+req.params.shortURL,1) 
            client.expire("shorturl:"+req.params.shortURL,120)  
            res.redirect(302,reply.realURL)
            }
          })
        }
        // not exist shortURL
        else  
        res.sendStatus(404)
      })
 
})

module.exports = router