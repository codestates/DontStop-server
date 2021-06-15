const { user } = require('../../models')
const { group } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req,res) => {
        const accessToken = req.headers.accesstoken;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        const joinGroupId = await user.update(
            {
                group_id : req.body.id,
            },
            {
                where: { id: userInfo.id }
            }
        )
        const a = await group.update(
            {
                count : req.body.count - 1
            },
            {
                where: { id : req.body.id } 
            }
        )

        if(joinGroupId){
            res.status(200).json({
                group_id : req.body.id
            })
        }
    }
}