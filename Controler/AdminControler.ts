import { Controler } from "./Controler";
import * as $ from 'jquery';
import { Product } from "../Model/ProductType";
import { ProductsService } from "../Services/ProductsService";
import { View } from "../View/View";
import { AdminView } from "../View/AdminView";
import { AdminProductModal } from "../DynamicComponents/AdminProductModal";


import * as toastr from 'toastr';
export class AdminControler extends Controler {


    public showProducts(range: number): void {
        let products: Array<Product> = ProductsService.getInstance().getTenProduct(range);
        // On vide le conteneur
        $('#productList').html('');

        // Gestion du DOM

        let i: number = 0;
        // Affichage des produits
        products.forEach(product => {

            // On rempli le conteneur
            $('#productList').append('<div id="product' + product.getId() + '" class="card col-sm-4 productBox" style="width:33%"> <div class="card-body">' +
                '<h4 class="card-title"> ' + product.getName() + '</h4>' +
                '<img class="card-img-top" src="http://lorempixel.com/200/200" style="height:18%; width:auto;" alt="Card image">' +
                '<div>' + product.getPrice() + '$CA<br/></div>' +
                '<button type="button" class="btAdmin btPlus' + product.getId() + ' btn btn-info"><i class="material-icons">zoom_in</i></button>' +
                '<button type="button" class="btAdmin btDel' + product.getId() + ' btn btn-danger"><i class="material-icons">delete</i></button>' +
                '</div></div><br/>');
            // Click sur le produit => on affiche les détails dans un modal

            $(document).off('click', '.btPlus' + product.getId()).on('click', '.btPlus' + product.getId(), () => {
                let modal: AdminProductModal = new AdminProductModal(product, 'modal');
            });

            $(document).off('click', '.btDel' + product.getId()).on('click', '.btDel' + product.getId(), () => {
                let editMsg: string = this.deleteProduct(product);
                // si la suppression a fonctionée on refresh 
                if (editMsg != "Erreur") {
                    this.showProducts(0);
                    this.showPagingButtons();
                    toastr.success(editMsg);

                }
            });

            $(document).off('click', '.btEdit' + product.getId()).on('click', '.btEdit' + product.getId(), () => {
                // pourquoi si l'utilisateur entre une string ça plante pas ???
                let pr: number = $('#editPrice').val();
                let editMsg: string = this.editProduct(product, $('#editName').val(), $('#editDescription').val(), pr);
                if (editMsg != "Erreur") {
                    this.showProducts(0);
                    toastr.success(editMsg);
                }
            });
            // Click sur ajouter au panier 
            $(document).off('click', '.btAddToCart' + product.getId()).on('click', '.btAddToCart' + product.getId(), () => {
                alert('ici gérer ajout au panier ---- produit n°' + product.getId());
            });

            ++i;
        });
    }

    public deleteProduct(product: Product): string {
        return ProductsService.getInstance().deleteProduct(product);
    }
    public editProduct(product: Product, newName: string, newDescription: string, newPrice: number): string {
        return ProductsService.getInstance().editProduct(product, newName, newDescription, newPrice);
    }

    public showPagingButtons(): void {
        $('#pageSelection').html('');
        let nbProducts: number = ProductsService.getInstance().countProducts();
        let nbBt : number = 1;
        for (let i: number = 0; i < nbProducts; ++i) {
            // on crée un bouton tout les 10 produits
            if (i % 9 == 0) {
                $('#pageSelection').append('<button type="button" id="btnPageProductAdmin' + i + '" class="btn">' + nbBt + '</button>');
                ++ nbBt;
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

        $(document).off('click', '#addProduct').on('click', '#addProduct', () => {
            let newProduct: Product = new Product(null, '', '', null);
            let modal: AdminProductModal = new AdminProductModal(newProduct, 'modal');

            $(document).off('click', '.btCreateProduct').on('click', '.btCreateProduct', () => {
                newProduct.setName($('#createName').val());
                newProduct.setDescription($('#createDescription').val());
                newProduct.setPrice($('#createPrice').val());
                let creationMsg: string = ProductsService.getInstance().addProduct(newProduct);

                this.showProducts(0);
                this.showPagingButtons();
                toastr.success(creationMsg);
            });
        });


    }

    constructor() {
        super(new AdminView());

        // Gestion des évenements

    }


}




