import { Controler } from "./Controler";
import { ConnectionView } from "../View/ConnectionView";
import { UsersService } from "../Services/UsersService";
import * as $ from 'jquery';

export class ConnectionControler extends Controler {
    public usersService: UsersService;

    constructor() {
        super(new ConnectionView());


        this.usersService = new UsersService();

    }


    public load () : void {
        this.display();
        $(document).on('submit', '#connectionForm', () => {
            this.connectUser($('#username').val(), $('#pwd').val());
        });
    }
    public connectUser(username: string, password: string): string {
        if (this.usersService.isConnectionApproved(username, password)) {
            console.log('connecté');
            return "OK";
        } else {
            $('#connectionError').html('');
            $('#connectionError').append('<div class="bg-danger col-sm">Erreur : Mot de passe ou nom de compte incorect</div>');
            return "Erreur : Mot de passe ou nom de compte incorect";
        }
    }
}