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
    /**Criando um evento q mostra a modal assim que for detectado uma arquivo carregado */
    this.inputFilesEl.addEventListener("change", (event) => {
      console.log(event.target.files, 'evento');
      this.snackModalEl.style.display = "block"; /**Mostrando o model na tela */
    });
  }
} //end Class
