import { Controler } from "./Controler";
import { HomeView } from "../View/HomeView";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { View } from "../View/View";

export class HomeControler extends Controler {

    private productsService: ProductsService;

    public showProducts(range: number): void {
        let products: Array<Product> = this.productsService.getTenProduct(range);
        // On vide le conteneur
        $('#productList').html('');
        // Gestion du DOM
        $(document).ready(function() {

            // Affichage des produits
            products.forEach(product => {
                // On rempli le conteneur
                $('#productList').append('<div>' +
                    '<div>' + product.getName() + '<br/>' + product.getDescription() + '</div>' +
                    '<button type="button" id="btAddToCart' + product.getId() + '" class="btn btn-success">Ajouter au panier</button></div><br/>');
                $(document).on('click', '#btAddToCart' + product.getId(), () => {
                    alert ('ici gérer ajout au panier ---- produit n°' + product.getId());
                });
            });


        })

    }

    public showPagingButtons(): void {
        let nbProducts: number = this.productsService.countProducts();
        for (let i: number = 0; i < nbProducts; ++i) {

            if (i % 10 == 0) {
                $(document).ready(function() {
                    $('#pageSelection').append('<button type="button" id="btnPageProduct' + i + '" class="btn">' + (i + 10) / 10 + '</button>');

                });
                $(document).on('click', '#btnPageProduct' + i, () => {
                    this.showProducts(i);
                });
            }

        }
    }

    constructor() {
        super(new HomeView());

        this.productsService = new ProductsService();
        // Gestion des évenements

        this.showProducts(0);
        this.showPagingButtons();
    }


}




