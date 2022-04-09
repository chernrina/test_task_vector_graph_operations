from rest_framework import serializers
from django.contrib.auth.models import User
from graphs.models import Graph, Vertex

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['id','username']

class GraphSerializer(serializers.ModelSerializer):

	class Meta:
		model = Graph
		fields = ['id_graph','name','user_id','value']

class VertexSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vertex
		fields = ['local_id','type_vertex','value','graph_id']