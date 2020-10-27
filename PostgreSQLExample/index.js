'use strict'
const pg = require('pg');
const db = new pg.Client({ //инициализация базы
    host: 'localhost',
    port: 5432,
    user: 'rage',
    password: '123',
});
db.connect((err, client) => { //подключение
    if(err) throw err;
    console.log('Connected to database', db.database);
    //db.end();
});
//запрос на создание таблицы
db.query(`      
    CREATE TABLE IF NOT EXISTS snippets (
    id SERIAL,
    PRIMARY KEY(id),
    body text
    );
`, (err, result) => {
    if(err) throw err;
    console.log('Create table "snippets"');
    //db.end()
});

//вставка данных в таблицу
/*let body = 'hello world';
db.query(`
    INSERT INTO snippets (body) VALUES(
        '${body}'
    )
    RETURNING id
`, (err, result) => {
        if(err) throw err;
        const id = result.rows[0].id;
        console.log(result.rows);
        console.log('Insert row with id %s', id);
        body = 'qwrwer';
        db.query(`
            INSERT INTO snippets (body) VALUES (
                '${body}'
            )
            RETURNING id
        `, (err, result) => {
                if(err) throw err;
                const id = result.rows[0].id;
            console.log('Insert row with id %s', id);
            db.end();
        });
});*/

const id = 1;
const body = 'greetingsd';
db.query(`
    UPDATE snippets SET body = '${body}' WHERE id=${id};
`, (err, result) => {
    if(err) throw err;
    console.log('Updated %s rows', result.rowCount);
    db.end();
});