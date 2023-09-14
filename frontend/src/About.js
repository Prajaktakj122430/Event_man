import React from 'react'
import Footer from './Footer'
const About = () => {
  return (
    <div>
      <nav
        class='navbar navbar-expand-lg fixed-top navbar-light'
        style={{ backgroundColor: '#CBF3E4' }}
      >
        <div class='container-fluid justify-content-center justify-content-md-between'>
          <div class='d-flex my-2 my-sm-0'>
            <a
              class='navbar-brand me-2 mb-1 d-flex justify-content-center'
              href='#'
            >
              <img
                className='img'
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                height='30'
                width={50}
                alt=''
              />
            </a>
            <h4 class=' main-title'>The Lotus </h4>
            <div class='navbar-nav' style={{ marginLeft: 60 }}></div>
          </div>
        </div>
      </nav>
      <div
        id='intro'
        class='bg-image shadow-1-strong '
        style={{
          backgroundImage:
            'url("http://celebratd.com/wp-content/uploads/2021/09/s-o-c-i-a-l-c-u-t-CZ8XutyXLr8-unsplash.jpg")',
          height: '200px',
          marginTop: 100,
        }}
      >
        <h1 style={{ marginLeft: 800 }}>About Us</h1>
      </div>

      <div class='col'>
        <div
          class='card '
          style={{ marginLeft: 200, marginTop: 0, marginRight: 200 }}
        >
          <p>
            We at Celebratd help plan your events and celebrations better.
            Events planned with us will be etched in your memories forever. We
            have an experienced team of event planners and experience managers
            who will make sure that you do not have to worry about anything from
            the moment you sign up with us. We provide a simple yet exhaustive
            platform where you can find decorations, cakes, flowers, gifts,
            photographers and a lot more. You can choose from a set of
            pre-curated packages or can even create one right from scratch. Our
            team of dedicated professionals shall assist you on every step. For
            any queries or assistance regarding Celebratd please drop an email
            to support@celebratd.com or call us on +91-9209325622.
          </p>
          <div class='card-body'></div>
          <div class='card-footer' style={{ backgroundColor: '#d3d0d0' }}>
            <small class='text-muted'>
              𝓔𝔁𝓬𝓵𝓾𝓼𝓲𝓿𝓮 𝓮𝓿𝓮𝓷𝓽𝓼, 𝓹𝓻𝓲𝓬𝓮𝓵𝓮𝓼𝓼 𝓶𝓮𝓶𝓸𝓻𝓲𝓮𝓼.
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
