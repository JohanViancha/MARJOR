
<?php 

//Se inicia la session
  session_start();

  //Se verifica que si no tiene el permiso salga la pantalla de sin permiso

 if(!in_array("Modulo Permiso", $_SESSION)){

 

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
            <h1 class="m-0 text-dark titulo_ventana">Permisos </h1><h5 class="subtitulo_ventana">Ver Permisos</h5>
            
          </div><!-- /.col -->
          <div class="col-sm-6 ruta pt-3">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item ruta_modulo"><a href="#">Sesión</a></li>
              <li class="breadcrumb-item ruta_submodulo active">Permiso</li>
            </ol>
          </div><!-- /.col -->

          <!-- Accion Volver -->      
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <hr>
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->

        <form id="form-registropermiso" method="post" action="#">
        <div class="row">
           <div class=" form-group col-12">
           <h6><b>Filtros:</b></h6>
          </div>

        <!-- Campo de nombre del permiso -->
        
         <div class=" form-group col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Permiso:(*) </label>
          <input type="text" name="nombre_permiso" id="nombre_permiso" placeholder="Nombre Permiso" class="form-control input-group">
           
         </div>

         <!-- Campos de venta del permiso --> 
         <div class=" form-group col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label lb-pantalla">Pantalla:(*)</label>
          <select name="pantalla" id="pantalla"  class="form-control"> 
           <option value="" selected hidden="">Seleccione la Pantalla</option>
          </select>        
         </div>

          <!-- Campos de Categoria permiso--> 
         <div class=" form-group col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label lb-categoria_permiso">Categoria:(*) </label>
          <select name="categoria_permiso" id="categoria_permiso"  class="form-control" > 
           <option value="" selected hidden="">Seleccione la Categoria</option>
          </select>   
         </div>

           <!-- Campos de Funcionalidad--> 
          <div class=" form-group col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
          <label class="form-control-label">Funcionalidad:(*) </label>
          <textarea name="funcionalidad_permiso" rows="2" id="funcionalidad_permiso" placeholder="Funcionalidad del Permiso" class="form-control input-group"></textarea>      
         </div>
    
       </div>

       </form>




         <div class="row">
         <div class="col-xl-12 table-responsive tabla_permiso">
           <table class="display table" id="lista_permisos" name="lista_permisos" width="100%">
             <thead width="100%">
               <td>Permiso</td>
               <td>Pantalla</td>
               <td>Categoria</td>
               <td>Funcionalidad</td>
             </thead>
             <tbody>
               
             </tbody>
           </table>
         </div>
       </div>


          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
  <?php 
    require 'footer.php';
   ?>

<script type="text/javascript" src="../Vista/Script/permiso.js"></script>