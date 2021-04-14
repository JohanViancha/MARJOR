
<?php 

	/** Requiere al controlador **/

	require '../Controlador/controlador_categoria_pro.php';

	
	//Opcion a revisar
	$opcion = $_POST['opcion'];


	switch ($opcion) {

		//Opcion para listar los usuarios
		case 'registrar_categoria':

			//Se instancia a la clase controlador categoria
			$categoria = new Controlador_Categoria();

			$datos_categoria = $_POST['datos_categoria'];

			$result = $categoria->registrar_categoria($datos_categoria);

			echo $result;
		break;


		case 'listar_categorias':

			//Se instancia a la clase controlador categoria
			$categoria = new Controlador_Categoria();

			$result = $categoria->listar_categorias();

			echo $result;
			
			break;

		case 'editar_categoria':

			//Se instancia a la clase controlador categoria
			$categoria = new Controlador_Categoria();

			$datos_categoria = $_POST['datos_categoria'];


			$result= $categoria->editar_categoria($datos_categoria);

			echo $result;

			break;

		case 'mostrar_categoria':
			
			//Se instancia a la clase controlador categoria
			$categoria = new Controlador_Categoria();

			$id_categoria = $_POST['id_categoria'];


			$result= $categoria->mostrar_categoria($id_categoria);

			echo $result;
			break;

		case 'cambiar_estado_categoria':

			//Se instancia a la clase controlador categoria
			$categoria = new Controlador_Categoria();

			$id_categoria = $_POST['id_categoria'];

			$estado = $_POST['estado'];

			$result= $categoria->cambiar_estado_categoria($id_categoria,$estado);

			echo $result;
			
			break;

		//Opcion registrar_usuario
		default:
			echo 'No se encontro opcion';
			break;
	}
	

