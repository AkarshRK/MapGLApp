from django.db import models
from datetime import datetime


class Cities(models.Model):
    city_id = models.CharField(default='default', primary_key=True, max_length=255)
    name = models.CharField(default='default', max_length=255)
    lat = models.FloatField(default=0.0)
    lon = models.FloatField(default=0.0)
    country_name = models.CharField(default='default', max_length=255)
    iata = models.CharField(default='default', max_length=255)
    rank = models.FloatField(default=0.0)
    country_id = models.CharField(default='default', max_length=255)
    con_id = models.CharField(default='default', max_length=255)
   
    class Meta:
        managed = True
        db_table = 'Cities'