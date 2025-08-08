from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Person
        fields = [
            'id', 
            'full_name', 
            'worker', 
            'description',
            'birth_year',
            'death_year',
            'photo_url',
            'is_published'
        ]
    
    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.url
        return None