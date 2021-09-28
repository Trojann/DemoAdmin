import {ERROR} from '../enum';
import {log} from '../util';

class CRUDController {
    model() {
        return this.model_;
    }

    async findById(_id) {
        log.trace(`<${this.constructor.name}>.findById`);

        let model = this.model();
        let inst = await model.findById(_id);
        let json_data = inst.toObject();
        return json_data;
    }

    create(data) {
        log.trace(`<${this.constructor.name}>.create`);

        let model = this.model();
        return model.create(data);
    }

    async edit(data) {
        log.trace(`<${this.constructor.name}>.edit`);

        let model = this.model();
        let {_id} = data;
        let inst = await model.findById(_id);

        if (!inst) {
            throw ERROR.OBJECT_NOT_EXISTS;
        }

        inst.set(data);
        await inst.save();
        return inst.toObject();
    }

    delete(data) {
        log.trace(`<${this.constructor.name}>.delete`);

        let model = this.model();
        return model.delete({
            ...data,
            deleted: false
        });
    }

    findOrCreate(critial, data) {
        let model = this.model();

        return model.findOrCreate({
            ...critial,
            deleted: false
        }, data);
    }

    update(critial, data) {
        let model = this.model();

        return model.update({
            ...critial,
            deleted: false
        }, data);
    }

    getList() {
        let model = this.model();
        return model.find({});
    }

    findByIdWithActive(_id) {
        let model = this.model();
        return model.findOne({
            _id,
            active: true
        });
    }

    findOne() {
        let model = this.model();
        return model.findOne.apply(model, arguments);
    }

    find() {
        let model = this.model();
        return model.find.apply(model, arguments);
    }
}

export default CRUDController;