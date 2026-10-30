const loginForm = document.querySelector('.loginForm');

// URL base da API do back-end. Ajuste se a porta/host for diferente.
const API_URL = 'http://127.0.0.1:3001';

async function handleFormSubmit(event) {
  event.preventDefault();
  const { target: { emailInput, passwordInput } } = event;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // necessário para receber/enviar o cookie de sessão
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Credenciais inválidas');
      return;
    }

    // (Opcional) o servidor retorna o usuário logado em data.message
    if (data.message && data.message.role !== 'admin') {
      alert('Esta conta não tem permissão de administrador');
      return;
    }

    window.location.href = 'admin.html';
  } catch (error) {
    console.error(error);
    alert('Não foi possível conectar ao servidor. Verifique se o back-end está rodando.');
  }
}

loginForm.addEventListener('submit', handleFormSubmit);
