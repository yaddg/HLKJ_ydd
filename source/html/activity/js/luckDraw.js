var playnum = 0;
 $(function() {
    var $btn = $('.g-lottery-img');// 旋转的div
  
    var isture = 0;//是否正在抽奖
    var clickfunc = function() {
    	rotateFunc(1, 0, '恭喜您获得1000元话费');
//    $.ajax({
//			url: hltjbaseObj.memberLotteryDraw,
//			data:{memberId:rqstParamsObj.memberId},
//			type: "POST",
//			dataType:'json',
//			crossDomain: true,
//			success:function(data,status,xhr){
//				console.log(data);
//				if(data.code == 0){
//					data = data.data;
//					id = data.id;
//					switch(id) {
//						case 1:
//						  rotateFunc(1, 0, '恭喜您获得1000元话费');
//						  break;
//						case 2:
//						  rotateFunc(2, 60, '谢谢参与');//恭喜您获得10元话费
//						  break;
//						case 3:
//						  rotateFunc(3, 120, '恭喜您获得8元代金券');
//						  break;
//						case 4:
//						  rotateFunc(4, 180, '恭喜您获得100M流量');
//						  break;
//						case 5:
//						  rotateFunc(5, 240, '恭喜您获得10元话费');
//						  break;
//						case 6:
//						  rotateFunc(6, 300, '恭喜您获得100元代金券');
//						  break;
//					}
//				}else if(data.code == 500){
//					alert(data.desc);
//				}else{
//					alert("系统错误");
//				}
//			},
//			error:function(er){
//				console.log(er);
//				alert("系统错误"+er);
//			}
//		});
    }
    $(".playbtn").click(function() {
	  var isLogin = commonObj.isLogin();
	  if(!isLogin){
		return false;
	  }
      if(isture) return; // 如果在执行就退出
      isture = true; // 标志为 在执行
      if(playnum <= 0) { //当抽奖次数为0的时候执行
		$("#noObtain").css("display","block");
        $('.playnum').html(0);//次数显示为0
        isture = false;
	  } else { //还有次数就执行
        playnum = playnum - 1; //执行转盘了则次数减1
        if(playnum <= 0) {
          playnum = 0;
        }
        $('.playnum').html(playnum);
        clickfunc();
      }
    });
    var rotateFunc = function(awards, angle, text) {
      isture = true;
      $btn.stopRotate();
      $btn.rotate({
        angle: 0,//旋转的角度数
        duration: 4000, //旋转时间
        animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
        callback: function() {
          isture = false; // 标志为 执行完毕
         // alert(text);
		  drawObj.myObtain(text,"恭喜您！");
        }
      });
    };
  });
  
  

var drawObj = {
	init:function(){
		var htmlWidth = document.documentElement.clientWidth;
		var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
		var htmlHeight = document.body.scrollHeight;			//body高度
		var bgimgHeight = $("#bgimg").height();
		
		var bgdivHeight = bgimgHeight - 5;
		$("#bgdiv").css("height",bgdivHeight+"px");  //防点击图片div

		var ruleTop = bgimgHeight - 230;
		$("#rule").css("top",ruleTop+"px");  //规则位置
		
		var tstop =  bgimgHeight - 31;
		$("#bottomTishi").css("top",tstop+"px");  //风险提示位置
		
		var rule_1_top = htmlWidth * 1.37;
		var rule_1_width = htmlWidth - 32;
		$("#rule_1").css("width",rule_1_width+"px");  //规则1位置
		$("#rule_1").css("top",rule_1_top+"px");  //规则1位置
		
		var bottomImgTop = htmlWidth * 1.22;
		var bottomImgLeft = (htmlWidth - 110) / 2;
		$("#bottomImg").css("top",bottomImgTop+"px");  //按钮位置
		$("#bottomImg").css("left",bottomImgLeft+"px");  //按钮位置
		
		var gContentTop =  htmlWidth * 0.4
		$("#g-content").css("top",gContentTop+"px"); 
		
		$("#myRecordDiv").css("height",bgimgHeight+"px");  //设置奖品弹框背景高度
		$("#myObtain").css("height",bgimgHeight+"px");  //设置提示框背景高度
		$("#noObtain").css("height",bgimgHeight+"px");  //设置提示框背景高度
	},
	myRecord : function(){
		 var isLogin = commonObj.isLogin();
		 if(!isLogin){
			return false;
		 }
		$("#myRecordDiv").css("display","block");
		$("#myRecordContent").html("");
		$.ajax({
			url: hltjbaseObj.queryMemberPrizeList,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					var records = data.data;
					for(var i = 0; i < records.length; i++ ){
						var itemStr = '<div class="myRecordItem">成功开启宝箱：'+ records[i] +'</div>';
						$("#myRecordContent").append(itemStr);
					}
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
	myRecordClose:function(){
		$("#myRecordDiv").css("display","none");
	},
	myObtain : function(desc,heci){
		$("#drawDesc").text(desc);
		$("#heci").text(heci);
		$("#myObtain").css("display","block");
	},
	closeObtain : function(){
		$("#myObtain").css("display","none");
	},
	lotteryDrawInfo : function(){//获取用户剩余抽奖次数
//		$.ajax({
//			url: hltjbaseObj.lotteryDrawInfo,
//			data:{memberId:rqstParamsObj.memberId},
//			type: "POST",
//			dataType:'json',
//			crossDomain: true,
//			success:function(data,status,xhr){
//				console.log(data);
//				if(data.code == 0){
//					playnum = data.data; //初始次数，由后台传入
//					$('.playnum').html(playnum);//显示还剩下多少次抽奖机会
//				}else if(data.code == 400){
//					giveObj.setconetnttext(data.desc);
//				}else if(data.code == 500){
//					alert(data.desc);
//				}else{
//					alert("系统错误");
//				}
//			},
//			error:function(er){
//				console.log(er);
//				alert("系统错误"+er);
//			}
//		});
					playnum = 2; //初始次数，由后台传入
					$('.playnum').html(playnum);//显示还剩下多少次抽奖机会
	},
	appRechargeUrl : function(){
		window.location.href = hltjAppObj.appRechargeUrl;
	},
	closeRecharge : function(){
		$("#noObtain").css("display","none");
	}
}


window.onload = function(){
	drawObj.init();
	rqstParamsObj = getTheRequestParams();
	var memberId = rqstParamsObj.memberId;
	console.log(memberId)
	if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){
		drawObj.lotteryDrawInfo();
	}else{
		playnum = 0; //初始次数，由后台传入
		$('.playnum').html(playnum);//显示还剩下多少次抽奖机会 
		//giveObj.setconetnttext("登陆后查看奖励金额");
	}
	

}