var rqstObj = null;  //参数
	var channel = null;  //参数 渠道
	
	var receiveObj = {
		isopen : false,
		pageInit:function(){ 
			var receiveleft = (htmlWidth - 172)/2;
//			$("#receiveButImg").css("left",receiveleft+"px");
			
			var optionBgTop = (htmlHeight - 140)/2;
			var optionBgLeft = (htmlWidth - 260)/2;
			$("#optionBg").css("left",optionBgTop+"px");
			$("#optionBg").css("left",optionBgLeft+"px");
		},
		receive:function(num){
			var receiveBox = $("#receiveBox").css("display");
			if (receiveBox == "block") {
				$("#receiveBox").css("display","none");
			}else{
				$("#receiveBox").css("display","block");
				if(num==1){
					$("#optionBgs").css("display","block");
					$("#optionBg").css("display","none");
				}else{
					$("#optionBgs").css("display","none");
					$("#optionBg").css("display","block");
				}
			}
			
		},
		openApp:function(num){
		  if(num!=1){
				receiveObj.receive();
		  }
		  if(receiveObj.isWeiXin()){//如果是微信直接跳转到应用市场
			//window.location.href = hltjAppObj.downloadUrl;
			receiveObj.receive(1);
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
						//window.location.href = hltjAppObj.downloadUrl;
						commonObj.downloadApK();
						addChannelVisitRecordChannel(1)
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
		var channel = rqstParamsObj.channel;
		//addChannelVisitRecord();  //添加渠道访问记录
		addChannelVisitRecordChannel(0)
		receiveObj.pageInit();
		if(channel==undefined||channel==null||channel==""){
			channel = "uc01"
		}
		channelBd = channel.substr(0,5);

		if(channelBd=="baidu"){
			$("#recTxt").html("辽ICP备19005542号 盘锦蓝正科技有限公司");
		}else{
			$("#recTxt").html("辽ICP备19005542号 盘锦蓝正科技有限公司");
		}
	}