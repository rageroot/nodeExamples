const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const articles = [{title: 'Example'}];

const port = process.env.PORT || 3000;

/*app.get('/', (req, res) => {
    res.send('Hello World!');
});*/

app.use(bodyParser.json()); //поддерживает тела запросов, закодированные в json
app.use(bodyParser.urlencoded({extended : true})); //поддерживает тела запросов, закодированные в кодировке формы

//получает все статьи
app.get('/articles', (req, res, next) => {
    res.send(articles);
});

//Создает статью
app.post('/articles', (req, res, next) => {
    const article = {title : req.body.title};
    articles.push(article);
    res.send(article);
});

//Получает одну статью
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Fetching', id);
    res.send(articles[id]);
});

//Удаляет статью
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting', id);
    delete articles[id];
    res.send({message: 'Deleted'});
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});

module.exports = app;