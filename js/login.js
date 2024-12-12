document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const passwordInput = document.getElementById("password");
  const errorNombre = document.getElementById("error-nombre");
  const errorPassword = document.getElementById("error-password");
  const limpiarBtn = document.getElementById("limpiar");
  const entrarBtn = document.getElementById("entrar");

  // Validación al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validación del nombre
    const nombre = nombreInput.value.trim();
    if (!nombre) {
      errorNombre.textContent = "Nombre obligatorio.";
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,20}$/.test(nombre)) {
      errorNombre.textContent = "Nombre inválido.";
      isValid = false;
    } else if (nombre.length > 20) {
      errorNombre.textContent = "El nombre no puede tener más de 20 caracteres.";
      isValid = false;
    } else {
      errorNombre.textContent = "";
    }

    // Validación de la contraseña
    const password = passwordInput.value.trim();
    if (!password) {
      errorPassword.textContent = "La contraseña es obligatoria.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9·$%&/()]{8,16}$/.test(password)) {
      errorPassword.textContent =
        "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
      isValid = false;
    } else {
      errorPassword.textContent = "";
    }

    if (isValid) {
      alert("Acceso concedido. Bienvenido a CarbaShop!");
    }
  });

  // Limpiar el formulario y los mensajes de error
  limpiarBtn.addEventListener("click", () => {
    nombreInput.value = "";
    passwordInput.value = "";
    errorNombre.textContent = "";
    errorPassword.textContent = "";
  });

  // Cambiar el color del botón al pasar el ratón por encima
  entrarBtn.addEventListener("mouseover", () => {
    entrarBtn.style.backgroundColor = "#4CAF50"; // Cambia el color de fondo cuando el ratón está sobre el botón
    entrarBtn.style.color = "white"; // Cambia el color del texto
  });

  entrarBtn.addEventListener("mouseout", () => {
    entrarBtn.style.backgroundColor = ""; // Restaura el color de fondo original
    entrarBtn.style.color = ""; // Restaura el color del texto
  });

  // Limpiar errores cuando el usuario empieza a escribir
  nombreInput.addEventListener("input", () => {
    if (errorNombre.textContent) {
      errorNombre.textContent = "";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (errorPassword.textContent) {
      errorPassword.textContent = "";
    }
  });
});
