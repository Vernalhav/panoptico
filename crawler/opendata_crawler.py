import json
import pandas as pd
import opendata_utils as opendata

def get_partidos()-> dict:
  return opendata.perform_request('partidos', params={ 'ordem' : 'ASC', 'ordenarPor' : 'sigla', 'itens' : 100 })['dados']

def get_deputados_from_partido(id: int) -> dict:
	'''
	id, siglaUF, siglaPartido, nomeEleitoral, #sexo, email
	'''

	congresspeople = []
	
	try:
		dfCongresspeople = opendata.perform_request(f'partidos/{id}/membros', params ={'itens': 100})['dados']

		for congressperson in dfCongresspeople:
			congresspeople.append({
			'id': congressperson['id'],
			'nomeEleitoral': congressperson['nome'],
			'siglaPartido': congressperson['siglaPartido'],
			'UF': congressperson['siglaUf']
		})
	except opendata.BadResponseException:
		pass
	
	return congresspeople

def dump_congresspeople_json_to_csv(jsonFilePath: str = 'deputados.json', csvFilePath: str = 'deputados.csv'):
	with open(jsonFilePath) as f:
		dfDeputados = json.load(f)['dados']
		df = pd.DataFrame(dfDeputados)
		df = df.drop((df.loc[ ~(((df.dataNascimento != '') & (df.dataNascimento > '1930')) & (df.dataFalecimento == '')) ]).index)
		df.to_csv(csvFilePath)