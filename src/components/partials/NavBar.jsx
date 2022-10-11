import { Link } from 'react-router-dom'

function NavBar() {
    return (
      <nav>
      <ul className='nav-menu'>
          <li>
              <Link className='links' to='/'>Home</Link>
          </li>
          <li>
              <Link className='links' to='/villains'>All Villains</Link>
          </li>
          <li>
              <Link className='links' to='/villains/new'>Add/Create new Villain</Link>
          </li>
      </ul>
  </nav>
    );
  }
  
  export default NavBar;