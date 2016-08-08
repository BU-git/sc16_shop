
// $(document).ready(function(){
// 	var show = true;
// 	var countbox = "#counts";
// 	$(window).on("scroll load resize", function(){
// 		if (!show) return false;

// 		var w_top = $(window).scrollTop();
// 		var e_top = $(countbox).offset().top;
// 		var w_height = $(window).height();
// 		var d_height = $(document).height();
// 		var e_height =  $(countbox).outerHeight();
// 		console.log(w_top + 400 + " " + e_top);
// 		if(w_top + 660>= e_top || w_height + w_top == d_height){
// 			$(".spincrement").spincrement({
// 				thousandSeparator: "",
//                 duration: 3000
// 			});

// 		show = false;

// 		}		
// 	});

// })