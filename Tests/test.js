
/*#######################Assert################################*/

'use strict'
const assert = require('assert');
const Todo = require('./todo');
const todo = new Todo();

let testCompleted = 0;

function deleteTest(){  //Проверяет не остаются ли элементы после удаления
  //  todo.add('Delete me'); //добавляем данные
   // assert.strictEqual(todo.length, 1, '1 item should exist'); //убежадется что данные были добавлены
    todo.deleteAll(); //удаляет все записи
    assert.strictEqual(todo.length, 0, "No item exist"); //убеждаемся что все сработало
    testCompleted++;
}

function addTest(){
    todo.deleteAll(); //удаляет все существующие элементы
    todo.add('Added'); //добавялет элемент
    assert.notStrictEqual(todo.length, 0, 'item should exist'); //убеждаемся что элементы существуют
    testCompleted++
}

function doAsyncTest(cb){
    todo.doAsync(value => {
        assert.ok(value, 'callback should be passed true'); //проверяет значение на истинность
        testCompleted++;
        cb(); //иницииурет обратные вызовы при завершении
    });
}

function throwsTest(){ //тестрирование генерирования ошибки при отсуствиии параметра
    assert.throws(todo.add, /requires/); //todo.add вызывается без агрумента, сравнивается с регуляркой
    testCompleted++;
}

addTest();
deleteTest();
throwsTest();
doAsyncTest(() => {
    console.log(`Completed ${testCompleted} tests`)
});

console.log(testCompleted);

/*#######################Assert################################*/