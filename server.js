require('dotenv').config()

const PORT = process.env.PORT || 3001

const express = require('express')
const connectDB = require('./src/config/connection')
const app = express()

const authMiddleware = require('./src/utils/auth')
const helmet = require('helmet')


const userRouter = require('./src/routes/userRoute')
const bookmarkRouter = require('./src/routes/bookmarkRouter')




// middle ware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

//router 
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Welcome friend</h1>')
})

// protected routes
app.use('/api/bookmarks', authMiddleware, bookmarkRouter)

// start server 
async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running http://localhost:${PORT}`)
            console.log(`Server is running http://localhost:${PORT}/api/bookmarks`)
            console.log(`Server is running http://localhost:${PORT}/api/users`)
        })
    } catch (error) {
        console.error('Problem:', error)
        process.exit(1)
    }
}
startServer()