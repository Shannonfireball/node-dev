const whitelist = ['http://www.google.com','http://127.0.0.1:5500','http://localhost:3500'];


const credentials = (request,response,next) =>{
    const origin = request.headers.origin;
    if(whitelist.indexOf(origin)){
        response.header('Access-Control-Allow-credentials', true);
    }
    next();
};

module.exports = { credentials}