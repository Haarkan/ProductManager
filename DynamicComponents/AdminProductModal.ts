import * as $ from 'jquery';
import { Product } from "../Model/ProductType";

export class AdminProductModal {

    constructor(product: Product, placementId: string) {
        if (product.getId() == null) {
            this.newProductModal(product, placementId);
        } else {
            this.editProductModal(product, placementId);
        }


    }

    private newProductModal(product: Product, placementId: string): void {
        let html: string = '<div class="modal fade" id="modalWindow">';
        html += '  <div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<h4 class="modal-title"><input id="createName" type="text" class="form-control"></h4>';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<input id="createDescription" type="text" class="form-control"><br/>';
        html += '<input id="createPrice" type="number" class="form-control col-sm" pattern="[0-9]{*}"><span>$CA</span>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btAdmin btCreateProduct btn btn-warning" data-dismiss="modal">Créer le produit</button>';
        html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>';
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        html += '</div>';


        $("#" + placementId).html(html);
        $("#modalWindow").modal();

        $(document).off('click', '.btCreateProduct').on('click', '.btCreateProduct', () => {
            
        });
    }

    private editProductModal(product: Product, placementId: string): void {
        let html: string = '<div class="modal fade" id="modalWindow">';
        html += '  <div class="modal-dialog">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<h4 class="modal-title"><input id="editName" type="text" class="form-control" value="' + product.getName() + '"></h4>';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '</div>';
        html += '<div class="modal-body">';
        html += '<input id="editDescription" type="text" class="form-control" value="' + product.getDescription() + '"><br/>';
        html += '<input id="editPrice" type="number" class="form-control col-sm" value="' + product.getPrice() + '" pattern="[0-9]{*}"><span>$CA</span>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btAdmin btEdit' + product.getId() + ' btn btn-warning">Valider l\'édition</button>';
        html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>';
        html += '</div>';  // footer
        html += '</div>';  // modalWindow
        html += '</div>';
        $("#" + placementId).html(html);
        $("#modalWindow").modal();
    }
    public hideModal() {
        $('#modal').modal('hide');
    }
}