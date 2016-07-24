 $(document).ready(function(){

 	var MAXNUMBER = 1000;
 	var MINNUMBER = 1;
  var amountId = "#amount";

// функция проверки на число
 	function checkNumberFields(e, k){
 		var str = jQuery(e).val();
 		var new_str = "";

 		for(var i=0; i < str.length; i++){
 			if ((/^\d+$/).test(str.substr(i,1))) { new_str += str.substr(i,1); }
 		}

 		if(eval(new_str) > MAXNUMBER){ new_str = MAXNUMBER; }
 		if(eval(new_str) == 0){ new_str = ""; }

 		jQuery(e).val(new_str);
 	}

// проверка на ввод чисел с клавиатуры
jQuery(amountId).keyup(function(event){// когда пользователь отпускает клавишу клавиатуры
	checkNumberFields(this, event);
}).keypress(function(event){// когда пользователь нажимает клавишу клавиатуры и удерживает её в нажатом состоянии
	checkNumberFields(this, event);
}).change(function(event){// когда поля теряет фокус
	checkNumberFields(this, event);
}).click(function(){
	this.select();
});

// когда поля теряет фокус проверить на пустоту или ноль
$(amountId).focusout(function(){
	if (+$(amountId).val() == "" || +$(amountId).val() == 0) {+$(amountId).val(MINNUMBER);}
})

// инкрементация счетчика
$('#increase_amount').click(function(){ 
	if(+$(amountId).val() < MAXNUMBER){ 
		$(amountId).val(+$(amountId).val()+1);
	}
});
// декрементация счетчика
$('#decrease_amount').click(function(){ 
	if (+$(amountId).val()> MINNUMBER) { 
		$(amountId).val(+$(amountId).val()-1);
	}
});
});