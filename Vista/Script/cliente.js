

/*================================================================================
=            Seccion de manejo de permiso para la pantalla de cliente            =
================================================================================*/
//Este array se guardaran todas las variables de sesión necesarias entre esas los permisos
//del usuario logeado

  var sesiones = new Array();

   //Guarda el numero de variables de mi sesison 
  var num_vari_sesion = $(".variables_sesion").children("li").length;


   $(".variables_sesion").children("li").each(function(index) {

      sesiones[index] = $(this).text();

   });


/*=====  End of Seccion de manejo de permiso para la pantalla de cliente  ======*/






/*=============================================
=            Seccion de cargue documento        =
=============================================*/


$(function(){

//navigator.geolocation.getCurrentPosition(iniciarMapa,errormapa);
/* Despues de que todo el documento se cargue se llamara el metodo listar clientes*/
 listar_clientes();

  //La accion volver se oculta
  $(".opcion_volver").hide();

 //Se oculta el boton de guardar cliente
  $("#btn-guardarcliente").hide();


  var wsUri = "ws://localhost:9000/MARJOR/Modelos/server.php";  
  websocket = new WebSocket(wsUri); 


});

/*=====  End of   Seccion de cargue documento   ======*/







/*===============================================================
            =            Seccion de Eventos     =
================================================================*/


//Al dar clic al boton de "Registra cliente" se mostrara el formulario para registrar un nuevo cliente
$("#btn-registrar_cliente").click(function(){


    //llamos la funcion mostrar_formulario y enviarmos comom parametro "guardar cliente"
    //Este parametro indica al metodo que se hara un nuevo registro y no una edición.
    mostrar_formulario('guardar_cliente');
});




//Evento clic para volver a la pantalla anterior
$(".opcion_volver").click(function(){

    //Se llamara el metodo para ocultar el formulario
   ocultar_formulario();

});




// Cuando se da clic en el boton de guardar cliente
$("#form-registrocliente").on("submit",function(evt){

    //Se quita el comportamiento por defecto del boton submit el cual recarga la pagina 
    //cada vez que actua
     evt.preventDefault();  


    //Se usa el objeto formdata que toma automaticamente
    //los campos que se encuentran dentro del formulario que se envia por parametro a la clase FormData
    var datos_cliente = new FormData($("#form-registrocliente")[0]);
 
 
    //Se obtiene el valor de la clase del formulario form-registrocliente
    var cliente = $("#form-registrocliente").attr('class');



    //Si hay un valor en la clase del formulario se edita un cliente
    if(cliente != ''){

            //Se agrega al objeto formdata el item opcion que sera evaluado en ajax_cliente
            datos_cliente.append('opcion','editar_cliente');

            console.log(datos_cliente);

            //Se envia como parametro el formdata 
            editar_cliente(datos_cliente);
        
    }

    //De lo contrario si no hay un valor en la clase del formulario entonces se va a registrar un 
    //nuevo cliente
    else{

   

             //Se agrega al objeto formdata el item opcion que sera evaluado en ajax_cliente
          datos_cliente.append('opcion','registrar_cliente');

           //Se envia como parametro el formdata 
         registrar_cliente(datos_cliente);     
    }



       
});



    //Si se abre algun modal entonces se modifica la propiedad z-index del sidebar
  $('.modal').on('show.bs.modal', function (e) {
        $(".main-sidebar").css('z-index','0');
    });

    $('.modal').on('hide.bs.modal', function (e) {
        $(".main-sidebar").css('z-index','1100');

          $(".sidebar-mini").css({'padding-right': '0px'});
    });








/*function iniciarMapa(posicion){

	var latitude = posicion.coords.latitude;
	var longitude = posicion.coords.longitude;


	var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center="+latitude+","+longitude+"&size=600x300&markers=color:red%7C"+latitude+","+longitude+"&key=AIzaSyC7aZ9VEILp0OqR1JAItqpeSycQCAg1q7U";



	output.innerHTML ="<img src='"+imgURL+"'>";

}

function errormapa(){

	alert('No se pudo mostrar el mapa');
}
*/



