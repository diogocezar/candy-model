var Debug = {
    DebugMode : true,
    log  : function(msg){
        if(this.Mode)
            console.log("[Candy LOG] " + msg);
    },
    error : function(msg){
        if(this.Mode)
            console.error("[Candy ERROR] " + msg);
    }
};

module.exports(Debug);