

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

  listar_categorias();

});





/*=======================================
=            Section Eventos            =
=======================================*/



/** Opcion volver **/
$(".opcion_volver").click(function(){

   ocultar_formulario();

});

/*Opcion registrar presentacion*/

$("#btn-registrar_categoria").click(function(){
     //Se cambio el valor opción en editar para determinar que se va editar una
    //categoria y no una nueva categoria
    $("#form-registrocategoria").attr('opcion','registrar');

	mostrar_formulario();
});


/*Opción volver*/
$("#btn-cancelarcategoria").click(function(){

	ocultar_formulario();
});


$("#form-registrocategoria").on("submit",function(event) {
	event.preventDefault();

    var opcion = $(this).attr('opcion');

    if(opcion == 'editar'){

        editar_categoria();
    }
    else{

        registrar_categoria();
    }


});


/*=====  End of Eventos  ======*/






/*==================================================
=            Metodos Funciondales BD            =
==================================================*/

function registrar_categoria(){

    var nom_categoria = $("#nombre_categoria").val();
    var des_categoria = $("#descripcion_categoria").val();

    datos_categoria = [nom_categoria,des_categoria];

	$.ajax({
		url: '../Ajax/ajax_categoria_pro.php',
		type: 'POST',
		data: {opcion: 'registrar_categoria',datos_categoria:datos_categoria},
		success:function(result){
			console.log(result);
				if(result == 1){

				 Swal.fire({
                        title:"¡Se ha registrado la categoria de productos!",
                        text:"La información de la categoria fue registrada exitosamente",
                        type: "success",
                        timer: 8000
                        });
			}

			else{

         Swal.fire({
                        title:"¡Error al registrar la categoria!",
                        text:"Comuniquese con el area de soporte",
                        type: "error",
                        timer: 8000
                        });
			
			}
			ocultar_formulario();

      var dt = $('#lista_categoria').DataTable();

      dt.ajax.reload(); 
		},
		error:function(result){
			Swal.fire({
                        title:"¡Error al registrar la categoria de productos!",
                        text:"Comuniquese con el area de soporte",
                        type: "error",
                        timer: 8000
                        });
		}
	});
}



