var memberId = getTheRequestParams().memberId;
var cilentWidth = document.documentElement.clientWidth;
//var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
//var htmlHeight = document.body.scrollHeight; //body高度 
//var htmlWidth = document.body.scrollWidth;

var htmlFont = 100 * (cilentWidth / 360); // 10px / 640px * 320px 
$("html").css("font-size", htmlFont + "px");

//好礼
function knowTp() {
	location.href = '/hltjmobile/source/html/activity/noviceWelfareImg.html';

};
//轮播图
function knowWP() {
	location.href = 'indexWheelPlanting.html';
};
//专家咨询
function myKnowInfor() {
	window.location.href = 'hailang://www.hailang.com/native?name=text_live';
};

//展开
function knowSwitch(num) {
	//	alert(num)
	if(num == 1) {
		var KnowId = $(".indexKnowSpan01").text();

		if(KnowId == "展开") {

			$(".indexKnowSpan01").text("收起");
			$(".indexKnowImg01").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard01").animate({
				maxHeight: '6.8rem'
			});
		} else {

			$(".indexKnowSpan01").text("展开");
			$(".indexKnowImg01").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard01").animate({
				maxHeight: '0.5rem'
			});
		}

	} else if(num == 2) {
		var KnowId = $(".indexKnowSpan02").text();
		
		if(KnowId == "展开") {
			$(".indexKnowSpan02").text("收起");
			$(".indexKnowImg02").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard02").animate({
				maxHeight: '3.5rem'
			});
		} else {
			$(".indexKnowSpan02").text("展开");
			$(".indexKnowImg02").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard02").animate({
				maxHeight: '0.5rem'
			});
		}
	} else if(num == 3) {
		var KnowId = $(".indexKnowSpan03").text();

		if(KnowId == "展开") {

			$(".indexKnowSpan03").text("收起");
			$(".indexKnowImg03").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard03").animate({
				maxHeight: '5.8rem'
			});
		} else {
			
			$(".indexKnowSpan03").text("展开");
			$(".indexKnowImg03").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard03").animate({
				maxHeight: '0.5rem'
			});
		}
	} else if(num == 4) {
		var KnowId = $(".indexKnowSpan04").text();

		if(KnowId == "展开") {

			$(".indexKnowSpan04").text("收起");
			$(".indexKnowImg04").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard04").animate({
				maxHeight: '4.5rem'
			});
		} else {

			$(".indexKnowSpan04").text("展开");
			$(".indexKnowImg04").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard04").animate({
				maxHeight: '0.5rem'
			});
		}
	} else if(num == 5) {
		var KnowId = $(".indexKnowSpan05").text();

		if(KnowId == "展开") {

			$(".indexKnowSpan05").text("收起");
			$(".indexKnowImg05").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard05").animate({
				maxHeight: '9rem'
			});
		} else {

			$(".indexKnowSpan05").text("展开");
			$(".indexKnowImg05").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard05").animate({
				maxHeight: '0.5rem'
			});
		}
	} else if(num == 6) {
		var KnowId = $(".indexKnowSpan06").text();

		if(KnowId == "展开") {

			$(".indexKnowSpan06").text("收起");
			$(".indexKnowImg06").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackDown.png");
			$(".indexKnowCard06").animate({
				maxHeight: '16rem'
			});
		} else {

			$(".indexKnowSpan06").text("展开");
			$(".indexKnowImg06").attr("src","http://qiniuapp.mqkji.cn/novTraCanpackUp.png");
			$(".indexKnowCard06").animate({
				maxHeight: '0.5rem'
			});
		}
	}
};
window.onload = function() {

	$(".headTopWP").on("click", knowWP);
	$(".headTopGM").on("click", knowTp);
	$(".ConsFloat").on("click", myKnowInfor);
}