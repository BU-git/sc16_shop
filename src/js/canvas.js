
// обявлення змінних
var baseCanvas;
var context;
var baseImgItem;
var viewSide;
var baseProduct;
var eventOb  = new Object();


$(document).ready(function(){
  if(document.getElementById('mainCanvas') && document.getElementById('mainCanvas').getContext){
    
    baseCanvas = document.getElementById('mainCanvas');
    context = baseCanvas.getContext('2d');
    baseImgItem = 'tshirts';
    baseProduct = new Object();
    baseProduct.baseImage = new Image();
  // baseProduct.baseImage.crossOrigin = 'anonymous';

  loadProduct();
  baseProduct.baseImage.onload = function() {
    updateWindow();
  }

// подія зміни вікна браузера
$(window).on('resize' , updateWindow);

// подія вибору основи
$('#basis .basis>li').click(function () {
 fillBackgroundColor();
 baseImgItem = (this).id;
 loadProduct();
 drawImageInCanvas();
})

// завантаження фото
$('#upload-button').click(function(){
  $('#design-upload').click();
  return false;
});
// подія вибору кольору
$('#color li').on('click', changeColor);

$('#frontView').on('click', toFrontView);
$('#backView').on('click', toBackView);


// вибір продукту
function loadProduct() {
 viewSide = clothe[baseImgItem].frontImg;
 baseProduct.color= "white";
 baseProduct.price  = clothe[baseImgItem].price;
 baseProduct.name = clothe[baseImgItem].productName;
 baseProduct.size  = "S";
 baseProduct.manufacturer  = clothe[baseImgItem].manufacturer;
 baseProduct.about  = clothe[baseImgItem].about;
 baseProduct.service  = clothe[baseImgItem].service;
 changePrice();
 changeProductName();
 changeViewButtons() ;
 baseProduct.baseImage.src = viewSide[baseProduct.color];
}

function  changeViewButtons() {

  if(baseImgItem == "peakedcap")
  {
   $('#viewCollapseProduct').css("display" , "none");
 }
 else{
   $('#viewCollapseProduct').css("display" , "block");
   $('#frontView img').attr('src',clothe[baseImgItem].frontImg[baseProduct.color]);
   $('#backView img').attr('src',clothe[baseImgItem].backImg[baseProduct.color]);
 }

}

// перерисовує картинку в canvas
function drawImageInCanvas() {
  sizeBaseImg(baseProduct.baseImage, baseCanvas);
  context.drawImage(baseProduct.baseImage, positionBaseImage(baseProduct.baseImage, baseCanvas).x, positionBaseImage(baseProduct.baseImage, baseCanvas).y, baseProduct.baseImage.width, baseProduct.baseImage.height); 
}

// визначаємо позицію в canvas
function positionBaseImage(img, canvas) {
  var point = new Object();
  point.x = (canvas.width - img.width)/2;
  point.y = (canvas.height - img.height)/2;
  return point;
}

// Очистка canvas
function fillBackgroundColor() {
  context.fillStyle = "white";
  context.fillRect(0, 0 , baseCanvas.width, baseCanvas.height);
}

// визначення ширини і висоти картинки
function sizeBaseImg(img, canvas){
  var ratioSide  = img.width/img.height;
  if (ratioSide < 1) {
    img.width  = ratioSide*canvas.width;
    img.height = canvas.height;
  } else if(ratioSide >=1){
    img.width = canvas.width;
    img.height = canvas.height/ratioSide;
  }
}

// зміна широти і висоти canvas при зміні вікна браузера
function updateWindow() {
 if($(this)[0].innerWidth > 992){
  baseCanvas.width = 0.29*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
  canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.34*baseCanvas.width+"px";
  drawImageInCanvas();
  drawPrintImage();
  setTime()
} else if ($(this)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
  canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.33*baseCanvas.width+"px";
  drawImageInCanvas();
  drawPrintImage();
  setTime();
}    
}

function updateCanvas() {
 if($(window)[0].innerWidth > 992){
  baseCanvas.width = 0.29*$(window)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.33*baseCanvas.width+"px";
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
  drawImageInCanvas();
  drawPrintImage();
} else if ($(window)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(window)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.33*baseCanvas.width+"px";
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
  drawImageInCanvas();
  drawPrintImage();
}    
}

function  setTime() {
 setTimeout(updateCanvas , 1000);
}

// фунція вибору кольору
function changeColor(){
  baseProduct.color = (this).id;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  changeViewButtons();
  drawImageInCanvas();
  console.log(eventOb, eventOb.y);
}

function toFrontView() {
  viewSide = clothe[baseImgItem].frontImg;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  drawImageInCanvas();
}

function toBackView() {
  viewSide = clothe[baseImgItem].backImg;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  drawImageInCanvas();
}

function changePrice() {
  $('#price').html(baseProduct.price + ' ' + "грн");
}
function changeProductName() {
  $('.productName').html(baseProduct.name);
}


var canvas_image = document.getElementById("canvas_image");
var ctx = canvas_image.getContext('2d')
var labelImg;
document.getElementById('design-upload').onchange = function (e) {
  if(window.FileReader) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = function (e) {
     labelImg = new Image;
     labelImg.src = e.target.result;
     labelImg.onload = function() {

      drawPrintImage();           

    };                         
  };
}
else {
  alert('FileReader API is not supported in your browser, please use Firefox, Safari, Chrome or IE10!')
}

};

$('#clear-button').on('click', function  (argument) {
  labelImg = null;
  canvasClear ();
});

function canvasClear () {
  ctx.clearRect(-canvas_image.width, -canvas_image.height, 2*canvas_image.width, 2*canvas_image.height);
} 

function drawPrintImage() {
  if(labelImg){
 paint ();
 }
}

$('#clipart .clipartholder').on('click', function( e ) {
  var src = (e).target.children[0].src;
  labelImg = new Image;
  labelImg.src = src;
   
  labelImg.onload = function() {
    sizeBaseImg(labelImg, canvas_image);
   eventOb.width = labelImg.width;
    eventOb.height = labelImg.height;
    eventOb.X =  positionBaseImage(labelImg, canvas_image).x;
    eventOb.Y = positionBaseImage(labelImg, canvas_image).y;
    drawPrintImage() ;
}
});


$('#canvas_image').on( "mousedown",translateImg);

function  translateImg(e) {
  if(e.offsetX>eventOb.X && e.offsetY>eventOb.Y && e.offsetX<(eventOb.X + eventOb.width) && e.offsetY<(eventOb.Y + eventOb.height))
  {
    $('#canvas_image').mousemove(moveImg);
  }
}

function  moveImg(e) {
 if(e.offsetX>eventOb.X && e.offsetY>eventOb.Y && e.offsetX<(eventOb.X + eventOb.width) && e.offsetY<(eventOb.Y + eventOb.height))
 {
  eventOb.X +=  e.originalEvent.movementX;
  eventOb.Y += e.originalEvent.movementY;
 drawPrintImage();
 borderImg()
 
}else{
 $('#canvas_image').off('mousemove');
}
}

function paint (){
  canvasClear ();
  ctx.lineWidth = 0;
  ctx.drawImage(labelImg, eventOb.X,  eventOb.Y, eventOb.width, eventOb.height);
}

$('#canvas_image').on( "mouseup",stopMoveImg);
function  stopMoveImg(e) {
 $('#canvas_image').off('mousemove');
}

$('#canvas_image').on( "mouseover",function  (e) {
  if(labelImg){
 borderImg();
}else{
   canvasClear ();
}
});

$('#canvas_image').on( "mouseout",function  (e) {
  drawPrintImage();
});

function  borderImg() {
  if(labelImg){
ctx.lineWidth  = 0.3;
ctx.setLineDash([1,1]); 
ctx.lineDashOffset=1;
ctx.strokeRect(eventOb.X,eventOb.Y,eventOb.width,eventOb.height);
}
}


// $('#order').on("click", orderProduct);

// function  orderProduct() {

//  // var data = ctx.getImageData(0,0,canvas_image.width,canvas_image.height);
//  // context.putImageData(data, )

//  var data1 = baseCanvas.toDataURL('image/jpeg');
// console.log(data1);

// var order= new Object();

//       // order.printImg = labelImg.src;
//        order.name = baseProduct.name;
//       order.price = baseProduct.price;
//       order.color = baseProduct.color;
//       order.size = baseProduct.size;
//        localStorage.setItem('Ordered', JSON.stringify(order));


// }

}});



