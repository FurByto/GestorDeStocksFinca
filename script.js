
//Funcion constructora de productos


class Producto{
    constructor(nombre, categoria, precio, principioActivo, cantidad) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.principioActivo = principioActivo;
        this.cantidad = cantidad;
    }

    }

const productos = [];

productos.push(new Producto("gramoxone", "herbicida", 4.50, "paraquat", 250));
productos.push(new Producto("Solmix", "fertilizante", 2.50, "nitrógeno", 600));
productos.push(new Producto("MAP", "fertilizante", 5.60, "fósforo", 500));
productos.push(new Producto("Solks", "fertilizante", 6.00, "potasio", 250));
productos.push(new Producto("clap", "insecticida", 56, "fipronil", 3.2));
productos.push(new Producto("intrepid", "insecticida", 5,  "metoxifenocide", 250));
productos.push(new Producto("Hidrocup", "fungicida", 6,  "hidróxido de cobre", 850));


//Funciones de botones

//Boton Consultar Stock


const BTNConsultarStock = document.getElementById("botonConsultaStock");



BTNConsultarStock.addEventListener("click", () =>{

        Swal.fire({
        title: "¿Qué producto desea consultar?",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Consultar",
        }).then((result) => {     
        
        if (result.isConfirmed) {
            const productoBuscado = result.value
            
            const suma = productos.reduce((acumulador, producto) => {
                if(producto.nombre === productoBuscado) {
                    return acumulador + producto.cantidad;
                } else {
                    return acumulador;
                    }
                },0);

            Swal.fire(`La cantidad de ${productoBuscado} en stock es de ${suma}`, "", "success");
            } else if (result.isDenied) {
            Swal.fire("No se encontró stock del producto", "", "info");
            }
        });
    }
)

//Registro de uso de producto

const BTNRegistrarConsumo = document.getElementById("registroUsoProductos");



BTNRegistrarConsumo.addEventListener("click", () =>{

        Swal.fire({
        title: "Producto utilizado",
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Categoria">'+
            '<input id="swal-input3" class="swal2-input" placeholder="Precio">'+
            '<input id="swal-input4" class="swal2-input" placeholder="Principio Activo">'+
            '<input id="swal-input5" class="swal2-input" placeholder="Cantidad utilizada en litros o kg">',
            
            
        focusConfirm: false,

        showCancelButton: true,

        confirmButtonText: "Cargar",
        }).then((result) => {     
        
        if (result.isConfirmed) {

            const nombre = document.getElementById('swal-input1').value;
            const categoria= document.getElementById('swal-input2').value;
            const precio= document.getElementById('swal-input3').value;
            const principioActivo= document.getElementById('swal-input4').value;

            const cantidad = document.getElementById('swal-input5').value;
            const cantidadResta=-cantidad


            productos.push(new Producto(nombre, categoria, precio, principioActivo, cantidadResta));


            Swal.fire(`Se registró el uso de ${cantidad} L/KG de ${nombre}`, "", "success");
            } else if (result.isDenied) {
            Swal.fire("No se encontró stock del producto", "", "info");
            }
        });
    }
)

//Se podría agregar a futuro un validador para stocks negativos dando aviso al usuario de que no hay producto disponible.



//Registro de recepción de producto

const BTNRegistrarRecepcion = document.getElementById("recepcion");

BTNRegistrarRecepcion.addEventListener("click", () =>{

        Swal.fire({
        title: "Producto recibido",
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Categoria">'+
            '<input id="swal-input3" class="swal2-input" placeholder="Precio">'+
            '<input id="swal-input4" class="swal2-input" placeholder="Principio Activo">'+
            '<input id="swal-input5" class="swal2-input" placeholder="Cantidad recibida en litros o kg">',
            
            
        focusConfirm: false,

        showCancelButton: true,

        confirmButtonText: "Cargar",
        }).then((result) => {     
        
        if (result.isConfirmed) {

            const nombre = document.getElementById('swal-input1').value;
            const categoria= document.getElementById('swal-input2').value;
            const precio= document.getElementById('swal-input3').value;
            const principioActivo= document.getElementById('swal-input4').value;
            const cantidad = document.getElementById('swal-input5').value;

            productos.push(new Producto(nombre, categoria, precio, principioActivo, cantidad));

            Swal.fire(`Se registró el ingreso de ${cantidad} L/KG de ${nombre}`, "", "success");
            } else if (result.isDenied) {
            Swal.fire("No se pudo realizar la carga", "", "info");
            }
        });
    }
)


//Reporte meteorologico antes de aplicar productos

const BTNconsultarClima= document.getElementById("consultarClima");


BTNconsultarClima.addEventListener("click", () =>{
        Swal.fire({
        title: 'Ingrese la ubicación buscada',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Lat">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Long">',
        focusConfirm: false,
        preConfirm: () => {
            const latitude = document.getElementById('swal-input1').value;
            const long = document.getElementById('swal-input2').value;
            if (!latitude || !long) {
            Swal.showValidationMessage('Ingrese valores válidos');
            return false; // Prevent closing the modal
            }
            return { lat: latitude  , long: long };
        }
        })
        
        .then((result) => {
        if (result.isConfirmed) {

                const latitude = document.getElementById('swal-input1').value;
                const long = document.getElementById('swal-input2').value;
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${long}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&forecast_days=1`)
                .then(response => response.json())
                .then(data => {
                    
                    const climaAhora= data
                    
                    climaActual=climaAhora["current"];

                    const tempActual = climaActual["temperature_2m"];
                    const hr = climaActual["relative_humidity_2m"];
                    const wind= climaActual ["wind_speed_10m"];


                    Swal.fire({

                    title: `El clima actual en la ubicación de latitud ${latitude} y longitud ${long} es:`,
                    
                    html:
                        `Temperatura: ${tempActual} °C;  `   +        
                        `Humedad relativa: ${hr} %;  `+   
                        `Velocidad de viento ${wind} km/h`
                    });

                })
                 .catch(error => console.error('Error al obtener datos:', error));
            
        }
        });
})





