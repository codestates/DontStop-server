const { user } = require('../../models');
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req, res) => {
        const accessToken = req.headers.accesstoken;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        
        user.update(
            {
                password: req.body.password,
            },
            { 
                where: { email: userInfo.email } 
            }
        )
        .then(() => {
            res.status(200).json({ChangePassword : req.body.password})
        })
    },
    get : (req, res) => {   
        // console.log(req.headers.accesstoken)
        const accessToken = req.headers.accesstoken;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        // res.send(userinfo);
        
        res.status(200).json({
            name : userInfo.name,
            email : userInfo.email
        });
    }
}