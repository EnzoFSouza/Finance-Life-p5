var width = 1500;
var height = 700;
var wia = 1130; //width inicial ativos
var la = 350; //length ativos

var ativos;
var ativos_acao = []; //lista com ativos do tipo acao
var ativos_fii = []; //lista com ativos do tipo fii
var ativos_etf = []; //lista com ativos do tipo etf
var ativos_bdr = []; //lista com ativos do tipo bdr

var preco_acao = 0; //precos dos ativos do tipo acao
var preco_fii = 0; //precos dos ativos do tipo fii
var preco_etf = 0; //precos dos ativos do tipo etf
var preco_bdr = 0; //precos dos ativos do tipo bdr

var quantidade_acao = []; //lista com quantidades dos ativos do tipo acao
var quantidade_fii = []; //lista com quantidades dos ativos do tipo fii
var quantidade_etf = []; //lista com quantidades dos ativos do tipo etf
var quantidade_bdr = []; //lista com quantidades dos ativos do tipo bdr

var ppa_acao = []; //precos por ativo (precos * quantidades) do tipo acao
var ppa_fii = []; //precos por ativo (precos * quantidades) do tipo fii
var ppa_etf = []; //precos por ativo (precos * quantidades) do tipo etf
var ppa_bdr = []; //precos por ativo (precos * quantidades) do tipo bdr

var start_arc = 0;


var preco_total = 0;

var precos = []; //precos dos ativos
var quantidades = []; //quantidades dos ativos
var ppa = []; //precos por ativo (precos * quantidades)

var pratimonio_total = 510; //patrimonio total

var tela = "inicio"; //tela inicial
var tipo_ativo = "todos"; //tipo do ativo

function preload() {
    dados = loadJSON('ativos_novo.json');
}

function setup() { //setup 
    createCanvas(1500, 700);
    ativos = dados.ativos;

    //preenchendo listas preco, quantidade e ppa de cada tipo de ativo
    for(var i = 0; i < ativos.length; i++){
        if (ativos[i].tipo == "acao"){
            ativos_acao.push(ativos[i]);
            preco_acao += ativos[i].preco;
            quantidade_acao.push(ativos[i].quantidade);
            ppa_acao.push(ativos[i].preco * ativos[i].quantidade);
        }

        else if (ativos[i].tipo == "fii"){
            ativos_fii.push(ativos[i]);
            preco_fii += ativos[i].preco;
            quantidade_fii.push(ativos[i].quantidade);
            ppa_fii.push(ativos[i].preco * ativos[i].quantidade);
        }

        else if (ativos[i].tipo == "etf"){
            ativos_etf.push(ativos[i]);
            preco_etf += ativos[i].preco;
            quantidade_etf.push(ativos[i].quantidade);
            ppa_etf.push(ativos[i].preco * ativos[i].quantidade);
        }

        else if (ativos[i].tipo == "bdr"){
            ativos_bdr.push(ativos[i]);
            preco_bdr += ativos[i].preco;
            quantidade_bdr.push(ativos[i].quantidade);
            ppa_bdr.push(ativos[i].preco * ativos[i].quantidade);
        }

        preco_total += preco_acao + preco_fii + preco_etf + preco_bdr;
    }

    console.log("Preço Ações: " + preco_acao);
    console.log("Preço FIIs: " + preco_fii);
    console.log("Preço ETFs: " + preco_etf);
    console.log("Preço BDRs: " + preco_bdr);
    console.log("Preço Total: " + preco_total);

    /*
    for(var i = 0; i < ativos.length; i++){
        console.log(ativos[i]);
        console.log(ativos[i].nome);
        console.log(ativos[i].preco);
        console.log(ativos[i].tipo);
        console.log(ativos[i].quantidade);
    }
    */

    //calculando preco total de cada tipo de ativo
    /*for (var j = 0; j < ativos.length; j++){
        if (ativos[j].tipo == "acao"){
            preco_acao += ativos[j].preco * ativos[j].quantidade;
            ativos_acao.push(ativos[j]);
        }
        else if (ativos[j].tipo == "fii"){
            preco_fii += ativos[j].preco * ativos[j].quantidade;
            ativos_fii.push(ativos[j]);
        }
        else if (ativos[j].tipo == "etf"){
            preco_etf += ativos[j].preco * ativos[j].quantidade;
            ativos_etf.push(ativos[j]);
        }
        else if (ativos[j].tipo == "bdr"){
            preco_bdr += ativos[j].preco * ativos[j].quantidade;
            ativos_bdr.push(ativos[j]);
        }

        precos.push(ativos[j].preco);
        quantidades.push(ativos[j].quantidade);
        ppa.push(ativos[j].preco * ativos[j].quantidade);
    }
    //supondo que existem somente 4 tipos
    preco_total = preco_acao + preco_fii + preco_etf + preco_bdr;
    */
    /*
    console.log("Preço Ações: " + preco_acao);
    console.log("Preço FIIs: " + preco_fii);
    console.log("Preço ETFs: " + preco_etf);
    console.log("Preço BDRs: " + preco_bdr);
    console.log("Preço Total: " + preco_total);
    console.log(ativos_acao);
    console.log(ativos_fii);
    console.log(ativos_etf);
    console.log(ativos_bdr);
    */
}

