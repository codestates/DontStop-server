const { ranking } = require('../../models');

module.exports = {
    get : async(req, res) => {
        const rank1 = await ranking.findOne({
            where: {
              user_rank : 1
            },
        });
        const rank2 = await ranking.findOne({
            where: {
              user_rank : 2
            },
        });
        const rank3 = await ranking.findOne({
            where: {
              user_rank : 3
            },
        });
        // console.log("dd")
        res.status(200).json({
            ranking1 : rank1.user_name,
            ranking2 : rank2.user_name, 
            ranking3 : rank3.user_name
        });
    }
}