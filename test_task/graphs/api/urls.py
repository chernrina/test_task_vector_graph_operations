from django.urls import path
from rest_framework import routers
from .views import UsersViewSet,GraphsViewSet, GraphViewSet, GraphsUserViewSet, VertexViewSet, CalcViewSet

router = routers.SimpleRouter()
router.register('users',UsersViewSet,basename='user')
router.register('graphs',GraphsViewSet,basename='graphs')


urlpatterns = [
	path('graph/<str:user>',GraphsUserViewSet.as_view({"get": "get"}), name='graphsUser'),
	path('graph/<str:user>/<str:graph>',GraphViewSet.as_view({"get": "get","post":"post"}), name='graph'),
	path('vertex/<str:user>/<str:graph>',VertexViewSet.as_view({"get": "get","post":"post"}), name='vertex'),
	path('calculate/<int:op>/<str:user>/<str:graph>',CalcViewSet.as_view({"get": "get"}), name='calculate'),
]
urlpatterns += router.urls
