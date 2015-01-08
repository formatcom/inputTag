var myApp = angular.module('inputTag', []);
myApp.controller('tagController', function ($scope){
	$scope.tags = [];
	
	$scope.categorias = [
		{ 
			active : false,
			title  : 'html'
		},
		{ 
			active : false,
			title  : 'javascript'
		},
		{ 
			active : false,
			title  : 'python'
		},
		{ 
			active : false,
			title  : 'django'
		},
		{ 
			active : false,
			title  : 'laravel'
		},
		{ 
			active : false,
			title  : 'nodejs'
		},
	];

	$scope.tagGenerate = function (tag, key){
		if (!$scope.categorias[key].active){
			var data = {
				id : key,
				title : tag
			};
			$scope.inputTag = '';
			$scope.tags.push(data);
			$scope.categorias[key].active = true;
		}
	};
	$scope.tagDelete = function (id){
		var key = $scope.tags[id].id;
		$scope.tags.splice(id,1);
		$scope.categorias[key].active = false;
	};
});