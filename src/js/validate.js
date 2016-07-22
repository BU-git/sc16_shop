$(document).ready(function(){


jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ''); 
    return this.optional(element) || phone_number.length > 3 &&
        phone_number.match(/^\d[\d\(\)\ -]{4,14}\d$/);
}, 'Please enter a valid phone number.');


    $("#formValidate").validate({
       rules:{
          first_name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },
             last_name: {
                required: true,
                minlength: 2,
                maxlength: 20,
            },

            tel:{
                required: true,
                phoneUS: true
            },
            email:{
                email: true,
                required: false,
            },

              textarea:{
                required: false,
                maxlength: 50,
            },
          
       },
       messages:{

            first_name:{
                required: "Это поле обязательно для заполнения",
                minlength: "Число символов должно быть больше 2",
                maxlength: "Число символов должно быть небольше 20",
            },
            last_name:{
                required: "Это поле обязательно для заполнения",
                minlength: "Число символов должно быть больше 2",
                maxlength: "Число символов должно быть небольше 20",
            },

            tel:{
                required: "Это поле обязательно для заполнения",
                phoneUS: "Введите корректный номер телефона",
                
            },
            email:{
                email:"Введите корректный  email",
            },
              textarea:{
                maxlength: "Число символов должно быть небольше 50",
            },

       },
       errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }

    });

});