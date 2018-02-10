import { Controler } from "./Controler";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { View } from "../View/View";
import { AdminView } from "../View/AdminView";
import { AdminProductModal } from "../DynamicComponents/AdminProductModal";

export class AdminControler extends Controler {


    public showProducts(range: number): void {
        let products: Array<Product> = ProductsService.getInstance().getTenProduct(range);
        // On vide le conteneur
        $('#productList').html('');

        // Gestion du DOM
        $(document).ready(function () {

            let i : number = 0;
            // Affichage des produits
            products.forEach(product => {
                console.log(i);
                if(i == 5)
                    $('#productList').append('<div class="w-100"></div>');
                // On rempli le conteneur
                $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm productBox" style="width:33%"> <div class="card-body">' +
                    '<h4 class="card-title"> '+ product.getName() + '</h4>'  +
                    '<div>' +  product.getPrice() + '$CA<br/></div>' +
                    '<button type="button" class="btAdmin btDel' + product.getId() + ' btn btn-danger">Suppr</button>' +
                    '</div></div><br/>');
                // Click sur le produit => on affiche les détails dans un modal

                $(document).off('click', '#product' + product.getId()).on('click', '#product' + product.getId(), () => {
                    let modal: AdminProductModal = new AdminProductModal(product, 'modal');
                });

                $(document).off('click', '.btEdit' + product.getId()).on('click', '.btEdit' + product.getId(), () => {
                    this.editProduct
                });
                // Click sur ajouter au panier 
                $(document).off('click', '.btAddToCart' + product.getId()).on('click', '.btAddToCart' + product.getId(), () => {
                    alert('ici gérer ajout au panier ---- produit n°' + product.getId());
                });

                ++i;
            });


        })

    }


    public editProduct (product : Product) : string {
        return "";
    }
    public showPagingButtons(): void {
        let nbProducts: number = ProductsService.getInstance().countProducts();
        for (let i: number = 0; i < nbProducts; ++i) {

            if (i % 10 == 0) {
                $(document).ready(function () {
                    $('#pageSelection').append('<button type="button" id="btnPageProductAdmin' + i + '" class="btn">' + (i + 10) / 10 + '</button>');

                });
                $(document).off('click', '#btnPageProductAdmin' + i).on('click', '#btnPageProductAdmin' + i, () => {
                    this.showProducts(i);
                });
            }

        }
    }

    public load () : void {
        this.display();
        this.showProducts(0);
        this.showPagingButtons();
    }

    constructor() {
        super(new AdminView());

        // Gestion des évenements

    }


}




