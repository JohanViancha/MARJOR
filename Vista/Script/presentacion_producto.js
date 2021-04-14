


/*================================================================================
=            Seccion de manejo de permiso para la pantalla de producto            =
================================================================================*/
  var sesiones = new Array();

   //Guarda el numero de variables de mi sesison 
  var num_vari_sesion = $(".variables_sesion").children("li").length;



   $(".variables_sesion").children("li").each(function(index) {

      sesiones[index] = $(this).text();

   });


/*=====  End of Seccion de manejo de permiso para la pantalla de usuario  ======*/




$(function(){


  //La accion volver se oculta
  $(".opcion_volver").hide();

  ocultar_formulario();

  listar_presentaciones();

});





/*=======================================
=            Section Eventos            =
=======================================*/



/** Opcion volver **/
$(".opcion_volver").click(function(){

   ocultar_formulario();

});

/*Opcion registrar presentacion*/

$("#btn-registrar_presentacion").click(function(){
    $("#form-registropresentacion").attr('opcion','registrar');
	mostrar_formulario();
});


/*Opción volver*/
$("#btn-cancelarpresentacion").click(function(){

	ocultar_formulario();
});


$("#form-registropresentacion").on("submit",function(event) {
	event.preventDefault();

    var opcion = $(this).attr('opcion');

    if(opcion == 'editar'){

        editar_presentacion();
    }
    else{

        registrar_presentacion();
    }


});


/*=====  End of Eventos  ======*/






/*==================================================
=            Metodos Funciondales BD            =
==================================================*/

function registrar_presentacion(){


    var nom_presentacion = $("#nombre_presentacion").val();
    var des_presentacion = $("#descripcion_presentacion").val();

    datos_presentacion = [nom_presentacion,des_presentacion];

	$.ajax({
		url: '../Ajax/ajax_presentacion.php',
		type: 'POST',
		data: {opcion: 'registrar_presentacion',datos_presentacion:datos_presentacion},
		success:function(result){
			console.log(result);
				if(result == 1){

                Swal.fire({
                        title:"¡Se ha registrado la presentación de productos!",
                        text:"La información de la presentación fue registrada exitosamente",
                        type: "success",
                        timer: 8000
                        });

			}

			else{

                  Swal.fire({
                        title:"¡Error al registrar la presentación!",
                        text:"Comuniquese con el area de soporte",
                        type: "error",
                        timer: 8000
                        });
			}
			ocultar_formulario();
      


           var dt = $('#lista_presentacion').DataTable();

           dt.ajax.reload();
		},
		error:function(result){
			Swal.fire({
                        title:"¡Error al registrar la presentación!",
                        text:"Comuniquese con el area de soporte",
                        type: "error",
                        timer: 8000
                        });
		}
	});
}



