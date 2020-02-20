var rqstObj = null;  //参数
	var channel = null;  //参数 渠道
	
	var receiveObj = {
		isopen : false,
		pageInit:function(){ 
			var receiveleft = (htmlWidth - 172)/2;
			$("#receiveButImg").css("left",receiveleft+"px");
			
			var optionBgTop = (htmlHeight - 140)/2;
			var optionBgLeft = (htmlWidth - 260)/2;
			$("#optionBg").css("left",optionBgTop+"px");
			$("#optionBg").css("left",optionBgLeft+"px");
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
		rqstParamsObj = getTheRequestParams();  //加载页面参数
		addChannelVisitRecord();  //添加渠道访问记录
		receiveObj.pageInit();
	}