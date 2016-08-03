$('#upload-button').click(function(){
				$('#design-upload').click();
				return false;
});

//upload image
var canvas_image = document.getElementById("canvas_image");
var ctx = canvas_image.getContext('2d')
document.getElementById('design-upload').onchange = function (e) {
	if(window.FileReader) {
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]); 
		reader.onload = function (e) {
			var image = new Image;
			image.src = e.target.result;
			image.onload = function() {
						 
ctx.drawImage(image, 0, 0);		
						
			    		
			    };	    		               
			};
		}
	else {
		alert('FileReader API is not supported in your browser, please use Firefox, Safari, Chrome or IE10!')
	}
	
};

$('#clear-button').on('click', canvasClear);
function canvasClear () {
	ctx.clearRect(0, 0, canvas_image.width, canvas_image.height);
} 

