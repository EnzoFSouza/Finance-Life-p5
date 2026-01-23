var width = 1500; //Constante 
var height = 700; //Constante

var wia = 1130; //width inicial ativos
var la = 350; //length ativos

var ativos; //responsavel por armazenar os dados do json com os ativos
var tela = "inicio"; //tela inicial
var tipo_ativo = "todos"; //tipo do ativo

//Para formar um grafico pizza, eh preciso calcular o quanto esta alocado em cada ativo e o patrimonio total
//Posteriormente, eh possivel separar por tipo de ativo
//Neste projeto, irei salvar todos os ativos em uma unica lista e salvar os index (posicoes)
//de cada tipo de ativo em listas separadas
var patrimonio_total = 0; //patrimonio total
var precos = []; //precos dos ativos
var quantidades = []; //quantidades dos ativos
var ppa = []; //precos por ativo (precos * quantidades)

var ativos_acao = []; //lista para salvar posicoes dos ativos do tipo acao
var ativos_fii = []; //lista para salvar posicoes dos ativos do tipo fii
var ativos_etf = []; //lista para salvar posicoes dos ativos do tipo etf
var ativos_bdr = []; //lista para salvar posicoes dos ativos do tipo bdr

//para fazer o grafico de acordo com um tipo de ativo especifico, eh preciso
//calcular o patrimonio de cada tipo de ativo
var patrimonio_acao = 0;
var patrimonio_fii = 0;
var patrimonio_etf = 0;
var patrimonio_bdr = 0;

function preload() {
    dados = loadJSON('ativos_novo.json');
}

function setup() { //setup 
    createCanvas(1500, 700);

    //lista com todos os ativos do json
    ativos = dados.ativos; 

    //preenchendo listas preco, quantidade, ppa e salvando index de cada tipo de ativo
    for(var i = 0; i < ativos.length; i++){
        precos.push(ativos[i].preco);
        quantidades.push(ativos[i].quantidade);
        ppa.push(ativos[i].preco * ativos[i].quantidade);

        if (ativos[i].tipo == "acao"){
            ativos_acao.push(i);
            patrimonio_acao += ativos[i].preco * ativos[i].quantidade;
        }

        else if (ativos[i].tipo == "fii"){
            ativos_fii.push(i);
            patrimonio_fii += ativos[i].preco * ativos[i].quantidade;
        }

        else if (ativos[i].tipo == "etf"){
            ativos_etf.push(i);
            patrimonio_etf += ativos[i].preco * ativos[i].quantidade;
        }

        else if (ativos[i].tipo == "bdr"){
            ativos_bdr.push(i);
            patrimonio_bdr += ativos[i].preco * ativos[i].quantidade;
        }

        patrimonio_total += ativos[i].preco * ativos[i].quantidade;
    }

    console.log("Patrimônio Total: R$ " + patrimonio_total);
    console.log(precos);
    console.log(quantidades);
    console.log(ppa);
    console.log(ativos_acao);
    console.log(ativos_fii);
    console.log(ativos_etf);
    console.log(ativos_bdr);

    console.log("Patrimônio Ações: R$ " + patrimonio_acao);
    console.log("Patrimônio FIIs: R$ " + patrimonio_fii);
    console.log("Patrimônio ETFs: R$ " + patrimonio_etf);
    console.log("Patrimônio BDRs: R$ " + patrimonio_bdr);
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
        text("Pratimônio Total: R$ " + patrimonio_total, 45, 65);
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
        criarBotao(1133, 570, 165, 110, 15, "Todos", 1150, 640, 'white', 50);

        //botao adicionar ativo
        criarBotao(1313, 570, 165, 110, 15, "+", 1370, 660, 'white', 102);
        fill('white');

        desenharGrafico(tipo_ativo);
    }
    else if (tela == "ativo1"){
        criarBotao(1400, 620, 70, 45, 15, "Voltar", 1410, 650, 'gray', 20);
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
        else if (mouseX >= 1133 && mouseX <= 1298 && mouseY >= 570 && mouseY <= 680){
            console.log("Selecionar Todos os Ativos");
            tipo_ativo = "todos";
        }

        //botao adiconar ativo
        else if (mouseX >= 1313 && mouseX <= 1478 && mouseY >= 570 && mouseY <= 680){
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

function criarBotao(x_bot, y_bot, w, h, b_r, texto, x_txt, y_txt, cor, txt_size){ //create buttons
    fill(cor);
    rect(x_bot, y_bot, w, h, b_r);
    fill(0, 0, 0);
    textSize(txt_size);
    text(texto, x_txt, y_txt);
}

function desenharGrafico(tipo){ //desenhar grafico de acordo com tipo de ativo
    var cores = ['red', 'orange', 'yellow', 'blue', 'black', 'green'];

    var start_arc = -HALF_PI; //iniciar do topo

    if(tipo == "todos"){
        for (var i = 0; i < ppa.length; i++){
            var angulo = TWO_PI * (ppa[i] / patrimonio_total);

            fill(cores[i%6]);
            arc(540, 325, 400, 400, start_arc, start_arc + angulo);

            start_arc += angulo;
        }
    }

    else if (tipo == "acoes"){
        for (var i = 0; i < ativos_acao.length; i++){
            var index = ativos_acao[i];
            var angulo = TWO_PI * (ppa[index] / patrimonio_acao);

            fill(cores[i%6]);
            arc(540, 325, 400, 400, start_arc, start_arc + angulo);

            start_arc += angulo;
        }
    }

    else if (tipo == "fiis"){
        for (var i = 0; i < ativos_fii.length; i++){
            var index = ativos_fii[i];
            var angulo = TWO_PI * (ppa[index] / patrimonio_fii);

            fill(cores[i%6]);
            arc(540, 325, 400, 400, start_arc, start_arc + angulo);

            start_arc += angulo;
        }
    }

    else if (tipo == "etfs"){
        for (var i = 0; i < ativos_etf.length; i++){
            var index = ativos_etf[i];
            var angulo = TWO_PI * (ppa[index] / patrimonio_etf);

            fill(cores[i%6]);
            arc(540, 325, 400, 400, start_arc, start_arc + angulo);

            start_arc += angulo;
        }
    }

    else if (tipo == "bdrs"){
        for (var i = 0; i < ativos_bdr.length; i++){
            var index = ativos_bdr[i];
            var angulo = TWO_PI * (ppa[index] / patrimonio_bdr);

            fill(cores[i%6]);
            arc(540, 325, 400, 400, start_arc, start_arc + angulo);

            start_arc += angulo;
        }
    }
}