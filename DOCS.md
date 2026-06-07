# Documentación General: Entorno, Configuración y Buenas Prácticas en Django

Este documento describe **qué hace cada parte del proyecto y por qué existe**, detallando los componentes educativos e interactivos agregados para el cumplimiento del 100% de la lección.

---

## 1. Estructura Completa del Proyecto

El proyecto está organizado de la siguiente manera:

```
entorno_config_django/
├─ venv/                            # Entorno virtual aislado (creado localmente)
├─ entorno_config_django/           # Raíz del proyecto Django
│  ├─ db.sqlite3                    # Base de datos SQLite local
│  ├─ manage.py                     # Script de gestión del proyecto
│  ├─ requirements.txt              # Archivo de dependencias del proyecto
│  │
│  ├─ entorno_config_django/        # Configuración Global del Proyecto
│  │  ├─ settings.py                # Variables de configuración (apps, DB, templates, static)
│  │  ├─ urls.py                    # Enrutador principal de la aplicación web
│  │  └─ ...
│  │
│  ├─ configuracion/                # Aplicación Educativa
│  │  ├─ static/
│  │  │  └─ configuracion/
│  │  │     ├─ css/
│  │  │     │  └─ styles.css        # Estilos Premium (Dark-Slate, Glassmorphism, Terminal)
│  │  │     └─ js/
│  │  │        └─ main.js           # Lógica interactiva (Simulador de Terminal, Pestañas)
│  │  ├─ migrations/
│  │  │  └─ 0001_initial.py         # Archivo de migración de la base de datos
│  │  ├─ models.py                  # Modelos de datos (AppSetting, Registro)
│  │  ├─ urls.py                    # Enrutador específico de la aplicación configuracion
│  │  ├─ views.py                   # Lógica de las vistas y extracción de SQL ORM
│  │  └─ ...
│  │
│  └─ templates/                    # Capa de Presentación (HTML Templates)
│     ├─ base.html                  # Layout base (Google Fonts, navegación, carga estáticos)
│     └─ configuracion/
│        ├─ home.html               # Página de Inicio (Teoría de Django, MTV, DRY)
│        ├─ entorno.html            # Entornos Virtuales + Simulador interactivo de consola
│        ├─ db.html                 # SQLite + Visor de código ORM a consulta SQL real
│        └─ python_vs_django.html   # Comparador lado a lado de código Python v/s Django
```

---

## 2. Descripción de Componentes Clave

### A. Estilos y Presentación (`styles.css` & `base.html`)
* **`base.html`**: Funciona como plantilla maestra implementando el principio DRY. Define la estructura HTML común, carga las tipografías modernas ("Outfit" y "Fira Code" para el visor de código) e integra de forma dinámica los archivos CSS y JS usando la etiqueta de Django `{% load static %}`.
* **`styles.css`**: Establece un diseño premium oscuro (Slate-Dark) con contrastes neón, transiciones suaves y layouts responsivos con CSS Grid/Flexbox. Incluye estilos personalizados para simular una terminal de comandos (estilo macOS/Linux con botones de control) y visores de código estilo IDE.

### B. Interactividad y Simulación (`main.js`)
* **Simulador de Entorno Virtual**: Mantiene el estado interno de un entorno Python virtual (si está creado, si está activo, qué dependencias tiene instaladas). Permite al estudiante hacer clic en botones de consola para ejecutar comandos reales paso a paso (`python -m venv venv`, activar, `pip install django`, `pip list`, `deactivate`) y observar en tiempo real cómo cambia el prompt de la terminal y el árbol de dependencias del proyecto.
* **Mapeo de Pestañas**: Permite cambiar dinámicamente entre las diferentes lecciones de código en la vista "Python Puro v/s Django".

### C. Lógica de Negocio y Vistas (`views.py`)
* **`home`**: Renderiza el Dashboard introductorio. Provee datos dinámicos sobre la configuración del servidor local (versión del software, modo DEBUG activo/inactivo).
* **`entorno`**: Expone la teoría fundamental de entornos virtuales y configura el espacio de simulación.
* **`python_vs_django`**: Nueva vista agregada para responder al objetivo de distinguir el desarrollo web en Python nativo frente al integrado con Django.
* **`db`**: Gestiona las operaciones de persistencia en SQLite mediante el ORM de Django:
  - Guarda una traza de visita automática.
  - Permite la inserción manual de registros a través de un formulario web que incluye el middleware de protección contra ataques CSRF (`{% csrf_token %}`).
  - Extrae y muestra la consulta SQL cruda que Django traduce de forma interna utilizando `str(query.query)`.
* **`db_limpiar`**: Elimina todas las filas de registros para reiniciar la simulación del visor de persistencia.

### D. Modelos y Persistencia (`models.py`)
* **`AppSetting`**: Modelo singleton que simula y centraliza variables de configuración (DEBUG, ALLOWED_HOSTS, versión) persistidas en base de datos.
* **`Registro`**: Representa la entidad en base de datos donde se persisten los registros del origen y la fecha de creación (`creado_en` con fecha/hora automáticas).

---

## 3. Demostración Práctica de Conceptos Clave

El proyecto está diseñado para que el alumno observe visualmente:

1. **El Enrutador de Django**: Siguiendo el mapa de URL desde `entorno_config_django/urls.py` hacia `configuracion/urls.py`, y de ahí a la función correspondiente en `views.py`.
2. **La Arquitectura MTV**:
   - **Model**: Clases de Python en `models.py` mapeadas a la DB local.
   - **Template**: Archivos HTML con placeholders dinámicos como `{{ total }}` y bucles `{% for %}`.
   - **View**: Lógica de Python en `views.py` que solicita datos al modelo y retorna la respuesta renderizada al cliente.
3. **El Principio DRY**: Observando la herencia de templates donde las páginas secundarias extienden de `base.html` con `{% extends "base.html" %}`, heredando todo el diseño web y la barra de navegación sin duplicar código.
4. **ORM v/s SQL**: Observando en el visor dinámico de la página de base de datos cómo una línea compacta en Python se traduce de forma transparente a una instrucción SQL compleja.
