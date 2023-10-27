import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
  const { logoutUserAction, token, role } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <header>
        <a href='https://cyberforce.energy.gov/cyberforce-competition/scenario/'>
          <img
            className='logo'
            src={require('../assets/img/DER8-9.png')}
            alt='logo'
          />
        </a>

        <nav>
          <ul className='nav__links'>
            <li>
              <Link to='/about-us'>About Us</Link>
            </li>
            <li>
              <Link to='/der-data'>DER Data</Link>
            </li>
            <li>
              {role === 'admin' ? (
                <Link to='/admin'>Portal</Link>
              ) : (
                <Link to='/contact-us'>Contact Us</Link>
              )}
            </li>
          </ul>
        </nav>

        {!token && (
          <Link className='cta' to='/log-in'>
            <button>Log In</button>
          </Link>
        )}
        {token && (
          <button onClick={logoutUserAction} className='cta'>
            Logout
          </button>
        )}
      </header>
    </div>
  );
}

export default NavBar;
