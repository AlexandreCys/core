import SocketController from '../../../common/socket/abstract/socketController'

class coreSetSocketController extends SocketController {
  
  public services(type: string, id: string) : void {
      console.log('SET RECEIVE MESSAGE')
  }

}

export default coreSetSocketController;