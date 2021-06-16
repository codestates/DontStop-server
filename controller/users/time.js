const { userData } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req, res) => {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const cumulativeTime = await userData.findOne({
            where: { 
                user_id: userInfo.id 
            } 
        })
        console.log("cumulativeTime : ",cumulativeTime.dataValues.time)
        console.log("req.body.time : ",req.body.time)

        const setTime = await userData.update(
            {
                time: cumulativeTime.dataValues.time + Number(req.body.time),
            },
            { 
                where: { user_id: userInfo.id } 
            }
        )
        console.log("setTime : ",cumulativeTime.dataValues.time + Number(req.body.time))

        if(setTime) {
            res.status(200).json(cumulativeTime.dataValues.time + Number(req.body.time))
        }
        
    },
    get: async(req, res) => {
        res.end()
    }
}
