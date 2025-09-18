/**
* Базовый класс с обработкой событий
*
* https://github.com/neomasterr/event-emitter
*/
function EventEmitter(context = null, events = {}) {
    this.context = context;
    this.events = {};

    if (events && events.on) {
        for (let event in events.on) {
            this.on(event, events.on[event]);
        }
    }

    if (events && events.once) {
        for (let event in events.once) {
            this.once(event, events.once[event]);
        }
    }
}

/**
 * Внутренний метод для добавления событий
 * @param {String} event   Имя события
 * @param {Object} options Параметры
 */
EventEmitter.prototype.__listen = function(event, options) {
    if (typeof options.callback != 'function') {
        throw new Error('Callback must be a function');
    }

    if (!this.events[event]) {
        this.events[event] = [];
    }

    this.events[event].push({
        once: options.once || false,
        callback: options.callback,
    });

    return this.events[event].length;
}

/**
 * Подписка на событие
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
EventEmitter.prototype.on = function(event, callback) {
    return this.__listen(event, {
        callback,
    });
}

/**
 * Отписка от события
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
EventEmitter.prototype.off = function(event, callback) {
    if (!this.events[event] || !this.events[event].length) {
        return;
    }

    if (typeof callback == 'undefined') {
        this.events[event] = [];
    } else {
        this.events[event] = this.events[event].filter(data => data.callback != callback);
    }
}

/**
 * Одноразовое событие
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
EventEmitter.prototype.once = function(event, callback) {
    return this.__listen(event, {
        once: true,
        callback,
    });
}

/**
 * Вызов события
 * @param  {String}  event Имя события
 * @param  {Object}  data  Данные
 * @return {Boolean}       true если выполнение было прервано, undefined если нет подписчиков
 */
EventEmitter.prototype.emit = function(event) {
    // нет обработчиков
    if (!this.events[event] || !this.events[event].length) {
        return;
    }

    // параметры
    const args = [].slice.call(arguments, 1);

    // вызов
    const interrupted = this.events[event].some(item => {
        // возврат true означает прерывание вызова событий (handled)
        return item.callback.apply(this.context, args) === true;
    });

    // забываем одноразовые события
    this.events[event] = this.events[event].filter(item => !item.once);

    return interrupted;
}

export default EventEmitter;
