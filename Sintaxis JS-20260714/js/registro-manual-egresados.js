console.log("Archivo JS cargado correctamente: registro-manual-egresados.js");
console.log("Hola Mundo");

/* Seleccionar los elementos del DOM */
const inputCedula = document.getElementById("identificacion");
const inputNombre = document.getElementById("nombre-completo");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputFechaRegistro = document.getElementById("fecha-registro");

const btnRegistrarEgresado = document.getElementById("guardar-egresado");

// Todos los campos obligatorios 
const inputsRequeridos = document.querySelectorAll("input[required]");

function validarCedula(numeroCedula) {
    return /^[0-9]{9}$/.test(numeroCedula);
}

function validarNombreCompleto(nombre) {
    return nombre.length >= 2;
}

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Uno o más caracteres que no sean espacios ni arrobas, seguido de una arroba, otro bloque similar, un punto y otro bloque final sin espacios ni arrobas.
}

function validarTelefono(telefono) {
    return /^[0-9]{8,12}$/.test(telefono); // Dígitos numéricos, con una longitud total de entre 8 y 12 caracteres, desde el inicio hasta el final
}

function establecerFechaActual() {
    const hoy = new Date(); // Objeto Date que representa la fecha y hora actual 
    const anio = hoy.getFullYear();
    /* 
    getMonth(): Devuelve el mes como un número de 0 al 11
              + 1: Mes del 1 al 12
    padStart(2, "0"): en los meses de solo un número (1 - 9) agrega un 0 antes (01 - 09)
    */
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
    const dia = String(hoy.getDate()).padStart(2, '0');
    /*
    A inputFechaRegistro se le asigna el atributo value interpolando las variables
    */
    inputFechaRegistro.value = `${anio}-${mes}-${dia}`;
}

function resaltarCamposVacios() {
    let error = false; // Asumir que no hay error 

    // Identificación
    const cedula = inputCedula.value.trim();
    if (!validarCedula(cedula)) { // No cumple con el formato
        inputCedula.classList.add("input-error");
        error = true;
    } else {
        inputCedula.classList.remove("input-error");
    }

    // Nombre
    const nombre = inputNombre.value.trim();
    if (!validarNombreCompleto(nombre)) {
        inputNombre.classList.add("input-error");
        error = true;
    } else {
        inputNombre.classList.remove("input-error");
    }

    // Correo
    const correo = inputCorreo.value.trim();
    if (!validarCorreo(correo)) {
        inputCorreo.classList.add("input-error");
        error = true;
    } else {
        inputCorreo.classList.remove("input-error");
    }

    // Teléfono
    const telefono = inputTelefono.value.trim();
    if (!validarTelefono(telefono)) {
        inputTelefono.classList.add("input-error");
        error = true;
    } else {
        inputTelefono.classList.remove("input-error");
    }

    return error;
}

function validarCamposVacios() {
    const error = resaltarCamposVacios();
    console.log(validarCedula(inputCedula.value.trim()));
    console.log(validarNombreCompleto(inputNombre.value.trim()));
    console.log(validarCorreo(inputCorreo.value.trim()));
    console.log(validarTelefono(inputTelefono.value.trim()));
    if (error) {
        Swal.fire({
            title: "No se puede registrar el egresado",
            text: "Complete los campos resaltados.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
    } else {
        Swal.fire({
            title: "Egresado registrado correctamente",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
}

establecerFechaActual();

// Evento del botón guardar/registrar 
btnRegistrarEgresado.addEventListener("click", validarCamposVacios);

