angular.module('myApp',[])
.controller('WeatherCtrl', ['$cacheFactory', '$timeout', '$http', function($cacheFactory, $timeout, $http){
    var vm = this;



    vm.cache = window.localStorage;

    vm.general = false;
    vm.praia = false;
    vm.bomPraia;
    vm.ruimPraia;

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
            //previsao com a maior temperatura
            vm.maximatemperatura = previsoes[i].temperatura_max;
            vm.dataMaiorTemp = previsoes[i].data;
            //console.log(previsoes[i].temperatura_max);
            vm.grafico.maxima[i] = {y: vm.grafico.maxima[i],
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                }
            };

            //frufru2
            arr = vm.grafico.minima;
            var i = arr.indexOf(Math.min.apply(Math, arr));
            //previsao com a menor temperatura
            vm.minimatemperatura = previsoes[i].temperatura_min;
            vm.dataMenorTemp = previsoes[i].data;
            //console.log(previsoes[i].temperatura_min);
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

            if(vm.grafico.minima || vm.grafico.maxima > 25){// && previsoes[i].descricao =
                console.log("vai dar praia");
                vm.praia = true;
                vm.bomPraia = "Oba! Vai dar praia!";
            }else{
                vm.ruimPraia = "Ah, que pena! Parece que vai chover!"
            }


        });

    }

    vm.estados = [
      {"value":"SC","display":"Santa Catarina"},
      {"value":"PR","display":"Paraná"},
      {"value":"AP","display":"Amapá"},
      {"value":"SP","display":"São Paulo"},
      {"value":"BA","display":"Bahia"},
      {"value":"AC","display":"Acre"},
      {"value":"AL","display":"Alagoas"},
      {"value":"AM","display":"Amazonas"},
      {"value":"CE","display":"Ceará"},
      {"value":"ES","display":"Espírito Santo"},
      {"value":"MA","display":"Maranhão"},
      {"value":"DF","display":"Distrito Federal"},
      {"value":"GO","display":"Goiás"},
      {"value":"PB","display":"Paraíba"},
      {"value":"MG","display":"Minas Gerais"},
      {"value":"MT","display":"Mato Grosso"},
      {"value":"MS","display":"Mato Grosso do Sul"},
      {"value":"PA","display":"Pará"},
      {"value":"PE","display":"Pernambuco"},
      {"value":"RN","display":"Rio Grande do Norte"},
      {"value":"RS","display":"Rio Grande do Sul"},
      {"value":"PI","display":"Piauí"},
      {"value":"RR","display":"Roraima"},
      {"value":"RO","display":"Rondônia"},
      {"value":"RJ","display":"Rio de Janeiro"},
      {"value":"SE","display":"Sergipe"},
      {"value":"TO","display":"Tocantins"}
    ];


    vm.cidades = [
      {"value":"Timbó","estado":"SC"},
      {"value":"Blumenau","estado":"SC"},
      {"value":"Pomerode","estado":"SC"},
      {"value":"Jaraguá","estado":"SC"},
      {"value":"Abdon Batista","estado":"SC"},
      {"value":"Abelardo Luz","estado":"SC"},
      {"value":"Agrolandia","estado":"SC"},
      {"value":"Agronomica","estado":"SC"},
      {"value":"Agua Doce","estado":"SC"},
      {"value":"Aguas Frias","estado":"SC"},
      {"value":"Aguas Mornas","estado":"SC"},
      {"value":"Aguas de Chapeco","estado":"SC"},
      {"value":"Alfredo Wagner","estado":"SC"},
      {"value":"Alto Bela Vista","estado":"SC"},
      {"value":"Anchieta","estado":"SC"},
      {"value":"Angelina","estado":"SC"},
      {"value":"Anita Garibaldi","estado":"SC"},
      {"value":"Anitapolis","estado":"SC"},
      {"value":"Antonio Carlos","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Arabuta","estado":"SC"},
      {"value":"Araquari","estado":"SC"},
      {"value":"Ararangua","estado":"SC"},
      {"value":"Armazem","estado":"SC"},
      {"value":"Arroio Trinta","estado":"SC"},
      {"value":"Arvoredo","estado":"SC"},
      {"value":"Ascurra","estado":"SC"},
      {"value":"Atalanta","estado":"SC"},
      {"value":"Aurora","estado":"SC"},
      {"value":"Balneario Arroio do Silva","estado":"SC"},
      {"value":"Balneario Barra do Sul","estado":"SC"},
      {"value":"Balneario Camboriu","estado":"SC"},
      {"value":"Balneario Gaivota","estado":"SC"},
      {"value":"Bandeirante","estado":"SC"},
      {"value":"Barra Bonita","estado":"SC"},
      {"value":"Barra Velha","estado":"SC"},
      {"value":"Bela Vista do Toldo","estado":"SC"},
      {"value":"Belmonte","estado":"SC"},
      {"value":"Benedito Novo","estado":"SC"},
      {"value":"Biguacu","estado":"SC"},
      {"value":"Bocaina do Sul","estado":"SC"},
      {"value":"Bom Jardim da Serra","estado":"SC"},
      {"value":"Bom Jesus do Oeste","estado":"SC"},
      {"value":"Bom Jesus","estado":"SC"},
      {"value":"Bom Retiro","estado":"SC"},
      {"value":"Bombinhas","estado":"SC"},
      {"value":"Botuvera","estado":"SC"},
      {"value":"Braco do Norte","estado":"SC"},
      {"value":"Braco do Trombudo","estado":"SC"},
      {"value":"Brunopolis","estado":"SC"},
      {"value":"Brusque","estado":"SC"},
      {"value":"Cacador","estado":"SC"},
      {"value":"Caibi","estado":"SC"},
      {"value":"Calmon","estado":"SC"},
      {"value":"Camboriu","estado":"SC"},
      {"value":"Campo Alegre","estado":"SC"},
      {"value":"Campo Belo do Sul","estado":"SC"},
      {"value":"Campo Ere","estado":"SC"},
      {"value":"Campos Novos","estado":"SC"},
      {"value":"Canelinha","estado":"SC"},
      {"value":"Canoinhas","estado":"SC"},
      {"value":"Capao Alto","estado":"SC"},
      {"value":"Capinzal","estado":"SC"},
      {"value":"Capivari de Baixo","estado":"SC"},
      {"value":"Catanduvas","estado":"SC"},
      {"value":"Caxambu do Sul","estado":"SC"},
      {"value":"Celso Ramos","estado":"SC"},
      {"value":"Cerro Negro","estado":"SC"},
      {"value":"Chapadao do Lageado","estado":"SC"},
      {"value":"Chapeco","estado":"SC"},
      {"value":"Cocal do Sul","estado":"SC"},
      {"value":"Concordia","estado":"SC"},
      {"value":"Cordilheira Alta","estado":"SC"},
      {"value":"Coronel Freitas","estado":"SC"},
      {"value":"Coronel Martins","estado":"SC"},
      {"value":"Correia Pinto","estado":"SC"},
      {"value":"Corupa","estado":"SC"},
      {"value":"Criciuma","estado":"SC"},
      {"value":"Cunha Pora","estado":"SC"},
      {"value":"Cunhatai","estado":"SC"},
      {"value":"Curitibanos","estado":"SC"},
      {"value":"Descanso","estado":"SC"},
      {"value":"Dionisio Cerqueira","estado":"SC"},
      {"value":"Dona Emma","estado":"SC"},
      {"value":"Doutor Pedrinho","estado":"SC"},
      {"value":"Entre Rios","estado":"SC"},
      {"value":"Ermo","estado":"SC"},
      {"value":"Erval Velho","estado":"SC"},
      {"value":"Faxinal dos Guedes","estado":"SC"},
      {"value":"Flor do Sertao","estado":"SC"},
      {"value":"Florianopolis","estado":"SC"},
      {"value":"Formosa do Sul","estado":"SC"},
      {"value":"Forquilhinha","estado":"SC"},
      {"value":"Fraiburgo","estado":"SC"},
      {"value":"Frei Rogerio","estado":"SC"},
      {"value":"Galvao","estado":"SC"},
      {"value":"Garopaba","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Apiuna","estado":"SC"},
      {"value":"Curitiba","estado":"PR"},
      {"value":"Macapá","estado":"AP"},
      {"value":"Sorocaba","estado":"SP"},
      {"value":"Salvador","estado":"BA"},
      {"value":"São Paulo","estado":"SP"}
    ];
