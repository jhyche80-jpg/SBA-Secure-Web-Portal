require('dotenv').config
const PORT = process.env.PORT || 3001

const express = require('express')
const app = express()
const helmet = require('helmet')
const userRouter = require('./src/routes/userRoute')
const connectDB = require('./src/config/connection')
const authMiddleware = require('./src/utils/auth')
const githubRouter = require('./src/routes/githubRoutes')
// middle ware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(authMiddleware())

//router 
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Welcome friend</h1>')
})


async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running http://localhost:${PORT}`)
            console.log(`Server is running http://localhost:${PORT}/userrs`)
        })
    } catch (error) {
        console.error('Problem:', error)
        process.exit(1)
    }
}
startServer()