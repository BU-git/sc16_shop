
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
    baseProduct.baseImage.crossOrigin = 'anonymous';

  loadProduct();
  baseProduct.baseImage.onload = function() {
    updateWindow();
  }

// подія зміни вікна браузера
$(window).on('resize' , updateWindow);

// подія вибору основи
$('#basis .basis img').click(function () {
 $('#basis .basis img').removeClass('basis-hover-active');
 $(this).addClass('basis-hover-active');
 firstLoadProduct();
 fillBackgroundColor();
 baseImgItem = (this).id;
 loadProduct();
 drawImageInCanvas();
})


function firstLoadProduct(){
  $('#clipart .clipartholder').removeClass('view-basis-active');
  $('#frontView').addClass('view-basis-active');
  $('#backView').removeClass('view-basis-active');
 //    $('#choiceSize a').removeClass('choice-size-active');
 // $('#choiceSize a:first').addClass('choice-size-active');
}


// завантаження фото
$('#upload-button').click(function(){
  $('#design-upload').click();
  return false;
});
// подія вибору кольору
$('#colorClothe li').on('click', changeColor);

$('#choiceSize a').on('click', changeSize);

function changeSize() {
  baseProduct.size = (this).innerHTML;
   $('#choiceSize a').removeClass('choice-size-active');
 $(this).addClass('choice-size-active');
}

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
  if(baseImgItem == "peakedcap" || baseImgItem == "w_peakedcap")
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
  updateCanvas();
  setTimeout(updateCanvas , 1000);
} else if ($(this)[0].innerWidth <= 992){
  updateCanvas();
  setTimeout(updateCanvas , 1000);
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

// фунція вибору кольору
function changeColor(){
  baseProduct.color = (this).id;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  changeViewButtons();
  drawImageInCanvas();
}

function toFrontView() {
   $('#viewCollapseProduct .view-basis-active').removeClass('view-basis-active');
  $(this).addClass('view-basis-active');
  viewSide = clothe[baseImgItem].frontImg;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  drawImageInCanvas();
}

function toBackView() {
  $('#viewCollapseProduct .view-basis-active').removeClass('view-basis-active');
   $(this).addClass('view-basis-active');
  viewSide = clothe[baseImgItem].backImg;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  drawImageInCanvas();
}

function changePrice() {
  $('#price').html(baseProduct.price + ' ' + "грн");
}

function changeProductName() {
  $('.productName').html(baseProduct.name);
  $('.manufacturer').html(baseProduct.manufacturer);
  $('.service').html(baseProduct.service);
  $('.about_product').html(baseProduct.about);
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
      sizeBaseImg(labelImg, canvas_image);
      eventOb.width = labelImg.width;
      eventOb.height = labelImg.height;
      eventOb.X =  positionBaseImage(labelImg, canvas_image).x;
      eventOb.Y = positionBaseImage(labelImg, canvas_image).y;
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
  var color = context.getImageData((canvas_image.style.left).split('px')[0], (canvas_image.style.top).split('px')[0], canvas_image.width, canvas_image.height);
  ctx.putImageData(color, 0, 0);
} 

function drawPrintImage() {
  if(labelImg){
   canvasClear ();
  ctx.lineWidth = 0;
  ctx.drawImage(labelImg, eventOb.X,  eventOb.Y, eventOb.width, eventOb.height);
 }
}

$('#clipart .clipartholder').on('click', function( e ) {
  $('#clipart .clipartholder').removeClass('view-basis-active');
  $(this).addClass('view-basis-active');
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
  if(e.offsetX > (eventOb.X + eventOb.width-5) && e.offsetY>(eventOb.Y + eventOb.height -5)&& e.offsetX<(eventOb.X + eventOb.width+5) && e.offsetY<(eventOb.Y + eventOb.height+5)){
      $('#canvas_image').on('mousemove',resizeImg);
  }else  if(e.offsetX>eventOb.X && e.offsetY>eventOb.Y && e.offsetX<(eventOb.X + eventOb.width) && e.offsetY<(eventOb.Y + eventOb.height))
  {
    $('#canvas_image').on('mousemove',moveImg);
  }
}

function  moveImg(e) {
 if(e.offsetX>eventOb.X && e.offsetY>eventOb.Y && e.offsetX<(eventOb.X + eventOb.width) && e.offsetY<(eventOb.Y + eventOb.height))
 {
  eventOb.X +=  e.originalEvent.movementX;
  eventOb.Y += e.originalEvent.movementY;
  drawPrintImage();
  borderImg();
}
else{
 $('#canvas_image').off('mousemove', moveImg);
}
}

function resizeImg(e) {
  var ratio = eventOb.height/eventOb.width;
  eventOb.width +=  e.originalEvent.movementX;
  eventOb.height = ratio*eventOb.width;
  canvas_image.style.cursor = "nw-resize";
  drawPrintImage();
  borderImg();
}


$('#canvas_image').mousemove(cursorView);
  function cursorView(e) {
    if(e.offsetX > (eventOb.X + eventOb.width-5) && e.offsetY>(eventOb.Y + eventOb.height -5)&& e.offsetX<(eventOb.X + eventOb.width+5) && e.offsetY<(eventOb.Y + eventOb.height+5)){
     canvas_image.style.cursor = "nw-resize";
    } else if(e.offsetX>eventOb.X && e.offsetY>eventOb.Y && e.offsetX<(eventOb.X + eventOb.width) && e.offsetY<(eventOb.Y + eventOb.height)){ 
    canvas_image.style.cursor = "move";
  } else{
     canvas_image.style.cursor = "default";
  }
}

$('#canvas_image').on( "mouseup",stopMoveImg);
function  stopMoveImg() {
  $('#canvas_image').off('mousemove', moveImg);
  $('#canvas_image').off('mousemove',resizeImg);
}

$('#canvas_image').on( "mouseover",function  (e) {
  if(labelImg){
 borderImg();
}
else{
   canvasClear ();
}});

$('#canvas_image').on( "mouseout",function  (e) {
  drawPrintImage();
});

function  borderImg() {
  if(labelImg){
ctx.lineWidth  = 0.5;
ctx.setLineDash([1,1]); 
ctx.lineDashOffset=1;
ctx.strokeRect(eventOb.X,eventOb.Y,eventOb.width, eventOb.height);

ctx.strokeRect((eventOb.X + eventOb.width-10),(eventOb.Y + eventOb.height -10), 15,15);
}}


$('#order').on("click", orderProduct);

function  orderProduct() {
  if(labelImg){
      var color = ctx.getImageData(0, 0, canvas_image.width, canvas_image.height);
      context.putImageData(color, ((canvas_image.style.left).split('px')[0] ), ((canvas_image.style.top).split('px')[0]) );
      var order= new Object();
      order.printImg = labelImg.src;
      order.baseImg = baseCanvas.toDataURL("image/svg", 1.0);
      order.name = baseProduct.name;
      order.price = baseProduct.price;
      order.color = document.getElementById(baseProduct.color).lastChild.src;
      order.size = baseProduct.size;
      localStorage.setItem('Ordered', JSON.stringify(order));
}
}

}});

restoreOrderedProduct();
function  restoreOrderedProduct() {
var restoredSession = JSON.parse(localStorage.getItem('Ordered'));
  if (restoredSession != null && document.getElementById('productOrderedName')) {
    var size = document.getElementById('productOrderedSize');
    size.innerHTML =restoredSession.size;
    var productOrderedName = document.getElementById('productOrderedName');
    productOrderedName.innerHTML = restoredSession.name;
    var image = document.getElementById('productOrderedImage');
    image.src = restoredSession.baseImg;
    var color = document.getElementById('productOrderedColor');
    color.src = restoredSession.color;
     var amount = document.getElementById('productOrderedAmount');
    amount.innerHTML  = restoredSession.price +' ' + 'грн';
  }
}