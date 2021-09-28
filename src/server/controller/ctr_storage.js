import fs from 'fs-promise';
import fse from 'fs-extra';
import path from 'path';
import filesize from 'filesize';

import {ERROR} from '../enum';
import {log} from '../util';

class StorageController {

    DATA_ROOT = path.join(__dirname, '../../../storage')

    async getStats(p) {
        let stats = await fs.stat(p);
        let info = {
            folder: stats.isDirectory(),
            size: filesize(stats.size),
            mtime: stats.mtime.getTime(),
            path: p.replace(this.DATA_ROOT, '/static')
        };

        return info;
    }

    /**
     * Chuyển từ đường dẫn static sang đường dẫn thực 
     * @return {String}
     */
    staticToRealPath(path) {
        return path.replace('/static', this.DATA_ROOT);
    }

    async list(dirPath) {
        let files = await fs.readdir(dirPath);
        let stats = [];
        for (let i = 0; i < files.length; ++i) {
            let fPath = path.join(dirPath, files[i]);
            let stat = await this.getStats(fPath);
            stat.name = files[i];
            stats.push(stat);
        }
        return stats;
    }

    remove(p) {
        return fse.remove(p);
    }

    mkdirs(dirPath) {
        return fse.mkdirs(dirPath); 
    }

    async move(srcs, dest) {
        for (let i = 0; i < srcs.length; ++i) {
            let basename = path.basename(srcs[i]);
            await fse.move(srcs[i], path.join(dest, basename));
        }
    }

    rename(src, dest) {
        return fse.move(src, dest);
    }

    filePath(relPath, decodeURI) {
        if (decodeURI) {
            relPath = decodeURIComponent(relPath);
        }
        
        log.trace(`<${this.constructor.name}.filePath> relPath:`, relPath);
        if (relPath.indexOf('..') >= 0){
            throw ERROR.PATH_INVALID;
        } else {
            return path.join(this.DATA_ROOT, relPath);
        }
    }

    async checkPathExists(fPath) {
        let isExists = await fs.exists(fPath);
        if (!isExists) {
            throw ERROR.PATH_NOT_EXISTS;
        }
    }

    async checkPathNotExists(fPath) {
        let isExists = await fs.exists(fPath);

        if (isExists) {
            throw ERROR.PATH_EXISTS;
        }
    }
}

export default new StorageController();