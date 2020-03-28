//Modulo
var irrfModulo = angular.module('irrfApp', []);

//Controler
irrfModulo.controller('irrfController', function($scope) {
    
    //Função para calcular o Irrf do usuário
    $scope.calcularIrrf = function (){

        //Calculo Valor por dependentes
        $scope.deduzirDependentes = $scope.dependentes * 189.69;

        //Calculo valor de deducação do IRPF e porcentagem da alicota
        if($scope.bruto > 1903.98 && $scope.bruto < 2826.65){
            $scope.deduzirIrpf = 142.8;
            $scope.alicota = 0.075;
        }else if($scope.bruto > 2826.66 && $scope.bruto < 3751.05){
            $scope.deduzirIrpf = 354.8;
            $scope.alicota = 0.15;
        }else if($scope.bruto > 3751.06 && $scope.bruto < 4664.68){
            $scope.deduzirIrpf = 636.13;
            $scope.alicota = 0.225;
        }else if($scope.bruto > 4664.68){
            $scope.deduzirIrpf = 869.36;
            $scope.alicota = 0.275;
        } 

        //Calculo do INSS
        if($scope.bruto > 0 && $scope.bruto < 1830.29){
            $scope.inss = $scope.bruto * 0.08;
        }else if($scope.bruto > 1830.30 && $scope.bruto <3050.52){
            $scope.inss = $scope.bruto * 0.09;
        }else if($scope.bruto > 3050.53 && $scope.bruto <6101.06){
            $scope.inss = $scope.bruto * 0.11;
        }else if($scope.bruto > 6101.07){
            $scope.inss = 671.12;
        }

        //Calculo da alicota
        $scope.calcularAlicota = (($scope.bruto -  $scope.inss - $scope.deduzirDependentes.toFixed(2)) * $scope.alicota) - $scope.deduzirIrpf;

        //Calculo Geral IRRF
        $scope.total = $scope.bruto - $scope.inss -
        $scope.calcularAlicota.toFixed(2) - $scope.outrasDespesas;
       
        $scope.exibeResultados = true;
        alert(
        'Bruto ---------------------- '+$scope.bruto+
        '\nINSS -------------------- '+$scope.inss+
        '\nDedução por dependente -- '+$scope.deduzirDependentes.toFixed(2)+
        '\nDecução IRPF ------------ '+$scope.deduzirIrpf+
        '\nIRRF -------------------- '+$scope.calcularAlicota.toFixed(2)+
        '\nOutras Dispesas --------- '+$scope.outrasDespesas+
        '\nTotal Liquido ----------- '+$scope.total.toFixed(2)
        )
    }
    
    //Função para esconder os resultados
    $scope.esconderIMC = function (){
        $scope.exibeResultados = false;
    }
    
});