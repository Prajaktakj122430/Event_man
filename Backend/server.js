const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const cookie = require('cookie-parser')
const salt = 10
const app = express()
app.use(express.json())
app.use(cookie())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
)

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EventManagement',
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ Error: 'not authenticated' })
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'no token' })
      } else {
        req.name = decoded.name
        next()
      }
    })
  }
}

app.get('/dashboard', verifyUser, (req, resp) => {
  return resp.json({ Status: 'Success', name: req.name })
})

const sql = 'INSERT INTO `logininfo` (`name`,`email`,`password`) VALUES(?)'
function db_post(sql) {
  return new Promise((resolve, reject) => {
    app.post('/', (req) => {
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: 'error in password hashing' })
        const values = [req.body.name, req.body.email, hash]

        db.query(sql, [values], function (err, result) {
          if (err) {
            return reject(err)
          }
          return resolve(result)
        })
      })
    })
  })
}

db_post(sql)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))

//signup

const sql2 = 'SELECT * FROM `logininfo` WHERE `email`=?'
app.post('/signup', (req, res) => {
  const value = req.body.email
  // console.log(value)
  db.query(sql2, [value], (err, data) => {
    if (err) {
      return res.json({ Error: 'Login Error' })
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, result) => {
          console.log(req.body.password.toString())
          console.log(data[0].password)
          if (result) {
            const name = data[0].name
            const token = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            })
            res.cookie('token', token)
            return res.json({ Status: 'Success' })
          } else {
            return res.json({ Error: 'Password not match' })
          }
        }
      )
      console.log(req.body.password)
      console.log(data[0].password)
      console.log(data)
    }
  })
})

//display

app.get('/create', (req, res) => {
  const sql = 'SELECT * FROM Events_details'
  db.query(sql, (err, data) => {
    if (err) return res.json('error')
    return res.json(data)
  })
})

app.get('/create/:id', (req, resp) => {
  const id = req.params.id
  const updateById = 'SELECT * FROM Events_details WHERE id = ?'
  db.query(updateById, [id], (err, result) => {
    if (err) {
      console.log('Error Update ', err)
      resp.status(500).json({ error: 'Internal Server Error' })
    } else {
      resp.json(result[0])
    }
  })
})

//add event

app.post('/create', (req, res) => {
  const sql =
    'INSERT INTO Events_details (`e_name`, `e_desc`, `e_td`,`e_venue`)VALUES(?)'
  const values = [
    req.body.Ename,
    req.body.Edesc,
    req.body.Edate,
    req.body.Evenue,
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json('Error')
    return res.json(data)
  })
})

//update event details
const sql1 =
  'UPDATE Events_details SET `e_name`=?, `e_desc`=?, `e_td`=?,`e_venue`=? WHERE id=?'
function eventUpdate(sql1) {
  return new Promise((resolve, reject) => {
    app.put('/update/:id', (req) => {
      console.log(req.body, 'jmd')
      const values = [
        req.body.Ename,
        req.body.Edesc,
        req.body.Edate,
        req.body.Evenue,
      ]
      const id = req.params.id
      db.query(sql1, [...values, id], (err) => {
        if (err) {
          console.log('update error1', err)
          return reject(err)
        }
        return resolve(req.body)
      })
    })
  })
}
eventUpdate(sql1)
  .then((resolve) => console.log('Update Resolve----->', resolve))
  .catch((err) => console.log('update error2', err))

//delete
app.delete('/create/:id', (req, res) => {
  const sql = 'DELETE FROM Events_details WHERE id=?'
  const id = req.params.id
  db.query(sql, [id], (err, data) => {
    if (err) return res.json('Error')
    return res.json(data)
  })
})

//perticular visitors
app.get('/:email', (req, resp) => {
  const email = req.params.email
  const updateByEmail = 'SELECT * FROM logininfo WHERE email = ?'
  db.query(updateByEmail, [email], (err, result) => {
    if (err) {
      console.log('Error Update Data By Email', err)
      resp.status(500).json({ error: 'Internal Server Error' })
    } else {
      resp.json(result[0])
    }
  })
})

//update Visitors
const updateProfile =
  'UPDATE `logininfo` SET `name`=?,`email`=?,`password`=? WHERE email=?'
function visitorUpdate(updateVisitors) {
  return new Promise((resolve, reject) => {
    app.put('/updateprofile/:email', (req) => {
      console.log(req.body, 'jmd')

      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: 'error in password hashing' })
        const values = [req.body.name, req.body.emaill, hash]
        const email = req.params.email
        db.query(updateVisitors, [...values, email], (err) => {
          if (err) {
            console.log('update error1', err)
            return reject(err)
          }
          console.log('Update Visitor......')
          return resolve(req.body)
        })
      })
    })
  })
}
visitorUpdate(updateProfile)
  .then((resolve) => console.log('Update Resolve----->', resolve))
  .catch((err) => console.log('update error2', err))

app.listen(8000)
console.log('8000 port is running')
