const { userData } = require('../../models')
const { ranking } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req, res) => {
        //--------------------------------time 누적--------------------------------------//
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

        //----------------------------------랭킹 갱신------------------------------------//

        const searchRanking = await ranking.findOne({
            where : {
                user_id : userInfo.id
            }
        })
        
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
        //---랭킹안에 있으면--//
        if(searchRanking){
            const updateTime = await ranking.update(
                {
                    user_time : totalTime
                },
                {
                    where : { user_id : userInfo.id }
                }
            )

            console.log("Ranking2.dataValues.user_id : ",Ranking2.dataValues.user_id)
            console.log("userInfo.id : ",userInfo.id)
            console.log("Ranking1.dataValues.user_time : ",Ranking1.dataValues.user_time)
            //-----------------------------2등이면서 1등보다 크면 랭킹 변화---------------------------------------------------------//
            if(Ranking2.dataValues.user_id === userInfo.id && totalTime > Ranking1.dataValues.user_time) {
                const changeRanking1 = await ranking.update(
                    {
                        user_rank : 2,
                    },
                    {
                        where : { user_rank : 1 }
                    }
                )

                const rankUp = await ranking.update(
                    {
                        user_rank : 1,
                    },
                    {
                        where : { user_id : userInfo.id }
                    }
                )
            }
            //-----------------------------3등이면서 2등보다 크면 랭킹 변동---------------------------------------------------------//
            if(Ranking3.dataValues.user_id === userInfo.id && totalTime > Ranking2.dataValues.user_time) {
                const changeRanking2 = await ranking.update(
                    {
                        user_rank : 3,
                    },
                    {
                        where : { user_rank : 2 }
                    }
                )

                const rankUp = await ranking.update(
                    {
                        user_rank : 2,
                    },
                    {
                        where : { user_id : userInfo.id }
                    }
                )
            //-----------------------------2등으로 랭킹 변동후 1등보다도 크면 다시 랭킹변동-----------------------------------------------//            
                if(totalTime > Ranking1.dataValues.user_time) {
                    const changeRanking1 = await ranking.update(
                        {
                            user_rank : 2,
                        },
                        {
                            where : { user_rank : 1 }
                        }
                    )

                    const rankUp = await ranking.update(
                        {
                            user_rank : 1,
                        },
                        {
                            where : { user_id : userInfo.id }
                        }
                    )
                }
            }
        }
        //---랭킹안에 없으면--//
        else{
            //--------------랭킹 내 진입이 가능한지. >> 3등보다 크면 기존 3등은 지우고 새로운 랭킹 3위로 create----------------//
            if(totalTime > Ranking3.dataValues.user_time) { 
                const deleteRank = await ranking.destroy({
                    where : {
                        user_rank : 3
                    }
                })
                const creatRank = await ranking.create({
                    user_id : userInfo.id,
                    user_rank : 3,
                    user_name : userInfo.name,
                    user_time : totalTime
                })
                //---------------1등보다 크면 랭킹 변동--------------------------//
                if(totalTime > Ranking1.dataValues.user_time) { 
                    const changeRanking2 = await ranking.update(
                        {
                            user_rank : 3,
                        },
                        {
                            where : { user_rank : 2 }
                        }
                    )
                    const changeRanking1 = await ranking.update(
                        {
                            user_rank : 2,
                        },
                        {
                            where : { user_rank : 1 }
                        }
                    )
                    const rankUp = await ranking.update(
                        {
                            user_rank : 1,
                        },
                        {
                            where : { user_id : userInfo.id }
                        }
                    )
                }
                //-------------1등보다는 작지만 2등보다 크면 랭킹변동------------------//
                else if (totalTime > Ranking2.dataValues.user_time){
                    const changeRanking2 = await ranking.update(
                        {
                            user_rank : 3,
                        },
                        {
                            where : { user_rank : 2 }
                        }
                    )
                    const rankUp = await ranking.update(
                        {
                            user_rank : 2,
                        },
                        {
                            where : { user_id : userInfo.id }
                        }
                    )
                }
            }
            
        }
        
        if(setTime) {
            res.status(200).json(parseInt(totalTime/60,10))
        }
        
    },
}
