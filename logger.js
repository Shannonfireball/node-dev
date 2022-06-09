
const EventEmmiter = require('events');


const url = 'http://mylogger.io/log';


class Logger extends EventEmmiter {

    log(message) {
        console.log(message);
        // instead of the emitter object we use this   
        this.emit('message_emitted',{ id:1, url:'https://'});
    }

}



module.exports = Logger;

