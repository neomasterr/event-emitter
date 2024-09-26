[![npm](https://img.shields.io/npm/v/@neomasterr/event-emitter.svg?style=flat-square)](https://www.npmjs.org/@neomasterr/event-emitter)

# EventEmitter

Simple lightweight inheritable event emitter with minimal footprint and zero dependencies

# Example
```JAVASCRIPT
import EventEmitter from '@neomasterr/event-emitter';

const ev = new EventEmitter();

ev.on('init', (foo, bar) => {
    console.log(foo, bar);
});

ev.emit('init', 'foo', 'bar');
```
