import morgan from 'morgan'
import ProductRoutes from './src/routes/Product.routes.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//Base de datos

mongoose.Promise= global.Promise
const dbUrl = 'mongodb+srv://dcastillos2004:holiscalis1@cluster0.lf5wfbk.mongodb.net/MySuplement?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbUrl, {
    useUnifiedTopology: true, 
})
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('No se pudo conectar a la base:', error));

const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev')) 

const origenesPermitidos = ["http://127.0.0.1:5500"]
const corsOption = {
    origen : (origen,callback)=>{
        if(!origen || origenesPermitidos.includes(origen)){
            callback(null,true)
        }else{
            callback(new Error('Cliente no permitido'))
        }
    }
}

app.use(cors())

//Puerto
const PORT = process.env.PORT || 5000

//rutas
app.use('/api/products', ProductRoutes)

app.listen(PORT, ()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});

