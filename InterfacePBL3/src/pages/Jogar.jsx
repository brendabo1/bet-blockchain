import './Jogar.css'

function Jogar(){
    return(
        <div>
            <h1>Jogar</h1>
            <form className="entrar">
                <input
                    className='entrarInput'
                    type="text"
                    placeholder="Insira o ID do jogo"
                />
                <button 
                    className='botaoEntrar'
                    type="submit">Entrar</button>
            </form>
            <form className="buscar">
                <input
                    className='buscarInput'
                    type="text"
                    placeholder="Insira o nome do jogo"
                />
                <button 
                    className='botaoBuscar'
                    type="submit">Buscar</button>
            </form>
        </div>
    )
}

export default Jogar