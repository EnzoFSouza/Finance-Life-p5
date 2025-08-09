class Ativo{
  constructor(x, y, name, price, amount, data_com = "", data_pagamento = ""){
    this.x = x;
    this.y = y;

    this.name = name;
    this.price = price;
    this.amount = amount;
    this.data_com = data_com; //date of the dividend
    this.data_pagamento = data_pagamento; //dividends
    
    this.informacoes = [this.name, this.price, this.amount];
    this.desloc = 5;
  }
  
  displayInfo(){
    fill(255,255,255);
    rect(this.x - 20, this.y - 40, this.informacoes.length * 50, 150);

    fill(0,0,0);
    textSize(30);
    
    for(var i = 0; i < this.informacoes.length; i++){
        text(this.informacoes[i], this.x, this.y + this.desloc)    
        this.desloc += 35;
    }
    this.desloc = 5; //reset desloc for next object
  }

  displayScreen(){
    textSize(50);
    text(this.name, 70, 100);
    textSize(30);
    text("Preço atual: " + this.price, 70, 150);
    text("Quantidade: " + this.amount, 70, 200);
    text("Data do pagamento: " + this.data_pagamento, 70, 250);
    text("Data do dividendo: " + this.data_com, 70, 300);
    text("Valor do dividendo: " + (this.price * this.amount).toFixed(2), 70, 350);
    fill(255, 255, 255);
    rect(x_voltar, y_voltar, largura_voltar, altura_voltar);
    fill(0,0,0);
    text("Voltar", x_voltar + 20, y_voltar + 50);
  }
}

//creating objects
//                      x,  y,    name,    p,   a,  data_com, data_pagamento
//var acao1 = new Ativo(100, 50, "ABC11", 9.45, 7, "29 - 31", "13 - 18");

//var acao2 = new Ativo(100, 345, "DEF11", 10, 10, "29 - 31", "6 - 11");

//var acao3 = new Ativo(100, 640, "GHI11", 133, 1, "29 - 31", "6 - 11");
var tela = "inicio";
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function preload() {
    dados = loadJSON('ativos_novo.json');
}

var titulo;
var ativos;
var objetos = [];

var posicoes_x = [];
var posicoes_y = [];

var x_voltar = 1500;
var y_voltar = 1000;
var largura_voltar = 100;
var altura_voltar = 100;

function setup() {
  createCanvas(1700, 1300);
  titulo = dados.titulo;
  ativos = dados.ativos;
  for(var i = 0; i < ativos.length; i++){
    var x = 70 + (i % 4) * 300; //distribute objects in a grid
    var y = 300 + Math.floor(i / 4) * 300; //distribute objects in a grid

    var ativo = ativos[i];
    console.log(ativo);
    objetos.push(new Ativo(x, y, ativo.nome, ativo.preco_atual, ativo.quantidade, ativo.data_com, ativo.data_pagamento));
    posicoes_x.push(x);
    posicoes_y.push(y);
  }

  console.log(objetos);
}

function draw() {    
  background('rgba(220, 255, 230, 1)');
  if (tela === "inicio"){
    textSize(50);
    fill(0, 0, 0);
    text(titulo, 50, 100);
    textSize(30);
    text("Clique em um ativo para ver mais informações", 50, 150);
    for(var i = 0; i < objetos.length; i++){
      objetos[i].displayInfo();
    }
    text(mouseX + ", " + mouseY, 1500, 50);
  }

  else {
    objetos[tela].displayScreen();
    if(mouseX > x_voltar && mouseX < x_voltar + largura_voltar && mouseY > y_voltar && mouseY < y_voltar + altura_voltar){
      if(mouseIsPressed){
        tela = "inicio"; //go back to the main screen
      }
    }
  }
  

  
  //console.log(titulo);
  //console.log(ativos);
  /*acao1.displayInfo();
  
  acao2.displayInfo();
  
  acao3.displayInfo();
  */
}

function mouseClicked(){ //navigate through screens
  for(var i = 0; i < objetos.length; i++){
    if(mouseX > posicoes_x[i] - 20 && mouseX < posicoes_x[i] - 20 + objetos[i].informacoes.length * 50 &&
       mouseY > posicoes_y[i] - 40 && mouseY < posicoes_y[i] - 40 + 150){
        tela = i; //go to screen i
    } 
  }
}