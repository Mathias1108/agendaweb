const calendar = document.getElementById('calendar');
const eventForm = document.getElementById('event-form');
const eventOutput = document.getElementById('event-output');
const eventsList = document.getElementById('events-list');
let selectedDate;
let events = {};

// Cargar eventos desde localStorage al iniciar
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
}

function generateCalendar(year, month) {
    const date = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = date.getDay();

    calendar.innerHTML = '';

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => selectDate(day));
        calendar.appendChild(dayElement);
    }
}

function selectDate(day) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    selectedDate = new Date(year, month, day);
    eventForm.classList.remove('hidden');
    eventsList.classList.remove('hidden');
    displayEvents();
}

document.getElementById('add-event').addEventListener('click', () => {
    const name = document.getElementById('event-name').value;
    const hour = document.getElementById('event-hour').value;
    const minute = document.getElementById('event-minute').value;

    if (name && hour && minute) {
        const dateKey = selectedDate.toISOString().split('T')[0];
        if (!events[dateKey]) events[dateKey] = [];
        events[dateKey].push({ name, time: `${hour}:${minute}` });

        // Guardar en localStorage
        localStorage.setItem('events', JSON.stringify(events));

        // Limpiar el formulario
        document.getElementById('event-name').value = '';
        document.getElementById('event-hour').value = '';
        document.getElementById('event-minute').value = '';
        displayEvents();
    }
});

document.getElementById('clear-events').addEventListener('click', () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    delete events[dateKey]; // Borrar eventos del día seleccionado
    localStorage.setItem('events', JSON.stringify(events)); // Actualizar localStorage
    displayEvents(); // Actualizar la visualización de eventos
});

function displayEvents() {
    const dateKey = selectedDate.toISOString().split('T')[0];
    eventOutput.innerHTML = '';

    if (events[dateKey]) {
        events[dateKey].forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.name} - ${event.time}`;
            eventOutput.appendChild(li);
        });
    }
}

// Inicializar el calendario y cargar eventos
loadEvents();
generateCalendar(new Date().getFullYear(), new Date().getMonth());
