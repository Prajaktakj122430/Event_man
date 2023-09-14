import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import { view_off } from 'react-icons-kit/ikons/view_off'
import { eye } from 'react-icons-kit/iconic/eye'
import { Icon } from 'react-icons-kit'
import { logIn } from 'react-icons-kit/feather/logIn'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailerror] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [usererror, setUserError] = useState(false)

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

  const validUsername = () => {
    if (name.length < 5) {
    } else {
      setUserError(true)
    }
  }
  useEffect(() => {
    validUsername('')
  })

  //expression for email

  const validateEmail = () => {
    const pattern = /^[a-z0-9]\S+@\S+\.\S+/
    if (pattern.test(email)) {
      setEmailerror(true)
    } else if (!pattern.test(email)) {
      alert('Incorrect mail')
    } else {
      setEmailerror(true)
    }
  }

  //expression for password
  const validatePassword = () => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (pattern.test(password)) {
      setPasswordError(true)
      alert('Would you like to submit..')
    } else if (!pattern.test(password)) {
    } else {
      setPasswordError(true)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (emailError === true && passwordError === true && usererror === true) {
      // to store data in local storage and convert this object in to string
      localStorage.setItem('email', JSON.stringify(email))
      localStorage.setItem('pass', JSON.stringify(password))
      localStorage.setItem('login', true)
      navigate('/signup')
    }
    //////////////////////////////////////////////
    axios
      .post('http://localhost:8000', { name, email, password })
      .then((res) => console.log('------->', res))
      .catch((err) => console.log('----------->', err))
  }
  /////////////////////////////////////////
  return (
    <div>
      <section
        className='h-100 gradient-form'
        style={{ backgroundColor: '#eee' }}
      >
        <div className='container py-5 h-100'>
          <div
            className='row d-flex justify-content-center align-items-center h-100
          '
          >
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
                        <p className='title'>
                          {' '}
                          <img
                            className='login-img'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtScIlYxEgdvb3Ro-v3PE3sNDRlQNfIory4A&usqp=CAU'
                            alt=''
                          />
                          &nbsp;Sign Up
                        </p>

                        <div className='form-outline mb-4'>
                          <label className='form-label' for='form2Example22'>
                            <strong>Username:</strong>
                          </label>
                          <input
                            type='text'
                            htmlfor='name'
                            id='form2Example22'
                            className='form-control'
                            placeholder='Enter username'
                            minLength={5}
                            maxLength={20}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={validUsername}
                          />
                        </div>
                        <div className='form-outline mb-4 '>
                          <label className='form-label' for='form2Example11'>
                            <strong>Email:</strong>
                          </label>
                          <input
                            type='email'
                            id='form2Example11'
                            className='form-control'
                            placeholder='Enter email '
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                          />
                        </div>

                        <div className='form-outline mb-4'>
                          <label className='form-label' for='form2Example22'>
                            <strong>Password:</strong>
                          </label>

                          <input
                            type={type}
                            id='form2Example22'
                            className='form-control'
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                          />
                          <abbr>Password must be at least 8 characters.</abbr>

                          <span onClick={handleToggle}>
                            <Icon icon={icon} />
                          </span>
                        </div>

                        <div className='text-center pt-1 mb-5 pb-1'>
                          <button
                            className='btn btn-primary btn-block fa-lg gradient-custom-2 mb-3'
                            type='submit'
                            disabled={name === ''}
                          >
                            Signup
                            <Icon icon={logIn} />
                          </button>
                        </div>

                        <div className='d-flex align-items-center justify-content-center pb-4'>
                          <p className='mb-0 me-2'>Don't have an account?</p>
                          <Link
                            to='/signup'
                            type='button'
                            className='btn btn-outline-danger'
                          >
                            Signup
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='col-lg-6 d-flex align-items-center gradient-custom-2'>
                    <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                      <div className='main'>
                        <div
                          id='carouselMaterialStyle'
                          className='carousel slide carousel-fade'
                          data-mdb-ride='carousel'
                        >
                          <div className='carousel-inner rounded-5 shadow-4-strong'>
                            <div className='carousel-item active'>
                              <img
                                // className='image'
                                src='https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
                                className='d-block w-100'
                                alt='Sunset Over the City'
                              />
                              <div className='carousel-caption d-none d-md-block'></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 className='mb-4' style={{ marginTop: 100 }}>
                        Life is an event. Make it memorable.
                      </h4>
                      <p className='small mb-0'>
                        Without leaps of imagination, or dreaming, we lose the
                        excitement of possibilities. Dreaming, after all, is a
                        form of planning.
                      </p>
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

export default Login
