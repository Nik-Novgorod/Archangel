from django.shortcuts import render

from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework import generics
from .models import Person
from .serializers import PersonSerializer

from django.http import JsonResponse
from .models import Person

from rest_framework import viewsets
from .models import Person
from .serializers import PersonSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly

def person_list(request):
    """Возвращает JSON-список всех персон"""
    persons = Person.objects.all().values('id', 'full_name', 'worker', 'description')
    return JsonResponse(list(persons), safe=False)

def person_detail(request, id):
    person = get_object_or_404(Person, id=id)
    return JsonResponse({
        'id': person.id,
        'full_name': person.full_name,
        'worker': person.worker,
        'description': person.description
    })
class PersonListCreateView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonDetailView(generics.RetrieveAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    lookup_field = 'id'


#class PersonList(generics.ListAPIView):
 
 #   serializer_class = PersonSerializer
    
  #  def get_queryset(self):
   #     return Person.objects.all() 


class PersonViewSet(viewsets.ReadOnlyModelViewSet):
    ##serializer_class = PersonSerializer
    ##queryset = Person.objects.filter(is_published=True)
    ##filter_backends = [DjangoFilterBackend]
    ##filterset_fields = ['worker']
    queryset = Person.objects.filter(is_published=True)
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Только чтение для всех, кроме админа