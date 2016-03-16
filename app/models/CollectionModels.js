var Collection = {
    Models : [],
    init: function(mongoose){
        Collection.Models.push(require('../models/ProductModel')(mongoose));
        Collection.Models.push(require('../models/UserModel')(mongoose));
        return Collection.Models;
    }
}

module.exports = function(mongoose){
    return Collection.init(mongoose);
}