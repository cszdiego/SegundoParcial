import Product from '../models/Product.model.js'

//Obteniendo products
export const getProducts = async(req, res)=>{
    try{
        const products = await Product.find()
        if(!products || products.length == 0){
            return res.status(404).json({mensaje: 'No hay productos agregados'})
        }
        return res.json(products)
    }catch(error){
        console.error('Error al obtener los productos: ', error)
        return res.status(500).json({mensaje: 'Error en el servidor'})
    }
}

//Agregando productos
export const addProduct = async (req,res)=>{
    try{
        const newProduct = new Product(req.body)
        if (!newProduct){
            return res.status(404).json({mensaje: 'Campos incompletos'})
        }
        await newProduct.save()
        return res.status(201).json(newProduct)
    }
    catch(error){
        console.error('Error al guardar el producto: ', error)
        return res.status(500).json({mensaje: 'Error en el servidor'})
        
    }
}

//Eliminando producto
export const deleteProduct = async(req,res)=>{
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.productId)
        if(!deleteProduct){
            return res.status(404).json({mensaje: 'El producto no existe'})
        }
        return res.status(201).json({mensaje: 'Producto eliminado correctamente'})
    }
    catch(error){
        console.error('Error al eliminar el producto: ', error);
        return res.status(500).json({mensaje: 'Error en el servidor'})
    }
}