# Bank-API

Instruções para executar o projeto:

- instale as dependências **NPM INSTALL**
- Inicie uma instâcia do **MongoDB** (no linux: $ sudo service mongod start)
- Conecte a API **NPM START**

Como utilizar a API:

- para cadastrar um cliente - faça uma requisição POST no endpoint http://localhost:3000/clients com o JSON no seguinte formato: <br>
{ <br>
  "name": "Nome_do_cliente", <br>
  "cpf": "00000000000" <br>
} <br>

- para fazer um depósito - faça uma requisição PUT no endpoint http://localhost:3000/deposits com o JSON no seguinte formato: <br>
{ <br>
  "cpf": "00000000000", <br>
	"value": 500 <br>
} <br>

- para fazer uma transferência - faça uma requisição PUT no endpoint http://localhost:3000/transfers com o JSON no seguinte formato: <br>
{ <br>
  "cpfSender": "00000000000", <br>
	"cpfReceiver": "00000000000", <br>
	"value": 0 <br>
} <br>
