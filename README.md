# Acvidad_5_Taller_B3

Este archivo detalla rutas, parámetros y estructuras JSON.

Usuarios:
 Escribir un usuario (POST) - http://localhost:3000/usuarios/agregar 
 La estructura JSON:
{ 
  "id": idDelUsuario, // Número
  "nombre": "nombreDelUsuario", 
  "apellido": "apellidoDelUSuario", 
  "edad": edadDelUsuario, // Número
  "correo": "correoDelUSuario@gmail.com", 
  "contrasena": contrasenaDelUsuario, // Número
  "rol": "rolDelUsuario", 
  "estado": "estadoDelUsuario" 
}

Ver tpdos los usuarios(GET) - http://localhost:3000/usuarios
No requiere cuerpo JSON.

Modificación de datos de usuario (PUT) - http://localhost:3000/usuarios/actualizar/idDelUsuario 
Estructura JSON (Se recomienda no incluir la ID en el JSON):
{ 
  "nombre": "nombreDelUsuario", 
  "apellido": "apellidoDelUsuario", 
  "edad": edadDelUsuario, 
  "correo": "correoDelUsuario@gmail.com", 
  "contrasena": contrasenaDelUsuario, 
  "rol": "rolDelUsuario", 
  "estado": "estadoDelUsuario" 
}

Eliminar usuario (DELETE) - http://localhost:3000/usuarios/eliminar/idDelUsuario 
No requiere cuerpo JSON.

Buscar por ID (GET) - http://localhost:3000/usuarios/buscar/idDelUsuario 
No requiere cuerpo JSON.

Producto :
Agregar nuevo producto (POST) - http://localhost:3000/productos/agregar 
Cuerpo JSON :
{ 
  "idProducto": idDelProducto, // Número
  "nombre": "nombreDelProducto", 
  "descripcion": "descripcionDelProducto", 
  "precio": precioDelProducto, // Número
  "stock": stockDelProducto, // Número
  "categoria": "categoriaDelProducto", 
  "estado": "estadoDelProducto" 
}

Ver todos los productos (GET) - http://localhost:3000/productos 
No requiere cuerpo JSON.

Editar algun producto (PUT) - http://localhost:3000/productos/actualizar/idDelProducto 
Escritura JSON  (Se sugiere omitir 'idProducto' en la solicitud):
{ 
  "nombre": "nombreDelProducto", 
  "descripcion": "descripcionDelProducto", 
  "precio": precioDelProducto, 
  "stock": stockDelProducto, 
  "categoria": "categoriaDelProducto", 
  "estado": "estadoDelProducto" 
}

Eliminar algun producto (DELETE) - http://localhost:3000/productos/eliminar/idDelProducto 
No requiere cuerpo JSON.

Buscar por ID (GET) - http://localhost:3000/productos/buscar/idDelProducto 
No requiere cuerpo JSON.

Pedido:
Generar un pedido(POST) - http://localhost:3000/pedidos/agregar 
Cuerpo JSON :
{ 
  "idPedido": idDelPedido, // Número
  "cliente": "nombreDelCliente", 
  "producto": "nombreDelProducto", 
  "cantidad": cantidadDelProducto, // Número
  "precioTotal": precioTotalDelPedido, // Número
  "estadoPedido": "estadoDelPedido" 
}

Ver todos los pedidos(GET) - http://localhost:3000/pedidos 
No requiere cuerpo JSON.

Modificar algun pedido(PUT) - http://localhost:3000/pedidos/actualizar/idDelPedido 
Cuerpo JSON sugerido (Se aconseja no enviar el 'idPedido' dentro del JSON):
{ 
  "cliente": "nombreDelCliente", 
  "producto": "nombreDelProducto", 
  "cantidad": cantidadDelProducto, 
  "precioTotal": precioTotalDelPedido, 
  "estadoPedido": "estadoDelPedido" 
}

Cancelar o eliminar pedido (DELETE) - http://localhost:3000/pedidos/eliminar/idDelPedido 
No requiere cuerpo JSON.

 Ver pedido por id(GET) - http://localhost:3000/pedidos/buscar/idDelPedido 
 No requiere cuerpo JSON.


Observaciones:

La gestión de contraseñas se definió únicamente mediante valores numéricos.

Las clases Producto y Pedido, junto con sus menús interactivos asociados, forman parte delas tareas que venimos entregando.
