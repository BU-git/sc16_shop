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
			var img = new Image;
			img.src = e.target.result;
			img.onload = function() {
				resizeImage(img);						
			    	
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

function resizeImage(img) {
	var maxWidth = canvas_image.width ; // Max width for the image
               var maxHeight = canvas_image.height;    // Max height for the image
               var ratio = 0;  // Used for aspect ratio
               var image_width = img.width;    // Current image width
               var image_height = img.height;
                 if(image_width > maxWidth){
                   ratio = maxWidth / image_width;   // get ratio for scaling image
                   $(img).css("width", maxWidth); // Set new width
                   $(img).css("height", image_height * ratio);  // Scale height based on ratio
                   image_height = image_height * ratio;    // Reset height to match scaled image
                   image_width = image_width * ratio;    // Reset width to match scaled image
                   ctx.drawImage(img, 0, 0, image_width, image_width);
                    
                   }
               if(image_height > maxHeight){
                   ratio = maxHeight / image_height; // get ratio for scaling image
                   $(img).css("height", maxHeight);   // Set new height
                   $(img).css("width", image_width * ratio);    // Scale width based on ratio
                   image_width = image_width * ratio;    // Reset width to match scaled image
                   image_height = image_height * ratio;    // Reset height to match scaled image
                   ctx.drawImage(img, 0, 0, image_width, image_width);
                    
                   }		
}