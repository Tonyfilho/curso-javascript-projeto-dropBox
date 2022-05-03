var express = require('express');
var router = express.Router();
var formidable = require('formidable');//adcionado a instancia do formidable

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**POST a rota  UPLOAD quando for fazer o POST do upload do arquivo */
router.post('/upload',(req, res, next) =>  {
  /**Utilizando o formiDable em nossa rota
   * 1º criar uma nova instancia do formidable para sobreescrevermos
   * 2º formidable.IncomingForm chama o FORMULARIO do formidable, 
   * temos que passar algumas OPÇÕES em forma de Objetos
   * 3º OPÇÕES 1º diretorio p receber os files, 2º a extensão do Files p/ serem salvas
   * 4º form.parse() fazer um PARSE ou um interpretação do dados usaremos
   * 5º Oa dados estão dentro da Var REQ que o request ou Requisição
   * 6º passar o REQ e uma função callBack de resposta ou RES 1º error, 2º campos, e 3º arquivo,
   * error, caso tenhamos temos que tratar.
   * Obs: os paramentros 2º e 3º, cria-se 2 Jsons, o FORMIDABLE separa o que foi enviado via POST
   * e o que são os Arquivos que precisam ser salvos dentro do diretorio ./upload
   * 
   */
  const form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });
  form.parse(req, (error, fields, files) => {
    res.json({
      files : files
    });

  });
});
module.exports = router;
