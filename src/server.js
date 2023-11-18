const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const router = require('./routes/index');
const routerArticle = require('./routes/articles');


const PORT = 4080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1:27017/markdown-blog')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))


app.use('/', router);
app.use('/articles', routerArticle);


app.listen(PORT, () => {
    console.log(`[server]: running in port ${PORT}`);
})