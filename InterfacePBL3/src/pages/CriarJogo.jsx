import { useState } from 'react';
import './CriarJogo.css';

function CriarJogo() {
    const [nomeJogo, setNomeJogo] = useState('');
    const [possibilidade1, setPossibilidade1] = useState('');
    const [possibilidade2, setPossibilidade2] = useState('');
    const [erro, setErro] = useState('');

    // Função para simular a criação de um jogo
    const handleConfirmar = () => {
        if (!nomeJogo || !possibilidade1 || !possibilidade2) {
            setErro('Todos os campos são obrigatórios.');
            return;
        }

        // Simulando o envio ao backend
        const jogoId = Math.random().toString(36).substr(2, 9); // ID fictício
        const novoJogo = {
            id: jogoId,
            nomeJogo,
            possibilidade1,
            possibilidade2
        };

        // Simulação de resposta do backend
        console.log('Jogo criado:', novoJogo);

        // Reset dos campos do formulário
        setNomeJogo('');
        setPossibilidade1('');
        setPossibilidade2('');
        setErro('');

        // Aqui você pode adicionar lógica para mostrar o ID gerado ao usuário ou outra ação
        alert(`Jogo criado com ID: ${jogoId}`);
    };

    const handleCancelar = () => {
        setNomeJogo('');
        setPossibilidade1('');
        setPossibilidade2('');
        setErro('');
    };

        return (
        <div>
            <h1>Criar Jogo</h1>    

                <div className="caixa-criar-jogo">
                    <h2>Criar Jogo</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nome-jogo">Nome do Jogo:</label>
                            <input 
                                type="text" 
                                id="nome-jogo" 
                                value={nomeJogo} 
                                onChange={(e) => setNomeJogo(e.target.value)} 
                                placeholder="Digite o nome do jogo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="possibilidade1">Possibilidade 1:</label>
                            <input 
                                type="text" 
                                id="possibilidade1" 
                                value={possibilidade1} 
                                onChange={(e) => setPossibilidade1(e.target.value)} 
                                placeholder="Digite a possibilidade 1"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="possibilidade2">Possibilidade 2:</label>
                            <input 
                                type="text" 
                                id="possibilidade2" 
                                value={possibilidade2} 
                                onChange={(e) => setPossibilidade2(e.target.value)} 
                                placeholder="Digite a possibilidade 2"
                            />
                        </div>
                        {erro && <p style={{color: 'red'}}>{erro}</p>}
                        <div className="form-group botoes">
                            <button type="button" onClick={handleConfirmar}>Confirmar</button>
                            <button type="button" onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
    );
    
}

export default CriarJogo;