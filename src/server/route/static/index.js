import express from 'express';
import path from 'path';

const router = express.Router();

router.use(express.static(path.join(__dirname, '../../../../storage')));

router.use(function(req, res) {
    let error = {
        code: 404,
        message: 'File không tồn tại hoặc bị xóa'
    };
    return res.status(404).set('Content-Type', 'application/json').send(JSON.stringify({error}, null, 2));
});

export default router;