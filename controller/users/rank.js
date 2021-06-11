const { user } = require('../../models')

module.exports = {
    get : async(req, res) => {
        res.status(200).send('랭크랭크');
    }
}