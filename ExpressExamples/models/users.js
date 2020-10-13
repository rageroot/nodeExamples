const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient() // созадет долгосрочное подключение к redis

class User{
    constructor(obj) {
        for(let key in obj){
            this[key] = obj[key];
        }
    }

    save(cb){
        if(this.id){        //если идентификатор определен, то пользователь существует
            this.update(cb);
        } else {
            db.incr('user:ids', (err, id) => { //создает уникальный идентификатор
                if(err) return cb(err);
                this.id = id;       //задает идентификатор для сохранения
                this.hashPassword((err) => {    //хэширует пароль
                    if(err) return  cb(err);
                    this.update(cb);
                });
            });
        }
    }

    update(cb){
        const id = this.id;
        db.set(`user:id ${this.name}`, id, (err) => { //индексирует пользователя по имени
            if(err) return cb(err);
            db.hmset(`user:${id}`, this, (err) => { //используется redis для хранения свойств текущего класса
                cb(err);
            });
        });
    }
}

module.exports = User;