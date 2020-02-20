var giveObj = {
	init:function(){ 
		var bgimgHeight = $("#bgimg").height(); 
		var bgdivHeight = bgimgHeight - 5;
		$("#bgdiv").css("height",bgdivHeight+"px");  //防点击图片div


		var bottomImgTop = htmlWidth * 0.56;
		var bottomImgLeft = (htmlWidth - 240) / 2;
		$("#bottomImg").css("top",bottomImgTop+"px");  //按钮位置
		$("#bottomImg").css("left",bottomImgLeft+"px");  //按钮位置
		
		var huodetop = htmlWidth * 0.75;
		
		$(".huode").css("top",huodetop +"px");
		
		var but_widht = htmlWidth * 0.14;
	
		var but_left  = htmlWidth * 0.73;
		var but_top_1 = htmlWidth * 1.02;
		var but_top_2 = htmlWidth * 1.102;
		var but_top_3 = htmlWidth * 1.187;
		var but_top_4 = htmlWidth * 1.268;
		var but_top_5 = htmlWidth * 1.35;
		
		var bgvar_1 = 'url(../../images/activity/big_coupon_stauts1.png)';
		
		$(".but").css("width",but_widht  +"px");
		$(".but").css("height",but_widht +"px");
		$(".but").css("left",but_left + "px");  //状态背景
		
		$("#but_1").css("top",but_top_1 + "px");  //状态背景
		$("#but_1").css("background-image",bgvar_1);  //状态背景
		
		$("#but_2").css("top",but_top_2 + "px");  //
		$("#but_2").css("background-image",bgvar_1);  //状态背景

		
		$("#but_3").css("top",but_top_3 + "px");  //
		$("#but_3").css("background-image",bgvar_1);  //状态背景
		
		
		$("#but_4").css("top",but_top_4 + "px");  //
		$("#but_4").css("background-image",bgvar_1);  //状态背景

		
		$("#but_5").css("top",but_top_5 + "px");  //
		$("#but_5").css("background-image",bgvar_1);  //状态背景
		
		
		

		
	},
	setconetnttext:function(content){//设置描述内容
		$("#conetnt").text(content);
	},
	addFullGive:function(){
		 var isLogin = commonObj.isLogin();
		 if(!isLogin){
			return false;
		 }
		//根据用户id获取奖励信息
		$.ajax({
			url: hltjbaseObj.joinDayActivity,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					$("#bottomImg").css("background-image",'url(../../images/activity/big_coupon_but3.png)');
					$("#bottomImg").attr("onclick",'function(){ }');
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
	getMemberInfo:function(){
		//alert(hltjbaseObj.bigCouponInfo);
		//根据用户id获取奖励信息
		$.ajax({
			url: hltjbaseObj.bigCouponInfo,
			data:{memberId:rqstParamsObj.memberId},
			type: "POST",
			dataType:'json',
			crossDomain: true,
			success:function(data,status,xhr){
				console.log(data);
				if(data.code == 0){
					data = data.data;
					//$("#bottomImg").css("background-image",'url(../../images/activity/fullGive_involved.png)');
					//$("#bottomImg").attr("onclick",'function(){alert("已参与活动");}');
					//var couponMoney = data.count * 100;
					//var descStr = '您当前累计投资额度为:'+ data.transactionMoney +'元，已获得代金券奖励：'+ couponMoney +'元';
					//giveObj.setconetnttext(descStr);   "couponDay": 56, "sumCoupon": 56, 
					var bgvar_1 = 'url(../../images/activity/big_coupon_stauts2.png)';
					if(data.typeOne == 1){
						$("#but_1").css("background-image",bgvar_1);  //状态背景
					}
					if(data.typeTwo == 1){
						$("#but_2").css("background-image",bgvar_1);  //状态背景
					}
					if(data.typeThree == 1){
						$("#but_3").css("background-image",bgvar_1);  //状态背景
					}
					if(data.typeFour == 1){
						$("#but_4").css("background-image",bgvar_1);  //状态背景
					}
					if(data.typeFive == 1){
						$("#but_5").css("background-image",bgvar_1);  //状态背景
					}
					var bottomImgsrc = 'url(../../images/activity/big_coupon_but'+ data.status +'.png)';
					//alert(bottomImgsrc);
					$("#bottomImg").css("background-image",bottomImgsrc);  //状态背景
					
					if(data.status == 2){
						$("#bottomImg").attr("onclick","giveObj.addFullGive()");
					}
					
					$("#thisday").text(data.couponDay);
					$("#sumday").text(data.sumCoupon);
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
	}
}

window.onload = function(){
		giveObj.init();
		rqstParamsObj = getTheRequestParams();
		var memberId = rqstParamsObj.memberId;
		if(memberId != 'undefined' && memberId != null && memberId != 'null' && memberId.length > 0){
			giveObj.getMemberInfo();
		}else{
			rqstParamsObj.memberId = null;
		}
}
