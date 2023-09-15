import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

import axios from 'axios'
import { view_off } from 'react-icons-kit/ikons/view_off'
import './Updateprofile.css'

import { eye } from 'react-icons-kit/iconic/eye'
import { Icon } from 'react-icons-kit'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import EmailIcon from '@mui/icons-material/Email'

const UpdateProfile = () => {
  const [name, setName] = useState('')
  const [emaill, setEmaill] = useState('')
  const [password, setPassword] = useState('')
  const { email } = useParams()
  const navigate = useNavigate()
  const em = JSON.parse(localStorage.getItem('user'))
  const [d1, d2] = em

  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(view_off)

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye)
      setType('text')
    } else {
      setIcon(view_off)
      setType('password')
    }
  }

  useEffect(() => {
    async function fetchData() {
      await axios

        .get('http://localhost:8000/' + d1)
        .then((res) => {
          setName(res.data.name)
          setEmaill(res.data.email)
          setPassword()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [email])

  const formupdate = (e) => {
    e.preventDefault()
    try {
      const postData = {
        name,
        emaill,
        password,
      }
      axios
        .put('http://localhost:8000/updateprofile/' + email, postData)

        .then((response) => {
          console.log('Add Data------>', response)

          const as = localStorage.setItem('user', JSON.stringify(response.data))
          console.log(as)
        })

        .catch((error) => {
          console.log('Error------>', error)
        })
      navigate('/Dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='logo'>
          <img
            src='https://cdn-icons-png.flaticon.com/256/9436/9436398.png'
            alt=''
          />
        </div>
        <div className='text-center mt-4 name'> Hello {name}</div>

        <form class='p-3 mt-3' onSubmit={formupdate}>
          <label htmlFor='name'>Name:</label>
          <div
            class='form-field d-flex
          align-items-center'
          >
            <DriveFileRenameOutlineIcon style={{ color: 'black' }} />
            <input
              type='text'
              name='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label htmlFor='email'>Email:</label>
          <div class='form-field d-flex align-items-center'>
            <EmailIcon style={{ color: 'black' }} />
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              value={emaill}
              onChange={(e) => setEmaill(e.target.value)}
            />
          </div>
          <label htmlFor='name'>Password:</label>
          <span
            className='toggle'
            onClick={handleToggle}
            style={{ color: 'black' }}
          >
            <Icon icon={icon} className='toggle' />
          </span>
          <br />
          <div className='form-field d-flex align-items-center'>
            <input
              type={type}
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-3'>
            <strong style={{ fontSize: '20px' }}>Update</strong>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            to='/dashboard'
            className='btn btn-3'
            style={{ fontSize: '20px' }}
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
