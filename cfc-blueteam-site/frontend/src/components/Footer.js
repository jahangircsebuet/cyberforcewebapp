import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const scrollToAboutUs = async ()=>{
    console.log("Footer");
    if(document.getElementById('scroll-to-about-us-div')) {
      console.log("if block");
      document.getElementById('scroll-to-about-us-div').scrollIntoView({behavior: 'smooth'});
    } else {
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
    <div className='footer_wrapper'>
      <footer>
        <div className='img-container'>
          <Link to='/'>
            <img
              className='logo'
              src={require('../assets/img/DER8-9.png')}
              alt='logo'
            />
          </Link>
        </div>

        <div>
          <ul className='footer_links'>
            <li>
            <Link to='/' onClick={scrollToAboutUs}>About Us</Link>
            </li>
            <li>
              <Link to='/der-data'>DER Data</Link>
            </li>
            <li>
              <Link to='/contact-us' onClick={scrollToTop}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
