# Usar una imagen oficial de Python ligera
FROM python:3.11-slim

# Evitar que Python escriba archivos .pyc en el disco
ENV PYTHONDONTWRITEBYTECODE=1
# Evitar que Python amortigüe la salida estándar
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema mínimas necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar el requirements.txt de la app
COPY entorno_config_django/requirements.txt /app/

# Instalar dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Copiar los archivos del proyecto Django al contenedor
COPY entorno_config_django/ /app/

# Copiar el script de inicio
COPY docker-entrypoint.sh /app/

# Asegurar permisos de ejecución para el entrypoint
RUN chmod +x /app/docker-entrypoint.sh

# Exponer el puerto
EXPOSE 8000

# Definir el script de entrada
ENTRYPOINT ["/app/docker-entrypoint.sh"]
