const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCat = document.querySelectorAll(".boton-categoria");
const carritoN = document.querySelector("#numerito");
const barraLateral = document.querySelector(".aside-visible");
const footer = document.querySelector("footer");
const tituloPrincipal = document.querySelector("#titulo-principal");
const btnTodos = document.querySelector("#todos");
const btnAbrirBarraLateral = document.querySelector(".open-menu");
const btnCerrarBarraLateral = document.querySelector(".close-menu");

let productos = [];
let carrito = [];

function cargarProductos() {
    fetch('./js/productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
            eventoAgregar();
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            contenedorProductos.innerHTML = "<p>Hubo un problema al cargar los productos. Intenta más tarde.</p>";
        });
}

function mostrarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";
    listaProductos.forEach(producto => {
        const productoHTML = document.createElement("div");
        productoHTML.classList.add("producto");
        productoHTML.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(productoHTML);
    });
}

btnCat.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const categoria = e.currentTarget.id;
        btnCat.forEach(i => {
            i.classList.remove("active");
            const icono = i.querySelector("i");
            icono.classList.replace("bi-hand-index-thumb-fill", "bi-hand-index-thumb");
        });

        e.currentTarget.classList.add("active");
        const iconoSeleccionado = e.currentTarget.querySelector("i");
        iconoSeleccionado.classList.replace("bi-hand-index-thumb", "bi-hand-index-thumb-fill");

        if (categoria === "todos") {
            tituloPrincipal.textContent = "Todos los productos";
            mostrarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === categoria);
            tituloPrincipal.textContent = productosFiltrados[0]?.categoria.nombre || "Categoría";
            mostrarProductos(productosFiltrados);
        }
        eventoAgregar();
    });
});

btnTodos.addEventListener("click", () => {
    mostrarProductos(productos);
    tituloPrincipal.textContent = "Todos los productos";
    eventoAgregar();
});

function agregarCarrito(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id == idProducto);
    if (productoSeleccionado) {
        const productoEnCarrito = carrito.find(producto => producto.id == idProducto);
        if (!productoEnCarrito) {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        } else {
            productoEnCarrito.cantidad++;
        }
        actualizarNCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        console.error("El producto no existe");
    }
}

function actualizarNCarrito() {
    const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    carritoN.textContent = totalProductos;
}

function cargarCarritoDesdeLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = storedCart.filter(producto => productos.some(p => p.id === producto.id));
    actualizarNCarrito();
}

function eventoAgregar() {
    contenedorProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("producto-agregar")) {
            const idProducto = e.target.getAttribute("data-id");
            agregarCarrito(idProducto);
        }
    });
}

cargarCarritoDesdeLocalStorage();

function mostrarBarraLateral(aside) {
    if (window.innerWidth < 601) {
        aside.style.display = "block";
        aside.style.position = "fixed";
        btnCerrarBarraLateral.style.display = "block";
    }
    if (window.innerWidth > 601) {
        aside.style.display = "block";
        aside.style.position = "sticky";
    }
}

btnAbrirBarraLateral.addEventListener("click", () => mostrarBarraLateral(barraLateral));

function cerrarBarraLateral(aside) {
    if (window.innerWidth < 601) {
        aside.style.display = "none";
        btnCerrarBarraLateral.style.display = "none";
    }
}

btnCerrarBarraLateral.addEventListener("click", () => cerrarBarraLateral(barraLateral));

cargarProductos();