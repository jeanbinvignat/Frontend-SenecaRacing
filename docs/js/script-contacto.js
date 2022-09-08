
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
    mostrarExito("Se guardo correctamente su suscripción") 
}

function getCategorias() {
    let inputCategorias = document.querySelectorAll("input[name='categorias'].value")
    let arrCategorias   = [];
    
    for(let i = 0; i < inputCategorias.length; i++ ) {
        const categorias = inputCategorias[i].value;
        arrCategorias.push(categorias);
    }

    return arrCategorias;
    
}

function getIntereses() {
    let inputIntereses = document.querySelectorAll("input[name='intereses']:checked")
    let arrIntereses   = [];

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
        throw new Error("Debe seleccionar un género!!!");
    }
    const genero = inputSeleccionado.value;
    return genero;
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