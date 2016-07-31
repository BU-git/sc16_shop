$(document).ready(function(){
  var mainCanvas = document.getElementById("mainCanvas");
  var context = mainCanvas.getContext('2d');
  var img = new Image(); 
  img.src = "src/images/Product.png";
  img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
        context.drawImage(img, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
      }



      $('.product').click(function (event) {
      	var element= event;
      	var foto = element.toElement.src;
      	fillBackgroundColor();
        drawImageInCanvas(foto);
      })


function drawImageInCanvas(argument) {
	 var mainCanvas = document.getElementById("mainCanvas");
  var context = mainCanvas.getContext('2d');
  var img = new Image(); 
  img.src = argument;
  img.width = mainCanvas.width;
  img.height = mainCanvas.height;
  img.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
        context.drawImage(img, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
      }
}

function fillBackgroundColor() {
	 var mainCanvas = document.getElementById("mainCanvas");
  var context = mainCanvas.getContext('2d');
  context.fillStyle = "white";
  context.fillRect(0, 0 , 250, 250);
}



    });
