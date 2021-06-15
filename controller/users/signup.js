const { user } = require('../../models')

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
            user.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                // rank : req.body.rank
            })
            .then(() =>{
                res.status(201).json({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                });
            })
        }
    }
}