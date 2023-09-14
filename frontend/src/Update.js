import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import moment from 'moment'
import './Update.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import Footer from './Footer'
const Update = () => {
  const [Ename, setEname] = useState('')
  const [Edesc, setEdesc] = useState('')
  const [Edate, setEdate] = useState('')
  const [Evenue, setEvenue] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  const handledatetime = (date) => {
    setEdate(date)
  }
  useEffect(() => {
    // const dateformat = moment(edatetime).format('yyyy-MM-DD,hh:mm:ss')
    async function fetchData() {
      await axios
        .get('http://localhost:8000/create/' + id)
        .then((res) => {
          setEname(res.data.e_name)
          setEdesc(res.data.e_desc)
          setEdate(new Date(res.data.e_td))
          // setEdate()
          setEvenue(res.data.e_venue)
          console.log('----------------------', res.data.e_td)
        })
        .catch((err) => {
          console.log('Daya Gadbad Hai-->', err)
        })
    }
    fetchData()
  }, [id])

  const formSubmit = (e) => {
    const dateformat = moment(Edate).format('yyyy-MM-DD,hh:mm:ss')
    e.preventDefault()
    axios
      .put('http://localhost:8000/update/' + id, {
        Ename,
        Edesc,
        Edate: dateformat,
        Evenue,
      })
      .then((response) => {
        console.log('Add Data------>', response)
        response.send('Data Sended')
      })
      .catch((error) => {
        console.log('Daya Kuchh To Gadbad Hai')
        console.log('Error------>', error)
      })
    navigate('/dashboard')
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://c1.wallpaperflare.com/preview/135/941/297/clean-clean-background-blur-green.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* <!-- Section: Design Block --> */}
      <section className='text-center text-lg-start'>
        {/* <!-- Jumbotron --> */}
        <div className='container py-4'>
          <div className='row g-0 align-items-center'>
            <div className='col-lg-6 mb-5 mb-lg-0' style={{ marginTop: '5%' }}>
              <div
                className='card cascading-right'
                style={{
                  background: 'hsla(0, 0%, 100%, 0.55)',
                  backdropFilter: 'blur(30px)',
                  boxShadow:
                    'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <div className='card-body p-5 shadow-5 text-center'>
                  <h2 className='fw-bold mb-5'>Update Event Details</h2>
                  <form onSubmit={formSubmit}>
                    {' '}
                    <div className='mb-2'>
                      <label htmlFor='name'>Name:</label>{' '}
                      <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Enter name'
                        required
                        onChange={(e) => setEname(e.target.value)}
                        value={Ename}
                      />
                      <DriveFileRenameOutlineIcon className='name-icon'></DriveFileRenameOutlineIcon>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='desc'>Discription</label>
                      <textarea
                        type='text'
                        name='desc'
                        className='form-control'
                        placeholder='Enter description'
                        value={Edesc}
                        required
                        onChange={(e) => setEdesc(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='email'>Time & Date</label>
                      <br />
                      <div>
                        <DatePicker
                          placeholderText='Enter Date & time '
                          className='field'
                          selected={Edate}
                          onChange={handledatetime}
                          showTimeSelect
                          required
                          dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <div>
                          {' '}
                          <CalendarMonthIcon className='icon'></CalendarMonthIcon>
                        </div>
                      </div>
                    </div>
                    <div className='mb-2'>
                      <label htmlFor='name'>Venue:</label>
                      <input
                        type='text'
                        name='venue'
                        className='form-control'
                        placeholder='Enter venue'
                        value={Evenue}
                        required
                        onChange={(e) => setEvenue(e.target.value)}
                      />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to='/dashboard' className='btn btn-primary ms-3'>
                      Back
                    </Link>
                  </form>
                </div>
              </div>
            </div>

            <div
              className='col-lg-6 mb-5 mb-lg-0'
              style={{ marginTop: '5%', marginBottom: '3%' }}
            >
              <img
                src='https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80'
                className='w-90 rounded-4 shadow-4'
                height={750}
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Update
