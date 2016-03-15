var Rules = {
    find: function(model, req, res){
        model.find({}, function(err, result){
            if(err)
                Debug.error(err);
            res.json(result);
        });
    },
    findById: function(model, req, res){
        model.findById(req.params.id, function(err, result){
            if(err){
                Debug.error(err);
                throw err;
            }
            res.json(result);
        });
    }
}

module.exports(Rules);