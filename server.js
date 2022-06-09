
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const { logger } = require('./middleware/logEvents');
const  { credentials }  = require('./middleware/credientials');

const mongoose = require('mongoose');
// gettting the connect db function
const connectDB = require('./config/dbConn');

const verfyJWT = require('./middleware/verifyJWT');

const cookieParser = require('cookie-parser');

const express = require('express');

// connect to db
connectDB();


const app = express();   
const path = require('path');
const PORT = process.env.PORT || 3500;
app.use(logger);


app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded( { extended:false } ));
app.use(express.json());


app.use(cookieParser());
        
app.use('/',express.static(path.join(__dirname,'/public')));    

app.use('/',require('./routes/root.js'));

app.use('/register',require('./routes/register.js'));


app.use('/auth',require('./routes/auth.js'));

app.use('/refresh',require('./routes/refresh.js'));

app.use('/logout',require('./routes/logout'));

app.use(verfyJWT);
app.use('/employees',require('./routes/api/employees.js'));

app.all('*',(request,response) => {

    response.status(404);
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname,'views','404.html'));
    } else if(request.accepts('json')){
        response.json( {error:"404 not found"});
    } else {
        response.type('txt').send('404 not found');
    }

});

mongoose.connection.once('open',() => {
    console.log('connected to mongoDB');
        
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});


