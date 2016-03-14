define([], function() {
    'use strict';
var APISvc = function(){
    var url='http://developers.agenciaideias.com.br/tempo/json/';

    var service = {

        getCidade: getCidade
    }

    return service;

    function getCidade() {
        return url + '';
    }
};

APISvc.$inject = [];

return APISvc;
});
