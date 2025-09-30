const personagens = {
  batman:  { nome: 'Batman',       desc: 'Estratégico, focado e incansável na busca por justiça.', img: 'assets/batman.jpg' },
  joker:   { nome: 'Coringa',      desc: 'Caótico, imprevisível e carismático — o caos é sua arte.', img: 'assets/joker.jpg' },
  catwoman:{ nome: 'Mulher-Gato',  desc: 'Astuta e independente, caminha entre sombras e luzes.', img: 'assets/catwoman.jpg' },
  robin:   { nome: 'Robin',        desc: 'Leal e ágil, acredita na parceria e no trabalho em equipe.', img: 'assets/robin.jpg' },
  harley:  { nome: 'Arlequina',    desc: 'Livre, criativa e intensa — encontra riso até no caos.', img: 'assets/harley.jpg' },
};

const perguntas = [
  { titulo: 'Como você resolve problemas difíceis?', opcoes: [    // Contador de pontos dos personagens
    { texto: 'Planejo tudo e executo', pontos: {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Improviso.', pontos:   {batman:0, joker:3, catwoman:1, robin:0, harley:2} },
    { texto: 'Dou meu jeito.', pontos:     {batman:1, joker:0, catwoman:3, robin:1, harley:2} },
  ]},
  { titulo: 'Cenário preferido em Gotham?', opcoes: [
    { texto: 'Arranha-céus.', pontos:         {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Parque de diversões.', pontos:{batman:0, joker:3, catwoman:1, robin:0, harley:2} },
    { texto: 'Becos.', pontos:  {batman:0, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'Qual desses termos combinam mais com você?', opcoes: [
    { texto: 'Determinação silenciosa.', pontos:         {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Humor ácido.', pontos:                    {batman:0, joker:3, catwoman:0, robin:0, harley:2} },
    { texto: 'Independência.', pontos:        {batman:1, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'Qual destas opções você tem mais probabilidade de fazer?:', opcoes: [
    { texto: 'Culpe-se por tudo.', pontos:            {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Fale pelos outros quando eles estiverem sendo maltratados.', pontos:            {batman:0, joker:3, catwoman:0, robin:0, harley:2} },
    { texto: 'Enfrente os ricos e poderosos e ajude os pobres.', pontos:             {batman:1, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'No time você é...', opcoes: [
    { texto: 'Quem cria o plano.', pontos:               {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Quem vira o jogo.', pontos:                {batman:0, joker:3, catwoman:1, robin:0, harley:2} },
    { texto: 'Quem entra e saí sem ser visto.', pontos:    {batman:1, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'Noite ideal em Gotham:', opcoes: [
    { texto: 'Vigiar a noite', pontos:               {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Implantar o caos.', pontos:         {batman:0, joker:3, catwoman:0, robin:0, harley:2} },
    { texto: 'Roubo limpo.', pontos:          {batman:0, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'Valor que mais pesa:', opcoes: [
    { texto: 'Justiça.', pontos:                         {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Liberdade.', pontos:                       {batman:0, joker:1, catwoman:2, robin:0, harley:3} },
    { texto: 'Lealdade.', pontos:                        {batman:2, joker:0, catwoman:1, robin:3, harley:0} },
  ]},
  { titulo: 'Como reage à injustiça?', opcoes: [
    { texto: 'Investigo e exponho.', pontos:             {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Caos.', pontos:                     {batman:0, joker:3, catwoman:1, robin:0, harley:2} },
    { texto: 'Do meu jeito.', pontos:                    {batman:1, joker:0, catwoman:3, robin:1, harley:2} },
  ]},
  { titulo: 'Disfarce preferido:', opcoes: [
    { texto: 'Tático e intimidador.', pontos:            {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Colorido e teatral.', pontos:              {batman:0, joker:3, catwoman:0, robin:0, harley:2} },
    { texto: 'Elegante.', pontos:               {batman:0, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
  { titulo: 'Aliado ideal:', opcoes: [
    { texto: 'Comissário da Polícia.', pontos:               {batman:3, joker:0, catwoman:1, robin:2, harley:0} },
    { texto: 'Capanga leal.', pontos:                    {batman:0, joker:3, catwoman:0, robin:0, harley:2} },
    { texto: 'Não tenho aliados.', pontos:               {batman:0, joker:0, catwoman:3, robin:1, harley:1} },
  ]},
];

class Quiz {
  constructor() {
    this.indice = 0;
    this.pontos = {batman:0, joker:0, catwoman:0, robin:0, harley:0};
    this.selecoes = new Array(10).fill(null);
    this.init();
  }

  init() {
    this.telaInicial = document.getElementById('tela-inicial');
    this.telaPerguntas = document.getElementById('tela-perguntas');
    this.telaResultado = document.getElementById('tela-resultado');
    this.comecarBtn = document.getElementById('comecar');
    this.proximaBtn = document.getElementById('proxima');
    this.reiniciarBtn = document.getElementById('reiniciar');
    this.titulo = document.getElementById('titulo-pergunta');
    this.opcoesDiv = document.getElementById('opcoes');
    this.progresso = document.getElementById('progresso');
    this.resultado = document.getElementById('resultado');
    this.voltarMenuBtn = document.getElementById('voltarMenu');

    this.voltarMenuBtn.onclick = () => this.voltarAoMenuPrincipal();
    this.comecarBtn.onclick = () => this.start();
    this.proximaBtn.onclick = () => this.next();
    this.reiniciarBtn.onclick = () => this.restart();
  }

  start() {
    this.telaInicial.classList.remove('active');
    this.telaPerguntas.classList.add('active');
    this.indice = 0;
    this.pontos = {batman:0, joker:0, catwoman:0, robin:0, harley:0};
    this.selecoes.fill(null);
    this.showPergunta();
  }

  showPergunta() {
    if (this.indice >= perguntas.length) {
      this.showResultado();
      return;
    }
    const p = perguntas[this.indice];
    this.titulo.textContent = p.titulo;
    this.progresso.textContent = `Pergunta ${this.indice + 1} de ${perguntas.length}`;
    this.opcoesDiv.innerHTML = '';
    p.opcoes.forEach((op, i) => {
      const div = document.createElement('div');
      div.className = 'opcao';
      div.textContent = op.texto;
      div.onclick = () => this.selecionar(i, div);
      this.opcoesDiv.appendChild(div);
    });
    this.proximaBtn.disabled = true;
  }

  selecionar(indice, elemento) {
    document.querySelectorAll('.opcao').forEach(el => el.classList.remove('selecionada'));
    elemento.classList.add('selecionada');
    this.selecoes[this.indice] = indice;
    this.proximaBtn.disabled = false;
  }

  next() {
    if (this.selecoes[this.indice] !== null) {
      const op = perguntas[this.indice].opcoes[this.selecoes[this.indice]];
      Object.keys(this.pontos).forEach(pers => {
        this.pontos[pers] += op.pontos[pers];
      });
    }
    this.indice++;
    this.showPergunta();
  }

  showResultado() {
    this.telaPerguntas.classList.remove('active');
    this.telaResultado.classList.add('active');

    let max = -1;
    let vencedor = 'batman';
    Object.keys(this.pontos).forEach(k => {
      if (this.pontos[k] > max) { max = this.pontos[k]; vencedor = k; }
    });

    const pers = personagens[vencedor];
    const listaPontuacao = Object.entries(this.pontos)
      .sort((a,b)=>b[1]-a[1])
      .map(([k,v]) => `<div class="score">${personagens[k].nome}: <strong>${v} pts</strong></div>`)
      .join('');

    this.resultado.innerHTML = `
      <div class="card">
        <img src="${pers.img}" alt="${pers.nome}">
        <div>
          <h3>${pers.nome}</h3>
          <div class="score">Pontuação vencedora: <strong>${max} pts</strong></div>
          <p>${pers.desc}</p>
        </div>
      </div>
      <h4>Demais pontuações</h4>
      ${listaPontuacao}
    `;
  }
  
  voltarAoMenuPrincipal() {
        console.log('Voltando ao menu principal...');
        window.location.href = '../../index.html'; 
  }

  restart() {
    console.log('Reiniciando o quiz...');
    this.indice = 0;
    this.pontos = {batman:0, joker:0, catwoman:0, robin:0, harley:0};
    this.selecoes.fill(null);
    this.telaResultado.classList.remove('active');
    this.telaInicial.classList.add('active');
  }

  
}

new Quiz();
