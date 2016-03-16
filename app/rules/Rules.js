var Debug = require('../debug/Debug');

var Rules = {
    find: function(model, req, res){
        model.find({}, function(err, result){
            if(err){
                Debug.error(err);
            }
            res.json(result);
        });
    },
    findById: function(model, req, res){
        model.findById(req.params.id, function(err, result){
            if(err){
                Debug.error(err);
            }
            res.json(result);
        });
    },
    save: function(schema, model, req, res){
        model.create(schema, function(err, result) {
            if(err){
                Debug.error(err);
            }
            res.json(result);
        });
    },
    delete: function(){
        //implements here
    }
}

module.exports = Rules;