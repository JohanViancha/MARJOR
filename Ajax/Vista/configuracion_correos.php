
<?php 
session_start();

//Se valida que tenga el permiso para accede a esta pantalla
  if(!in_array("Modulo Configuracion de Correos", $_SESSION)){

 

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
            <h1 class="m-0 text-dark titulo_ventana">Configuración de Correos </h1><h5 class="subtitulo_ventana">Gestión de la configuración de correos</h5>
            
          </div><!-- /.col -->
          <div class="col-sm-6 mt-3 ruta">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Administración</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Configuración Correos</li>
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



</div>


<?php 
    require 'footer.php';
?>

<script type="text/javascript" src="../Vista/Script/presentacion_producto.js"></script>