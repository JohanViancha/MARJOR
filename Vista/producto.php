
<?php 
session_start();


//Se valida que tenga el permiso para acceder a esta pantalla
  if(!in_array("Modulo Producto", $_SESSION)){

 
    //Si no tiene el permiso se redirecciona 
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
            <h1 class="m-0 text-dark titulo_ventana">Productos</h1>
            <h5 class="subtitulo_ventana">Lista de Productos</h5>         
          </div>
          <!-- /.col -->
          <div class="col-sm-6 mt-3 ruta">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Bodega</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Producto</li>
            </ol>
          </div>
      	</div>
      </div>
  </div>


   <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->

       <div class="row">
         <div class="col-xl-12 table-responsive tabla_producto">
           <table class="display table" id="lista_producto" name="lista_producto" width="100%">
             <thead width="100%">
              <td>Codigo</td>
               <td>Categoria</td>
               <td>Presentación</td>
               <td>Producto</td>
               <td>Stock</td>
               <td>Precio</td>
             </thead>
             <tbody>
               
             </tbody>
           </table>
         </div>
       </div>

        
      </div>

    </section>
</div>

<?php 
    require 'footer.php';
?>

<script type="text/javascript" src="../Vista/Script/producto.js"></script>
