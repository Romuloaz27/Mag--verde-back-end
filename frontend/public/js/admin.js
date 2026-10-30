// ============================================================
// admin.js — conecta o Painel Administrativo à API do back-end
// ============================================================

const API_URL = 'http://127.0.0.1:3001'; // ajuste se a porta/host mudar

const placesTableBody = document.getElementById('placesTableBody');
const placeForm = document.getElementById('placeForm');

const availabilityPlaceSelect = document.getElementById('availabilityPlace');
const availabilityForm = document.getElementById('availabilityForm');
const availabilityTableBody = document.getElementById('availabilityTableBody');

let currentPlaces = []; // guarda a lista de atrações carregada, para reaproveitar no select

// ------------------------------------------------------------
// Utilitário central para chamar a API.
// Sempre manda o cookie de sessão (credentials: 'include') e,
// se a resposta for 401/403, entende que a sessão expirou ou
// que o usuário não está logado como admin — manda de volta
// para o login.
// ------------------------------------------------------------
async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (response.status === 401 || response.status === 403) {
    alert('Sua sessão expirou ou você não tem permissão de administrador. Faça login novamente.');
    window.location.href = 'login.html';
    throw new Error('Não autorizado');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao comunicar com o servidor');
  }

  return data.message;
}

// ------------------------------------------------------------
// ATRAÇÕES (places)
// ------------------------------------------------------------

async function loadPlaces() {
  try {
    currentPlaces = await apiFetch('/places');
    renderPlacesTable();
    renderAvailabilityPlaceOptions();
  } catch (error) {
    console.error(error);
    placesTableBody.innerHTML = `<tr><td class="td" colspan="4">Não foi possível carregar as atrações. O servidor está rodando?</td></tr>`;
  }
}

function renderPlacesTable() {
  if (currentPlaces.length === 0) {
    placesTableBody.innerHTML = `<tr><td class="td" colspan="4">Nenhuma atração cadastrada ainda.</td></tr>`;
    return;
  }

  placesTableBody.innerHTML = currentPlaces.map((place) => `
    <tr data-id="${place.id}">
      <td class="td">${place.name}</td>
      <td class="td">${place.location}</td>
      <td class="td">${place.description}</td>
      <td class="td actions">
        <button class="edit-btn" data-action="edit-place" data-id="${place.id}">Editar</button>
        <button class="delete-btn" data-action="delete-place" data-id="${place.id}">Excluir</button>
      </td>
    </tr>
  `).join('');
}

placeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(placeForm);
  const payload = {
    name: formData.get('name'),
    location: formData.get('location'),
    description: formData.get('description'),
  };

  try {
    await apiFetch('/places', { method: 'POST', body: JSON.stringify(payload) });
    placeForm.reset();
    await loadPlaces();
  } catch (error) {
    alert(error.message);
  }
});

placesTableBody.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'delete-place') {
    if (!confirm('Tem certeza que deseja excluir esta atração?')) return;
    try {
      await apiFetch(`/places/${id}`, { method: 'DELETE' });
      await loadPlaces();
    } catch (error) {
      alert(error.message);
    }
  }

  if (action === 'edit-place') {
    const place = currentPlaces.find((p) => p.id === id);
    if (!place) return;

    const name = prompt('Nome:', place.name);
    if (name === null) return;
    const location = prompt('Localização:', place.location);
    if (location === null) return;
    const description = prompt('Descrição:', place.description);
    if (description === null) return;

    try {
      await apiFetch(`/places/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, location, description }),
      });
      await loadPlaces();
    } catch (error) {
      alert(error.message);
    }
  }
});

// ------------------------------------------------------------
// DISPONIBILIDADE (availability)
// ------------------------------------------------------------

function renderAvailabilityPlaceOptions() {
  const placeholder = '<option value="" disabled selected>Selecione uma atração</option>';
  availabilityPlaceSelect.innerHTML = placeholder + currentPlaces.map((place) =>
    `<option value="${place.id}">${place.name}</option>`
  ).join('');
}

async function loadAvailability(placeId) {
  if (!placeId) {
    availabilityTableBody.innerHTML = `<tr><td class="td" colspan="4">Selecione uma atração acima para ver a disponibilidade.</td></tr>`;
    return;
  }

  try {
    const availabilities = await apiFetch(`/availability/${placeId}`);
    renderAvailabilityTable(availabilities);
  } catch (error) {
    console.error(error);
    availabilityTableBody.innerHTML = `<tr><td class="td" colspan="4">Não foi possível carregar a disponibilidade.</td></tr>`;
  }
}

function renderAvailabilityTable(availabilities) {
  if (!availabilities || availabilities.length === 0) {
    availabilityTableBody.innerHTML = `<tr><td class="td" colspan="4">Nenhum registro de disponibilidade para esta atração.</td></tr>`;
    return;
  }

  availabilityTableBody.innerHTML = availabilities.map((item) => `
    <tr data-id="${item.id}">
      <td class="td">${new Date(item.date).toLocaleDateString('pt-BR')}</td>
      <td class="td">${item.isOpen ? 'Aberto' : 'Fechado'}</td>
      <td class="td">${item.notes || '-'}</td>
      <td class="td actions">
        <button class="delete-btn" data-action="delete-availability" data-id="${item.id}">Excluir</button>
      </td>
    </tr>
  `).join('');
}

availabilityPlaceSelect.addEventListener('change', (event) => {
  loadAvailability(event.target.value);
});

availabilityForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(availabilityForm);
  const placeId = formData.get('placeId');
  const payload = {
    placeId,
    date: new Date(formData.get('date')).toISOString(),
    isOpen: formData.get('isOpen') === 'true',
    notes: formData.get('notes'),
  };

  try {
    await apiFetch('/availability', { method: 'POST', body: JSON.stringify(payload) });
    availabilityForm.reset();
    availabilityPlaceSelect.value = placeId; // mantém a atração selecionada
    await loadAvailability(placeId);
  } catch (error) {
    alert(error.message);
  }
});

availabilityTableBody.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'delete-availability') {
    if (!confirm('Tem certeza que deseja excluir este registro?')) return;
    try {
      await apiFetch(`/availability/${id}`, { method: 'DELETE' });
      await loadAvailability(availabilityPlaceSelect.value);
    } catch (error) {
      alert(error.message);
    }
  }
});

// ------------------------------------------------------------
// Inicialização
// ------------------------------------------------------------
loadPlaces();
