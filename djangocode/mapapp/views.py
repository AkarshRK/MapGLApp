from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pandas as pd
import json
from dateutil import parser
from django.utils.dateparse import parse_date
from django.db.models import F, FloatField, Sum, When, Case, Window, Avg
from django.core import serializers
from collections import OrderedDict
from django.views.decorators.csrf import csrf_exempt
import datetime
import statistics
from . import models
import random
def Rand(start, end, num): 
    res = [] 
  
    for j in range(num): 
        res.append(random.randint(start, end)) 
  
    return res 


@csrf_exempt
def update_city_database(request):
    print("Reached")
    with open('/home/akarsh/Desktop/MohitApp/djangocode/mapapp/json_city_data/cities.json') as f:
        cities = json.loads(f.read())
    print("ReadReached")
    city_list = []
    for key, value in cities.items():
        city_id = value['id']
        name = value['name']
        lat = value['location']['lat']
        lon = value['location']['lon']
        country_name = value['countryName']
        iata = value['iata']
        rank = value['rank']
        country_id = value['countryId']
        con_id = value['contId']
        city_list.append(
            models.Cities(
                city_id=city_id,
                name=name,
                lat=lat,
                lon=lon,
                country_name=country_name,
                iata=iata,
                rank=rank,
                country_id=country_id,
                con_id=con_id
            ))
    models.Cities.objects.bulk_create(city_list, ignore_conflicts=True)

    return JsonResponse({
        "data": cities
    }, safe=False)


@csrf_exempt
def get_city(request):
    # with open('/home/akarsh/Desktop/MohitApp/djangocode/mapapp/json_city_data/cities.json') as f:
    #     cities = json.loads(f.read())
    result = models.Cities.objects.filter(city_id='BOM').values('lon','lat','city_id','country_name') 
    country_name = result[0]['country_name']
    country_cities = models.Cities.objects.filter(country_name=country_name).values('lon','lat','city_id','country_name') 
    random_indexes = Rand(0,len(country_cities),5)
    for i in random_indexes:
        geojsonformat = {}
        

    return JsonResponse({
        "data":  random_indexes
    }, safe=False)
