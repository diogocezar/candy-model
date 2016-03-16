var Routes = {
    Models : {
        ProductModel : null
    },
    init: function(app, rules, mongoose){

        Routes.Models.ProductModel = require('../models/ProductModel')(mongoose);

        app.get('/products', function(req, res) {
            rules.find(Routes.Models.ProductModel, req, res);
        });

        app.get('/product/:id', function(req, res) {
            rules.findById(Routes.Models.ProductModel, req, res);
        });

        app.post('/products', function (req, res) {
            var SampleSchema = {
                name     : "bolo",
                category : "bolos",
                price    : 30.0,
                quantity : 14,
                sold     : 28
            };
            rules.add(SampleSchema, Routes.Models.ProductModel, req, res);
        });
    }
};

module.exports = function(app, rules, mongoose){
    return Routes.init(app, rules, mongoose);
};