import * as $ from 'jquery';
import { Product } from "../Model/ProductType";

export class AdminProductModal {

    constructor(product : Product, placementId: string) {
        let html: string = '<div class="modal fade" id="modalWindow">';
        html += '  <div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<h4 class="modal-title"><input id="editName" type="text" class="form-control" value="' + product.getName() +'"></h4>';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<input id="editDescription" type="text" class="form-control" value="' + product.getDescription() + '"><br/>'; 
        html += '<input id="editPrice" type="text" class="form-control col-sm" value="'+ product.getPrice() +  '"><span>$CA</span>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btAdmin btEdit' + product.getId() + ' btn btn-warning">Valider l\'édition</button>';
        html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>';
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        html += '</div>';
        $("#" + placementId).html(html);
        $("#modalWindow").modal();
 
    }

    public hideModal () {
        $('#modal').modal('hide');
    }
}