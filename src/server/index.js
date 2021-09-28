import 'babel-polyfill';
import http from 'http';
import app from './app';
import SocketIO from 'socket.io';
import {ctr_connection} from './controller';

let PORT = process.env.PORT || 8080;

let httpServer = http.createServer(app);
let io = SocketIO(httpServer);
ctr_connection.io(io);
httpServer.listen(PORT);