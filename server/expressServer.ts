import * as express from 'express'
import { get } from 'lodash'
import ExpressServer from '../../../common/server/abstract/expressServer'
import CoreRestController from '../controller/rest/core'
import IdentityRestController from '../controller/rest/identity'

class CoreExpressServer extends ExpressServer {

  constructor () {
    super();

    this._express = express();
    this._express.listen(this.config.express.port);

    this._logger.debug(`#CORE::Express Server Launched(${this.config.express.port})`); 

    this.initExpressServer();
  }

  private initExpressServer (): void {
    this._express.use(require('body-parser').json());
    this._express.use(require('compression')());

    this.initExpressRoutes();
  }

  private initExpressRoutes() {
    new CoreRestController(this._express);
    new IdentityRestController(this._express);
  }

}

export default CoreExpressServer;