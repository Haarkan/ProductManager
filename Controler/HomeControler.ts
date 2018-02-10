import { Controler } from "./Controler";
import { HomeView } from "../View/HomeView";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { View } from "../View/View";
import { ProductModal } from "../DynamicComponents/ProductModal";

export class HomeControler extends Controler {

    public showProducts(range: number): void {
        let products: Array<Product> = ProductsService.getInstance().getTenProduct(range);
        // On vide le conteneur
        $('#productList').html('');

        // Gestion du DOM

            let i : number = 0;
            // Affichage des produits
            products.forEach(product => {
                if(i == 5)
                    $('#productList').append('<div class="w-100"></div>');
                // On rempli le conteneur
                console.log('affichage');
                $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm productBox" style="width:33%"> <div class="card-body">' +
                    '<h4 class="card-title"> '+ product.getName() + '</h4>'  +
                    '<div>' +  product.getPrice() + '$CA<br/></div>' +
                    '<button type="button" class="btAddToCart' + product.getId() + ' btn btn-success">Ajouter au panier</button></div></div><br/>');
                // Click sur le produit => on affiche les détails dans un modal

                $(document).off('click', '#product' + product.getId()).on('click', '#product' + product.getId(), () => {
                    let modal: ProductModal = new ProductModal(product, 'modal');
                });
                // Click sur ajouter au panier
                $(document).off('click', '.btAddToCart' + product.getId()).on('click', '.btAddToCart' + product.getId(), () => {
                    alert('ici gérer ajout au panier ---- produit n°' + product.getId());
                });

                ++i;
            });



    }

    public showPagingButtons(): void {
        let nbProducts: number = ProductsService.getInstance().countProducts();
        for (let i: number = 0; i < nbProducts; ++i) {

            if (i % 10 == 0) {
                    $('#pageSelection').append('<button type="button" id="btnPageProduct' + i + '" class="btn">' + (i + 10) / 10 + '</button>');

                $(document).on('click', '#btnPageProduct' + i, () => {
                    this.showProducts(i);
                });
            }

        }
    }

    public load () : void {

        // la page html est chargée après l'appel des show
        this.display();
        this.showProducts(0);
        this.showPagingButtons();
    }

    public shows () : void {
        
    }
    constructor() {
        super(new HomeView());

      
    }


}




