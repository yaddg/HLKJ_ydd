var giveObj = {
	init:function(){
		var bgimgHeight = $("#bgimg").height();
		
		var bgdivHeight = bgimgHeight - 5;
		$("#bgdiv").css("height",bgdivHeight+"px");  //防点击图片div

		var conTop = htmlWidth * 0.84;
		$("#conetnt").css("top",conTop+"px");  //描述内容位置
		
		var ruleBottom = bgimgHeight - 170;
		$("#rule").css("top",ruleBottom+"px");  //规则位置
		
		var tstop =  bgimgHeight - 31;
		$("#bottomTishi").css("top",tstop+"px");  //风险提示位置

		var bottomImgTop = htmlWidth ;
		var bottomImgLeft = (htmlWidth - 240) / 2;
		$("#bottomImg").css("top",bottomImgTop+"px");  //按钮位置
		$("#bottomImg").css("left",bottomImgLeft+"px");  //按钮位置
	},
	setconetnttext:function(content){//设置描述内容
		$("#conetnt").text(content);
	},
	addFullGive:function(){
		 var isLogin = commonObj.isLogin();
		 if(!isLogin){
			return false;
		 }
		//根据用户id获取奖励信息
		$.ajax({
			url: hltjbaseObj.addFullGiveMemberInfo,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					alert("参加活动成功！");
					$("#bottomImg").css("background-image",'url(../../images/activity/fullGive_involved.png)');
					$("#bottomImg").attr("onclick",'function(){alert("已参与活动");}');
					var descStr = '您当前累计投资额度为:0元，已获得代金券奖励：0元';
					giveObj.setconetnttext(descStr);
				}else if(data.code == 500){
					alert(data.desc);
				}else{
					alert("系统错误");
				}
			},
			error:function(er){
				console.log(er);
				alert("系统错误"+er);
			}
		});
	},
	
	getMemberInfo:function(){
		
		//根据用户id获取奖励信息
		$.ajax({
			url: hltjbaseObj.findFullGiveMemberInfo,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					data = data.data;
					$("#bottomImg").css("background-image",'url(../../images/activity/fullGive_involved.png)');
					$("#bottomImg").attr("onclick",'function(){alert("已参与活动");}');
					var couponMoney = data.count * 100;
					var descStr = '您当前累计投资额度为:'+ data.transactionMoney +'元，已获得代金券奖励：'+ couponMoney +'元';
					giveObj.setconetnttext(descStr);
				}else if(data.code == 400){
					giveObj.setconetnttext(data.desc);
				}else if(data.code == 500){
					alert(data.desc);
				}else{
					alert("系统错误");
				}
			},
			error:function(er){
				console.log(er);
				alert("系统错误"+er);
			}
		});
	},
	openApp:function(){
	  if(giveObj.isWeiXin()){//如果是微信直接跳转到应用市场
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
	}
}

window.onload = function(){
		giveObj.init();
		rqstParamsObj = getTheRequestParams();
		var memberId = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){
			giveObj.getMemberInfo();
		}else{
			//giveObj.setconetnttext("登陆后查看奖励金额");
		}
		/*if(memberId == 'undefined' || memberId == null || memberId == 'null' || memberId.length <= 0){
			alert("请先登陆！");
			window.location.href = hltjAppObj.appLoginUrl;
		}else{
			giveObj.getMemberInfo();
		}*/
}
