//
function knowTp() {
	location.href = 'indexKnowTpBg.html';

}; //说明
function knowSwitch(num) {
	if(num == 1) {
		var KnowId = $(".indexKnowCard01 div:last").text()

		if(KnowId == "收起") {
			$(".indexKnowCard01 div:last").css("padding-top", "0.38rem");
			$(".indexKnowCard01 div:last").css("position", "absolute");
			$(".indexKnowCard01 div:last").css("background-image", "url(http://qiniuapp.mqkji.cn/indexKnowBg.png)");
			$(".indexKnowCard01 div:last").html("<img src='http://qiniuapp.mqkji.cn/indexKnowDown.png'/>");
			$(".indexKnowCard01").animate({
				height: '2rem'
			});
		} else {
			$(".indexKnowCard01 div:last").css("padding-top", "0.16rem");
			$(".indexKnowCard01 div:last").css("background-image", "none");
			$(".indexKnowCard01 div:last").css("position", "static");
			$(".indexKnowCard01 div:last").html("收起");
			$(".indexKnowCard01").animate({
				height: '4.11rem'
			});
		}

	} else if(num == 3) {
		var KnowId = $(".indexKnowCard03 div:last").text()

		if(KnowId == "收起") {
			$(".indexKnowCard03 div:last").css("padding-top", "0.38rem");
			$(".indexKnowCard03 div:last").css("position", "absolute");
			$(".indexKnowCard03 div:last").css("background-image", "url(http://qiniuapp.mqkji.cn/indexKnowBg.png)");
			$(".indexKnowCard03 div:last").html("<img src='http://qiniuapp.mqkji.cn/indexKnowDown.png'/>");
			$(".indexKnowCard03").animate({
				height: '2rem'
			});
		} else {
			$(".indexKnowCard03 div:last").css("padding-top", "0.16rem");
			$(".indexKnowCard03 div:last").css("position", "static");
			$(".indexKnowCard03 div:last").css("background-image", "none");
			$(".indexKnowCard03 div:last").html("收起");
			$(".indexKnowCard03").animate({
				height: '5.61rem'
			});
		}
	} else if(num == 4) {
		var KnowId = $(".indexKnowCard04 div:last").text()

		if(KnowId == "收起") {
			$(".indexKnowCard04 div:last").css("padding-top", "0.38rem");
			$(".indexKnowCard04 div:last").css("position", "absolute");
			$(".indexKnowCard04 div:last").css("background-image", "url(http://qiniuapp.mqkji.cn/indexKnowBg.png)");
			$(".indexKnowCard04 div:last").html("<img src='http://qiniuapp.mqkji.cn/indexKnowDown.png'/>");
			$(".indexKnowCard04").animate({
				height: '2rem'
			});
		} else {
			$(".indexKnowCard04 div:last").css("padding-top", "0.16rem");
			$(".indexKnowCard04 div:last").css("position", "static");
			$(".indexKnowCard04 div:last").css("background-image", "none");
			$(".indexKnowCard04 div:last").html("收起");
			$(".indexKnowCard04").animate({
				height: '2.96rem'
			});
		}
	} else if(num == 5) {
		var KnowId = $(".indexKnowCard05 div:last").text()

		if(KnowId == "收起") {
			$(".indexKnowCard05 div:last").css("padding-top", "0.38rem");
			$(".indexKnowCard05 div:last").css("position", "absolute");
			$(".indexKnowCard05 div:last").css("background-image", "url(http://qiniuapp.mqkji.cn/indexKnowBg.png)");
			$(".indexKnowCard05 div:last").html("<img src='http://qiniuapp.mqkji.cn/indexKnowDown.png'/>");
			$(".indexKnowCard05").animate({
				height: '2rem'
			});
		} else {
			$(".indexKnowCard05 div:last").css("padding-top", "0.16rem");
			$(".indexKnowCard05 div:last").css("position", "static");
			$(".indexKnowCard05 div:last").css("background-image", "none");
			$(".indexKnowCard05 div:last").html("收起");
			$(".indexKnowCard05").animate({
				height: '8.1rem'
			});
		}
	} else if(num == 6) {
		var KnowId = $(".indexKnowCard06 div:last").text()

		if(KnowId == "收起") {
			$(".indexKnowCard06 div:last").css("padding-top", "0.38rem");
			$(".indexKnowCard06 div:last").css("position", "absolute");
			$(".indexKnowCard06 div:last").css("background-image", "url(http://qiniuapp.mqkji.cn/indexKnowBg.png)");
			$(".indexKnowCard06 div:last").html("<img src='http://qiniuapp.mqkji.cn/indexKnowDown.png'/>");
			$(".indexKnowCard06").animate({
				height: '2rem'
			});
		} else {
			$(".indexKnowCard06 div:last").css("padding-top", "0.16rem");
			$(".indexKnowCard06 div:last").css("position", "static");
			$(".indexKnowCard06 div:last").css("background-image", "none");
			$(".indexKnowCard06 div:last").html("收起");
			$(".indexKnowCard06").animate({
				height: '9.65rem'
			});
		}
	}
};
window.onload = function() {
//	var htmlWidth = document.documentElement.clientWidth;
//	var cilentHeight = document.documentElement.clientHeight; //浏览器可见高度
	var htmlHeight = document.body.scrollHeight; //body高度
//	var dpi = window.devicePixelRatio;
	var htmlWidth = document.body.scrollWidth;
//	alert(htmlWidth)
	var htmlFont = 100 * (htmlWidth / 360); // 10px / 640px * 320px 
	$("html").css("font-size", htmlFont + "px");
	
}