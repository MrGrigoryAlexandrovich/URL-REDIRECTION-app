const redis = require('redis');

// Create Redis Client
let client = redis.createClient({
  port:6379,
  host: "redis"
});

client.on('connect', function(){
console.log('Connected to Redis...');
});

module.exports = client;