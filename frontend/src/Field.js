import React from 'react'

const Field = ({ type, name, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      className='form-control'
      placeholder={placeholder}
      required
      //access the value with the help of event
      //quickly copy all part of existing array
      onChange={onChange}
    />
  )
}

export default Field
