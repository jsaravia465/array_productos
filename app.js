import express from 'express';

const app = express();

const server = app.listen(8080, () => { console.log(`Se levanto correctamente el servidor en el puerto ${server.address().port }`) })

let productos = [];

server.on('error', error => {
    console.log(`Ocurrio un error: ${error}   `);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/productos/listar', (req, res) => {

    if (productos.length > 0) {
        res.send(JSON.stringify(productos));
    } else {
        res.send(JSON.stringify({ error: 'no hay productos cargados' }));
    }


});

app.get('/api/productos/listar/:id', (req, res) => {
    if (req.params.id > productos.length - 1 || req.params.id < 0) {
        res.send(JSON.stringify({ error: 'producto no encontrado' }))
        
    } else {
        res.send(JSON.stringify(productos[req.params.id-1]))
    }


});

app.post('/api/productos/guardar', (req, res) => {

    console.log(req.body);
    let obj = req.body;
    obj.id = productos.length + 1;
    productos.push(req.body);
    res.send(req.body);


});
