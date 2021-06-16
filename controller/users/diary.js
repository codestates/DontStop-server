const { post } = require('../../models')
const { userData } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req,res) => {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const userDataInfo = await userData.findOne({
            where : {
                user_id : userInfo.id
            }
        })

        const newPost = await post.create({
            group_id : userDataInfo.group_id,
            user_name : userInfo.name,
            title : req.body.title,
            contents : req.body.contents,
        })
        console.log("userDataInfo.group_id : ",userDataInfo.group_id)
        console.log("userInfo.name : ",userInfo.name)
        console.log("req.body.title : ",req.body.title)
        console.log("req.body.contents : ",req.body.contents)

        if(newPost) {
            res.status(201).json({
                group_id : userDataInfo.group_id,
                user_name : userInfo.name,
                title : req.body.title,
                contents : req.body.contents,
            });
        }
    }
}