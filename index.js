/**
* Базовый класс с обработкой событий
*
* https://github.com/neomasterr/event-emitter
*/
function EventEmitter(events = {}, context = undefined) {
    this.events = {};
    this.context = context;

    if (typeof events == 'object' && events !== null) {
        for (let event in events) {
            this.on(event, events[event]);
        }
    }
}

/**
 * Внутренний метод для добавления событий
 * @param {String} event   Имя события
 * @param {Object} options Параметры
 */
EventEmitter.prototype.__listen = function(event, options) {
    const callbacks = [];
    if (typeof options.callback == 'function') {
        callbacks.push(options.callback);
    } else if (typeof options.callback == 'object' && Array.isArray(options.callback)) {
        options.callback.filter(callback => typeof callback == 'function').forEach(callback => {
            callbacks.push(callback);
        });
    }

    if (!this.events[event]) {
        this.events[event] = [];
    }

    callbacks.forEach(callback => {
        const data = {
            once: options.once || false,
            callback,
        }

        this.events[event].push(data);
    });

    return this.events[event].length;
}

/**
 * Подписываемся на событие
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
EventEmitter.prototype.on = function(event, callback) {
    return this.__listen(event, {
        callback,
    });
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
        return item.callback.apply(this.context || this, args) === true;
    });

    // забываем одноразовые события
    this.events[event] = this.events[event].filter(item => !item.once);

    return interrupted;
}

export default EventEmitter;
