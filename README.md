Aplicación de gestión de usuarios.
En todos los apartados que se describirán a continuación se deberá utilizar el framework escogido. Mostrar una tabla en la que los datos mostrados se recojan directamente del siguiente servicio web:
https://jsonplaceholder.typicode.com/users
,
-Los campos que mostrar en la tabla serán:
Name
Email
Phone
Website
Company name
Address: ” como una concatenación de todos los valores de la dirección con el siguiente formato: Kulas Light, Apt. 556 - 92998-3874 (Gwenborough)

-Añadir un campo nuevo birthday a cada usuario del objeto JSON, rellenarlo con una fecha aleatoria y mostrarlo en la tabla.
-Añadir una paginación de 6 elementos por página
-Poder ordenar ascendentemente por Name, Email y Phone, sin necesidad de ser combinados entre sí.
-Cada elemento de la tabla tiene que abrir una ventana modal (mediante evento click) donde se muestre la ficha completa del usuario – incluida una imagen a modo de fotografía o avatar.

-Cada campo de la tabla tiene que ser editable y permitir almacenar el cambio
-Añadir un buscador de texto, que filtre directamente sobre la tabla
-Junto al buscador de la tabla, añadir un botón para crear un nuevo usuario. No se permitirá dejar vacío el campo del nombre ni el de usuario, ni crear un usuario con nombre de usuario repetido. La fecha de cumpleaños no es obligatoria, pero si se introduce, no puede ser superior a la fecha actual ni inferior a 1920
