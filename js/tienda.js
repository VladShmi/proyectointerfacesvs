document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.getElementById('contenedor-productos');
    const botonesCategoria = document.querySelectorAll('.boton-categoria');
    const carritoNumerito = document.getElementById('numerito');
    let carrito = 0;

    let productos = [];

    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            renderizarProductos(productos);
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    function renderizarProductos(items) {
        contenedorProductos.innerHTML = '';
        items.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');

            divProducto.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;

            contenedorProductos.appendChild(divProducto);
        });

        agregarEventosBotones();
    }

    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.id;

            botonesCategoria.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            if (categoria === 'todos') {
                renderizarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(p => p.categoria === categoria);
                renderizarProductos(productosFiltrados);
            }
        });
    });

    function agregarEventosBotones() {
        const botonesAgregar = document.querySelectorAll('.producto-agregar');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', () => {
                carrito++;
                carritoNumerito.textContent = carrito;
            });
        });
    }
});