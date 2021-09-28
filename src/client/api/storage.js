import {request} from '../utils';

export function getPathStat(path) {
    return request({
        method: 'GET',
        url:`/v1.0/api/storage/${path}`,
    });
}


export function createFolder(path) {
    return request({
        method: 'POST',
        url:`/v1.0/api/storage/${path}?type=CREATE_FOLDER`
    });
}

export function deleteFolder(path) {
    return request({
        method: 'DELETE',
        url:`/v1.0/api/storage/${path}`
    });
}

export function deleteMultiFolder(paths) {
    let p_works = [];

    p_works = paths.map(path => {
        return deleteFolder(path);
    });

    return Promise.all(p_works);
}

export function uploadFile(path, file) {
    let fd = new FormData();
    fd.append('file', file);
    return request({
        method: 'POST',
        url:`/v1.0/api/storage/${path}?type=UPLOAD_FILE`,
        data: fd
    });
}