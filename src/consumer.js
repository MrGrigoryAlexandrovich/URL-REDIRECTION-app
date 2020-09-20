const amqp = require("amqplib");
const client = require('./redis-connection')

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("url-channel3");
        
            channel.consume("url-channel3", message => {
            message = JSON.parse(message.content.toString());
            console.log('Recieved');
            console.log(message);
            switch(message[0])
            {
                case "Created":
                    client.hmset(message[3].substring(22),[
                    'id',message[1],
                    'realURL',message[2],
                    'shortURL', message[3]
                ]);
                break;
                case "Deleted":
                client.del(message[3].substring(22));
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