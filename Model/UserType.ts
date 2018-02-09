export class User {
    private id : number;
    private username : string;
    private password : string;
    constructor (id : number, username: string, password : string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }


    public getId () : number  {
        return this.id;
    }

    public getUserName () : string {
        return this.username;
    }

    public getPassword () : string {
        return this.password;
    }
   
}