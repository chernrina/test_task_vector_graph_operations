from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import UserSerializer, GraphSerializer, VertexSerializer
from django.contrib.auth.models import User
from ..models import Graph, Vertex

from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator


class UsersViewSet(viewsets.ModelViewSet):

	queryset = User.objects.all()
	serializer_class = UserSerializer

class GraphsViewSet(viewsets.ModelViewSet):

	queryset = Graph.objects.all()
	serializer_class = GraphSerializer

class GraphsUserViewSet(viewsets.ModelViewSet):

    serializer_class = GraphSerializer
    queryset = Graph.objects.all()

    def get(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        userId = User.objects.filter(username=username).first()
        if userId:
            queryset = Graph.objects.filter(user_id=userId) 
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response([])

class GraphViewSet(viewsets.ModelViewSet):

    serializer_class = GraphSerializer
    queryset = Graph.objects.all()

    def get(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        graphname = kwargs.get('graph','')
        userId = User.objects.filter(username=username).first()
        if userId:
            queryset = Graph.objects.filter(user_id=userId).filter(name=graphname) 
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response([])

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        data = request.data
        userId = User.objects.filter(username=data['user_id']).first()
        if userId and str(request.user) == userId.username and request.user.is_authenticated:
            queryset = Graph.objects.filter(name=data['name']).filter(user_id=userId.id).first()
            if queryset:
                queryset.value = data['value']
                queryset.save()
            else:
                newGraph = Graph.objects.create(user_id=userId,value=data['value'],name=data['name'])
                newGraph.save()
        return Response([])

class VertexViewSet(viewsets.ModelViewSet):

    serializer_class = VertexSerializer
    queryset = Vertex.objects.all()

    def get(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        graphname = kwargs.get('graph','')
        userId = User.objects.filter(username=username).first()
        if userId:
            graphId = Graph.objects.filter(user_id=userId).filter(name=graphname).first()
            if graphId:
                queryset = Vertex.objects.filter(graph_id=graphId.id_graph)
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
        return Response([])

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        graphname = kwargs.get('graph','')
        data = request.data
        userId = User.objects.filter(username=username).first()
        if userId and str(request.user) == userId.username and request.user.is_authenticated:
            graphId = Graph.objects.filter(name=graphname).filter(user_id=userId.id).first()
            if graphId:
                for elem in data:
                    newVertex = Vertex.objects.create(type_vertex=elem['type_vertex'],
                                                    value=elem['value'],graph_id=graphId)
                    newVertex.save()
            else:
                return Response("No such graph",status=status.HTTP_404_NOT_FOUND)
        return Response([])


def calculate(graph, vertex, flag, op,change=False):
    if (flag == 0): #последнее вычисление

        result = vertex[graph[-1][0]]["value"] #значение первого вектора
        components = graph[-1][1:-1] if change else graph[-1][1:] 
        if (op == 1): #сложение
            for elem in components:
                diff = len(vertex[elem]["value"])-len(result)
                result = list(map(sum, zip(result + [0,]*diff, vertex[elem]["value"] + [0,]*-diff)))
        else: #умножение
            for elem in components:
                diff = len(vertex[elem]["value"])-len(result)
                result = list(map(lambda x, y: x*y, result + [0,]*diff, vertex[elem]["value"] + [0,]*-diff))
        return result
    else: #пересчитать граф
        types = [0,] * len(vertex)
        def dfs(ind):
            for elem in graph[ind]:
                if types[elem] == 0: # не посещенная вершина
                    types[elem] = vertex[elem]["type_vertex"]
                    dfs(elem)
                    if types[elem] == 2:
                        vertex[graph[elem][-1]]["value"] = calculate(graph[:elem+1],vertex,0,vertex[elem]["value"][0],True)
                        types[graph[elem][-1]] = 1
        dfs(-1)
        print(vertex)


