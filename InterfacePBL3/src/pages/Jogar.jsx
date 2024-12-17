import { useState } from 'react';
import './Jogar.css';

// Dados fictícios de jogos
const jogos = [
    { id: 'zrgfoqan38h10nf02i', nome: 'Cara ou Coroa' },
    { id: 'in496a41af215rgjem', nome: 'Bahia x Vitoria' },
    { id: '856e5e45er65r8t5r4', nome: 'Vai ter Greve?' },
    { id: '4e8e4e6e44ehg88t5r', nome: 'Passou ou Final?'},
    { id: '781ew9f5e619a6212a', nome: 'Barril ou DeBoa' },
    
    // Adicione mais jogos conforme necessário
];

function Jogar() {
    // Estado para armazenar os jogos (pode ser dinâmico com uma API, mas aqui é estático)
    const [listaJogos] = useState(jogos);

    // Função para lidar com o clique em um jogo
    const handleJogoClick = (id) => {
        console.log(`Jogo clicado com ID: ${id}`);
        // Aqui você pode fazer uma chamada API para o backend com a ID
        // Exemplo:
        // fetch(`/api/jogos/${id}`)
        //   .then(response => response.json())
        //   .then(data => console.log(data));
    };

    return (
        <div>
            <h1>Jogar</h1>
            <aside className='fundoLista'>
                <h1 className='tituloLista'>Jogos Disponíveis</h1>
                <ul>
                    {listaJogos.map(jogo => (
                        <li 
                            className='jogosDisponiveis' 
                            key={jogo.id}
                            onClick={() => handleJogoClick(jogo.id)}
                        >
                            {jogo.nome}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}

export default Jogar;