function draw() { //draw loop 
    background('rgba(213, 213, 213, 1)');
    
    fill('white');
    //retangulo de fundo
    rect(10, 10, width - 20, height - 20, 15);

    if (tela == "inicio"){
        //retangulo com grafico
        rect(20, 20, 1100, height - 163, 15);

        fill('black');
        textSize(32);
        text("Pratimônio Total: R$ " + pratimonio_total, 45, 65);
        fill('white');

        //retangulos com tipos de ativos
        rect(20, 570, 260, 110, 15);
        rect(300, 570, 260, 110, 15);
        rect(580, 570, 260, 110, 15);
        rect(860, 570, 260, 110, 15);
        
        //Textos dos tipos de ativos
        fill('black');
        textSize(24);
        text("Ações", 110, 630);
        text("Fundos Imobiliários", 325, 630);
        text("ETFs", 675, 630);
        text("BDRs", 955, 630);
        fill('white');

        //retangulos com ativos
        rect(1130, 20, 350, 81, 15);
        rect(1130, 115, 350, 81, 15);
        rect(1130, 205, 350, 81, 15);
        rect(1130, 295, 350, 81, 15);
        rect(1130, 385, 350, 81, 15);
        rect(1130, 475, 350, 81, 15);

        //escrever ativos
        fill('black');
        escreverAtivo(1150, 50, ativos[0].nome, ativos[0].preco, ativos[0].tipo, ativos[0].quantidade);
        escreverAtivo(1150, 145, ativos[1].nome, ativos[1].preco, ativos[1].tipo, ativos[1].quantidade);
        escreverAtivo(1150, 235, ativos[2].nome, ativos[2].preco, ativos[2].tipo, ativos[2].quantidade);
        escreverAtivo(1150, 325, ativos[3].nome, ativos[3].preco, ativos[3].tipo, ativos[3].quantidade);
        escreverAtivo(1150, 415, ativos[4].nome, ativos[4].preco, ativos[4].tipo, ativos[4].quantidade);
        escreverAtivo(1150, 505, ativos[5].nome, ativos[5].preco, ativos[5].tipo, ativos[5].quantidade);
        fill('white');
        
        //botao selecionar todos os tipos de ativos
        rect(1210, 575, 75, 75, 5);
        //botao adicionar ativo
        rect(1350, 575, 75, 75, 5);

        fill('black');
        textSize(20);
        text("Total", 1240, 630);
        textSize(32);
        text("+", 1400, 630);
        fill('white');

        desenharGrafico(tipo_ativo);
    }
    else if (tela == "ativo1"){
        criarBotao(1400, 620, 70, 45, "Voltar", 1410, 650, 'gray');
    }

}

function mouseClicked(){ //navigate through screens
    //if (mouseX <= 1380 && mouseX >= 1230 && mouseY >= 550 && mouseY <= 700){
    //    tela = "add";
    //}
    
    //se for tela de inicio
    if (tela == "inicio"){
        //botao ativos
        if (mouseX <= wia + la && mouseX >= wia && mouseY >= 20 && mouseY <= 101){
            console.log("Ativo 1");
            tela = "ativo1";
        }

        else if (mouseX <= wia + la && mouseX >= wia && mouseY >= 115 && mouseY <= 196){
            console.log("Ativo 2");
        }

        else if (mouseX <= wia + la && mouseX >= wia && mouseY >= 205 && mouseY <= 286){
            console.log("Ativo 3");
        }

        else if (mouseX <= wia + la && mouseX >= wia && mouseY >= 295 && mouseY <= 376){
            console.log("Ativo 4");
        }

        else if (mouseX <= wia + la && mouseX >= wia && mouseY >= 385 && mouseY <= 466){
            console.log("Ativo 5");
        }

        else if (mouseX <= wia + la && mouseX >= wia && mouseY >= 475 && mouseY <= 556){
            console.log("Ativo 6");
        }

        //botoes com tipos de ativos
        else if (mouseX >= 20 && mouseX <= 280 && mouseY >= 570 && mouseY <= 680){
            console.log("Selecionar Ações");
            tipo_ativo = "acoes";
        }
        
        else if (mouseX >= 300 && mouseX <= 560 && mouseY >= 570 && mouseY <= 680){
            console.log("Selecionar Fundos Imobiliários");
            tipo_ativo = "fiis";
        }
        
        else if (mouseX >= 580 && mouseX <= 840 && mouseY >= 570 && mouseY <= 680){
            console.log("Selecionar ETFs");
            tipo_ativo = "etfs";
        }
        
        else if (mouseX >= 860 && mouseX <= 1120 && mouseY >= 570 && mouseY <= 680){
            console.log("Selecionar BDRs");
            tipo_ativo = "bdrs";
        }

        //botao todos os tipos de ativos
        else if (mouseX >= 1210 && mouseX <= 1280 && mouseY >= 570 && mouseY <= 640){
            console.log("Selecionar Todos os Ativos");
            tipo_ativo = "todos";
        }

        //botao adiconar ativo
        else if (mouseX >= 1350 && mouseX <= 1420 && mouseY >= 570 && mouseY <= 640){
            console.log("Adicionar Ativo");
        }
    }
    
    else if (tela == "ativo1"){
        //botao voltar
        if (mouseX >= 1400 && mouseX <= 1470 && mouseY >= 620 && mouseY <= 665){
            tela = "inicio";
        }
    }
}

