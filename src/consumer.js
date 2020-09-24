//  loading amqp and redis connection
const amqp = require("amqplib");
const client = require('./redis-connection')

connect(); //   call function on start because need listening message all time
async function connect() {

    try {
        const amqpServer = "amqp://rabbitmq:5672"               //    server
        const connection = await amqp.connect(amqpServer)       //    connection
        const channel = await connection.createChannel();       // create channel
        await channel.assertQueue("url-channel3");              // assert Queue
        
            channel.consume("url-channel3", message => {        //listening to channel for messages
            message = JSON.parse(message.content.toString());   //parsing incoming messages
            console.log('Recieved');
            console.log(message);
            switch(message[0])              //switch message[0] for checking is shorURL created or deleted
            {
                case "Created":         // case Created
                    client.hmset(message[3].substring(22),[     //add in redis with shortURL key - remove protocol and headers host from message
                    'id',message[1],
                    'realURL',message[2],
                    'shortURL', message[3]
                ]);
                break;
                case "Deleted":  //case Deleted 
                client.del(message[3].substring(22)); //remove from redis with shortURL key - remove protocol and headers host from messages
                break;
                default:
                console.log('Unknown case');
                
            }
        })

        console.log("Waiting for messages from producer...")
    
    }
    catch (ex){
        console.error(ex)
    }

}

module.export;