
// ініціалізація змінних
var baseCanvas;
var context;
var baseImgItem = 'tshirts';
// var baseImage;
// var color = 'white';
var viewSide;

var productImg = {};

}



$(document).ready(function(){
  baseCanvas = document.getElementById('mainCanvas');
  context = baseCanvas.getContext('2d');

  productImg.baseImage = new Image();
  productImg.color = 'white';


  loadProduct('tshirts');
  baseImage.onload = function() {
  updateWindow();
 }

// подія зміни вікна браузера
 $(window).on('resize' , updateWindow);

function loadProduct(baseImgItem) {
   viewSide = clothe[baseImgItem].frontImg;
   productImg.color = "white";
   changeAmount();
   // $('#frontView img').attr('src',clothe[baseImgItem].frontImg[productImg.color ]);
   //  $('#backView img').attr('src',clothe[baseImgItem].backImg[productImg.color ]);

   productImg.baseImage.src = viewSide[productImg.color];
}
// подія вибору основи
 $('#basis .basis>li').click(function () {
   fillBackgroundColor();
   baseImgItem = (this).id;
    loadProduct(baseImgItem);
   drawImageInCanvas();
 })

// подія вибору кольору
$('#color li').on('click', changeColor);

$('#frontView').on('click', toFrontView);
$('#backView').on('click', toBackView);

// перерисовує картинку в canvas
function drawImageInCanvas() {
  sizeBaseImg();
  context.drawImage(productImg.baseImage, positionBaseImage(productImg.baseImage).x, positionBaseImage(productImg.baseImage).y, productImg.baseImage.width, productImg.baseImage.height); 
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
  var ratioSide  = productImg.baseImage.width/productImg.baseImage.height;
  if (ratioSide < 1) {
    productImg.baseImage.width  = ratioSide*baseCanvas.width;
    productImg.baseImage.height = baseCanvas.height;
  } else if(ratioSide >=1){
    productImg.baseImage.width = baseCanvas.width;
    productImg.baseImage.height = ratioSide*baseCanvas.height;
  }
}


// зміна широти і висоти canvas при зміні вікна браузера
function updateWindow() {
 if($(this)[0].innerWidth > 992){
  baseCanvas.width = 0.29*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
  setTime()
} else if ($(this)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(this)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
  setTime();
}    
}

function updateCanvas() {
 if($(window)[0].innerWidth > 992){
  baseCanvas.width = 0.29*$(window)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
} else if ($(window)[0].innerWidth <= 992){
  baseCanvas.width = 0.75*$(window)[0].innerWidth;
  baseCanvas.height = baseCanvas.width;
  drawImageInCanvas();
}    
}

function  setTime() {
 // drawImageInCanvas();
 setTimeout(updateCanvas , 1000);
 // alert('hello');
}

// фунція вибору кольору
function changeColor(){
  color = (this).id;
  productImg.baseImage.src = viewSide[color];
  drawImageInCanvas();
}

function toFrontView() {
  viewSide = clothe[baseImgItem].frontImg;
  productImg.baseImage.src = viewSide[color];
  drawImageInCanvas();
}

function toBackView() {
  viewSide = clothe[baseImgItem].backImg;
  productImg.baseImage.src = viewSide[color];
  drawImageInCanvas();
}

function changeAmount() {
  $('#amount').html(clothe[baseImgItem].amount);
}

});

var clothe = {
  'tshirts': {
      'productName': "Мужская футболка",
      'frontImg':{
      'white': 'src/images/m_tshirt_f_w.jpg',
      'red': 'src/images/m_tshirt_f_r.jpg',
      'green': 'src/images/m_tshirt_f_green.jpg',
      'blue': 'src/images/m_tshirt_f_blue.jpg',
      'black': 'src/images/m_tshirt_f_b.jpg',
       },
      'backImg':{
      'white': 'src/images/m_tshirt_b_w.jpg',
      'red': 'src/images/m_tshirt_b_r.jpg',
      'green': 'src/images/m_tshirt_b_greenjpg.jpg',
      'blue': 'src/images/m_tshirt_b_blue.jpg',
      'black': 'src/images/m_tshirt_b_b.jpg',
       },
      'color': ['white', 'red', 'green', 'blue', 'black'],
      'manufacturer': 'Stedman (Бельгия)',
      'about': 'Футболка изготовлена из 100% хлопка, не имеет боковых швов, хорошо сидит по фигуре. Изображение наносится специальной флекс-пленкой Premium качества. Благодаря использованию высококачественных материалов, нанесенное изобрежение не отрывается, не трескается, не выгорает и не меняет цвет даже спустя 100 стирок!',
      'service': 'Не требует особенного ухода! Стирать при температуре не выше 40С. Этого достаточно для того, что бы футболка радовала Вас долгие годы!',
      'amount': 420, 
      'size': ['S', 'M', 'L', 'XL', 'XXL']
  },
    'jumper': {
      'productName': "Реглан мужской",
      'frontImg':{
      'white': 'src/images/m_jumper_f_white.jpg',
      'red': 'src/images/m_jumper_f_red.jpg',
      'blue': 'src/images/m_jumper_f_blue.jpg',
      'black': 'src/images/m_jumper_f_gray.jpg',
       },
      'backImg':{
      'white': 'src/images/m_jumper_b_white.jpg',
      'red': 'src/images/m_jumper_b_red.jpg',
      'blue': 'src/images/m_jumper_b_blue.jpg',
      'black': 'src/images/m_jumper_b_gray.jpg',
       },
      'color': ['white', 'red', 'blue', 'black'],
      'manufacturer': 'Stedman (Бельгия)',
      'about': 'Футболка изготовлена из 100% хлопка, не имеет боковых швов, хорошо сидит по фигуре. Изображение наносится специальной флекс-пленкой Premium качества. Благодаря использованию высококачественных материалов, нанесенное изобрежение не отрывается, не трескается, не выгорает и не меняет цвет даже спустя 100 стирок!',
      'service': 'Не требует особенного ухода! Стирать при температуре не выше 40С. Этого достаточно для того, что бы футболка радовала Вас долгие годы!',
      'amount': 600, 
      'size': ['S', 'M', 'L', 'XL', 'XXL']
  },
     'peakedcap': {
      'productName': "Реглан мужской",
      'frontImg':{
      'white': 'src/images/cap_white.jpg',
      'red': 'src/images/cap_red.jpg',
      'blue': 'src/images/cap_blue.jpg',
      'black': 'src/images/cap_black.jpg',
       },
      'backImg':{
      'white': 'src/images/cap_white.jpg',
      'red': 'src/images/cap_red.jpg',
      'blue': 'src/images/cap_blue.jpg',
      'black': 'src/images/cap_black.jpg',
       },
      'color': ['white', 'red', 'blue', 'black'],
      'manufacturer': 'Stedman (Бельгия)',
      'about': 'Футболка изготовлена из 100% хлопка, не имеет боковых швов, хорошо сидит по фигуре. Изображение наносится специальной флекс-пленкой Premium качества. Благодаря использованию высококачественных материалов, нанесенное изобрежение не отрывается, не трескается, не выгорает и не меняет цвет даже спустя 100 стирок!',
      'service': 'Не требует особенного ухода! Стирать при температуре не выше 40С. Этого достаточно для того, что бы футболка радовала Вас долгие годы!',
      'amount': 240, 
      'size': ['S', 'M', 'L', 'XL', 'XXL']
  },
}

