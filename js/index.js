var app = angular.module("app_probabilidad", []);
app.controller("control_principal", function($scope){
	$scope.iniciar = function(){
		$scope.math = window.Math;
	}
	$scope.factorial = function(n){
		return (n < 2) ? 1: n * $scope.factorial(n - 1);
	}
	$scope.combinacion = function(n,r){
		return ( $scope.factorial( n ) ) / ( $scope.factorial( n - r ) * $scope.factorial( r ) );
	}
	$scope.aproximacion = function(muestra,probabilidad_exito_porcentaje,probabilidad_calcular){
		if(typeof muestra === "undefined" || typeof probabilidad_exito_porcentaje === "undefined" || typeof probabilidad_calcular === "undefined" || muestra === null || probabilidad_exito_porcentaje === null || probabilidad_calcular === null){
		 		alert("Rellena todos los campos");
				return;
		}
		var probabilidad_exito = probabilidad_exito_porcentaje / 100,
			probabilidad_fracaso = 1 - probabilidad_exito;
		if(probabilidad_calcular.indexOf("-") !== -1 && probabilidad_calcular.indexOf(",") === -1){
			var array_probabilidades = probabilidad_calcular.split("-");
			if(array_probabilidades.length !== 2 || array_probabilidades[0].length <= 0 || array_probabilidades[1].length <= 0){
				alert("El rango está mal");
				return;
			}else{
				var resultado = 0.0;
				for(var x = array_probabilidades[0]; x <= array_probabilidades[1]; x++){
					resultado += $scope.combinacion(muestra, x) * $scope.math.pow(probabilidad_exito, x) * $scope.math.pow(probabilidad_fracaso, muestra - x);
				}
				return resultado;
			}
		}else if(probabilidad_calcular.indexOf(",") !== -1 && probabilidad_calcular.indexOf("-") === -1){
			var array_probabilidades = probabilidad_calcular.split(",");
				var resultado = 0.0;
				for(var x = 0; x < array_probabilidades.length; x++) resultado += $scope.combinacion(muestra, array_probabilidades[x]) * $scope.math.pow(probabilidad_exito, array_probabilidades[x]) * $scope.math.pow(probabilidad_fracaso, muestra - array_probabilidades[x]);
				return resultado;
		}else if(isFinite(probabilidad_calcular)){
			return $scope.combinacion(muestra, probabilidad_calcular) * $scope.math.pow(probabilidad_exito, probabilidad_calcular) * $scope.math.pow(probabilidad_fracaso, muestra - probabilidad_calcular);
		}else{
			alert("Procura poner valores o rangos correctos.")
		}
	}
	$scope.iniciar();
});
