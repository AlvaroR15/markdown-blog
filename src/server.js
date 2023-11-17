const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const articlesRouter = require('./routes/articles');
const Article = require('./models/article')
const methodOverride = require('method-override');

const PORT = 4080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1:27017/markdown-blog')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('index', {articles})
})

app.use('/articles', articlesRouter);


app.listen(PORT, () => {
    console.log(`[server]: running in port ${PORT}`);
})