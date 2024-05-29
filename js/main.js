// El código va aquí -> 

// creamos variables para los botones de agregar y limpiar de la seccion Agregar Productos
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

// agregaremos 2 eventos, definimos variables para los dos campos de agregar productos
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

//para las alertas de validacion
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

// Se definieron variables para el contador de productos, total de productos y el precio total
// de la seccion de RESUMEN 
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

// variable para la Tabla que tenemos en HTML
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = document.getElementsByTagName("tbody").item(0); //creamos esta varibale porque los datos los queremos
// al amacenar en el cuerpo de la tabla (tbody), usamos tagname porque tbody en nuestro index.html no tiene id ni clase
// usualmente no se recomienda modificar el index.html 
// se agrega item(0) para especificar que iniciara a agregar desde el item 0 del cuerpo de la tabla


// variable BANDERA -- tipo booleana. Si es verdadero continua, si es falso no continua
let isValid = true;

//variable para el precio
let precio;

//variable para el contador
let contador=0;

//se definieron estas otras variables para ir contando en la seccion de resumen del if(valid)
let costoTotal=0;
let totalEnProductos =0;

// usaremos un arreglo para almacenar la información de la tabla
let datos=new Array();

//funcion para validar el campo de Cantidad, se puso en funcion porque se van a
//validar muchas cosas

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } //if legth
    if (isNaN(txtNumber.value)){  //para validar que el elemento si sea un numero
        return false;
    }
    if (Number(txtNumber.value)<=0){  //para validar que el numero no sea negativo
        return false;      
    }
    return true;
} // Validar Cantidad

//Funcion que me de precio
function getPrecio(){
    return Math.floor((Math.random()*100) * 100)/100;  //da un numero random, lo multiplicamos 2 veces por 100 y luego lo dividimos para reducirlo
// a un numero random de dos digitos con dos decimales
}


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    // primero se debe validar que tengamos texto o numeros en los campos

    //aqui primero especificamos que si las funciones de abajo no se cumplen, no se muestren
    //alertas
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";

    //bandera
    isValid =true;  //de inicio da por sentado que es verdadero, cambia si con las funciones de abajo se comprueba que es FALSO.

    //funciones para mostrar alertas en caso de que los valores en los campos no sean validos
    if (txtNombre.value.length<3){
        //aparece una alerta establecida en en index.html con el id=alertasValidacionesTexto
        // solo aparece la ventana, así que gregaremos tecto en la ventanita
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> debe ser de más de 3 carcateres<br/>";
        alertValidaciones.style.display="block"; //para que se muestre como bloque arriba del campo de "nombre"
        txtNombre.style.border="solid red thin"; //para que el borde del campo se ponga en rojo cuando se muestra ala alerta
    } 

    if (! validarCantidad()){  // ! valida al funcion, si el numero == 0 da estas alertas
        alertValidacionesTexto.innerHTML+="El <strong>Número</strong> no es correcto"  //concantena el texto, agrega el texto de la funcion anterior
        alertValidaciones.style.display="block";
        txtNumber.style.border = "solid red thin";
        isValid=false;
    }

    if(isValid){
        contador++; //agregamos contador aqui para que vaya contando ordenando los items en la tabla
        precio = getPrecio();
        let row = `<tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>;
        ` //tr es de r de row, td es d de data

        // guardamos los datos de la tabla la variable elemento
        let elemento = `{"id": ${contador}, 
                        "nombre": "${txtNombre.value}", 
                        "cantidad": "${txtNumber.value}",  
                        "precio": ${precio}
        }`;  //nombre y cantidad son strings, por eso se deben poner entre comillas

        //convertimos la variable de elemento de cadena a objeto
        //lo almacenamos en la variable datos que creamos anteriormente
        datos.push(JSON.parse(elemento)); //con push agregamos el ahora objeto elemento al array de datos (que estaba vacio)

        localStorage.setItem("datos", JSON.stringify(datos));  //transformamos el array de datos nuevamente a string para agregarlos al localStorage

        cuerpoTabla.insertAdjacentHTML("beforeend", row); //se especifica que el valor se agrege justo dentro de la tabla, después de su último elemento hijo.
        //limpamos los campos en cuando se agrega el producto a la tabla
        
        contadorProductos.innerText= contador;   //ira sumando la cantidad de productos
        totalEnProductos += parseFloat(txtNumber.value);    //ira contando el numero de los productos
        costoTotal += precio * parseFloat(txtNumber.value); //ira sumando los precios de los productos y dara un total

        productosTotal.innerText=totalEnProductos;  //el numero de productos se mostrará en el campo de Total en Productos (id = productosTotal, let declarada arriba)
        precioTotal.innerText= `${costoTotal.toFixed(2)}`; //el precio total se mostrará en el campo de Total (id = precioTotal, let declarada arriba), aqui si podemos usar
        //toFixed porque no hay problema si nos regresa el valor como string. 
        
        //definimos el localStorage
        //todo lo que guardamos en un localStorage es una string
        localStorage.setItem("contador", contador); //primero agregamos una llave entre "", luego referimos de donde vendra el valor de la llave
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

 // setItem() : cuando reciba una clave y un valor, añadirá estos al almacén, o actualizará el valor si la clave ya existe.



        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus(); //regresa el enfoque al campo de nombre en cuanto se agrega el producto a la tabla


    }
});

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";  //para que quite el texto ingresado 
    txtNumber.value = ""; // "" indica que no quedará nada en el campo
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=false;
//aqui especificamos que el boton de Limpiar tambien debe limpiar la sección de RESUMEN
    cuerpoTabla.innerHTML="";  //aqui usamos innerHTML porque anteriormente usamos insertAdjacentHTML para modificar el cuerpoTabla
   
   //para que se limpie todo todo  
    contador=0;
    totalEnProductos=0;
    costoTotal=0;
    localStorage.setItem("contador", contador); //primero agregamos una llave entre "", luego referimos de donde vendra el valor de la llave
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos= new Array();
    localStorage.removeItem("datos"); //quitamos lo que esta dentro del array
   
    contadorProductos.innerText=contador; // aqui usamos innerText porque solo mostramos el texto sin modificar una estructura de HTML (como la tabla)
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;

});


window.addEventListener("load", function(event){  //para que cuanto actualicemos la pagina no se pierdan los valores, usamos las llaves que hicimos para el localStorage
    event.preventDefault();
    if (this.localStorage.getItem("contador")!=null){  //validamos que el valor no sea nulo
        contador=Number(this.localStorage.getItem("contador"));  //como los elementos de localstorage se guaradn como cadena, convertimos el valor a Number()
    }//if contador
    if (this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos=Number(this.localStorage.getItem("totalEnProductos"));  //ponemos this porque el objeto esta dentro de la aventana y no del documento, no hay problema si lo quitamos
    }//if totalEnProductos
    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal=Number(this.localStorage.getItem("costoTotal"));
    }//if costoTotal
    if (this.localStorage.getItem("datos")!=null){
        datos=JSON.parse(this.localStorage.getItem("datos"));  //lo convertimos a string
        datos.forEach((r) => { //creo que la r se refiere a las columnas (row)
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
            </tr>`;

            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }//if costoTotal

    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
}); //window load
