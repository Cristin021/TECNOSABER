// =========================
// DATOS QUEMADOS DE PRUEBA
// =========================
var usuarioDemo = {
  eps: "SALUD TOTAL",
  correo: "adulto@saber.com",
  cedula: "1234567890",
  nombre: "Doña María Pérez",
  medicamentos: [
    { id: 1, nombre: "Losartán 50mg", dosis: "1 tableta cada 12 horas" },
    { id: 2, nombre: "Metformina 850mg", dosis: "1 tableta después de cada comida" },
    { id: 3, nombre: "Omeprazol 20mg", dosis: "1 cápsula en ayunas" }
  ]
};

function $(id) {
  return document.getElementById(id);
}

function showToast(texto) {
  var toast = $("toast");
  toast.textContent = texto;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

// =========================
// INICIALIZACIÓN
// =========================
window.onload = function () {
  // LOGIN
  $("btnLogin").onclick = manejarLogin;

  // Botones de módulos (después del login también funcionan)
  $("btnCita").onclick = solicitarCita;
  $("btnMeds").onclick = solicitarMedicamentos;
  $("btnContacto").onclick = enviarContacto;
};

// =========================
// LOGIN
// =========================
function manejarLogin() {
  var eps = $("eps").value.trim().toUpperCase();
  var correo = $("correo").value.trim().toLowerCase();
  var cedula = $("cedula").value.trim();
  var msg = $("loginMsg");

  if (!eps || !correo || !cedula) {
    msg.textContent = "Por favor complete todos los campos.";
    msg.className = "msg msg-error";
    msg.style.display = "block";
    return;
  }

  if (
    eps === usuarioDemo.eps &&
    correo === usuarioDemo.correo &&
    cedula === usuarioDemo.cedula
  ) {
    msg.style.display = "none";
    $("login-card").style.display = "none";
    $("mainContent").style.display = "block";
    $("nombreUsuario").textContent = usuarioDemo.nombre;
    cargarMedicamentos();
    showToast("Ingreso correcto. Bienvenido a SABER+.");
  } else {
    msg.textContent = "Datos no válidos. Use los datos de prueba indicados.";
    msg.className = "msg msg-error";
    msg.style.display = "block";
  }
}

// =========================
// MÓDULO MEDICAMENTOS
// =========================
function cargarMedicamentos() {
  var contLista = $("listaMedicamentos");
  var contChecks = $("checkboxMedicamentos");
  contLista.innerHTML = "";
  contChecks.innerHTML = "";

  for (var i = 0; i < usuarioDemo.medicamentos.length; i++) {
    var med = usuarioDemo.medicamentos[i];

    // Lista visual tipo chips
    var chip = document.createElement("span");
    chip.textContent = med.nombre + " · " + med.dosis;
    contLista.appendChild(chip);

    // Checkbox de selección
    var div = document.createElement("div");
    div.style.marginBottom = "4px";

    var chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = "med_" + med.id;
    chk.value = med.nombre;

    var lbl = document.createElement("label");
    lbl.htmlFor = chk.id;
    lbl.textContent = med.nombre + " (" + med.dosis + ")";

    div.appendChild(chk);
    div.appendChild(lbl);
    contChecks.appendChild(div);
  }
}

function solicitarMedicamentos() {
  var contChecks = $("checkboxMedicamentos");
  var inputs = contChecks.querySelectorAll("input[type=checkbox]");
  var seleccionados = [];
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      seleccionados.push(inputs[i].value);
    }
  }

  var msg = $("medsMsg");
  if (seleccionados.length === 0) {
    msg.textContent = "Seleccione al menos un medicamento.";
    msg.className = "msg msg-error";
    msg.style.display = "block";
    return;
  }

  msg.textContent =
    "Se registró la entrega para: " +
    seleccionados.join(", ") +
    ". Nos comunicaremos para confirmar la fecha.";
  msg.className = "msg msg-success";
  msg.style.display = "block";
  showToast("Solicitud de medicamentos registrada.");
}

// =========================
// MÓDULO CITAS
// =========================
function solicitarCita() {
  var esp = $("especialidad").value;
  var fecha = $("fechaCita").value;
  var hora = $("horaCita").value;
  var msg = $("citaMsg");

  if (!esp || !fecha || !hora) {
    msg.textContent = "Complete especialidad, fecha y hora.";
    msg.className = "msg msg-error";
    msg.style.display = "block";
    return;
  }

  var texto =
    "Su cita de " +
    esp +
    " ha sido agendada para el día " +
    fecha +
    " a las " +
    hora +
    ". Recibirá un recordatorio por correo.";

  msg.textContent = texto;
  msg.className = "msg msg-success";
  msg.style.display = "block";
  showToast("Cita médica registrada.");
}

// =========================
// CONTACTO
// =========================
function enviarContacto() {
  var nombre = $("contactNombre").value.trim();
  var mensaje = $("contactMensaje").value.trim();

  if (!nombre || !mensaje) {
    showToast("Complete su nombre y mensaje.");
    return;
  }

  showToast("Gracias por escribirnos, " + nombre + ".");
  $("contactMensaje").value = "";
}
