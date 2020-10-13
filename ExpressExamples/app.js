var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var Entry = require('models/entry');
const entries = require("./routes/entries");
const bodyParser = require('body-parser');
const validate = require('./middleware/validate')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2); //удобночитаемый json

app.use(bodyParser.json());   //разбор данных формы
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', entries.list);

app.get('/post', entries.form);
app.post('/post',
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    validate.required('entry[body]'),
    validate.lengthAbove('entry[body]', 4),
    entries.submit);

app.use(logger('dev')); //выводит журналы в формате удобном для разработки
app.use(express.json());  //разбирает тела запросов
app.use(express.urlencoded({ extended: true }));//расширеный разбор тела сообщения
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //предоставляет статические файлы из указанного каталога

app.use('/', indexRouter); //задает маршруты приложения
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler выводит страницы ошибок в формате хтмл в режиме разработки
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
