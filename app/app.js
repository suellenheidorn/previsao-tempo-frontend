angular.module('myApp',[])
.controller('WeatherCtrl', ['$cacheFactory', '$timeout', '$http', function($cacheFactory, $timeout, $http){
    var vm = this;



    vm.cache = window.localStorage;

    vm.general = false;

    vm.buscar = function() {
        fetchData();
        //vm.general = true;
    }
    vm.previsoes;
    vm.grafico = {};
    vm.grafico.legenda = [];
    vm.grafico.maxima = [];
    vm.grafico.minima = [];
    console.log(vm.grafico);
    vm.agora;
    vm.cidade = {};

    function fetchData() {
        $http.get('http://developers.agenciaideias.com.br/tempo/json/' + vm.selectedCidade.value + '-' +vm.selectedEstado.value)
        .then(function(response){
            //console.log(data);
            cidade = response.data.cidade;
            agora = response.data.agora;
            previsoes = response.data.previsoes;
            agora.temperatura_max = previsoes[0].temperatura_max;
            agora.temperatura_min = previsoes[0].temperatura_min;
            vm.agora = agora;
            vm.previsoes = previsoes;
            //
            vm.general = true;
            console.log(vm.grafico);
            for(i = 0; i < previsoes.length; i++){
              vm.grafico.legenda.push(previsoes[i].data.substring(0,3));
              vm.grafico.maxima.push(parseInt(previsoes[i].temperatura_max));
              vm.grafico.minima.push(parseInt(previsoes[i].temperatura_min));
            }

            //frufru 1
            arr = vm.grafico.maxima;
            var i = arr.indexOf(Math.max.apply(Math, arr));
            //previsoes[i] = previsao com a maior temperatura
            vm.grafico.maxima[i] = {y: vm.grafico.maxima[i],
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                }
            };

            //frufru2
            arr = vm.grafico.minima;
            var i = arr.indexOf(Math.min.apply(Math, arr));
            //previsoes[i] = previsao com a menor temperatura
            vm.grafico.minima[i] = {y: vm.grafico.minima[i],
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                }
            };

            //remove a primeira previsao
            vm.previsoes.splice(0,1);

            console.log(vm.grafico);
            console.log('maior' + i);
            // vm.previsao = function(previsoes) {
            //   return previsoes;
            // }
            vm.plotGrafico();


            //
            // vm.estados.value = response.data.cidade;
            // vm.dataHora = response.data.agora.data_hora;
            // vm.descricao = response.data.agora.descricao;
            // vm.temperatura = response.data.agora.temperatura;
            // vm.umidade = response.data.agora.umidade;
            // vm.visibilidade = response.data.agora.visibilidade;
            // vm.ventoVelocidade = response.data.agora.vento_velocidade;
            // vm.ventoDirecao = response.data.agora.vento_direcao;
            // vm.pressao = response.data.agora.pressao;
            // vm.pressaoStatus = response.data.agora.pressao_status;
            // vm.temperaturaMaxima = response.data.previsoes[0].temperatura_max;
            // vm.temperaturaMinima = response.data.previsoes[0].temperatura_min;
            // //terça-feira
            // vm.dataTerca = response.data.previsoes[1].data;
            // vm.descricaoTerca = response.data.previsoes[1].descricao;
            // vm.temperaturaMaximaTerca = response.data.previsoes[1].temperatura_max;
            // vm.temperaturaMinimaTerca = response.data.previsoes[1].temperatura_min;

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
        vm.buscar();
    });



    //chart

    vm.plotGrafico = function(){$('#chart').highcharts({
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
            categories: vm.grafico.legenda
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
            data: vm.grafico.maxima
            //     y: 26.5,
            //     marker: {
            //         symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
            //     }
            // }, 23.3, 18.3, 13.9, 9.6]

        }, {
            name: 'Mínimas',
            name: 'London',
            marker: {
                symbol: 'diamond'
            },
            data: vm.grafico.minima
            // [{
            //     y: 3.9,
            //     marker: {
            //         symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
            //     }
            // }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    })};
    //vm.teste = 'aosidoasjduio';

        // vm.cache = $cacheFactory('myCache');


        //vm.cache.removeAll();
        //vm.cache.destroy();
        //vm.cache.get('selectedEstado',vm.estados[0]);
        //vm.cache.get('selectedCidade',vm.cidades[1]);


         //vm.selectedEstado = vm.estados[1];
        //vm.selectedCidade = vm.cidades[2];
}]);