function escreverAtivo(x_txt, y_txt, nome, preco, tipo, qtd){ //escrever ativos
    textSize(20);
    text(nome, x_txt, y_txt);
    text(preco, x_txt + 200, y_txt);
    text(tipo, x_txt, y_txt + 25);
    text(qtd, x_txt + 200, y_txt + 25);
}

function criarBotao(x_bot, y_bot, w, h, texto, x_txt, y_txt, cor){ //create buttons
    fill(cor);
    rect(x_bot, y_bot, w, h, 5);
    fill(0, 0, 0);
    text(texto, x_txt, y_txt);
}

function desenharGrafico(tipo){//lista_ativos){ //desenhar grafico de acordo com tipo de ativo
    /*console.log(ativos_acao);
    console.log(ativos_fii);
    console.log(ativos_etf);
    console.log(ativos_bdr);

    console.log(ppa_acao);
    console.log(ppa_fii);
    console.log(ppa_etf);
    console.log(ppa_bdr);

    console.log(preco_acao);
    console.log(preco_fii);
    console.log(preco_etf);
    console.log(preco_bdr);
    */
    var lista_ativos = [];
    var ppa = [];
    var preco_total_grafico = 0;

    if (tipo == "acoes"){
        lista_ativos = ativos_acao;
        ppa = ppa_acao;
        preco_total_grafico = preco_acao;
    }
    else if (tipo == "fiis"){
        lista_ativos = ativos_fii;
        ppa = ppa_fii;
        preco_total_grafico = preco_fii;
    }
    else if (tipo == "etfs"){
        lista_ativos = ativos_etf;
        ppa = ppa_etf;
        preco_total_grafico = preco_etf;
    }
    else if (tipo == "bdrs"){
        lista_ativos = ativos_bdr;
        ppa = ppa_bdr;
        preco_total_grafico = preco_bdr;
    }

    else{
        lista_ativos = [...ativos_acao, ...ativos_fii, ...ativos_etf, ...ativos_bdr];
        ppa = [...ppa_acao, ...ppa_fii, ...ppa_etf, ...ppa_bdr];
        console.log("Preço Ações: " + preco_acao);
        console.log("Preço FIIs: " + preco_fii);
        console.log("Preço ETFs: " + preco_etf);
        console.log("Preço BDRs: " + preco_bdr);
        console.log("Preço Total: " + preco_total);
        preco_total_grafico += (preco_acao )+ preco_fii + preco_etf + preco_bdr;
    }
    
    console.log(lista_ativos);
    console.log(ppa);
    console.log(preco_total_grafico);

    var cores = ['red', 'orange', 'yellow', 'blue', 'black', 'green'];
    for (var i = 0; i < lista_ativos.length; i++){
        fill(cores[i%6]);
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[i] / preco_total_grafico));
        if (i != lista_ativos.length - 1){    
            start_arc += TWO_PI * (ppa[i] / preco_total_grafico);
        }
        else{
            start_arc = 0;
        }
    }

    /*
    if (tipo == "todos"){
        fill('red');
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[0] / preco_total));

        fill('orange');
        start_arc += TWO_PI * (ppa[0] / preco_total);
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[1] / preco_total));

        fill('yellow');
        start_arc += TWO_PI * (ppa[1] / preco_total);
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[2] / preco_total));

        fill('blue');
        start_arc += TWO_PI * (ppa[2] / preco_total);
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[3] / preco_total));
            
        fill('black');
        start_arc += TWO_PI * (ppa[3] / preco_total);
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[4] / preco_total));

        fill('green');
        start_arc += TWO_PI * (ppa[4] / preco_total);
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[5] / preco_total));
        start_arc = 0;
    }
    else if (tipo == "acoes"){
        fill('red');
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[0] / preco_acao));
        start_arc += TWO_PI * (ppa[0] / preco_acao);

        fill('green');
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[4] / preco_acao));
        start_arc = 0;
    }

    else if (tipo == "fiis"){
        fill('orange');
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[1] / preco_fii));
        start_arc += TWO_PI * (ppa[1] / preco_fii);
        fill('purple');
        arc(540, 325, 400, 400, start_arc, start_arc + TWO_PI * (ppa[5] / 200));
        start_arc = 0;
    }

    else if (tipo == "etfs"){
        fill('blue');
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[2] / preco_etf));
        //start_arc += TWO_PI * (ppa[2] / 120);
        start_arc = 0;
    }

    else if (tipo == "bdrs"){
        fill('black');
        arc(540, 325, 400, 400, start_arc, TWO_PI * (ppa[3] / preco_bdr));
        //start_arc += TWO_PI * (ppa[3] / 60);
        start_arc = 0;
    }
        */
}