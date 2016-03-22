/* global ProductModel */

var Product = {
    init: function(){
        Product.setButtons();
        Product.getAll();
    },
    setButtons: function(){
        $(".btn-save").on('click', function(){
            Product.save();
        });
        // Implementar botões para:
        // Excluir
        // Mostrar um registro
    },
    fillModel: function(){
        ProductModel.Schema.name     = $("#name").val();
        ProductModel.Schema.category = $("#category").val();
        ProductModel.Schema.price    = $("#price").val();
        ProductModel.Schema.quantity = $("#quantity").val();
        ProductModel.Schema.sold     = $("#sold").val();
    },
    save: function(){
        Product.fillModel();
        $.ajax({
            url         : '../products',
            type        : 'POST',
            contentType : 'application/json; charset=utf-8',
            data        : JSON.stringify({ Schema: ProductModel.Schema}),
            success     : function(data){
                Product.getAll();
            }
        });
    },
    getAll: function(){
        $.ajax({
            url         : '../products',
            type        : 'GET',
            contentType : 'application/json',
            success     : function(data){
                $("#console-produtos").empty().html(JSON.stringify(data));
            }
        });
    },
    // Implementar as seguintes funções:
    get: function(id){},
    delete: function(){}
}

$(document).ready(function(){
    Product.init();
});