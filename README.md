# Guía Educativa e Interactiva: Entorno, Configuración y Buenas Prácticas en Django

Este proyecto forma parte de una lección educativa avanzada para el entorno Python/Django. Ha sido rediseñado como un **Dashboard de Aprendizaje Interactivo** que permite experimentar en tiempo real con los conceptos de la arquitectura MTV (Model-Template-View), los comandos de entornos virtuales y el comportamiento interno del ORM.

---

## 🌟 Características de la Versión Interactiva

1. **Dashboard de Arquitectura**: Explicación del funcionamiento de Django, ventajas empresariales, y los principios del patrón MTV y DRY.
2. **Simulador de Entorno Virtual**: Consola interactiva en el navegador que demuestra de forma visual el aislamiento de paquetes, el flujo de activación/desactivación y la velocidad de desarrollo.
3. **Comparador Lado a Lado**: Tablas y pestañas con código comparativo de tareas web desarrolladas en **Python Puro** vs **Django Integrado**.
4. **Visor de ORM a SQL**: Un panel conectado a SQLite que muestra el código ORM de Django en Python y extrae dinámicamente la consulta SQL exacta ejecutada en la base de datos. Permite inserción manual y limpieza rápida de datos.

---

## 📚 Material de Estudio: Respuestas a los Objetivos de la Lección

A continuación se detalla la base teórica correspondiente a los objetivos de aprendizaje evaluados en esta unidad.

### 1. Características Fundamentales de Django en el Desarrollo Empresarial
* **Qué es Django**: Es un framework web "Batteries Included" (baterías incluidas) de código abierto y alto nivel, escrito en Python. Su objetivo es facilitar el desarrollo rápido, seguro y limpio de aplicaciones web complejas.
* **Características Clave**:
  - **Mapeador Objeto-Relacional (ORM)**: Modela las tablas de la base de datos como clases de Python independientes de la base de datos subyacente.
  - **Panel de Administración**: Panel auto-generado que permite gestionar los datos de la aplicación de inmediato.
  - **Middleware y Seguridad**: Sanitiza peticiones, valida tokens CSRF y encripta contraseñas por defecto.
  - **Enrutador de URLs**: Enrutamiento limpio desacoplado por expresiones regulares o rutas fijas.

### 2. Ventajas y Potencialidades para Aplicaciones Empresariales
* **Velocidad de comercialización (Time-to-Market)**: Permite a las empresas enfocarse en el valor de negocio y no en la infraestructura.
* **Seguridad Robusta**: Previene por defecto los 10 riesgos más comunes de OWASP (Inyección SQL, CSRF, Cross-Site Scripting, etc.).
* **Escalabilidad y Rendimiento**: Separa eficientemente las capas de base de datos, lógica y presentación, permitiendo el escalamiento horizontal y el uso de caché avanzada.
* **Flexibilidad de Configuración**: Manejo de entornos separados (Desarrollo, Staging, Producción) con variables de entorno y archivos `settings.py` personalizados.

### 3. Tareas en Python Puro v/s Django Integrado
* **Inicialización**: En Python puro, debes crear sockets de bajo nivel TCP/IP y loops infinitos para escuchar peticiones. Django lo abstrae con el comando `runserver` o servidores WSGI/ASGI listos para producción (como Gunicorn/Uvicorn).
* **Enrutamiento**: En Python puro, utilizas bloques condicionales `if-else` analizando cadenas de caracteres de la URI, propenso a errores. En Django, utilizas un sistema centralizado de enrutadores (`urls.py`) desacoplado por aplicación.
* **Renderización de HTML**: En Python puro, debes leer archivos del disco duro a mano (`open()`) y hacer reemplazos manuales de strings, lo cual es lento e inseguro (vulnerable a inyecciones). Django provee un **Motor de Plantillas (DTL)** con herencia de componentes (`{% extends %}`), filtros y escape de seguridad automático.

