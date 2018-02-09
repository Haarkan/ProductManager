import * as $ from 'jquery';

export class View {

    private viewPath : string;

    constructor (viewPath : string) {
        this.viewPath = viewPath;
    }

    public setView () : void {
        $('#MainContent').load(this.viewPath);
    }

    public hideView () : void {
        $('#MainContent').html('');
    }
}