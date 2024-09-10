from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from task_app import views

# Definición del router
router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, basename='tasks')  # basename es opcional si no se proporciona queryset

# Definición de las rutas
urlpatterns = [
    path('api/v1/', include(router.urls)),  # Incluir las rutas generadas por el router
    path('docs/', include_docs_urls(title="Tasks API"))  # Documentación de la API
]