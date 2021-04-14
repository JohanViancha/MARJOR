

/*================================================================================
=            Seccion de manejo de permiso para la pantalla de usuario            =
================================================================================*/
  var sesiones = new Array();

   //Guarda el numero de variables de mi sesison 
  var num_vari_sesion = $(".variables_sesion").children("li").length;



   $(".variables_sesion").children("li").each(function(index) {

      sesiones[index] = $(this).text();

   });


/*=====  End of Seccion de manejo de permiso para la pantalla de usuario  ======*/






/*=============================================
=            Seccion de cargue documento        =
=============================================*/


$(function(){


/* Despues de que todo el documento se cargue se llamara el metodo listar usuarios*/
  listar_usuarios();

  //Se oculta el formulario de registro
  $("#form-registrousuario").hide();
  //Se oculta la tabla <pe></pe>rmiso
  $(".tabla_permisos").hide();

  //La accion volver se oculta
  $(".opcion_volver").hide();

 //Se oculta el boton de guardar usuario
  $("#btn-guardarusuario").hide();

 



});

/*=====  End of   Seccion de cargue documento   ======*/







/*===============================================================
            =            Seccion de Eventos     =
================================================================*/


//Al dar clic al boton de "Registra Usuario" se mostrara el formulario para registrar un nuevo usuario
$("#btn-registrar_usuario").click(function(){

    //llamos la funcion mostrar_formulario y enviarmos comom parametro "guardar usuario"
    //Este parametro indica al metodo que se hara un nuevo registro y no una edición.
    mostrar_formulario('guardar_usuario');
});



//Evento se ejecuta cuando se selecciona una foto
$("#foto_usuario").change(function(event) {

    //Se llama al metodo validar formato para admitir solo algunos formatos de imagen
   var format =  validar_formato();

   //Si el input file que carga la foto esta vacio entonces...
   if($("#foto_usuario").val() == ''){

        //Se elimina el div que muestra la imagen
        $(".imagen").remove();
   }
   //Si el meotodo validar formato devuelve un true entonces...
   if(format == true){
        //variable que guardara el objeto imagen
        var file;

        var nom_foto = document.getElementById('foto_usuario').files[0].name;
        //Es estavariable se guarda el elemento que va a mostrar la imagen
        var destination = document.getElementById('foto-img');
        //Se inicia la variable vacia
        destination.innerHTML = '';
        //Se obtiene la imagen con el metodo files
        file = this.files[0];
        
        //se crea un objeto de la instancia a la clase FileReader
        //Esta clase nos permite leer cualquier tipo de archivo en este caso una imagen
        var reader = new FileReader();

        //Cuando se ejecuta el evento onload de la clase FileReader entonces...
        reader.onload = function(e) {

        //Se cre un objeto de la clase Image
        //Esta clase nos permite manipular imagenes
        var img = new Image();

        //Se asigna diferentes atributos a la imagen que se va a mostrar

        //Se obtiene el recurso de donde se trae la imagen
        img.src = e.target.result; 
        //Se agrega varias clases y estilos
        img.setAttribute("class","img-thumbnail text-center img-responsive imagen");
        img.setAttribute("nom_foto",nom_foto);
        img.style="width:150px";


        //Finalmente se muestra la imagen
        destination.appendChild(img);
        }; 
        reader.readAsDataURL(file);

   }

  
    
});






//Evento clic para volver a la pantalla anterior
$(".opcion_volver").click(function(){

    //Se llamara el metodo para ocultar el formulario
   ocultar_formulario();

});





// AL dar clic al boton "Agregar Permisos" 
$("#btn-agregarpermiso").click(function(event) {

    //Se llamara el metodo listar permisos que muestra los permisos disponibles para 
    //agregar al usuario que se este registrando.
    listar_permisos();
   
});





