 $(document).ready(function(){

 	var MAXNUMBER = 100;
 	var MINNUMBER = 1;

// функция проверки на число
 	function checkNumberFields(e, k){
 		var str = $(e).val();
 		var new_str = "";

 		for(var i=0; i < str.length; i++){
 			if ((/^\d+$/).test(str.substr(i,1))) { new_str += str.substr(i,1); }
 		}

 		if(eval(new_str) > MAXNUMBER){ new_str = MAXNUMBER; }
 		if(eval(new_str) == 0){ new_str = ""; }

 		$(e).val(new_str);
 	}

// проверка на ввод чисел с клавиатуры
$("#counterAmount").keyup(function(event){// когда пользователь отпускает клавишу клавиатуры
	checkNumberFields(this, event);
}).keypress(function(event){// когда пользователь нажимает клавишу клавиатуры и удерживает её в нажатом состоянии
	checkNumberFields(this, event);
}).change(function(event){// когда поля теряет фокус
	checkNumberFields(this, event);
}).click(function(){
	this.select();
});

// когда поля теряет фокус проверить на пустоту или ноль
$("#counterAmount").focusout(function(){
	if (+$("#counterAmount").val() == "" || +$("#counterAmount").val() == 0) {+$("#counterAmount").val(MINNUMBER);}
})

// инкрементация счетчика
$('#increase_amount12').on('click',function(){ 
	if(+$("#counterAmount").val() < MAXNUMBER){ 
		$("#counterAmount").val(+$("#counterAmount").val()+1);
		var restoredSession = JSON.parse(localStorage.getItem('Ordered'));
		var amount = document.getElementById('productOrderedAmount');
   amount.innerHTML = restoredSession.price * (+$("#counterAmount").val()) +' ' + 'грн';;
	}
});
// декрементация счетчика
$('#decrease_amount').on('click',function(){ 
	if (+$("#counterAmount").val() > 1) { 
		$("#counterAmount").val(+$("#counterAmount").val()-1);
		var restoredSession = JSON.parse(localStorage.getItem('Ordered'));
		var amount = document.getElementById('productOrderedAmount');
   amount.innerHTML = restoredSession.price * (+$("#counterAmount").val()) +' ' + 'грн';
	}
});



});