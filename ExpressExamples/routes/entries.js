const Entry = require('../models/entry');


exports.form = (req, res) => { //заоплняет шаблон, содержащий форму
    res.render('post', {title: 'Post'});
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