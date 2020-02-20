	var rqstObj = null; //参数
	var channel = null; //参数 渠道
	//秘钥key
	var key = "hQNbJaPQIYDI64RgVQZKRryz";
	//key不足24位自动以0(最小位数是0)补齐,如果多余24位,则截取前24位,后面多余则舍弃掉
	var base64 = CryptoJS.enc.Utf8.parse(key)
		//获取文章详情
	function loadArticleDetail() {
		var id = rqstObj.id;
		$.ajax({
			url: hltjbaseObj.articleDetailUrl,
			data: {
				id: id
			},
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
//					var decrypt = CryptoJS.TripleDES.decrypt(data.data, base64, {
//						iv: '',
//						//mode: CryptoJS.mode.CBC,
//						mode: CryptoJS.mode.ECB,
//						padding: CryptoJS.pad.Pkcs7
//					});
//
//					//解析数据后转为UTF-8
//					var parseData = decrypt.toString(CryptoJS.enc.Utf8);
//					//console.log(parseData)
//					var resultobj = $.parseJSON(parseData);
					var resultobj = data.data;
					console.log(resultobj)
						//alert();
					$("#articleDetail").html(resultobj.content);
//					$("#authorImg").attr("src", resultobj.avatar);
					$("#authorTitle").text(resultobj.title);
					var authorTime = "阅读&nbsp;"+resultobj.visitNum + "&nbsp;&nbsp;&nbsp;&nbsp;"+ resultobj.createTime;
					$("#authorTime").html(authorTime);
					var marketView;
					var authorType;
					if(resultobj.marketView == 1){
						//看涨
						marketView="看涨&nbsp;"+"<img src='http://qiniuapp.mqkji.cn/detailUp.png'/>";
						authorType = resultobj.typeName + "&nbsp;&nbsp;&nbsp;&nbsp;"+ marketView;
						$("#authorType").css("color","#FF424A");
					}else if(resultobj.marketView == 2){
						//看跌
						marketView="看跌&nbsp;"+"<img src='http://qiniuapp.mqkji.cn/detailDown.png'/>" ;
						authorType = resultobj.typeName + "&nbsp;&nbsp;&nbsp;&nbsp;"+ marketView;
						$("#authorType").css("color","#0CB46A");
					}
					
					$("#authorType").html(authorType);
					if(resultobj.subtitle == null || resultobj.subtitle == undefined || resultobj.subtitle == ""){
						$(".authorPro").text("");
					}else{
						$(".authorPro").text("分析师建议：");
					}
					$("#authorTxt").text(resultobj.subtitle);
					
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

	//获取文章评论
	function loadArticleCommentList() {
		var id = rqstObj.id;
		$.ajax({
			url: hltjbaseObj.articleCommentListUrl,
			data: {
				articleId: id,
				row: 1,
				pageSize: 10
			},
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var commentList = data.data;
					for(var i = 0; i < commentList.length; i++) {
						var commentItem = commentList[i];

						var replyList = commentItem.replyResultVos;
						var itemStr = '<div class="commentItem">';
						itemStr += '<img  class="commentImg" src="' + commentItem.memberHeadImg + '"/>';
						itemStr += '<div  class="memberNickName">' + commentItem.memberNickName + '</div>';
						itemStr += '<div  class="commentCreateTime">' + commentItem.createTime + '</div>';
						itemStr += '<div  class="commentContent">' + commentItem.detail + '</div>';
						if(replyList.length > 0) {

							for(var j = 0; j < replyList.length; j++) {
								var replyItem = replyList[j];
								itemStr += '<div  class="commentReplyDiv">';
								itemStr += '	<div class="commentReplyItem">';
								itemStr += '		<label class="replyMember" >' + replyItem.replyMemberNickName + '</label>回复<label class="replyToMember" >' + replyItem.replyToMemberNickName + '</label>:<label class="replyContent" >' + replyItem.replyContent + '</label>';
								itemStr += '	</div>';
								itemStr += '</div>';
							}

						}
						itemStr += '</div>';
						if(i < (commentList.length - 1)) {
							itemStr += '<div class="line"></div>';
						}

						//alert(itemStr);
						$("#commentDiv").append(itemStr);
					}
					//alert();

				} else if(data.code == 500) {

				} else {
					//alert("获取文章评论出错");
				}
			},
			error: function(er) {
				console.log(er);
				alert("获取文章评论出错" + er);
			}
		});
	}

	function downloadAppr() {
		window.location.href = hltjAppObj.downloadUrl;
	}

	window.onload = function() {
		rqstObj = getTheRequestParams();
		loadArticleDetail();
		//loadArticleCommentList();
	}