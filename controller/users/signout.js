const { user } = require('../../models')
module.exports = {
    post: async(req,res) => {
        console.log("dkdndnt")
        res.status(200).send('로그아웃')
    }
}