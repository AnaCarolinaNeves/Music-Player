import './index.css';
import { MusicPlayerFill, Headphones } from 'react-bootstrap-icons';

function Header() {
  return (
    <nav id="menu-nav">
      <ul>
        <li>
          <a href="/"><span className="mr-2">Player</span>
            <span className="ml-auto">
              <MusicPlayerFill size={32} />
            </span>
          </a>
        </li>

        <li>
          <a href="/addSong">
            <Headphones size={25} /> Add Song
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
