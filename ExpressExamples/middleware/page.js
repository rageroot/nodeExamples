//промежуточный компонент для разбиеня на страницы
'use strict'
module.exports = (cb, perpage) => {
    perpage = perpage || 10; //по умолчанию 10 записей на страницу
    return (req, res, next) => { //возвращает функцию промежуточног компонента
        let page = Math.max(
            parseInt(req.params.page || '1', 10), 1) - 1;// разбирает параметр page как десятичное целое число
            cb((err, total) => {  //активизирует переданную функцию
                if(err) return next(err);   //Делегирует обработку ошибок
                req.page = res.locals.page = { //сохраняет свойства page для будущих обращений
                    number: page,
                    perpage: perpage,
                    from: page * perpage,
                    to: page * perpage - 1,
                    total: total,
                    count: Math.ceil(total / perpage)
                };
                next(); //передает управление следующему промеутоному компоненту
            });
    };
};