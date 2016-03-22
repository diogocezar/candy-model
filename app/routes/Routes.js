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
                    rules.save(req.body.Schema, Routes.Models[i].Model, req, res);
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

                /**
                 * Como nós resgataremos os dados da requisição e montaremos o schema?
                 */

                /**
                * Implementar search
                * Rota que retorna um model baseado se algum campo possui determinado valor
                * Exemplo: /products/search/price/eq/30
                * Exemplo: /products/search/price/gt/30
                * Exemplo: /products/search/price/lt/30
                */
                app.post('/' + Routes.Models[i].Names.Plural + '/search' + '/:field' + '/:operator' + ':value', function(req, res){
                    rules.search(Routes.Models[i].Model, req, res);
                });

                /**
                * Implementar first
                * Retorna os n primeiros itens
                * Exemplo: /products/first/10
                */

                /**
                * Implementar last
                * Retorna os n últimos itens
                * Exemplo: /products/last/10
                */

                /**
                * Implementar paginação
                * Onde definir items por página?
                * Exemplo: /products/page/1
                */

                /**
                * Implementar relacionamentos 1-n ???
                * Como podemos retornar os objetos?
                */

                /**
                * Implementar relacionamentos n-n ???
                * Como podemos retornar os objetos?
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