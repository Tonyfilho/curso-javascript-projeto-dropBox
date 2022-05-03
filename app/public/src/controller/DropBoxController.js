class DropBoxController {
  constructor() {
    this.startUploadTime = 0; // var para receber um datetime no momento de carregar um arquivo
    this.btnSendFileEl = document.querySelector("#btn-send-file"); // pegando o botão enviar arquivos pelo Id
    this.inputFilesEl = document.querySelector("#files"); // pegando input com id file para abrir ele  e manda os arquivos
    this.snackModalEl = document.querySelector("#react-snackbar-root"); //pegando o modal de carregamento de arquivos
    this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg') //recebendo a DIV FILHA que é a barra de progresso do modal,  que esta dentro da var snackModalEl
    this.namefileEl = this.snackModalEl.querySelector('.filename'); //Recebendo o SPAN que a class filename dentro da DIV snackModalEl
    this.timeleftEl = this.snackModalEl.querySelector('.timeleft'); //Recebendo o SPAN que a class timeleft dentro da DIV snackModalEl
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
     * 3º files é o que tem no input ou seja um array de files,
     * 4º depois de fechar o modal, zera a Var de elemento this.inputFilesEl
     */
    this.inputFilesEl.addEventListener("change", (event) => {
      //console.log(event.target.files);
      this.uploadTask(event.target.files); //mandando o arquivo para uploadTask()
      this.modalShow();/**Mostrando o model na tela */
      this.inputFilesEl.value = '';
       
    });
  }
  /**Mostra o modal assim q for chamado, mudando o style da DIV com o ID #react-snackbar-root  */
   modalShow(show = true){
    this.snackModalEl.style.display = (show) ? "block" : 'none';
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
   * 13º Fz o AJAX.send()
   * 14º Fz o AJAX.progress para ter acesso ao progresso do Upload do arquivo,e  fazer o metodo uploadProgress()
   * 15º this.startUploadTime: criando um ATRIBUTO para receber o time quando fizermos um 
   * Upload antes do envio, dentro do uploadTask
   */
  uploadTask(files){
    const promises = [];
    [...files].forEach(file => {
      promises.push(new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        ajax.open('POST', '/upload');
        ajax.onload = event => {
          this.modalShow(false); // fechando o modal
          try {
            resolve(JSON.parse(ajax.responseText));
          } catch (error) {
            this.modalShow(false); // fechando o modal
            reject(error);
          }
        };
        ajax.onerror = event => {
          this.modalShow(false); // fechando o modal
          reject(event);
        };
        ajax.upload.onprogress = event => {
         // console.log(event);
         this.uploadProgress(event, file);
        };
        let formData = new FormData();
        formData.append('input-file',file);
        this.startUploadTime = Date.now();
        ajax.send(formData);
      }));

    });

    return Promise.all(promises);
  }

  /**Metodo para contagem do tamanho do arquivo 
   * 1º dados enviado que vem do event.loaded
   * 2º tamanho total que vem do event.total  
   * 3º fazer o calculo do porcento
   * 4º atribuir a var this.progressBarEl.style.width o valor do percentual
   * 5º atualizar o nome do arquivo pela var this.namefileEl, usando o INNERHTML.
   * Obs: temos que calcular o TEMPO usando Date.now() e isto pode mudar de acordo com a conexão
   * 6º Var timespent, vai receber o this.startUploadTime.
   * 7º Var para calculo do tempo restante
  */
  uploadProgress(event, file) {
   let timespent = Date.now() - this.startUploadTime;
 
   let loaded = event.loaded;
   let total = event.total;
   let porcent = parseInt((loaded / total) * 100);
   let timeleft = parseInt((100 - porcent) * timespent) /porcent;
   this.progressBarEl.style.width = `${porcent}%`; // com elemento capturado mandaremos o css do tamanho da div
   this.namefileEl.innerHTML = file.name;
  //  console.log(timespent, porcent, timeleft);
   this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);


  }

  /**Metodo de formatar milissegundos para segundos 
   * 1º var de segundo, minutos e horas
   * 2º fazer o Modulo da var seconds receber o milisegundo /1000 e modulo para cada 60 segundo
   * virar 1 minuto.
   * 3º fazer modulo da var minutes (timeMilliSecunds / (1000 * 60)) % 60)
   * 4º fazer modulo da var hours (timeMilliSecunds / (1000 * 60 * 60 )) %  24)
   * 5º fazer as validações de horas e minutos
  */
  formatTimeToHuman(timeMilliSecunds){
    let seconds = parseInt((timeMilliSecunds / 1000) % 60);
    let minutes = parseInt((timeMilliSecunds / (1000 * 60)) % 60);
    let hours = parseInt((timeMilliSecunds / (1000 * 60 * 60)) %  24);

    if (hours > 0) {
      return `${hours} Horas, ${minutes} Minutos, ${seconds} Segundos`;
    }
    if (minutes > 0) {
      return `${minutes} Minutos, ${seconds} Segundos`;
    }
    if (seconds > 0) {
      return `${seconds} Segundos`;
    }

    return '';
   
  }



} //end Class
