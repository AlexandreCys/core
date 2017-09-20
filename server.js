const config = require('../../config/config');
const io = require('socket.io').listen(config.base.port);
const services = [];

io.sockets.on('connection', (socket) => {
  let service = {
    id: socket.id,
    type: socket.handshake.query.type,
    socket: socket,
  };

  console.log(`Service ${service.type} with id ${service.id} connected`);
  services.push(service);

  socket.on('disconnect', (cause) => {
    let serviceIdx = services.findIndex((el) => { return el.id == socket.id });
    let serviceItem = services[serviceIdx];

    console.log(`Service ${serviceItem.type} with id ${serviceItem.id} disconnected`);
    services.splice(serviceIdx, 1);
  });
});