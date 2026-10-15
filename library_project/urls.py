from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('library.urls')), # Adapte selon le nom de ton app d'API
    
    # Redirige toutes les autres routes vers l'index.html de React
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]