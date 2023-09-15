import { render, screen, fireEvent } from '@testing-library/react'
import Signup from './Signup'
import { BrowserRouter } from 'react-router-dom'

test('login button present', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const loginButton = screen.getByRole('button', {
    name: 'Log in',
    exact: false,
  })
  expect(loginButton).toBeInTheDocument()
})

test('email placeholder text', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const mailfield = screen.getByPlaceholderText('Enter mail')
  expect(mailfield).toBeInTheDocument()
})

test('password placeholder text', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const passwordfield = screen.getByPlaceholderText('Enter Password')
  expect(passwordfield).toBeInTheDocument()
})

test('email field label text', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const mailLabel = screen.getByLabelText('Email')
  expect(mailLabel).toBeInTheDocument()
})

test('password field label text', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const passwordLabel = screen.getByLabelText('Password')
  expect(passwordLabel).toBeInTheDocument()
})

test('email  type attribute', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const mailInput = screen.getByLabelText('Email')
  expect(mailInput).toHaveAttribute('type', 'email')
})

test('password type attribute', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const passwordInput = screen.getByLabelText('Password')
  expect(passwordInput).toHaveAttribute('type', 'password')
})

test('it should update the input field value when typing', () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const pass = screen.getByPlaceholderText('Enter Password')

  fireEvent.change(pass, { target: { value: 'NewPassword@123' } })
  expect(pass.value).toBe('NewPassword@123')
})

test('button should be disable for empty password', () => {
  const { getByLabelText, getByRole } = render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
  const inputPassword = getByLabelText('Password')
  fireEvent.change(inputPassword, { target: { value: '' } })
  const btn = getByRole('button', { name: 'Log in' })
  expect(btn).toHaveAttribute('disabled')
})