function listar_presentaciones(){
var opcion_estado_inactivo;
var opcion_estado_activo;
var opcion_editar;



var table = $('#lista_presentacion').DataTable({

            /***** Opciones adicionales del datable *****/

            dom: 'Bfrtip',
            order: [[2, 'asc']],
            
             buttons: [
              {extend:'copyHtml5', text:'<i class="fas fa-copy"></i>',title:'Lista de Presentaciones de Productos',titleAttr:'Copiar en el portapapeles'},
              {extend:'csvHtml5',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [1, 2,3]},title:'Lista Presentaciones de Productos'},
              {extend:'excelHtml5',messageTop:'Este informe muestra una lista con la información de todas las presentaciones de productos.',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 1, 2,3]},title:'Lista de Presentaciones de Productos'},
              {extend:'pdfHtml5',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información de todas las presentaciones de productos.',titleAttr:'Exportar a PDF',exportOptions:{columns: [1, 2,3]},title:'Lista de Presentaciones de Productos'},
              {extend:"print",title: "Listado de Presentaciones de Productos",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [1, 2]},titleAttr: "Imprimir"},
             ],

            //Paginacion*/
            "paging":   false,
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
                 url:'../Ajax/ajax_presentacion.php', 
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:'listar_presentaciones'}

             },

              "columns": [
                      { "data":"", 
                      "render": function(data,type,row,meta){

                         //Si el estado es activo entonces...
                      
                            //Se guarda en la variable opcion estado el boton para inactivar
                           
                            if(row.estado == 0 && sesiones.indexOf("Activar Presentación Producto") != -1){

                                opcion_estado_inactivo = '<button class="btn btn-success btn-sm hint--top" onclick="cambiar_estado_presentacion('+row.idpresentacion_producto+',\'Activo\')" data-hint="Activar Presentación"><i class="fas fa-user-check"></i></button>';
                           
                            }
                            else{
                                opcion_estado_inactivo='';
                            }

                            if(row.estado == 1 && sesiones.indexOf("Inactivar Presentación Producto") != -1){
                                opcion_estado_activo = '<button class="btn btn-danger btn-sm hint--top" onclick="cambiar_estado_presentacion('+row.idpresentacion_producto+',\'Inactivo\')" data-hint="Inactivar Presentación"><i class="fas fa-user-times"></i></i></button>';
                            }
                            else{
                                opcion_estado_activo='';
                            }

                            if(sesiones.indexOf("Editar Presentación Producto") != -1){

                                opcion_editar = '<button id="opcion_editar" class="btn btn-info btn-sm hint--right" onclick="mostrar_presentacion('+row.idpresentacion_producto+');" data-hint="Editar Presentación"><i class="fas fa-user-edit"></i></button> ';
                            }
                            else{
                                opcion_editar = '';
                            }

                            return opcion_editar+opcion_estado_activo+opcion_estado_inactivo;
                        }
                    },
                    { "data": "nombre" },
                    { "data": "descripcion" },
                    { "data": "estado",
                    "render": function(data,type,row,meta){

                            if(data == 1){

                                 return '<center><span class="rounded border border-success pl-1 pr-1 pb-1 pt-1 bg-success">Activo</span></center>';
                            }

                            else{
                                 return '<center><span class="text-ligth rounded border border-danger pl-1 pr-1 pb-1 pt-1 bg-danger">Inactivo</span></center>';
                            }

                        }
                     }
            ]
        });



/** Permisos para exportar lista de usuarios ***/


//Se guarda en un aray el nombre de los permisos para exportar la lista de usuarios
var permisos_exportar = ['Copiar en portapapeles lista Presentación Productos','Exportar a CSV lista Presentación Productos','Exportar Excel lista Presentación Productos','Exportar a PDF lista Presentación Productos','Imprimir lista Presentación Productos'];
//Se guarda la clase de cada boton para exportar lista de usuarios
var clases_exportar = ['.buttons-copy','.buttons-csv','.buttons-excel','.buttons-pdf','.buttons-print'];


//Se recorre el array permisos exporta

  for (var i = 0; i <= 4 ; i++) {

    //Se compara el array session con el array permisos_exportar
    if(sesiones.indexOf(permisos_exportar[i]) == -1){

      //Si el permiso no existe se elimina el boton para exportar la lista de usuarios
        table.buttons(clases_exportar[i]).remove();
    }
      
    
  }
   

}


