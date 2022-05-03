class DropBoxController {
  constructor() {
    this.btnSendFileEl = document.querySelector("#btn-send-file"); // pegando o botão enviar arquivos pelo Id
    this.inputFilesEl = document.querySelector("#files"); // pegando input com id file para abrir ele  e manda os arquivos
    this.snackModalEl = document.querySelector("#react-snackbar-root"); //pegando o modal de carregamento de arquivos
    this.initEvents();
  }

  initEvents() {
    /**Pondo o evento do click no botão btnSendFileEl e abrindo janela de anexar arquivos
     * do input do tipo file id='file'
     */
    this.btnSendFileEl.addEventListener("click", (event) => {
      this.inputFilesEl.click(); //colocando o click dentro do input para abrir a tela do input
    });
    /**Criando um evento de CHANGE q mostra a modal assim que for detectado uma ALTERAÇÃO e o arquivo carregado
     * 1º o event é a função
     * 2º target é o alvo ou seja a tag  do INPUT
     * 3º files é o que tem no input ou seja um array de files
     */
    this.inputFilesEl.addEventListener("change", (event) => {
      //console.log(event.target.files);
      this.uploadTask(event.target.files); //mandando o arquivo para uploadTask()
      this.snackModalEl.style.display = "block"; /**Mostrando o model na tela */
    });
  }

   
  /**Metodo de Upload de Arquivos
   * 1º cada arquivo no array promise terá uma promessa em um indice do array
   * pode acontecer o upload ou falhar, por isto que tem de ser uma promise
   * 2º retornaremos um array de promise com o PROMISEALL()
   * 3º Convertendo o FILES de COLEÇÃO p/ ARRAY, usaremos o SPREAD
   * 4º o ARRAY Promise receberá um new promise com o resolve e o reject
   * 5º Para cada promessa teremos q fazer o AJAX do FILES
   * 6º Criar o Var ajax  para fazer o POST com a ROTA neste caso /upload e mandar para um diretorio
   * 7º Criar um EVENTO ONLOAD do AJAX para sabermos se o arquivos foi ou não carregado
   * 8º dentro do EVENTO fazer um try e catch 
   * 9º Fz o Resolve e passar o JSON.parse() da resposta do Servidor AJAX, q recebe ajax.resposeText
   * 10º Fz o AJAX.oneerror p/ caso haja erro por parte do AJAX server
   * 11º Usar a API FORMDATA() de leitura de Arquivo p/ ler img, pdf, docs etc e passar o 
   * arquivo que recebemos no forEach. E usar o metodo APPEND() para juntar arquivos caso seja mais de 1
   * este metodo recebe 2 paramentros, 1º NOME_DO_CAMPO tipo um KEY e o 2º o ARQUIVO q esta dentro de FILE
   * 12º Passar o formData como paramentro do AJAX.send()
   * 12º Fz o AJAX.send()
   *  
   */
  uploadTask(files){
    const promises = [];
    [...files].forEach(file => {
      promises.push(new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open('POST', '/upload');
        ajax.onload = event => {
          try {
            resolve(JSON.parse(ajax.responseText));
          } catch (error) {
            reject(error);
          }
        };
        ajax.onerror = event => {
          reject(event);
        };
        let formData = new FormData();
        formData.append('input-file',file);
        ajax.send(formData);
      }));

    });

    return Promise.all(promises);
  }




} //end Class
