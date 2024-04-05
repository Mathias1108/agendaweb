document.addEventListener('DOMContentLoaded', function() {
  const barbersList = document.getElementById('barbers-list');

  // Nombres de los barberos
  const barbersData = [
    { name: 'Mathias', availability: true },
    { name: 'Santiago', availability: true },
    { name: 'Mauricio', availability: true },
    { name: 'Kevin', availability: true },
    { name: 'Lea', availability: true }
  ];

  const horarios = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  // Función para renderizar los barberos
  function renderBarbers() {
    barbersList.innerHTML = '';
    barbersData.forEach(barber => {
      const barberElement = document.createElement('div');
      barberElement.classList.add('barber');
      barberElement.innerHTML = `
        <p>${barber.name}</p>
      `;
      const horariosElement = document.createElement('div');
      horariosElement.classList.add('horarios');
      horarios.forEach(horario => {
        const span = document.createElement('span');
        span.textContent = horario;
        
        // Verificar si hay un color guardado para este horario
        const savedColor = localStorage.getItem(`${barber.name}-${horario}`);
        if (savedColor) {
          span.style.backgroundColor = savedColor;
        }
        
        span.addEventListener('click', function() {
          const currentColor = span.style.backgroundColor;
          const newColor = currentColor === 'green' ? '' : 'green';
          span.style.backgroundColor = newColor;
          
          // Guardar el color modificado en el almacenamiento local
          localStorage.setItem(`${barber.name}-${horario}`, newColor);
        });
        horariosElement.appendChild(span);
      });
      barberElement.appendChild(horariosElement);
      barbersList.appendChild(barberElement);
    });
  }

  // Renderizar barberos al cargar la página
  renderBarbers();
});
