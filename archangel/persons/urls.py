# persons/urls.py
from django.urls import path
from . import views  # Импортируем views из текущего приложения

urlpatterns = [
    path('persons/', views.person_list, name='person-list'),  # Список всех записей
    path('persons/<int:id>/', views.person_detail, name='person-detail'),  # Конкретная запись
]
from django.http import JsonResponse

def test_view(request):
    return JsonResponse({"test": "OK", "field": "full_name"})