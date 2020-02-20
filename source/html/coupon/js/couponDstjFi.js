	var rqstObj = null; //参数
	var channel = null; //参数 渠道  
	var receiveObj = {
		isopen: false,
		receive: function() {
			var receiveBox = $("#receiveBox").css("display");
			if(receiveBox == "block") {
				$("#receiveBox").css("display", "none");
			} else {
				$("#receiveBox").css("display", "block");
			}

		},
		openApp: function() {

			if(receiveObj.isWeiXin()) { //如果是微信直接跳转到应用市场
				receiveObj.receive();
			} else {
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = hltjAppObj.openUrl;
				document.body.appendChild(iframe);
				var u = navigator.userAgent;
				var last = Date.now();
				var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
				setTimeout(function() {
					if(Date.now() - last < 2000) {
						receiveObj.downloadAppNum(1);
						commonObj.downloadApK();
					}
				}, 1000);
			}
		},
		downloadAppNum: function(num) {
			$.ajax({
				url: hltjbaseObj.addVisitRecordUrl,
				data: {
					channel: channel,
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
		},
		isWeiXin: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			//alert(ua);
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		}
	}

	window.onload = function() {
		var channel = getTheRequestParams().channel;
		rqstParamsObj = getTheRequestParams(); //加载页面参数 
		receiveObj.downloadAppNum(0);
		if(channel==undefined||channel==null||channel==""){
			channel = "uc01"
		}
	}