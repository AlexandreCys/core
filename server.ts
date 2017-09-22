import * as io from 'socket.io'
import { get } from 'lodash'
import Server from '../../common/server/abstract/server'
import ServiceSocket from '../../common/socket/service.socket'
import coreExeSocketController from './socketController/exe'
import coreGetSocketController from './socketController/get'
import coreSetSocketController from './socketController/set'

class CoreService extends Server {

  public socketController = {
    exe: new coreExeSocketController(),
    get: new coreGetSocketController(),
    set: new coreSetSocketController()
  };

  constructor () {
    super();

    this.io = io.listen(this.config.base.port);

    this.initSocket()
  }

  private initSocket (): void {
    this.io.sockets.on('connection', (socket : any) : void => {
      let serviceSocket : Socket = new ServiceSocket(socket.id, socket.handshake.query.type, socket);
    
      console.log(`Service ${serviceSocket.type} with id ${serviceSocket.id} connected`);

      this.servicesTable.push(serviceSocket);
    
      socket.on('action', (data : Mto) : void => {
        let method : Function = <Function>get(this.socketController, [data.type,data.action]);

        return method(...data.args);
      });
    
      socket.on('disconnect', (cause : string) : void => {
        let serviceIdx : number = this.servicesTable.findIndex((el : Socket) => { return el.id == socket.id });
        let serviceItem : Socket = this.servicesTable[serviceIdx];
    
        console.log(`Service ${serviceItem.type} with id ${serviceItem.id} disconnected`);

        this.servicesTable.splice(serviceIdx, 1);
      });
    });
  }

}

export default new CoreService()