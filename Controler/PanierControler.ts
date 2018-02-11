import { Controler } from "./Controler";
import { ConnectionView } from "../View/ConnectionView";
import { UsersService } from "../Services/UsersService";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { ProductModal } from "../DynamicComponents/ProductModal";
import { PanierView } from "../View/PanierView";
import { CartService } from "../Services/CartService";

export class PanierControler extends Controler {

    public showProducts(range: number): void {
        let products: Array<Product> = CartService.getInstance().getTenProduct(range);
        // On vide le conteneur
        $('#productList').html('');

        // Gestion du DOM

        let i: number = 0;
        // Affichage des produits
        products.forEach(product => {
           
            // On rempli le conteneur
            // 1 produit = 1 card. PROBLEME : l'image reste la même :(
            $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm-4 productBox" style="text-align:center;"> <div class="card-body">' +
                '<h4 class="card-title"> ' + product.getName() + '</h4>' +
                '<img class="card-img-top" src="http://lorempixel.com/200/200" style="height:18%; width:auto;" alt="Card image">' +
                '<div>' + product.getPrice() + '$CA<br/></div>' +
                '<button type="button" class="btPlus btPlus' + product.getId() + ' btn btn-info">+</button>' +
                '<button type="button" class="btRemoveFromCart' + product.getId() + ' btn btn-danger">Retirer du panier</button></div></div><br/>');
            // Click sur le produit => on affiche les détails dans un modal

            $(document).off('click', '.btPlus' + product.getId()).on('click', '.btPlus' + product.getId(), () => {
                let modal: ProductModal = new ProductModal(product, 'modal');
            });

            $(document).off('click', '.btRemoveFromCart' + product.getId()).on('click', '.btRemoveFromCart' + product.getId(), () => {
                CartService.getInstance().deleteProduct(product);
                this.showProducts(0);
                this.showPagingButtons();
            });

            ++i;
        });



    }

    public showPagingButtons(): void {
        let nbProducts: number = CartService.getInstance().countProducts();
        $('#pageSelection').html('');
        for (let i: number = 0; i < nbProducts; ++i) {

            if (i % 10 == 0) {
                $('#pageSelection').append('<button type="button" id="btnPageProductCart' + i + '" class="btn">' + (i + 10) / 10 + '</button>');

                $(document).on('click', '#btnPageProductCart' + i, () => {
                    this.showProducts(i);
                });
            }

        }
    }

    public load(): void {

        // la page html est chargée après l'appel des show
        this.display();
        this.showProducts(0);
        this.showPagingButtons();

        $('#btBuyCart').click(() => {
            if(CartService.getInstance().payCart() != "Erreur") {
                this.showProducts(0);
                this.showPagingButtons();
                $('#productList').append('<div>Votre commande à bien été passée</div>')
            } else {
                alert('Erreur, payement invalide');
            }

        });
    }

    public shows(): void {

    }
    constructor() {
        super(new PanierView());


    }


}




