import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Create.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Footer from './Footer'
const Create = () => {
  const [Ename, setEname] = useState('')
  const [Edesc, setEdesc] = useState('')
  const [Edate, setEdate] = useState('')
  const [Evenue, setEvenue] = useState('')
  const navigate = useNavigate()

  const handledatetime = (date) => {
    setEdate(date)
  }

  function handleSubmit(event) {
    const dateformat = moment(Edate).format('yyyy-MM-DD,hh:mm:ss')
    event.preventDefault()

    axios
      .post('http://localhost:8000/create', {
        Ename,
        Edesc,
        Edate: dateformat,
        Evenue,
      })
      .then((res) => {
        console.log(res)
        navigate('/dashboard')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://c1.wallpaperflare.com/preview/135/941/297/clean-clean-background-blur-green.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // height: '110%',
      }}
    >
      <section class='text-center text-lg-start'>
        <div class='container py-4'>
          <div class='row g-0 align-items-center'>
            <div class='col-lg-6 mb-5 mb-lg-0' style={{ marginTop: '5%' }}>
              <div
                class='card cascading-right'
                style={{
                  background: 'hsla(0, 0%, 100%, 0.55)',
                  backdropFilter: 'blur(30px)',
                  boxShadow:
                    'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <div class='card-body p-5 shadow-5 text-center'>
                  <h2 class='fw-bold mb-5'>Add New Event</h2>
                  <form onSubmit={handleSubmit} style={{ marginTop: '3%' }}>
                    {' '}
                    <div className='mb-2'>
                      <label htmlFor='name'>
                        <strong>Name:</strong>
                      </label>{' '}
                      <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Enter name'
                        required
                        onChange={(e) => setEname(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='desc'>
                        <strong>Discription</strong>
                      </label>
                      <input
                        type='text'
                        name='desc'
                        className='form-control'
                        placeholder='Enter Event Description'
                        required
                        onChange={(e) => setEdesc(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='email'>
                        <strong>Time & date</strong>
                      </label>
                      <br />
                      <div>
                        <DatePicker
                          placeholderText='Enter Date & time '
                          className='field'
                          selected={Edate}
                          onChange={handledatetime}
                          showTimeSelect
                          dateFormat='MMMM d, yyyy h:mm aa'
                          required
                        />
                        <div>
                          {' '}
                          <CalendarMonthIcon className='icon'></CalendarMonthIcon>
                        </div>
                      </div>
                    </div>
                    <div className='mb-2'>
                      <label htmlFor='name'>
                        <strong>Venue:</strong>
                      </label>
                      <input
                        type='text'
                        name='venue'
                        className='form-control'
                        placeholder='Enter venue'
                        onChange={(e) => setEvenue(e.target.value)}
                        required
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
              class='col-lg-6 mb-5 mb-lg-0'
              style={{ marginTop: '5%', marginBottom: '3%' }}
            >
              <img
                src='https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80'
                class='w-90 rounded-4 shadow-4'
                height={750}
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Create
