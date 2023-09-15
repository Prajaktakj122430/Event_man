import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate, Link } from 'react-router-dom'
import './Dashboard.css'
import axios from 'axios'
import Footer from './Footer'
const em = JSON.parse(localStorage.getItem('user'))
const [d1, d2] = em
const Dashboard = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  // const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')

  const handleLogout = () => {
    localStorage.setItem('login', false)
    navigate('/signup')
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/create')
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8000/create/' + id)

      setEvents((prevEvent) => prevEvent.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  //for get name
  useEffect(() => {
    async function fetch() {
      await axios
        .get(`http://localhost:8000/${d1}`)
        .then((res) => {
          setName(res.data.name)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetch()
  }, [d1])

  ///////////////////////////////////////////////////////////////////////
  return (
    <div>
      <nav
        class='navbar navbar-expand-lg fixed-top navbar-light'
        style={{ backgroundColor: '#CBF3E4' }}
      >
        <div class='container-fluid justify-content-center justify-content-md-between'>
          <div class='d-flex my-2 my-sm-0 d-flex justify-content-end'>
            <img
              className='img'
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
              height='60'
              width={90}
              alt=''
            />

            <h6 class=' main-title'>
              <strong style={{ fontSize: '40px' }}>The Lotus</strong>{' '}
            </h6>
            <div class='navbar-nav' style={{ marginLeft: 60 }}></div>
          </div>
          <div className=' ms-auto name'>
            <Link to={`/updateprofile/${d1}`}>
              <img
                className='profile'
                src='https://icon-library.com/images/my-profile-icon/my-profile-icon-10.jpg'
                alt=''
                height={40}
                width={40}
                marginRight={'100%'}
              />
            </Link>
            <h3>&nbsp;&nbsp;{name}</h3>
            &nbsp; &nbsp; &nbsp;
            <button className='btn btn-primary ms-auto' onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </nav>

      <div
        id='intro'
        class='bg-image shadow-1-strong '
        style={{
          backgroundImage:
            'url("http://celebratd.com/wp-content/uploads/2021/09/brooke-lark-YwSy97_Rk1o-unsplash.jpg")',
          height: '300px',
          marginTop: 100,
        }}
      >
        <div
          class='mask text-white'
          style={{
            marginTop: 58,
            backgroundColor: 'rgba(0, 0, 0, 0.30)',
            height: 300,
          }}
        >
          <div
            class='container d-flex align-items-center justify-content-center text-center h-100 '
            style={{ marginTop: 70 }}
          >
            <div class='text-white' style={{ marginTop: 50 }}>
              <h1 class='mb-3'>
                Plan your next event with{' '}
                <strong>
                  <u>The Lotus</u>
                </strong>
              </h1>

              <h4 class='mb-4'>
                Get decorations, cakes, photographers and more....
              </h4>
              <Link to='/create' className='btn btn-outline-light btn-lg mb-3'>
                Add Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ******************************************************************************************************** */}
      <div>
        <div
          className='d-flex vh-50  justify-content-center align-items-center'
          style={{ marginTop: '3%' }}
        >
          <div
            className='w-50 bg-white rounded'
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
            }}
          >
            <h3 style={{ textAlign: 'center' }}>
              <strong>Events</strong>
            </h3>

            <table className='table table-striped table-bordered '>
              <thead
                style={{
                  position: 'sticky',
                  top: 65,
                }}
              >
                <tr className='table-info'>
                  <th style={{ textAlign: 'center' }}>Name</th>
                  <th style={{ textAlign: 'center' }}>Description</th>
                  <th style={{ textAlign: 'center' }}>Date</th>

                  <th style={{ textAlign: 'center' }}>Venue</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((data, i) => (
                  <tr key={i}>
                    <td>{data.e_name}</td>
                    <td>{data.e_desc}</td>
                    <td>{moment(data.e_td).format('yyyy-MM-DD hh:mm:ss')}</td>

                    <td>{data.e_venue}</td>
                    <td>
                      <Link
                        to={`/update/${data.id}`}
                        className='btn btn-secondary me-1 '
                        style={{ marginLeft: '10%' }}
                      >
                        update
                      </Link>
                      <button
                        id='refreshButton'
                        className='btn btn-danger me-3'
                        style={{ marginLeft: '10%' }}
                        onClick={(e) => handleDelete(data.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
