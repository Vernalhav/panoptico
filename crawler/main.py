from opendata_crawler import get_deputados, get_partidos
import pandas as pd

dfPartidos = get_partidos()
print(dfPartidos)

dfDeputados = get_deputados(dfPartidos)
print(dfDeputados)