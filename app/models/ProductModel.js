var ProductModel = {
    Names   : {
        Single : 'product',
        Plural : 'products'
    },
    Mongoose : null,
    Schema   : {
        name     : {type: String, required: true},
        category : {type: String, required: true},
        price    : {type: Number, required: true},
        quantity : {type: Number, required: true},
        sold     : {type: Number}
    },
    Model : null,
    init: function(mongoose){
        ProductModel.Mongoose      = mongoose;
        ProductModel.ProductSchema = ProductModel.Mongoose.Schema(ProductModel.Schema);
        ProductModel.Model         = ProductModel.Mongoose.model(ProductModel.Names.Single, ProductModel.ProductSchema);
        return ProductModel;
    }
};


module.exports = function(mongoose){
    return ProductModel.init(mongoose);
}