function editar_presentacion(){

    var nombre = $("#nombre_presentacion").val();
    var descripcion = $("#descripcion_presentacion").val();
    var id_presentacion = $("#form-registropresentacion").attr('id_presentacion');

    var datos_presentacion = [id_presentacion,nombre,descripcion];


    $.ajax({
        url: '../Ajax/ajax_presentacion.php',
        type: 'POST',
        data: {opcion: 'editar_presentacion',datos_presentacion:datos_presentacion},
        success:function(result){

                if(result == 1){
                      Swal.fire({
                        title:"¡La presentación ha sido editada!",
                        text:"La información de la presentación fue editada exitosamente",
                        type: "success",
                        timer: 8000
                        });
                  
                }
                else{
                     Swal.fire({
                        title:"¡Error al editar los datos de la presentación de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });

                }

                ocultar_formulario();
                limpiar_formulario();

                 var dt = $("#lista_presentacion").DataTable();
                 dt.ajax.reload();


        },
        error:function(result){

              Swal.fire({
                        title:"¡Error al editar los datos de la presentación de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });
        }
    });


}

function mostrar_presentacion(id_presentacion){



        mostrar_formulario();

        $("#form-registropresentacion").attr('opcion','editar');

        $("#form-registropresentacion").attr('id_presentacion',id_presentacion);

       $.ajax({
        url: '../Ajax/ajax_presentacion.php',
        type: 'POST',
        data: {opcion: 'mostrar_presentacion',id_presentacion:id_presentacion},
        success:function(result){


            var data = JSON.parse(result);


            $("#nombre_presentacion").val(data[0]["nombre"]);
            $("#descripcion_presentacion").val(data[0]["descripcion"]);


        },
        error:function(result){

                Swal.fire({
                        title:"¡Error al cargar los datos de la presentación de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });
        }
    });




}


function cambiar_estado_presentacion(id_presentacion,estado){


   // Se muestra un mensaje de carga
      Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });

 
     if(estado == "Inactivo"){

      text = "¡Si la presentación se inactiva no pordrá ser usada!";

      title = "¿Estas seguro de inactivar esta presentación de productos?";
    }

    else{
      title = "¿Estas seguro de activar esta presentación de productos?"; 
    }
       //Se mostrara un mensaje de confirmación para activar o inactivar la presentacion

    Swal.fire({
      title:title,
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
        $.ajax({
            url: '../Ajax/ajax_presentacion.php',
            type: 'POST',
            data: {opcion: 'cambiar_estado_presentacion',id_presentacion:id_presentacion,estado:estado},
            success:function(result){

                    if(result == 1){

                        if(estado == "Inactivo"){
                            text = "¡Esta presentación de productos ahora está inactiva!";
                        }
                         else{
                            text = '¡Esta presentación de productos ahora está activa!'
                        }

                        Swal.fire({
                        title:"¡Ha sido cambiado el estado de esta presentación de producto!",
                        text:text,
                        type: "success",
                        timer: 8000
                        });
                    }
                    else{
                        Swal.fire({
                        title:"¡Error al cambiar el estado de la presentación de productos!",
                        text:"¡Comuniquese con el area de soporte!",
                        type: "error",
                        timer: 8000
                        });
                    }


                     var dt = $("#lista_presentacion").DataTable();
                     dt.ajax.reload();


            },
            error:function(result){

                    Swal.fire({
                        title:"¡Error al cambiar el estado de la presentación de productos!",
                        text:"¡Comuniquese con el area de soporte!",
                        type: "error",
                        timer: 8000
                        });
            }
        });
    }

});




}




/*=====  End of Metodos Funcionales BD  ======*/










/*==================================================
=            Metodos NO Funciondales BD            =
==================================================*/

//Función para limpiar el formulario
function limpiar_formulario(){


	$("#nombre_presentacion").val("");
	$("#descripcion_presentacion").val("");
}


//Función para mostrar el formulario
function mostrar_formulario(){

	$("#form-registropresentacion").show();
	$(".tabla_presentacion").hide();
	$(".opcion_volver").show();
	$(".ruta").hide();
	$("#btn-registrar_presentacion").hide();



}


function ocultar_formulario(){
  limpiar_formulario();
	$("#form-registropresentacion").hide();
	$(".tabla_presentacion").show();
	$(".ruta").show();
	$(".opcion_volver").hide();
	$("#btn-registrar_presentacion").show();


}

/*=====  End of Metodos NO Funcionales BD  ======*/


