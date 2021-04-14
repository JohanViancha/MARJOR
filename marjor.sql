-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2020 a las 21:19:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `marjor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_permiso`
--

CREATE TABLE `categoria_permiso` (
  `id_categoria_permiso` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado_categoria_permiso` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria_permiso`
--

INSERT INTO `categoria_permiso` (`id_categoria_permiso`, `categoria`, `descripcion`, `estado_categoria_permiso`) VALUES
(1, 'Objeto Funcional', 'Objeto que ejecuta algún proceso', 1),
(2, 'Abrir Modulo', 'Permite ver los módulos del sistema', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE `categoria_producto` (
  `idcategoria_producto` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`idcategoria_producto`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Moda', 'Ropa para mujer y hombre', 1),
(2, 'Limpieza', 'Producto de limpieza', 1),
(3, 'Educación', 'Productos escolares y universitarios', 1),
(4, 'Canas Familiar', 'Todos los productos en la despensa que necesitas', 1),
(5, 'Tecnologia', 'Televisor, Celulares , Computadores', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo_documento` char(2) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `digito_verificacion` char(4) DEFAULT NULL,
  `tipo_persona` char(2) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `celular` varchar(20) NOT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombres`, `apellidos`, `tipo_documento`, `num_documento`, `digito_verificacion`, `tipo_persona`, `telefono`, `celular`, `direccion`, `correo_electronico`, `estado`, `fecha_registro`) VALUES
(1, 'Carlos ', 'Perez', '1', '103846283', '4633', '1', '6382920', '3163399291', 'Cra 23 # 12 - 21', 'cperez@gmail.com', 1, '2020-03-18 15:55:15'),
(2, 'fasfas', 'fasfa', '5', '2342', '214', '1', '312312', '241242', ' ', 'asf@gmail.com', 1, '2020-03-18 15:55:15'),
(3, 'd', 'fsdf', '5', '34234', '2312', '2', '3123', '31231', ' ADad', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(4, 'asfas', 'fasfasf', '5', '42342', '2423', '2', '31232', '3123123', ' dasdasd', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(5, 'fafasfaaaaaa', 'afasfasgsdg', '5', '423423', '4235', '1', '423525', '42355634', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(6, 'fsdfs', 'fsfds', '5', '42342', '2342', '2', '312312', '4123123', ' dasd', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(7, 'sdfsd', 'sdfsdf', '5', '423432', '2131', '2', '3123', '21312', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(8, 'fafasfaaaaaa', 'fasfasf', '1', '2313', '', '2', '31231', '31231', ' fhfdh', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(9, 'asfas', 'fasfsa', '2', '4234', '', '1', '2342', '31231', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(10, 'sgds', 'sddgsg', '5', '424234', '4234', '1', '234234', '3123', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(11, 'Johan', 'gsdgdf', '5', '25235', '2423', '1', '423423', '424234', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(12, 'czvs', 'dfsdfs', '5', '43534', '4234', '2', '23123', '4214', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:15'),
(13, 'czvs', 'dfsdfs', '5', '43534', '4234', '2', '23123', '4214', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:27'),
(14, 'aafas', 'afasf', '5', '4324', '2323', '2', '123', '4234', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:55:56'),
(15, 'dfafa', 'fafasf', '5', '424324', 'faas', '2', '42423', '4234', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:57:35'),
(16, 'casf', 'sdfsd', '5', '4234', '3424', '1', '321', '42342', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:58:43'),
(17, 'dafsf', 'sdfsdf', '5', '242', '3123', '1', '114', '3123', ' ', 'safasf@gmail.com', 1, '2020-03-18 15:59:31'),
(18, 'fasfa', 'fasf', '5', '24234', '3123', '1', '5235', '31231', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:00:16'),
(19, 'asfas', 'dasfas', '5', '4124234', '3123', '2', '12312', '31231', ' asfasf', 'safasf@gmail.com', 1, '2020-03-18 16:06:46'),
(20, 'd', 'dsada', '5', '1231', '2312', '2', '312312', '23123', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:12:08'),
(21, 'csdfds', 'fsd', '5', '3123', '3123', '1', '3123', '3123', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:13:30'),
(22, 'fafasfaaaaaa', 'WERWER', '3', '423243', '', '2', '312312', '3123', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:15:43'),
(23, 'afas', 'safas', '5', '4234', '1231', '1', '6372819', '41241', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:17:13'),
(24, 'dsfasf', 'safasf', '5', '31231', '3123', '1', '312312', '3123', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:18:17'),
(25, 'fasfas', 'asafas', '5', '324234', '3123', '1', '4124', '1231', ' ', 'safasf@gmail.com', 1, '2020-03-18 16:20:09'),
(26, 'FASF', 'FASF', '3', '3123', '', '1', '13123', '2|12', ' ', 'safasf@gmail.com', 1, '2020-03-18 18:46:32'),
(27, 'jOHAN', 'DAFAS', '5', '42342', '2141', '1', '4124', '412', ' ', 'safasf@gmail.com', 1, '2020-03-18 18:47:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuesto`
--

CREATE TABLE `impuesto` (
  `idimpuesto` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `porcentaje` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `impuesto`
--

INSERT INTO `impuesto` (`idimpuesto`, `nombre`, `descripcion`, `porcentaje`) VALUES
(1, 'Iva', NULL, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id_notificacion` int(11) NOT NULL,
  `idtipo_notificacion` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifica_usuario`
--

CREATE TABLE `notifica_usuario` (
  `id_notifica_usuario` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_notificacion` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pantalla`
--

CREATE TABLE `pantalla` (
  `id_pantalla` int(11) NOT NULL,
  `pantalla` varchar(100) NOT NULL,
  `estado_pantalla` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pantalla`
--

INSERT INTO `pantalla` (`id_pantalla`, `pantalla`, `estado_pantalla`) VALUES
(1, 'Usuario', 1),
(2, 'Permiso', 1),
(3, 'Parametrización', 1),
(4, 'Configuración de Correos', 1),
(5, 'Presentación', 1),
(6, 'Categoría', 1),
(7, 'Producto', 1),
(8, 'Venta', 1),
(9, 'Cliente', 1),
(10, 'Proveedor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro_individual`
--

CREATE TABLE `parametro_individual` (
  `idparametro_indi` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `estado_notificacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parametro_individual`
--

INSERT INTO `parametro_individual` (`idparametro_indi`, `nombre`, `descripcion`, `estado_notificacion`) VALUES
(1, 'Notificacion_Registro Cliente', 'Notificación al registrar un cliente', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro_individual_usuario`
--

CREATE TABLE `parametro_individual_usuario` (
  `idparametro_indi_usu` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `idparametro_indi` int(11) NOT NULL,
  `valor` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parametro_individual_usuario`
--

INSERT INTO `parametro_individual_usuario` (`idparametro_indi_usu`, `id_usuario`, `idparametro_indi`, `valor`) VALUES
(1, 1, 1, 'SI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_permiso` int(11) NOT NULL,
  `id_categoria_permiso` int(11) NOT NULL,
  `id_pantalla` int(11) NOT NULL,
  `permiso` varchar(30) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado_permiso` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`id_permiso`, `id_categoria_permiso`, `id_pantalla`, `permiso`, `descripcion`, `estado_permiso`) VALUES
(1, 2, 1, 'Modulo Usuario', 'Gestión de usuarios', 1),
(2, 2, 2, 'Modulo Permiso', 'Lista de permiso', 1),
(3, 2, 3, 'Modulo Parametrizacion', 'Permite gestionar los parámetros generales del sistema', 1),
(4, 2, 4, 'Modulo Configuracion de Correo', 'Permite configurar el envió de correos', 1),
(5, 2, 5, 'Modulo Presentacion', 'Permite gestionar la presentación de los productos', 1),
(6, 2, 6, 'Modulo Categoria', 'Permite gestionar la categoría de los productos', 1),
(7, 2, 7, 'Modulo Producto', 'Permite visualizar la información de cada producto', 1),
(8, 2, 8, 'Modulo Venta', 'Permite gestionar las ventas', 1),
(9, 2, 9, 'Modulo Cliente', 'Permite gestionar los clientes', 1),
(10, 2, 10, 'Modulo Proveedor', 'Gestionar proveedores', 1),
(11, 1, 9, 'Inactivar Cliente', 'Permite inactivar un cliente', 1),
(12, 1, 9, 'Activar Cliente', 'Permite activar un cliente', 1),
(13, 1, 9, 'Confirmar Email', 'Permite confirmar el email del cliente', 1),
(14, 1, 9, 'Registrar Cliente', 'Permite registrar un nuevo cliente', 1),
(15, 2, 1, 'Editar Usuario', 'Editar la información del usuario', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion_producto`
--

CREATE TABLE `presentacion_producto` (
  `idpresentacion_producto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presentacion_producto`
--

INSERT INTO `presentacion_producto` (`idpresentacion_producto`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Unidad', 'Unidad', 1),
(2, 'Libra', NULL, 1),
(3, 'Caja', NULL, 1),
(4, 'unidad/cantidad', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `codigo` varchar(15) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `fecha_vecimiento` date DEFAULT NULL,
  `id_presentacion` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_impuesto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `nombre_producto`, `codigo`, `cantidad`, `precio`, `fecha_vecimiento`, `id_presentacion`, `id_categoria`, `id_impuesto`) VALUES
(1, 'Camisa Polo', '356343', 6, 25000, NULL, 1, 1, 1),
(2, 'Cuadernos doble linea de 100 hojas', '4266464', 1, 7000, NULL, 1, 3, 1),
(3, 'Libra de Arroz', '937572', 6, 2500, NULL, 2, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_notificacion`
--

CREATE TABLE `tipo_notificacion` (
  `idtipo_notificacion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo_documento` char(2) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmado` tinyint(1) NOT NULL,
  `cambio_password` tinyint(1) NOT NULL,
  `fecha_confirmacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` char(2) NOT NULL,
  `correo_electronico` varchar(50) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `foto` varchar(250) NOT NULL DEFAULT 'usuario_defecto.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres`, `apellidos`, `tipo_documento`, `num_documento`, `telefono`, `celular`, `fecha_registro`, `confirmado`, `cambio_password`, `fecha_confirmacion`, `estado`, `correo_electronico`, `contrasena`, `cargo`, `foto`) VALUES
(1, 'Johan', 'Viancha', '1', '1095842538', '6949796', '3123213432', '2020-01-26 20:55:18', 1, 1, '2020-01-26 20:55:18', '1', 'vianchajohan@gmail.com', '$2y$10$Ic8Y7JI3rLzX3gTVR5STyuMSpDoEyW1isCrCK/sSYhipP.kyuR/jW', 'Administrador', 'usuario_defecto.png'),
(2, 'Ferney', 'Viancha', 'CC', '1935383', '6937224', '312523', '2020-03-18 19:59:28', 1, 1, '2020-03-18 19:59:28', '1', 'johaanx-1234@hotmail.com', '$2y$10$Ic8Y7JI3rLzX3gTVR5STyuMSpDoEyW1isCrCK/sSYhipP.kyuR/jW', 'Administrador', 'usuario_defecto.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_activos`
--

CREATE TABLE `usuarios_activos` (
  `id_usuarios_activos` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado_sesion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios_activos`
--

INSERT INTO `usuarios_activos` (`id_usuarios_activos`, `id_usuario`, `fecha`, `estado_sesion`) VALUES
(1, 1, '2020-03-18 20:18:03', 0),
(2, 2, '2020-03-18 20:18:16', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_permiso`
--

CREATE TABLE `usuario_permiso` (
  `idusuario_permiso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario_permiso`
--

INSERT INTO `usuario_permiso` (`idusuario_permiso`, `id_usuario`, `id_permiso`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 9),
(9, 1, 10),
(10, 1, 8),
(11, 1, 14),
(12, 1, 13),
(13, 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `fecha_venta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_vence` timestamp NULL DEFAULT NULL,
  `subtotal` double NOT NULL,
  `total_descuento` double NOT NULL,
  `total_impuesto` double NOT NULL,
  `total_venta` double NOT NULL,
  `estado_venta` char(1) NOT NULL,
  `estado_venta_DIAN` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id_venta`, `id_cliente`, `codigo`, `fecha_venta`, `fecha_vence`, `subtotal`, `total_descuento`, `total_impuesto`, `total_venta`, `estado_venta`, `estado_venta_DIAN`) VALUES
(2, 1, '6456', '2020-03-17 20:02:32', '2020-03-18 20:02:32', 17000, 0, 2720, 19720, '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_detalle`
--

CREATE TABLE `venta_detalle` (
  `idventa_detalle` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `venta_detalle`
--

INSERT INTO `venta_detalle` (`idventa_detalle`, `id_venta`, `id_producto`, `cantidad`, `subtotal`) VALUES
(1, 2, 2, 1, 7000),
(2, 2, 3, 4, 10000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  ADD PRIMARY KEY (`id_categoria_permiso`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD PRIMARY KEY (`idcategoria_producto`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `impuesto`
--
ALTER TABLE `impuesto`
  ADD PRIMARY KEY (`idimpuesto`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `idtipo_notificacion` (`idtipo_notificacion`);

--
-- Indices de la tabla `notifica_usuario`
--
ALTER TABLE `notifica_usuario`
  ADD PRIMARY KEY (`id_notifica_usuario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_notificacion` (`id_notificacion`);

--
-- Indices de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  ADD PRIMARY KEY (`id_pantalla`);

--
-- Indices de la tabla `parametro_individual`
--
ALTER TABLE `parametro_individual`
  ADD PRIMARY KEY (`idparametro_indi`);

--
-- Indices de la tabla `parametro_individual_usuario`
--
ALTER TABLE `parametro_individual_usuario`
  ADD PRIMARY KEY (`idparametro_indi_usu`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `idparametro_indi` (`idparametro_indi`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`id_permiso`),
  ADD KEY `FK_C_PERMISO` (`id_categoria_permiso`),
  ADD KEY `FK_P_PERMISO` (`id_pantalla`);

--
-- Indices de la tabla `presentacion_producto`
--
ALTER TABLE `presentacion_producto`
  ADD PRIMARY KEY (`idpresentacion_producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `id_presentacion` (`id_presentacion`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_impuesto` (`id_impuesto`);

--
-- Indices de la tabla `tipo_notificacion`
--
ALTER TABLE `tipo_notificacion`
  ADD PRIMARY KEY (`idtipo_notificacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuarios_activos`
--
ALTER TABLE `usuarios_activos`
  ADD PRIMARY KEY (`id_usuarios_activos`),
  ADD KEY `FK_UA_USUARIOS` (`id_usuario`);

--
-- Indices de la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  ADD PRIMARY KEY (`idusuario_permiso`),
  ADD KEY `FK_UP_USUARIO` (`id_usuario`),
  ADD KEY `FK_UP_PERMISO` (`id_permiso`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `venta_detalle`
--
ALTER TABLE `venta_detalle`
  ADD PRIMARY KEY (`idventa_detalle`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  MODIFY `id_categoria_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `idcategoria_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `impuesto`
--
ALTER TABLE `impuesto`
  MODIFY `idimpuesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notifica_usuario`
--
ALTER TABLE `notifica_usuario`
  MODIFY `id_notifica_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pantalla`
--
ALTER TABLE `pantalla`
  MODIFY `id_pantalla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `parametro_individual`
--
ALTER TABLE `parametro_individual`
  MODIFY `idparametro_indi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `parametro_individual_usuario`
--
ALTER TABLE `parametro_individual_usuario`
  MODIFY `idparametro_indi_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `presentacion_producto`
--
ALTER TABLE `presentacion_producto`
  MODIFY `idpresentacion_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_notificacion`
--
ALTER TABLE `tipo_notificacion`
  MODIFY `idtipo_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios_activos`
--
ALTER TABLE `usuarios_activos`
  MODIFY `id_usuarios_activos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  MODIFY `idusuario_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `venta_detalle`
--
ALTER TABLE `venta_detalle`
  MODIFY `idventa_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`idtipo_notificacion`) REFERENCES `tipo_notificacion` (`idtipo_notificacion`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `notifica_usuario`
--
ALTER TABLE `notifica_usuario`
  ADD CONSTRAINT `notifica_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `notifica_usuario_ibfk_2` FOREIGN KEY (`id_notificacion`) REFERENCES `notificacion` (`id_notificacion`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `parametro_individual_usuario`
--
ALTER TABLE `parametro_individual_usuario`
  ADD CONSTRAINT `parametro_individual_usuario_ibfk_1` FOREIGN KEY (`idparametro_indi`) REFERENCES `parametro_individual` (`idparametro_indi`) ON UPDATE CASCADE,
  ADD CONSTRAINT `parametro_individual_usuario_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `permiso_ibfk_1` FOREIGN KEY (`id_pantalla`) REFERENCES `pantalla` (`id_pantalla`),
  ADD CONSTRAINT `permiso_ibfk_2` FOREIGN KEY (`id_categoria_permiso`) REFERENCES `categoria_permiso` (`id_categoria_permiso`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria_producto` (`idcategoria_producto`) ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_presentacion`) REFERENCES `presentacion_producto` (`idpresentacion_producto`) ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`id_impuesto`) REFERENCES `impuesto` (`idimpuesto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_permiso`
--
ALTER TABLE `usuario_permiso`
  ADD CONSTRAINT `usuario_permiso_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `usuario_permiso_ibfk_2` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id_permiso`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta_detalle`
--
ALTER TABLE `venta_detalle`
  ADD CONSTRAINT `venta_detalle_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
