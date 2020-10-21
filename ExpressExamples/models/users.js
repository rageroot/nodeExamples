'use strict'
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
        db.set(`user:id:${this.name}`, id, (err) => { //индексирует пользователя по имени
            if(err) return cb(err);
            db.hmset(`user:${id}`, this, (err) => { //используется redis для хранения свойств текущего класса
                cb(err);
            });
        });
    }

    hashPassword(cb){
        bcrypt.genSalt(12, (err, salt) => { //генерирует соль
            if(err) return cb(err);
            this.salt = salt; //задает соль для сохранения
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if(err) return cb(err);
                this.pass = hash; //присваивает хэш для сохранения
                cb(); //передаем управление в колбэк
            });
        });
    }

    static getByName(name, cb){
        User.getId(name, (err, id) => { //определяет идентификатр по имени
           if(err) return cb(err);
           User.get(id, cb) //получает данные по id
        });
    };

    static getId(name, cb){
        db.get(`user:id:${name}`, cb); //получает информацию по имени
    }

    static get(id, cb){
        //console.log(id);
        db.hgetall(`user:${id}`, (err, user) => { //получает даныне в виде объекта
            if(err) return cb(err);
            cb(null, new User(user)); //создает пользователя
        });
    }

    static authenticate(name, pass, cb){
        User.getByName(name, (err, user) => {
            if(err) return cb(err);
            if(!user.id) return cb();   //если пользователь не существует
            bcrypt.hash(pass, user.salt, (err, hash) => { //хэширует введеный пароль
                if(err) return cb(err);
                if(hash == user.pass) return cb(null, user);
                cb();
            });
        });
    };

    toJSON(){
        return {id: this.id,
                name : this.name
        }
    };
}

/*
const user = new User({name: 'toby', pass: 'toby'});
user.save((err) => {
    if(err) console.log(err);
    console.log(`user id ${user.id}`)
});
*/


/*User.getByName('toby', (err, user) => {
        console.log(user);
    });*/

module.exports = User;