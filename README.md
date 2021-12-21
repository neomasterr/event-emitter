[![npm](https://img.shields.io/npm/v/@neomasterr/event-emitter.svg?style=flat-square)](https://www.npmjs.org/@neomasterr/event-emitter)

# EventEmitter

Simple lightweight inheritable event emitter with minimal footprint and zero dependencies

# Example
```JAVASCRIPT
import EventEmitter from 'event-emitter';

const ev = new EventEmitter();

ev.on('init', (foo, bar) => {
    console.log(foo, bar);
});

ev.emit('init', 'foo', 'bar');
```

# Inheritance (mixin)
```JAVASCRIPT
///////////////////////////
// my-super-component.js //
///////////////////////////
import EventEmitter from 'event-emitter';

function MySuperComponent(options = {on: {}}) {
    EventEmitter.call(this, options.on);

    this.emit('init');

    setTimeout(() => {
        this.emit('init:after');
    }, 1000);
}

// mixin
Object.assign(MySuperComponent.prototype, EventEmitter.prototype);

// prototype chaining
Object.defineProperty(MySuperComponent.prototype, 'constructor', {
    value: MySuperComponent,
    writable: true,
    enumerable: false,
});

/////////////
// page.js //
/////////////
import MySuperComponent from './my-super-component';

const component = new MySuperComponent({
    on: {
        init: () => {
            console.log('Hello world!');
        },
    },
});

component.on('init:after', () => {
    console.log('After init');
});
```
