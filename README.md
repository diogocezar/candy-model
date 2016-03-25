# Candy Model


O padrão MVC tornou-se quase que uma convenção para desenvolvimento web.

O Candy Model é um projeto experimental que busca criar um modelo para a criação de websites utilizando NodeJS e o banco de dados MongoDB.

Nossa proposta é simples, automatizar uma serie de funcionalidades que seriam comuns a todas as controllers de um sistema.

Todos os dias temos que escrever e re-escrever muita coisa semelhante, em controllers diferentes, como por exemplo:

```js
Products{
    save(){}
    delete(){}
    search(){}
}
Users{
    save(){}
    delete(){}
    search(){}
}
```

A proposta deste modelo é criar um *middleware* que automatize este processo.

Para isso, propomos:

1. Criar uma coleção de models:

```js
var Collection = {
    Models : [],
    init: function(mongoose){
        Collection.Models.push(require('../models/ProductModel')(mongoose));
        Collection.Models.push(require('../models/UserModel')(mongoose));
        return Collection.Models;
    }
}
```

Uma model está definida como:

```js
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
```

2. Criar um esquema dinâmico na definição das rotas:

```js
Routes.Models = require('../models/CollectionModels')(mongoose);
for(var i=0; i<Routes.Models.length; i++){
    (function(i){
        app.get('/' + Routes.Models[i].Names.Plural, function(req, res){
            rules.find(Routes.Models[i].Model, req, res);
        });
    }
}
```

3. Centralizar todas as funcionalidades em uma controller de Regras:


```js
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
}
```

Desta forma, nós conseguimos um modelo que estaria pronto e funcional para trabalhar com vários CRUDS sem a necessidade de replicação das mesmas funcionalidades.

Claro que, regras de negócios específicas ainda poderiam/deveriam estar em suas devidas controllers. Neste modelo, ainda não estão implmentadas as controllers, mas é um projeto futuro.

Além disso, uma pequea interface de *Front-End* está implementada para testar algumas das funcionalidades já implementadas.

Para entender todas as funcionalidades e ideias dê uma olhada no arquivo *Routes.js*

Este modelo utiliza as tecnologias:

1. Mongoose;
2. Express;
3. Body Parser;

Caso queira clonar e executar o projeto:

1. ./start_database.sh
2.
```js
node Candy.js
```

3. Acesse /public

Toda ajuda é bem vinda.

Obrigado.