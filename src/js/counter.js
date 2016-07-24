 $(document).ready(function(){

    function checkNumberFields(e, k){
      var str = jQuery(e).val();
      var new_str = s = "";

      for(var i=0; i < str.length; i++){
        s = str.substr(i,1);
    if(s!=" " && isNaN(s) == false){// если цифра
      new_str += s;
    }
  }
  if(eval(new_str) > 1000){ new_str = 1000; }
  if(eval(new_str) == 0){ new_str = ""; }
  
  jQuery(e).val(new_str);
}


// проверка на ввод чисел с клавиатуры
jQuery("#amount").keyup(function(event){// когда пользователь отпускает клавишу клавиатуры
  checkNumberFields(this, event);
}).keypress(function(event){// когда пользователь нажимает клавишу клавиатуры и удерживает её в нажатом состоянии
  checkNumberFields(this, event);
}).change(function(event){// когда поля теряет фокус
  checkNumberFields(this, event);
}).click(function(){
  this.select();
});

$('#increase_amount').click(function(){ 
  if(+$('#amount').val() < 1000){ 
  $('#amount').val(+$('#amount').val()+1);
}
  
});

$('#decrease_amount').click(function(){ 
  if (+$('#amount').val()>1) { 
   $('#amount').val(+$('#amount').val()-1);
 }
});
});