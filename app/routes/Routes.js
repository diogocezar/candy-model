var Routes = {
    Models : {
        ProductModel : null
    },
    init: function(app, rules, mongoose){
        
        Routes.Models.ProductModel = require('../models/ProductModel')(mongoose);
        
        app.get('/products', function(req, res) {
            rules.find(Routes.Models.ProductModel, req, res);
        });
        
        app.get('/products/:id', function(req, res) {
            rules.findById(Routes.Models.ProductModel, req, res);
        });
    }
}


module.exports = function(app, rules, mongoose){
    return Routes.init(app, rules, mongoose);
};