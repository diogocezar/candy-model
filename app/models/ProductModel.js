var ProductModel = {
    Name     : null,
    Mongoose : null,
    Schema   : {
        name     : {type: String, required: true},
        category : {type: String, required: true},
        price    : {type: Number, required: true},
        quantity : {type: Number, required: true},
        sold     : {type: Number}
    },
    init: function(mongoose){
        ProductModel.Mongoose      = mongoose;
        ProductModel.Name          = "Product";
        ProductModel.ProductSchema = ProductModel.Mongoose.Schema(ProductModel.Schema);
        return ProductModel.Mongoose.model(ProductModel.Name, ProductModel.ProductSchema);
    }
};


module.exports = function(mongoose){
    return ProductModel.init(mongoose);
}