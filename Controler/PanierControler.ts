import { Controler } from "./Controler";
import { ConnectionView } from "../View/ConnectionView";
import { UsersService } from "../Services/UsersService";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { ProductModal } from "../DynamicComponents/ProductModal";
import { PanierView } from "../View/PanierView";

export class PanierControler extends Controler {
    //nb item dans le panier : soit faire un tableau de produit dans le panier avec un tableau 
    //                          de quantité de produit
    //                          ou alors faire ça avec des pointer
    static nbItemPanier : number = 0;

    //
// ************************ ctrl+C ctrl+V du Home controlleur : *****************************************
//                          reste juste à afficher les produits qui ont été mis dans le panier
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
                // 1 produit = 1 card. PROBLEME : l'image reste la même :(
                $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm productBox" style="text-align:center;"> <div class="card-body">' +
                    '<h4 class="card-title"> '+ product.getName() + '</h4>'  +
                    '<img class="card-img-top" src="http://lorempixel.com/200/200" style="height:18%; width:auto;" alt="Card image">'+
                    '<div>' +  product.getPrice() + '$CA<br/></div>' +
                    '<button type="button" class="btPlus btPlus' + product.getId() + ' btn btn-info">+</button>' +
                    '<button type="button" class="btAddToCart' + product.getId() + ' btn btn-success">Ajouter au panier</button></div></div><br/>');
                // Click sur le produit => on affiche les détails dans un modal

                $(document).off('click', '.btPlus' + product.getId()).on('click', '.btPlus' + product.getId(), () => {
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
        super(new PanierView());
        
      
    }


}




