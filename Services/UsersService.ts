import { Product } from "../Model/ProductType";
import * as $ from 'jquery';
export class UsersService {


    public isConnectionApproved(username : string, password : string) : boolean {
        // waaaw too much security *-*
        if (username == "admin" && password == "admin")
            return true;
        else 
            return false;
    }
}