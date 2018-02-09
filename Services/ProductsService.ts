import { Product } from "../Model/ProductType";
import * as $ from 'jquery';
export class ProductsService {


    public buildTheFakeDataBase() : Array<Product> {

        // Ce magnifique tableau servira de serveur
       
        let products: Array<Product> = new Array<Product>();;

        // J'ai tout mis dans un JSON pour pas avoir à créer 12000 objets à la main
        $.ajax({
            type: "GET",
            url: "/out/datas/products.json",
            async: false,
            success: function(data) {
                // Construction du tableau de produit à partir du JSON
                // Il y a surement une méthode plus optimisée
                data.forEach(product => {
                    products.push(new Product (product.id, product.name, product.description));
                });
            }
            
        });

        return products;


    }
    public getAllProducts(): Array<Product> {

        return this.buildTheFakeDataBase();

    }

    public getTenProduct(range : number) : Array<Product> {
        let datas : Array<Product> = this.buildTheFakeDataBase();

        if (range != 0) 
            return datas.slice(range, range + 10);
        else 
             return datas.slice(0, 10);
        

        
        // Sans serveur on devra malheuresement travailler sur l'intégralité du tableau, cependant je ne
        // renvois que les données situées dans l'interval voulut. 
    }

    public countProducts () : number {
        // Si on avait un serveur on demanderait un count ce qui serait beaaaauuucoup moins lourd
        let datas : Array<Product> = this.buildTheFakeDataBase();
        return datas.length;
    }

}