$(document).ready(function(){



$ ('#clipart img').on('click', loading);
var CANVAS = document.getElementById('ctx');
var context = CANVAS.getContext('2d');

function loading (){
	var src = (this).src;
	var img = new Image();
	img.src = src;
	context.drawImage(img, 0, 0 , CANVAS.width, CANVAS.height);
} ;
});