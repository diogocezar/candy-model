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
        $(".btn-search").on('click', function(){
            Product.search();
        });
        // Implementar botões para:
        // Excluir
        // Mostrar um registro
        // Implementar msg de erro se algum campo não for preenchido ou estiver incorreto -> retornar e tratar json
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
                Product.consoleDisplay(data);
            }
        });
    },
    search: function(){
        $.ajax({
            url         : '../products/search/price/lt/20',
            type        : 'GET',
            contentType : 'application/json',
            success     : function(data){
                Product.consoleDisplay(data);
            }
        });
    },
    consoleDisplay: function(json){
        $("#console-produtos").empty().html(JSON.stringify(json));
    },
    // Implementar as seguintes funções:
    get: function(id){},
    delete: function(){}
}

$(document).ready(function(){
    Product.init();
});