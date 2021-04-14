//Al dar clic en el boton de recuperar
$("#form-recuperar_password").on("submit", function(evt) {

    evt.preventDefault();


    //Se llama el metodo recuperar password
    var email = $("#email").val();

    //Se obitene la contraseña
    var password = generar_contraseña();
    recuperar_password(email, password);
})



//Función para recuperar la contraseña
function recuperar_password(email, password) {

    Swal.fire({
        title: "Cargando ...",
        allowOutsideClick: false,
        text: "Por favor espere un momento",
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        data: { opcion: 'recuperar_password', email: email, password: password },
        success: function(result) {

            console.log(result);

            switch (result) {

                case '0':
                    Swal.fire({
                        title: "¡Error al recuperar la contraseña!",
                        text: "¡El correo electronico no esta registrado!",
                        timer: 5000,
                        type: "warning",
                    });

                    break;

                case '1':


                    Swal.fire({
                        title: "¡Recuperación de Contraseña Exitosa!",
                        text: "¡Se ha enviado al correo electronico " + email + " una contraseña provicional!",
                        timer: 7000,
                        type: "success",
                    });
                    break;

                    //Si retorna un 2 entonces se muestra un mensaje de error
                case '2':

                    Swal.fire({
                        title: "¡No se puede recuperar la contraseña!",
                        text: "¡El correo electronico esta Inactivo, ¡Por favor comuniquese con el administrador del sistema para activar la cuenta!",
                        timer: 9000,
                        type: "warning",
                    });

                    break;

                    //Si retorna un 3 entonces se muestra un mensaje de error
                case '3':

                    Swal.fire({
                        title: "¡No se puede recuperar la contraseña!",
                        text: "¡El correo electronico esta Bloqueado por seguridad, ¡Por favor comuniquese con el administrador del sistema para activar la cuenta!",
                        timer: 9000,
                        type: "warning",
                    });


                    break;

                    //Si retorna un 3 entonces se muestra un mensaje de error
                case '4':

                    Swal.fire({
                        title: "¡No se ha podido enviar el correo con la contraseña provicional!",
                        text: "¡Comuniquese con el area de soporte",
                        timer: 7000,
                        type: "warning",
                    });

                    break;


                case '5':

                    Swal.fire({
                        title: "¡Este correo no ha sido confirmado!",
                        text: "¡Debes confirmar el correo " + email + " para poder recuperarlo, por favor comuniquese con el administrador del sistema para confirmar la cuenta!",
                        timer: 10000,
                        type: "error",
                    });

                    break;



                default:

                    Swal.fire({
                        title: "¡No se puede recuperar la contraseña!",
                        text: "¡Comuniquese con el area de soporte",
                        timer: 4000,
                        type: "error",
                    });
                    break;

            }

        },

        error: function(result) {

        }
    });



}





//Funcion  para sugierir contraseña aleatoria 
function generar_contraseña() {
    var contraseña = '';
    var mayuscula = '';
    var letra = '';
    var especial = '';
    var numero = '';
    //Este array contiene el abecedario
    var letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //Este array contiene caracteres especiales
    var c_especiales = ['@', '%', '&', '#', '?', '!', '*', '+'];
    //Es variable gurdar un fal o true si la letra es mayuscula


    //Se crea un iteracion de uno a 10 que es la cantidad de caracteres de la contraseña
    for (var i = 0; i <= 10; i++) {

        //Se revisa que numero de iteracion se esta generando
        // dependino de la varible i se creara un  valor aleotorio
        switch (i) {


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
                if (mayuscula == 1) {
                    //se guarda en la variable dependiendo del numero aleaotrio obtenido
                    //contraseña la letra en mayuscula
                    //Ejemplo: si el numero es 5 se guardara la letra f
                    contraseña = contraseña + letras[letra].toUpperCase();
                }
                //de lo contrario se guarda la letra en minuscula
                else if (mayuscula == 0) {
                    contraseña = contraseña + letras[letra];
                }

                break;

            case 2:

                especial = Math.round(Math.random() * (0 + 7));

                contraseña = contraseña + c_especiales[especial];

                break;



            case 3:

                numero = Math.round(Math.random() * (0 + 7));
                contraseña = contraseña + numero;
                break

            case 4:
                especial = Math.round(Math.random() * (0 + 7));

                contraseña = contraseña + c_especiales[especial];

                break;

            case 5:
                numero = Math.round(Math.random() * (0 + 20));
                contraseña = contraseña + numero;

                break;

            case 6:
                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if (mayuscula == 1) {
                    contraseña = contraseña + letras[letra].toUpperCase();
                } else if (mayuscula == 0) {
                    contraseña = contraseña + letras[letra];
                }
                break;

                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if (mayuscula == 1) {
                    contraseña = contraseña + letras[letra].toUpperCase();
                } else if (mayuscula == 0) {
                    contraseña = contraseña + letras[letra];
                }
            case 7:

                numero = Math.round(Math.random() * (0 + 20));
                contraseña = contraseña + numero;


                break


            case 8:
                especial = Math.round(Math.random() * (0 + 7));

                contraseña = contraseña + c_especiales[especial];
                break;


            case 9:

                especial = Math.round(Math.random() * (0 + 7));

                contraseña = contraseña + c_especiales[especial];
                break;

            case 10:

                mayuscula = Math.round(Math.random() * (0 + 1));
                letra = Math.round(Math.random() * (0 + 25));
                if (mayuscula == 1) {
                    contraseña = contraseña + letras[letra].toUpperCase();
                } else if (mayuscula == 0) {
                    contraseña = contraseña + letras[letra];
                }
                break;

            default:
                contraseña = contraseña + 123;
                break;
        }

    }

    //se retorna la contraseña aleatoria
    return contraseña;

}