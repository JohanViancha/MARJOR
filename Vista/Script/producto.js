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

  listar_productos();

});


//Función para listar todos los productos

function listar_productos(){

var table =	 $('#lista_producto').DataTable({

            

            /***** Opciones adicionales del datable *****/
            dom: 'Bfrtip',
            order: [[2, 'asc']],
     
             buttons: [
              {extend:'copyHtml5', text:'<i class="fas fa-copy"></i>',title:'Listado de Productoss',titleAttr:'Copiar en el portapapeles'},
              {extend:'csvHtml5',text:'<i class="fa fa-file-csv"></i>',titleAttr:'Exportar a CSV',exportOptions:{columns: [ 0, 1, 2, 3,4,5]},title:'Listado de Productos'},
              {extend:'excelHtml5',messageTop:'Este informe muestra una lista con la información de todos los productos del sistema.',text:'<i class="fas fa-file-excel"></i>',titleAttr:'Exporta a Excel',autoFilter:true,exportOptions: {columns: [ 0, 1, 2, 3,4,5 ]},title:'Listado de Productos'},
              {extend:'pdfHtml5',text:'<i class="fas fa-file-pdf"></i>',messageTop:'Este informe muestra una lista con la información de todos los productos del sistema.',titleAttr:'Exportar a PDF',exportOptions:{columns: [ 0, 1, 2, 3,4,5]},title:'Listado de Productos'},
              {extend:"print",title: "Listado de Productos",text :'<i class="fas fa-print"></i>',exportOptions: {columns: [ 0, 1, 2, 3,4,5]},titleAttr: "Imprimir"},
             ],

         
            //Paginacion*/
            "paging":   true,
            //Ordenamiento
            "ordering": false,

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
                 url:'../Ajax/ajax_producto.php', 
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:'listar_productos'}

             },

              "columns": [
                      { "data":"codigo"},
                      { "data": "categoria"},
                      { "data": "presentacion"},
                      { "data": "nombre_producto"},
                      { "data": "cantidad"},
                      { "data": "precio"}
            ],

               "createdRow": function( row, data, dataIndex ) {
              if (data["cantidad"] <= 5) {
                
                //Se aplica un animación a los productos con baja stock
                 $(row).attr('class', 'parpadeo_fondo');  

              }
            },


});

//Cuando se termine de cargar el datable entoncess....

$('#lista_producto').on( 'init.dt', function () {

  //Se verifica el stock de cada producto

     $('#lista_producto tbody tr').each( function() {



        var columna = $('td', this);
        var stock = $(columna[4]).text();

        //Si es menor a 5 entonces se muestra un tooltip
         
        if ( stock <= 5){

          this.setAttribute( 'title', '¡Stock insuficiente!');
        }

             
    } );
} );







/** Permisos para exportar lista de productos ***/


//Se guarda en un aray el nombre de los productos para exportar la lista de productos
var permisos_exportar = ['Copiar en portapapeles lista Productos','Exportar a CSV lista Productos','Exportar Excel lista Productos','Exportar a PDF lista Productos','Imprimir lista Productos'];
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