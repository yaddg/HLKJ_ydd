//生产环境 邀请码：68042 41378 69332
	//生产环境
	//测试环境 邀请码：58923
	//测试环境
	var rqstObj = null;  //参数
	var channel = null;  //参数 渠道
	var set_cookie = null; 
	var registerObj = {
		downloadUrl:null,
		loadVerCode:function(){
			var userid = $("#userid").val();
			var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
			var reg2 = /^[0-9a-zA-Z]+$/;  //字母数字
			if (!reg.test(userid)) {
				  alert("请填写正确的手机号码");
				  return false;
			}
			var sign = md5(hltjbaseObj.sign+"userid:"+userid);
			//alert(md5("value"));
			//alert(hltjbaseObj.sendSmscodeH5Url);
			$.ajax({
                url: hltjbaseObj.sendSmscodeH5Url,
                data:{userid:userid,sign:sign},
                type: "POST",
                dataType:'json',
				crossDomain: true,
                success:function(data,status,xhr){
					console.log(data);
					if(data.code == 0){
						alert("发送成功！");
					}else if(data.code == 500){
						
						alert(data.desc);
					}else{
						alert("获取验证码出错1");
					}
                },
                error:function(er){
					console.log(er);
                    alert("获取验证码出错" + er);
                }
			});
		},
		register:function(){
			var pwd     = $("#pwd").val();
			var userid  = $("#userid").val();
			var pwd     = $("#pwd").val();
			var verCode = $("#verCodeInput").val();
			var invitecode = $("#invitecode").val();
			var isrRead = $("#isrRead").is(':checked');
			var friendMemberId = rqstParamsObj.memberId;
			if(!isrRead){
				alert("请先勾选同意服务协议！");
				return false;
			}
			
			var reg = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/; //手机号
			var reg2 = /^[0-9a-zA-Z]+$/;  //字母数字
			var regNum = /^\d+(\.\d+)?$/;
			if (!reg.test(userid)) {
				  alert("请填写正确的手机号码");
				  return false;
			}
			if (!regNum.test(pwd) || pwd.length != 6) {
				  alert("密码必须是 6位数字");
				  return false;
			}
			
			
			if (!regNum.test(verCode)) {
				  alert("手机验证码格式错误");
				  return false;
			}
			
			var username = 'hltj' + userid.substr(userid.length-4);
			if(rqstParamsObj.channel == null){
				channel = 'none';
			}
			
			var MD5STR = hltjbaseObj.sign+"appVersion:H5invitecode:"+invitecode+"password:"+pwd+"smsCode:"+verCode+"userid:"+userid+"username:"+username;
				//alert(MD5STR);
				MD5STR = md5(MD5STR);
			$.ajax({
                url: hltjbaseObj.registerH5Url,
                data:{
					 userid:userid,
					 password:pwd,
					 smsCode:verCode,
					 invitecode:invitecode,
					 channel:channel,
					 appVersion : 'H5',
					 username:username,
					 friendMemberId:friendMemberId,
					 sign:MD5STR
				},
                type: "POST",
                dataType:'json',
				crossDomain: true,
                success:function(data,status,xhr){
					console.log(data);
					if(data.code == 0){
						window.location.href=hltjAppObj.downloadUrl;
					}else if(data.code == 500){
						if(data.desc.indexOf('已注册') != -1){
							window.location.href=hltjAppObj.downloadUrl;
						}else if(data.desc.indexOf('已存在') != -1){
							window.location.href=hltjAppObj.downloadUrl;
						}else{
							alert(data.desc);
						}
					}else{
						alert("注册异常");
					}
                },
                error:function(er){
					console.log(er);
                    alert("注册出错" + er);
                }
			});
		},
		cvrpShow:function(){
			$("#cvrpBg").css("display","block");
			$("#cvrpContent").css("display","block");
		},
		cvrpClose:function(){
			
			$("#cvrpBg").css("display","none");
			$("#cvrpContent").css("display","none");
		},
		openApp:function(){
		  if(registerObj.isWeiXin()){//如果是微信直接跳转到应用市场
			window.location.href = hltjAppObj.downloadUrl;
		  }else{
				var iframe = document.createElement('iframe');
					iframe.style.display = 'none';
					iframe.src = hltjAppObj.openUrl;
					document.body.appendChild(iframe);
				var u = navigator.userAgent;
				var last = Date.now();
				var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;	
				setTimeout(function() {
					if (Date.now() - last < 2000) {
						window.location.href = hltjAppObj.downloadUrl;
					}
				}, 1000);
		  }
		},
		downloadApp:function(){
			window.location.href = hltjAppObj.downloadUrl;
		},
		isWeiXin:function(){
            var ua = window.navigator.userAgent.toLowerCase();
			//alert(ua);
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        },
		getMemberNikeName:function(){
			$.ajax({
                url: hltjbaseObj.memberNickUrl,
                data:{
					 memberId:rqstParamsObj.memberId,
				},
                type: "POST",
                dataType:'json',
				crossDomain: true,
                success:function(data,status,xhr){
					console.log(data);
					if(data.code == 0){
						var nikeName = data.data.nickname;
						$("#nikeName").text(nikeName);
					}
                },
                error:function(er){

                }
			});
		}
	}
	
	
	
	window.onload = function(){
//		//hltjDomainUrl = "http://47.98.36.21:8886/hltj-api";
//		hltjbaseObj.sendSmscodeH5Url = hltjDomainUrl.sendSmscodeH5Url;
//		hltjbaseObj.registerH5Url = hltjDomainUrl.registerH5Url; 
//		var inputWidth = htmlWidth-100;
//		$(".formItemInput").css("width",inputWidth+"px");
//		inputWidth -= 113;
//		$("#verCodeInput").css("width",inputWidth+"px");
//		
//		var imgVerCodeObjLeft = htmlWidth - 180;
//		
//		$("#getVerCodeBut").css("left",imgVerCodeObjLeft+"px");
//		
//		
//		rqstObj = getTheRequestParams();
//		
//		rqstParamsObj = getTheRequestParams();
//		rqstParamsObj.channel = 'huodong';
//		var formTop = htmlWidth * 0.5;
//		$("#fromDiv").css("top",formTop+"px");
//		
//		var bodyHight = $("#registerbgimg").height();
//		//alert(bodyHight);
//		bodyHight = bodyHight - 317;
//		$("#fromDiv").css("margin-top",bodyHight+"px;");
//		
//		registerObj.getMemberNikeName();
		var memberId = getTheRequestParams().memberId;
		var from = getTheRequestParams().from;
		window.location.href = "http://h.hailangtaojin.cn/hltjmobile/source/html/july/julyInviteFriend.html?memberId="+memberId+"&from="+from;
		
	}
	
	function addVisitRecord(){
		channel = rqstObj.channel;
		$.ajax({
			url: hltjDomainUrl.addVisitRecordUrl, 
			data:{channel:channel},
			type: "GET",
			dataType:'json',
			success:function(data,status, xhr){
			
			},
			error:function(er){
				
			}
		});
	}
	