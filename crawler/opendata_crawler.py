import json
import pandas as pd
import opendata_utils as opendata

def get_partidos()-> dict:
	'''
	id, sigla, nome, totalMembros, lider.nome
	'''
	parties = []
	try:
		dfParties = opendata.perform_request('partidos', params={ 'ordem' : 'ASC', 'ordenarPor' : 'sigla', 'itens' : 100 })['dados']

		for partyId in dfParties:
			partyId = partyId['id']

			party = opendata.perform_request(f'partidos/{partyId}')['dados']
			parties.append({
			'id': party['id'],
			'sigla': party['sigla'],
			'nome': party['nome'],
			'situacao': party['status']['situacao'],
			'totalMembros': party['status']['totalMembros'],
			'nomeLider': party['status']['lider']['nome'],
		})
	except opendata.BadResponseException:
		pass

	return parties


def get_deputados_from_partido(id: int) -> dict:
	'''
	id, nomeEleitoral, siglaPartido, siglaUF, urlFoto, email, nomeCivil, escolaridade, ufNascimento, sexo
	'''

	congresspeople = []
	
	try:
		dfCongresspeople = opendata.perform_request(f'partidos/{id}/membros', params ={'itens': 100})['dados']

		for congressperson in dfCongresspeople:
			congresspersonId = congressperson['id']
			congressperson_data = opendata.perform_request(f'deputados/{congresspersonId}')['dados']
			
			congresspeople.append({
			'id': congressperson['id'],
			'nomeEleitoral': congressperson['nome'],
			'siglaPartido': congressperson['siglaPartido'],
			'UF': congressperson['siglaUf'],
			'urlFoto': congressperson['urlFoto'],
			'email': congressperson['email'],
			'nomeCivil': congressperson_data['nomeCivil'],
			'escolaridade': congressperson_data['escolaridade'],
			'ufNascimento': congressperson_data['ufNascimento'],
			'sexo': congressperson_data['sexo']
		})
	except opendata.BadResponseException:
		pass
	
	return congresspeople

def get_deputados(dfPartidos: dict)-> dict:
	deputados = []
	for partido in dfPartidos:
		deputados += get_deputados_from_partido(partido['id'])
	return deputados

def dump_congresspeople_json_to_csv(jsonFilePath: str = 'deputados.json', csvFilePath: str = 'deputados.csv'):
	with open(jsonFilePath) as f:
		dfDeputados = json.load(f)['dados']
		df = pd.DataFrame(dfDeputados)
		df = df.drop((df.loc[ ~(((df.dataNascimento != '') & (df.dataNascimento > '1930')) & (df.dataFalecimento == '')) ]).index)
		df.to_csv(csvFilePath)