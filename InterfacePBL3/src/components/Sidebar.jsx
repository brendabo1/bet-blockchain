import './Sidebar.css'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jogar">Jogar</Link></li>
        <li><Link to="/criarJogo">Criar Jogo</Link></li>
        <li><Link to="/meusJogos">Meus Jogos</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;