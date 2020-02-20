var rqstObj = null;  //参数
	var channel = null;  //参数 渠道
	
	var receiveObj = {
		isopen : false,
		pageInit:function(){ 
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
			$(".but0").css("background-image",'url(../../images/activity/noviceWelfare_but_1.png)');
			$(".but1").css("background-image",'url(../../images/activity/noviceWelfare_but_1.png)');
			$(".but2").css("background-image",'url(../../images/activity/noviceWelfare_but_1.png)');
		},
		receive:function(){
			var receiveBox = $("#receiveBox").css("display");
			if (receiveBox == "block") {
				$("#receiveBox").css("display","none");
			}else{
				$("#receiveBox").css("display","block");
				
			}
			
		},
		openApp:function(){
		  if(receiveObj.isWeiXin()){//如果是微信直接跳转到应用市场
		  	//receiveObj.receive();
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
						addChannelVisitRecordChannel(1)
						//window.location.href = hltjAppObj.downloadUrl;
					}
				}, 1000);
		  }
		},
		downloadApp:function(){
			commonObj.downloadApK();
			addChannelVisitRecordChannel(1)
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
		rqstParamsObj = getTheRequestParams();  //加载页面参数
		//addChannelVisitRecord();  //添加渠道访问记录
		addChannelVisitRecordChannel(0)
		receiveObj.pageInit();
		$("body").bind("click",receiveObj.openApp);
		//receiveObj.receive();
	}