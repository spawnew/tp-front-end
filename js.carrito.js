document.addEventListener('DOMContentLoaded', () => {
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        let seccionProductos = document.getElementById('carrito-productos');
        seccionProductos.innerHTML = "";

        if (!carrito.length) {
            seccionProductos.innerHTML = '<p class="mensaje-vacio">El carrito está vacío</p>';
        } else {
            carrito.forEach((producto, index) => {
                let tarjetaProducto = document.createElement('div');
                tarjetaProducto.classList.add('producto');

                let imgenProducto = document.createElement('img');
                imgenProducto.src = producto.images[0];

                let tituloProducto = document.createElement('h3');
                tituloProducto.textContent = producto.title;

                let precioProducto = document.createElement('p');
                precioProducto.textContent = `Precio: $${producto.price}`;

                let botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar del carrito';
                
                botonEliminar.classList.add ('botoneliminar');
                botonEliminar.addEventListener('click', () => {
                    eliminarProducto(index);
                });

                tarjetaProducto.appendChild(imgenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(botonEliminar);
                seccionProductos.appendChild(tarjetaProducto);
            });

            renderizarBotones();
        }

        productosEnCarrito(carrito);
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let divAcciones = document.getElementById('acciones-carrito');
        divAcciones.innerHTML = '';
        if (carrito.length) {
            let btnVaciar = document.createElement('button');
            btnVaciar.textContent = 'Vaciar carrito';
            btnVaciar.classList.add('butonvaciar');
            btnVaciar.addEventListener('click', () => {
                vaciarCarrito();
            });

            let btnFinalizar = document.createElement('button');
            btnFinalizar.textContent = 'Finalizar compra';
            btnFinalizar.classList.add('buton');
            btnFinalizar.addEventListener('click', () => {
                let confirmacion = confirm('¿Estás seguro de que deseas finalizar la compra?');
                if (confirmacion) {
                    alert('Compra finalizada. Gracias por tu compra!');
                    localStorage.removeItem('carrito');
                    window.location.href = './index.html';
                }
            });

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
        }
    };

    const productosEnCarrito = (carrito) => {
        let contador = document.getElementById('contador-carrito');
        contador.textContent = carrito.length;
    };

    const eliminarProducto = (index) => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarProductos();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem('carrito');
        renderizarProductos();
    };

    // Inicialización
    renderizarProductos();

    // Botón "Vaciar Carrito" que está en el HTML (si existe)
    document.getElementById('vaciar-carrito')?.addEventListener('click', () => {
        vaciarCarrito();
    });
});
