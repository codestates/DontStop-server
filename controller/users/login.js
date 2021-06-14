const { user } = require('../../models')
const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = {
    post: async(req, res) => {
        console.log(req.body)
        const userInfo = await user.findOne({
            where: {
              email : req.body.email
            },
          });
      
          if (!userInfo) {
            res.status(404).send("이메일 없어요!");
          } else {
            if (userInfo.dataValues.password !== req.body.password) {
                console.log(userInfo.password)
                console.log(req.body.password)
              res.status(404).send("비밀번호 틀려요!");
            } else {
              delete userInfo.dataValues.password;
      
              const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
                expiresIn: "1h",
              });
              res.status(200).json({ accessToken: accessToken, message: "ok" });
            }
          }
        }
}