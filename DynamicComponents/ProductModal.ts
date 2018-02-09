import * as $ from 'jquery';
import { Product } from "../Model/ProductType";

export class ProductModal {

    constructor(product : Product, placementId: string) {
        let html: string = '<div class="modal fade" id="modalWindow">';
        html += '  <div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<h4 class="modal-title">' + product.getName() +'</h4>';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<div><p>' + product.getDescription() + '</p></div>';
        html += '<p><b>' + product.getPrice() + ' $CA </b></p>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btAddToCart' + product.getId() +' btn btn-success">Ajouter au panier</button>';
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