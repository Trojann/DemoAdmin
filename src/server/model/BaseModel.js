import mongoose, { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import mongooseDelete from 'mongoose-delete';

class BaseModel {

    define() {
        let schema = this.schema_ = Schema(this.schema, {
            timestamps: {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            }
        });
        
        schema.plugin(findOrCreate);
        schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: ['count', 'find', 'findOne', 'update'] });

        // Define hooks
        this.defineHooks();

        this._index();
        let model = this.model_ = mongoose.model(this.name, schema);
        model.on('index', this._onIndex);
        
    }

    _index() {

    }

    defineHooks() {}

    _onIndex() {
        console.log('index finish');
    }

    model() {
        return this.model_;
    }

    _schema() {
        return this.schema_;
    }

    /**
     * Hàm findById trong core mongoose thực chất gọi findOne
     * mà khi dùng plugin mongoose-delete đã override findOne do đó cần viết lại để có thể trả các đối tượng kể cả đã bị xóa
     */
    findById(_id) {
        return this.findOneWithDeleted({ _id });
    }
}

[
    'count',
    'countWithDeleted',

    'create',
    'delete',
    'deleteMany',
    'deleteOne',

    'find',
    'findWithDeleted',

    'findOrCreate',

    'findOne',
    'findOneWithDeleted',

    'findOneAndUpdate',
    'update',
    'updateMany',
    'updateOne',
    'remove',
    'insertMany'
    // 'populate'
].forEach(function (method) {

    BaseModel.prototype[method] = async function () {
        //log.trace(`<${this.constructor.name}.${method}>: `, arguments);

        let model = this.model();
        let result;

        try {
            result = await model[method](...arguments);
        } catch (e) {
            throw e;
        }

        return result;
    };
});

export default BaseModel;