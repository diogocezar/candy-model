var Candy = {
    Modules : {
        Mongoose : null,
        Express  : null,
        SocketIO : null,
        Path     : null,
        Http     : null,
    },
    Configs : {
        DataBase     : null,
        Environments : null
    },
    App    : null,
    Server : null,
    Routes : null,
    Rules  : null,
    Debug  : null,
    init: function(){
        Candy.Modules.SocketIO = require('socket.io');
        Candy.Modules.Express  = require('express');
        Candy.Modules.Mongoose = require('mongoose');
        Candy.Modules.Path     = require('path');
        Candy.Modules.Http     = require('http');
        
        Candy.Configs.DataBase     = require('./configs/DataBase');
        Candy.Configs.Environments = require('./configs/Environments');
        
        Candy.App   = Candy.Modules.Express();
        
        Candy.Debug = require('./app/debug/Debug');
        Candy.Rules = require('./app/rules/Rules');
        
        Candy.setEnvironments(Candy.App);
        Candy.setRoutes(Candy.App, Candy.Routes, Candy.Rules);
        Candy.startServer(Candy.Server, Candy.App);
    },
    setEnvironments: function(app){
        app.set('port', process.env.PORT || Candy.Configs.Environments.Port);
        app.set('views', Candy.Modules.Path.join(__dirname, './app/views'));
        app.set('view engine', 'ejs');
    },
    setRoutes: function(app, routes, rules){
        routes = require('./app/routes/Routes')(app, rules);
    },
    startServer: function(server, app){
        server = Candy.Modules.Http.createServer(app);
        server.listen(app.get('port'), function(){
            Candy.Debug.log("Express server listening on port " + app.get('port'));
        });
    }
};

Candy.init();