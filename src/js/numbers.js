
// $(document).ready(function(){
	
// 	var show = true;
// 	var countbox = '#counts';
// 	var page = getElementById('main__page');
// 	$(window).on("scroll load resize", function(){
// 		if (page) return true;
// 		console.log(page);
// 		if (!show) return false;
// 		if ($('#counts')){
// 		var w_top = $(window).scrollTop();
// 		var e_top = $(countbox).offset().top;
// 		var w_height = $(window).height();
// 		var d_height = $(document).height();
// 		var e_height =  $(countbox).outerHeight();
// 		if(w_top + 600>= e_top || w_height + w_top == d_height){
// 			$(".spincrement").spincrement({
// 				thousandSeparator: "",
//                 duration: 2500
// 			});

// 		show = false;

// 		}		
// 		}
// 	});
// });