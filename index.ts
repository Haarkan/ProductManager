// Point d'entrée

import { Controler } from "./Controler/Controler";
import { HomeControler } from "./Controler/HomeControler";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './out/Styles/home.css';
import * as $ from 'jquery';
import { ConnectionControler } from "./Controler/ConnectionControler";

let homeControler: HomeControler = new HomeControler();

homeControler.display();


$(document).ready(() => {
    // Gestion du menu :
    $('#connectionNav').click (() => {
        homeControler.unload();
        let connectionControler :ConnectionControler = new ConnectionControler();
        connectionControler.display();
    });
});
// Ici mettre la gestion de changement de controleur lors d'un click sur un bouton du menu