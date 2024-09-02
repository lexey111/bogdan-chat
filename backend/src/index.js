console.log('Start backend')

const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json())

// {user: string, connectedAt: string}
let connectedUsers = []
// {user: string, sendAt: string, message: string}
let messages = []

app.get('/echo', function (req, res) {
    console.log('requested')
    res.status(201).json({ message: "Successfully Registered", status: 201 })
})

app.get('/users', function (req, res) {
    console.log('requested users')
    res.status(201).json({ users: connectedUsers, status: 201 })
})

app.post('/login', function (req, res) {

    if (!req.body?.name || req.body.name === 'a') {
        console.log('Login error', JSON.stringify(req.body));

        return res.status(403).json({ message: 'Invalid name' })
    }

    const newUser = {
        name: req.body.name,
        connectedAt: new Date().toISOString()
    }

    const existingUser = connectedUsers.find(x => x.name === newUser.name)

    if (existingUser) {
        console.log('Old user', JSON.stringify(newUser));
        return res.status(201).json({ ...existingUser, status: 201 })
    }

    connectedUsers.push(newUser)
    console.log('New user', JSON.stringify(newUser));

    res.status(201).json({ ...newUser, status: 201 })
})

app.post('/logout', function (req, res) {

    if (!req.body?.name || req.body.name === 'a') {
        console.log('Logout error', JSON.stringify(req.body));

        return res.status(403).json({ message: 'Invalid name' })
    }

    const userName = req.body.name
    connectedUsers = connectedUsers.filter(x => x.name !== userName)

    res.status(201).json({ status: 201 })
})

app.post('/message', function (req, res) {

    if (!req.body?.name) {
        console.log('Unknown user', JSON.stringify(req.body));
        return res.status(404).json({ error: 'Invalid user' })
    }

    const userName = req.body.name
    const existingUser = connectedUsers.find(x => x.name === userName)

    if (!existingUser) {
        console.log('Unknown user', userName);
        return res.status(403).json({ error: 'Unknown user' })
    }

    const message = req.body.message
    if (!message) {
        console.log('Empty message');
        return res.status(422).json({ error: 'Empty message' })
    }

    messages.push({
        user: userName,
        sendAt: new Date().toISOString(),
        message
    })
    console.log('Message stored', userName, '->', message);

    res.status(201).json({ status: 201 })
})

app.get('/message', function (req, res) {
    res.status(201).json({ messages: messages, status: 201 })
})

console.log('You can use http://127.0.0.1:3000')
app.listen(3000)