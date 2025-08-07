class Ativo{
  constructor(x, y, name, price, amount, data_com, data_pagamento){
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
}

//creating objects
//                      x,  y,    name,    p,   a,  data_com, data_pagamento
var acao1 = new Ativo(100, 50, "ABC11", 9.45, 7, "29 - 31", "13 - 18");

var acao2 = new Ativo(100, 345, "DEF11", 10, 10, "29 - 31", "6 - 11");

var acao3 = new Ativo(100, 640, "GHI11", 133, 1, "29 - 31", "6 - 11");

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function preload() {
    dados = loadJSON('ativos.json');
}

function setup() {
  createCanvas(1300, 800);
  let titulo = dados.titulo;
  let ativos = dados.ativos;
  console.log(titulo);
  console.log(ativos);
}

function draw() {    
  background('rgba(220, 255, 230, 1)');

  acao1.displayInfo();
  
  acao2.displayInfo();
  
  acao3.displayInfo();
  
}

function mouseClicked(){ //navigate through screens
  
}