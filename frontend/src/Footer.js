import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const Footer = () => {
  return (
    <div style={{ marginTop: '7%' }}>
      <footer class='bg-dark text-center text-white fixed-bottom'>
        <div class='container p-2'>
          <div class='row'>
            <div class='mb-2 mb-md-0'>
              <h4 class='text-uppercase' style={{ color: 'blue' }}>
                Reach out to us:
              </h4>
              <h6>
                City Vista Kharadi, Pune – 411014 Email: support@celebratd.com
              </h6>
              <Link to='/dashboard'>Dashboard</Link>
            </div>
          </div>
        </div>

        {/* <div
          class='text-center p-3'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          © 2020 Copyright:
        </div> */}
      </footer>
    </div>
  )
}

export default Footer