// Cuando se da clic en el boton de guardar usuario
$("#form-registrousuario").on("submit",function(evt){

    //Se quita el comportamiento por defecto del boton submit el cual recarga la pagina 
    //cada vez que actua
     evt.preventDefault();  

     //Esta variable guardadra el nombre de la foto
    var foto = '';

    //se crea un array que contendra los permisos agregados
    var dato_permisos = new Array();

    
   //Se recorre la tabla permisos
   $("#lista_permisos tbody").children("tr").each(function(index) {
     //Se obtiene el id de cada permiso agregado y se guarda en la array datos permiso
            dato_permisos[index] = $(this).attr('id');
          

     
   });

   console.log(dato_permisos);

    //Se usa el objeto formdata que toma automaticamente
    //los campos que se encuentran dentro del formulario que se envia por parametro a la clase FormData
    var datos_usuario = new FormData($("#form-registrousuario")[0]);
 

 
    //Se obtiene el valor de la clase del formulario form-registrousuario
    var usuario = $("#form-registrousuario").attr('class');

    //Si hay un valor en la clase del formulario se edita un usuario
    if(usuario != ''){

        //Se se agrego permisos al usuario, es decir si el array datos_permisos no esta vacio entonces...
         if(dato_permisos.length > 0){

           //Se agrega un item al objeto formdata, se envia dos parametros, la clave y el valor
           //La clave es nombre con el que se llamara a este item
            datos_usuario.append('dato_permisos',dato_permisos);

        }
 
            //Se agrega al objeto formdata el item opcion que sera evaluado en ajax_usuario
            datos_usuario.append('opcion','editar_usuario');

            //Se envia como parametro el formdata 
            editar_usuario(datos_usuario);
        
    }

    //De lo contrario si no hay un valor en la clase del formulario entonces se va a registrar un 
    //nuevo usuario
    else{

        //Si se agrego permisos al usuario entonces...
        if(dato_permisos.length > 0){

            //Se agrega un item al objeto formdata, se envia dos parametros, la clave y el valor
           //La clave es nombre con el que se llamara a este item  
              datos_usuario.append('dato_permisos',dato_permisos);
        }

             //Se agrega al objeto formdata el item opcion que sera evaluado en ajax_usuario
          datos_usuario.append('opcion','registrar_usuario');

           //Se envia como parametro el formdata 
          registrar_usuario(datos_usuario);     
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







/*====================  End of   Seccion de eventos   ================*/







/*=====================================================================
        =            Seccion de Metodos Funcionales BD   =
======================================================================*/



/** Listar Persmisos **/
function listar_permisos(){
       $('#modal_tabla_permisos').DataTable({

            /***** Opciones adicionales del datable *****/

            "keys": true,
            //Paginacion*/
            "paging":   true,
            //Ordenamiento
            "ordering": false,

            "retrieve": true,

             //Lenguaje del datatable
            "language": {
            "lengthMenu": "",
            "zeroRecords": "No hay usuarios registrados",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "Pagian 0 de 0",
             "paginate": {
                "first":      "Primero",
                "last":       "Ultimo",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            "search":         "Buscar:",
            "infoFiltered": ""
            },


             "ajax":{

                //Ubicamos la url AJAX
                 url:'../Ajax/ajax_usuario.php', 
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:'listar_permisos'}

             },

             //Se cargan las columnas
              "columns": [
                    { "data": "id_permiso",

                    //se carga un boton para agregar los permisos
                   "render": function(data,type,row){
                        return '<button id="btn-seleccionarpermiso" type="button" onclick="permiso_agregado('+row.id_permiso+',\''+row.pantalla+'\',\''+row.categoria+'\',\''+row.permiso+'\',\''+row.descripcion+'\')" class="btn btn-circle btn-success"><i class="fas fa-plus-circle"></i></button>';

                    }
                    },
                    { "data": "pantalla" },
                    { "data": "permiso" },
                    { "data": "categoria" },
                    { "data": "descripcion"}
            ]
        });
   
}






//Metodo para listar en el datatable los usuarios registrados
function listar_usuarios(){



var opcion='listar_usuarios';

//Gurdara el boton a mostrar segun su estado
var opcion_estado;
//Guardara el boton segun el valor del campo confirmado
var opcion_confirmado;
//Guarda el boton de editar
var opcion_editar;
//Se usa ajax para cargar el datatable



  var table = $('#lista_usuarios').DataTable({

            /***** Opciones adicionales del datable *****/           
            dom: 'Bfrtip',
            order: [[2, 'asc']],
            
             buttons: [
              {extend:'copy', text:'<i class="fas fa-copy"></i>',title:'Lista usuarios',titleAttr:'Copiar en el portapapeles'},
              {extend:'csv',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista usuarios'},
              {extend:'excel',messageTop:'Este informe muestra una lista con la información de todos los usuarios del sistema.',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista usuarios'},
              {extend:'pdf',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información de todos los usuarios del sistema.',titleAttr:'Exportar a PDF',exportOptions:{columns: [ 0, 1, 2, 3,4,5,6 ]},title:'Lista usuarios'},
              {extend:"print",title: "Listado de Usuarios",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [ 0, 1, 2, 3,4,5,6 ]},titleAttr: "Imprimir"},
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
            "zeroRecords": "No hay usuarios registrados",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay usuarios registrados",
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
                 url:'../Ajax/ajax_usuario.php',  
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:opcion}

             },

             //para cada columna se asigna el valor el retornado en el json
                "columns": [
                     {"data":"estado",

                      //Si el estado es activo entonces...
                    "render": function(data,type,row,meta){

                         //Si el estado es activo entonces...
                        if(data == 'Activo' && sesiones.indexOf("Inactivar Usuario") != -1){
                            //Se guarda en la variable opcion estado el boton para inactivar
                            opcion_estado_activo = '<button class="btn btn-danger btn-sm hint--top" onclick="cambiar_estado_usuario('+row.id_usuario+',\'Inactivo\')" data-hint="Inactivar Usuario"><i class="fas fa-user-times"></i></i></button>';

                        }
                        else{

                          opcion_estado_activo = '';
                        }

                        // de lo contrario si el valor es inactivo
                        if(data == 'Inactivo' && sesiones.indexOf("Activar Usuario") != -1){
                            //se guarda en la variable opción el estado el boton para activar
                           opcion_estado_inactivo = '<button class="btn btn-success btn-sm hint--top" onclick="cambiar_estado_usuario('+row.id_usuario+',\'Activo\')" data-hint="Activar Usuario"><i class="fas fa-user-check"></i></button>';
                        }

                        else{
                          opcion_estado_inactivo='';
                        }
                        //de lo contrario el estado del usuario es bloqueado entonces...
                        if (data != 'Inactivo' && data != 'Activo' && (sesiones.indexOf("Desbloquear Usuario") != -1)){

                            //Se guarda en la variable opcion estado el boton para desbloquear
                            opcion_estado_bloqueado = '<button class="btn btn-outline-success btn-sm hint--top" data-hint="Desbloquear Usuario" onclick="desbloquear_usuario(\''+row.id_usuario+'\',\''+row.correo_electronico+'\',\''+row.nombres+row.apellidos+'\')"><i class="fas fa-lock-open"></i></button>';
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

                        opcion_editar = '<button id="opcion_editar" class="btn btn-info btn-sm hint--top" onclick="mostrar_usuario('+row.id_usuario+');" data-hint="Editar Usuario"><i class="fas fa-user-edit"></i></button> ';
                       }

                        //Si no tiene permiso se guarda la variable como vacio
                       else{
                           opcion_editar = '';
                       }

                        return opcion_editar+opcion_estado_activo+opcion_estado_inactivo+opcion_estado_bloqueado+opcion_confirmado;
                    },


                    },
                    { "data": "nombres",       
                    "width" : "10%" },
                    { "data": "apellidos" },
                    { "data": "tipo_documento" },
                    { "data": "num_documento" },
                    { "data": "cargo" },
                    { "data": "foto",
                        "render": function(data,type,row){

                            //se agrega la imagen del usuario
                            return '<center><img class="rounded-circle img-thumbnail" style="width:60px" src="../files/imagenes/usuarios/'+data+'"></center>';
                         }
                    },

                    { "data": "correo_electronico"}, 
                    { "data": "estado", 

                        "render": function(data,type,row){

                            //Si el estado del usuario es activo entonces...
                            if(data == 'Activo'){
                                //se agrega una clase para la columna estado del datatalbe
                                return '<span class="rounded border border-success pl-1 pr-1 pb-1 pt-1 bg-success">'+data+'</span>';
                            }

                            //Si el estado del usuario es inactivo entonces...
                            else if(data == 'Inactivo'){

                                 //se agrega una clase para la columna estado del datatalbe
                                return '<span style="background:#ffc107; color:white" class="rounded border border-warning pl-1 pr-1 pb-1 pt-1">'+data+'</span>';
                            }

                            //De lo contrario si el estado es Bloqueado se agrega una clase para la columna estado
                            else{
                                return '<span class="text-ligth rounded border border-danger pl-1 pr-1 pb-1 pt-1 bg-danger">'+data+'</span>';
                            }
                        }
                     },
                ],

            });



/** Permisos para exportar lista de usuarios ***/


//Se guarda en un aray el nombre de los permisos para exportar la lista de usuarios
var permisos_exportar = ['Copiar en portapapeles lista Usuarios','Exportar a CSV lista Usuarios','Exportar Excel lista Usuarios','Exportar a PDF lista Usuarios','Imprimir lista Usuarios'];
//Se guarda la clase de cada boton para exportar lista de usuarios
var clases_exportar = ['.buttons-copy','.buttons-csv','.buttons-excel','.buttons-pdf','.buttons-print'];


//Se recorre el array permisos exportar
  for (var i = 0; i <= 4 ; i++) {

    //Se compara el array session con el array permisos_exportar
    if(sesiones.indexOf(permisos_exportar[i]) == -1){

      //Si el permiso no existe se elimina el boton para exportar la lista de usuarios
        table.buttons(clases_exportar[i]).remove();
    }
      
    
  }
}




// funcion para registrar un usuario
function registrar_usuario(datos_usuario){
    
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
        url: "../Ajax/ajax_usuario.php?opcion=registrar_usuario",
        type: 'POST',
        data: datos_usuario,
        contentType: false,
        processData: false,
        success: function(result){

          Swal.close();
            //valida el resultado que trae del lado del servidor php
            switch (result){

                //Si es 0 el usuario no se creo
                case '0':
                      Swal.fire({
                        title:"¡EL usuario no fue creado!",
                        text:"Error al crear el usuario, por favor comuniquese con el soporte técnico",
                        type: "error"
                      });

                break;

                //Si es 1 el usuario se creo y se envio al correo electronico la activación del usuairo
                case '1':
                     Swal.fire({
                        title:"¡EL usuario ha sido creado exitosamente!",
                        text:"¡Se ha enviado un mensaje de activación al correo "+ datos_usuario.get('email_usuario'),
                        type: "success",
                        timer: 5000
                      });
                       


                    // Se limpia el formulario
                    limpiar_formulario();

                    //Se oculta el formulario
                    ocultar_formulario();

                  
                break;

                //Si es 2 el numero de identificación ya existe para otro usuario
                case '2':

                    Swal.fire({
                        title:"¡El Numero de Identificación ya existe!",
                        text:"Si ya se registro ingrese al sistema con su usuario y contraseña ",
                        type: "warning",
                        timer: 5000
                      });
                   
                break;

                //Si es 3 el correo electronico ya existe para otro usuario
                case '3':
                     Swal.fire({
                        title:"¡El correo electronico ingresado ya existe!",
                        text:"Si ya se registro ingrese al sistema con su usuario y contraseña",
                        type: "warning",
                        timer: 5000
                      });
             
                break;

                //Si es 4 el numero de identificación y el correo electronico ya existen para otro usuario
                case '4':

                  Swal.fire({
                        title:"¡El correo electronico, el tipo y numero de identificación ingresado ya existe!",
                        text:"Si ya se registro ingrese al sistema con su usuario y contraseña",
                        type: "warning",
                        timer: 5000
                      });
                break;


                //Si es 5 se creo el usuario pero no se envio el mensaje al correo electronico
                case '5':
                       Swal.fire({
                        title:"¡EL usuario ha sido creado exitosamente!, Sin embargo no se pudo enviar las credenciales de acceso al correo "+ datos_usuario.get('email_usuario'),
                        text:"¡Por favor, comuniquese con el area de soporte!",
                        type: "warning",
                        timer: 6000
                      });
                break;

                //Por defecto se usuario no se creo
                default:
                    Swal.fire({
                        title:"¡EL usuario no se pudo registrar",
                        text:" ¡Comuniquese con el soporte técnico del sistema",
                        type: "error",
                        timer: 4000
                      });
  
                break;
            }



        },

        //Si se detecta un error al enviar a ajax se muestra un mensaje 
        error:function(result){
        Swal.fire("Error al registrar el usuario, comiquese con el area de soporte");
        }
    });  
}




//función para cambiar el estao del usuario usuario
function cambiar_estado_usuario(id_usuario,estado){

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
    var opcion = 'cambiar_estado_usuario';

//Si se va a inactivar un usuario se muestra en el texto del alert un mensaje 
//de precaución

    if(estado == "Inactivo"){

      text = "Si el usuario se inactiva no podra ingresar al sistema";
    }

    Swal.fire({
      title: "¿Esta seguro de cambiar el estado del usuario?",
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
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        //Se envia en el data la opcion, el estado y el id del usuario
        data: {opcion: opcion,id_usuario:id_usuario,estado:estado},
        success: function(result){    

          Swal.close();
          var text_estado = "";
            // si la respuesta de ajax es true entonces...
            if(result == true){

              //Se verifica que estado tiene el usuario para mostrar un mensaje de
              //usuario activo o usuario inactivo
              if(estado == 'Inactivo'){


                text_estado="¡El usuario esta ahora Inactivo!";
              }
              else{
                text_estado="¡El usuario esta ahora Activo!";

              }
            //Se muestra un mensaje confirmando el cambio de estado del usuario
           Swal.fire({
              title:"¡Estado del usuario ha cambiado!",
              text:text_estado,
              timer: 4000,
              buttons: false,
              type: "success",
            });

                //Se identifica el datatable en una variable
                var dt = $("#lista_usuarios").DataTable();

                //Se recarga el datatable
                dt.ajax.reload();
           
            }
            //de lo contrario se muestra un mensaje de que no se pudo cambiar el estado del usuario
            else{
                  Swal.fire({
                  title:"¡Error al cambiar el usuario!",
                  text:"¡No se puedo cambiar el estado del usuario!",
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


// funcion para editar un usuario
//se recibe el objeto formdata 
function editar_usuario(datos_usuario){


  Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });

    //se obtiene el id del usuario
    var id_usuario = $("#form-registrousuario").attr('class');

    //se obtiene el nombre de la imagen
    var nom_foto = $(".imagen").attr('nom_foto');

    //Se agrega el item  id usuario
    datos_usuario.append('id_usuario',id_usuario);

    //Si el input file esta vacio entonces se agrega el item de la foro al objeto formdata
    if($("#foto_usuario").val("")){
       datos_usuario.append('foto_usuario',nom_foto);  
    }
   

    $.ajax({
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        //Se envia en el data todo el objeto formdata
        data: datos_usuario,
        contentType: false,
        processData: false,
        success: function(result){

           Swal.close();

            //Si la respuesta es true
            if(result == true){

                //Se muestra un mensaje notificando que el usuario ha sido editado
                Swal.fire({
                  title:"¡Usuario editado!",
                  text:"¡EL usuario ha sido editado exitosamente!",
                  timer: 4000,
                  type: "success",
                  });
        
                //Se limpia el formulario
                limpiar_formulario();
                //Se oculta el formulario
                ocultar_formulario();
            }

            //De lo contrario se muestra un mensaje notificando que el usuario no fue editado
            else{

                Swal.fire({
                  title:"¡Error al editar el usuario!",
                  text:"¡EL usuario no se pudo editar, ¡comuniquese con el soporte técnico del sistema!!",
                  timer: 4000,
                  type: "success",
                  });
            }

          
        },
        error:function(result){
            Swal.fire("Error al editar el usuario, comiquese con el area de soporte");
            Swal.close();
        },


    });

     
}



//Función para mostrar los datos del usuario 
//se recibe como parametro el id del usuario 
function mostrar_usuario(id_usuario){



    //Se llama al metodo de mostrar formulario y se envia como para metro el mensaje de editar usuario
    mostrar_formulario('editar_usuario');

    //Se guarda en la variable opcion la accion que se realizara
    //Esta variable se valida en ajax_usuario
    var opcion = 'mostrar_usuario';
     $.ajax({
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        //Se envia al data el id_usuario y la opcion
        data: {id_usuario: id_usuario,opcion:opcion},
        success: function(result){
            //En la variable se convierte en un json
            var response = JSON.parse(result);
            //Si el resultado es diferente de false entonces...
            if(result != false){

                //Se muestra los datos en cada input
               $("#nombres_usuario").val(response[0]['nombres']);
                $("#apellidos_usuario").val(response[0]['apellidos']);
                $("select[name=cargo_usuario]").val(response[0]['cargo']);
                $("select[name=tipo_documento_usuario]").val(response[0]['tipo_documento']);
                $("#num_documento_usuario").val(response[0]['num_documento']);
                $("#telefono_usuario").val(response[0]['telefono']);
                $("#celular_usuario").val(response[0]['celular']);
                $("#email_usuario").val(response[0]['correo_electronico']);
                $("#num_documento_usuario").attr('readonly', 'true');

                //Si el correo ya esta confirmado entonces...
                if(response[0]['confirmado'] == true){
                    //Que no se permita modificar
                  $("#email_usuario").attr('readonly', 'true');
                 
                }

                // se guarda el id del usuario en la variable id
                var id = response[0]["id_usuario"];

                //se carga el id en la clase del formulario
               $("#form-registrousuario").attr('class',id);


                var img = new Image();
                var destination = document.getElementById('foto-img');

                //se carga obtiene el nommbre de la imagen
                img.src = "../files/imagenes/usuarios/"+response[0]['foto'];
                //Se agrega varias clases y estilos
                img.setAttribute("class","img-thumbnail text-center img-responsive imagen");
                img.setAttribute("nom_foto",response[0]['foto']);
                img.style ="width:150px";
                //Finalmente se muestra la imagen
                destination.appendChild(img);
        
    
                //La varialbe count sirve para recorre el while
                var count = 0;

                //Si id_idpermiso es diferente de null entonces...
                if(response[0]['id_permiso'] != null){

                    //Se usa un while para recorre el json "response"
                    while(count < response.length){

                        //La variable fila contiene la fila completa del permiso
                         var fila = '<tr id="'+response[count]['id_permiso']+'">';
                         if(sesiones.indexOf("Eliminar Permisos Usuario") != -1){
                             var opcion_eliminar_permiso = '<td id="tdpermiso"><button id="btn-quitarpermiso" class="btn btn-danger" type="button" onclick="quitar_permiso('+response[count]['id_permiso']+',\''+response[count]['ventana']+'\',\''+response[count]['permiso']+'\',\''+response[count]['descripcion']+'\')"><i class="far fa-times-circle"></i></button></td>';
                            }
                            else{
                              opcion_eliminar_permiso = '<td></td>';
                            }
                            fila = fila+opcion_eliminar_permiso+'<td>'+response[count]['pantalla']+'</td>'+
                            '<td>'+response[count]['categoria']+'</td>'+
                            '<td id="nombre_permiso">'+response[count]['permiso']+'</td>'+
                            '<td>'+response[count]['descripcion']+'</td>'+
                        '</tr>';


                        //se agrega la fila a la tabla "lista_permisos"
                        $("#lista_permisos tbody").append(fila);

                        //Se suma el contador
                        count++;
                    }
                }
    
            }

            //De lo contrario se muestra un mensaje de que no se pueden mostrar los usuarios
            else{

              Swal.fire("No se pudo mostrar los datos del usuario, comuniquese con el area de soporte técnico");
              ocultar_formulario();
            }
        },

        //Si hay un error en ajax se mostrar un mensaje
        error:function(result){
            Swal.fire("Error al mostrar el usuario, comuniquese con el area de soporte técnico");
        }
    });
    

}



function desbloquear_usuario(id_usuario,email,nombre){

     Swal.fire({
      title: "¿Esta seguro que desea desbloquear el usuario?",
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
          url: '../Ajax/ajax_usuario.php',
          type: 'POST',
          data: {id_usuario: id_usuario,email:email,nombre:nombre,opcion:'desbloquear_usuario'},
          success: function(result){
            

              Swal.close();

              if(result == 3){
                Swal.fire({
                  title: "Usuario Desbloqueado",
                  type: "success",
                  text:"EL usuario ya puede ingresar con sus credenciales de acceso al sistema",
                  timer:4000
                });
              }

              else if(result == 4){

                 Swal.fire({
                  title: "El usuario fue desbloqueado, sin embargo no se envio el mensaje al correo electronico",
                  type: "warning",
                  text:"¡Por favor comuniquese, con el soporte tecnico!",
                });
              }

              else{

                Swal.fire({
                  title: "No se pudo desbloquear el usuario",
                  type: "error",
                  text:"¡Por favor comuniquese, con el soporte tecnico!",
                });

              }

               //Se identifica el datatable en una variable
                var dt = $("#lista_usuarios").DataTable();

                //Se recarga el datatable
                dt.ajax.reload();
           

          },

          error:function(result){

              Swal.fire("Error al desbloquear el usuario, comuniquese con el area de soporte");
       
          }
        });
    


      }
    });
}



function reconfirmar_email(email,nombre){

   Swal.fire({
      title: "¿Esta seguro que desea confirmar el email de este usuario?",
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
        //Se envia los dos parametro ajax_usuario
      $.ajax({
        url: '../Ajax/ajax_usuario.php',
        type: 'POST',
        data: {opcion: 'reconfirmar_email',email:email,nombre:nombre},
        success: function(result){
            Swal.close();
       
            

            //Si la respuesta es true entonces..
            if(result == 1){

                //Se muestra un mensaje alertando al usuario de que se confirmo exitosamente el correo
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
//Se envia como parametro la opcion es decir si desea editar un usuario o agregar un nuevo usuario

function mostrar_formulario(opcion){

    if(opcion == 'guardar_usuario'){
    //Se cambia el texto y el icono del boton
        $("#btn-guardarusuario").text(' Guardar Usuario');
        $("#btn-guardarusuario").prepend('<i class="fas fa-save"></i>');
    }
    else{
    //Se cambia el texto del boton que desecadena el registro o la edición del usuario

        $("#btn-guardarusuario").text(' Editar Usuario');
        $("#btn-guardarusuario").prepend('<i class="fas fa-edit"></i>');

    }

//Se llama el metodo limpiar formulario
      limpiar_formulario();


    // Se oculta el boton "Registrar Usuario"
    $("#btn-registrar_usuario").hide();

    //Se oculta la table de usuario
    $(".tabla_usuario").hide();

    //Se muestra el formulario de registro de usuario
    $("#form-registrousuario").show();

     //Se muestra la tabla de permisos agregados
    $(".tabla_permisos").show();

    //se cambia el titulo de la ventana
    $(".titulo_ventana").text("Registrar Usuario");

    //Se limpua el subtitulo de la ventana
    $(".subtitulo_ventana").text("");

    //Se ocultará la ruta de la ventana
    $(".ruta").hide();

    //Se mostrara la opción volver
    $(".opcion_volver").show(); 
     //Se mostrará el boton de guardar usuario
    $("#btn-guardarusuario").show();
    $("#btn-cancelar_usuario").show();
    $("#form-registrousuario").attr('class',"");


    
}





/** Ocultar formulario**/
function ocultar_formulario(){

    //El input del email podra ser modificado
    $("#email_usuario").removeAttr('readonly');

    $("#num_documento_usuario").removeAttr('readonly')

    //Se vacia la clase del formulario
    $("#form-registrousuario").attr('class',"");

      // Se oculta el boton "Registrar Usuario"
    $("#btn-registrar_usuario").show();

    //Se oculta la table de usuario
    $(".tabla_usuario").show();

    //Se muestra el formulario de registro de usuario
    $("#form-registrousuario").hide();

     //Se muestra la tabla de permisos agregados
    $(".tabla_permisos").hide();

    //se cambia el titulo de la ventana
    $(".titulo_ventana").text("Usuario");

    //Se cambia el titulo de la ventana
    $(".subtitulo_ventana").text("Gestion Usuario");

    //Se ocultara la ruta de la venta
    $(".ruta").show();

    //Se mostrara la opción volver
    $(".opcion_volver").hide();

    //Se vacia el campo de foto
    $("#img-foto").attr('src', '');

     //Se mostrará el boton de guardar usuario
    $("#btn-guardarusuario").hide();
    $("#btn-cancelar_usuario").hide();

    var dt = $("#lista_usuarios").DataTable();

    //se vacia el dt
    dt.destroy();
    dt.clear();


    //Se llama la función listar usuario
    listar_usuarios();

}





/** Función para mostrar los permisos agregados**/
function permiso_agregado(idpermiso,pantalla,categoria,permiso,descripcion){


    //se crea un array que contendra los permisos agregados
    var permisos = new Array();

     //Se recorre la tabla permisos
   $("#lista_permisos tbody").children("tr").each(function(index) {
     //Se obtiene el id de cada permiso agregado y se guarda en la rray datos permiso
            permisos[index] = $(this).attr('id');

     
   });

   //Contador   
   var cont = 0;
   //Guardara false o true 
   var resultado_permiso=true;

   //Si se agrego algun permiso entonces...
   if(permisos.length > 0){

    //Se creaa un while que recorra el array permisos 
        while(cont < permisos.length){

        //Si el id de permiso ya esta agrego en la table lista_permisos entonces se muestra un
        //mensaje notificando que ya esta agregado ese permiso

        if(permisos[cont] == idpermiso){

           const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'warning',
              title: 'Este permiso ya esta agregado'
            })

            //Se asigna false a la variable resultado_permiso
            resultado_permiso = false;
            
            //se termina el while
            break;
        }

        //de lo contrario se asigna true a la variable resultado_permiso
        else{

           const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'El permiso ha sido agregado'
            })

            resultado_permiso = true;

           
           
        }

        //se suma el contador
         cont++;
       }
    }
    else{
      const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'El permiso ha sido agregado'
            })
    }


   
   //Si la respuesta es true significa que el permiso no esta agregado entoncess se agrega a la tabla
   if(resultado_permiso == true){
        var fila = '<tr id="'+idpermiso+'">';

        //Se valida que el usuario tenga el permiso para eliminar permisos al usuario
                    if(sesiones.indexOf("Eliminar Permisos Usuario") != -1){
                       var opcion_eliminar_permiso = '<td id="tdpermiso"><button id="btn-quitarpermiso" class="btn btn-danger" type="button" onclick="quitar_permiso('+idpermiso+',\''+pantalla+'\',\''+permiso+'\',\''+descripcion+'\')"><i class="far fa-times-circle"></i></button></td>';
                      }

                      else{
                        opcion_eliminar_permiso = '<td></td>';
                      }
                    fila = fila + opcion_eliminar_permiso+'<td>'+pantalla+'</td>'+
                        '<td>'+categoria+'</td>'+
                        '<td id="nombre_permiso">'+permiso+'</td>'+
                        '<td>'+descripcion+'</td>'+
                    '</tr>';
                  

        $("#lista_permisos").append(fila);

    }
}









/** Función para quitar el permiso permisos **/
function quitar_permiso(idpermiso,ventana,permiso,descripcion){

  //Se elimina la fila permiso de la tabla lista permisos
    $("#lista_permisos #"+idpermiso+"").remove();
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
    var c_especiales = ['@','%','&','#','?','!','*','+'];
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
                numero = Math.round(Math.random() * (0 + 20));
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

            numero = Math.round(Math.random() * (0 + 20));
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
        $("#nombres_usuario").val("");
        $("#apellidos_usuario").val("");
        $("#telefono_usuario").val("");
        $(".imagen").attr('src', '');
        $("#celular_usuario").val("");
        $("#email_usuario").val("");
        $("#num_documento_usuario").val("");
        $("#foto_usuario").val("");
        $("#lista_permisos tbody tr").remove();
        $(".imagen").remove();
    }



//funcion para validar el formato de la imagen que se va a cargar
function validar_formato(){

    var fileInput = document.getElementById('foto_usuario');
    //se obtiene el valor del inputfile que carga la foto
    var filePath = fileInput.value;
    //Se guarda en la variable las extensiones permitida para la imagen
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.tiff|.gif|.raw)$/i;
    //Si el formato esta por fuera los que contiene el allowExtension entonces
    if(!allowedExtensions.exec(filePath)){
        //Se muestra una mensaje que notifique al usuario que agrege un imagen con los formatos permitidos
          Swal.fire({
                  title: "Formato de imagen incorrecto",
                  type: "warning",
                  text:"Por favor elija una imagen que tenga alguno de estos formatos (jpeg,jpg,png,gif,tiff,raw)",
                  timer:8000
                });
        //Se limpia el input file
        $("#foto_usuario").val("");

        //se retorna un false
        return false;
    }

    //de lo contrario se retorna un true
    else{
        return true;
    }
}



/*=====  End of   Seccion de Metodos NO Funcionales BD   ======*/



























   
    

