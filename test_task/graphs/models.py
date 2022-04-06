from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator


class Vertex(models.Model):
    id_vertex = models.AutoField(primary_key=True)
    type_vertex = models.IntegerField(blank=True,validators=[MinValueValidator(1),
                                                            MaxValueValidator(2)])
    value = ArrayField(models.DecimalField(blank=True,max_digits=10,decimal_places=2))

    class Meta:
        db_table = 'vertex'

class Graph(models.Model):
    id_graph = models.AutoField(primary_key=True)
    value = ArrayField(
        ArrayField(
            models.IntegerField(blank=True)
        )
    )

    class Meta:
        db_table = 'graph'