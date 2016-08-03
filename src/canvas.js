var baseCanvas;
var context;
var baseImage;
var clipart


$(document).ready(function(){
  baseCanvas = document.getElementById("mainCanvas");
  
  context = mainCanvas.getContext('2d');
  baseImage = new Image();

  baseImage.src = "src/images/comments-1.png";
  baseImage.onload = function() {
  doSomethingUseful();
   baseImage.src = "src/images/green.png";
 context.drawImage(baseImage, 50, 50, 150, 150); 
 }


 $(window).resize(doSomethingUseful);

 $('#basis img').click(function () {
   fillBackgroundColor();
   baseImage.src = (this).src;
   drawImageInCanvas();
 })


// перерисовує картинку в canvas
function drawImageInCanvas() {
  sizeBaseImg();
  context.drawImage(baseImage, positionBaseImage(baseImage).x, positionBaseImage(baseImage).y, baseImage.width, baseImage.height); 
}

// визначаємо позицію в canvas
function positionBaseImage(img) {
  var point = new Object();
  point.x = (baseCanvas.width - img.width)/2;
  point.y = (baseCanvas.height - img.height)/2;
  return point;
}

// Очистка canvas
function fillBackgroundColor() {
  context.fillStyle = "red";
  context.fillRect(0, 0 , baseCanvas.width, baseCanvas.height);
}

// визначення ширини і висоти картинки
function sizeBaseImg(){
  var ratioSide  = baseImage.width/baseImage.height;
  if (ratioSide < 1) {
    baseImage.width  = ratioSide*mainCanvas.width;
    baseImage.height = mainCanvas.height;
  } else if(ratioSide >=1){
    baseImage.width = mainCanvas.width;
    baseImage.height = ratioSide*mainCanvas.height;
  }
}

// зміна широти і висоти canvas при зміні вікна браузера
function doSomethingUseful() {
 if($(this)[0].innerWidth > 992){
  baseCanvas.width = 0.3*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
} else if ($(this)[0].innerWidth <= 992){
  baseCanvas.width = 0.8*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
}    
}


});
