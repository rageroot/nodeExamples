const memdb = require('..');
const assert = require('assert');
describe('memdb', () => {
    beforeEach(() => {  //очищает базу перед каждым тестовым сценарием
        memdb.clear();
    });

   describe('synchonous .saveSync(doc)', () =>{ //для синхронной функции
        it('should save the document', () => {
            const pet = {name : 'Tobi'};
            memdb.saveSync(pet);
            const ret = memdb.first({name: 'Tobi'});
            assert(ret == pet); //проверяет, что питомец найден
        });
    });

    describe('asynchonous .saveSync(doc)', () =>{ //для асинхронной функции
        it('should save the document', (done) => {
            const pet = {name : 'Tobi'};
            memdb.saveAsync(pet, () => {
                const ret = memdb.first({name: 'Tobi'});//активизирует коллбэк с первым документом
                assert(ret == pet); //проверяет, что питомец найден
                done();
            });
        });
    });

    describe('.first(obj)', () => {
        it('should return the first matching doc', () =>{ //первое ожидание для first
            const tobi = {name: 'Tobi'};
            const loki = {name: 'Loki'};
            memdb.saveSync(tobi);
            memdb.saveSync(loki);
            let ret = memdb.first({name: 'Tobi'});//проверяет правильность возвращения каждого документа
            assert(ret == tobi);
            ret = memdb.first({name: 'Loki'});//проверяет правильность возвращения каждого документа
            assert(ret == loki);
        });

        it('should return null when no doc matches', () =>{//второе ожидание для .first
            const ret = memdb.first({name: 'Manny'});
            assert(ret == null);
        });
    });
});