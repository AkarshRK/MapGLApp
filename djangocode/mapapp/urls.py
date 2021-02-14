from django.urls import path
from . import views


urlpatterns = [
    path('searchCities/', views.get_city, name='searchCities'),
    path('updateDB/', views.update_city_database, name='updateDB')
]
