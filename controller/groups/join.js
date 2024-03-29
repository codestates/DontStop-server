const { user } = require('../../models')
const { group } = require('../../models')
const { userData } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req,res) => {
        // const accessToken = req.headers.accesstoken;
        // const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const joinGroupId = await userData.update(
            {
                group_id : req.body.id,
            },
            {
                where: { user_id: userInfo.id }
            }
        )
        const groupCount = await group.update(
            {
                count : req.body.count - 1
            },
            {
                where: { id : req.body.id }
            }
        )

        if(joinGroupId){
            console.log(groupCount)
            res.status(200).json({
                group_id : req.body.id,
                count : req.body.count - 1
            })
        }
    }
}