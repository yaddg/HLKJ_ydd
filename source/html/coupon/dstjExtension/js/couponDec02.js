var rqstObj = null; //参数
var channel = null; //参数 渠道

var receiveObj = {
	isopen: false,
	pageInit: function() {
		//			var optionBgTop = (htmlHeight - 140)/200;
		//			var optionBgLeft = (htmlWidth - 260)/200;
		//			$("#optionBg").css("left",optionBgTop+"rem");
		//			$("#optionBg").css("left",optionBgLeft+"rem");
		var htmlWidth = document.documentElement.clientWidth;
		var htmlHeight = document.documentElement.clientHeight; //浏览器可见高度
		var minHtml = htmlWidth / 360 * 100;
		$("html").css("font-size", minHtml + "px");
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
			receiveObj.receive();
			//window.location.href = hltjAppObj.downloadUrl;
		} else {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = "hailang://www.hailang.com/native?name=home&index=0";
			document.body.appendChild(iframe);
			var u = navigator.userAgent;
			var last = Date.now();
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			setTimeout(function() {
				if(Date.now() - last < 2000) {
					
					var urls = getTheRequestParams().channel;
					var urlPath = "http://qiniuapp.mqkji.cn/3.4.5/hltj_" + urls + ".apk"
					console.log(urlPath)
					if(urls == "" || urls == undefined) {
						window.location.href = hltjAppObj.downloadUrl;
					} else {
						console.log(localStorage.urlCode)
						if(localStorage.urlCode == "0") {
							localStorage.urlCode = "";
							//window.location.href = hltjAppObj.downloadUrl;
							window.location.href = urlPath;
						} else {
							window.location.href = urlPath;
						}

					}
					addChannelVisitRecordChannel(1)
						//window.location.href = hltjAppObj.downloadUrl;
				}
			}, 1000);
		}
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
	receiveObj.pageInit();
	//receiveObj.receive();
}