//habilitar ciertos campos dependiendo del tipo de persona y documento

	$("#tipo_persona_cliente").change(function(event) {
		

		if (this.value == 'Persona Juridica'){

			$('.lb-nombre').text('Razon Social:(*)');
			$('#apellido').val("");
			$('#apellido').hide();
			$("#apellidos_cliente").removeAttr('required')



		}

		else{

			$('.lb-nombre').text('Nombres:(*)');
			$('#apellido').show()
			$("#apellidos_cliente").attr('required');
		}
	});




	$("#tipo_documento_cliente").change(function(event) {
		

		if (this.value != 'NIT'){
			$('#apellido').val("");
			$('#dig_ver').hide();
			$("#dig_ver_cliente").removeAttr('required')


		}

		else{
			$('#dig_ver').show();
			$("#dig_ver_cliente").attr('required');
		}
	});

 //Cuando se escoge el tipo de documento NIT se deben habilitar el campo de digito de verificación







/*====================  End of   Seccion de eventos   ================*/







/*=====================================================================
        =            Seccion de Metodos Funcionales BD   =
======================================================================*/


//Metodo para listar en el datatable los clientes registrados
function listar_clientes(){



var opcion='listar_clientes';

//Gurdara el boton a mostrar segun su estado
var opcion_estado;
//Guardara el boton segun el valor del campo confirmado
var opcion_confirmado;
//Guarda el boton de editar
var opcion_editar;
//Se usa ajax para cargar el datatable



  var table = $('#lista_clientes').DataTable({

            /***** Opciones adicionales del datable *****/           
            dom: 'Bfrtip',
            order: [[5, 'asc']],
            
             buttons: [
              {extend:'copy', text:'<i class="fas fa-copy"></i>',title:'Lista clientes',titleAttr:'Copiar en el portapapeles'},
              {extend:'csv',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista clientes'},
              {extend:'excel',messageTop:'Este informe muestra una lista con la información de todos los clientes',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista clientes'},
              {extend:'pdf',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información de todos los clientes',titleAttr:'Exportar a PDF',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista clientes'},
              {extend:"print",title: "Listado de Clientes",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},titleAttr: "Imprimir"},
             ],
         
            "keys": true,

            "select": true,
            //Paginacion*/
            "paging":   true,
            //Ordenamiento
            "ordering": false,


             //Lenguaje del datatable
            "language": {
            "lengthMenu": "",
            "zeroRecords": "No hay clientes registrados",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay clientes registrados",
             "paginate": {
                "first":      "Primero",
                "last":       "Ultimo",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            "search":         "Buscar:",
            "infoFiltered": "(filtered from _MAX_ total records)"
            },


             "ajax":{

                //Ubicamos la url AJAX
                 url:'../Ajax/ajax_cliente.php',  
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:opcion}

             },

             //para cada columna se asigna el valor el retornado en el json
                "columns": [
                	{"data": "estado",

                      //Si el estado es activo entonces...
                    "render": function(data,type,row,meta){

                         //Si el estado es activo entonces...
                        if(data == 1 && sesiones.indexOf("Inactivar Cliente") != -1){
                            //Se guarda en la variable opcion estado el boton para inactivar
                            opcion_estado_activo = '<button class="btn btn-danger btn-sm hint--top" onclick="cambiar_estado_cliente('+row.id_cliente+',\'Inactivo\')" data-hint="Inactivar Cliente"><i class="fas fa-user-times"></i></i></button>';

                        }
                        else{

                          opcion_estado_activo = '';
                        }

                        // de lo contrario si el valor es inactivo
                        if(data == 0 && sesiones.indexOf("Activar Cliente") != -1){
                            //se guarda en la variable opción el estado el boton para activar
                           opcion_estado_inactivo = '<button class="btn btn-success btn-sm hint--top" onclick="cambiar_estado_cliente('+row.id_cliente+',\'Activo\')" data-hint="Activar Cliente"><i class="fas fa-user-check"></i></button>';
                        }

                        else{
                          opcion_estado_inactivo='';
                        }
                        //de lo contrario el estado del usuario es bloqueado entonces...
                        if (data != 0 && data != 1  && (sesiones.indexOf("Desbloquear Usuario") != -1)){

                            //Se guarda en la variable opcion estado el boton para desbloquear
                            opcion_estado_bloqueado = '<button class="btn btn-outline-success btn-sm hint--top" data-hint="Desbloquear Cliente" onclick="desbloquear_cliente(\''+row.id_usuario+'\',\''+row.correo_electronico+'\',\''+row.nombres+row.apellidos+'\')"><i class="fas fa-lock-open"></i></button>';
                        }

                        else{

                          opcion_estado_bloqueado='';
                        }


                        if(row.confirmado == 0 && sesiones.indexOf("Confirmar Email") != -1){

                            opcion_confirmado = '<br> <button class="btn mt-1 btn-warning btn-sm hint--top" onclick="reconfirmar_email(\''+row.correo_electronico+'\',\''+row.nombres+row.apellidos+'\')" data-hint="Confirmar Email"><i class="text-light fas fa-envelope"></i></button>';
                        }

                        else{
                          opcion_confirmado = ''; 
                        }

                        //Se verifica que el array sesiones tenga el permiso de editar usuario
                        if(sesiones.indexOf("Editar Usuario") != -1){

                        opcion_editar = '<button id="opcion_editar" class="btn btn-info btn-sm hint--right" onclick="mostrar_cliente('+row.id_cliente+');" data-hint="Editar Cliente"><i class="fas fa-user-edit"></i></button> ';
                       }

                        //Si no tiene permiso se guarda la variable como vacio
                       else{
                           opcion_editar = '';
                       }

                        return opcion_editar+opcion_estado_activo+opcion_estado_inactivo;
                    },




                },
                    { "data": "nombres"},
                    { "data": "apellidos"},
                    { "data": "tipo_persona"},
                    { "data": "tipo_documento" },
                    { "data": "num_documento" },
                    { "data": "correo_electronico"}, 
                    { "data": "estado",

                    
                       "render": function(data,type,row,meta){
                       	//Se asigna el nombre del estado segun el enterp almacenado en la 
                       	//base de datos

                       	if(data == 1){

                       		return 'Activo';
                       	}

                       	else if(data == 0){

                       		return 'Inactivo';
                       	}
                       	else{

                       		return 'Bloqueado';
                       	}

                       }
                	},
                ],

            });



/** Permisos para exportar lista de clientes ***/


//Se guarda en un aray el nombre de los permisos para exportar la lista de clientes
var permisos_exportar = ['Copiar en portapapeles lista Clientes','Exportar a CSV lista Clientes','Exportar Excel lista Clientes','Exportar a PDF lista Clientes','Imprimir lista Clientes'];
//Se guarda la clase de cada boton para exportar lista de clientes
var clases_exportar = ['.buttons-copy','.buttons-csv','.buttons-excel','.buttons-pdf','.buttons-print'];


//Se recorre el array permisos exportar
  for (var i = 0; i <= 4 ; i++) {

    //Se compara el array session con el array permisos_exportar
    if(sesiones.indexOf(permisos_exportar[i]) == -1){

      //Si el permiso no existe se elimina el boton para exportar la lista de clientes
        table.buttons(clases_exportar[i]).remove();
    }
      
    
  }
}




// funcion para registrar un cliente
function registrar_cliente(datos_cliente){
    
    //Se muestra un modal de cargando
       Swal.fire({ 
          title: "Cargando ...", 
          showConfirmButton: false, 
          allowOutsideClick: false,
          text: "Por favor espere un momento", 
            onBeforeOpen: () => {
            Swal.showLoading();
          }
        });

    $.ajax({
        url: "../Ajax/ajax_cliente.php?opcion=registrar_cliente",
        type: 'POST',
        data: datos_cliente,
        contentType: false,
        processData: false,
        success: function(result){

          console.log(result);


          Swal.close();
            //valida el resultado que trae del lado del servidor php
            switch (result){

                //Si es 0 el cliente no se creo
                case '0':
                      Swal.fire({
                        title:"¡EL cliente no fue creado!",
                        text:"Error al crear el cliente, por favor comuniquese con el soporte técnico",
                        type: "error"
                      });

                break;

                //Si es 1 el cliente se creo y se envio al correo electronico la activación del usuairo
                case '1':
                     Swal.fire({
                        title:"¡EL cliente ha sido creado exitosamente!",
                        text:"¡Se ha enviado un mensaje de activación al correo "+ datos_cliente.get('email_cliente'),
                        type: "success",
                        timer: 5000
                      });

                     //prepare json data
                    var cliente = {
                      id: 1,
                      nombre: 'Johan Viancha'
                    };

                
                    websocket.send(JSON.stringify(cliente));


                    // Se limpia el formulario
                    limpiar_formulario();

                    //Se oculta el formulario
                    ocultar_formulario();

                  
                break;

                //Si es 2 el numero de identificación ya existe para otro cliente
                case '2':

                    Swal.fire({
                        title:"¡El Numero de Identificación ya existe!",
                        text:"Si ya se registro ingrese al sistema con su cliente y contraseña ",
                        type: "warning",
                        timer: 5000
                      });
                   
                break;

                //Si es 3 el correo electronico ya existe para otro cliente
                case '3':
                     Swal.fire({
                        title:"¡El correo electronico ingresado ya existe!",
                        text:"Si ya se registro ingrese al sistema con su cliente y contraseña",
                        type: "warning",
                        timer: 5000
                      });
             
                break;

                //Si es 4 el numero de identificación y el correo electronico ya existen para otro cliente
                case '4':

                  Swal.fire({
                        title:"¡El correo electronico, el tipo y numero de identificación ingresado ya existe!",
                        text:"Si ya se registro ingrese al sistema con su cliente y contraseña",
                        type: "warning",
                        timer: 5000
                      });
                break;


                //Si es 5 se creo el cliente pero no se envio el mensaje al correo electronico
                case '5':
                       Swal.fire({
                        title:"¡EL cliente ha sido creado exitosamente!, Sin embargo no se pudo enviar las credenciales de acceso al correo "+ datos_cliente.get('email_cliente'),
                        text:"¡Por favor, comuniquese con el area de soporte!",
                        type: "warning",
                        timer: 6000
                      });
                break;

                //Por defecto se cliente no se creo
                default:
                    Swal.fire({
                        title:"¡EL cliente no se pudo registrar",
                        text:" ¡Comuniquese con el soporte técnico del sistema",
                        type: "error",
                        timer: 4000
                      });
  
                break;
            }



        },

        //Si se detecta un error al enviar a ajax se muestra un mensaje 
        error:function(result){
        Swal.fire("Error al registrar el cliente, comiquese con el area de soporte");
        }
    });  
}




//función para cambiar el estao del cliente 
function cambiar_estado_cliente(id_cliente,estado){

  Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });

    var text = "";
    //Se guarda en la varible opcion el tipo se accion que se hara
    //esta variable sera validad por ajax 
    var opcion = 'cambiar_estado_cliente';

