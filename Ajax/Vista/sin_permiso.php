
<?php 
session_start();
  require 'header.php';
  require 'sidebar.php';

 ?>


<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="ventana_usuario">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid mt-5">
        <!-- Info boxes -->

         <div class="row bg-info rounded-top rounded-bottom">
         <div class="col-xl-3 col-lg-4 col-md-3 col-sm-3 col-6">

          <img class="img-thumbnail" src="../files/imagenes/sistema/icono-candado.png">
        
         </div>

         <div class="pt-xl-4 col-xl-9 col-lg-8 col-md-9 col-sm-9 col-6">


            <p><h4 style="font-size: 2vw;" class="m-auto text-center pt-5"><?php echo $_SESSION['sesion_nombres'] ?>
            <?php echo $_SESSION['sesion_apellidos'] ?> no puedes acceder a esta pantalla porque no tienes permiso.</h4></p>
      


     
        
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