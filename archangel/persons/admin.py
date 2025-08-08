from django.contrib import admin
from .models import Person
from django.utils.html import format_html

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'worker', 'is_published', 'preview_photo')
    list_editable = ('is_published',)
    search_fields = ('full_name', 'description')
    list_filter = ('worker', 'is_published')
    fieldsets = (
        (None, {
            'fields': ('full_name', 'worker', 'is_published')
        }),
        ('Биография', {
            'fields': ('description',),
            'classes': ('wide',)
        }),
        ('Дополнительно', {
            'fields': ('birth_year', 'death_year', 'photo'),
            'classes': ('collapse',)
        })
    )

    def preview_photo(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" style="max-height: 50px;" />',
                obj.photo.url
            )
        return "-"
    preview_photo.short_description = "Фото"