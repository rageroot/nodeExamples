/*#######################Assert################################*/
class Todo{
    constructor() {
        this.todos = []; //база запланированных дел
    }

    add(item) { //добавляет элемент списка
        if(!item) throw new Error('Todo.prototype.add requires an item');
        this.todos.push(item);
    }

    deleteAll(){        //удаляет все элементы из списка
        this.todos = [];
    }

    get length(){       //определяет количество элементов списка
        return this.todos.length;
    }

    doAsync(cb){        //выполняет коллбэк через 2 секунды
        setTimeout(cb, 2000, true);
    }
}

module.exports = Todo;

/*#######################Assert################################*/