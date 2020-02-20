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
		//alert("000")
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
					commonObj.downloadApK();
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
		//		receiveObj.pageInit();
	big();
	flbig_gdtit_r();
	//receiveObj.receive();
	$(window).resize(function() {
		big();
	});
}

function big() {
	var hwidth = document.documentElement.clientWidth;
	(hwidth < 750) ? $('html').css('font-size', hwidth / 15): $('html').css('font-size', 50);
	$('.whapp_dow a').click(function() {
		$('.whapp_low').fadeIn();
	});
	$('.whapp_cole').click(function() {
		$('.whapp_low').fadeOut();
	});
	$('.flbig_gdtit_r').on('click', flbig_gdtit_r);
	$('.flbig_gdtit_l').on('click', flbig_gdtit_l);
	var swiper = new Swiper('.swiper-container', {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	$(".flbig_top_r,.flbig_fot,.flbig_pl_but").click(function() {
		receiveObj.openApp();
//		if(window.location.pathname == '/fullydar15.html') {
//			if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//				window.location.href = "https://itunes.apple.com/cn/app/id1431639985?mt=8";
//				return false;
//			} else if(/(Android)/i.test(navigator.userAgent)) {
//				window.location.href = "http://moamarkets.cn/appsoft/baidu/fld_bdxxl_015.apk";
//				return false;
//			} else {
//				window.location.href = "http://moamarkets.cn/appsoft/baidu/fld_bdxxl_015.apk";
//				return false;
//			};
//		}
	});

}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function GetQueryStringg(name) {
	var cc = decodeURI(document.referrer);
	var bb = cc.substr(cc.indexOf("?"));
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = bb.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function GetQueryStringgg(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function flbig_gdtit_r() {
	$('.flbig_gdtit').addClass('flbig_gdtit2');
	$('.flbig_gdp').addClass('flbig_gdtit2').fadeOut();
	$('.flbig_pl').fadeIn();
	$('.flbig_gdtit_l').css("color", "#333333")
	$('.flbig_gdtit_r').css("color", "#FF6502")
	$('.flbig_gdtit_r').css("border-bottom", "3px solid #FF6502")
	$('.flbig_gdtit_l').css("border-bottom", "none")
}

function flbig_gdtit_l() {
	$('.flbig_gdtit').removeClass('flbig_gdtit2');
	$('.flbig_pl').removeClass('flbig_gdtit2').fadeOut();
	$('.flbig_gdp').fadeIn();
	$('.flbig_gdtit_l').css("color", "#FF6502")
	$('.flbig_gdtit_r').css("color", "#333333")
	$('.flbig_gdtit_l').css("border-bottom", "3px solid #FF6502")
	$('.flbig_gdtit_r').css("border-bottom", "none")
}