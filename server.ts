import lodash = require('lodash');
import *  as io from 'socket.io';

const  socketController : { exe: Mto, get: Mto, set: Mto } = {
  exe: require('./socketController/exe'),
  get: require('./socketController/get'),
  set: require('./socketController/set')
};

const services: Array<Socket> = new Array<Socket>();

const ServiceSocket = require('../../common/socket/service.socket');

io.sockets.on('connection', (socket : any) => {
  let service : Socket = new ServiceSocket(socket.id, socket.handshake.query.type, socket);

  console.log(`Service ${service.type} with id ${service.id} connected`);
  services.push(service);

  socket.on('action', (data : Mto) => {
    return lodash.get(socketController, [data.type,data.action])(...data.args);
  });

  socket.on('disconnect', (cause : string) => {
    let serviceIdx : number = services.findIndex((el : Socket) => { return el.id == socket.id });
    let serviceItem : Socket = services[serviceIdx];

    console.log(`Service ${serviceItem.type} with id ${serviceItem.id} disconnected`);
    services.splice(serviceIdx, 1);
  });
});

io.listen(Config.base.port);