let listaNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let botaoChute = document.querySelectorAll('.container__botao')[0];


// funçao criada para evitar o exesso códigos semelhantes
function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}


// função para exibir as mensagens iniciais
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Número secreto');
    exibirTextoNaTela('.texto__paragrafo', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial() // chamando a função exibir mensagem inicial


// adicionando evento de click no botão de chute
botaoChute.addEventListener('click',  ()=> {
    verificarChute();
})


// função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroLimite = 10;
    let numeroAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    
    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}


// função para limpar campo
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}


// função para verificar chute
let tentativas = 1;
function verificarChute() {

    let chute = document.querySelector('input').value; // obtendo o valor do elemento input do chute
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Parabéns, você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}`;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('.texto__paragrafo', mensagemTentativas);
        // adicionando e removendo o atributo "disabled" dos botões"
        document.querySelectorAll('.container__botao')[0].setAttribute('disabled',true);
        document.querySelectorAll('.container__botao')[1].removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}


// função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial()
    limparCampo();
    tentativas = 1;
    // definir o atributo 'disabled' desse elemento como true
    document.querySelectorAll('.container__botao')[1].setAttribute('disabled',true);
    document.querySelectorAll('.container__botao')[0].removeAttribute('disabled');
}


/* ANOTAÇÕES IMPORTANTES

Gerar número aleatório:
let numAleatorio = parseInt(Math.random() * 10 + 1); //entre 1 e 10
Math.random(): gera um número decimal no intervalo [0, 1] (0 inclusivo e 1 exclusivo)
Math.random() * 10: para obter um número no intervalo [0, 10]
Math.random() * 10 + 1: somando +1 para ajustar o intervalo para [1, 11]  (1 inclusivo e 11 exclusivo)
parseInt() : para obter somente a parte inteira

Manipulando atributos de elementos HTML:
.removeAttribute('disabled') : remover atributos de elementos HTML
.setAttribute('disabled',true) : definir ou modificar atributos de elementos HTML
.setAttribute('nome-do-atributo', 'valor-do-atributo')

Operador ternário:
condição ? seVerdadeiro : seFalso
let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
*/