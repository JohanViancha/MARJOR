
/*=======================================================
=            Section Cargue Documento           =
=======================================================*/

$(function(){

	confirmar_email();
});




/*=======================================================
=            Section Metodos Funcionaldes BD            =
=======================================================*/




//Al dar clic en el boton de confirmar correo entonces..
function confirmar_email(){

    //Se abre un modal de cargue
    Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });


    //Se obtiene el nombre y el email enviados por el metodo get
    var email = $("#email").val();
    var nombre = $("#nombre").text();

    //Se obtiene la contraseña aleatoria
    var password = generar_contraseña();

    //Se envia los tres parametro ajax_usuario
    $.ajax({
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        data: {opcion: 'confirmar_email',email:email,password:password,nombre:nombre},
        success: function(result){
            console.log(result);
            
            Swal.close();
            

            //Si la respuesta es true entonces..
            if(result == true){

                //Se muestra un mensaje alertando al usuario de que se confirmo exitosamente el correo

                $("#confirmar_email").attr('class','fas fa-check text-success');

                $("#confirmar").text('El correo ha sido confirmado satisfactoriamente, se ha enviado un mensaje al correo con las credenciales del sistema');
            }

            else if (result == 2){

                $("#confirmar").text('Esta confirmación ha execido el tiempo, comuniquese con el administrador del sistema');

                $("#confirmar_email").attr('class','fas fa-times text-danger');


            }

            else if (result == 3){

                $("#confirmar").text('Esta cuenta ya ha sido confirmada');

                $("#confirmar_email").attr('class','fas fa-check text-success');

            }

            else{

                //Se muestra un mensaje de que no se confirmo el correo
                bootbox.alert({size:"large",
                        message: "<center>No se pudo confirmar el correo electronico</center>"});

                        $("#confirmar_email").attr('class','fas fa-times text-danger'); 


            }

        },


        //Si hay algun error se muestra un mensaje de error
        error:function(){

             bootbox.alert({size:"large",
                        message: "<center>Error al enviar correo, Comuniquese con el area de soporte</center>"}); 
        }
    });

    // dialog.modal('hide'); 

}


//Funcion  para sugierir contraseña aleatoria 
function generar_contraseña(){
    var contraseña = '';
    var mayuscula ='';
    var letra = '';
    var especial = '';
    var numero = '';
    //Este array contiene el abecedario
    var letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    //Este array contiene caracteres especiales
    var c_especiales = ['@','%','&','#','?','!','*','+','-','/'];
    //Es variable gurdar un fal o true si la letra es mayuscula


    //Se crea un iteracion de uno a 10 que es la cantidad de caracteres de la contraseña
    for (var i = 0; i <= 10; i++) {

        //Se revisa que numero de iteracion se esta generando
        // dependino de la varible i se creara un  valor aleotorio
        switch (i){


            case 0:
             numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;
            break;

            //El caracter 1 
            case 1:
                //se carga en la varible el 0 o 1
                mayuscula = Math.round(Math.random() * (0 + 1));

                //se carga en la variable un numero de 1 a 25 que son la cantidad de item del array letras
                letra = Math.round(Math.random() * (0 + 25));

                //si mayuscula es 1 entonces...
                if(mayuscula == 1){
                    //se guarda en la variable dependiendo del numero aleaotrio obtenido
                    //contraseña la letra en mayuscula
                    //Ejemplo: si el numero es 5 se guardara la letra f
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                //de lo contrario se guarda la letra en minuscula
                else{
                     contraseña = contraseña + letras[letra];
                }
               
            break;

            case 2:

                 especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
                
            break;



            case 3:

                numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;
            break

            case 4:
                 especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];

            break;

            case 5:
                numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;

            break;

            case 6:
                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            break;

                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            case 7:

            numero = Math.round(Math.random() * (0 + 10));
                contraseña = contraseña + numero;


            break 


            case 8:
                especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
            break;


            case 9:

                especial = Math.round(Math.random() * (0 + 9));

                contraseña = contraseña + c_especiales[especial];
            break;

             case 10:

               mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if(mayuscula == 1){
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                else{
                     contraseña = contraseña + letras[letra];
                }
            break;
        }

  }

  //se retorna la contraseña aleatoria
    return contraseña;

}
