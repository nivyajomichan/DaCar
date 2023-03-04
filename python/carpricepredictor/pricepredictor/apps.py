from django.apps import AppConfig
import joblib
import os
from django.conf import settings


class PricepredictorConfig(AppConfig):
    name = 'pricepredictor'
    MODEL_FILE = os.path.join(settings.MODELS, "UsedCarPricePredictionModel.joblib")
    model = joblib.load(MODEL_FILE)
