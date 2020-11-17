'use strict'
const db = [];
exports.saveSync = (doc) => {
    db.push(doc);       //добавляет документ в массив

};

exports.saveAsync = (doc, cb) => {
    db.push(doc);       //добавляет документ в массив
    if(cb){
        setTimeout(() => {
            cb();
        }, 1000);
    }
};

exports.first = (obj) => { //выбирает документы, соответсвующие свойствам объекта
    return db.filter((doc) => {
        for(let key in obj){
            if(doc[key] != obj[key]){
                return false;   //если что то не совпадает- вываливаемся
            }
        }
        return true; //если все совпадет, выбираем документ
    }).shift(); //толкьо первый или null
};

exports.clear = () => {
    db.length = 0;
};