
// обявлення змінних
var baseCanvas;
var context;
var baseImgItem;
var viewSide;
var baseProduct;



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

if(baseImgItem == "peakedcap")
{
   $('#viewCollapseProduct').css("display" , "none");
}
else{
   $('#viewCollapseProduct').css("display" , "block");
   $('#frontView img').attr('src',clothe[baseImgItem].frontImg[baseProduct.color]);
  $('#backView img').attr('src',clothe[baseImgItem].backImg[baseProduct.color]);
}

  
   baseProduct.baseImage.src = viewSide[baseProduct.color];
}

// перерисовує картинку в canvas
function drawImageInCanvas() {
  sizeBaseImg();
  context.drawImage(baseProduct.baseImage, positionBaseImage(baseProduct.baseImage).x, positionBaseImage(baseProduct.baseImage).y, baseProduct.baseImage.width, baseProduct.baseImage.height); 
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
  context.fillStyle = "white";
  context.fillRect(0, 0 , baseCanvas.width, baseCanvas.height);
}

// визначення ширини і висоти картинки
function sizeBaseImg(){
  var ratioSide  = baseProduct.baseImage.width/baseProduct.baseImage.height;
  if (ratioSide < 1) {
    baseProduct.baseImage.width  = ratioSide*baseCanvas.width;
    baseProduct.baseImage.height = baseCanvas.height;
  } else if(ratioSide >=1){
    baseProduct.baseImage.width = baseCanvas.width;
    baseProduct.baseImage.height = ratioSide*baseCanvas.height;
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
  resizeImage(labelImg);
  setTime()
} else if ($(this)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
 canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.33*baseCanvas.width+"px";
  drawImageInCanvas();
  resizeImage(labelImg);
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
  resizeImage(labelImg);
} else if ($(window)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(window)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  canvas_image.style.top  = 0.22*baseCanvas.width +"px";
  canvas_image.style.left  = 0.33*baseCanvas.width+"px";
  canvas_image.width = 0.32*baseCanvas.width;
  canvas_image.height = 0.32*baseCanvas.width;
  drawImageInCanvas();
  resizeImage(labelImg);
}    
}

function  setTime() {
 setTimeout(updateCanvas , 1000);
}

// фунція вибору кольору
function changeColor(){
  baseProduct.color = (this).id;
  baseProduct.baseImage.src = viewSide[baseProduct.color];
  drawImageInCanvas();
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
  // var d = baseProduct.name;
  $('.productName').html(baseProduct.name);
}

//upload image

//upload image
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
        resizeImage(labelImg);           
            
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
  if(img){
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
}

$('#order').on("click", orderProduct);

function  orderProduct() {

 // var data = ctx.getImageData(0,0,canvas_image.width,canvas_image.height);
 // context.putImageData(data, )

 var data1 = baseCanvas.toDataURL('image/jpeg');
console.log(data1);
 
var order= new Object();

      // order.printImg = labelImg.src;
       order.name = baseProduct.name;
      order.price = baseProduct.price;
      order.color = baseProduct.color;
      order.size = baseProduct.size;
       localStorage.setItem('Ordered', JSON.stringify(order));

   
}

}});



