# IGNIX Comm Suite – Estado de Formularios

Este proyecto es un dashboard interactivo que permite monitorear el estado de los formularios de precomisionado y comisionado asociados a TAGs técnicos en un proyecto industrial. La información se obtiene desde un archivo JSON generado automáticamente a partir de un Excel maestro.

## Estructura del Proyecto

- **public/index.html**: Plantilla HTML principal que se carga en el navegador.
- **src/Dashboard.jsx**: Componente principal del dashboard que muestra el estado de los formularios y permite aplicar filtros interactivos.
- **src/components/ui/**: Contiene componentes reutilizables:
  - **badge.jsx**: Componente para mostrar etiquetas con diferentes estados.
  - **card.jsx**: Componente para mostrar información en formato de tarjeta.
  - **input.jsx**: Componente para capturar entradas de texto.
  - **select.jsx**: Componente para crear menús desplegables.
- **src/sparktrack_formularios_estado.json**: Datos utilizados para llenar el dashboard.
- **package.json**: Configuración del proyecto para npm, incluyendo dependencias y scripts.
- **README.md**: Documentación del proyecto.
- **.gitignore**: Archivos y directorios que deben ser ignorados por Git.

## Instrucciones para Desplegar en GitHub Pages

1. **Crear un repositorio en GitHub**: Ve a GitHub y crea un nuevo repositorio. No inicialices el repositorio con un README.
   
2. **Subir el proyecto**: Clona el repositorio en tu máquina local y copia todos los archivos del proyecto en la carpeta del repositorio clonado. Luego, usa los comandos de Git para agregar, confirmar y subir los cambios.

3. **Configurar GitHub Pages**: Ve a la configuración del repositorio en GitHub. Busca la sección "GitHub Pages" y selecciona la rama `main` o `master` como fuente. Asegúrate de que la carpeta raíz esté seleccionada.

4. **Construir el proyecto**: Ejecuta `npm run build` en la terminal para crear una versión optimizada de tu aplicación en la carpeta `build`.

5. **Subir la carpeta build**: Copia el contenido de la carpeta `build` a la raíz de tu repositorio en GitHub. Esto es lo que se servirá en GitHub Pages.

6. **Acceder a la página**: Después de unos minutos, tu aplicación estará disponible en `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`.

Siguiendo estos pasos, podrás desplegar tu proyecto de React en una página de GitHub.