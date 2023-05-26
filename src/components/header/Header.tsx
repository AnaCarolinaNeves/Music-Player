import './index.css';
import { MusicPlayerFill, Headphones } from 'react-bootstrap-icons';

function Header() {
  return (
    <nav id="menu-nav">
      <ul>
        <li>
          <a href="/"><span className="mr-2">Player</span>
            <span className="ml-auto">
              <Headphones size={32} />
            </span>
          </a>
        </li>

        <li>
          <a href="/MySongs">
            <MusicPlayerFill size={25} /> My songs
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
