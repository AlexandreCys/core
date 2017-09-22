import SocketController from '../../../common/socket/abstract/socketController'

class coreExeSocketController extends SocketController {
  
  public services (type: string, id: string) : void {
      console.log('EXE RECEIVE MESSAGE')
  }

}

export default coreExeSocketController;