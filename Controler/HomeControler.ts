import { Controler } from "./Controler";
import { HomeView } from "../View/HomeView";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { View } from "../View/View";
import { ProductModal } from "../DynamicComponents/ProductModal";
import { CartService } from "../Services/CartService";
import * as toastr from 'toastr';
export class HomeControler extends Controler {

    // affichage des produits
    public showProducts(range: number): void {
        let products: Array<Product> = ProductsService.getInstance().getTenProduct(range);
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
                '<button type="button" class="btAddToCart' + product.getId() + ' btn btn-success">Ajouter au panier</button></div></div><br/>');
            // Click sur le produit => on affiche les détails dans un modal

            $(document).off('click', '.btPlus' + product.getId()).on('click', '.btPlus' + product.getId(), () => {
                let modal: ProductModal = new ProductModal(product, 'modal');
            });
            // Click sur ajouter au panier
            $(document).off('click', '.btAddToCart' + product.getId()).on('click', '.btAddToCart' + product.getId(), () => {
                CartService.getInstance().addProductToCart(product);
                toastr.success('Le produit ' + product.getName() + ' a bien été ajouté à votre panier !');
            });


            ++i;
        });



    }

    // boutons de pagination
    public showPagingButtons(): void {
        let nbProducts: number = ProductsService.getInstance().countProducts();
        let nbBt: number = 1;
        for (let i: number = 0; i < nbProducts; ++i) {
            if (i % 9 == 0) {
                $('#pageSelection').append('<button type="button" id="btnPageProduct' + i + '" class="btn">' + nbBt + '</button>');
                ++nbBt;
                $(document).on('click', '#btnPageProduct' + i, () => {
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
    }

    public shows(): void {

    }
    constructor() {
        super(new HomeView());


    }


}