function listar_categorias(){
var opcion_estado_inactivo;
var opcion_estado_activo;
var opcion_editar;



var table = $('#lista_categoria').DataTable({

            /***** Opciones adicionales del datable *****/


            dom: 'Bfrtip',
            order: [[2, 'asc']],
            
             buttons: [
              {extend:'copy', text:'<i class="fas fa-copy"></i>',title:'Lista de Categorias de Productos',titleAttr:'Copiar en el portapapeles'},
              {extend:'csv',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [1, 2,3]},title:'Lista de Categorias de Productos'},
              {extend:'excel',messageTop:'Este informe muestra una lista con la información de todas las categorias de producto.',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 1, 2,3]},title:'Lista de Categorias de Productos'},
              {extend:'pdf',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información de todas las categorias de producto.',titleAttr:'Exportar a PDF',exportOptions:{columns: [1, 2,3]},title:'Lista de Categorias de Productos'},
              {extend:"print",title: "Listado de Categorias de Productos",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [1, 2,3]},titleAttr: "Imprimir"},
             ],

            //Paginacion*/
            "paging":   true,
            //Ordenamiento
            "ordering": true,

            "retrieve": true,

            "searching":true,


             //Lenguaje del datatable
            "language": {
            "lengthMenu": "",
            "zeroRecords": "No hay categorias registradas",
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
                 url:'../Ajax/ajax_categoria_pro.php', 
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:'listar_categorias'}

             },

              "columns": [
                      { "data":"", 
                      "render": function(data,type,row,meta){

                         //Si el estado es activo entonces...
                      
                            //Se guarda en la variable opcion estado el boton para inactivar
                           
                            if(row.estado == 0  && sesiones.indexOf("Activar Categoria Producto") != -1){

                                opcion_estado_inactivo = '<button class="btn btn-success btn-sm hint--top" onclick="cambiar_estado_categoria('+row.idcategoria_producto+',\'Activo\')" data-hint="Activar Categoria"><i class="fas fa-user-check"></i></button>';
                           
                            }
                            else{
                                opcion_estado_inactivo='';
                            }

                            if(row.estado == 1 && sesiones.indexOf("Inactivar Categoria Producto") != -1){
                                opcion_estado_activo = '<button class="btn btn-danger btn-sm hint--top" onclick="cambiar_estado_categoria('+row.idcategoria_producto+',\'Inactivo\')" data-hint="Inactivar Categoria"><i class="fas fa-user-times"></i></i></button>';
                            }
                            else{
                                opcion_estado_activo='';
                            }

                            if(sesiones.indexOf("Editar Categoria Producto") != -1){

                                opcion_editar = '<button id="opcion_editar" class="btn btn-info btn-sm hint--right" onclick="mostrar_categoria('+row.idcategoria_producto+',\'editar\');" data-hint="Editar Categoria"><i class="fas fa-user-edit"></i></button> ';
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
var permisos_exportar = ['Copiar en portapapeles lista Categoria Productos','Exportar a CSV lista Categoria Productos','Exportar Excel lista Categoria Productos','Exportar a PDF lista Categoria Productos','Imprimir lista Categoria Productos'];
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


function editar_categoria(){

   

    var nombre = $("#nombre_categoria").val();
    var descripcion = $("#descripcion_categoria").val();
    var id_presentacion = $("#form-registrocategoria").attr('id_categoria');

    var datos_categoria = [id_presentacion,nombre,descripcion];


    $.ajax({
        url: '../Ajax/ajax_categoria_pro.php',
        type: 'POST',
        data: {opcion: 'editar_categoria',datos_categoria:datos_categoria},
        success:function(result){

                if(result == 1){
                    Swal.fire({
                        title:"¡La categoria ha sido editada!",
                        text:"La información de la categoria fue editada exitosamente",
                        type: "success",
                        timer: 8000
                        });
                  
                }
                else{

                     Swal.fire({
                        title:"¡Error al editar los datos de la categoria de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });

                }

                ocultar_formulario();
                limpiar_formulario();

                 var dt = $("#lista_categoria").DataTable();
                 dt.ajax.reload();


        },
        error:function(result){

             Swal.fire({
                        title:"¡Error al editar los datos de la categoria de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });
        }
    });


}

function mostrar_categoria(id_categoria,opcion){

        $("#form-registrocategoria").attr('opcion',opcion);

        mostrar_formulario();

        

        $("#form-registrocategoria").attr('id_categoria',id_categoria);

       $.ajax({
        url: '../Ajax/ajax_categoria_pro.php',
        type: 'POST',
        data: {opcion: 'mostrar_categoria',id_categoria:id_categoria},
        success:function(result){


            var data = JSON.parse(result);


            $("#nombre_categoria").val(data[0]["nombre"]);
            $("#descripcion_categoria").val(data[0]["descripcion"]);


        },
        error:function(result){

              Swal.fire({
                        title:"¡Error al cargar los datos de la categoria de productos!",
                        text:"Comuniquese con el soporte técnico",
                        type: "error",
                        timer: 6000
                        });
        }
    });




}


function cambiar_estado_categoria(id_categoria,estado){

//Se muestra un mensaje de carga
      Swal.fire({ 
        title: "Cargando ...", 
        allowOutsideClick: false ,
        text: "Por favor espere un momento", 
          onBeforeOpen: () => {
          Swal.showLoading();
        }
        });
    
     var text = "";
     var title = "";


    //Si se va a inactivar una categoria se muestra en el texto del alert un mensaje 
    //de precaución

    if(estado == "Inactivo"){

      text = "¡Si la categoria se inactiva no pordrá ser usada!";

      title = "¿Estas seguro de inactivar esta categoria de productos?";
    }

    else{
      title = "¿Estas seguro de activar esta categoria de productos?"; 
    }

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
            url: '../Ajax/ajax_categoria_pro.php',
            type: 'POST',
            data: {opcion: 'cambiar_estado_categoria',id_categoria:id_categoria,estado:estado},
            success:function(result){

                    if(result == 1){

                        // si el estado es inactivo se muestra un mensaje del que la categoria
                        //esta inactiva
                        if(estado == "Inactivo"){
                            text = "¡Esta categoria de productos ahora está inactiva!";
                        }
                        // de lo contario se muestra el mensaje de categoria inacivada
                        else{
                            text = '¡Esta categoria de productos ahora está activa!'
                        }

                        Swal.fire({
                        title:"¡Ha sido cambiado el estado de esta categoria de producto!",
                        text:text,
                        type: "success",
                        timer: 8000
                        });
                    }
                    else{
                         Swal.fire({
                        title:"¡Error al cambiar el estado de la categoria de productos!",
                        text:"¡Comuniquese con el area de soporte!",
                        type: "error",
                        timer: 8000
                        });

                    }


                     var dt = $("#lista_categoria").DataTable();
                     dt.ajax.reload();


            },
            error:function(result){

                   Swal.fire({
                        title:"¡Error al cambiar el estado de la categoria de productos!",
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


	$("#nombre_categoria").val("");
	$("#descripcion_categoria").val("");
}


//Función para mostrar el formulario
function mostrar_formulario(){

	$("#form-registrocategoria").show();
	$(".tabla_categoria").hide();
	$(".opcion_volver").show();
	$(".ruta").hide();
	$("#btn-registrar_categoria").hide();



}


function ocultar_formulario(){
    limpiar_formulario();
	$("#form-registrocategoria").hide();
	$(".tabla_categoria").show();
	$(".ruta").show();
	$(".opcion_volver").hide();
	$("#btn-registrar_categoria").show();


}

/*=====  End of Metodos NO Funcionales BD  ======*/


