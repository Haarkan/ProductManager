import { View } from "../View/View";
import $ from "jquery";

export class Controler {

    private view : View;
    
    constructor (view : View) {
        this.view = view;
    }

    public display () : void {
        this.view.setView();
    }

    public unload () : void {
        this.view.hideView();
    }
  //  public initControler () : void {
    //    this.display();
    //}

    
}