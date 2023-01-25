class EventEmitter {

    listeners = {};

    fire(event) {
        for (var k in this.listeners) {
            let listener = this.listeners[k];
            this.unregister(k); // unregister this listener
            listener(event);
        }
    }

    register(id, listener) {
        this.listeners[id] = listener;
        console.log("Listener resitered as:", id)
    }

    unregister(id) {
        return delete this.listeners[id];
    }
}

module.exports = EventEmitter;
