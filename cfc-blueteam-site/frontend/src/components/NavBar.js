import { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { logoutUserAction, token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('load', () => {

      console.log("loaded...");

    });
    return () => {
      window.removeEventListener('load');
    };
  }, []);

  const scrollToAboutUs = async ()=>{
    if(document.getElementById('scroll-to-about-us-div')) {
      console.log("if block");
      document.getElementById('scroll-to-about-us-div').scrollIntoView({behavior: 'smooth'});
    } else {
      console.log("else block");
      // window.location.href = "http://localhost:3000";
      console.log("else block");
      setTimeout(
        () => document.getElementById('scroll-to-about-us-div').scrollIntoView({behavior: 'smooth'}),
        0
      );
    }
  }

  const scrollToTop = async ()=>{
    console.log("Footer");
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className='navbar'>
      <header>
        {/* <a href='https://cyberforce.energy.gov/cyberforce-competition/scenario/'> */}
        <a href='/'>
          <img
            className='logo'
            src={require('../assets/img/DER8-9.png')}
            alt='logo'
          />
        </a>

        <nav>
          <ul className='nav__links'>
            <li>
              <Link to='/about-us' onClick={scrollToAboutUs}>About Us</Link>
            </li>
            <li>
              <Link to='/der-data'>DER Data</Link>
            </li>
            <li>
              {role === 'admin' ? (
                <Link to='/admin' onClick={scrollToTop}>Portal</Link>
              ) : (
                <Link to='/contact-us' onClick={scrollToTop}>Contact Us</Link>
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
