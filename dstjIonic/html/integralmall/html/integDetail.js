var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $ionicPopup, $http, $location, $ionicLoading) {
	
//	$scope.selectGenden = selectGenden.provinceList;
//	console.log($scope.selectGenden)
//	$scope.repotMyGenden = $scope.selectGenden[0];
	
	$scope.memberId = getTheRequestParam("params"); 
	
	$scope.integName = localStorage.integName;
	$scope.integNum = localStorage.integNum;
	$scope.headImg = localStorage.headImg;
//	获得积分
	$scope.integAcqData = new Array();
//	消耗积分
	$scope.integEmpData = new Array();
	$scope.integAcqDataTxt = "";
	$scope.integEmpDataTxt = "";
	$scope.myVar = false;
	$scope.myVars = true; 
	
	$scope.userportNum = 1;
	$scope.userInpNum = 1;
	//获取积分
	$scope.userport = function() {
		// loading
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		$("body").css("display","block")
		$http({
			method: "post",
			url: hltjDomainUrl + '/api/activity/integral/findIntegralDetailList', //hltjbaseObj.memberNickUrl,
			data: {
				data: $scope.memberId, //"212066" 
				page: $scope.userInpNum, //"212066" 
				pageSize: "10" //"212066" 
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
				return str.join("&");
			}
		}).success(function(data, status, headers, config) {
			console.log(data)
			$scope.integAcqData = $scope.integAcqData.concat(data.data)
			
			if($scope.integAcqData.length == 10){
				$scope.integAcqDataTxt = "点击加载更多";
			}else{
				if($scope.userInpNum>1){
					$scope.integAcqDataTxt = "没有更多了";
				}
			}
			if(data.code == 0){
				$scope.userInpNum++
			}
			if($scope.integAcqData == undefined || $scope.integAcqData == null || $scope.integAcqData == '' || $scope.integAcqData.length == 0){
				$scope.myVar = true;
				$scope.myVars = true; 
				$scope.myVare = false;
				$scope.integAcqDataNum = true;
			}else{
				$scope.myVar = false;
				$scope.myVars = true; 
				$scope.myVare = true;
				$scope.integAcqDataNum = false;
			}
			$ionicLoading.hide();
		}).error(function(data, status, headers, config) {
			console.log(data)
			$ionicLoading.hide();
		});
	};
	//使用积分
	$scope.userports = function() {
		
		$http({
			method: "post",
			url: hltjDomainUrl + '/api/activity/integral/findIntegralConvertList', //hltjbaseObj.memberNickUrl,
			data: {
				data: $scope.memberId, //"212066" 
				page: $scope.userportNum, //"212066" 
				pageSize: "10" //"212066" 
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
				return str.join("&");
			}
		}).success(function(data, status, headers, config) {
			console.log(data)
			$scope.integEmpData = $scope.integEmpData.concat(data.data)
			
			if($scope.integEmpData.length == 10){
				$scope.integEmpDataTxt = "点击加载更多";
			}else{ 
				if($scope.userportNum>1){
					$scope.integEmpDataTxt = "没有更多了";
				}
			}
			if(data.code == 0){
				$scope.userportNum++
			}
			console.log($scope.userportNum) 
			if($scope.integEmpData == undefined || $scope.integEmpData == null || $scope.integEmpData == '' || $scope.integEmpData.length == 0){
				$scope.integEmpDataNum = true;
			}else{
				$scope.integEmpDataNum = false; 
			}
			$scope.othtoggle();
		}).error(function(data, status, headers, config) {
			console.log(data)
			$ionicLoading.hide();
		});
	};
	//颜色
	$scope.mycol = "mycol";
	$scope.othcol = "othcol";
	$scope.mycols = "mycols";
	$scope.othcols = "othcols";
	//获取
	$scope.mytoggle = function() {
		if($scope.myVar == true) {
			$scope.myVar = !$scope.myVar;
			$scope.mycol = "mycol";
			$scope.othcol = "othcol";
			$scope.mycols = "mycols";
			$scope.othcols = "othcols";
			$scope.myVars = !$scope.myVars;
			if($scope.integAcqDataNum == true){
				$scope.myVare = false;
			}else{
				$scope.myVare = true;
			}
			
		}
	};
	//使用
	$scope.othtoggle = function() {
//		if($scope.integEmpDataNum != true && $scope.integEmpDataNum != false){
//				$scope.userports();
//			}else{
//				if($scope.integEmpDataNum == true){
//				$scope.myVare = false;
//			}else{
//				$scope.myVare = true;
//			}
//			}
		if($scope.integEmpDataNum == true){
			$scope.myVare = false;
		}else if($scope.integEmpDataNum == false){
			$scope.myVare = true;
		}else{
			$scope.userports();
		}
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
	$scope.userport();

});