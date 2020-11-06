const MongoClient = require('mongodb');

const options = {
    useUnifiedTopology: true, //использовать новый механизм мониторинга и обнаружения сервера
};
MongoClient.connect('mongodb://localhost:27017/articles', options)
    .then(db => {
        console.log('Client ready');
        db.close();
}, console.error);

/*
collection.insert(doc) — вставка одного или нескольких документов;
collection.find(query) — поиск докум ентов, соответствую щ их запросу;
collection.remove(query) — удаление документов, соответствую щ их запросу;
collection.drop() — удаление всей коллекции;
collection.update(query) — обновление документов, соответствую щ их запросу;
collection.count(query) — подсчет документов, соответствую щ их запросу
Такие операции, как поиск, вставка и удаление, обычно сущ ествую т в нескольких
разнови дн остях — в зависи м ости от того, работаете л и вы с одним или м ногим и
значениям и. П римеры:
collection.insertOne(doc) — вставка одного документа;
collection.insertMany([doc1, doc2]) — вставка нескольких документов;
collection.findOne(query) — поиск одного докум ента, соответствую щ его з а ­
просу;
collection.updateMany(query) — обновление всех документов, соответствующ их
запросу.
*
* */