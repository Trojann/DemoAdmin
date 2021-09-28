import ee from 'event-emitter';

let ee_ = ee({});

class Signal {
    static trigger() {
        ee_.emit.apply(this, arguments);
    }

    static emit() {
        ee_.emit.apply(this, arguments);
    }

    static on() {
        ee_.on.apply(this, arguments);
    }

    static one() {
        ee_.once.apply(this, arguments);
    }

    static off() {
        ee_.off.apply(this, arguments);
    }
}

export default Signal;