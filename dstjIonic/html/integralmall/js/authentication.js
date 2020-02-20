var app = angular.module('ionicApp', ['ionic']);

app.controller('claimReportPersonCtrl', function($scope, $timeout, $interval, $http, $location, $ionicLoading) {

	$scope.import = false;
	$scope.importSuc = true;
	$scope.myVar = true;
	$scope.memberId = getTheRequestParams().memberId;
	$scope.myFinish = true;
	$scope.myCode = false;
	//验证码
	$scope.paracont = "获取验证码";
	$scope.paraclass = "but_null";
	$scope.paraevent = true;
	$scope.data = false;
	//位置信息
	$scope.addComp = "";
	$scope.longitude = "";
	$scope.latitude = "";
	$scope.loadVerCode = function() {
			//	  var userid = $("#userid").val();

			var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
			var reg2 = /^[0-9a-zA-Z]+$/; //字母数字
			if(!reg.test($scope.importBankIMobile)) {
				alert("请填写正确的手机号码");
				return false;
			}
			var sign = md5(hltjbaseObj.sign + "userid:" + $scope.importBankIMobile);
			$http({
				method: "POST",
				url: hltjbaseObj.sendSmscodeH5Url, //"hltjbaseObj.sendSmscodeH5Url,"  
				data: {
					userid: $scope.importBankIMobile,
					sign: sign
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
				$scope.paraNum();

			}).error(function(data, status, headers, config) {
				console.log(data)
				$ionicLoading.hide();
			});
		}
		//获取用户头像
	$scope.userport = function() {

		$http({
			method: "POST",
			url: hltjbaseObj.memberNickUrl,
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
			console.log(data.data)
			$scope.nickdata = data.data;
			//$scope.paraNum();
			$scope.nickName = $scope.nickdata.nickname;
			$scope.importImg = $scope.nickdata.headImg;
			if($scope.importImg == "" || $scope.importImg == undefined || $scope.importImg == null) {
				$scope.importImg = "images/authHead.png"
			}

			$scope.import = true;
			$scope.importSuc = false;

		}).error(function(data, status, headers, config) {
			console.log(data)
			$ionicLoading.hide();
		});
	}
	$scope.paraNum = function() {
		//		    $scope.hed = {
		//      			"title":"提示",
		//      			"content":"请尽快充值",
		//      		}
		//      		propPrompt($scope.hed)
		//      		console.log($scope.hed) 
		var second = 60,
			timePromise = undefined;

		timePromise = $interval(function() {
			if(second <= 0) {
				$interval.cancel(timePromise);
				timePromise = undefined;

				second = 60;
				$scope.myCode = false;
				$scope.paracont = "重发验证码";
				$scope.paraclass = "but_null";
				$scope.paraevent = true;

			} else {
				$scope.myCode = true;
				$scope.paracont = second + "秒后可重发";
				$scope.paraclass = "not but_null";
				second--;

			}
		}, 1000, 100);
	}

	//校验 
	$scope.chanFinish = function() {
			//		$scope.importName//姓名
			//		$scope.importNum//证件号
			//		$scope.importBankNum//银行卡号
			//		$scope.importBankIMobile//预留手机号
			//		$scope.importCode//验证码   
			$scope.mygol = true;
			if($scope.importName == undefined) {
				$scope.mygol = false;
			}
			if($scope.importNum == undefined) {
				$scope.mygol = false;
			}
			if($scope.importBankNum == undefined) {
				$scope.mygol = false;
			}
			if($scope.importBankIMobile == undefined) {
				$scope.mygol = false;
			}
			if($scope.importCode == undefined) {
				$scope.mygol = false;
			}
			if($scope.mygol == true) {
				$scope.myFinish = false;
			} else {
				$scope.myFinish = true;
			}

		}
		//完成 
	$scope.loadFinish = function() {
			$http({
				method: "POST",
				url: hltjbaseObj.addAuthMember,
				data: {
					memberId: RndNum(20) + $scope.memberId + RndNum(20),
					fullname: $scope.importName,
					idCard: $scope.importNum,
					bankCard: $scope.importBankNum,
					mobile: $scope.importBankIMobile,
					smsCode: $scope.importCode,
					longitude: $scope.longitude,
					latitude: $scope.latitude,
					address: $scope.addComp
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
				console.log(data.code)
				if(data.code == 0) {
					$scope.userport();
				} else {
					alert(data.desc)
					return;
				}

			}).error(function(data, status, headers, config) {
				console.log(data)
				alert("内部错误")
				return;
				//$ionicLoading.hide();
			});

		}
		//是否显示手机号
	$scope.chanBankNum = function() {
			var banknum = "" + $scope.importBankNum;
			$scope.chanFinish();
			if(banknum.length == 5) {
				$scope.myVar = false;
			}

		}
		//是否已认证
	$scope.certifNum = function() {
			$http({
				method: "POST",
				url: hltjDomainUrl + "/api/authentic/findAuthMember",
				data: {
					memberId: RndNum(20) + $scope.memberId + RndNum(20),
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
				if(data.code == 0) {
					$scope.userport();
				} else {
					//console.log(data) 
				}

			}).error(function(data, status, headers, config) {
				//console.log(data)
				alert("内部错误")
				$ionicLoading.hide();
			});

		}
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
			//			$scope.addComp = "";
			//			$scope.longitude = "";
			//			$scope.latitude = "";
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
				$scope.loadFinish();
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
		$scope.loadFinish();
	}

	$scope.certifNum();
});

window.addEventListener('resize', function() {
	if(document.activeElement.tagName === 'INPUT') {
		document.activeElement.scrollIntoView({
			behavior: "smooth"
		})
	}
})