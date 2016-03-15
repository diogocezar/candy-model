module.exports.Debug = {
    Mode : true,
    log  : function(msg){
        if(this.Mode)
            console.log("[Candy LOG] " + msg);
    },
    error : function(msg){
        if(this.Mode)
            console.error("[Candy ERROR] " + msg);
    }
};