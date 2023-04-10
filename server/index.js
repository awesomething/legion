import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import userRouter from './routes/user.routes.js'
import companyRouter from './routes/company.routes.js'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config()

const app = express()

app.get('/', (req,res,)=> {
    res.send({ message: 'Hello Devs!'})
})

const __dirname = path.resolve();
app.use(cors())
app.use(express.json({ limit: '50mb'}))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/companies', companyRouter)
app.use(express.static(path.join(__dirname, '../client/build')))

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server running on http://localhost:8080'),)
    }catch(error){
     console.log(error)
    }
}

startServer()
