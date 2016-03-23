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
                    rules.save(req.body.Schema, Routes.Models[i].Model, req, res);
                });
                /**
                 * Delete an item from model collection.
                 */
                app.delete('/' + Routes.Models[i].Names.Single + '/:id', function(req, res){
                    rules.delete(Routes.Models[i].Model, req, res);
                });
                /**
                 * Update an item from model collection
                 */
                app.put('/' + Routes.Models[i].Names.Single + '/:id', function(req, res){
                    rules.save(req.body.Schema, Routes.Models[i].Model, req, res);
                });
                /**
                * Search at database based on fields inputed at URL, examples:
                * /products/search/price/eq/30
                * /products/search/price/gt/30
                * /products/search/price/lt/30
                */
                app.get('/' + Routes.Models[i].Names.Plural + '/search' + '/:field' + '/:operator' + '/:value', function(req, res){
                    rules.search(Routes.Models[i].Model, req, res);
                });

                /**
                * Sort and limit registers.
                * /products/sort-limit/price/3/1 - ASC
                * /products/sort-limit/price/3/-1 - DESC
                * /products/sort-limit/price/3 - Default DESC
                */
                app.get('/' + Routes.Models[i].Names.Plural + '/sort-limt' + '/:field' + '/:limit', function(req, res){
                    rules.sortLimit(Routes.Models[i].Model, req, res);
                });
                app.get('/' + Routes.Models[i].Names.Plural + '/sort-limt' + '/:field' + '/:limit' + '/:type', function(req, res){
                    rules.sortLimit(Routes.Models[i].Model, req, res);
                });


                /**
                * Implementar paginação
                * Onde definir items por página?
                * Exemplo: /products/page/1
                */

                 /**
                * Implementar beetween
                * Exemplo: /products/search/price/between/10/20
                */

                 /**
                * Implementar delete multiplos
                * Exemplo: /products/delete/1,2,3,4
                */

                /**
                * Implementar count
                * Retorna o numero de registros
                * Exemplo: /products/count
                */

                /**
                * Implementar max
                * Retorna o maior
                * Exemplo: /products/price/max
                */

                /**
                * Implementar min
                * Retorna o min
                * Exemplo: /products/price/min
                */

                /**
                * Implementar sum
                * Retorna o somatorio
                * Exemplo: /products/price/sum
                */

                /**
                * Implementar avg
                * Retorna a media
                * Exemplo: /products/price/avg
                */

                /**
                * Implementar os anteriores (avg, sum, min, max, count) com condições
                * Exemplo: /products/sum/between/10/20
                * Exemplo: /products/sum/biggerthen/30
                * Exemplo: /products/sum/lessthan/20
                */

                /**
                * Implementar exclusão lógica
                * Não deleta o registro de fato, apenas seta uma flag: removed = true
                */

                /**
                 * Onde podemos personalizar as mensagens de erro se um campo não for preenchido corretamente?
                 */

                /**
                 * Sistema de autenticação:
                 * Onde podemos definir quais destas rotas vão poder ser acessadas
                 * por todos usuários ou não.
                 */
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