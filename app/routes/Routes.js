var Debug = require('../debug/Debug');

var Routes = {
    Models : [],
    init: function(app, rules, mongoose){
        /**
         * Automatic Models are Loaded if they are into CollectionModel Models Array.
         */
        Routes.Models = require('../models/CollectionModels')(mongoose);
        for(var i=0; i<Routes.Models.length; i++){
            /**
             * This clousure allows to access i var inside internal funcions.
             */
            (function(i){
                Debug.log("\tGenerating automatic routes to: " + Routes.Models[i].Names.Plural);
                /**
                 * Get all items from model collection.
                 */
                app.get('/' + Routes.Models[i].Names.Plural, function(req, res){
                    rules.find(Routes.Models[i].Model, req, res);
                });
                /**
                 * Get single item from model collection.
                 */
                app.get('/' + Routes.Models[i].Names.Single + '/:id', function(req, res){
                   rules.findById(Routes.Models[i].Model, req, res);
                });
                /**
                 * Save an item at model collection.
                 */
                app.post('/' + Routes.Models[i].Names.Plural, function(req, res){
                    /**
                     * This is for tests only, these data need to came from front-end.
                     */
                    if(Routes.Models[i].Names.Single == 'product'){
                        var SampleSchema = {
                            name     : "bolo",
                            category : "bolos",
                            price    : 30.0,
                            quantity : 14,
                            sold     : 28
                        };
                    }
                    else{
                        var SampleSchema = {
                            name     : "foo",
                            email    : "foo@bar.com"
                        };
                    }
                    rules.save(SampleSchema, Routes.Models[i].Model, req, res);
                });
                /**
                 * Delete an item from model collection.
                 */
                app.delete('/' + Routes.Models[i].Names.Single + '/:id', function(req, res){
                    var id  = req.params.id;
                    rules.delete(Routes.Models[i].Model, req, res);

                });
                /**
                 * Update an item from model collection
                 */
                app.put('/' + Routes.Models[i].Names.Single + '/:id', function(req, res){
                    var SampleSchema = {
                            name     : "Cake",
                            category : "bolos",
                            price    : 30.0,
                            quantity : 14,
                            sold     : 28
                        };
                    rules.save(SampleSchema, Routes.Models[i].Model, req, res);
                });
            })(i);
        }
        /**
         * Manual Routes Can Be Defined Here
         */
         Debug.log("\tDefining static routes.");
         app.get('/foo', function(req, res){
            res.send('bar');
         });
    }
};

module.exports = function(app, rules, mongoose){
    return Routes.init(app, rules, mongoose);
};