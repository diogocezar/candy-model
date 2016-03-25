# Candy Model


O padrão MVC tornou-se quase que uma convenção para desenvolvimento web.

O Candy Model é um projeto experimental que busca criar um modelo para a criação de websites utilizando NodeJS e o banco de dados MongoDB.

Nossa proposta é simples, automatizar uma serie de funcionalidades que seriam comum a todas as controllers do nosso sistema.

Utilizando a ideia de reutilização, todos os dias temos que escrever muita coisa semelhante em controllers diferentes, por exemplo:

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

A proposta deste modelo é criar um middleware que automatiza este processo.

Para isso tivemos que:

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
...
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
    ...
}
```

Desta forma, nós conseguimos um modelo que estaria pronto e funcional para trabalhar com vários CRUDS sem a necessidade de replicação das mesmas funcionalidades.

Além disso, uma pequea interface de Front-End está implementada para testar algumas das funcionalidades já implementadas.

Para entender todas as funcionalidades e ideias dê uma olhada no arquivo Routes.json

Este modelo utiliza as tecnologias:

1. Mongoose;
2. Express;
3. Body Parser;

Caso queira clonar o projeto:

1. ./start_database.sh
2. Execute

```js
node Candy.js
```

3. Acesse /public

Toda ajuda é bem vinda.

Obrigado.