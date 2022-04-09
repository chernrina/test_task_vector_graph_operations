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
            if queryset:
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
        return Response([])

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        data = request.data
        userId = User.objects.filter(username=username).first()
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
                Vertex.objects.filter(graph_id=graphId.id_graph).delete()
                for elem in data:
                    newVertex = Vertex.objects.create(local_id=elem['local_id'],type_vertex=elem['type_vertex'],
                                                    value=elem['value'],graph_id=graphId)
                    newVertex.save()
            else:
                return Response("No such graph",status=status.HTTP_404_NOT_FOUND)
        return Response([])

class CalcViewSet(viewsets.ModelViewSet):

    serializer_class = VertexSerializer
    queryset = Vertex.objects.all()

    def get(self, request, *args, **kwargs):
        username = kwargs.get('user','')
        graphname = kwargs.get('graph','')
        op = kwargs.get('op','')
        userId = User.objects.filter(username=username).first()
        if userId:
            graphId = Graph.objects.filter(user_id=userId).filter(name=graphname).first()
            if graphId:
                queryset = Vertex.objects.filter(graph_id=graphId.id_graph)
                serializer = self.get_serializer(queryset, many=True)
                graphVis = to_adjacency_list(graphId.value)
                vertex = serializer.data
                result = calculate(graphVis,vertex,op,int(float(serializer.data[-1]["value"][0])))
                if op == 1:
                    graphId.value.append([len(vertex)-1,len(vertex)])
                    vertex.append({
                        "local_id":len(vertex),
                        "type_vertex":1,
                        "value":result                
                    })
                    return Response({
                        "graph": graphId.value,
                        "vertex":vertex
                    })
                else:
                    return Response({
                        "graph": graphId.value,
                        "vertex": result
                    })

        return Response([])


def calculate(graph, vertex, flag, op,change=False):
    if (flag == 1): #последнее вычисление
        result = [float(x) for x in vertex[graph[-1][0]]["value"]] #значение первого вектора
        components = graph[-1][1:-1] if change else graph[-1][1:] 
        if (op == 1): #сложение
            for elem in components:
                diff = len(vertex[elem]["value"])-len(result)
                result = list(map(sum, zip(result + [0,]*diff, 
                            [float(x) for x in vertex[elem]["value"]] + [0,]*-diff)))
        else: #умножение
            for elem in components:
                diff = len(vertex[elem]["value"])-len(result)
                result = list(map(lambda x, y: x*y, result + [0,]*diff,
                            [float(x) for x in  vertex[elem]["value"]] + [0,]*-diff))
        return result
    else: #пересчитать граф
        types = [0,] * len(vertex)
        def dfs(ind):
            for elem in graph[ind]:
                if types[elem] == 0: # не посещенная вершина
                    types[elem] = vertex[elem]["type_vertex"]
                    dfs(elem)
                    if int(float(types[elem])) == 2:
                        vertex[graph[elem][-1]]["value"] = calculate(graph[:elem+1],vertex,1,int(float(vertex[elem]["value"][0])),True)
                        types[graph[elem][-1]] = 1
        dfs(-1)
        return vertex


def to_adjacency_list(data):
    result = {}
    for elem in data:
        if elem[0] in result.keys():
            result[elem[0]] += [elem[1]]
        else:
            result[elem[0]] = [elem[1]]
        if elem[1] in result.keys():
            result[elem[1]] += [elem[0]]
        else:
            result[elem[1]] = [elem[0]]
    keys = list(result.keys())
    keys.sort()
    ans = []
    for elem in keys:
        ans.append(result[elem])
    return ans

