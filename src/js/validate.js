$(document).ready(function(){

  jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ''); 
    return this.optional(element) || phone_number.length > 5 &&
    phone_number.match(/^\d[\d\(\)\ -]{3,14}\d$/);
  }, "Please specify a valid  phone number");



  jQuery.validator.addMethod( "lettersonly", function( value, element ) {
  return this.optional( element ) || /^[а-я\a-z]?[а-я\-\a-z]+$/i.test( value );
}, "Letters or punctuation only please" );

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

  messages:{
    first_name:{
      required: "Введите ваше имя.",
      maxlength: $.validator.format( "Количество символов должно быть небольше {0}." ),
      lettersonly: "Введите только букви."
    },

    last_name:{
      required: "Введите вашу фамилию",
      maxlength: $.validator.format( "Количество символов должно быть небольше {0}." ),
       lettersonly: "Введите только букви."
    },

    tel:{
      required: "Введите ваш телефон.",
      phoneUS: "Введите корректный номер телефона"
    },

    email:{ email:"Введите корректный  email."},

    textarea:{  maxlength: $.validator.format( "Количество символов должно быть небольше {0}." )}
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

