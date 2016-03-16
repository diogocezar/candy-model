var Debug = {
    DebugMode : true,
    log  : function(msg){
        if(this.DebugMode)
            console.log("[Candy LOG] " + msg);
    },
    error : function(msg){
        if(this.DebugMode)
            console.error("[Candy ERROR] " + msg);
    }
};

module.exports = Debug;