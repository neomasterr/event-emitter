/**
* Базовый класс с обработкой событий
*
* https://github.com/neomasterr/event-emitter
*/
function EventEmitter(events = {}) {
    const _events = {};

    /**
     * Внутренний метод для добавления событий
     * @param {String} event   Имя события
     * @param {Object} options Параметры
     */
    function _listen(event, options) {
        // параметры по умолчанию
        const data = Object.assign({
            once: false,
            callback: function() {},
        }, options);

        if (typeof data.callback != 'function') {
            return;
        }

        if (!_events[event]) {
            _events[event] = [];
        }

        return _events[event].push(data);
    }

    if (typeof events == 'object' && events !== null) {
        for (let event in events) {
            _listen(event, {callback: events[event]});
        }
    }

    /**
     * Подписываемся на событие
     * @param {String}   event    Имя события
     * @param {Function} callback Вызываемый метод
     */
    this.on = function(event, callback) {
        return _listen(event, {
            callback,
        });
    }

    /**
     * Одноразовое событие
     * @param {String}   event    Имя события
     * @param {Function} callback Вызываемый метод
     */
    this.once = function(event, callback) {
        return _listen(event, {
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
    this.emit = function(event) {
        // нет обработчиков
        if (!_events[event] || !_events[event].length) {
            return;
        }

        // параметры
        const args = [].slice.call(arguments, 1);

        // вызов
        const interrupted = _events[event].some(item => {
            // возврат true означает прерывание вызова событий (handled)
            return item.callback.apply(this, args) === true;
        });

        // забываем одноразовые события
        _events[event] = _events[event].filter(item => !item.once);

        return interrupted;
    }
}

export default EventEmitter;
