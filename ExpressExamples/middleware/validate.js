function parseField(field){     //разбирает синтаксис entry[name]
    return field.split(/\[|\]/)
        .filter((s) => s);
}

function getField(req, field){ //ищет свойство на основании результата parseField
    let val = req.body;

    field.forEach((prop) => {
        val = val[prop];
    });
    return val;
}

exports.required = (field) => {
    field = parseField(field); //разбирает поле
    return (req, res, next) => {
        if(getField(req, field)) { //при каждом запросе проверяет содержит ли поле значение
            next(); //если содержит, происходит переход к следующему промежуточному компоненту
        } else {
            res.error(`${field.join(' ')} is required`);
            /*res.status(500).send(`${field.join(' ')} is required`);*/
            res.redirect('back');
        }
    };
};

exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
      if(getField(req, field).length > len){
          next();
      }  else {
          const fields = field.join('');
          /*res.status(500).send(`${fields} must have more than ${len} characters`);*/
          res.error(`${fields.join(' ')} must have more than ${len} characters`);
          res.redirect('back');
      }
    };
};