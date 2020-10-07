const express = require('express');
const bodyParser = require('body-parser');
const Article = require('./db').Article; //модуль базы данных
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
    Article.all((err, articles) => {
        if(err) return next(err);
        res.send(articles);
    });
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
    Article.find(id, (err, article) => {
        if(err) return next(err);
        res.send(articles);
    });
});

//Удаляет статью
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if(err) return next(err);
        res.send({message: 'Deleted'});
    });
});

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});

module.exports = app;