#!/bin/sh

# Salir inmediatamente si un comando falla
set -e

echo "===================================================="
echo "⚡ Inicializando contenedor educativo Django..."
echo "===================================================="

# Ejecutar las migraciones pendientes en el contenedor
echo "1. Aplicando migraciones de base de datos..."
python manage.py migrate --noinput

# Iniciar el servidor
echo "2. Iniciando el servidor de desarrollo Django en el puerto 8000..."
echo "===================================================="
exec python manage.py runserver 0.0.0.0:8000
