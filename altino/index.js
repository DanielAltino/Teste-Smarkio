let request = require('request-promise-native');

let mysql = require('mysql');

let sqlSelect;

let connection = mysql.createConnection({
    host: 'staging.cweudo5c98bn.sa-east-1.rds.amazonaws.com',
    user: 'pyqa',
    password: 'sUQu1gH7gl9#uBoKnB',
    database: 'teste_py'
});

connection.connect(function (err) {
    if (err) return console.log(err);
})


const rpOptions = {
    uri: 'http://cep.bldstools.com',
    qs: {
        cep: '37500050'
    },
    json: true
}

request(rpOptions).then(function (cepRet) {
    console.log('Retorno CEP:', cepRet);

    if (cepRet.code == 200) {


        console.log('Salvando no banco ...');

        let sqlInsert = `INSERT INTO dados_dep (cep, nome, endereco, bairro, estado, cidade, retorno_api) VALUES (${cepRet.result.cep}, '${cepRet.message}', '${cepRet.result.logradouro}', '${cepRet.result.bairro}', '${cepRet.result.uf}', '${cepRet.result.localidade}', '${JSON.stringify(cepRet)}')`;

        connection.query(sqlInsert);
    }


})


    .catch(function (err) {
        console.error('Erro ao fazer request.')
    });


let buscaCep = 37500054;


connection.query(`SELECT * FROM dados_dep WHERE cep = ${buscaCep}`, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
