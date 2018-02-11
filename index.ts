// Point d'entrée

import { Controler } from "./Controler/Controler";
import { HomeControler } from "./Controler/HomeControler";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './out/Styles/home.css';
import * as $ from 'jquery';
import { ConnectionControler } from "./Controler/ConnectionControler";
import { PanierControler } from "./Controler/PanierControler";
import { AdminControler } from "./Controler/AdminControler";
import { ProductsService } from "./Services/ProductsService";

/** Initialisation services */
new ProductsService();
/** Initialisations controleurs */
let homeControler: HomeControler = new HomeControler();

homeControler.load();

let adminControler: AdminControler = new AdminControler();
let connectionControler: ConnectionControler = new ConnectionControler();
let panierControler: PanierControler = new PanierControler();


let isUserConnected: boolean = false;
$(document).ready(() => {
    // Gestion du menu :
    // connexion
    $('#connectionNav').click(() => {
        homeControler.unload();
        connectionControler.load();

        $(document).on('submit', '#connectionForm', () => {
            if (connectionControler.connectUser($('#username').val(), $('#pwd').val()) == 'OK') {
                connectionControler.unload();
                adminControler.load();
                $('#connectionNav').hide();
                $('#disconectionNav').show();
                $('#panierNav').hide();

                isUserConnected = true;
            }
        });
    });

    // deconnexion 
    $('#disconectionNav').click(() => {
        adminControler.unload();
        homeControler.load();
        $('#connectionNav').show();
        $('#disconectionNav').hide();
        $('#panierNav').show();
        isUserConnected = false;
    })
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

    // panier
    $('#panierNav').click(() => {
        homeControler.unload();
        adminControler.unload();
        connectionControler.unload();

        panierControler.load();
    });

});
// Ici mettre la gestion de changement de controleur lors d'un click sur un bouton du menu