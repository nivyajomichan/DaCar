from argparse import Action
from django.shortcuts import render
import django
from rest_framework.views import APIView
from .apps import PricepredictorConfig


# Create your views here.


class pricePredict(APIView):

    def post(self, request):
        try:
            data = request.data

            brand = data['brand']
            model = data['model']
            purchase_year = data['purchase_year']
            transmission_type = data['transmission_type']
            miles_driven = data['miles_driven']
            fuel_type = data['fuel_type']
            road_tax = data['road_tax']
            avg_miles_per_gallon = data['avg_miles_per_gallon']
            engine_size = data['engine_size']

            input_data = [brand, model, purchase_year, transmission_type, miles_driven, fuel_type, road_tax, avg_miles_per_gallon, engine_size]

            car_price_pred_model = PricepredictorConfig.model
            price = car_price_pred_model.predict([input_data])

            low_price = (price[0] - 0.1 * price[0]) * 1.36
            high_price = (price[0] + 0.1 * price[0]) * 1.36

            response = django.http.JsonResponse({"success": True, "message": "Price range of car should be between $ {} and $ {}".format(int(low_price), int(high_price))}, status=200)
            return response

        except Exception as e:
            response = django.http.JsonResponse({"success": False, "message": "Server is down", "Exception": e}, status=500)
            return response
