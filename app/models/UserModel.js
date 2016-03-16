var UserModel = {
    Names   : {
        Single : 'user',
        Plural : 'users'
    },
    Mongoose : null,
    Schema   : {
        name  : {type: String, required: true},
        email : {type: String, required: true},
    },
    Model : null,
    init: function(mongoose){
        UserModel.Mongoose      = mongoose;
        UserModel.ProductSchema = UserModel.Mongoose.Schema(UserModel.Schema);
        UserModel.Model         = UserModel.Mongoose.model(UserModel.Names.Single, UserModel.ProductSchema);
        return UserModel;
    }
};


module.exports = function(mongoose){
    return UserModel.init(mongoose);
}