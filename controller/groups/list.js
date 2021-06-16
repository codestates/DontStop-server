const { post } = require('../../models')
const { userData } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    get: async(req,res) => {
        // const accessToken = req.headers.accesstoken;
        // const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);
        // console.log("userInfo.group_id : ",userInfo)

        const userDataInfo = await userData.findOne({
            where : {
                user_id : userInfo.id
            }
        })

        const groupList = await post.findAll({
            where : {
                group_id : userDataInfo.group_id
            }
        })
        // console.log("groupList.group_id : ",groupList)
        if(groupList){
            res.status(200).json(groupList)
        }
    }
}
