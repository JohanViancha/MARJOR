
/*=============================================
=            Seccion de cargue documento        =
=============================================*/

$(function(){

/* Despues de que todo el documento se cargue se llamara el metodo listar permisos*/
  listar_permisos();
  limpiar_formulario();
  listar_categoriapermiso('listar_categoriapermiso');
  listar_pantallas('listar_pantallas');

  $(".el-funcional").hide();

} );




/*=====  End of   Seccion de cargue documento   ======*/



//Metodo para listar en el datatable los permisos registrados
function listar_permisos(){
var opcion = 'listar_permisos';

//Se usa ajax para cargar el datatable
     var tabla =  $('#lista_permisos').DataTable({

            /***** Opciones adicionales del datable *****/

            //Paginacion
            "paging":   true,
            // Informacion de la tabla
            "info":     true,

            "order":    false,

     


             //Lenguaje del datatable
            "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No hay permisos registrados",
            "info": "Página _PAGE_ de _PAGES_",
            "infoEmpty": "",
             "paginate": {
                "first":      "Primero",
                "last":       "Ultimo",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            "search":         "Buscar:",
            "infoFiltered": "(Filtrado from _MAX_ registros totales)"
            },


             "ajax":{

                //Ubicamos la url AJAX
                 url:'../Ajax/ajax_permiso.php',  
                 //Especificamos el tipo
                type: 'POST',
                //Especificamos el tipo de dato
                dataType:'json',
                //Se envia la variable
                 data: {opcion:opcion}

             },

             //para cada columna se asigna el valor el retornado en el json
                "columns": [
                    { "data": "permiso" },
                    { "data": "pantalla" },
                    { "data": "categoria" },
                    { "data": "descripcion" }
                ]

    
     });

     //Filtro para buscar por el nombre del permiso
    $('#nombre_permiso').on( 'keyup', function () {
 
        tabla.columns( 0 ).search( this.value ).draw()
    });

    //Filtro para buscar por la categoria del permiso
    $('#categoria_permiso').on( 'change', function () {

   

        //Si se se da clic en la opción de todos se borrar los filtros para esa columna
        if(this.value == 0){
              tabla.search('').columns(2).search('') .draw(); 
        }

        //De lo contrario se filtra por la categoria selecciona
        else{     

             tabla.columns(2).search( this.options[this. selectedIndex]. innerText).draw();     
        }
    });

     //Filtro para buscar por la pantalla del permiso
    $('#pantalla').on( 'change', function (evt) {


        //Si se se da clic en la opción de todos se borrar los filtros para esa columna

        if(this.value == 0){

           
            tabla.search('').columns(1).search('') .draw(); 
        }

        //De lo contrario se filtra por la pantalla selecciona

        else{

             tabla.columns(1).search( this.options[this. selectedIndex]. innerText).draw();

        }

          
     
    });


      //Filtro para buscar por el funcionalidad del permiso
    $('#funcionalidad_permiso').on( 'keyup', function () {
        tabla.columns(3).search( this.value ).draw();
    });


    
      
}





//Metodo para limpiar el formulario de registro
function limpiar_formulario(){

        $("#nombre_permiso").val("");
        $("#pantalla option").remove(".opcion_pantalla");
        $("#categoria_permiso option").remove(".opcion_categoria");
        $("#elemento_funcional").val("");
        $("#funcionalidad_permiso").val("");
}



//Metodo listar categorias permiso
function listar_categoriapermiso(opcion){

    $.ajax({
        url: '../Ajax/ajax_permiso.php',
        type: 'POST',
        dataType: 'json',
        data: {opcion: opcion},
        success:function(result){
    
            var cont = 0;
            while(cont < result.length){

            $("#categoria_permiso").append('<option class="opcion_categoria" value="'+result[cont]['id_categoria_permiso']+'">'+result[cont]['categoria']+'</option>');

             cont++;
            }


            //Se guarda el numero de opciones en el select categoria permiso
            var opciones = $("#categoria_permiso option").length;


            // revisa que el select no este vacio
           if (opciones == 1){

                //Si no hay categorias para listar se muestra un icono para mostrar un mensaje

                $(".lb-categoria_permiso").append('<span class="icon-alert_ca text-danger hint--top hint--medium hint--error" data-hint="¡No hay categorias para mostrar!, ingrese al modulo de Categorias Permiso y registre una"><i class="fas fa-exclamation-circle "></i></span>');
           } 


           //De lo contrario si hay registros para mostrar se agrega una opción para mostrar todos
           else{
                    $("#categoria_permiso").prepend('<option class="opcion_categoria" value="0">Todos</option>');

           }


           
                    
        },  

        error:function(result){
            console.log('Error' + result);
        }
    });

}




//Metodo listar categorias permiso
function listar_pantallas(opcion){

    $.ajax({
        url: '../Ajax/ajax_permiso.php',
        type: 'POST',
        dataType: 'json',
        data: {opcion: opcion},
        success:function(result){
            var cont = 0;

            while(cont < result.length){

            $("#pantalla").append('<option class="opcion_pantalla" value="'+result[cont]['id_pantalla']+'">'+result[cont]['pantalla']+'</option>');

             cont++;
            }


            //Se guarda el numero de opciones en el select categoria permiso
            var opciones = $("#pantalla option").length;


            // revisa que el select no este vacio
            if(opciones == 1) {

                //Si no hay pantalla para listar se muestra un icono para mostrar un mensaje
                 $(".lb-pantalla").append('<span class="icon-alert_pan text-danger hint--top hint--medium hint--error" data-hint="¡No hay pantallas para mostrar!, ingrese al modulo de Pantalla y registre una"><i class="fas fa-exclamation-circle "></i></span>');

            }

            //De lo contrario si hay registros para mostrar se muestra una opcion para mostrar todos
            else{

                $("#pantalla").prepend('<option class="opcion_pantalla" value="0">Todos</option>');

            }



           
                    
        },  

        error:function(result){
            console.log('Error' + result);
        }
    });

}
   

   
    

