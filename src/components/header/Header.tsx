import './header.css';
import { MusicPlayerFill, Headphones } from 'react-bootstrap-icons';

function Header() {
  return (
    <nav id="menu-nav">
      <ul>
        <li>
          <a href="/">
            <span className="mr-2">Player</span>
            <MusicPlayerFill size={28} className="icon" />
          </a>
        </li>
        <li>
          <a href="/addSong">
            <span className="ml-2">Add Song</span>
            <Headphones size={32} className="icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