### 4. Importancia de los Entornos Virtuales en Python
* **Aislamiento**: Evita conflictos entre las versiones de librerías requeridas por diferentes aplicaciones corriendo en la misma máquina.
* **Librerías propias de cada proyecto**: Cada entorno virtual contiene exclusivamente las dependencias del proyecto, lo que permite exportar un archivo `requirements.txt` limpio para producción.
* **El comando `venv`**: Módulo estándar de Python que inicializa el entorno virtual creando copias del intérprete y scripts de activación.
* **Activación/Desactivación**: Al activar el entorno virtual, la consola modifica la variable de entorno `PATH` para priorizar los ejecutables locales del entorno sobre los globales. Al desactivar (`deactivate`), se restaura el estado original.

---

## 🛠️ Guía de Reproducción (Paso a Paso)

Sigue estos pasos para inicializar el proyecto en tu computador local.

### 1) Crear carpeta del proyecto y entrar
```bash
mkdir entorno_config_django
cd entorno_config_django
```

### 2) Crear y activar entorno virtual (venv)
#### Windows (PowerShell)
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```
#### macOS / Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3) Instalar Django
```bash
python -m pip install --upgrade pip
pip install django
```

### 4) Crear el proyecto (sin punto)
```bash
django-admin startproject entorno_config_django
```

### 5) Entrar a la carpeta donde está `manage.py`
```bash
cd entorno_config_django
```

### 6) Crear la aplicación
```bash
python manage.py startapp configuracion
```

### 7) Ejecutar migraciones base de Django
```bash
python manage.py migrate
```

### 8) Modificar `entorno_config_django/settings.py`
Registra la aplicación configurada y añade el soporte para templates globales:

* **Agregar la app**:
  ```python
  INSTALLED_APPS = [
      ...
      'configuracion',
  ]
  ```
* **Configurar directorio de templates** (dentro del arreglo `TEMPLATES`):
  ```python
  'DIRS': [BASE_DIR / 'templates'],
  ```

### 9) Modificar `entorno_config_django/urls.py`
Conecta el enrutador de la aplicación `configuracion`:
```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('configuracion.urls')),
]
```

### 10) Crear `configuracion/urls.py`
```python
from django.urls import path
from . import views

app_name = "configuracion"

urlpatterns = [
    path("", views.home, name="home"),
    path("entorno/", views.entorno, name="entorno"),
    path("python-vs-django/", views.python_vs_django, name="python_vs_django"),
    path("db/", views.db, name="db"),
    path("db/limpiar/", views.db_limpiar, name="db_limpiar"),
]
```

### 11) Crear carpetas de templates
#### Windows
```bash
mkdir templates
mkdir templates\configuracion
```
#### macOS / Linux
```bash
mkdir -p templates/configuracion
```

*(Copia los archivos HTML proporcionados en `templates/base.html` y dentro de `templates/configuracion/`)*

### 12) Crear carpetas de archivos estáticos
#### Windows
```bash
mkdir configuracion\static\configuracion\css
mkdir configuracion\static\configuracion\js
```
#### macOS / Linux
```bash
mkdir -p configuracion/static/configuracion/css
mkdir -p configuracion/static/configuracion/js
```

*(Copia los archivos CSS y JS correspondientes en estas carpetas)*

### 13) Crear migraciones de la aplicación y aplicar
```bash
python manage.py makemigrations configuracion
python manage.py migrate
```

### 14) Levantar el servidor de desarrollo
```bash
python manage.py runserver
```

El servidor estará disponible en las siguientes rutas locales:
* Inicio: `http://127.0.0.1:8000/`
* Entornos Virtuales: `http://127.0.0.1:8000/entorno/`
* Python vs Django: `http://127.0.0.1:8000/python-vs-django/`
* Base de Datos (ORM): `http://127.0.0.1:8000/db/`

### 15) Salir del entorno virtual
Cuando desees apagar el entorno de desarrollo:
```bash
deactivate
```
