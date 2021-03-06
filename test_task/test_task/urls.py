from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from test_task import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('graphs.api.urls')),
    path('', TemplateView.as_view(template_name='index.html')),  
    #path('accounts/', include('django.contrib.auth.urls')),
    path('login/', views.LoginView.as_view(), name='login'),
    path('registration/', views.RegistrationView.as_view(), name='registration'),
    path('lk/<str:username>',views.lk),
    path('logout/',views.logout,name='logout'),
    path('edit/<str:username>/<str:projectname>', views.edit),
]
