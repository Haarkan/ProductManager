import { Product } from "../Model/ProductType";
import * as $ from 'jquery';

export class ProductsService {


    private fakeDataBase: Array<Product>;
    private static _instance: ProductsService = new ProductsService();

    constructor() {
        if (ProductsService._instance) {
            return ProductsService._instance;
        }
        this.buildTheFakeDataBase();
        ProductsService._instance = this;
    }

    public static getInstance(): ProductsService {
        return ProductsService._instance;
    }

    public buildTheFakeDataBase(): void {

        // Ce magnifique tableau servira de serveur 
        this.fakeDataBase = new Array<Product>();

        // J'ai tout mis dans un JSON pour pas avoir à créer 12000 objets à la main
        $.ajax({
            type: "GET",
            url: "/out/datas/products.json",
            async: false,
            success: (data) => {
                // Construction du tableau de produit à partir du JSON
                // Il y a surement une méthode plus optimisée
                data.forEach(product => {
                    this.fakeDataBase.push(new Product(product.id, product.name, product.description, product.price));
                });
            }

        });
    }
    public getAllProducts(): Array<Product> {

        return this.fakeDataBase;

    }

    public deleteProduct(product: Product): string {
        let message: string = "Erreur"
        this.fakeDataBase.forEach(finded => {
            if (finded.getId() == product.getId()) {
                this.fakeDataBase.splice(this.fakeDataBase.indexOf(finded), 1);
               
                message = "Le produit " + product.getName() + " à bien été supprimé !";
            }
        });
        return message;
    }

    public editProduct(product: Product, newName: string, newDescription: string, newPrice: number): string {
        let msg : string = 'erreur';
        this.fakeDataBase.forEach(finded => {
            if (finded.getId() == product.getId()) {
                finded.setName(newName);
                finded.setDescription(newDescription);
                finded.setPrice(newPrice);
                msg =  "Le produit " + newName + " à bien été modifié";
            }
        });

        return msg;

    }

    public addProduct(product: Product) : string {
        product.setId(ProductsService.getInstance().countProducts());
        this.fakeDataBase.push(product);
        return "Le produit " + product.getName() + " à bien été créé !";
    }

    public getTenProduct(range: number): Array<Product> {

        if (range != 0)
            return this.fakeDataBase.slice(range, range + 9);
        else
            return this.fakeDataBase.slice(0, 9);



        // Sans serveur on devra malheuresement travailler sur l'intégralité du tableau, cependant je ne
        // renvois que les données situées dans l'interval voulut. 
    }

    public countProducts(): number {
        return this.fakeDataBase.length;
    }

}