
window.onload = function() {
	big();
	flbig_gdtit_r();
	//	$(".swiper-slide").css("margin-right","0");
	$(".swiper-slide").css("text-align", "left");
	//	$(".swiper-slide").css("left","0");
	$(".swiper-slide").css("width", "100%");
	$(".swiper-slide img").css("height", "4.71rem");
	$(".swiper-slide img").css("width", "100%");

}

function big() {
	//	var hwidth = document.documentElement.clientWidth;
	//	(hwidth < 750) ? $('html').css('font-size', hwidth / 15): $('html').css('font-size', 50);

	$('.whapp_dow a').click(function() {
		$('.whapp_low').fadeIn();
	});
	$('.whapp_cole').click(function() {
		$('.whapp_low').fadeOut();
	});
	$('.flbig_gdtit_r').on('click', flbig_gdtit_r);
	$('.flbig_gdtit_l').on('click', flbig_gdtit_l);
	var swiper = new Swiper('.swiper-container', {
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	$(".flbig_top_r,.flbig_fot,.flbig_pl_but").click(function() {
		receiveObj.openApp();
	});

}

function flbig_gdtit_r() {
	$('.flbig_gdtit').addClass('flbig_gdtit2');
	$('.flbig_gdp').addClass('flbig_gdtit2').fadeOut();
	$('.flbig_pl').fadeIn();
	$('.flbig_gdtit_l').css("color", "#333333")
	$('.flbig_gdtit_r').css("color", "#FF6502")
	$('.flbig_gdtit_r').css("border-bottom", "3px solid #FF6502")
	$('.flbig_gdtit_l').css("border-bottom", "none")
}

function flbig_gdtit_l() {
	$('.flbig_gdtit').removeClass('flbig_gdtit2');
	$('.flbig_pl').removeClass('flbig_gdtit2').fadeOut();
	$('.flbig_gdp').fadeIn();
	$('.flbig_gdtit_l').css("color", "#FF6502")
	$('.flbig_gdtit_r').css("color", "#333333")
	$('.flbig_gdtit_l').css("border-bottom", "3px solid #FF6502")
	$('.flbig_gdtit_r').css("border-bottom", "none")
}