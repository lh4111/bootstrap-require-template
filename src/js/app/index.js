define(function(require) {
    var http = require('http')

    http.common.peerid().done( function(data){
        console.log(data)
    }).fail( function(err){
        console.log(err)
    })
});