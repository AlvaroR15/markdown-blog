const Article = require('../models/article');

const mainController = {
    index: async (req,res) => {
        try {
            const articles = await Article.find().sort({createdAt: 'desc'});
            return res.render('../views/index', {articles})
        } catch(error) {console.log(error)}
    }
}


module.exports = mainController;