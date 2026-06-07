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