//Si se va a inactivar un cliente se muestra en el texto del alert un mensaje 
//de precaución

    if(estado == "Inactivo"){

      text = "Si el cliente se inactiva no podra ingresar al sistema";
    }

    Swal.fire({
      title: "¿Esta seguro de cambiar el estado del cliente?",
      type: "question",
      text:text,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#249418',
      cancelButtonColor: '#d33',
    })
    .then((result) => {
      if (result.value) {


  //si se confirma el cambio de estado se usa ajax para cambiar editar el regitro en la base de datos
     $.ajax({
        url: '../Ajax/ajax_cliente.php',
        type: 'POST',
        //Se envia en el data la opcion, el estado y el id del cliente
        data: {opcion: opcion,id_cliente:id_cliente,estado:estado},
        success: function(result){  

        console.log(result);  

          Swal.close();
          var text_estado = "";
            // si la respuesta de ajax es true entonces...
            if(result == true){

              //Se verifica que estado tiene el cliente para mostrar un mensaje de
              //cliente activo o cliente inactivo
              if(estado == 'Inactivo'){


                text_estado="¡El cliente esta ahora Inactivo!";
              }
              else{
                text_estado="¡El cliente esta ahora Activo!";

              }
            //Se muestra un mensaje confirmando el cambio de estado del cliente
           Swal.fire({
              title:"¡Estado del cliente ha cambiado!",
              text:text_estado,
              timer: 4000,
              buttons: false,
              type: "success",
            });

                //Se identifica el datatable en una variable
                var dt = $("#lista_clientes").DataTable();

                //Se recarga el datatable
                dt.ajax.reload();
           
            }
            //de lo contrario se muestra un mensaje de que no se pudo cambiar el estado del cliente
            else{
                  Swal.fire({
                  title:"¡Error al cambiar el cliente!",
                  text:"¡No se puedo cambiar el estado del cliente!",
                  timer: 3000,
                  type: "warning",
                  });
            }
        },

        //si se detecta un error se muestra un alert
        error:function(result){
              Swal.fire(result);

        }
    });
      } 
  });
}


