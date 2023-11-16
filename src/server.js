const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/articles');

const PORT = 4080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use('/articles', router)
 
app.listen(PORT, () => {
    console.log(`[server]: running in port ${PORT}`);
})