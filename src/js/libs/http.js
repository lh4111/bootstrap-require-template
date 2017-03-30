define([
    'require'
], function(require, factory) {
    'use strict';

    var peerid = $.cookie('peerid') || '',
        sessionid = $.cookie('sessionid') || ''

    var base_url = 'http://192.168.3.110:16810/'

    $.ajaxSetup({
        data: {
            peerid: peerid,
            sessionid: sessionid
        },
        dataType: 'json'
    });

    if(!peerid){
        $.get(base_url + 'common/peerid',{ clienttype:'admin' }).done( function(data){
            console.log(typeof data)
            if(data.errcode === '0'){
                $.cookie('peerid',data.peerid, {path: '/'})
            }
        }).fail( function(err){
            console.log(err)
        })
    }



    return {
        common: {
            peerid: function(){
                return $.get(base_url + 'common/peerid',{ clienttype:'admin' })
            }
        }
    }
    
});