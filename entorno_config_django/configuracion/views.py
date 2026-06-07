from __future__ import annotations

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.db import connection

from .models import AppSetting, Registro


def home(request: HttpRequest) -> HttpResponse:
    """
    Página principal (Dashboard) que describe Django y su arquitectura.
    """
    config = AppSetting.get_singleton()
    return render(
        request,
        "configuracion/home.html",
        {
            "titulo": "Introducción a Django y Arquitectura Web",
            "version_app": config.version_app,
            "debug": config.debug,
        },
    )


def entorno(request: HttpRequest) -> HttpResponse:
    """
    Muestra la información de entornos virtuales y simulación de venv.
    """
    config = AppSetting.get_singleton()
    return render(
        request,
        "configuracion/entorno.html",
        {
            "titulo": "Python y los Entornos Virtuales",
            "debug": config.debug,
            "allowed_hosts": config.allowed_hosts,
            "version_app": config.version_app,
        },
    )


def python_vs_django(request: HttpRequest) -> HttpResponse:
    """
    Muestra la comparación detallada entre Python puro y Django integrado.
    """
    return render(
        request,
        "configuracion/python_vs_django.html",
        {
            "titulo": "Python Puro v/s Django Integrado",
        },
    )


def db(request: HttpRequest) -> HttpResponse:
    """
    Muestra el soporte de base de datos (SQLite), interacción con ORM y visor de SQL.
    Permite además agregar nuevos registros manualmente.
    """
    # Si viene por POST, agregamos un registro personalizado
    if request.method == "POST":
        origen = request.POST.get("origen", "Formulario Manual")
        if origen.strip():
            Registro.objects.create(origen=origen)
        return redirect("configuracion:db")

    # Registro de visita automático si no es POST
    else:
        # Se genera un registro automático de visita
        Registro.objects.create(origen="Visita a Página")

    # Consulta de registros
    registros_query = Registro.objects.order_by("-creado_en")[:10]
    
    # Extraemos la consulta SQL que Django ORM generará detrás de la escena
    sql_query = str(registros_query.query)
    
    # Si la consulta viene vacía o por defecto no muestra el SELECT completo en SQLite, 
    # podemos formatear una cadena explicativa o la consulta SQL real.
    if not sql_query:
        sql_query = "SELECT * FROM configuracion_registro ORDER BY creado_en DESC LIMIT 10;"

    return render(
        request,
        "configuracion/db.html",
        {
            "titulo": "Persistencia de Datos con ORM y SQLite",
            "total": Registro.objects.count(),
            "registros": registros_query,
            "sql_query": sql_query,
        },
    )


def db_limpiar(request: HttpRequest) -> HttpResponse:
    """
    Elimina todos los registros de la tabla Registro para reiniciar la demo.
    """
    Registro.objects.all().delete()
    return redirect("configuracion:db")
