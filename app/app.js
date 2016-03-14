angular.module('myApp',[])
.controller('WeatherCtrl', ['$cacheFactory', '$timeout', '$http', function($cacheFactory, $timeout, $http){
    var vm = this;

    vm.cache = window.localStorage;

    vm.buscar = function() {
        fetchData();
    }

    function fetchData() {
        $http.get('http://developers.agenciaideias.com.br/tempo/json/' + vm.selectedCidade.value + '-' +vm.selectedEstado.value)
        .then(function(data){
            console.log(data);
        });
    }

    vm.estados = [
      {"value":"SC","display":"Santa Catarina"},
      {"value":"PR","display":"Paraná"},
      {"value":"AP","display":"Amapá"},
      {"value":"SP","display":"São Paulo"},
      {"value":"BA","display":"Bahia"}
    ];


    vm.cidades = [
      {"value":"Timbó","estado":"SC"},
      {"value":"Blumenau","estado":"SC"},
      {"value":"Pomerode","estado":"SC"},
      {"value":"Jaraguá","estado":"SC"},
      {"value":"Curitiba","estado":"PR"},
      {"value":"Macapá","estado":"AP"},
      {"value":"Sorocaba","estado":"SP"},
      {"value":"Salvador","estado":"BA"}
    ];

    vm.getCacheEstado = function (){
      if (vm.cache.getItem("selectedEstado") === null)
        vm.selectedEstado = vm.estados[0];
      else
        vm.selectedEstado = JSON.parse(vm.cache.getItem("selectedEstado"));
        console.log("getCacheEstado");
        console.log(vm.selectedEstado);
    };
    vm.setCacheEstado = function (){
      vm.cache.setItem('selectedEstado',JSON.stringify(vm.selectedEstado));
      console.log("setCacheEstado");
      console.log(vm.selectedEstado);
    };

    vm.getCacheCidade = function (){
      if (vm.cache.getItem("selectedCidade") === null)
        vm.selectedCidade = vm.cidades[1];
      else
        vm.selectedCidade = JSON.parse(vm.cache.getItem("selectedCidade"));
        console.log("getCacheCidade");
        console.log(vm.selectedCidade );
    };
    vm.setCacheCidade = function (){
      vm.cache.setItem('selectedCidade',JSON.stringify(vm.selectedCidade));
      console.log("setCacheCidade");
      console.log(vm.selectedCidade);
    };

    vm.setCache = function (){

      console.log("entrou cache");
      vm.setCacheEstado();
      vm.setCacheCidade();
      vm.setCacheCidade();
    };

    vm.getCache = function (){
      vm.getCacheEstado();
      vm.getCacheCidade();
    };


    $timeout(function() {
        vm.getCache();
    });



    //chart

    $('#chart').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Variação de temperatura'
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperatura'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            //name: 'Tokyo',
            name: 'Máximas',
            marker: {
                symbol: 'square'
            },
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                y: 26.5,
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                }
            }, 23.3, 18.3, 13.9, 9.6]

        }, {
            name: 'Mínimas',
            //name: 'London',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 3.9,
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                }
            }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
    //vm.teste = 'aosidoasjduio';

        // vm.cache = $cacheFactory('myCache');


        //vm.cache.removeAll();
        //vm.cache.destroy();
        //vm.cache.get('selectedEstado',vm.estados[0]);
        //vm.cache.get('selectedCidade',vm.cidades[1]);


         //vm.selectedEstado = vm.estados[1];
        //vm.selectedCidade = vm.cidades[2];
}]);
