from django.test import TestCase
from django.urls import reverse
from .models import AppSetting, Registro


class EducationalViewsTests(TestCase):
    """
    Pruebas para verificar que las vistas educativas carguen correctamente
    con el código de respuesta HTTP 200 y los títulos apropiados.
    """
    
    def test_home_view(self):
        response = self.client.get(reverse("configuracion:home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Introducción a Django")
        self.assertContains(response, "El Patrón MTV")

    def test_entorno_view(self):
        response = self.client.get(reverse("configuracion:entorno"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Entornos Virtuales en Python")
        self.assertContains(response, "Monitor de Entorno Python")

    def test_python_vs_django_view(self):
        response = self.client.get(reverse("configuracion:python_vs_django"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Python Puro v/s Django Integrado")
        self.assertContains(response, "Resumen Comparativo para la Empresa")


class DatabaseORMTests(TestCase):
    """
    Pruebas para verificar el funcionamiento del ORM de Django, la persistencia en SQLite,
    y las vistas que interactúan con el modelo Registro.
    """

    def test_db_view_creates_visit_record(self):
        initial_count = Registro.objects.count()
        response = self.client.get(reverse("configuracion:db"))
        self.assertEqual(response.status_code, 200)
        # Una visita normal por GET crea un registro con origen "Visita a Página"
        self.assertEqual(Registro.objects.count(), initial_count + 1)
        self.assertEqual(Registro.objects.first().origen, "Visita a Página")

    def test_db_view_post_creates_custom_record(self):
        initial_count = Registro.objects.count()
        # El formulario POST debe registrar un origen específico y redirigir
        response = self.client.post(reverse("configuracion:db"), {"origen": "Test Unitario"})
        self.assertEqual(response.status_code, 302)  # Redirección
        self.assertEqual(Registro.objects.count(), initial_count + 1)
        self.assertEqual(Registro.objects.first().origen, "Test Unitario")

    def test_db_limpiar_view_deletes_records(self):
        # Crear registros artificiales
        Registro.objects.create(origen="Prueba 1")
        Registro.objects.create(origen="Prueba 2")
        self.assertEqual(Registro.objects.count(), 2)

        # Invocar limpieza
        response = self.client.get(reverse("configuracion:db_limpiar"))
        self.assertEqual(response.status_code, 302)  # Redirección
        self.assertEqual(Registro.objects.count(), 0)
