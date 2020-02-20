	var rqstObj = null; //参数
	var channel = null; //参数 渠道

	//获取bbs详情
	function loadBbsDetail() {
		var id = rqstObj.id;
		//alert(hltjbaseObj.bbsDetailUrl);
		$.ajax({
			url: hltjbaseObj.bbsDetailUrl,
			data: {
				id: id
			},
			type: "GET",
			dataType: 'json',
			success: function(data, status, xhr) {
				console.log(data);
				if(data.code == 0) {
					var resultobj = data.data;
					//alert(resultobj.images.split(",").length);
					var images = resultobj.images.split(",");
					//alert(resultobj.content);
					var bbscontent = resultobj.content;
					//var imgsStr = "";
					for(var i = 0; i < images.length; i++) {
						bbscontent += '<img src="' + images[i] + '"/>';
					}

					$("#articleDetail").html(bbscontent);
					$("#authorImg").attr("src", resultobj.memberHeadImg);
					$("#authorNikename").text(resultobj.nickname);
					$("#createTime").text(resultobj.createTime);
				} else {
					alert("获取bbs详情出错");
				}
			},
			error: function(er) {
				console.log(er);
				alert("获取bbs详情出错" + er);
			}
		});
	}

	//获取bbs评论
	function loadBbsCommentList() {
		var id = rqstObj.id;
		$.ajax({
			url: hltjbaseObj.bbsCommentListUrl,
			data: {
				bbsId: id,
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
						//alert(commentItem.replyRsultVos);
						var replyList = commentItem.replyRsultVos;
						var itemStr = '<div class="commentItem">';
						itemStr += '<img  class="commentImg" src="' + commentItem.memberHeadImg + '"/>';
						itemStr += '<div  class="memberNickName">' + commentItem.nickname + '</div>';
						itemStr += '<div  class="commentCreateTime">' + commentItem.createTime + '</div>';
						itemStr += '<div  class="commentContent">' + commentItem.detail + '</div>';
						if(replyList.length > 0) {

							for(var j = 0; j < replyList.length; j++) {
								var replyItem = replyList[j];
								itemStr += '<div  class="commentReplyDiv">';
								itemStr += '	<div class="commentReplyItem">';
								itemStr += '		<label class="replyMember" >' + replyItem.replynickname + '</label>回复<label class="replyToMember" >' + replyItem.replyToNickname + '</label>:<label class="replyContent" >' + replyItem.replyContent + '</label>';
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
					//alert("获取bbs评论出错");
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
		loadBbsDetail();
		loadBbsCommentList();
	}