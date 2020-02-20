var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $ionicPopup, $http, $location, $ionicLoading) {
	$scope.myIntegral = 1;
	$scope.memberId = getTheRequestParam("params"); 
	$scope.voucherData = angular.fromJson(localStorage.voucherData); 
	//id
	$scope.voucherId = $scope.voucherData.id;
	//面值提示
	$scope.voucherTxt = $scope.voucherData.name;
	//所需积分
	$scope.voucherInteg = $scope.voucherData.needIntegral;
	//面值
	$scope.temp = $scope.voucherData.amount; 
	//减法
	$scope.myplus = function() {
		if($scope.myIntegral>1){
			$scope.myIntegral = $scope.myIntegral-1;
		}
	};
	//加法
	$scope.myreduce = function() {
		
		$scope.myIntegral = $scope.myIntegral+1;
	};
	//兑换
	$scope.myExch = function() {
		
		$(".receiveBox").css("display","block");
	};
	//确定
	$scope.myConfirm = function() {
		
		$(".receiveBox").css("display","none");
	};
	//去使用
	$scope.myGoem = function() {
		$(".receiveBox").css("display","block");
		location.href = 'dasheng://www.dasheng.com/native?name=home&index=1';
	};
	//兑换
	$scope.userExchge = function() { 
		$http({
			method: "post",
			url: hltjDomainUrl + '/api/activity/integral/integralConvert',
			data: {
				data: $scope.memberId, 
				ctid: $scope.voucherId,  
				num: $scope.myIntegral 
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
			if(data.code == 0){ 
				$scope.exchgeImg = "http://qiniuapp.hailangkeji.com/dstjIntegralSuc.png";
				$scope.exchgeStatus = "兑换成功";
				$scope.exchgeTip = "本次消耗"+$scope.myIntegral*$scope.voucherInteg+"积分";
				$scope.optionBut = true;
				$scope.optionButs = false; 
				
			}else if(data.code == 500){ 
				$scope.exchgeImg = "http://qiniuapp.hailangkeji.com/dstjIntegralLos.png";
				$scope.exchgeStatus = "兑换失败";
				$scope.exchgeTip = data.desc;
//				$scope.exchgeTip = "您今日已到达兑换上限，明天再来吧~";
//				$scope.exchgeTip = "8元代金券已被抢购一空，明天再来吧~";
//				$scope.exchgeTip = "100元代金券已被抢购一空，明天再来吧~";
//				$scope.exchgeTip = "500元代金券已被抢购一空，明天再来吧~";
				$scope.optionBut = false;
				$scope.optionButs = true; 
			}else{ 
				$scope.exchgeImg = "http://qiniuapp.hailangkeji.com/dstjIntegralLos.png";
				$scope.exchgeStatus = "兑换失败";
				$scope.exchgeTip = data.desc;
				$scope.optionBut = false;
				$scope.optionButs = true; 
			}
			$(".receiveBox").css("display","block");
		}).error(function(data, status, headers, config) { 
			$ionicLoading.hide();
		});
	};
	//alert
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
	$("body").css("display","block")
	//$scope.showAlert();
});