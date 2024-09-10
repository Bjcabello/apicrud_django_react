from rest_framework import viewsets
from .models import Task
from .serializer import TaskSerializer

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
