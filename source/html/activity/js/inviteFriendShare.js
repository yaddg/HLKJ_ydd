var invitObj = {
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		var bgimgHeight = $("#bgimg").height();

		var bgdivHeight = bgimgHeight - 5;
		$("#bgdiv").css("height", bgdivHeight + "px"); //防点击图片div

		var tstop = htmlWidth * 2.2;
		$("#bottomTishi").css("top", tstop + "px"); //风险提示位置

		$("#bottomImg").css("bottom", "0px"); //按钮位置

		var butTop = htmlWidth * 0.47;
		$("#butLeft").css("top", butTop + "px"); //按钮位置
		$("#butLeft").css("left", 93 + "px"); //按钮位置
		$("#butRight").css("top", butTop + "px"); //按钮位置
		$("#butRight").css("right", 93 + "px"); //按钮位置

		$("#Strategy_bg").css("height", bgimgHeight + "px"); //弹框背景
		$("#check_record_bg").css("height", bgimgHeight + "px"); //弹框背景

	},
	share: function() {
		var memberId = rqstParamsObj.memberId;
		var isLogin = commonObj.isLogin();
		if(!isLogin) {
			return false;
		}
		var _url = "http://h.mqkji.cn" + "/hltjmobile/source/html/activity/friendRegister.html?memberId=" + memberId;
		//var urlStr = "http://"+window.location.host + "/hltjmobile/source/html/hlregister/hlregisterpc.html?invitecode="+invitecode;
		_url = hltjAppObj.appShare + "?title=免费送您888元体验券，点击领取&content=用券投资，盈利可提现，亏损平台担！投资达人，你也可以&share_url=" + _url;
		window.location.href = _url;
	},
	checkShow: function() {
		var isLogin = commonObj.isLogin();
		if(!isLogin) {
			return false;
		}
		$("#check_record_bg").css("display", "block"); //弹框背景
		invitObj.coupoRecord();
	},
	checkClose: function() {
		$("#check_record_bg").css("display", "none"); //弹框背景
	},
	StrategyShow: function() {
		$("#Strategy_bg").css("display", "block"); //弹框背景
	},
	StrategyClose: function() {
		$("#Strategy_bg").css("display", "none"); //弹框背景
	},
	coupoRecord: function() {
		$("#record_table").html('');
		$.ajax({
			url: hltjbaseObj.inviteRecordUrl,
			data: {
				memberId: rqstParamsObj.memberId
			},
			type: "POST",
			dataType: 'json',
			success: function(data) {
				if(data.code == 0) {
					console.log(data);
					//alert(data.data);
					data = data.data;
					var totalInvit = data.totalInvit;
					var invites = data.invites;
					var couponNumStr = '您已累计获得：' + totalInvit + '元代金券';
					$("#couponNum").text(couponNumStr);
					for(var i = 0; i < invites.length; i++) {
						var inviteIeam = invites[i];
						var incomeTypeStr = "";
						var amount = "";
						if(inviteIeam.incomeType == 0) {
							incomeTypeStr = "注册";
						} else if(inviteIeam.incomeType == 1) {
							incomeTypeStr = "首充";
							amount = inviteIeam.amount + "元";
						} else if(inviteIeam.incomeType == 2) {
							incomeTypeStr = "首投";
							amount = inviteIeam.amount + "元";
						}
						var accountStatus = "";
						if(inviteIeam.accountStatus == 0) {
							accountStatus = '否';
						} else {
							accountStatus = '是';
						}
						var dateStr = inviteIeam.createTime.split(' ')[0];
						dateStr = dateStr.replaceAll("-", '/');
						var trString = '<tr ><td>' + dateStr + '</td><td>&nbsp;&nbsp;' + inviteIeam.mobile + '</td><td>' + incomeTypeStr + '</td><td>' + amount + '</td><td>' + accountStatus + '</td></tr>';
						$("#record_table").append(trString);
					}
				} else if(data.code == 500) {
					alert(data.desc);
				}
			},
			error: function(er) {
				alert("获取信息出错" + er);
			}
		});
	},
	openApp: function() {
		if(invitObj.isWeiXin()) { //如果是微信直接跳转到应用市场
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
				}
			}, 1000);
		}
	},
	downloadApp: function() {
		window.location.href = hltjAppObj.downloadUrl;
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
	invitObj.init();
	rqstParamsObj = getTheRequestParams();
}