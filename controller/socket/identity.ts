import { get } from 'lodash'
import SocketController from '../../../../common/socket/abstract/socketController'

class IdentitySocketController extends SocketController {
  
  public onCreateUser(uuid: string) : void {
    let res : Express.Response = get(this.socket.pending, `${uuid}.res`);

    //TODO
    // Clean PENDING
    // Make a class call : 
    // * With callback specification
    // * Ctx apply
    // * Broadcast Management

    (<any>res).json(uuid);
  }

}

export default IdentitySocketController;