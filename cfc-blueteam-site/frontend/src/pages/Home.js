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
    <div className='content-container'>
      <div className='about-container'>
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

        <div className='services-heading' id="scroll-to-about-us-div">
          <h2>About Us</h2>
        </div>
        <div className='services'>
          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Solar Power Solutions</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/solarpanel.jpg')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <span>
                We design, install, and maintain state-of-the-art solar
                photovoltaic systems for residential, commercial, and industrial
                applications.
              </span>
            </div>
          </div>
          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Energy Storage Solutions</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/energystorage.jpeg')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <span>
                We offer cutting-edge energy storage solutions, utilizing
                advanced battery technologies, to store excess energy generated
                from renewable sources.
              </span>
            </div>
          </div>

          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Microgrid Development</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/energy-management-system-for-microgrids.png')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <span>
                DER8.9 specializes in developing and implementing customized
                microgrid solutions that integrate various energy resources.
              </span>
            </div>
          </div>

          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Demand Response Programs</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/IEC–DRP_IMAGE1.jpg')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <span>
                We assist our customers in participating in demand response
                programs to actively manage their energy consumption during
                high-demand periods.
              </span>
            </div>
          </div>
          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Energy Management and Monitoring</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/shutterstock_1504979759-1-scaled.jpg')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <span>
                Our innovative energy management software enables customers to
                track, analyze, and optimize their energy usage in real-time.
              </span>
            </div>
          </div>
          <div className='service-card'>
            <div className='service-card-header'>
              <div className='card-heading'>
                <h3>Smart Grid Integration</h3>
              </div>
            </div>
            <div className='card-img-wrap'>
              <img
                src={require('../assets/img/smart-grid.jpg')}
                className='card-image'
                alt='solar panel instalation'
              />
            </div>
            <div className='service-card-details'>
              <div>
                <span>
                  Our Smart Grid Integration service helps clients seamlessly
                  integrate their energy systems with smart grid technologies.
                  By leveraging advanced data analytics and real-time
                  monitoring, we optimize energy distribution, improve grid
                  reliability, and enable efficient energy management.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
