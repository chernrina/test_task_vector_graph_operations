from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


class Graph(models.Model):
    id_graph = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    value = ArrayField(
        ArrayField(
            models.IntegerField(blank=True)
        )
    )

    class Meta:
        db_table = 'graph'

class Vertex(models.Model):
    id_vertex = models.AutoField(primary_key=True)
    type_vertex = models.IntegerField(blank=True,validators=[MinValueValidator(1),
                                                            MaxValueValidator(2)])
    value = ArrayField(models.DecimalField(blank=True,max_digits=10,decimal_places=2))
    graph_id = models.ForeignKey(Graph, on_delete=models.CASCADE, db_column='id_graph')

    class Meta:
        db_table = 'vertex'