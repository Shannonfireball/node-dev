
const { format } = require('date-fns');
const { v4:uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime =  `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
                                                       // to go one directory up
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs',logName), logItem)
    }
    catch(error) {
        console.log(error);
    }
}


const logger = ( request,response,next ) => {
    logEvents(`${request.method}\t${request.header.origin}\t${request.url}`,'reqLog.txt')
    console.log(`${request.method} ${request.path}`);
    next();
};


module.exports = { logger,logEvents };





