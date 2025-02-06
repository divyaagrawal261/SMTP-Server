const SMTPServer = require('smtp-server').SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, callback) {
        console.log(`Connection attempt from ${session.remoteAddress}`);
        console.log(`Session ID: ${session.id}`);
        callback();
    },
    onMailFrom(address, session, callback) {
        console.log(`Mail from: ${address.address}`);
        console.log(`Session ID: ${session.id}`);
        callback();
    },
    onRcptTo(address, session, callback) {
        console.log(`Recipient: ${address.address}`);
        console.log(`Session ID: ${session.id}`);
    },
    onData(stream, session, callback) {
        stream.on('data', (data) => {
            console.log(`Received data chunk: ${data.toString()}`);
        });
        stream.on('end', () => {
            console.log('End of data stream');
            callback(); 
        });
    },
    onConnect(session, callback) {
        console.log(`New connection from ${session.remoteAddress}`);
        console.log(`Session ID: ${session.id}`);
        callback();
    }
});


server.listen(25, () => {
    console.log('SMTP server is listening on port 25');
});