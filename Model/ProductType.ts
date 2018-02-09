export class Product {
    private id : number;
    private name : string;
    private description : string;
    private price : number;
    constructor (id : number, name: string, description : string, price : number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    getName () : string  {
        return this.name;
    }
    
    getDescription () : string  {
        return this.description;
    }

    getId () : number  {
        return this.id;
    }

    getPrice () : number {
        return this.price;
    }
}