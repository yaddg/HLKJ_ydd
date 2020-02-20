//生产环境 邀请码：68042 41378 69332
//生产环境
//测试环境 邀请码：58923
//测试环境
var rqstObj = null; //参数
var channel = null; //参数 渠道
var set_cookie = null;
var rqstParamsObj;
var registerObj = {
	downloadUrl: null,
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		htmlFont = htmlWidth / 1920 * 100;
		$("html").css("font-size", htmlFont + "px");
		var myObtainHeight = $(".registerEmpty").position().top + 60;
		//		console.log(myObtainHeight)
		//		$("body").css("height", myObtainHeight + "px");
		//		$("html").css("height", myObtainHeight + "px");
		$("#myObtain").css("height", myObtainHeight + "px");
		var inputWidth = htmlWidth - 100;
		$(".formItemInput").css("width", inputWidth + "px");
		inputWidth -= 113;
		$("#verCodeInput").css("width", inputWidth + "px");

		var imgVerCodeObjLeft = htmlWidth - 180;

		$("#getVerCodeBut").css("left", imgVerCodeObjLeft + "px");
	},
	myObtain: function() {
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		$("#myObtain").css("display", "none");
	},
	openApp: function() {
		if(registerObj.isWeiXin()) {
			$("#myObtain").css("display", "block");
			$(".myObtainImg").css("display", "none");
			$(".myObtainImgOff").css("display", "block");

		} else {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = 'hailang://www.hailang.com/native?name=home&index=0';
			document.body.appendChild(iframe);
			var u = navigator.userAgent;
			var last = Date.now();
			var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
			setTimeout(function() {
				if(Date.now() - last < 2000) {
					window.location.href = "http://qiniuapp.mqkji.cn/hltj_ttz01.apk";
					//commonObj.downloadApK();
					addChannelPcChannel(1)
				}
			}, 1000);
		}
	},
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	loadVerCode: function() {
		var userid = $("#userid").val();
		var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
		var reg2 = /^[0-9a-zA-Z]+$/; //字母数字
		if(!reg.test(userid)) {
			alert("请填写正确的手机号码");
			return false;
		}
		var sign = md5(hltjbaseObj.sign + "userid:" + userid);
		//alert(md5("value"));
		//alert(hltjbaseObj.sendSmscodeH5Url);
		$.ajax({
			url: hltjbaseObj.sendSmscodeH5Url,
			data: {
				userid: userid,
				sign: sign
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					alert("发送成功！");
				} else if(data.code == 500) {

					alert(data.desc);
				} else {
					alert("获取验证码出错1");
				}
			},
			error: function(er) {
				console.log(er);
				alert("获取验证码出错" + er);
			}
		});
	},
	register: function() {
		var pwd = $("#pwd").val();
		var userid = $("#userid").val();
		var pwd = $("#pwd").val();
		var verCode = $("#verCodeInput").val();
		var invitecode = $("#invitecode").val();
//		var isrRead = $("#isrRead").is(':checked');
//		if(!isrRead) {
//			alert("请先勾选同意服务协议！");
//			return false;
//		}

		var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
		var reg2 = /^[0-9a-zA-Z]+$/; //字母数字
		var regNum = /^\d+(\.\d+)?$/;
		if(!reg.test(userid)) {
			alert("请填写正确的手机号码");
			return false;
		}
		if(!regNum.test(pwd) || pwd.length != 6) {
			alert("密码必须是 6位数字");
			return false;
		}

		if(!regNum.test(verCode)) {
			alert("手机验证码格式错误");
			return false;
		}

		var username = 'hltj' + userid.substr(userid.length - 4);
		//if(rqstParamsObj.channel == null) {
			channel = 'ttz01';
		//}
		var MD5STR = hltjbaseObj.sign + "appVersion:H5invitecode:" + invitecode + "password:" + pwd + "smsCode:" + verCode + "userid:" + userid + "username:" + username;
		//alert(MD5STR);
		MD5STR = md5(MD5STR);
		$.ajax({
			url: hltjbaseObj.registerH5Url,
			data: {
				userid: userid,
				password: pwd,
				smsCode: verCode,
				invitecode: invitecode,
				channel: channel,
				appVersion: 'H5',
				username: username,
				sign: MD5STR
			},
			type: "POST",
			dataType: 'json',
			crossDomain: true,
			success: function(data, status, xhr) {
				addChannelVisitRecordChannel(1)
				console.log(data);
				if(data.code == 0) {
					registerObj.myObtain();
						//window.location.href = hltjAppObj.downloadUrl;
				} else if(data.code == 500) {
					if(data.desc.indexOf('已注册') != -1) {
						alert("用户已注册！")
							//window.location.href = hltjAppObj.downloadUrl;
					} else if(data.desc.indexOf('已存在') != -1) {
						alert("用户已存在！")
							//window.location.href = hltjAppObj.downloadUrl;
					} else {
						alert(data.desc);
					}
				} else {
					alert("注册异常");
				}
			},
			error: function(er) {
				console.log(er);
				addChannelVisitRecordChannel(1)
				alert("注册出错" + er);
			}
		});
	},
	cvrpShow: function() {
		$("#cvrpBg").css("display", "block");
		$("#cvrpContent").css("display", "block");
	},
	cvrpClose: function() {

		$("#cvrpBg").css("display", "none");
		$("#cvrpContent").css("display", "none");
	}
}

window.onload = function() {

	registerObj.init();
	rqstObj = getTheRequestParams();
	$("#invitecode").val("65778");
	rqstParamsObj = getTheRequestParams();
	addChannelPcChannel(0);
	addChannelVisitRecordChannel(0)
	$('#receiveButImg').liMarquee({
		hoverstop: false,
		scrollamount: 80,
		direction: 'up'
	});
	
	$(".myObtainImgButton").click(registerObj.openApp);
	$(".registerBotDownload").click(registerObj.openApp);
	//registerObj.downloadUrl = rqstObj.downloadUrl;
}

function addChannelPcChannel(num) {
	$.ajax({
		url: hltjbaseObj.addVisitRecordUrl,
		data: {
			channel: "ttz01",
			type: num
		},
		type: "get",
		dataType: 'json',
		beforeSend: function() {
			//等待延迟的函数
		},
		success: function(data, status, xhr) {
			console.log(data);

		},
		error: function(er) {
			console.log(er);
			//alert("内部错误");
		}
	});
}