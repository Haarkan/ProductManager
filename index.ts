// Point d'entrée

import { Controler } from "./Controler/Controler";
import { HomeControler } from "./Controler/HomeControler";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './out/Styles/home.css';
import * as $ from 'jquery';

let controler: HomeControler = new HomeControler();

controler.display();


$(document).ready(() => {
    // Gestion du menu :
    $('#connectionNav').click (() => {
        // init ctrlconnexion
    });
});
// Ici mettre la gestion de changement de controleur lors d'un click sur un bouton du menu