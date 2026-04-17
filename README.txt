=============================
INSTRUCCIONES DE EJECUCIÓN
=============================

Este proyecto implementa una prueba de carga para el servicio de Login utilizando K6. 
La solución se ha diseñado siguiendo estándares profesionales de seguridad, 
separando la configuración del código fuente y protegiendo datos sensibles.

1. REQUISITOS DEL SISTEMA:
-------------------------
- K6 versión v0.45.0 o superior.
- Terminal compatible con comandos Bash (Git Bash recomendado en Windows).
- Conexión a internet para el consumo de la API FakeStore.

2. CONFIGURACIÓN DE SEGURIDAD (PASOS OBLIGATORIOS):
--------------------------------------------------
Por seguridad y buenas prácticas, los archivos de configuración no se sincronizan 
en el repositorio (incluidos en .gitignore). Debe crearlos manualmente:

A) Crear archivo '.env':
   Cree un archivo llamado '.env' en la raíz del proyecto con la URL base.

B) Crear archivo 'config.js':
   Cree un archivo llamado 'config.js' en la raíz para centralizar la configuración.

3. EJECUCIÓN DE LA PRUEBA:
--------------------------
Para ejecutar la prueba inyectando las variables de entorno correctamente y 
alcanzar el objetivo de carga (>20 TPS), utilice el siguiente comando:

export URL_BASE=$(grep URL_BASE .env | cut -d '=' -f2) && k6 run login.js

4. ESTRUCTURA DEL PROYECTO:
---------------------------
- /data: Contiene 'usuarios.csv' con las credenciales parametrizadas.
- /reportes: Contiene la evidencia visual y el reporte HTML generado.
- login.js: Script principal de la prueba con validación de Thresholds (SLAs).
- conclusiones.txt: Documento con el análisis técnico de los resultados.

5. NOTAS TÉCNICAS:
------------------
- El script implementa lógica de módulo (%) para garantizar que los 45 Usuarios 
  Virtuales (VUs) puedan reutilizar el set de datos del CSV de forma circular.
- Se han configurado Thresholds para asegurar que el P95 sea < 1.5s y la tasa de 
  error sea < 3%, conforme a los requerimientos del ejercicio.

==========================================================