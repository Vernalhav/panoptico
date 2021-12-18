import pandas as pd
import requests

from typing import List

class BadResponseException(Exception): pass

def perform_request(route: str, params: dict = None, headers: dict = {}) -> dict:
	base_url = 'https://dadosabertos.camara.leg.br/api/v2'
	request_url = f'{base_url}/{route}'

	headers['accept'] = 'application/json'
	response = requests.get(request_url, params=params, headers=headers)
	
	if response.status_code != 200:
		raise BadResponseException(f'Bad response code {response.status_code}')
    
	return response.json()

def restrict_df_cols(
	df: pd.DataFrame,
	include_cols: List[str] = [],
	remove_cols: List[str] = []) -> pd.DataFrame:

	return df.loc[ :, filter(lambda col: col in include_cols or col not in remove_cols, df.columns) ]

def json_array_to_csv(
	data: List[dict],
	file_name: str,
	include_cols: List[str] = [],
	remove_cols: List[str] = []) -> pd.DataFrame:
    
	df = pd.DataFrame(data)
	df = restrict_df_cols(df, include_cols, remove_cols)
	df.to_csv(file_name, header=False, index=False)
	return df