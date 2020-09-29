const config  = {  
//hosts
rabbitmq_host: 'rabbitmq',
redis_host: 'redis',

//ports
app_port: 8001,
rabbitmq_port: 5672,
redis_port: 6379,

//rabitmq channel
rabbitmq_channel: 'url-channel'
}
module.exports = config