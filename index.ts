// Point d'entrée

import { Controler } from "./Controler/Controler";
import { HomeControler } from "./Controler/HomeControler";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './out/Styles/home.css';
import * as $ from 'jquery';
import { ConnectionControler } from "./Controler/ConnectionControler";
import { AdminControler } from "./Controler/AdminControler";
import { ProductsService } from "./Services/ProductsService";

/** Initialisation services */
new ProductsService();
/** Initialisations controleurs */
let homeControler: HomeControler = new HomeControler();

homeControler.load();

let adminControler : AdminControler = new AdminControler();
let connectionControler :ConnectionControler = new ConnectionControler();

let isUserConnected : boolean = false;
$(document).ready(() => {
    // Gestion du menu :
        // connexion
    $('#connectionNav').click (() => {
        homeControler.unload();
        connectionControler.load();

        $(document).on('submit', '#connectionForm', () => {
            if (connectionControler.connectUser($('#username').val(), $('#pwd').val()) == 'OK') {
                connectionControler.unload();
                adminControler.load();
                isUserConnected = true;
            }
        });
    });

        // home
    $('#home').click(() => {
        if (isUserConnected) {
            homeControler.unload();
            adminControler.load()
        }
        else {
            adminControler.unload();
            homeControler.load();
        }
    });

    
});
// Ici mettre la gestion de changement de controleur lors d'un click sur un bouton du menu