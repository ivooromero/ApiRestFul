



const express = require('express');
const app = express();
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router();


app.use('/api/productos', router);


const Contenedor = require("./Contenedor/contenedor")

const contenedor = new Contenedor("productos.json")

const productoGenerico = {
    title : "Vaso",
    price : 200,
    thumbnail : "350"
}

router.get('/', async (req, res) =>{
    const productos = await contenedor.getAll()
    res.status(200).json(productos)
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    wasDeleted 
        ? res.status(200).send(`El producto de ID: ${id} fue borrado`)
        : res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`);
})


router.post('/', async (req,res) => {
    const newProductId = await contenedor.save(productoGenerico);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`)
})



router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req
    const idN = Number(id)
    const wasUpdated = await contenedor.updateByID(idN,body);
    wasUpdated
        ? res.status(200).send(`El producto de ID: ${id} fue actualizado`)
        : res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const idN = Number(id)
    const product = await contenedor.obtenerID(idN);

    product
        ? res.status(200).json(product)
        : res.status(404).json({error: "Producto no encontrado"});
    
})







const PORT = 8075;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));

