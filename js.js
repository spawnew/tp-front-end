document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const renderizarProductos = () => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((data) => {
              
                let contenedorProductos = document.getElementById('contenedor-productos');
                for (const producto of data.products) {
                    let tarjetaProducto = document.createElement('div');
                    tarjetaProducto.classList.add('producto');
                    let imagenProducto = document.createElement('img');
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.title;
                    
                    let tituloProducto = document.createElement('h3');
                    tituloProducto.textContent = producto.title;
                    tarjetaProducto.classList.add('producto-titulo');

                    let precioProducto = document.createElement('p');
                    precioProducto.textContent = `Precio: $${producto.price}`;
                  

                    let botonAgregar = document.createElement('button');
                    botonAgregar.textContent = 'Agregar al carrito';
                    botonAgregar.addEventListener('click', () => {
                        alert(`Producto ${producto.title} agregado al carrito`);
                        agregarProducto(producto);
                        actualizarAgregador();
                    });

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(botonAgregar);

                    contenedorProductos.appendChild(tarjetaProducto);
                }
      
            })     
            .catch((error) => {
                console.error('Error al obtener los datos :', error);
            });


    };

   
    const agregarProducto=(producto) => {
       
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarAgregador();
    }
    const actualizarAgregador = () => {
        let contador = document.getElementById('contador-carrito');
        contador.textContent = carrito.length;
    }
    renderizarProductos();
    actualizarAgregador();
}
);