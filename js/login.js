function comprobarVacio(x) {
  return x.trim() !== "";
}

function mostrarError(errorElemento, mostrar) {
  if (mostrar) {
      errorElemento.style.display = "block";
  } else {
      errorElemento.style.display = "none";
  }
}

function validarNombre() {
  let nombre = document.querySelector("#nombre");
  let error = document.querySelector("#error-nombre");
  let comprobacion = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  if (!comprobarVacio(nombre.value)) {
      error.textContent = 'Nombre obligatorio';
      mostrarError(error, true);
      return false;
  } else if (!comprobacion.exec(nombre.value)) {
      error.textContent = "Nombre inválido";
      mostrarError(error, true);
      return false;
  } else if (nombre.value.length > 20) {
      error.textContent = "El nombre no puede tener más de 20 caracteres";
      mostrarError(error, true);
      return false;
  }

  mostrarError(error, false);
  return true;
}

function validarContraseña() {
  let contraseña = document.querySelector("#password");
  let error = document.querySelector("#error-password");
  let comprobacion = /^[a-zA-Z0-9·$%&/().]{8,16}$/;

  if (!comprobarVacio(contraseña.value)) {
      error.textContent = "La contraseña es obligatoria.";
      mostrarError(error, true);
      return false;
  } else if (!comprobacion.exec(contraseña.value)) {
      error.textContent = "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
      mostrarError(error, true);
      return false;
  }

  mostrarError(error, false);
  return true;
}

function limpiarDatos() {
  let formulario = document.querySelector("#formulario");
  formulario.reset();

  let errores = document.querySelectorAll(".error-message");
  errores.forEach((error) => {
      error.style.display = "none";
      error.textContent = "";
  });
}

function validarFormulario(event) {
  event.preventDefault();

  let nombreValido = validarNombre();
  let contraseñaValida = validarContraseña();

  if (!nombreValido || !contraseñaValida) {
    alert("Compruebe los datos introducidos");
    return;
  }

  window.location.href = "./main.html";
}

// Event listeners
let nombre = document.querySelector("#nombre");
nombre.addEventListener("blur", validarNombre);

let contraseña = document.querySelector("#password");
contraseña.addEventListener("blur", validarContraseña);

let limpiar = document.querySelector("#limpiar");
limpiar.addEventListener("click", limpiarDatos);

let formulario = document.querySelector("#formulario");
formulario.addEventListener("submit", validarFormulario);