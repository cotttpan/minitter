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
    const listener = minitter.on('inc', spy);
    t.is(minitter.listenerCount('inc'), 1);
    t.is(listener, spy);
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
    const n = minitter.emit('inc', 1);
    t.true(spy.calledWith(1));
    t.is(n, 1);
});

test('emit - not throw exception even if listener is not registered', t => {
    t.notThrows(() => minitter.emit('dec', 1));
});

test('off - remove event listener', t => {
    t.is(minitter.listenerCount('inc'), 1);
    const listener = minitter.off('inc', spy);
    t.is(minitter.listenerCount('inc'), 0);
    t.is(listener, spy);
});
