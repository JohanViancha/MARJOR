
<?php 
session_start();
  require 'header.php';
  require 'sidebar.php';

 ?>

<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="ventana_usuario" style="min-height: 400px;">
    <!-- Content Header (Page header) -->
 <div class="row">
              <div class="col-md-12">

                <!-- DIRECT CHAT -->
                <div class="direct-chat direct-chat-success">
                  <div class="card-header">
                    <img class="direct-chat-img mr-3 img-receptor" src="../files/imagenes/usuarios/<?php echo $_GET['foto']?>" alt="message user image">
                    <h3 class="card-title mt-2" id_usuario="<?php echo $_GET['id_usuario'] ?>"><?php echo $_GET['nombre']?></h3>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body direct-chat-conversation">
                    <div class="text-center">
                      <span style="">Tú y </span>
                      <span style=""><?php echo $_GET['nombre']?> iniciaron conversación el</span>
                      <br>
                      <span style="">
                        <?php 
                        $fecha = new DateTime($_GET['fecha']);

                        $dia = $fecha->format('d');
                        $mes = $fecha->format('F');
                        $año = $fecha->format('Y');
                        echo $dia.' de '.$mes.' del '.$año ;
                        ?>
                        
                      </span>
                    </div>
                   
                   <div class="row">
                  <div class="col-6" style="margin-left: 45%">

                   <img class="rounded-circle img-thumbnail img-emisor" style="width:60px" src="../files/imagenes/usuarios/<?php echo $_SESSION['sesion_foto']; ?>" alt="message user image">
                   <img class="rounded-circle img-thumbnail" style="width:60px" src="../files/imagenes/usuarios/<?php echo $_GET['foto']?>"" alt="message user image">
                    <br>
                  </div>

                  <br>
                  <br>

                  </div> 
                    <div class="dropdown-divider"></div>
 

                    <!-- Conversations are loaded here -->
                    <div class="chat-mensajes mr-2 ml-2">
                    

                  </div>
                    <!--/.direct-chat-messages-->
                
           
                  </div>
                
                </div>
                     <div class="col-12 border-success rounded">

                  <div class="card-footer">
                    <form action="#" method="post" id="form_chat">
                      <div class="input-group">
                        <input type="text" name="mensaje" id="mensaje" placeholder="Escribir Mensaje" class="form-control">
                        <span class="input-group-append">
                          <button type="submit" class="btn btn-success"><i class="fas fa-paper-plane"></i> Enviar</button>
                        </span>
                      </div>
                    </form>
                  </div>
            
                </div>

                </div>
              </div>
          </div>


    <?php 
      require 'footer.php';
    ?>


  <script type="text/javascript" src="../Vista/Script/chat.js"></script>

  