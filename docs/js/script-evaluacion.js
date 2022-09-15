window.addEventListener('DOMContentLoaded', (e) => {
    
    console.log("DOMContentLoaded(formulario en funcionamiento)");

    let boton = document.getElementById("btn-enviarform")
   
    boton.addEventListener("click", (ev) => {
        try {
        let email = document.getElementById("correo").value;
        let aspecto = getAspectoR();
        let orden = getOrdenR();
        let responsividad = getResponsividadR();
        let comentarios = document.getElementById("comentarios").value;
        let encuestado = {
            email,
            aspecto,
            orden,
            responsividad,
            comentarios,
            fecha_registro: (new Date()).toISOString()
        };
        console.log("El email del usuarios es: " + email );    
        console.dir(encuestado);
        guardarEncuestado( encuestado );
;
        } catch(e) {
            mostrarError(e.message)
        }
    });
});

async function guardarEncuestado( encuestado ) {
    const url = "https://seneca-racing-default-rtdb.firebaseio.com/encuestados.json";
    const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(encuestado)
    });
    const data = await respuesta.json();
    mostrarExito("Se guardo correctamente su respuesta") 
}

function getAspectoR() {
    let inputSeleccionado1 = document.querySelector("input[name='aspecto']:checked")
    if ( inputSeleccionado1 == null ) {
        throw new Error("Debe seleccionar una opción!!! (campo 1)");
    }
    const aspecto = inputSeleccionado1.value;
    return aspecto;
}

function getOrdenR() {
    let inputSeleccionado2 = document.querySelector("input[name='orden']:checked")
    if ( inputSeleccionado2 == null ) {
        throw new Error("Debe seleccionar una opción!!! (campo 2)");
    }
    const orden = inputSeleccionado2.value;
    return orden;
}

function getResponsividadR() {
    let inputSeleccionado3 = document.querySelector("input[name='responsividad']:checked")
    if ( inputSeleccionado3 == null ) {
        throw new Error("Debe seleccionar una opción!!! (campo 3)");
    }
    const responsividad = inputSeleccionado3.value;
    return responsividad;
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