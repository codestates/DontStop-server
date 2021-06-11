const { user } = require('../../models')
const jwt = require('jsonwebtoken');

module.exports = {
    post: async(req, res) => {
        
        const userInfo = await user.findOne({
            where : {
                email : req.body.email,
                password : req.body.password
            },
        });
        if(!userInfo) {
            res.status(404)
        }
        else{
            const accesstoken = jwt.sign({
                email:userInfo.email,
                password:userInfo.password,
              },process.env.ACCESS_SECRET);
          
            const refreshtoken = jwt.sign({
                email:userInfo.email,
                password:userInfo.password,
              },process.env.REFRESH_SECRET);
              
            res.cookie('refreshToken', refreshtoken, {
                secure: true,
                httpOnly: true,
                sameSite:'none',
            });

            res.status(200).send({
                userinfo:{
                    email:userInfo.email,
                    password:userInfo.password,
                },
                accessToken:accesstoken, 
            }); 
        }
    }
}