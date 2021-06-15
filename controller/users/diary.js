const { post } = require('../../models')

module.exports = {
    post: async(req,res) => {
        const accessToken = req.headers.accesstoken;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        post.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        .then(() => {
            res.send("ok")
            res.status(201).json(newPost);
        })
    }
}