/************************************************************************
*************************************************************************
@Name :       	jLy1 - jQuery Plugin
@Revison :    	1.0
@Date : 		02/2011
@Author:     	ALPIXEL - (www.myjqueryplugins.com - www.alpixel.fr)
@Support:    	FF, IE7, IE8, MAC Firefox, MAC Safari
@License :		Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php

**************************************************************************
*************************************************************************/
(function($){

	$.jLy1 = {
		defaults: {
			titleLink : 'Get minified URL',
			textLink : 'Minify URL'
		},
		/*****************/
		/** Init Method **/
		/*****************/
		init:function(options) {
			
			opts = $.extend({}, $.jLy1.defaults, options);
			setTop = 38;
			
			/** Add jLy1Box & jLy1Link to the DOM **/
			$.jLy1._constructDom();
			
			/** Show / Hide Link Contanier **/
			jLy1Box.click(function(e){
				e.preventDefault();
				jLy1Link.slideToggle(300);
				$(this).animate({top:setTop},300,function(){
					$(this).toggleClass('jLy1open');
					if(setTop == 38) setTop = 0; else setTop = 38;
				});
			});
			
			$('#jLy1Send').click(function(e){
				e.preventDefault();
			}).one('click',function(e){
				e.preventDefault();
				$(this).remove();
				jLy1Loader.show();
				$.jLy1._sendData();
			});
			
			
			
		},
		
		/** Add jLy1Box & jLy1Link to the DOM **/
		_constructDom:function(){
			jLy1Box = 
			jQuery('<a>',{
				id : 'jLy1',
				href : '',
				title : opts.titleLink
			}).appendTo('body');
			
			jLy1Link = 
			jQuery('<div>',{
				id : 'jLy1Link'
			}).appendTo('body');
			
			jLy1Loader =
			jQuery('<div>',{
				id : 'jLy1Loader',
				html : '<img src="icons/ajax-loader.gif" alt="Loading" />'
			}).appendTo(jLy1Link);
			
			jSendData = 
			jQuery('<a>',{
				id : 'jLy1Send',
				href : '',
				text : opts.textLink
			}).appendTo(jLy1Link);
			
			jLy1Input = 
			jQuery('<input>',{
				id : 'jLy1Input',
				type : 'text'
			}).appendTo(jLy1Link);
			
			
		},
		
		
		/** Send datas to Ly1.fr and get the response **/
		_sendData:function(){
		
			var dataString = 'newURL='+encodeURIComponent(location.href)+'&&action=jLy1';
			var url = 'http://ly1.fr/API/jLy1.php?' + dataString;
			
			jQuery.getJSON(url + "&jsoncallback=?",
			function(data){
				var newUrl = data.newURL;
				
				if(newUrl != "")
				{
					jLy1Loader.remove();
					jLy1Link.animate({width:150}, 200, function(){
						jLy1Input.show().attr('value',newUrl).click(function(e){
							$(this).select();
						});
					});
				}
				else
				{
					alert("An error occured, please retry.");
				}
			});
			return false;
		}
	};

	/** Init method **/
	jLy1 = function(options) {
		console.log(options)
		$.jLy1.init(options);
	};
})(jQuery);