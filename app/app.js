angular.module('myApp',[])
.controller('WeatherCtrl', ['$cacheFactory', function($cacheFactory){
    var vm = this;

    vm.cache = window.localStorage;


    vm.estados = [
      {"value":"SC","display":"Santa Catarina"},
      {"value":"PR","display":"Paraná"},
      {"value":"AP","display":"Amapá"}
    ];


    vm.cidades = [
      {"value":"Timbó","estado":"SC"},
      {"value":"Blumenau","estado":"SC"},
      {"value":"Curitiba","estado":"PR"},
      {"value":"Macapá","estado":"AP"}
    ];

    // vm.cache = $cacheFactory('myCache');


    //vm.cache.removeAll();
    //vm.cache.destroy();
    //vm.cache.get('selectedEstado',vm.estados[0]);
    //vm.cache.get('selectedCidade',vm.cidades[1]);


     //vm.selectedEstado = vm.estados[1];
    //vm.selectedCidade = vm.cidades[2];

    vm.getCacheEstado = function (){
      if (vm.cache.getItem("selectedEstado") === null)
        vm.selectedEstado = vm.estados[0];
      else
        vm.selectedEstado = JSON.parse(vm.cache.getItem("selectedEstado"));
        console.log("getCacheEstado");
        console.log(vm.selectedEstado );
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

    vm.getCache();


    /*
    vm.clearAllCache = function (){
      vm.selectedEstado = null;
      vm.selectedCidade = null;
    };

    vm.getDefaultCidade = function (){
      console.log('getDefaultCidade');
      vm.selectedEstado = vm.cache.get("selectedEstado");
      vm.selectedCidade = vm.cache.get("selectedCidade");
      console.log(vm.selectedCidade);
      console.log(vm.selectedEstado);
    };

    vm.setDefaultCidade = function (){
      console.log('setDefaultCidade');

      if (vm.cache.get("selectedCidade") === undefined) {
        value = vm.cidades[1]; //blumenau
        vm.cache.get("selectedCidade", value === undefined ? null : value);
      }else{
        value = vm.selectedCidade; //selecionado
        vm.cache.get("selectedCidade", value === undefined ? null : value);
      }

      if (vm.cache.get("selectedEstado") === undefined) {
        value = vm.estados[0]; //santa catarina
        vm.cache.get("selectedEstado", value === undefined ? null : value);
      }else{
        value = vm.selectedEstado; //selecionado
        vm.cache.get("selectedEstado", value === undefined ? null : value);
      }
      console.log('selectedCidade' + vm.selectedCidade);
      vm.getDefaultCidade();
    };

     vm.setDefaultCidade();*/
    // vm.selectedEstado = "SC";
    // vm.selectedCidade = vm.cidades[1];
    //
    // function saveDefault(){
    //
    // };

    // vm.estados = [
    //   {id:1,name:'Acre', value:'acre'},
    //   {id:2,name:'Alagoas', value:'alagoas'},
    //   {id:3,name:'Amapá', value: 'amapa'},
    //   {id:4,name:'Amazonas',value:'amazonas'},
    //   {id:5,name:'Santa Catarina',value:'santaCatarina'},
    //   {id:6,name:'Paraná', value:'parana'}
    // ];

    // vm.cidades = [
    //   {id:1,ide:5,name:'Pomerode',value:'pomerode',estado: '5'},
    //   {id:2,ide:5,name:'Ascurra',value:'ascurra',estado: '5'},
    //   {id:3,ide:5,name:'Blumenau',value:'blumenau',estado: '5'},
    //   {id:4,ide:5,name:'Timbó',value:'timbo',estado: '5'},
    //   {id:5,ide:6,name:'Curitiba',value:'curitiba',estado: '6'},
    //   {id:6,ide:6,name:'Marmeleiro',value:'marmeleiro',estado: '6'}
    // ];


    // console.log(this.estados);
    // console.log("selecionado:" + this.selectedEstado);
    //vm.teste = 'aosidoasjduio';

    // Highcharts.chart('chart', {
    //
		// 		    xAxis: {
		// 		        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		// 		            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		// 		    },
    //
		// 		    series: [{
		// 		        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
		// 		    }]
		// 		});

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



}]);
