var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $ionicPopup, $http, $location, $ionicLoading) {

	$scope.memberId = getTheRequestParam("params");
		//下单
	$scope.integFetchCss = true;
	$scope.integFetchTxt = "去下单";
	$scope.integName = "登陆/注册";
	$scope.headImg = "http://qiniuapp.hailangkeji.com/authHead.png";
	$scope.integNum = "0";
	console.log(hltjDomainUrl)
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
		$("body").css("display","block")
		$http({
			method: "post",
			url: hltjDomainUrl + "/api/activity/integral/findCouponTypeList",
			data: {
				data: $scope.memberId //"212066"
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
			$scope.voucherData = data.data.ctArr;
			//昵称
			$scope.integName = data.data.nickname;
			if($scope.integName == "" || $scope.integName == undefined || $scope.integName == null) {
				$scope.integName = "登陆/注册";
			}
			//积分
			$scope.integNum = data.data.integral;
			if($scope.integNum == "" || $scope.integNum == undefined || $scope.integNum == null) {
				$scope.integNum = "0";
			}

			//头像headImg
			$scope.headImg = data.data.headImg;
			if($scope.headImg == "" || $scope.headImg == undefined || $scope.headImg == null) {
				$scope.headImg = "http://qiniuapp.hailangkeji.com/authHead.png";
			}
			$ionicLoading.hide();
			//$scope.getLocation();
		}).error(function(data, status, headers, config) {
			console.log(data)
			$ionicLoading.hide();
		});
	};
	//	兑换
	$scope.myExchange = function(data) {
		if($scope.memberId == undefined || $scope.memberId == null || $scope.memberId == '' || $scope.memberId.length < 1) {
			//$scope.integName = "登陆/注册";
			$scope.myTip = {
				"name": "积分商城",
				"code": "确定",
				"date": "请先登录！"
			}
			$scope.showAlert($scope.myTip)
		} else {
			localStorage.voucherData = angular.toJson(data, true);
			// loading
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			location.href = 'html/integExchge.html?params=' + $scope.memberId;
			// $scope.myTip = {
			// 	"name": "积分商城",
			// 	"code": "确定",
			// 	"date": "积分商城正在进行系统升级，在此期间暂停积分兑换服务（已兑换代金券，稍后系统将自动发放），造成不便敬请谅解"
			// }
			// $scope.showAlert($scope.myTip)
		}

	};
	//积分明细
	$scope.myIntegDet = function() {
		//$scope.IntegDetData = angular.fromJson(localStorage.voucherData);

		if($scope.memberId == undefined || $scope.memberId == null || $scope.memberId == '' || $scope.memberId.length < 1) {
			//$scope.integName = "登陆/注册";
			$scope.myTip = {
				"name": "积分商城",
				"code": "确定",
				"date": "请先登录！"
			}
			$scope.showAlert($scope.myTip)
		} else {
			localStorage.integName = $scope.integName;
			localStorage.integNum = $scope.integNum;
			localStorage.headImg = $scope.headImg;
			// loading
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			location.href = 'html/integDetail.html?params=' + $scope.memberId;
		}

	};
	//去下单
	$scope.myIntegGo = function() {

		location.href = 'dasheng://www.dasheng.com/native?name=home&index=1';

	};//说明
	$scope.myIntegRule = function() {

		location.href = 'html/index.html';

	};

	//位置信息
	$scope.addComp = "";
	$scope.longitude = "";
	$scope.latitude = "";
	//获取位置信息
	$scope.getLocation = function() {
			var options = {
				enableHighAccuracy: true,
				maximumAge: 1000
			}
			if(navigator.geolocation) {
				//浏览器支持geolocation
				navigator.geolocation.getCurrentPosition($scope.onSuccess, $scope.onError, options);
			} else {
				//浏览器不支持geolocation
				//alert('您的浏览器不支持地理位置定位');
			}
		}
		//成功时
	$scope.onSuccess = function(position) {
			//返回用户位置
			//经度
			$scope.longitude = position.coords.longitude;
			//纬度
			$scope.latitude = position.coords.latitude;
			//alert('经度' + longitude + '，纬度' + latitude);
			console.log('经度' + $scope.longitude + '，纬度' + $scope.latitude)

			//根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
			var map = new BMap.Map("allmap");
			var point = new BMap.Point($scope.longitude, $scope.latitude);
			var gc = new BMap.Geocoder();
			gc.getLocation(point, function(rs) {
				$scope.addComp = rs.addressComponents;
				//$scope.loadFinish();
				//alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
			});
		}
		//失败时
	$scope.onError = function(error) {
		switch(error.code) {
			case 1:
				alert("位置服务被拒绝");
				break;
			case 2:
				alert("暂时获取不到位置信息");
				break;
			case 3:
				alert("获取信息超时");
				break;
			case 4:
				alert("未知错误");
				break;
		}
		//$scope.loadFinish();
	}

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
