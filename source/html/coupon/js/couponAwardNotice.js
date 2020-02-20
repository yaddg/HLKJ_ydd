var rqstObj = null; //参数
var channel = null; //参数 渠道
var awarDay = new Array();
var awarweek = new Array();
var awarDat = new Array();
var now;
var nowWeek;
var nowDay;

var awarImg;
var numIdCss;
var receiveObj = {
	isopen: false,
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
	},
	imgError: function(image) {
		$('.integVoucherE').css("display", "block")
		$(image).hide();
		// $(this).attr("src", "images/demo.png");
	},
	awarNoticeClick: function(num) {
		console.log(num)
		receiveObj.awarLoad(num);
		receiveObj.awarWhile(num);

	},
	awarLoad: function(num) {
		//$("#loading").hide();
		//$(".awardNoticeImg").html("")
		$("#loading").css("display", "block");
		//$("#loading").show();
		$(numIdCss).css("color", "#333333")
		$(numIdCss).css("background", "")
		numIdCss = "#awardNotice" + awarDay[num];

		$(numIdCss).css("color", "#FFFFFF")
		$(numIdCss).css("background", "-webkit-linear-gradient(#FF9000, #FF5B00)")
		$(numIdCss).css("background", "-o-linear-gradient(#FF9000, #FF5B00)")
		$(numIdCss).css("background", "-moz-linear-gradient(#FF9000, #FF5B00)")
		$(numIdCss).css("background", "linear-gradient(#FF9000, #FF5B00)")
	},
	awarWhile: function(number) {
		var dataUrl = "json/"+awarDat[number]+".json";
		console.log(dataUrl)
			//页面
		$("#awardNoticeContent").html("")
		$.ajax({
			url: dataUrl,
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {
				console.log(data.length)
				
				var str = "";

				var num = 0;
				var awaro;
				var awart;
				var awarth;
				while(num <= parseInt(data.name.length / 30)) {
					console.log(num)
					var dom = "dom" + num;
					awaro = "awar" + num + "1";
					awart = "awar" + num + "2"
					awarth = "awar" + num + "3"
					str = '<div class="awardNoticeImg"><div class="awardNoticeTip">奖励' + dom + '元代金券</div>'
					str += '<div class="awar01"><ul id="' + awaro + '"></ul></div>'
					str += '<div class="awar01"><ul id="' + awart + '"></ul></div>'
					str += '<div class="awar01"><ul id="' + awarth + '"></ul></div></div>'
					$("#awardNoticeContent").append(str)
					isHasImg(num,data)
					num++

				}
				$('.integVoucherE').css("display", "none")

			},
			error: function(er) {
				$('.integVoucherE').css("display", "block")
			}
		});
		awarImg = false;
		$("#loading").hide();

	},
	awarHtml: function() {
		//页面
		var str = "";
		var awarNum = "";
		for(var i = 0; i < 5; i++) {
			awarNum = "awar" + awarDay[i];
			str += '<div class="awardNotices" onclick="receiveObj.awarNoticeClick(\'' + i + '\')">';
			str += '<div>周' + awarweek[i] + '</div>';
			if(i == 4) {
				str += '<div id="awardNotice' + awarDay[i] + '">今</div></div>';
			} else {
				str += '<div id="awardNotice' + awarDay[i] + '">' + awarDay[i] + '</div></div>';
			}

		}
		$(".awardNotice").html(str)
		receiveObj.awarNoticeClick(4);
	},
	awarDate: function() {
		var nowDate;
		var nowDateDay;
		var nowMonth;
		var nowYear;
		var nowYMD;
		for(var i = 0; i < 7; i++) {
			nowDate = new Date();
			nowDateDay = nowDate.getDate(); //日期
			now = new Date(nowDate.getTime() - 86400000 * i);
			nowWeek = now.getDay(); //星期几 
			nowDay = now.getDate(); //日期
			nowMonth = now.getMonth() + 1;
			nowYear = now.getFullYear();
			nowYMD = nowYear.toString() + nowMonth + nowDay
			if(nowWeek != 0 && nowWeek != 6) {
				switch(nowWeek) {
					case 1:
						nowWeek = "一";
						break;
					case 2:
						nowWeek = "二";
						break;
					case 3:
						nowWeek = "三";
						break;
					case 4:
						nowWeek = "四";
						break;
					case 5:
						nowWeek = "五";
						break;
				}
				//				if(nowDateDay == nowDay){
				//					nowDay = "今"
				//				}
				awarDay.unshift(nowDay)
				awarweek.unshift(nowWeek)
				awarDat.unshift(nowYMD)
			}
		}
		receiveObj.awarHtml();
	}
}

