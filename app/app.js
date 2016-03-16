angular.module('myApp',[])
.controller('WeatherCtrl', ['$cacheFactory', '$timeout', '$http', function($cacheFactory, $timeout, $http){

    var vm = this;

    vm.cache = window.localStorage;
    vm.general = false;
    vm.praia = false;
    vm.bomPraia;
    vm.ruimPraia;
    vm.previsoes;
    vm.grafico = {};
    vm.grafico.legenda = [];
    vm.grafico.maxima = [];
    vm.grafico.minima = [];
    vm.agora;
    vm.cidade = {};

    vm.getEstados = function(){
      $http.get('app/estados.json').success(function(data) {
       vm.estados = data;
       getCidade();
    })};


    vm.buscar =  function () {
        fetchData();
        vm.local;
    }

    function getCidade() {
      $http.get('app/cidades.json').success(function(data) {
       vm.cidades = data;
       getCache();
       vm.buscar();
    })};

    function fetchData() {
      $http.get('http://developers.agenciaideias.com.br/tempo/json/' + vm.selectedCidade.value + '-' +vm.selectedEstado.value)
        .then(function(response){
            cidade = response.data.cidade;
            agora = response.data.agora;
            previsoes = response.data.previsoes;
            agora.temperatura_max = previsoes[0].temperatura_max;
            agora.temperatura_min = previsoes[0].temperatura_min;
            vm.agora = agora;
            vm.previsoes = previsoes;
            vm.general = true;
            vm.local = vm.selectedCidade.value + '-' +vm.selectedEstado.value;

            //reset array cada search
            vm.grafico.legenda = [];
            vm.grafico.maxima = [];
            vm.grafico.minima = [];
            for(i = 0; i < previsoes.length; i++){
              vm.grafico.legenda.push(previsoes[i].data.substring(0,3));
              vm.grafico.maxima.push(parseInt(previsoes[i].temperatura_max));
              vm.grafico.minima.push(parseInt(previsoes[i].temperatura_min));
            }

            //se a ultima previsao for sexta nao analisa final de semana
            vm.praia = false;
            if(previsoes[4].data.indexOf("Sexta")>-1){
              vm.praia = false;
            }
            else{
              for(i = 0; i < previsoes.length; i++){
                diaSemana = previsoes[i].data; //descricao da semana
                descTempo = previsoes[i].descricao; //descricao do tempo Bom,Nublado
                max = previsoes[i].temperatura_max; //maxima do dia
                min = previsoes[i].temperatura_min; //minima do dia

                if((diaSemana.indexOf("bado")>-1) || (diaSemana.indexOf("mingo")>-1)) //sabado ou domingo
                  if(descTempo.indexOf("Bom")>-1)
                    if(min > 25 || max > 29)
                      vm.praia = true;
              }
            }

            //solzinho da maior temperatura :)
            arr = vm.grafico.maxima;
            var i = arr.indexOf(Math.max.apply(Math, arr));
            //previsao com a maior temperatura
            vm.maximatemperatura = arr[i];

            vm.dataMaiorTemp = previsoes[i].data;
            vm.grafico.maxima[i] = {y: arr[i],
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                }
            };

            //neve no dia mais frio :)
            arr = vm.grafico.minima;
            var i = arr.indexOf(Math.min.apply(Math, arr));
            //previsao com a menor temperatura
            vm.minimatemperatura = arr[i];
            vm.dataMenorTemp = previsoes[i].data;
            vm.grafico.minima[i] = {y: arr[i],
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                }
            };

            //remove a primeira previsao
            vm.previsoes.splice(0,1);

            vm.plotGrafico();

            //mensagem dependendo das condições do tempo
            if(vm.praia)
              vm.bomPraia = "Oba! Vai dar praia!";
            else
              vm.ruimPraia = "Ah, que pena! Parece que não teremos tempo bom";
        });

    }

    function getCacheEstado() {
      if (vm.cache.getItem("selectedEstado") === null)
        vm.selectedEstado = vm.estados[23]; //define santa catarina default
      else
        vm.selectedEstado = JSON.parse(vm.cache.getItem("selectedEstado"));
    };
    function setCacheEstado(){
      vm.cache.setItem('selectedEstado',JSON.stringify(vm.selectedEstado));
    };

    function getCacheCidade(){
      if (vm.cache.getItem("selectedCidade") === null)
        vm.selectedCidade = vm.cidades[4448]; //define blumenau default
      else
        vm.selectedCidade = JSON.parse(vm.cache.getItem("selectedCidade"));
    };
    function setCacheCidade(){
      vm.cache.setItem('selectedCidade',JSON.stringify(vm.selectedCidade));
    };

    vm.setCache = function() {
      setCacheEstado();
      setCacheCidade();
    };

    function getCache() {
      getCacheEstado();
      getCacheCidade();
    };

    $timeout(function() {
        vm.getEstados();
    });

    //chart
    vm.plotGrafico = function(){
        $timeout(function() {
      options = {
            chart: {
                renderTo: 'chart',
                type: 'spline',
        spacingRight: 0,
        spacingBottom: 3,
        spacingLeft: 0
            },
            credits: {
        enabled: false
    },
            title: {
                text: 'Variação de temperatura'
            },
            xAxis: {
                categories: vm.grafico.legenda
            },
            yAxis: {
              min : vm.minimatemperatura * 0.9,
              max : vm.maximatemperatura * 1.1,
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
                name: 'Máximas',
                marker: {
                    symbol: 'square'
                },
                data: vm.grafico.maxima

            }, {
                name: 'Mínimas',
                marker: {
                    symbol: 'diamond'
                },
                data: vm.grafico.minima
            }]
        };
    chart1 = new Highcharts.Chart(options);
    console.log(chart1.renderTo);
});
};


}]);
