const User = require('../models/users');

exports.form = (req, res) => { //заоплняет шаблон, содержащий форму
    res.render('register', {title: 'Register'});
};

exports.submit = (req, res, next) => {
  const data = req.body.user; //берем данные из формы
  User.getByName(data.name, (err, user) => { //проверяет имя пользователя на уникальность
      if(err) return next(err); //пробрасывает ошибки БД и другие ошибки
      //redis использует значение по умолчанию
      if(user.id){//если пользователь занят
          res.error('Username already taken!');
          res.redirect('back');
      } else { //создает пользователя
          user = new User({
              name: data.name,
              pass: data.pass
          });
          user.save((err) => { //сохраняет нового пользователя
              if(err) return next(err);
              req.session.uid = user.id; //сохраняет id для аутентификации
              res.redirect('/'); //перенаправляет на главную
          });
      }
  });
};