const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req,res) => {
    res.render('articles/new', {article: new Article()});
});

router.get('/:slug', async (req,res) => {
    try {
        const article = await Article.findOne({
            slug:req.params.slug
        });
        if (article == null) {
            return res.redirect('/')
        }
        return res.render('articles/article', {article})
    } catch(error) {
        console.log(error);
    }
})

router.post('/', async (req,res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try{
        article = await article.save();
        return res.redirect(`/articles/${article.slug}`)
    } catch(error) {
        return res.render('articles/new', {article:article})
    }
})


router.delete('/:id', async(req,res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

module.exports = router;