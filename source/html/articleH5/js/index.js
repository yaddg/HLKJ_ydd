	var rqstObj = null; //参数
	var channel = null; //参数 渠道
	//秘钥key
	var key = "hQNbJaPQIYDI64RgVQZKRryz";
	//key不足24位自动以0(最小位数是0)补齐,如果多余24位,则截取前24位,后面多余则舍弃掉
	var base64 = CryptoJS.enc.Utf8.parse(key)
		//获取文章列表
	function loadArticleList() {
		//var id = rqstObj.id;
		$.ajax({
			url: "http://n.mqkji.cn/hltj-api/api/article/list",
			data: {
				type: "9",
				row: "1",
				pageSize: "5"
			},
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var decrypt = CryptoJS.TripleDES.decrypt(data.data, base64, {
						iv: '',
						//mode: CryptoJS.mode.CBC,
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.Pkcs7
					});

					//解析数据后转为UTF-8
					var parseData = decrypt.toString(CryptoJS.enc.Utf8);
					//console.log(parseData)
					var resultobj = $.parseJSON(parseData);
					//var resultobj = data.data;
					//console.log(resultobj)
					for(var i = 0; i < resultobj.length; i++) {
						var commentItem = resultobj[i];
						var createDate = timestampToTime(commentItem.createTime, 1); //日期
						var createTime = timestampToTime(commentItem.createTime, 2); //时间
						
						var marketView;
						var authorType;
						if(commentItem.marketView == 1) {
							//看涨
							marketView = "看涨&nbsp;" + "<img src='http://qiniuapp.mqkji.cn/detailUp.png'/>";
							authorType = '<p class="comRed">'+commentItem.typeName + "&nbsp;&nbsp;&nbsp;&nbsp;" + marketView+ '</p>';
							//$("#authorType").css("color", "#FF424A");
						} else if(commentItem.marketView == 2) {
							//看跌
							marketView = "看跌&nbsp;" + "<img src='http://qiniuapp.mqkji.cn/detailDown.png'/>";
							authorType = '<p class="comBlue">'+commentItem.typeName + "&nbsp;&nbsp;&nbsp;&nbsp;" + marketView + '</p>';
							//$("#authorType").css("color", "#0CB46A");
						}
						console.log(authorType)
						var itemStr = '<li><div class="comData" onclick="appNow()">';
						itemStr += '<p>' + createDate + '</p><p>' + createTime + '</p>';
						itemStr += '</div>';
						itemStr += '<div class="comTxt" onclick="pageNext('+commentItem.id+')">';
						itemStr += '<p>' + commentItem.title + '</p>' + authorType + '<p>' + commentItem.subtitle + '</p>';

						itemStr += '</div></li>';
						//						if(i < (commentList.length - 1)) {
						//							itemStr += '<div class="line"></div>';
						//						}
						$("#commentUl").append(itemStr);
					}

				} else {
					alert("获取文章详情出错");
				}
			},
			error: function(er) {
				console.log(er);
				alert("获取文章详情出错" + er);
			}
		});
	}

	function downloadAppr() {
		window.location.href = hltjAppObj.downloadUrl;
	}

	window.onload = function() {
		rqstObj = getTheRequestParams();
//		var token = rqstObj.token;
//		if(token!=undefined && token!=null && token!=""){
//			$("#articleSpan").text(token);
//		}
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight; //body高度
		htmlFont = 100 * (htmlWidth / 360); // 10px / 640px * 320px 
		$("html").css("font-size", htmlFont + "px");
		//$(".conetnt").css("height", myObtainHeight + "px");
		//$(".comData").css("height", htmlWidth*0.12 + "px");

		//$("#articleDetail").attr("onclick", "appNow()");

		//loadArticleDetail();
		loadArticleList();
		//loadArticleCommentList();
	}
	
	function pageNext(num) {
		window.location.href = 'detail.html?id='+num+'&from=groupmessage';
	}
	function appNow() {
//		console.log("9999")
//		window.location.href = 'hailang://www.hailang.com/native?name=login';
	}
	
	function timeStamp(data) {
		var date = new Date(data);
		// 有三种方式获取
		//var time1 = date.getTime();
		//var time2 = date.valueOf();
		var time3 = Date.parse(date);
		//console.log(time1); //1398250549123
		//console.log(time2); //1398250549123
		console.log(time3); //1398250549000
		return time3;
	}

	function timestampToTime(dast, num) {
		var dastI = dast.replace(/-/g,'/')
		var dateS = new Date(dastI);
		//alert(dateS)
		var timestamp = Date.parse(dateS);
		
		console.log(timestamp)
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes();
		var s = date.getSeconds();
		if(num == 1) {
			return M + D;
		} else if(num == 2) {
			return h + m;
		}

	}