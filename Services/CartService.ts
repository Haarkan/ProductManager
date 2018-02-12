import { Product } from "../Model/ProductType";
import * as $ from 'jquery';

export class CartService {

    private fakeDataBase: Array<Product>;
    private static _instance: CartService = new CartService();

    constructor() {
        if (CartService._instance) {
            return CartService._instance;
        }
        this.buildTheFakeDataBase();
        CartService._instance = this;
    }

    public static getInstance(): CartService {
        return CartService._instance;
    }

    public buildTheFakeDataBase(): void {

        // Ce magnifique tableau servira de serveur 
        this.fakeDataBase = new Array<Product>();
    }

    public getAllProducts(): Array<Product> {

        return this.fakeDataBase;

    }

    public deleteProduct (product : Product) : string {
        let message : string = "Erreur"
        this.fakeDataBase.forEach(finded => {
            if (finded.getId() == product.getId()) {
                this.fakeDataBase.splice(this.fakeDataBase.indexOf(finded), 1);
                message = "Element supprimé du panier avec succès"
                
            }
        });
        return message;
    }

    public addProductToCart (product : Product) : void {
        this.fakeDataBase.push(product);
    }

    public payCart() : string {

        if (Math.floor(Math.random() * Math.floor(2)) == 1) {
            this.fakeDataBase = new Array<Product>();
            return "Panier payé !"
        } else {
            return "Erreur";
        }
    }
    public getTenProduct(range: number): Array<Product> {

        if (range != 0)
            return this.fakeDataBase.slice(range, range + 10);
        else
            return this.fakeDataBase.slice(0, 10);



        // Sans serveur on devra malheuresement travailler sur l'intégralité du tableau, cependant je ne
        // renvois que les données situées dans l'interval voulut. 
    }

    public countProducts(): number {
        return this.fakeDataBase.length;
    }

}