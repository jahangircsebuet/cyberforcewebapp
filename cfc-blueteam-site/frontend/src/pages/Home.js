import '../styles/Home.css';

function Home() {
  function exec() {
    let referral= document.refferer;
    if(document.referrer.indexOf('contact') >= 0) {
      // document.getElementById('scroll-to-about-us-div').scrollIntoView({behavior: 'smooth'});
      console.log(document.getElementById('scroll-to-about-us-div'));
    }
  }
  exec();
  return (
    <div className='content-container-home'>
      <div className='home-header'>
          <h1>Welcome to DER8.9</h1>
          <h2>Part of JakaaGen Inc</h2>
        </div>

        <div className='description'>
          <p>
          DER8.9 is a leading utility company specializing in Distributed Energy Resources (DER). We
          are dedicated to revolutionizing the energy landscape by harnessing the power of
          renewable energy and advanced technology.
          </p>
        </div>

      <div className='der-data'>
        <h2>DER Data Display</h2>
        <p>
          Access real-time data on our distributed energy resources and monitor
          their performance. Stay informed about energy production, consumption,
          and savings.
        </p>
        <a href='/der-data'>View DER Data</a>
      </div>

      <div className='social-proof'>
        <h2>Social Proof</h2>
        <div className='testimonial'>
          <img
            src={require('../assets/img/users/default.jpg')}
            alt='Customer 1'
          />
          <p>
            "DER8.9's renewable energy solutions have helped us reduce our
            energy costs and minimize our environmental impact. Highly
            recommended!"
          </p>
          <span>- John Doe, CEO of ABC Corporation</span>
        </div>
        <div className='testimonial'>
          <img
            src={require('../assets/img/users/default.jpg')}
            alt='Customer 2'
          />
          <p>
            "We are thrilled with the microgrid solution implemented by
            DER8.9. It has significantly improved our energy resiliency and
            reduced downtime during grid outages."
          </p>
          <span>- Jane Smith, Facilities Manager at XYZ Hospital</span>
        </div>
      </div>
    </div>

    
  );
}

export default Home;
