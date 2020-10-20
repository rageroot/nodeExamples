const User = require('../models/users')

exports.form = (req, res) => {
    res.render('login', {title: 'login'});
};

exports.submit = (req, res, next) => {
    const data = req.body.user;
    User.authenticate(data.name, data.pass, (err, user) => { //Проверяет учетные данные
        if(err) return next(err); //обработка ошибок
        if(user) { //обрабатывает пользователя с действительными учетными данными
            req.session.uid = user.id; //сохраняет идентификатор пользователя для аутентификации
            res.redirect('/'); //перенаправление к списку
        }
        else{
            res.error('Sorry! invalid credentials');//сообщение об ошибке
            res.redirect('back');//перенаправляет обратно к форме входа
        }
    });
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
       if(err) throw err;
       res.redirect('/');
    });
};