
var giveObj = {
	init:function(){ 
		var bgimgHeight = $("#bgimg").height();
		
		var bgdivHeight = bgimgHeight - 5;
		$("#bgdiv").css("height",bgdivHeight+"px");  //防点击图片div

		var ruleBottom = htmlWidth * 1.65;
		$("#rule").css("top",ruleBottom+"px");  //规则位置
		
		var tstop =  bgimgHeight - 31;
		$("#bottomTishi").css("top",tstop+"px");  //风险提示位置

		var bottomImgTop = htmlWidth * 0.48;
		var bottomImgLeft = (htmlWidth - 180) / 2;
		$("#bottomImg").css("top",bottomImgTop+"px");  //按钮位置
		$("#bottomImg").css("left",bottomImgLeft+"px");  //按钮位置
	},
	setconetnttext:function(content){//设置描述内容
		$("#conetnt").text(content);
	},
	addFullIndemnity:function(){
		 var isLogin = commonObj.isLogin();
		 if(!isLogin){
			return false;
		 }
		//根据用户id获取奖励信息
		$.ajax({
			url: hltjbaseObj.addFullIndemnity,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				if(data.code == 0){
					if(data.data > 0){
						$("#bottomImg").css("background-image",'url(../../images/activity/fullIndemnity_but2.png)');
					}
				}else if(data.code == 500){
					//alert(data.desc);
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
	findFullIndemnity : function(){
		
		$.ajax({
			url: hltjbaseObj.findFullIndemnity,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					if(data.data != null){
						$("#bottomImg").css("background-image",'url(../../images/activity/fullIndemnity_but2.png)');
					}
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
	}
}

window.onload = function(){
		giveObj.init();
		rqstParamsObj = getTheRequestParams();
		var memberId = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){
			giveObj.findFullIndemnity();
		}
}
