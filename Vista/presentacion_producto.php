
<?php 
session_start();

//Se valida que tenga el permiso para accede a esta pantalla
  if(!in_array("Modulo Presentacion", $_SESSION)){

 

      header("Location: sin_permiso.php");

  }
  require 'header.php';
  require 'sidebar.php';

 ?>



<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="ventana_usuario">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark titulo_ventana">Presentacion </h1><h5 class="subtitulo_ventana">Gestion Presentación de los Productos</h5>
            
          </div><!-- /.col -->
          <div class="col-sm-6 mt-3 ruta">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Bodega</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Presentación</li>
            </ol>
          </div>

           <div class="col-sm-6 pt-3">
            <ol class="breadcrumb opcion_volver float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#"><i class="fas fa-arrow-left"></i> Volver</a></li>
            
            </ol>
          </div><!-- /.col -->
      	</div>
      </div>
  </div>



   <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->


        <!-- Formulario para el registro de un usuario -->
        
        <form id="form-registropresentacion" opcion="" method="post" enctype="multipart/form-data">
        <div class="row">


        <!-- Campo "nombres" del usuario -->     
         <div class=" form-group col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Presentación:(*) </label>
          <input type="text" name="nombre_presentacion" id="nombre_presentacion" placeholder="Nombre Presentación" class="form-control input-group" required="">
           
         </div>


         <!-- Campo "apellidos" del usuario -->
         <div class="form-group col-xl-5 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Descripción:</label>
          <textarea type="text" name="descripcion_presentacion" id="descripcion_presentacion" placeholder="Descripción Presentación" class="form-control input-group"></textarea>     

         </div>


           <div class="text-center form-group col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12">
            <button type="submit" class="btn btn-success " name="btn-guardarpresentacion" id="btn-guardarpresentacion"><i class="fas fa-save icon-guardar"></i>  Guardar</button>
          <button class="btn btn-danger" onclick="ocultar_formulario();" type="button" id="btn-cancelarpresentacion" name="btn-cancelarpresentacion"><i class="fas fa-window-close"></i> Cancelar</button>
        </div>

         </div> 
 

       </form>


        <div class="row">
         <!--Boton Registrar Usuario --> 
         <div class="form-group col-12">
            <button class="btn btn-success" type="button" id="btn-registrar_presentacion">Registrar Presentación</button>
         </div>
       </div>


       <div class="row">
         <div class="col-xl-12 table-responsive tabla_presentacion">
           <table class="display table" id="lista_presentacion" name="lista_presentacion" width="100%">
             <thead width="100%">
              <td>Opciones</td>
               <td>Presentación</td>
               <td>Descripción</td>
               <td>Estado</td>   
             </thead>
             <tbody>
               
             </tbody>
           </table>
         </div>
       </div>

        
      </div>

    </section>
    <!-- /.content -->
</div>


<?php 
    require 'footer.php';
?>

<script type="text/javascript" src="../Vista/Script/presentacion_producto.js"></script>