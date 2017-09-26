import logger from '../../common/logger/logger'
import socketServer from './server/socketServer'
import expressServer from './server/expressServer'

class CoreServer {

  constructor () {
    (<any>global).logger = new logger('core.log');
    (<any>global).socketServer = new socketServer();
    (<any>global).expressServer = new expressServer();
  }

}

export default new CoreServer();