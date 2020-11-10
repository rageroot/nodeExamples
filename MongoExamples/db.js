const { MongoClient, ObjectID } = require('mongodb');

let db;
let collection;

module.exports = () => {
    return MongoClient.connect('mongodb://localhost:27017/')
        .then((client) => {
           db = client;
        });
};

module.exports.Article = {
    all() {
        return db.collection('articles2').find().sort({ title: 1 }).toArray();
    },

    find(_id) {
        if (typeof _id !== 'object') _id = ObjectID(_id);
        return db.collection('articles2').findOne({ _id });
    },

    create(data) {

        return db.collection('articles2').insertOne(data, { w: 1 });
       // return db.collections('acticles2').insertOne(data, {w: 1});
    },

    delete(_id) {
        if (typeof _id !== 'object') _id = ObjectID(_id);
        return db.collection('articles2').deleteOne({ _id }, { w: 1 });
    }
};