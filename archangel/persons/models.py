from django.db import models
from django.core.validators import MinLengthValidator
# Create your models here.

class Person(models.Model):
    full_name = models.CharField("ФИО", max_length=200,validators=[MinLengthValidator(5)])
    worker = models.CharField(
        "Статус",
        max_length=100,
        choices=[
            ('монах', 'Монах'),
            ('священник', 'Священник'),
            ('прихожанин', 'Прихожанин')
        ]
    )
    description = models.TextField(
        "Биография",
        help_text="Можно использовать HTML-теги"
    )
    birth_year = models.IntegerField("Год рождения", null=True, blank=True, default=None)
    death_year = models.IntegerField("Год смерти", null=True, blank=True, default=None)
    photo = models.ImageField(
        "Фотография",
        upload_to='persons/photos/',
        null=True,
        blank=True
    )
    is_published = models.BooleanField("Опубликовано", default=True)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True,null=True,  # Разрешаем NULL
        blank=True)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Персона"
        verbose_name_plural = "Персоны"
        ordering = ['full_name']