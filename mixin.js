import EventEmitter from '@neomasterr/event-emitter';

function EventEmitterMixin() {
    this.emitter = new EventEmitter(this);
}

EventEmitterMixin.prototype.on = function() {
    this.emitter.on.apply(this.emitter, arguments);
}

EventEmitterMixin.prototype.off = function() {
    this.emitter.off.apply(this.emitter, arguments);
}

EventEmitterMixin.prototype.once = function() {
    this.emitter.once.apply(this.emitter, arguments);
}

EventEmitterMixin.prototype.emit = function() {
    this.emitter.emit.apply(this.emitter, arguments);
}

export default EventEmitterMixin;
