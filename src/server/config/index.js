import * as local from './localhost';
import * as dev from './development';
import * as pro from './production';
import _ from 'lodash';

process.env.INSTANCE_ID = process.env.PM2 ?  process.env.INSTANCE_ID : 0;

var config_default = {
};

let mode_config = {};

switch(process.env.NODE_ENV) {
case 'localhost':
    mode_config = local;
    break;
case 'development':
    mode_config = dev;
    break;
case 'production':
    mode_config = pro;
    break;
default:
    throw new Error('NODE_ENV is required in environment');
}

var config = _.merge({}, config_default, mode_config);

export default config;