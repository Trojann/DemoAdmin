import axios from 'axios';
import localStorage from 'store';

let debug;
let viewer = localStorage.get('viewer');

let headers = {};

let baseURL;

if (process.env.NODE_ENV === 'localhost') {
    baseURL = 'http://localhost:8080/';
} else if (process.env.NODE_ENV === 'staging') {
    baseURL = 'http://103.63.109.12/';
} else if (process.env.NODE_ENV === 'production') {
    // set url
}

if (viewer && viewer.token) {
    headers['x-token-key'] = viewer.token;
}

export const updateTokenKey = function(token) {
    headers['x-token-key'] = token;
};

export default function (options) {
    if (debug) {
        options.params = options.params || {};
        options.params.debug = true;
    }

    return new Promise((resolve, reject) => {
        axios({
            ...options,
            headers,
            baseURL
        }).then(({data}) => {
            if (data.error) {
                reject(data.error);
                return;
            }

            resolve(data);
        }).catch((error) => {
            let {response} = error;

            if (response && response.data && response.data.error) {
                reject(response.data.error);
                return;
            }

            reject({
                code: 0,
                message: 'Có lỗi xảy ra, bạn vui lòng thử lại'
            });
        });
    });
	
}

window.setDebugApi = function(enable) {
    debug = !!enable;
};