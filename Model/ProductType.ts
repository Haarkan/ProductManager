export class Product {
    private id : number;
    private name : string;
    private description : string;
    constructor (id : number, name: string, description : string) {
        this.id = id;
        this.name = name;
        this.description = description;
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
}