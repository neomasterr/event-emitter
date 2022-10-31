import EventEmitter from '@neomasterr/event-emitter';

function EventEmitterMixin(events) {
    this.emitter = new EventEmitter(events, this);
}

EventEmitterMixin.prototype.on = function() {
    this.emitter.on.apply(this.emitter, arguments);
}

EventEmitterMixin.prototype.once = function() {
    this.emitter.once.apply(this.emitter, arguments);
}

EventEmitterMixin.prototype.emit = function() {
    this.emitter.emit.apply(this.emitter, arguments);
}

export default EventEmitterMixin;
