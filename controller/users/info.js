const { user } = require('../../models')

module.exports = {
    post: async(req, res) => {
        res.end();
    },
    get : (req, res) => {
        res.status(200).send('인포인포');
    }
}