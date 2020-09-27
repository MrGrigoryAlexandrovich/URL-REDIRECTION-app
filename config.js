const config = {}
//  hosts
config.rabbitmq_host='rabbitmq'
config.redis_host = 'redis'

// ports
config.app_port=8001
config.rabbitmq_port = 5672
config.redis_port = 6379

//rabitmq channel
config.rabbitmq_channel = 'url-channel'

module.exports =config