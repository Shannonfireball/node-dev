//
const User = require('../model/User');


const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleRefreshToken = async (request,response) => {
    const cookies = request.cookies;
    if(!cookies?.jwt){         
        return response.sendStatus(401)
    };
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
                      // 
    const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
    if(!foundUser){           
        return response.status(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error,decoded)=>{
            if(error || foundUser.username !== decoded.username){
                return response.sendStatus(403);
            }
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo":{
                        "username":decoded.username,
                        "roles":roles
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn:'30s'}
            );
            response.json({ accessToken });
        }
    );
};



module.exports = { handleRefreshToken };