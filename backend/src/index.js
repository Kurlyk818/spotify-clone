import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import { createServer } from 'http'

import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songRoutes from './routes/song.route.js'
import albumsRoutes from './routes/albums.route.js'
import statRoutes from './routes/stats.route.js'

import { connectDB } from './lib/db.js'
import { initializeSocket } from './lib/socket.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


const httpServer = createServer(app)

initializeSocket(httpServer) 


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json()) //parse json body
app.use(clerkMiddleware())  //add auth to req.object
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file(s) size
    }
}))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/stats', statRoutes)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
    })
}

app.use('*' , (req, res) => {
    res.status(404).json({message: 'Route not found'})
})

//err handler

app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message})
})


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})


