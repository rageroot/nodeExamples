

exports.form = (req, res) => { //заоплняет шаблон, содержащий форму
    res.render('register', {title: 'Register'});
};