function actualizarEstado() {
  const materias = document.querySelectorAll('.materia');
  const aprobadas = new Set();

  materias.forEach(materia => {
    if (materia.classList.contains('aprobada')) {
      aprobadas.add(materia.dataset.id);
    }
  });

  materias.forEach(materia => {
    const correlativas = materia.dataset.correlativas ? materia.dataset.correlativas.split(',') : [];

    if (correlativas.length === 0 || correlativas.every(correlativa => aprobadas.has(correlativa.trim()))) {
      materia.classList.remove('bloqueada');
      if (!materia.classList.contains('aprobada')) {
        materia.style.cursor = 'pointer';
      }
    } else {
      if (!materia.classList.contains('aprobada')) {
        materia.classList.add('bloqueada');
        materia.style.cursor = 'not-allowed';
      }
    }
  });
}

document.getElementById('malla').addEventListener('click', e => {
  const target = e.target;
  if (!target.classList.contains('materia')) return;
  if (target.classList.contains('bloqueada')) return;

  target.classList.toggle('aprobada');
  actualizarEstado();
});

// Inicializo los estados al cargar la página
actualizarEstado();
