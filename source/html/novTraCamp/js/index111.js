var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $ionicPopup, $http, $location, $ionicLoading) {

	$scope.memberId = getTheRequestParam("memberId");
	console.log($scope.memberId)
		//下单
	$scope.integFetchCss = true;
	$scope.cilentHeight = document.body.scrollHeight;

	$scope.voucherExchO = "voucherExchFing";
	$scope.voucherExchT = "voucherExchFing";
	$scope.voucherExchTh = "voucherExchFing";
	$scope.voucherExchF = "voucherExchFing";
	$scope.voucherBut8 = "去完成";
	$scope.voucherBut100 = "去完成";
	$scope.voucherBut1000 = "去完成";
	$scope.voucherButn100 = "去完成";
	$scope.contCardrewardButName = "待领取";
	$scope.bodyHei = $("body").height();
	$(".body").css("height",$scope.bodyHei);
	//获取用户信息
	$scope.userport = function() {
		// loading
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		$http({
			method: "post",
			url: hltjDomainUrl + "/api/record/welfare",
			data: {
				memberId: $scope.memberId //"212066" 
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
			$scope.voucherData = data.data.welfare;
			$scope.registerLevel = $scope.voucherData.registerLevel; //注册
			$scope.firstCharge = $scope.voucherData.firstCharge; //充值
			$scope.firstCash = $scope.voucherData.firstCash; //投资
			$scope.hard = $scope.voucherData.hard; //勤劳奖
			$scope.five = $scope.voucherData.five; //完成
			console.log($scope.registerLevel)
			if($scope.registerLevel == 1) {
				$scope.voucherExchO = "voucherExchFin";
				$scope.voucherBut8 = "已完成";
			}
			if($scope.firstCharge == 1) {
				$scope.voucherExchT = "voucherExchFin";
				$scope.voucherBut100 = "已完成"
			}else if($scope.firstCharge == 2){
				$scope.voucherExchT = "voucherExchMiss";
				$scope.voucherBut100 = "已错过"
			}
			if($scope.firstCash == 1) {
				$scope.voucherExchTh = "voucherExchFin";
				$scope.voucherBut1000 = "已完成"
			}
			if($scope.hard == 1) {
				$scope.voucherExchTh = "voucherExchFin";
				$scope.voucherButn100 = "已完成";
			}
			if($scope.five == 1) {
				$scope.contCardrewardButName = "已领取";
			}
			$ionicLoading.hide();
			//$scope.getLocation();
		}).error(function(data, status, headers, config) {
			console.log(data)
			$ionicLoading.hide();
		});
	};
	//跳转
	$scope.myExchange = function(num) {
		if(num == 1) {
			//注册
			window.location.href = "hailang://www.hailang.com/native?name=register";
		} else if(num == 2) {
			//充值
			window.location.href = "hailang://www.hailang.com/native?name=recharge";
		} else if(num == 3) {
			//投资
			window.location.href = "hailang://www.hailang.com/native?name=home&index=1";
		} else if(num == 4) {
			//勤劳
			window.location.href = "hailang://www.hailang.com/native?name=home&index=1";
		}
	};
	//显示浮框
	$scope.myIntegBook = function(num) {
		//$scope.distance = $(".body").scrollTop();
		//$scope.distance = document.body.scrollTop; //body高度
		$scope.distance = $(".body").scrollTop(); //获取滚动条初始高度的值 ：0
		alert($scope.distance)
		$scope.distHeight = 380 - $scope.distance;
		console.log($scope.distHeight)
		if(num == 1) {

			$(".contCardFloat").css("margin-top", $scope.distHeight);
			$(".boxbg").css("display", "block");
		} else {
			$(".boxbg").css("display", "none");
		}
		//		$scope.boxbgFlag = !$scope.boxbgFlag; 
	};
	//投资知识
	$scope.myKnowBook = function() {

		location.href = 'indexKnow.html';

	}; //说明
	$scope.myKnowInfor = function() {

		location.href = 'hailang://www.hailang.com/native?name=text_live';

	};

	// An alert dialog
	$scope.showAlert = function(data) {
		var alertPopup = $ionicPopup.alert({
			title: data.name,
			okText: data.code,
			template: data.date
		});
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	};
	$scope.userport();

});