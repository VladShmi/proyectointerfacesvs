document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const carritoProductos = document.querySelector("#carrito-productos");
    const totalPrecio = document.querySelector("#Total");
    const numerito = document.querySelector("#numerito");
    const vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
    const comprarAhoraBtn = document.querySelector("#comprarAhora");
    const mensajeVacio = document.querySelector("#carrito-vacio");
    const carritoAcciones = document.querySelector("#carrito-acciones");
    const compra = document.querySelector("#carrito-comprado");
    const barraLateral = document.querySelector(".aside-visible");

    function renderizarCarrito() {
        carritoProductos.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            let subtotal = producto.precio * producto.cantidad + (producto.precio * producto.cantidad) * 0.21;
            total += subtotal;

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-imagen">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${Math.trunc(subtotal)}</p>
                </div>
                <button class="carrito-producto-comprar" data-index="${index}"><i class="bi bi-bag-fill"></i>Comprar</button>
                <button class="carrito-producto-eliminar" data-index="${index}"><i class="bi bi-trash-fill"></i>Eliminar</button>
            `;
            carritoProductos.appendChild(div);
        });

        carritoAcciones.innerHTML = `
            <div id="carrito-acciones" class="carrito-acciones">
                <div class="carrito-acciones-izquierda">
                    <button class="carrito-acciones-vaciar">Vaciar carrito</button>
                </div>
                <div class="carrito-acciones-derecha">
                    <div class="carrito-acciones-total">
                        <p>Total:</p>
                        <p id="Total">$${Math.trunc(total)}</p>
                    </div>
                    <button class="carrito-acciones-comprar">Comprar ahora</button>
                </div>
            </div>
        `;

        numerito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        if (carrito.length === 0) {
            mensajeVacio.style.display = "block";
            carritoProductos.style.display = "none";
            numerito.textContent = "0";
            totalPrecio.innerHTML = `0`;
            return;
        }
        mensajeVacio.style.display = "none";
        carritoProductos.style.display = "block";

        asignarEventosBotones();
    }

    function asignarEventosBotones() {
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
        comprarAhoraBtn.addEventListener("click", comprarAhora);
    }

    function vaciarCarrito() {
        if (confirm("¿Estás seguro que quieres vaciar el carrito?")) {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    function eliminarProducto(index) {
        if (confirm("¿Quieres eliminar este producto?")) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    function comprarAhora() {
        let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        if (carrito.length > 0) {
            const confirmacion = confirm(`¿Estás seguro que quieres comprar todos los productos por un total de $${total}?`);
            if (confirmacion) {
                carrito = [];
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderizarCarrito();
            }
        }
    }

    function comprarProducto(index) {
        if (confirm("¿Quieres comprar este producto?")) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    carritoProductos.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("carrito-producto-comprar")) {
            comprarProducto(index);
        } else if (e.target.classList.contains("carrito-producto-eliminar")) {
            eliminarProducto(index);
        }
    });

    const btnAbrirBarraLateral = document.querySelector(".open-menu");
    const btnCerrarBarraLateral = document.querySelector(".close-menu");

    function mostrarBarraLateral(aside) {
        aside.style.display = "block"; 
        aside.style.position = "fixed";
        btnCerrarBarraLateral.style.display = "block";
    }

    function cerrarBarraLateral(aside) {
        aside.style.display = "none"; 
        btnCerrarBarraLateral.style.display = "none"; 
    }

    btnAbrirBarraLateral.addEventListener("click", () => {
        mostrarBarraLateral(barraLateral);
    });

    btnCerrarBarraLateral.addEventListener("click", () => {
        cerrarBarraLateral(barraLateral);
    });

    renderizarCarrito();
});