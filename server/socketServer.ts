import * as io from 'socket.io'
import { get } from 'lodash'
import SocketServer from '../../../common/server/abstract/socketServer'
import SocketController from '../../../common/socket/abstract/socketController'
import socketControllerFactory from "../factory/socketController"

class CoreSocketServer extends SocketServer {

  constructor () {
    super();

    this._io = io.listen(this.config.socket.port);
    this._io.use(require('socketio-wildcard')());

    //CALL REST PENDING
    this._io.pending = {};

    this._logger.debug(`#CORE::Socket Server Launched(${this.config.socket.port})`); 

    this.initSocketServer();
  }

  private initSocketServer (): void {
    this._io.sockets.on('connection', (socket : any) : void => {
      socket.join(socket.handshake.query.type); 

      this._logger.debug(`#CORE::Service ${socket.id} join room ${socket.handshake.query.type}`);

      socket.on('*', ((packet : any) : void => {
        let serviceName : string = packet.data[0];
        let methodName : string = packet.data[1];
        let args : any[] = packet.data[2] || [];
        let broadCast : boolean = packet.data[3] || false;

        let instance : SocketController = socketControllerFactory.getInstance(serviceName);
        let method : Function = get(instance, methodName);

        try { 
          return method.apply(instance, args);
        } catch(err) { 
          this._logger.error(`#CORE::Method::${serviceName}::${methodName} not found!`);
        }
      }));
    });
  }

}

export default CoreSocketServer;