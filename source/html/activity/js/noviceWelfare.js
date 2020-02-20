var welfareObj = {
		init:function(){ 
			var bgimgHeight = $("#bgimg").height();
			
			var bgdivHeight = bgimgHeight - 5;
			$("#bgdiv").css("height",bgdivHeight+"px");  //防点击图片div

			var ruleTop = htmlWidth * 2.3;
			$("#rule").css("top",ruleTop+"px");  //规则位置
			
			var tstop =  bgimgHeight - 40;
			$("#bottomTishi").css("top",tstop+"px");  //风险提示位置
			
			var rule_1_top = htmlWidth * 1.37;
			var rule_1_width = htmlWidth - 32;
			$("#rule_1").css("width",rule_1_width+"px");  //规则1位置
			$("#rule_1").css("top",rule_1_top+"px");  //规则1位置
			
			var welfareInnerTop = htmlWidth * 0.94;
			$("#welfareInner").css("top",welfareInnerTop+"px");  //奖励内容区
			
			var noticeTop = htmlWidth * 0.82;
			var noticeHeight = htmlWidth * 0.1;
			$(".notice").css("top",noticeTop+"px");
			$(".notice").css("height",noticeHeight+"px");
			
			var welfareItemLeftWidht = htmlWidth * 0.6;
			var welfareItemRightWidht = (htmlWidth * 0.198) - 0.7;
			var welfareItemHeight = htmlWidth * 0.36;
			$(".welfareItem").css("height",welfareItemHeight+"px");
			$(".welfareItemLeft").css("height",welfareItemHeight+"px");
			$(".welfareItemRight").css("height",welfareItemHeight+"px");
			
			$(".welfareItemLeft").css("width",welfareItemLeftWidht+"px");  //
			$(".welfareItemRight").css("left",welfareItemLeftWidht+"px");
			$(".welfareItemRight").css("width",welfareItemRightWidht+"px");
			
		},
		welfareInfo:function(){
			$.ajax({
                url: hltjbaseObj.welfareUrl,
                data:{memberId:rqstParamsObj.memberId},
                type: "POST",
                dataType:'json',
                success:function(data){
					if(data.code == 0){
						console.log(data);
						data = data.data;
						var info = data.wel;
						var ranarr  = data.ran;
						
						if(info){
							var registerLevel = info.registerLevel; //是否新用户注册
							var firstCharge   = info.firstCharge;	//是否首充
							var firstCash     = info.firstCash;		//是否首投
							if(registerLevel == 0){
								$(".but0").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
								$(".but0").attr('onclick','welfareObj.appRegisterUrl();');
							}else if(registerLevel == 1){
								$(".but0").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteButCom.png)');  //
							}else if(registerLevel == 2){
								$(".but0").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)');  //
							}
							
							if(firstCharge == 0){
								$(".but1").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
								$(".but1").attr('onclick','welfareObj.appRecharge();');
							}else if(firstCharge == 1){
								$(".but1").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteButCom.png)');  //lingqu
							}else if(firstCharge == 2){
								$(".but1").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)');  //
							}
							
							if(firstCash == 0){
								$(".but2").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
								$(".but2").attr('onclick','welfareObj.appHomeUrl();');
							}else if(firstCash == 1){
								$(".but2").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteButCom.png)');  //lingqu
							}else if(firstCash == 2){
								$(".but2").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)');  //
							}
						}else{
							//alert("此活动只针对新用户");
							$(".but0").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)');
							$(".but1").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)'); 
							$(".but2").css("background-image",'url(../../images/activity/noviceWelfare_but_3.png)');
						}
						var ranstr = "";
						for(var i = 0; i < ranarr.length; i++){
							ranstr += ranarr[i];
							ranstr += "&nbsp;&nbsp;&nbsp;";
						}
						//alert(ranstr);
					    $("#marqueeContent").html(ranstr);
						$('#marqueeContent').liMarquee();
					}else if(data.code == 500){
						alert(data.desc);
					}
                },
                error:function(er){
                    //alert("获取列表出错" + er);
                }
			});
		},
		appRecharge:function(){
			window.location.href = hltjAppObj.appRechargeUrl;
		},
		appHomeUrl : function(){
			window.location.href = hltjAppObj.appHomeUrl+"1";
		},
		appRegisterUrl : function(){
			window.location.href = hltjAppObj.appRegisterUrl;
		},
		appLoginUrl : function(){
			console.log(hltjAppObj.appLoginUrl)
			window.location.href = hltjAppObj.appLoginUrl;
		}
		
	}


	window.onload = function(){
		welfareObj.init();
		rqstParamsObj = getTheRequestParams();
		var memberId  = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){
			welfareObj.welfareInfo();
		}else{
			//alert("未登陆！");
			$(".but0").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
			$(".but0").attr('onclick','welfareObj.appLoginUrl();');
			$(".but1").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
			$(".but1").attr('onclick','welfareObj.appLoginUrl();');
			$(".but2").css("background-image",'url(http://qiniuapp.mqkji.cn/hltjInviteBut.png)');  //
			$(".but2").attr('onclick','welfareObj.appLoginUrl();');
		}
		
	}
