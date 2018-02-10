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

    setName (name : string) : void {
        this.name = name;
    }

    setDescription (description : string) : void {
        this.description = description;
    }

    setPrice (price : number) : void {
        this.price = price;
    }
}