// Garuva
// Gaspar
// Governador Celso Ramos
// Grao Para
// Gravatal
// Guabiruba
// Guaraciaba
// Guaramirim
// Guaruja do Sul
// Guatambu
// Herval d'Oeste
// Ibiam
// Ibicare
// Ibirama
// Icara
// Ilhota
// Imarui
// Imbituba
// Imbuia
// Indaial
// Iomere
// Ipira
// Ipora do Oeste
// Ipuacu
// Ipumirim
// Iraceminha
// Irani
// Irati
// Irineopolis
// Ita
// Itaiopolis
// Itajai
// Itapema
// Itapiranga
// Itapoa
// Ituporanga
// Jabora
// Jacinto Machado
// Jaguaruna
// Jaragua do Sul
// Jardinopolis
// Joacaba
// Joinville
// Jose Boiteux
// Jupia
// Lacerdopolis
// Lages
// Laguna
// Lajeado Grande
// Laurentino
// Lauro Muller
// Lebon Regis
// Leoberto Leal
// Lindoia do Sul
// Lontras
// Luiz Alves
// Luzerna
// Macieira
// Mafra
// Major Gercino
// Major Vieira
// Maracaja
// Maravilha
// Marema
// Massaranduba
// Matos Costa
// Meleiro
// Mirim Doce
// Modelo
// Mondai
// Monte Carlo
// Monte Castelo
// Morro Grande
// Morro da Fumaca
// Navegantes
// Nova Erechim
// Nova Itaberaba
// Nova Trento
// Nova Veneza
// Novo Horizonte
// Orleans
// Otacilio Costa
// Ouro Verde
// Ouro
// Paial
// Painel
// Palhoca
// Palma Sola
// Palmeira
// Palmitos
// Papanduva
// Paraiso
// Passo de Torres
// Passos Maia
// Paulo Lopes
// Pedras Grandes
// Penha
// Peritiba
// Petrolandia
// Picarras
// Pinhalzinho
// Pinheiro Preto
// Piratuba
// Planalto Alegre
// Pomerode
// Ponte Alta do Norte
// Ponte Alta
// Ponte Serrada
// Porto Belo
// Porto Uniao
// Pouso Redondo
// Praia Grande
// Presidente Castelo Branco
// Presidente Getulio
// Presidente Nereu
// Princesa
// Quilombo
// Rancho Queimado
// Rio Fortuna
// Rio Negrinho
// Rio Rufino
// Rio d'Oeste
// Rio das Antas
// Rio do Campo
// Rio do Sul
// Rio dos Cedros
// Riqueza
// Rodeio
// Romelandia
// Salete
// Saltinho
// Salto Veloso
// Sangao
// Santa Cecilia
// Santa Helena
// Santa Rosa de Lima
// Santa Rosa do Sul
// Santa Terezinha do Progresso
// Santa Terezinha
// Santiago do Sul
// Santo Amaro da Imperatriz
// Sao Bento do Sul
// Sao Bernardino
// Sao Bonifacio
// Sao Carlos
// Sao Cristovao do Sul
// Sao Domingos
// Sao Francisco do Sul
// Sao Joao Batista
// Sao Joao do Itaperiu
// Sao Joao do Oeste
// Sao Joao do Sul
// Sao Joaquim
// Sao Jose do Cedro
// Sao Jose do Cerrito
// Sao Jose
// Sao Lourenco d'Oeste
// Sao Ludgero
// Sao Martinho
// Sao Miguel d'Oeste
// Sao Miguel da Boa Vista
// Sao Pedro de Alcantara
// Saudades
// Schroeder
// Seara
// Serra Alta
// Sideropolis
// Sombrio
// Sul Brasil
// Taio
// Tangara
// Tigrinhos
// Tijucas
// Timbe do Sul
// Timbo Grande
// Timbo
// Tres Barras
// Treviso
// Treze Tilias
// Treze de Maio
// Trombudo Central
// Tubarao
// Tunapolis
// Turvo
// Uniao do Oeste
// Urubici
// Urupema
// Urussanga
// Vargeao
// Vargem Bonita
// Vargem
// Vidal Ramos
// Videira
// Vitor Meireles
// Witmarsum
// Xanxere
// Xavantina
// Xaxim
// Zortea

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
