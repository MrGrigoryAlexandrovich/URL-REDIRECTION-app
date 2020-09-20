const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("urls");
        
            channel.consume("urls", message => {
            const msg = JSON.parse(message.content.toString());
            console.log(`Recieved  ${msg}`)
           // if(msg[0]=="Created") if is create in redis //maybe switch case for created and deleted
            //console.log('DA')
        })

        console.log("Waiting for messages...")
    
    }
    catch (ex){
        console.error(ex)
    }

}

module.export;