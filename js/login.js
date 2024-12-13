document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const passwordInput = document.getElementById("password");
  const errorNombre = document.getElementById("error-nombre");
  const errorPassword = document.getElementById("error-password");
  const limpiarBtn = document.getElementById("limpiar");
  const entrarBtn = document.getElementById("entrar");

  const validarNombre = (nombre) => {
    if (!nombre) return "El campo nombre es obligatorio.";
    if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,20}$/.test(nombre)) return "El nombre solo puede contener letras y espacios, y no más de 20 caracteres.";
    if (nombre.length > 20) return "El nombre no puede tener más de 20 caracteres.";
    return "";
  };

  const validarPassword = (password) => {
    if (!password) return "El campo contraseña es obligatorio.";
    if (!/^[a-zA-Z0-9·$%&/()]{8,16}$/.test(password)) {
      return "La contraseña debe tener entre 8 y 16 caracteres y solo puede incluir letras, números y los caracteres ·$%&/().";
    }
    return "";
  };

  const actualizarErrores = () => {
    const nombreError = validarNombre(nombreInput.value.trim());
    const passwordError = validarPassword(passwordInput.value.trim());

    errorNombre.textContent = nombreError;
    errorPassword.textContent = passwordError;
  };

  nombreInput.addEventListener("input", actualizarErrores);
  passwordInput.addEventListener("input", actualizarErrores);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    actualizarErrores();

    if (!errorNombre.textContent && !errorPassword.textContent) {
      const successMessage = document.createElement("p");
      successMessage.textContent = "Acceso concedido. Redirigiendo...";
      successMessage.style.color = "green";
      successMessage.id = "success-message";
      form.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
        window.location.href = "main.html";
      }, 2000);
    }
  });

  limpiarBtn.addEventListener("click", () => {
    nombreInput.value = "";
    passwordInput.value = "";
    errorNombre.textContent = "";
    errorPassword.textContent = "";
  });

  entrarBtn.addEventListener("mouseover", () => {
    entrarBtn.classList.add("hovered");
  });

  entrarBtn.addEventListener("mouseout", () => {
    entrarBtn.classList.remove("hovered");
  });
});