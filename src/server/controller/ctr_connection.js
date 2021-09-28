import {autobind} from 'core-decorators';
import Connector from './Connector';
import {log} from '../util';

import ctr_account from './ctr_account';
import ctr_worker from './ctr_worker';

import {Session} from '../model';

class ConnectionController {
    constructor() {
        let worker = ctr_worker.worker();
        worker.on('publish-to-user', this.publishToUser);
    }

    io(io) {
        if (this.io_ || !io) {
            return this.io_;
        }

        this.io_ = io;
        this.sockets_ = io.sockets;
        this._handleConnection();
    }

    /**
     * Gửi message tới user
     * Do user join vào room có dạng 'session:{_id}' nên sẽ publish message vào room này
     * @param  {[type]} _id     [description]
     * @param  {[type]} message [description]
     * @return {[type]}         [description]
     */
    @autobind
    publishToUser(_id, message) {
        let sockets = this.sockets_;

        if (!sockets) {
            return;
        }

        if (!_id) {
            sockets.emit('publish', message);
            return;
        }

        log.trace(`<${this.constructor.name}.publishToUser> account: `, _id, message);
        sockets.to(`session:${_id}`).emit(`session:${_id}`, message);
    }

    _handleConnection() {
        let io = this.io();
        io.use((socket, next) => {
            let handshake = socket.handshake;
            let token = handshake.query.token;

            ctr_account.loginWithToken({token})
                .then(account => {
                    socket.account = account;
                    next();
                }).catch(e => {
                    next(e);
                });
        });

        io.on('connection', function (socket) {
            new Connector(socket);
        });
    }

    /**
     * Xử lý khi user connect lại.
     */
    async handeSessionConnect() {

    }

    /**
     * Xử lý khi có một session của user đã bị disconnect
     */
    async handeSessionDisconnect() {
       
    }

    async isUserDisconnect({_id}) {
        let numberSession = await Session.count({
            user: _id
        });

        return !numberSession;
    }
}

export default new ConnectionController();