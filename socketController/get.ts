import SocketController from '../../../common/socket/abstract/socketController'

class coreGetSocketController extends SocketController {

  public services(type: string, id: string) : void {
      console.log('GET RECEIVE MESSAGE')
  }

}

export default coreGetSocketController;