	$(document).ready(function(){
		$('ul.tabs').tabs();
		$('.materialboxed').materialbox();
		$(".button-collapse").sideNav();
		$('select').material_select();
		// $("#menu").on("click","a[href*=#]:not([href=#])", function (event) {
		// 	event.preventDefault();
		// 	var id  = $(this).attr('href'),
		// 	top = $(id).offset().top;
		// 	$('body,html').animate({scrollTop: top}, 1500);
		// });
		$('.slider').slider({indicators: false, height: 300, full_width: true});
		$('#next-slider').click(function(){ 
			$('.slider').slider('next');
		}); 
		$('#prev-slider').click(function(){ 
			$('.slider').slider('prev');
		}); 
	});