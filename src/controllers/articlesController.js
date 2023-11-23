const Article = require('../models/article');

const articleController = {
    new: (req,res) => {
        return res.render('../views/articles/new', {article: new Article()})
    },
    articleShow: async(req,res) => {
        try {
            const article = await Article.findOne({
                slug: req.params.slug
            });
            const articles = await Article.find().sort({createdAt: 'desc'});
            if (!article) {
                return res.redirect('/')
            };
            return res.render('../views/articles/article', {article, articles})
        } catch(error) {
            console.log(error);
        }
    },
    saveArticle: async (req,res) => {
        let article = new Article({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        });
        try {
            article = await article.save();
            return res.redirect('/articles/'+article.slug);
        } catch(error) {
            console.log(error);
        }
    },
    deleteArticle: async(req,res) => {
        await Article.findByIdAndDelete(req.params.id);
        return res.redirect('/');
    },
    updateArticleView: async(req,res) => {
        const article = await Article.findById(req.params.id);
        return res.render('../views/articles/edit', {article})
    },
    updateArticle: async(req,res) => {
        let article = new Article({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        });
        try {
            article = await article.save();
            return res.redirect('/articles/'+article.slug);
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = articleController;