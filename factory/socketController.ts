import { get } from 'lodash'
import IdentitySocketController from "../controller/socket/identity"

class socketControllerFactory {

    private static classList : any = {
      Identity : new IdentitySocketController(),
    }

    public static getInstance(className : string) : any {
      return get(socketControllerFactory.classList, className);
    }

}

export default socketControllerFactory;