// funcion para editar un cliente
//se recibe el objeto formdata 
function editar_cliente(datos_cliente){

  Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });

    //se obtiene el id del cliente
    var id_cliente = $("#form-registrocliente").attr('class');


    //Se agrega el item  id cliente
    datos_cliente.append('id_cliente',id_cliente);

   

    $.ajax({
        url: '../Ajax/ajax_cliente.php',
        type: 'POST',
        //Se envia en el data todo el objeto formdata
        data: datos_cliente,
        contentType: false,
        processData: false,
        success: function(result){

           Swal.close();

            //Si la respuesta es true
            if(result == true){

                //Se muestra un mensaje notificando que el cliente ha sido editado
                Swal.fire({
                  title:"¡Cliente editado!",
                  text:"¡EL cliente ha sido editado exitosamente!",
                  timer: 4000,
                  type: "success",
                  });
        
                //Se limpia el formulario
                limpiar_formulario();
                //Se oculta el formulario
                ocultar_formulario();
            }

            //De lo contrario se muestra un mensaje notificando que el cliente no fue editado
            else{

                Swal.fire({
                  title:"¡Error al editar el cliente!",
                  text:"¡EL cliente no se pudo editar, ¡comuniquese con el soporte técnico del sistema!!",
                  timer: 4000,
                  type: "success",
                  });
            }

          
        },
        error:function(result){
            Swal.fire("Error al editar el cliente, comiquese con el area de soporte");
            Swal.close();
        },


    });


    	
     
}



