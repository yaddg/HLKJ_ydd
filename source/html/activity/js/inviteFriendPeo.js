var rqstObj = null; //参数
var channel = null; //参数 渠道
var memberUd = rqstParamsObj.memberId;
console.log(memberUd);
var memberId = parseInt(memberUd,16);
console.log(memberId)
var receiveObj = {
	isopen: false,
	pageInit: function() {
		var receiveleft = (htmlWidth - 172) / 2;
		//			$("#receiveButImg").css("left",receiveleft+"px");

		var optionBgTop = (htmlHeight - 140) / 2;
		var optionBgLeft = (htmlWidth - 260) / 2;
		$("#optionBg").css("left", optionBgTop + "px");
		$("#optionBg").css("left", optionBgLeft + "px");
	},
	receive: function(num) {
		var receiveBox = $("#receiveBox").css("display");
		if(receiveBox == "block") {
			$("#receiveBox").css("display", "none");
		} else {
			$("#receiveBox").css("display", "block");

		}

	},
	phoneMobile: function() {
		var phoneNum = $("#importBankIMobile").val();
		if(phoneNum == "" || phoneNum == undefined) {
			$("#importMobileTxt").text("请输入您的手机号！");
			return false;
		} else {
			var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
			var reg2 = /^[0-9a-zA-Z]+$/; //字母数字
			if(!reg.test(phoneNum)) {
				//				alert("请填写正确的手机号码");
				//				return false;
				$("#importMobileTxt").text("请填写正确的手机号码！");
				return false;
			} else {
				$("#importMobileTxt").text("");
				return true;
			}

		}

	},
	inviteFriend: function() {
		//alert(memberId);
		$.ajax({
			url: hltjDomainUrl + "/activity/invite",
			data: {
				memberId: memberId
			},
			type: "post",
			dataType: 'json',
			beforeSend: function() {
				//等待延迟的函数
			},
			success: function(data, status, xhr) {
				console.log(data);
				//成功
				if(data.code == 0) {
					//receiveObj.novicesData();
					var data = data.data.memberInviteNotifyVo;
					console.log(data)
					var nickname = data.nickName;
					if(nickname == undefined || nickname == null || nickname == "") {
						nickname = "xxx"
					}
					var nicknameHtml = "您的好友<span>" + nickname + "</span>邀您一起赚钱一起浪"
					$("#inviteFriendGift").html(nicknameHtml)
				}
			},
			error: function(er) {
				console.log(er);
				//				alert("获取文章评论出错" + er);
			}
		});
	},
	openApp: function() {
		var phoneType = receiveObj.phoneMobile();
		if(phoneType == false) {
			return
		}
		var phoneNum = $("#importBankIMobile").val();
		$.ajax({
			//url: "http://47.110.14.113:8866/dstj-activity" + "/activity/regConnect", //hltjbaseObj.memberNickUrl,
			url: hltjDomainUrl + "/activity/regConnect", //hltjbaseObj.memberNickUrl,
			data: {
				inviteMemberId: memberId,
				myMobile: phoneNum
			},
			type: "post",
			dataType: 'json',
			beforeSend: function() {

			},
			success: function(data, status, xhr) {
				console.log(data);
				receiveObj.downloadApp();
				//成功
				//				if(data.code == 0) {
				//					receiveObj.downloadApp();
				//				}
			},
			error: function(er) {
				receiveObj.downloadApp();
				console.log(er);
			}
		});

	},
	downloadApp: function() {
		if(receiveObj.isWeiXin()) { //如果是微信直接跳转到应用市场
			receiveObj.receive();
			//window.location.href = "http://qr32.cn/Eeg4Yl";
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
					addChannelVisitRecordChannel(1);
					var urlPath = hltjAppObj.downloadApk + "uc01.apk";
					console.log(urlPath) 
					window.location.href = urlPath;
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
	//addChannelVisitRecordChannel(0)
	//receiveObj.receive();
	receiveObj.inviteFriend();

}