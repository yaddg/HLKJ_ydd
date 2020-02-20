var rqstObj = null; //参数
var channel = null; //参数 渠道 
var system = {
	win: false,
	mac: false,
	xll: false
};
var memberId = getTheRequestParams().memberId;

var countdown = 60;

var countPeoNum = 95268;

var htmlFont;
var receiveObj = {
	isopen: false,

	AppKnow: function() {
		window.location.href = 'hailang://www.hailang.com/native?name=recharge';
	},
	init: function() {
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		htmlFont = htmlWidth / 1920 * 100;
		$("html").css("font-size", htmlFont + "px");
//		var myObtainHeight = $(".RechTip").position().top + 10;
//		console.log(myObtainHeight)
//		$("body").css("height", myObtainHeight + "px");
//		$("html").css("height", myObtainHeight + "px");
		$("#myObtain").css("height", (14*htmlFont) + "px");
	},
	myObtain: function() {
		$("#myObtainImg").css("display", "block");
		$("#myObtain").css("display", "block");
	},
	closeObtain: function() {
		$("#myObtain").css("display", "none");
	},
	closeTips: function() {
		$("#mySupernatant").css("display", "none");
	},
	
	register: function() {
		var pwd = $("#inputPass").val();
		var userid = $("#inputNumber").val();
		var verCode = $("#inputCode").val();
		var invitecode = "10554";
		console.log(invitecode)
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
//		if(rqstParamsObj.channel == null) {
			channel = 'ttz01';
//		}

		var MD5STR = hltjbaseObj.sign + "appVersion:H5invitecode:" + invitecode + "password:" + pwd + "smsCode:" + verCode + "userid:" + userid + "username:" + username;
		
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
				console.log(data);
				if(data.code == 0) {
					receiveObj.myObtain();
					//window.location.href = hltjAppObj.downloadUrl;
				} else if(data.code == 500) {
					if(data.desc.indexOf('已注册') != -1) {
						alert('已注册')
					} else if(data.desc.indexOf('已存在') != -1) {
						alert('已存在')
					} else {
						alert(data.desc);
					}
				} else {
					alert("注册异常");
				}
			},
			error: function(er) {
				console.log(er);
				alert("注册出错" + er);
			}
		});
	},
	//短信验证码
	perInforCode: function() {
		var userid = $("#inputNumber").val();
		var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
		var reg2 = /^[0-9a-zA-Z]+$/; //字母数字
		if(!reg.test(userid)) {
			alert("请填写正确的手机号码");
			return false;
		}
		var sign = md5(hltjbaseObj.sign + "userid:" + userid);
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
					//alert("发送成功！");
					var obj = $(".codeInputNum");
					settime(obj); 
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
	isWeiXin: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

}
window.onload = function() {
	//检测平台

	var p = navigator.platform;
	
	system.win = p.indexOf("Win") == 0;

	system.mac = p.indexOf("Mac") == 0;

	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

	//跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
	if(receiveObj.isWeiXin()) {
		window.location.href = "/hltjmobile/source/html/hlregister/couponDecMob.html";
		return;
	}
	if(system.win || system.mac || system.xll){
		var systemPin = true;
	}else {
		window.location.href = "/hltjmobile/source/html/hlregister/couponDecMob.html";
		return;
	}
	
	rqstParamsObj = getTheRequestParams(); //加载页面参数
	receiveObj.init();
	//验证码
	$(".codeInputNum").click(receiveObj.perInforCode);
	//注册
	$(".isLogin").click(receiveObj.register);
	
	$(".myObtainImg").css({
		left: ($(".myObtain").outerWidth() - htmlFont*5.12) / 2
	});
	
	 $('.dowebokUl').liMarquee({
	 	hoverstop: false,
	 	scrollamount: 80,
        direction: 'up'
    });
    setPeoNum();
    //receiveObj.myObtain();
	//	addChannelVisitRecord(); //添加渠道访问记录  
}

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		//obj.removeattr("disabled"); 
		obj.html("重新发送");
		obj.css("color", "#FFFFFE");
		obj.css("background-color", "rgba(235,102,10,1)");
		countdown = 60;
		obj.attr("onclick", "receiveObj.perInforCode");
		return;
	} else {
		obj.css("color", "#FFFFFE");
		obj.css("background-color", "rgba(163,163,163,1)");
		obj.attr("onclick", "");
		obj.html(countdown);
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}

function setPeoNum() { //发送验证码倒计时

	if(countPeoNum == 10000) {
		//obj.removeattr("disabled"); 
		countPeoNum = 95268;
		$(".signinPeoNum span").html(countPeoNum);
		setPeoNum();
	} else {
		//obj.css("color", "#FFFFFE");
		countPeoNum++;
		$(".signinPeoNum span").html(countPeoNum);
		
	}
	setTimeout(function() {
		setPeoNum()
	}, 500)
}