document.addEventListener('DOMContentLoaded', () => { 
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    fetch('https://dummyjson.com/products')
.then(res => res.json())
        .then((data) => {
        console.log(data);
        let contenedorProcuctos = document.getElementById('contenedor-productos');
        data.products.forEach((producto) => {
            let div = document.createElement('div');
            div.classList.add('productos');
            div.innerHTML = `
               <img src="${producto.images}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>Precio: $${producto.price}</p>
                <button   data-id="${producto.id}">Agregar al carrito</button>
            `;
            contenedorProcuctos.appendChild(div);
        });
      
    })
    .catch((error) => {
      console.error('Error al obtener los datos :', error);
    });





}   );