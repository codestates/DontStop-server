const { group } = require('../../models')
const { user } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
    post: async(req, res) => {
        // const accessToken = req.headers.accesstoken;
        // const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const newGroup = await group.create({
            title : req.body.title,
            contents : req.body.contents,
            count : 2,
        })

        if(newGroup){
            console.log("newGroup : ",newGroup.null)    //데이터 벨류는 id가 null로 잡히고 null이 값으로 잡힌다????왜??
            console.log("userInfo.id : ",userInfo.id)
            user.update(
                {
                    group_id : newGroup.null,
                },
                { 
                    where: { id: userInfo.id } 
                }
            )
            res.status(200).json({
                title : newGroup.title,
                contents : newGroup.contents,
                count : newGroup.count
            })  
        }
        
    },
    get : async(req, res) => {
        // const accessToken = req.headers.accesstoken;
        // const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

        const groupInfo = await group.findOne({
            where : {
                id : userInfo.group_id,
            }
        })
        if(groupInfo){
            res.status(200).json({
                title : groupInfo.title,
                contents : groupInfo.contents,
                count : groupInfo.count,
            })
        }
    }
}