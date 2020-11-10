const mongo = require('mongodb').MongoClient;


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true,
    useUnifiedTopology: true});

mongoClient.connect(function(err, client){

    const db = client.db("articles");
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result.ops);
      //  client.close();
    });

    collection.find({name: "Tom"}).toArray((err, res) =>{
        console.log(res);
    });

});




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