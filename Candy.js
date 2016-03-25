var Candy = {
    Modules : {
        Mongoose   : null,
        Express    : null,
        Path       : null,
        Http       : null,
        BodyParser : null
    },
    Configs : {
        DataBase     : null,
        Environments : null
    },
    App    : null,
    Server : null,
    Routes : null,
    Rules  : null,
    init: function(){
        Candy.Modules.Express    = require('express');
        Candy.Modules.Mongoose   = require('mongoose');
        Candy.Modules.Path       = require('path');
        Candy.Modules.Http       = require('http');
        Candy.Modules.BodyParser = require("body-parser");

        Candy.Configs.DataBase     = require('./configs/DataBase');
        Candy.Configs.Environments = require('./configs/Environments');

        Candy.App   = Candy.Modules.Express();

        Candy.Debug = require('./app/debug/Debug');
        Candy.Rules = require('./app/rules/Rules');

        Candy.setEnvironments(Candy.App);
        Candy.startServer(Candy.Server, Candy.App);
        Candy.setRoutes(Candy.App, Candy.Routes, Candy.Rules, Candy.Modules.Mongoose);
        Candy.startMongo(Candy.Modules.Mongoose);
    },
    setEnvironments: function(app){
        Candy.Debug.log("Configurating Express Environments.");
        app.set('port', process.env.PORT || Candy.Configs.Environments.Port);
        app.set('views', Candy.Modules.Path.join(__dirname, './app/views'));
        app.set('view engine', 'ejs');
    },
    setRoutes: function(app, routes, rules, mongoose){
        Candy.Debug.log("Setting Routes.");
        routes = require('./app/routes/Routes')(app, rules, mongoose);
    },
    startServer: function(server, app){
        Candy.Debug.log("Starting Express Server.");
        server = Candy.Modules.Http.createServer(app);
        server.listen(app.get('port'), function(){
            Candy.Debug.log("Express Server listening on Port: " + app.get('port'));
        });
        app.use(Candy.Modules.BodyParser.json());
        app.use(Candy.Modules.BodyParser.urlencoded({extended: true}));
        app.use('/public', Candy.Modules.Express.static('public'));
    },
    startMongo: function(mongoose){
        Candy.Debug.log("Starting MongoDB Connection.");
        Candy.Modules.Mongoose.connect(Candy.Configs.DataBase.DataBaseURI);
    }
};

Candy.init();