const { user } = require('../../models')

module.exports = {
    post: async(req,res) => {
        console.log(req.body)
        // const userInfo = await User.findOne({
        //     where : {
        //         email : req.body.email,
        //     }
        // })
        // if(userInfo) {
        //     res.status(404)
        // }
        // else 
        {
            user.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
            })
            .then(() => {
                res.status(201)
            })
        }
    }
}