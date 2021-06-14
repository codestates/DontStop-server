const { user } = require('../../models')

module.exports = {
    post: async(req,res) => {
        console.log(req.body)
        const userInfo = await user.findOne({
            where : {
                email : req.body.email,
            }
        })
        if(userInfo) {
            res.status(409).send("이메일이 존재합니다")
        }   
        else {
            const newUser = await user.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
            })
            .then(() => {
                res.send("ok")
                res.status(201).json(newUser);
            })
        }
    }
}