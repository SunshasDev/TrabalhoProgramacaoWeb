document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('quiz');
    const btnEnviar = document.getElementById('btn-enviar');
    const resultadoDiv = document.getElementById('resultado');

    
    btnEnviar.addEventListener('click', function() {
        
        const contagemPersonagens = {
            Kafka: 0,
            Mina: 0,
            Hoshina: 0,
            Kikoru: 0
        };

        
        const respostasSelecionadas = form.querySelectorAll('input[type="radio"]:checked');

        
        if (respostasSelecionadas.length !== 10) {
          
            alert('Por favor, responda a todas as 10 perguntas antes de enviar!');
            return; 
        }

        respostasSelecionadas.forEach(input => {
            
            const personagemVotado = input.getAttribute('data-personagem');
            
           
            if (contagemPersonagens.hasOwnProperty(personagemVotado)) {
                contagemPersonagens[personagemVotado]++;
            }
        });

       
        let personagemVencedor = '';
        let maiorContagem = -1;

        for (const personagem in contagemPersonagens) {
            const contagemAtual = contagemPersonagens[personagem];
            
            if (contagemAtual > maiorContagem) {
                maiorContagem = contagemAtual;
                personagemVencedor = personagem;
            } 
         
        }

        
        exibirResultado(personagemVencedor);
    });

    
    
        function exibirResultado(personagem) {
        let textoResultado = '';

        
        switch(personagem) {
            case 'Kafka':
                textoResultado = ` Você é o Kafka Hibino!  Você é incrivelmente determinado, persistente e fará de tudo para proteger os outros, mesmo que tenha que superar obstáculos gigantescos. Sua capacidade de se adaptar e nunca desistir é sua maior força!`;
                break;
            case 'Mina':
                textoResultado = `Você é a Mina Ashiro! Sua calma, liderança impecável e precisão tática fazem de você uma comandante nata. Você é uma muralha de defesa para seus companheiros e não tolera falhas na missão.`;
                break;
            case 'Hoshina':
                textoResultado = ` Você é o Soshiro Hoshina!  Você é o mestre da técnica, da velocidade e do ataque preciso. Você prefere a agilidade e a habilidade com lâminas em vez da força bruta, sendo um estrategista brilhante na linha de frente.`;
                break;
            case 'Kikoru':
                textoResultado = ` Você é a Kikoru Shinomiya!  Forte, talentosa e com um imenso potencial, você usa a força bruta e armas pesadas para varrer o campo de batalha. Seu orgulho e poder são inegáveis.`;
                break
            default:
                textoResultado = 'Não foi possível determinar o personagem. Tente responder novamente!';
        }

        resultadoDiv.innerHTML = `<h2>Seu Personagem é: ${personagem}!</h2><p>${textoResultado}</p>`;
        resultadoDiv.style.display = 'block'; 
        
       
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    }
});