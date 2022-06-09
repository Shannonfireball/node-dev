const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleLogin = async (request,response) => {
    const { user, pwd} = request.body;
    if(!user || !pwd){         
        return response.status(400).json({ "message":"username and password are needed" })
    };
    
    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser){           
        return response.status(401);
    }
    
    const match = await bcrypt.compare( pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles)     
                                    
        const accessToken = jwt.sign(
            { "UserInfo":{
                "username": foundUser.username,
                "roles":roles
            }
             },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn:'30s' }

        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn:'1d' }

        );  
        // saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        response.cookie( 'jwt', refreshToken, { httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000 } );
        response.json({ accessToken });
    } 
    else{
        return response.sendStatus(401);
    }

};



module.exports = { handleLogin };