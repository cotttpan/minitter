import test from 'ava';
import * as sinon from 'sinon';
import Minitter from './../src/index';

interface IEventTypes {
    inc: number;
    dec: number;
    once: number;
}

const minitter = new Minitter<IEventTypes>();
const spy = sinon.spy();

test.beforeEach(spy.reset);

test('on - add listenr', t => {
    minitter.on('inc', spy);
    t.is(minitter.listenerCount('inc'), 1);
});

test('on - not added when listener aleady included', t => {
    minitter.on('inc', spy);
    t.is(minitter.listenerCount('inc'), 1);
});

test('once - add listenr', t => {
    minitter.once('once', spy);
    t.is(minitter.listenerCount('once'), 1);
});

test('once - remove listener after event emitted', t => {
    minitter.emit('once', 1);
    t.true(spy.calledWith(1));
    t.is(minitter.listenerCount('once'), 0);
});

test('emit - emit listener function', t => {
    minitter.emit('inc', 1);
    t.true(spy.calledWith(1));
});

test('emit - not throw exception even if listener is not registered', t => {
    t.notThrows(() => minitter.emit('dec', 1));
});

test('off - remove event listener', t => {
    minitter.off('inc', spy);
    t.is(minitter.listenerCount('inc'), 0);
});
