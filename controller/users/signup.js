const { user } = require('../../models')
const { userData } = require('../../models')

module.exports = {
    post: async(req,res) => {
        console.log("req.body :",req.body)
        const userInfo = await user.findOne({
            where : {
                email : req.body.email,
            }
        })
        if(userInfo) {
            res.status(409).json({ message : "사용중인 email 입니다!" });
        }
        else {
            const newUser = await user.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                // rank : req.body.rank
            })

            const newUserData = await userData.create({
                user_id : newUser.null
            })

            if(newUserData){
                console.log("newUser : ",newUser.null)
                console.log("newUserData : ",newUserData.dataValues)
                res.status(201).json({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                });
            }
        }
    }
}