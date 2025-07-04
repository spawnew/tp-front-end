document.addEventListener('DOMContentLoaded', () => {
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById('carrito-productos');
        seccionProductos.innerHTML = "";


        if (!carrito.length) {
            seccionProductos.innerHTML = `<p class="mensaje-vacio">El carrito está vacío</p>`;
        }
        else {
            carrito.forEach((producto) => {
                let div = document.createElement('div');
                div.classList.add('producto-en-carrito');
                div.innerHTML = `
                <img src="${producto.images}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
                <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
            `;
                seccionProductos.appendChild(div);
            });

            let botonesEliminar = document.querySelectorAll('.btn-eliminar');
            botonesEliminar.forEach((boton) => {
                boton.addEventListener('click', (e) => {
                    let idProducto = e.target.getAttribute('data-id');
                    carrito = carrito.filter(producto => producto.id !== idProducto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    productosEnCarrito(carrito);
                    e.target.parentElement.remove();
                });
            });
        }
        function productosEnCarrito(carrito) {
            let contador = document.getElementById('contador-carrito');
            contador.textContent = carrito.length;
        }
    }

renderizarProductos();
}
); 