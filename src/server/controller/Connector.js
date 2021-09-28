import moment from 'moment';
import ctr_worker from './ctr_worker';
import ctr_connection from './ctr_connection';
import {log} from '../util';

import {Session} from '../model';

class Connector {
    constructor(socket) {
        this.socket_ = socket;
        this.id_ = socket.account._id;

        this._handleDisconnect = this._handleDisconnect.bind(this);
        this._registerEvent();
        ctr_connection.handeSessionConnect(socket.account);
    }

    /**
     * remove sesion bị disconnect và đồng thời check xem 
     * @return {[type]} [description]
     */
    async _handleDisconnect() {
        let socket = this.socket_;
        let account = socket.account;
        let id_ = this.id_;

        clearInterval(this._intervalExpired);

        await Session.remove({
            session: socket.id,
            user: id_
        });

        ctr_connection.handeSessionDisconnect(account);
    }

    updateExpiredTime() {
        let socket = this.socket_;
        let id_ = this.id_;

        let date = new Date();
        let expireAt = moment(date).add(2, 'm').toDate();
        Session.findOneAndUpdate({
            session: socket.id,
            user: id_
        }, {
            session: socket.id,
            user: id_,
            expireAt
        }, {
            upsert: true
        });
    }

    _registerEvent() {
        let self = this;
        let socket = this.socket_;
        let account = socket.account;
        let {_id} = account;

        socket.join(`session:${_id}`);

        /**
         * Sau mỗi 60s thì update lại expire time
         */
        this.updateExpiredTime();
        this._intervalExpired = setInterval(function () {
            self.updateExpiredTime();
        }, 60*1000);

        socket.on('disconnect', this._handleDisconnect);
        this._test();
    }

    _test() {
        let publisher = ctr_worker.publisher();
        let self = this;
        setTimeout(function () {
            log.trace('publish-to-user', self.id_);
            publisher.emit('publish-to-user', self.id_, {action: 'connect', message: 'new session connect'});
        }, 2000);
    }
}

export default Connector;