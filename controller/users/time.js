const { userData } = require('../../models')
const { ranking } = require('../../models')
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

        let totalTime = cumulativeTime.dataValues.time + Number(req.body.time);
        console.log("cumulativeTime : ",cumulativeTime.dataValues.time)
        console.log("req.body.time : ",req.body.time)
        console.log("totalTime : ",totalTime)

        const setTime = await userData.update(
            {
                time: totalTime,
            },
            { 
                where: { user_id: userInfo.id } 
            }
        )
        
        const searchRanking = await ranking.findOne({
            where : {
                user_id : userInfo.id
            }
        })

        if(searchRanking){
            const updateTime = await ranking.update(
                {
                    user_time : totalTime
                },
                {
                    where : { user_id : userInfo.id }
                }
            )
        }

        console.log("searchRanking : ",searchRanking.dataValues.user_rank)
        /*
        const Ranking1 = await ranking.findOne({
            where : {
                user_rank : 1
            }
        })

        const Ranking2 = await ranking.findOne({
            where : {
                user_rank : 2
            }
        })

        const Ranking3 = await ranking.findOne({
            where : {
                user_rank : 3
            }
        })

        if(totalTime > Ranking1.dataValues.user_time){
            const changeRanking1 = await ranking.update(
                {
                    user_id : userInfo.id,
                    user_name : userInfo.name,
                    user_time : totalTime
                },
                {
                    where : { ranking : 3 }
                }
            )
        }
        */
        if(setTime) {
            res.status(200).json(totalTime)
        }
        
    },
    get: async(req, res) => {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const getUserData = await userData.findOne({
            where: { 
                user_id: userInfo.id 
            } 
        })
        if(getUserData){
            res.status(200).json({
                time : parseInt(getUserData.dataValues.time/60, 10)
            })
        }
        console.log(getUserData.dataValues.time)
    }
}
