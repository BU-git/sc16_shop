$(document).ready(function(){
  $.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ''); 
    return this.optional(element) || phone_number.length > 5 &&
    phone_number.match(/^[\d\(\)\ -]{14}$/);
  });

  $.validator.addMethod( "lettersonly", function( value, element ) {
  return this.optional( element ) || /^[а-я,ґ,',і,ї,є\-\a-z]+$/i.test( value );
} )

  $("#formValidate").validate({
   rules:{
    first_name: {
      required: true,
      maxlength: 20,
      lettersonly: true
    },

    last_name: {
      required: true,
      maxlength: 20,
      lettersonly: true
    },

    tel:{
      required: true,
      phoneUS: true,
    },

    email:{
      email: true,
      required: false,
    },

    textarea:{
      required: false,
      maxlength: 100,
    }
  },

submitHandler: function() { 
  if(JSON.parse(localStorage.getItem('Ordered'))){
  $('#modal1').openModal(); 
}else{
  return false;
}
},

  messages:{
    first_name:{
      required: "Введите ваше имя.",
      maxlength: $.validator.format( "Количество символов должно быть не больше {0}." ),
      lettersonly: "Введите только буквы."
    },

    last_name:{
      required: "Введите вашу фамилию",
      maxlength: $.validator.format( "Количество символов должно быть не больше {0}." ),
       lettersonly: "Введите только буквы." 
    },

    tel:{
      required: "Введите ваш телефон.",
      phoneUS: "Введите корректный номер телефона"
    },

    email:{ email:"Введите корректный  email."},

    textarea:{  maxlength: $.validator.format( "Количество символов должно быть не больше {0}." )}
  },

  errorElement : 'div',
  errorPlacement: function(error, element) {
    var placement = $(element).data('error');
    if (placement) {
      $(placement).append(error)
    } else {
      error.insertAfter(element).data('error');
    }
  },

});
});

