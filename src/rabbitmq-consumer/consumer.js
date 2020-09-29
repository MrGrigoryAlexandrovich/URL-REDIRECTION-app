//loading amqp, redis connection and config
const amqp = require("amqplib")
const client = require('../redis-connection/redis-connection')
const config = require('../../config')

//call function on start because need listening all time - > dont closse connection same reason
connect()

//function for connection with rabbitmq
async function connect() {

    try {
        //set server, connection and channel
        const amqpServer = `amqp://${config.rabbitmq_host}:${config.rabbitmq_port}`              
        const connection = await amqp.connect(amqpServer)       
        const channel = await connection.createChannel()      
        await channel.assertQueue(config.rabbitmq_channel)             

            //consuming message to channel and parsing content to string
            channel.consume(config.rabbitmq_channel, message => {       
            message = JSON.parse(message.content.toString())   
            console.log('Consumer: Message received successfully')
            //switch-case for cheking producer create or delete shortURL
            switch(message[0])  {

                //case Created add message to redis -> the key is the last parameter of shortURL 
                //for example shortURL: http://localhost:8000/Pc8-2iyVB -> key is Pc8-2iyVB 
                case "Created":         
                    client.hmset(message[3].substring(22),[   
                    'id',message[1],
                    'realURL',message[2],
                    'shortURL', message[3]
                ])
                break
                
                //case Deleted remove message from redis -> the key is the last parameter of shortURL same is Created case 
                case "Deleted": 
                client.del(message[3].substring(22))
                break

                default:
                console.log('Unknown case')
                
            }
        },{
            noAck:true
        })

        console.log("Waiting for messages from producer...")
    
    }
    //catch exception
    catch (ex) {
        console.error(ex)
        process.exit(1)
    }
}

module.export