//Función para mostrar los datos del cliente 
//se recibe como parametro el id del cliente 
function mostrar_cliente(id_cliente){



    //Se llama al metodo de mostrar formulario y se envia como para metro el mensaje de editar cliente
    mostrar_formulario('editar_cliente');

    //Se guarda en la variable opcion la accion que se realizara
    //Esta variable se valida en ajax_cliente
    var opcion = 'mostrar_cliente';
     $.ajax({
        url: '../Ajax/ajax_cliente.php',
        type: 'POST',
        //Se envia al data el id_cliente y la opcion
        data: {id_cliente: id_cliente,opcion:opcion},
        success: function(result){

        	console.log(result);
            //En la variable se convierte en un json
            var response = JSON.parse(result);
            //Si el resultado es diferente de false entonces...
            if(result != false){

            	if (response[0]['tipo_persona'] == 'Persona Juridica'){

					$('.lb-nombre').text('Razon Social:(*)');
					$('#apellido').hide();
					$("#apellidos_cliente").removeAttr('required')

				}

				else{

					$('.lb-nombre').text('Nombres:(*)');
					$('#apellido').show()
					$("#apellidos_cliente").attr('required');
				}

				if (response[0]['tipo_documento'] != 'NIT'){

					$('#dig_ver').hide();
					$("#dig_ver_cliente").removeAttr('required')


				}

				else{
					$('#dig_ver').show();
					$("#dig_ver_cliente").attr('required');
				}

            	//Se muestran los datos del cliente
            	$("#num_documento_cliente").val(response[0]['num_documento']);
            	$("#dig_ver_cliente").val(response[0]['digito_verificacion']);
                $("#telefono_cliente").val(response[0]['telefono']);
                $("#celular_cliente").val(response[0]['celular']);
                $("#email_cliente").val(response[0]['correo_electronico']);  
               	$("#nombres_cliente").val(response[0]['nombres']);
                $("#apellidos_cliente").val(response[0]['apellidos']);
                $("select[name=tipo_documento_cliente]").val(response[0]['tipo_documento']);
                $("select[name=tipo_persona_cliente]").val(response[0]['tipo_persona']);        


                //Si el correo ya esta confirmado entonces...
                if(response[0]['confirmado'] == true){
                    //Que no se permita modificar
                  $("#email_cliente").attr('readonly', 'true');
                 
                }

                // se guarda el id del cliente en la variable id
                var id = response[0]["id_cliente"];

                //se carga el id en la clase del formulario
               	$("#form-registrocliente").attr('class',id);
               
            }

            //De lo contrario se muestra un mensaje de que no se pueden mostrar los clientes
            else{

              Swal.fire("No se pudo mostrar los datos del cliente, comuniquese con el area de soporte técnico");
              ocultar_formulario();
            }
        },

        //Si hay un error en ajax se mostrar un mensaje
        error:function(result){
            Swal.fire("Error al mostrar el cliente, comuniquese con el area de soporte técnico");
        }
    });
    

}



