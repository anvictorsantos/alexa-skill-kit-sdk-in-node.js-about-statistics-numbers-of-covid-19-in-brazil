<p align="center">
  <img src="assets/alexa-skill-covid-512.png">
  <br/>
  <h1 align="center">Alexa Skill Kit SDK in Node.js about statistics numbers of COVID-19 in Brazil and its provinces</h1>
</p>

# Notas sobre esse projeto

Esse projeto foi desenvolvido a partir de bibliotecas opensource, em virtude de ser para cunho exclusivamente acadêmico.
# API - COVID-19 Coronavirus Statistics - Free
A API usada para buscar sobre o total de casos no Brasil e nos estados brasileiros, pode ser encontrada aqui: https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics

# API - Coronavirus COVID19 API - Free
A API usada para buscar sobre o total e novos casos no mundo, pode ser encontrada aqui: https://documenter.getpostman.com/view/10808728/SzS8rjbc#27454960-ea1c-4b91-a0b6-0468bb4e6712

# Lib's usadas:

# 1 - axios
Utilizei da lib do axios para fazer as requisições nas API's acima, logo, a mesma pode ser encontrada aqui: https://github.com/axios/axios

# 2 - moment
Utilizei da lib do moment para tratar a data que vinha a partir das API's acima, logo, a mesma pode ser encontrada aqui: https://github.com/moment/moment

# Obs.:
Para as duas bibliotecas acima, eu tive de fazer duas modificações:

    1 - A primeira encontra-se no arquivo `package.json`, a qual você deve inclu=i-las como dependências, assim:

        Ex.:
            "dependencies": {
                "axios": "^0.21.1",
                "moment": "^2.29.1"
            } 
    
    2 - A segunda encontra-se no arquivo `index.js`, no qual você deve importá-las para usar, por exemplo:

        Ex.:
            var axios = require("axios").default;
            var moment = require('moment');
