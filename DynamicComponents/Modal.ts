import * as $ from 'jquery';

export class Modal {

    constructor(heading: string, text: string, placementId : string) {
        let html: string = '<div class="modal fade" id="modalWindow">';
        html += '  <div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<h4 class="modal-title">' + heading +'</h4>';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += text;
        html += '</div>';
        html += '<div class="modal-footer">';

        html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        html += '</div>';
        $("#" + placementId).html(html);
        $("#modalWindow").modal();
     //   $(document).on('click', '.close', () => {
        //    alert('lol');
          //  this.hideModal();
        //});
    }

    public hideModal () {
        $('#modal').modal('hide');
    }
}