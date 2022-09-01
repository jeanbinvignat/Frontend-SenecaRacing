
window.addEventListener('DOMContentLoaded', (e) => {
    console.log("evento DOMContentLoaded");
    let boton = document.getElementById("btn-suscribir")
    boton.addEventListener("click", (ev) => {
        try {
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("correo").value;
        let genero = getGenero();
        let categorias = getCategorias();
        let intereses = getIntereses();
        let suscriptor = {
            nombre_completo: nombre,
            email,
            genero,
            categorias,
            intereses,
            fecha_registro: (new Date()).toISOString()
        };
        console.log("El nombre del suscriptor es: " + nombre);    
        console.dir(suscriptor);
        guardarSuscriptor( suscriptor );
;
        } catch(e) {
            mostrarError(e.message)
        }
    });
});

async function guardarSuscriptor( suscriptor ) {
    const url = "https://seneca-racing-default-rtdb.firebaseio.com/suscripciones.json";
    const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(suscriptor)
    });
    const data = await respuesta.json();
    mostrarExito("Se guardo correctamente su sucripción") 
}

function getCategorias() {
    let inputCategorias = document.querySelectorAll("input[name='categorias'].value")
    let arrCategorias   = [];
    
    for(let i = 0; i < inputCategorias.length; i++ ) {
        const categorias = inputCategorias[i].value;
        arrCategorias.push(interes);
    }

    if( inputIntereses.length < 1 ) {
        mostrarError("Debe seleccionar al menos 1 tema de su interés!!!");
        return false;
    }
    return arrCategorias;
    
}

function getIntereses() {
    let inputIntereses = document.querySelectorAll("input[name='intereses']:checked")
    let arrIntereses   = [];

    //inputIntereses.forEach( nodoInteres => arrIntereses.push(nodoInteres.value) );
    for(let i = 0; i < inputIntereses.length; i++ ) {
        const interes = inputIntereses[i].value;
        arrIntereses.push(interes);
    }

    if( inputIntereses.length < 1 ) {
        mostrarError("Debe seleccionar al menos 1 tema de su interés!!!");
        return false;
    }
    return arrIntereses;
    
}

function getGenero() {
    let inputSeleccionado= document.querySelector("input[name='genero']:checked")
    if ( inputSeleccionado == null ) {
        //mostrarError("Debe seleccionar un género!!");
        throw new Error("Debe seleccionar un género!!!");
        //return false
    }
    const genero = inputSeleccionado.value;
    return genero;
}

const errores = [] // array vacío 
const nombre = getNombreDesdeForm();
const edad = getEdadDesdeForm();

if( !nombreEsValido(nombre)) {
    errores[0] = "El nombre no es válido";
} if( edad < 18) {
    errores[1] = "Debe ser mayor de edad";
}

if( errores.length > 0) {
    mostrarErrores(errores);
} else {
    guardarDatos(); 
}

function mostrarExito(mensaje) {
    document.getElementById("form-mensaje-exitoso").style.display = "block";
    const ul = document.querySelector("#form-mensaje-exitoso ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensaje);
    li.appendChild(liText);
    ul.appendChild(li);
}
function mostrarError(mensajeDeError) {
    //console.error(mensajeDeError);
    document.getElementById("form-mensaje-error").style.display = "block";
    const ul = document.querySelector("#form-mensaje-error ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensajeDeError);
    li.appendChild(liText);
    ul.appendChild(li);
}