from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200, verbose_name='Titulo')
    description = models.TextField(blank=True, verbose_name='Descripcion')
    done = models.BooleanField(default=False, verbose_name='Concluida')

    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        return self.title
