var rqstObj = null; //参数
var channel = null; //参数 渠道

var receiveObj = {
	isopen: false,
	pageInit: function() {
		var optionBgTop = (htmlHeight - 140) / 200;
		var optionBgLeft = (htmlWidth - 260) / 200;
		$("#optionBg").css("left", optionBgTop + "rem");
		$("#optionBg").css("left", optionBgLeft + "rem");
		
		$(".boxbg").css("top", "-0.52rem");
		var heibot = $(".RegisterTt").position().top;
		var heiWhole = (heibot+1) / 100;
		var heiWholes = (heibot+1) / 100 + 0.52;
		$(".boxbg").css("height", heiWholes + "rem");
		$("#receiveBox").css("height", heiWhole + "rem");
		
	},
	receive: function() {
		var receiveBox = $("#receiveBox").css("display");
		if(receiveBox == "block") {
			$("#receiveBox").css("display", "none");
		} else {
			$("#receiveBox").css("display", "block");
		}

	},
	openApp: function() {
		if(receiveObj.isWeiXin()) { //如果是微信直接跳转到应用市场
			//receiveObj.receive();
			window.location.href = hltjAppObj.downloadUrl;
		} else {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = hltjAppObj.openUrl;
			document.body.appendChild(iframe);
			var u = navigator.userAgent;
			var last = Date.now();
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			setTimeout(function() {
				if(Date.now() - last < 2000) {
					window.location.href = hltjAppObj.downloadUrl;
					addChannelVisitRecordChannel(1)
						//window.location.href = hltjAppObj.downloadUrl;
				}
			}, 1000);
		}
	},
	callHead: function() {
		$(".RegisterT01").css("display", "none");
		event.stopPropagation();
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		//alert(ua);
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
}

window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	//addChannelVisitRecord();  //添加渠道访问记录
	addChannelVisitRecordChannel(0)
	receiveObj.openApp();
	
		
}
//获取经纬度
function getLocation() {
	var options = {
		enableHighAccuracy: true,
		maximumAge: 1000
	}
	if(navigator.geolocation) {
		//浏览器支持geolocation
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	} else {
		//浏览器不支持geolocation
		alert('您的浏览器不支持地理位置定位');
	}
}
//成功时
function onSuccess(position) {
	//返回用户位置
	//经度
	var longitude = position.coords.longitude;
	//纬度
	var latitude = position.coords.latitude;
	alert('经度' + longitude + '，纬度' + latitude);

	//根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(longitude, latitude);
	var gc = new BMap.Geocoder();
	gc.getLocation(point, function(rs) {
		var addComp = rs.addressComponents;
		alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
	});
}
//失败时
function onError(error) {
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
}

window.onload = function() {
	rqstObj = getTheRequestParams();
	//window.onload = getLocation;
	receiveObj.openApp();
}

function getTheRequestParams() {
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}