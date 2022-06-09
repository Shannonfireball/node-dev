const User = require('../model/User');

const handleLogout = async (request,response) => {
    // on client, also delete the access token
    const cookies = request.cookies
    if(!cookies?.jwt){         
        return response.sendStatus(204)
    };
    const refreshToken = cookies.jwt

    // is the refresh token in DB
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser){           
        response.clearCookie('jwt',{ httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000})
        return response.status(204);
    }
    // delete refresh token in the database
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    response.clearCookie('jwt',{ httpOnly:true, sameSite:'none', secure:true, maxAge:24*60*60*1000}); // we also have to add secure:true  that makes serve only https
    response.sendStatus(204);    
};



module.exports = { handleLogout };