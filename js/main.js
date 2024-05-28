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

//funcion para validar el campo de Cantidad, se puso en funcion porque se van a
//validar muchas cosas

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    } //if legth
    return true;
} // Validar Cantidad



btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    // primero se debe validar que tengamos texto o numeros en los campos

    //aqui primero especificamos que si las funciones de abajo no se cumplen, no se muestren
    //alertas
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";

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
    }
})

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value = "";  //para que quite el texto ingresado 
    txtNumber.value = ""; // "" indica que no quedará nada en el campo
})
