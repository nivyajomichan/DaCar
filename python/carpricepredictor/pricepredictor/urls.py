from django.urls import path, include
from . import views

urlpatterns = [
    path('predict/', views.pricePredict.as_view())
]
