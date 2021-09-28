import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import {attachContext} from './auth';
import account from './account';
import account_group from './account_group';
import storage from './storage';
import viewer from './viewer';

const router = express.Router();
const multerParser = multer();

if (process.env.NODE_ENV === 'localhost') {
    router.use(cors());
}

/**
 * middleware gán __context chứa thông tin account đang login vào trong request
 */
router.use(attachContext);

/**
 * 3 route bên dưới dùng cho việc upload file
 * do có multer parser riêng nên cần đặt đầu tiên
 */
router.use('/storage', storage);

/**
 * Các route phía dưới dùng cho truy vấn api bình thường
 */
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.use(multerParser.array());

/**
 * @apiDefine LoginToken
 * @apiHeader {String} x-token-key login token của user 
 */

router.use(account);
router.use(account_group);
router.use(viewer);

router.use(function(req, res) {
    let error = {
        code: 404,
        message: 'api không tồn tại'
    };
    return res.status(404).set('Content-Type', 'application/json').send(JSON.stringify({error}, null, 2));
});

export default router;