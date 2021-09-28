import {Error} from '../util';

const generateError = function (code, message) {
    return new Error(code, message);
};

/**
 * Danh sách các mã lỗi
 * @type {Object}
 */
const error = {
    OBJECT_NOT_EXISTS: generateError(10, 'Đối tượng không tồn tại'),
    PARAMS_INCORRECT: generateError(20, 'Params không đúng'),

    PATH_NOT_EXISTS: generateError(100, 'Đường dẫn không tồn tại'),
    PATH_EXISTS: generateError(101, 'Đường dẫn đã tồn tại'),
    PATH_INVALID: generateError(102, 'Đường dẫn không hợp lệ'),
    QUERY_INVALID: generateError(103, 'Truy vấn không hợp lệ'),
    QUERY_INCORRECT: generateError(104, 'Truy vấn không đúng'),
   

    ACCOUNT_PASSWORD_INVALID: generateError(401, 'Mật khẩu cần ít nhất 6 ký tự'),
    ACCOUNT_REMOVED: generateError(402, 'Tài khoản đã bị xóa'),
    ACCOUNT_LOGIN_INVALID: generateError(403, 'Sai thông tin tài khoản'),
    ACCOUNT_NOT_LOGIN: generateError(404, 'Chưa đăng nhập hệ thống'),
    ACCOUNT_OLD_PASSWORD_INCORRECT: generateError(405, 'Mật khẩu cũ không đúng'),
    ACCOUNT_EXISTS: generateError(406, 'Tài khoản đã tồn tại'),
    ACCOUNT_NOT_EXISTS: generateError(407, 'Tài khoản không tồn tại'),
    ACCOUNT_IS_BLOCK: generateError(408, 'Tài khoản đã bị khóa'),


    ACCOUNT_GROUP_EXISTS: generateError(420, 'Nhóm tài khoản đã tồn tại'),

    PHONENUMBER_INVALID: generateError(502, 'Số điện thoại không hợp lệ')
};

export default error;
