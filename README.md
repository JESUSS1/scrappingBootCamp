# Introducción


Este scrapping usa un popup para ingresar palabras de busqueda como 'fullStack' o en mi caso para los testeos 'web3'.
realiza paginacion , actualmente esta puesto en 2 y se le puede cambiar, en el documento "sw.js", en la linea 41

Los datos se registran en IndexedDB y en Mysql , siendo este ultimo mi base de datos elegido para guardar los datos adecuadamente.

El proyecto esta dividido en 2, uno para el service worker y el otro para el servicio de API.

**Pasos:**

**1. Clonar el repositorio.**

**2. Crear la base de datos en base:** El modelo que se encuentra en el archivo **DB_mysql.sql** de la raiz del proyecto.

**3.  Instalar la extension:** El archivo manifest.json se encuentra en la carpeta ChromeExtension/dist/  

**4. Instalar las dependencias:** installar en cada proyecto
    npm install

**5. Ejecutar el proyecto ChromeExtension**

    npm run start

**6. Ejecutar el proyecto**

    nodemon start



