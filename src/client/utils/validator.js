import validator from 'validator';
import assert from 'assert';

export function email(email, message = 'Email không đúng định dạng') {
    assert(validator.isEmail(email), message);
}

export function required(value, message = 'Chưa nhập giá trị') {
    assert(!!value, message);
}

export function range(min, max) {
    return function(value, message = 'value invalid') {
        assert(validator.isLength(value, {min, max}), message);
    };
    
}

export function min(min) {
    return function(value, message = 'value invalid') {
        assert(validator.isLength(value, {min, max: undefined}), message);
    };
}

export function max(max) {
    return function(value, message = 'value invalid') {
        assert(validator.isLength(value, {min: undefined, max}), message);
    };
}

