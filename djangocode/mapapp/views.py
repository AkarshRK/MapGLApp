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
from django.db.models import Count


def Rand(start, end, num):
    res = []

    for j in range(num):
        res.append(random.randint(start, end))

    return res


@csrf_exempt
def update_city_database(request):
    # updating databse 
    with open('/home/akarsh/Desktop/MohitApp/djangocode/mapapp/json_city_data/cities.json') as f:
        cities = json.loads(f.read())
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
    result = models.Cities.objects.filter(city_id='BOM').values(
        'lon', 'lat', 'country_name', 'name', "con_id")
    country_name = result[0]['country_name']
    country_cities = models.Cities.objects.filter(country_name=country_name).values(
        'lon', 'lat', 'city_id', 'country_name', 'name')
    random_indexes = random.sample(range(1, len(country_cities)), 5)

    geojsonformat = {'type': 'FeatureCollection'}
    features = []
    # appending default user input's city id
    features.append({
        'type': 'Feature',
        'geometry': {
                'type': 'Point',
                'coordinates': [result[0]['lon'], result[0]['lat']]
        },
        'properties': {
            'title': result[0]['name']
        }
    })
    # generating geojson format
    for i in random_indexes:
        lat = country_cities[i]['lat']
        lon = country_cities[i]['lon']
        name = country_cities[i]['name']
        feature = {}
        feature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [lon, lat]
            },
            'properties': {
                'title': name
            }
        }
        features.append(feature)

     # Continents
    cont_ids = ["north-america", "south-america", "asia",
                "oceania", "antarctica", "europe", "africa"]
    # removing user input as it is already included
    cont_ids.remove(result[0]['con_id'])
    random_cont_indexes = random.sample(range(1, len(cont_ids)), 5)
    diff_cont_ids = [cont_ids[i] for i in random_cont_indexes]
    distinct = models.Cities.objects.filter(con_id__in=diff_cont_ids).values('lon', 'lat', 'city_id', 'country_name', 'name', 'con_id').annotate(
        con_id_count=Count('con_id')).filter(con_id_count=1)
    cont_cities = models.Cities.objects.filter(con_id__in=[item['con_id'] for item in distinct]).values(
        'lon', 'lat', 'city_id', 'country_name', 'name', 'con_id')

    # generating geojson format
    for i in random_cont_indexes:
        lat = cont_cities[i]['lat']
        lon = cont_cities[i]['lon']
        name = cont_cities[i]['name']
        feature = {}
        feature = {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [lon, lat]
            },
            'properties': {
                'title': name
            }
        }
        features.append(feature)

    geojsonformat['features'] = features

    return JsonResponse({
        "data":  geojsonformat,
        "status": "success"
    }, safe=False)
