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

            let i: number = 0;
            // Affichage des produits
            products.forEach(product => {
                if (i == 5)
                    $('#productList').append('<div class="w-100"></div>');
                // On rempli le conteneur
                $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm productBox" style="width:33%"> <div class="card-body">' +
                    '<h4 class="card-title"> ' + product.getName() + '</h4>' +
                    '<img class="card-img-top" src="http://lorempixel.com/200/200" style="height:18%; width:auto;" alt="Card image">'+
                    '<div>' + product.getPrice() + '$CA<br/></div>' +
                    '<button type="button" class="btAdmin btPlus' + product.getId() + ' btn btn-info">+</button>' +
                    '<button type="button" class="btAdmin btDel' + product.getId() + ' btn btn-danger">Suppr</button>' +
                    '</div></div><br/>');
                // Click sur le produit => on affiche les détails dans un modal

                $(document).off('click', '.btPlus' + product.getId()).on('click', '.btPlus' + product.getId(), () => {
                    let modal: AdminProductModal = new AdminProductModal(product, 'modal');
                });

                $(document).off('click', '.btDel' + product.getId()).on('click', '.btDel' + product.getId(), () => {
                    let edit : string = this.deleteProduct(product);
                    // si la suppression a fonctionée on refresh 
                    if (edit != "Erreur") {
                        this.showProducts(0);
                        this.showPagingButtons();   
                    }
                });

                  $(document).off('click', '.btEdit' + product.getId()).on('click', '.btEdit' + product.getId(), () => {
                    // pourquoi si l'utilisateur entre une string ça plante pas ???
                    let pr : number = $('#editPrice').val();
                    let edit : string = this.editProduct(product, $('#editName').val(), $('#editDescription').val(), pr);
                    if (edit != "Erreur")
                        this.showProducts(0);
                });
                // Click sur ajouter au panier 
                $(document).off('click', '.btAddToCart' + product.getId()).on('click', '.btAddToCart' + product.getId(), () => {
                    alert('ici gérer ajout au panier ---- produit n°' + product.getId());
                });

                ++i;
            });
    }

    public deleteProduct (product : Product) : string {
        return ProductsService.getInstance().deleteProduct(product);
    }
    public editProduct(product: Product, newName : string, newDescription : string, newPrice : number): string {
        return ProductsService.getInstance().editProduct(product, newName, newDescription, newPrice);
    }

    public showPagingButtons(): void {
        $('#pageSelection').html('');
        let nbProducts: number = ProductsService.getInstance().countProducts();
        for (let i: number = 0; i < nbProducts; ++i) {
            // on crée un bouton tout les 10 produits
            if (i % 10 == 0) {
                $('#pageSelection').append('<button type="button" id="btnPageProductAdmin' + i + '" class="btn">' + (i + 10) / 10 + '</button>');
                $(document).off('click', '#btnPageProductAdmin' + i).on('click', '#btnPageProductAdmin' + i, () => {
                    this.showProducts(i);
                });

              
            }

        }
    }

    public load(): void {
        this.display();
        this.showProducts(0);
        this.showPagingButtons();
    }

    constructor() {
        super(new AdminView());

        // Gestion des évenements

    }


}