function desbloquear_cliente(id_cliente,email,nombre){

     Swal.fire({
      title: "¿Esta seguro que desea desbloquear el cliente?",
      type: "question",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#249418',
      cancelButtonColor: '#d33',
    })
    .then((result) => {
      if (result.value) {

            Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });

        $.ajax({
          url: '../Ajax/ajax_cliente.php',
          type: 'POST',
          data: {id_cliente: id_cliente,email:email,nombre:nombre,opcion:'desbloquear_cliente'},
          success: function(result){
            

              Swal.close();

              if(result == 3){
                Swal.fire({
                  title: "cliente Desbloqueado",
                  type: "success",
                  text:"EL cliente ya puede ingresar con sus credenciales de acceso al sistema",
                  timer:4000
                });
              }

              else if(result == 4){

                 Swal.fire({
                  title: "El cliente fue desbloqueado, sin embargo no se envio el mensaje al correo electronico",
                  type: "warning",
                  text:"¡Por favor comuniquese, con el soporte tecnico!",
                });
              }

              else{

                Swal.fire({
                  title: "No se pudo desbloquear el cliente",
                  type: "error",
                  text:"¡Por favor comuniquese, con el soporte tecnico!",
                });

              }

               //Se identifica el datatable en una variable
                var dt = $("#lista_clientes").DataTable();

                //Se recarga el datatable
                dt.ajax.reload();
           

          },

          error:function(result){

              Swal.fire("Error al desbloquear el cliente, comuniquese con el area de soporte");
       
          }
        });
    


      }
    });
}



function reconfirmar_email(email,nombre){

   Swal.fire({
      title: "¿Esta seguro que desea confirmar el email de este cliente?",
      type: "question",
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#249418',
      cancelButtonColor: '#d33',
    })
    .then((result) => {
      if (result.value) {

            Swal.fire({ 
        title: "Cargando ...", 
        type:"info",
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });
        //Se envia los dos parametro ajax_cliente
      $.ajax({
        url: '../Ajax/ajax_cliente.php',
        type: 'POST',
        data: {opcion: 'reconfirmar_email',email:email,nombre:nombre},
        success: function(result){
            Swal.close();
       
            

            //Si la respuesta es true entonces..
            if(result == 1){

                //Se muestra un mensaje alertando al cliente de que se confirmo exitosamente el correo
                 Swal.fire({
                  title: "Confirmacón de Email",
                  type: "success",
                  text:"Se ha enviado un mensaje al email "+email,
                  timer:8000
                });
                       
            }

            else{

                  Swal.fire({
                  title: "No se pudo enviar el mensaje de confirmación",
                  type: "error",
                  text:"Error al enviar el mensaje al correo electronico, por favar comuniquese con el area de soporte",
                  timer:7000
                });

            }

        },


        //Si hay algun error se muestra un mensaje de error
        error:function(){
                        Swal.fire("Error al enviar correo, Comuniquese con el area de soporte</center>"); 
        }
        });
    
      }
    
  });


}





/*=====  End of   Seccion de Metodos Funcionales BD  ======*/


















/*=====================================================================
        =            Seccion de Metodos NO Funcionales BD   =
======================================================================*/
 /** Funcion Mostrar formulario**/
//Se envia como parametro la opcion es decir si desea editar un cliente o agregar un nuevo cliente

