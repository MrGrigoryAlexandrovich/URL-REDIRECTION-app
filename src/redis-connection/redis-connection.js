//loading redis and config
const redis = require('redis');
const config = require('../../config')

// Create Redis Client and connection
let client = redis.createClient({
  port: config.redis_port,
  host: config.redis_host
})

client.on('connect', ()=> {
  console.log('Connected to Redis...')
})

module.exports = client