class Ativo{
  constructor(x = 0, y = 0, name = "", price = 0, amount = 0, tipo = "", data_com = "", data_pagamento = ""){
    this.x = x;
    this.y = y;

    this.name = name;
    this.price = price;
    this.amount = amount;
    this.tipo = tipo;
    this.data_com = data_com;
    this.data_pagamento = data_pagamento;
    
    this.informacoes = [this.name, this.price, this.amount, this.tipo, this.data_com, this.data_pagamento];

    this.desloc;
  }

  displayInfo(){
    fill(255,255,255);
    rect(this.x - 20, this.y - 40, this.informacoes.length * 40, this.informacoes.length * 40, 15);

    fill(0,0,0);
    textSize(60);
    text(this.name, this.x + 10, this.y + 20);

    textSize(45);
    if (this.tipo == "Acao"){
      this.desloc = 45;
      
    }
    else if (this.tipo == "FII"){
      this.desloc = 60;
    }

    text(this.tipo, this.x + this.desloc, this.y + 100);
    text(this.price, this.x + 60, this.y + 170);
  }

  displayScreen(){
    textSize(50);
    text(this.name, 70, 100);
    textSize(30);
    text("Preço atual: " + this.price, 70, 150);
    text("Quantidade: " + this.amount, 70, 200);
    text("Tipo: " + this.tipo, 70, 250);
    text("Data com: " + this.data_com, 70, 300);
    text("Data do pagamento: " + this.data_pagamento, 70, 350);

    fill(255, 255, 255);
    rect(x_voltar, y_voltar, largura_voltar, altura_voltar);
    fill(0,0,0);
    text("Voltar", x_voltar + 20, y_voltar + 50);
  }

  //displayArc(cor){
  //  fill(cor);
  //  arc(600, 400, 200, 200, this.start_angle, this.finish_angle, PIE);
  //}
}

var tela = "inicio";

var titulo;
var ativos;
var objetos = [];

var posicoes_x = [];
var posicoes_y = [];

var x_voltar = 1500;
var y_voltar = 1000;
var largura_voltar = 100;
var altura_voltar = 100;

var valor_total = 0;

var start_angle = 0;

var cores = [];

function preload() {
    dados = loadJSON('ativos_novo.json');
}

function setup() {
  createCanvas(1700, 1300);
  titulo = dados.titulo;
  ativos = dados.ativos;

  for(var i = 0; i < ativos.length; i++){
    var x = 70 + (i % 5) * 300; //distribute objects in a grid
    var y = 300 + Math.floor(i / 5) * 300; //distribute objects in a grid

    var ativo = ativos[i];
    
    valor_total += ativo.preco_atual * ativo.quantidade;

    objetos.push(new Ativo(x, y, ativo.nome, ativo.preco_atual, ativo.quantidade, ativo.tipo, ativo.data_com, ativo.data_pagamento));
    posicoes_x.push(x);
    posicoes_y.push(y);
  }

  for(var i = 0; i < objetos.length; i++){
    cores.push(getRandomRgbColor()); //generate random colors for each object
  }
}

function draw() {    
  background('rgba(220, 255, 230, 1)');
  
  if (tela === "inicio"){
    textSize(50);
    fill(0, 0, 0);
    text(titulo, 600, 100);
    textSize(30);
    text("Clique em um ativo para ver mais informações", 530, 150);
    for(var i = 0; i < objetos.length; i++){
      console.log(i % cores.length);
      objetos[i].displayInfo();
      finish_angle = start_angle + (TWO_PI * ((objetos[i].price * objetos[i].amount) / valor_total));
      createArc(1000, 1000, 400, 400, start_angle, finish_angle, cores[i % cores.length]);
      start_angle = finish_angle; // update the start angle for the next arc
    }

    text(mouseX + ", " + mouseY, 1400, 50);
  }

  else {
    objetos[tela].displayScreen();
    if(mouseX > x_voltar && mouseX < x_voltar + largura_voltar && mouseY > y_voltar && mouseY < y_voltar + altura_voltar){
      if(mouseIsPressed){
        tela = "inicio"; //go back to the main screen
      }
    }
  }
}

function mouseClicked(){ //navigate through screens
  for(var i = 0; i < objetos.length; i++){
    if(mouseX > posicoes_x[i] - 20 && mouseX < posicoes_x[i] - 20 + objetos[i].informacoes.length * 40 &&
       mouseY > posicoes_y[i] - 40 && mouseY < posicoes_y[i] - 40 + objetos[i].informacoes.length * 40){
        tela = i; //go to screen i
    } 
  }
}

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256); // Random number for Red (0-255)
  const g = Math.floor(Math.random() * 256); // Random number for Green (0-255)
  const b = Math.floor(Math.random() * 256); // Random number for Blue (0-255)
  return `rgb(${r},${g},${b})`; // Returns the color string in RGB format
}

function createArc(x, y, w, h, start_angle, finish_angle, color){
  fill(color);
  arc(x, y, w, h, start_angle, finish_angle, PIE);
  fill('black');
}