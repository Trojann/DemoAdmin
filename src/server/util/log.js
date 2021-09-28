import * as winston from 'winston';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true
        })
    ],
    levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8
    },
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow'
    }
});

export function trace() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (process.env.LOG_LEVEL < 1) {
        return;
    }

    logger.trace.apply(logger, arguments);
}

export function input() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    
    logger.input.apply(logger, arguments);
}

export function verbose() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    
    logger.verbose.apply(logger, arguments);
}

export function prompt() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    
    logger.prompt.apply(logger, arguments);
}

export function debug() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (process.env.LOG_LEVEL < 2) {
        return;
    }
    
    logger.debug.apply(logger, arguments);
}

export function info() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    if (process.env.LOG_LEVEL < 3) {
        return;
    }
    
    logger.info.apply(logger, arguments);
}

export function data() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    
    logger.data.apply(logger, arguments);
}

export function help() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    
    logger.help.apply(logger, arguments);
}

export function warn() {
    logger.warn.apply(logger, arguments);
}

export function error() {
    logger.error.apply(logger, arguments);
}