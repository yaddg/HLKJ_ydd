var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $ionicPopup, $http, $location, $ionicLoading) {
	//颜色
	$scope.mycol = "mycol";
	$scope.othcol = "othcol";
	$scope.mycols = "mycols";
	$scope.othcols = "othcols";
	//切换展示
	$scope.mytoggle = function() {
		if($scope.myVar == true) {
			$scope.myVar = !$scope.myVar;
			$scope.mycol = "mycol";
			$scope.othcol = "othcol";
			$scope.mycols = "mycols";
			$scope.othcols = "othcols";
			$scope.myVars = !$scope.myVars;
		}
	};
	//切换展示
	$scope.othtoggle = function() {
		if($scope.myVars == true) {
			
			$scope.mycol = "othcol";
			$scope.othcol = "mycol";
			$scope.mycols = "othcols";
			$scope.othcols = "mycols";
			$scope.myVar = !$scope.myVar;
			$scope.myVars = !$scope.myVars;
		}
		
	};

	// An alert dialog
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: '积分商城',
			okText: '确定',
			template: '活动暂未开始'
		});
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	};
	//$scope.showAlert();

});