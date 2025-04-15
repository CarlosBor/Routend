🥾 Routend
Routend es una plataforma web diseñada para gestionar un club de senderismo local. Permite organizar excursiones, gestionar rutas, asignar guías, y fomentar la interacción entre los miembros mediante reseñas y fotografías.

📌 Características Principales
Gestión de Rutas y Excursiones: Creación, edición y visualización de rutas de senderismo, con detalles como nivel de dificultad, ubicación, distancia y tipo de terreno.

Sistema de Inscripción: Los usuarios pueden inscribirse en excursiones programadas, con control de plazas disponibles.

Roles de Usuario: Diferenciación entre usuarios normales y administradores, con permisos específicos para cada rol.

Asignación de Guías: Cada excursión tiene un guía asignado, con registro de conocimientos en primeros auxilios.

Interacción Comunitaria: Los miembros pueden subir fotos y escribir reseñas de las rutas completadas.​

🗃️ Estructura de la Base de Datos
Member: Información de los socios (nombre, usuario, contraseña, rol, conocimientos de primeros auxilios).

Route: Detalles de las rutas (nivel, ubicación, punto de encuentro, distancia, desnivel, duración, tipo de terreno).

Trip: Excursiones programadas basadas en rutas, con fecha y guía asignado.

Member_has_Trip: Relación muchos-a-muchos entre miembros y excursiones, registrando asistencia y plazas disponibles.

Reviews: Comentarios de los miembros sobre las rutas completadas.

Photos: Fotografías subidas por los usuarios tras cada excursión.​

🚀 Instalación y Puesta en Marcha
Requisitos Previos
Docker y Docker Compose instalados en tu sistema.​

Pasos para Ejecutar con Docker
Clonar el Repositorio

bash
Copiar
Editar
git clone https://github.com/CarlosBor/Routend.git
cd Routend
Construir y Levantar los Contenedores

bash
Copiar
Editar
docker-compose up --build
Esto iniciará los servicios definidos en docker-compose.yml, incluyendo la aplicación y la base de datos.

Inicializar la Base de Datos

El archivo init.sql se ejecutará automáticamente al iniciar el contenedor de la base de datos, creando las tablas necesarias.

Acceder a la Aplicación

Una vez que los contenedores estén en funcionamiento, puedes acceder a la aplicación en http://localhost:3000.

Variables de Entorno
Puedes configurar variables de entorno adicionales en un archivo .env si es necesario.​

🧱 Tecnologías Utilizadas
Backend: Node.js con Express.js

Base de Datos: MySQL

ORM: Sequelize

Autenticación: JWT y cookies

Frontend: Pug (anteriormente Jade)

Contenedorización: Docker y Docker Compose​
corfopym.com
+1
llantasyneumaticos.com
+1
GitHub
+2
Medium
+2
GitHub
+2
GitHub

📂 Estructura del Proyecto
controllers/: Lógica de negocio y controladores de rutas.

middleware/: Funciones intermedias para manejo de autenticación y autorización.

model/: Definiciones de modelos de datos con Sequelize.

routes/: Definición de rutas de la aplicación.

views/: Plantillas Pug para la interfaz de usuario.

init.sql: Script de inicialización de la base de datos.

Dockerfile y docker-compose.yml: Configuración de Docker para la aplicación.​

🔐 Autenticación y Roles
Usuarios Normales: Pueden visualizar rutas y excursiones, inscribirse en ellas, y subir fotos y reseñas.

Administradores: Tienen acceso completo para crear, editar y eliminar rutas y excursiones, así como gestionar usuarios.​

📸 Interacción Comunitaria
Subida de Fotos: Los usuarios pueden subir imágenes relacionadas con las excursiones completadas.

Reseñas: Sistema de comentarios para compartir experiencias y opiniones sobre las rutas.​

📧 Contacto
Para más información o consultas, puedes contactar a los desarrolladores:

Carlos Borja

Rogelio

Indira

Gaizka​
