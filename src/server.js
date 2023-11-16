const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const articlesRouter = require('./routes/articles');

const PORT = 4080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/markdown-blog')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use('/articles', articlesRouter);

app.get('/', (req,res) => {
    const articles = [
        {
            title: 'Article 1',
            createdAt: new Date(),
            description: 'Description 1'
        },
        {
            title: 'Article 2',
            createdAt: new Date(),
            description: 'Description 2'
        },
        {
            title: 'Article 2',
            createdAt: new Date(),
            description: 'Description 2'
        },
    ];
    res.render('index', {articles})
})
 
app.listen(PORT, () => {
    console.log(`[server]: running in port ${PORT}`);
})