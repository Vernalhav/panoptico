from opendata_crawler import get_deputados, get_partidos
from opendata_utils import json_array_to_csv, perform_request
import pandas as pd

dfPartidos = get_partidos()
print(dfPartidos)
json_array_to_csv(dfPartidos, 'partidos.csv')

dfDeputados = get_deputados(dfPartidos)
print(dfDeputados)
json_array_to_csv(dfDeputados, 'deputados.csv')