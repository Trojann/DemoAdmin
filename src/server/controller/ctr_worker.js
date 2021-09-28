import axon from 'pm2-axon';

/**
 * Worker xử lý
 */
class WorkerController {
    constructor() {
        let worker = this.worker_ = axon.socket('sub-emitter');
        worker.connect(3000, '127.0.0.1');

        let publisher = this.publisher_ = axon.socket('pub-emitter');
        publisher.connect(3001, '127.0.0.1');
    }

    worker() {
        return this.worker_;
    }

    publisher() {
        return this.publisher_;
    }

    publishToUser(_id, data) {
        this.publisher_.emit('publish-to-user', _id, data);
    }
}

export default new WorkerController();