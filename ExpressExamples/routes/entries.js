const Entry = require('../models/entry');


exports.form = (req, res) => { //заоплняет шаблон, содержащий форму
    res.render('post', {title: 'Post'});
};

exports.list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => { //получает запрос
      if(err) return next(err);
      res.render('entries', {   //строит ответ
          title: 'Entries',
          entries: entries
      });
  });
};

exports.submit = (req, res, next) => {
    const data = req.body.entry; //берется из name = "entry[] в форме"
    const user = res.locals.user; //промежуточный компонент для загрузки пользователей
    const username = user ? user.name : null;
    const entry = new Entry({
        username: username,
        title: data.title,
        body: data.body
    });

    entry.save((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
};