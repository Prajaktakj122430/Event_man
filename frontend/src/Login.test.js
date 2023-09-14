import { render, screen, fireEvent } from '@testing-library/react'
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'

test('sign up button present', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const signupButton = screen.getByRole('button', {
    name: 'Signup',
    exact: false,
  })
  expect(signupButton).toBeInTheDocument()
})

test('username placeholder text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const namefield = screen.getByPlaceholderText('Enter username')
  expect(namefield).toBeInTheDocument()
})

test('email placeholder text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const mailfield = screen.getByPlaceholderText('Enter email')
  expect(mailfield).toBeInTheDocument()
})

test('password placeholder text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const passwordfield = screen.getByPlaceholderText('Enter Password')
  expect(passwordfield).toBeInTheDocument()
})

test('name field label text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const nameLabel = screen.getByLabelText('Username')
  expect(nameLabel).toBeInTheDocument()
})

test('email field label text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const mailLabel = screen.getByLabelText('Email')
  expect(mailLabel).toBeInTheDocument()
})

test('password field label text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const passwordLabel = screen.getByLabelText('Password')
  expect(passwordLabel).toBeInTheDocument()
})

test('name  type attribute', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const nameInput = screen.getByLabelText('Username')
  expect(nameInput).toHaveAttribute('type', 'text')
})

test('email  type attribute', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const mailInput = screen.getByLabelText('Email')
  expect(mailInput).toHaveAttribute('type', 'email')
})

test('password type attribute', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const passwordInput = screen.getByLabelText('Password')
  expect(passwordInput).toHaveAttribute('type', 'text')
})

test('it should update the input field value when typing', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const pass = screen.getByPlaceholderText('Enter Password')

  fireEvent.change(pass, { target: { value: 'NewPassword@123' } })
  expect(pass.value).toBe('NewPassword@123')
})

test('button should be disable for empty name', () => {
  const { getByLabelText, getByRole } = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const inputName = getByLabelText('Username')
  fireEvent.change(inputName, { target: { value: '' } })
  const btn = getByRole('button', { name: 'Signup' })
  expect(btn).toHaveAttribute('disabled')
})

test('it should handle a name longer than the allowed length', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const namelength = screen.getByPlaceholderText('Enter username')
  expect(namelength).toHaveAttribute('minLength', '5')
})

test('it should validate and handle a valid name', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const validname = screen.getByPlaceholderText('Enter username')

  fireEvent.change(validname, { target: { value: 'Prajakta' } })
})

test('text', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const text = screen.getByText('The Lotus')

  expect(text).toBeInTheDocument()
})

test('it should display an error message for an invalid email address', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const emailInvalid = screen.getByPlaceholderText('Enter email')

  fireEvent.change(emailInvalid, { target: { value: 'invalid-email' } })
  emailInvalid.blur()
})

test('it should not display an error message for a valid email address', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const emailInput = screen.getByPlaceholderText('Enter email')

  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })
  emailInput.blur()

  const errorMessage = screen.queryByText('Please enter a valid email address.')
  expect(errorMessage).toBeNull()
})

test('it should display an error message for a too short password', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const passwordInput = screen.getByPlaceholderText('Enter Password')

  fireEvent.change(passwordInput, { target: { value: 'short' } })
  passwordInput.blur()
})

test('it should not display an error message for a valid password', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
  const passwordInput = screen.getByPlaceholderText('Enter Password')

  fireEvent.change(passwordInput, { target: { value: 'long-enough-password' } })
  passwordInput.blur()

  const errorMessages = screen.queryByText(
    'Password must be at least 8 characters.'
  )
  expect(errorMessages).toBeInTheDocument()
})
