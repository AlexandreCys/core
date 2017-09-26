import { get } from 'lodash'
import RestController from '../../../../common/socket/abstract/restController'

class CoreRestController extends RestController {

  constructor (app : any) {
    super();

    this.initRoutes(app);
  }

  private initRoutes(app : any) {
    app.route('/core/room').get(this.getRoom);
  }
  
  public getRoom(req: Express.Request, res: Express.Response) : void {
      (<any>res).json(get(global, 'socketServer.io.sockets.adapter.rooms'));
  }

}

export default CoreRestController;