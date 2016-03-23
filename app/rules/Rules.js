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
    delete: function(model, req, res){
        model.findByIdAndRemove(req.params.id, function(err, result) {
            if(err){
                Debug.error(err);
            }
            res.json(result);
        });
    },
    update: function(schema, model, req, res) {
        model.findById(req.params.id, function(err, result){
            if(err){
                Debug.error(err);
            }
            schema.save(function(err) {
                if(err){
                    Debug.error(err);
                }
                res.json(schema);
            })
        })
    },
    search: function(model, req, res){
        var op = null;
        switch(req.params.operator){
            case 'gt': op = '$gt'; break;
            case 'lt': op = '$lt'; break;
            case 'eq': op = '$eq'; break;
        }
        var SearchParams = {};
        var Operation    = {};
        Operation[op]    = req.params.value;
        SearchParams[req.params.field] = Operation;
        model.find(SearchParams, function(err, result){
            if(err){
                Debug.error(err);
            }
            res.json(result);
        });
    },
    sort: function(model, req, res){
        var Sort = {};
        Sort[req.params.field] = parseInt(req.params.type) || -1;
        model.find({}).
            limit(req.params.limit).
            sort(Sort).
            exec(function(err, result){
                if(err){
                    Debug.error(err);
                }
                res.json(result);
            });
    }
    /*
        Person.
            find({
            occupation: /host/,
            'name.last': 'Ghost',
            age: { $gt: 17, $lt: 66 },
            likes: { $in: ['vaporizing', 'talking'] }
            }).
            limit(10).
            sort({ occupation: -1 }).
            select({ name: 1, occupation: 1 }).
            exec(callback);
    */
}

module.exports = Rules;