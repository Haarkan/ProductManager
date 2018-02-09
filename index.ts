// Point d'entrée

import { Controler } from "./Controler/Controler";
import { HomeControler } from "./Controler/HomeControler";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


let controler: HomeControler = new HomeControler();

controler.display();

// Ici mettre la gestion de changement de controleur lors d'un click sur un bouton du menu