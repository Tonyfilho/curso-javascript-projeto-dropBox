# Projeto DropBox Clone


### Projeto
![DropBox Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/DropBoxClone.jpg?alt=media&token=d59cad0c-440d-4516-88f2-da904b9bb443)

# 1º passo
01 clonar o projeto 
02 executar as dependencias do BOWER : css e html e js com bower install, 
vai ler as dependencias do bower.json e instalar.

# 2º passo instalando express-generator

01 npm install -g express-generator intalar globalmente
02 express --esj + nome do Projeto, em nosso caso app
ex: express -esj app

# 3º passo startando o projeto dentro do diretorio APP
01 npm install para instalar as dependencia do node
02 mover tudo que esta na raiz do projeto para dentro de app\public
note: pode excluir as pasta ja criadas pelo express-generator.
03 - recortar o index.html p app\views e  renomear para index.ejs
obs: caso não mude a extensão do arquivo, tem q ir na aba do explore e pedir para mostrar EXTENSÕES
04 npm start dentro de APP 
05 ir para localhost:http://localhost:3000/ no navegador
