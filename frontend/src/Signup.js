import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './Signup.css'
import { view_off } from 'react-icons-kit/ikons/view_off'

import { eye } from 'react-icons-kit/iconic/eye'
import { Icon } from 'react-icons-kit'
import { logIn } from 'react-icons-kit/feather/logIn'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(view_off)
  const navigate = useNavigate()
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye)
      setType('text')
    } else {
      setIcon(view_off)
      setType('password')
    }
  }
  axios.defaults.withCredentials = true
  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('http://localhost:8000/signup', { email, password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          const user = [email, password]
          localStorage.setItem('user', JSON.stringify(user))

          navigate('/dashboard')
          localStorage.setItem('login', true)
        } else {
          alert('Envalid information')
          console.log(res.data.Error)
        }
      })

      .catch((err) => console.log(err))
    navigate('/dashboard')
  }
  return (
    <div>
      <section
        className='h-100 gradient-form'
        style={{ backgroundColor: '#eee' }}
      >
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-xl-10'>
              <div
                className='card rounded-3 text-black'
                style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}
              >
                <div className='row g-0'>
                  <div className='col-lg-6'>
                    <div className='card-body p-md-5 mx-md-4'>
                      <div className='text-center'>
                        <img
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                          style={{ width: 185 }}
                          alt='logo'
                        />
                        <h4 className='mt-1 mb-5 pb-1 main-title'>
                          The Lotus{' '}
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p classNameName='title'>
                          {' '}
                          <img
                            classNameName='login-img'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtScIlYxEgdvb3Ro-v3PE3sNDRlQNfIory4A&usqp=CAU'
                            alt=''
                            height={30}
                          />
                          &nbsp;
                          <strong style={{ fontSize: '28px' }}>Login</strong>
                        </p>

                        <div className='form-outline mb-4'>
                          <input
                            type='email'
                            id='form2Example11'
                            className='form-control'
                            placeholder='Enter mail'
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className='form-label' for='form2Example11'>
                            <strong>Email</strong>
                          </label>
                        </div>

                        <div className='form-outline mb-4'>
                          <input
                            type={type}
                            id='form2Example22'
                            className='form-control'
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className='form-label' for='form2Example22'>
                            <strong>Password</strong>
                          </label>
                          <span onClick={handleToggle}>
                            <Icon icon={icon} />
                          </span>
                        </div>

                        <div className='text-center pt-1 mb-5 pb-1'>
                          <button
                            className='btn btn-primary btn-block fa-lg gradient-custom-2 mb-3'
                            type='submit'
                            disabled={email === '' && password === ''}
                          >
                            Log in
                            <Icon icon={logIn} />
                          </button>
                        </div>

                        <div className='d-flex align-items-center justify-content-center pb-4'>
                          <p className='mb-0 me-2'>Don't have an account?</p>
                          <Link
                            to='/'
                            type='button'
                            classNameName='btn btn-outline-danger'
                          >
                            Create new
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='col-lg-6 d-flex align-items-center gradient-custom-2'>
                    <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                      <div classNameName='main'>
                        <div
                          id='carouselMaterialStyle'
                          className='carousel slide carousel-fade'
                          data-mdb-ride='carousel'
                        >
                          <div className='carousel-inner rounded-5 shadow-4-strong'>
                            <div className='carousel-item active'>
                              <img
                                classNameName='image'
                                src='https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                                className='d-block w-100'
                                alt='Sunset Over the City'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 className='mb-4' style={{ marginTop: 100 }}>
                        Exclusive events, priceless memories.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
