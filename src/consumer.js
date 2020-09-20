const amqp = require("amqplib");
const redis = require('redis');

// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("channel1");
        
            channel.consume("channel1", message => {
            message = JSON.parse(message.content.toString());
            console.log('Recieved '+message)

            switch(message[0])
            {
                case "Created":
                    client.hmset(message[1],[
                    'realURL',message[2],
                    'shortURL',message[3]
                ]);
                break;
                case "Deleted":
                client.del(message[1]);
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