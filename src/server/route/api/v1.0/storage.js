import express from 'express';
import fs from 'fs-promise';
import multer from 'multer';
import {route, log} from '../../../util';
import {ERROR} from '../../../enum';
import {checkLogined} from './auth';

import {
    ctr_storage
} from '../../../controller';

const router = express.Router();
router.use(checkLogined);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, req.fPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage });

/**
 * Xử lý 
 * class StorageApi
 */
class StorageApi {

    @route.get(/\/(.*)/)
    async _getFile({params}) {
        let fPath  = ctr_storage.filePath(params[0]);
        await ctr_storage.checkPathExists(fPath);

        let stats = await fs.stat(fPath);

        if (stats.isDirectory()) {
            return ctr_storage.list(fPath);
        } else {
            let info = {
                folder: stats.isDirectory(),
                size: stats.size,
                mtime: stats.mtime.getTime()
            };
            return info;
        }
    }

    @route.delete(/\/(.*)/)
    async _delFile({params}) {
        let fPath  = ctr_storage.filePath(params[0]);
        await ctr_storage.checkPathExists(fPath);
        return ctr_storage.remove(fPath);   
    }

    @route.put(/\/(.*)/)
    async _putFile({params, query, body}) {
        let fPath  = ctr_storage.filePath(params[0]);
        await ctr_storage.checkPathExists(fPath);

        let {type} = query;

        if (!type) {
            throw ERROR.QUERY_INVALID;
        } else if (type === 'MOVE') {

            let {src} = body;
            if (!src || ! (src instanceof Array)) {
                throw ERROR.QUERY_INCORRECT;
            }
            var srcs = src.map(function (relPath) {
                return ctr_storage.filePath(relPath, true);
            });
            await ctr_storage.move(srcs, fPath);
        } else if (type === 'RENAME') {

            let {target} = body;
            if (!target) {
                throw ERROR.QUERY_INCORRECT;
            }

            await ctr_storage.rename(fPath, ctr_storage.filePath(target, true));
        } else {
            throw ERROR.QUERY_INCORRECT;
        } 
    }

    @route.post(/\/(.*)/)
    async _postFile({params, query}, res) {
        let req = arguments[0];

        let {type} = query;

        if (!type) {
            throw ERROR.QUERY_INVALID;
        } else if (type === 'CREATE_FOLDER') {
            let fPath  = ctr_storage.filePath(params[0]);
            await ctr_storage.checkPathNotExists(fPath);
            await ctr_storage.mkdirs(fPath);
        } else if (type === 'UPLOAD_FILE') {
            let fPath  = ctr_storage.filePath(params[0]);
            await ctr_storage.checkPathExists(fPath);
            req.fPath = fPath;
            log.trace('upload file');
            return new Promise((resolve, reject) => {
                upload.single('file')(req, res, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(err);
                });
            });
            
        } else {
            throw ERROR.QUERY_INCORRECT;
        } 
    }
}

const storageApi = new StorageApi();

route.register(
    {
        router,
        target: storageApi
    }

);

export default router;