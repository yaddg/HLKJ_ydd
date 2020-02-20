//生产环境 邀请码：68042 41378 69332
//生产环境
//测试环境 邀请码：58923
//测试环境
var rqstObj = null; //参数
var channel = null; //参数 渠道
var set_cookie = null; 
var registerObj = {
	downloadUrl: null,
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
		var isrRead = $("#isrRead").is(':checked');
		if(!isrRead) {
			alert("请先勾选同意服务协议！");
			return false;
		}

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
		if(rqstParamsObj.channel == null) {
			channel = 'none';
		}
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
					alert("注册成功！") 
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
	var inputWidth = htmlWidth - 100;
	$(".formItemInput").css("width", inputWidth + "px");
	inputWidth -= 113;
	$("#verCodeInput").css("width", inputWidth + "px");

	var imgVerCodeObjLeft = htmlWidth - 180;

	$("#getVerCodeBut").css("left", imgVerCodeObjLeft + "px");

	rqstObj = getTheRequestParams();
	$("#invitecode").val("65778");
	rqstParamsObj = getTheRequestParams();
	//addVisitRecord();
	addChannelVisitRecordChannel(0)
	//var rgie = inputWidth/750;
	//var bodyWidth = htmlWidth * rgie;
	//#("body").
	//750 1400

	//registerObj.downloadUrl = rqstObj.downloadUrl;
}

function addVisitRecord() {
	channel = rqstObj.channel;
	$.ajax({
		url: hltjbaseObj.addVisitRecordUrl,
		data: {
			channel: channel
		},
		type: "GET",
		dataType: 'json',
		success: function(data, status, xhr) {

		},
		error: function(er) {

		}
	});
}