function mostrar_formulario(opcion){

    if(opcion == 'guardar_cliente'){
    //Se cambia el texto y el icono del boton
        $("#btn-guardarcliente").text('Guardar cliente');
        $("#btn-guardarcliente").prepend('<i class="fas fa-save"></i>');
    }
    else{
    //Se cambia el texto del boton que desecadena el registro o la edición del cliente

        $("#btn-guardarcliente").text('Editar cliente');
        $("#btn-guardarcliente").prepend('<i class="fas fa-edit"></i>');

    }

//Se llama el metodo limpiar formulario
      limpiar_formulario();


    // Se oculta el boton "Registrar cliente"
    $("#btn-registrar_cliente").hide();

    //Se oculta la table de cliente
    $(".tabla_cliente").hide();

    //Se muestra el formulario de registro de cliente
    $("#form-registrocliente").removeAttr('hidden');

     //Se muestra la tabla de permisos agregados
    $(".tabla_permisos").show();

    //se cambia el titulo de la ventana
    $(".titulo_ventana").text("Registrar cliente");

    //Se limpua el subtitulo de la ventana
    $(".subtitulo_ventana").text("");

    //Se ocultará la ruta de la ventana
    $(".ruta").hide();

    //Se mostrara la opción volver
    $(".opcion_volver").show(); 
     //Se mostrará el boton de guardar cliente
    $("#btn-guardarcliente").show();
    $("#btn-cancelar_cliente").show();
    $("#form-registrocliente").attr('class',"");


    
}





/** Ocultar formulario**/
function ocultar_formulario(){


		//Cuando se cambia el tipo de documento

		
	$("#tipo_persona_cliente").change(function(event) {
		

		if (this.value == 'Persona Juridica'){

			$('.lb-nombre').text('Razon Social:(*)');
			$('#apellido').hide();
			$("#apellidos_cliente").removeAttr('required')



		}

		else{

			$('.lb-nombre').text('Nombres:(*)');
			$('#apellido').show()
			$("#apellidos_cliente").attr('required');
		}
	});
    //El input del email podra ser modificado
    $("#email_cliente").removeAttr('readonly');

    $("#num_documento_cliente").removeAttr('readonly')

    //Se vacia la clase del formulario
    $("#form-registrocliente").attr('class',"");
    $("#form-registrocliente").attr('hidden',"");

      // Se oculta el boton "Registrar cliente"
    $("#btn-registrar_cliente").show();

    //Se oculta la table de cliente
    $(".tabla_cliente").show();

     //Se muestra la tabla de permisos agregados
    $(".tabla_permisos").hide();

    //se cambia el titulo de la ventana
    $(".titulo_ventana").text("Cliente");

    //Se cambia el titulo de la ventana
    $(".subtitulo_ventana").text("Gestion cliente");

    //Se ocultara la ruta de la venta
    $(".ruta").show();

    //Se mostrara la opción volver
    $(".opcion_volver").hide();

    //Se vacia el campo de foto
    $("#img-foto").attr('src', '');

     //Se mostrará el boton de guardar cliente
    $("#btn-guardarcliente").hide();
    $("#btn-cancelar_cliente").hide();

    //Se identifica el datatable en una variable
    var dt = $("#lista_clientes").DataTable();

    dt.ajax.reload();
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






//Metodo para limpiar el formulario de registro
function limpiar_formulario(){

        //se limpian los campos del formulario
        $("#nombres_cliente").val("");
        $("#apellidos_cliente").val("");
        $("#telefono_cliente").val("");
        $(".imagen").attr('src', '');
        $("#celular_cliente").val("");
        $("#email_cliente").val("");
        $("#num_documento_cliente").val("");
        $("#foto_cliente").val("");
        $(".imagen").remove();
    }



//funcion para validar el formato de la imagen que se va a cargar
function validar_formato(){

    var fileInput = document.getElementById('foto_cliente');
    //se obtiene el valor del inputfile que carga la foto
    var filePath = fileInput.value;
    //Se guarda en la variable las extensiones permitida para la imagen
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.tiff|.gif|.raw)$/i;
    //Si el formato esta por fuera los que contiene el allowExtension entonces
    if(!allowedExtensions.exec(filePath)){
        //Se muestra una mensaje que notifique al cliente que agrege un imagen con los formatos permitidos
          Swal.fire({
                  title: "Formato de imagen incorrecto",
                  type: "warning",
                  text:"Por favor elija una imagen que tenga alguno de estos formatos (jpeg,jpg,png,gif,tiff,raw)",
                  timer:8000
                });
        //Se limpia el input file
        $("#foto_cliente").val("");

        //se retorna un false
        return false;
    }

    //de lo contrario se retorna un true
    else{
        return true;
    }
}



/*=====  End of   Seccion de Metodos NO Funcionales BD   ======*/



























   
    

