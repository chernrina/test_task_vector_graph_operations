from django.urls import path
from rest_framework import routers
from .views import UsersViewSet,GraphsViewSet, GraphViewSet, GraphsUserViewSet, VertexViewSet

router = routers.SimpleRouter()
router.register('users',UsersViewSet,basename='user')
router.register('graphs',GraphsViewSet,basename='graphs')


urlpatterns = [
	path('graph/<str:user>',GraphsUserViewSet.as_view({"get": "get"}), name='graphsUser'),
	path('graph/<str:user>/<str:graph>',GraphViewSet.as_view({"get": "get","post":"post"}), name='graph'),
	path('vertex/<str:user>/<str:graph>',VertexViewSet.as_view({"get": "get","post":"post"}), name='vertex'),
]
urlpatterns += router.urls
