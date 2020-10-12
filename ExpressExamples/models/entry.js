const redis = require('redis'); //Хранение данных
const db = redis.createClient();//экземпляр клиента redis

class Entry{
    constructor(obj) {
        for(let key in obj){    //перебирает ключи в переданном объекте
            this[key] = obj[key]; //Объединяет значения
        }
    }

    save(cb){
        const entryJSON = JSON.stringify(this); //преобразует сохраненные данные в JSON
        db.lpush(   //сохраняет строку json в списке redis
            'entries',
            entryJSON,
            (err) => {
                if(err) return cb(err);
                cb();
            }
        );
    }

    static getRange(from, to, cb ){ //выборка записей
        db.lrange( 'entries', from, to, (err, items) => { //lrange используется для выборки записей
            if(err) return cb(err);
            let entries = [];
            items.forEach((item) => {
                entries.push(JSON.parse(item)); //декодирует ранее сохраненные записи в JSON
            });
            cb(null, entries);
        });
    }
}

module.exports = Entry;