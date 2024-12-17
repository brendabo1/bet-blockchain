import { useState } from 'react';
import './MeusJogos.css';

// Dados fictícios para simulação
const dadosJogos = {
  jogosAnteriores: [
    { id: '1', nome: 'Jogo 1', resultado: 'Possibilidade 1' },
    { id: '2', nome: 'Jogo 2', resultado: 'Possibilidade 2' },
  ],
  jogosParticipando: [
    { id: '3', nome: 'Jogo em Andamento', possibilidade1: 'Opção A', possibilidade2: 'Opção B' },
  ],
  jogosCriados: [
    { id: '4', nome: 'Meu Jogo', possibilidade1: 'Cenário X', possibilidade2: 'Cenário Y', encerrado: false },
  ],
};

function MeusJogos() {
  const [jogos, setJogos] = useState(dadosJogos);

  // Função para encerrar um jogo (simulação)
  const handleEncerrarJogo = (jogoId, resultado) => {
    setJogos(prevJogos => {
      const jogoAtualizado = prevJogos.jogosCriados.find(jogo => jogo.id === jogoId);
      if (jogoAtualizado) {
        jogoAtualizado.encerrado = true;
        jogoAtualizado.resultado = resultado;
        
        // Simulação de notificação para participantes
        console.log(`Jogo ${jogoAtualizado.nome} encerrado com resultado: ${resultado}. Notificação enviada aos participantes.`);

        return {
          ...prevJogos,
          jogosCriados: prevJogos.jogosCriados.map(jogo => 
            jogo.id === jogoId ? { ...jogo, ...jogoAtualizado } : jogo
          ),
          jogosAnteriores: [...prevJogos.jogosAnteriores, jogoAtualizado]
        };
      }
      return prevJogos;
    });
  };

  return (
    <div className="meus-jogos">
      <h1>Meus Jogos</h1>
      
      <section>
        <h2>Jogos Anteriores</h2>
        <ul>
          {jogos.jogosAnteriores.map(jogo => (
            <li key={jogo.id}>{jogo.nome} - Resultado: {jogo.resultado}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Jogos em Participação</h2>
        {jogos.jogosParticipando.length > 0 ? (
          <ul>
            {jogos.jogosParticipando.map(jogo => (
              <li key={jogo.id}>{jogo.nome} - {jogo.possibilidade1} vs {jogo.possibilidade2}</li>
            ))}
          </ul>
        ) : (
          <p>Não há jogos em que você está participando no momento.</p>
        )}
      </section>

      <section>
        <h2>Jogos Criados</h2>
        {jogos.jogosCriados.length > 0 ? (
          <ul>
            {jogos.jogosCriados.map(jogo => (
              <li key={jogo.id}>
                {jogo.nome} - {jogo.encerrado ? `Encerrado. Resultado: ${jogo.resultado}` : `${jogo.possibilidade1} vs ${jogo.possibilidade2}`}
                {!jogo.encerrado && (
                  <>
                    <button onClick={() => handleEncerrarJogo(jogo.id, jogo.possibilidade1)}>{jogo.possibilidade1}</button>
                    <button onClick={() => handleEncerrarJogo(jogo.id, jogo.possibilidade2)}>{jogo.possibilidade2}</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Você não criou nenhum jogo ainda.</p>
        )}
      </section>
    </div>
  );
}

export default MeusJogos;