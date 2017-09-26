import { get } from 'lodash'
import * as uuid from 'uuid'
import RestController from '../../../../common/socket/abstract/restController'

class IdentityRestController extends RestController {

  protected _socket : any = get(global, 'socketServer.io');

  protected _room : string = 'identity';

  constructor (app : any) {
    super();

    this.initRoutes(app);
  }

  private initRoutes(app : any) {
    app.route('/user/:userName').post(this.createUser.bind(this));
  }
  
  public createUser(req: Express.Request, res: Express.Response) : void {
    let uid : string = uuid.v4();

    //SET PENDING
    this._socket.pending[uid] = {req, res};
    
    this._socket.to(this._room).emit('User', 'create', [uid]);
  }

}

export default IdentityRestController;