window.onload = function() {
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	receiveObj.awarDate();

	var encrypt = new JSEncrypt();
	var stys = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsZIOb93a7XkSyN4C33e3zYoowiKdz7HI2ifUTVs8pudpsm0o5sSTf0MsTFBcZDMrhLckg8mESjzFJKao0yzWA4VndnbLbay+p4osEZ+E5QwSzjI784yfm9B8aiNQNr9hb6Ar7wlIlvGq9p63z9fobG8/ORes8QOxlydavcso+bEO8XA3qyY0Gq5fTwIm/dhnFc01/LxjF39B/ZPvfX8DU4DIq6JO2HoIJkp036F+d81F7DGoaSMiLvAfeEfVe5hSN3K0cYYqvKfclD0t+vnx30kTnVpWXkuTQYtA0oLSzgY8a5WTSmnRvt+YF7eOH45E8a6UsqYPpxFj4TZR4bjnpwIDAQAB"
	encrypt.setPublicKey(stys);
	var encryptData = encrypt.encrypt("18501051585"); //加密后的字符串
	console.log(encryptData)
	
	var sty = "DWAoHo7hvx+ukm8GwTjf3VVIzrRbGBhOWdKGhiNZZJORazfoIqf61woBssEshcgoBbC6UvZ8BkDlf9pEKsD2qBwLtkRIN7xF3Sei2ckwF6QIwUF9kG1TI9wfln3kdwHLhCI7GRtgos3472ppw596m15gsuK4dIaOzRGO62Em5jfpjdmKpHIwrUansowUV2/wqMK0RzMSCDmP17OVapCaNKxx1l+rjTUOQJLq7P9eAki0ZNICYqy8FW+4edRv/50M5IVZeJ0b+Lifz24us606gPZ0YKg8R1gNBf7PTNeiaPsOOT2nc1gV8/rPvf0u9icbt1DG2Z3BuOZYJREE1WT5uQ==";
	encrypt.setPrivateKey(stys);

　　	encrypt.decrypt(sty);

	console.log(encrypt.decrypt(sty))
	//addChannelVisitRecord();  //添加渠道访问记录 
	//receiveObj.pageInit();
	//receiveObj.receive();
}

function isHasImg(num,data) {

	var i = 30 * num;
	var dom = "dom" + num;
	var awaro = "awar" + num + "1";
	var awart = "awar" + num + "2"
	var awarth = "awar" + num + "3"

	var strNum1 = i + 10;
	var strNum2 = i + 20;
	var strNum3 = i + 30;

	var str1 = "";
	var str2 = "";
	var str3 = ""; 
	console.log(i)
	while(i < data.name.length) {
		if(data.name[i] == undefined || data.Telephone[i] == undefined) {
			break;
		}
		if(i < strNum1) {
			str1 += '<li><div class="awarName">' + data.name[i] + '</div><div class="awarTele">' + data.Telephone[i] + '</div></li>';
		} else if(i >= strNum1 && i < strNum2) {
			str2 += '<li><div class="awarName">' + data.name[i] + '</div><div class="awarTele">' + data.Telephone[i] + '</div></li>';
		} else if(i >= strNum2 && i < strNum3) {
			str3 += '<li><div class="awarName">' + data.name[i] + '</div><div class="awarTele">' + data.Telephone[i] + '</div></li>';
		}
		console.log("#" + awaro)

		awarImg = true;
		i++;
	}

	$("#" + awaro).html(str1)
	$("#" + awart).html(str2)
	$("#" + awarth).html(str3)

}