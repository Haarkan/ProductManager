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
        if (CartService.getInstance().countProducts() == 0) {
            $('#btBuyCart').hide();
        } else {
            $('#btBuyCart').show();
        }

        let i: number = 0;
        // Affichage des produits
        let total : number = 0;
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
            total += product.getPrice();
            ++i;
        });
        this.showTotal(total);



    }
    public showTotal(total:number): void{
        $('#prixAPayer').html('');
        let totalTaxes : number = total*1.1;
        $('#prixAPayer').append('<p> Total :'+ total +'$CA </br> Total avec taxes : '+ totalTaxes + '$CA </p>');
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
            if (CartService.getInstance().payCart() != "Erreur") {
                this.showProducts(0);
                this.showPagingButtons();


                $('#panierBody').append('<div class="alert-success">Monsieur Marc Assin, votre commande n° ' + this.makeid() + ' à bien été passée et sera livrée chez vous au 666 rue de Satan très prochainement.</div>')
            } else {
                $('#panierBody').append('<div class="alert-danger">Erreur payement invalide</div>')

            }

        });
    }

    private makeid(): string {
        var text = "";
        var possibleInt = "0123456789";
        var possibleChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 5; i++)
            text += possibleInt.charAt(Math.floor(Math.random() * possibleInt.length));

        for (var i = 0; i < 9; i++)
            text += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
        return text;
    }

    public shows(): void {

    }
    constructor() {
        super(new PanierView());


    }


}




