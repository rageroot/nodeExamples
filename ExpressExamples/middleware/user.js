const User = require('../models/users');

module.exports = (req, res, next) => {
    if(req.remoteUser) {
        res.locals.user = req.remoteUser;
    }

    const uid = req.session.uid; //получает идентификатор выполнившего вход пользователя
    if(!uid) return next();
    User.get(uid, (err, user) => { //Получает данные о пользователе из Redis
        if(err) return next(err);
        req.user = res.locals.user = user; //Предоставляет доступ к данным пользователя объекту запроса
        next();
    });
};