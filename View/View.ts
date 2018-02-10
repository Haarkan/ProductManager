import * as $ from 'jquery';

export class View {

    private viewPath : string;

    constructor (viewPath : string) {
        this.viewPath = viewPath;
    }

    public setView () : void {
          $.ajax({
            type: "GET",
            url: this.viewPath,
            async: false,
            success: (data) => {
                $('#MainContent').html(data);
            }

        });
    }

    public hideView () : void {
        $('#MainContent').html('');
    }
}