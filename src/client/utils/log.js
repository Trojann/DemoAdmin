const config = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        trace: 3,
        debug: 4
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'cyan',
        trace: 'magenta',
        debug: 'blue'
    }
};

var log_level = 4;
var logs = {};

if (process.env.NODE_ENV === 'production') {
    log_level = 1;
}

for (var name in config.levels) {
    let logFn = function(name, ...args) {
        if (config.levels[name] > log_level) {
            return;
        }
        console.group(`%c ${name}`, `color: ${config.colors[name]}; font-weight: lighter;`);
        if (/error|warn/.test(name)) {
            console[name](...args);
        } else {
            console.log(...args);
        }
        console.groupEnd();
    };

    logs[name] = logFn.bind(null, name);
}

window.setPlayerLogLevel = function(level) {
    log_level = level;
};

export default {
    ...logs
};