const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articlesController');


router.get('/new', articleController.new);

router.get('/:slug', articleController.articleShow);

router.post('/save', articleController.saveArticle);

router.get('/edit/:id', articleController.updateArticleView)

router.put('/edit/:id', articleController.updateArticle)

router.delete('/:id', articleController.deleteArticle);

module.exports = router;