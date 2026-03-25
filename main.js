// Lista de perfis que vêm do arquivo padrão (JSON hospedado)
let perfisPadrao = [];
// Lista de perfis utilizados na interface (padrão ou persistidos localmente)
let perfis = [];

// Carrega perfis padrão do arquivo JSON. Se falhar, tenta carregar apenas os salvos localmente.
fetch('./assets/Data/Perfis.json')
  .then(response => {
    if (!response.ok) throw new Error('Não foi possível buscar o JSON de perfis.');
    return response.json();
  })
  .then(data => {
    perfisPadrao = data;
    carregarPerfis();
  })
  .catch(error => {
    console.error('Erro ao carregar perfis padrão:', error);
    carregarPerfis(); // Mesmo sem padrão, tenta carregar perfis salvos em localStorage
  });

function carregarPerfis() {
  // Verifica se o navegador já tem perfis salvos localmente
  const salvos = localStorage.getItem('perfis');
  if (salvos) {
    try {
      perfis = JSON.parse(salvos);
    } catch (parseError) {
      console.error('Erro ao parsear localStorage:', parseError);
      perfis = [...perfisPadrao];
    }
  } else {
    // Sem dados salvos, usa os perfis padrão do JSON
    perfis = [...perfisPadrao];
  }

  renderizarPerfis();
}

function renderizarPerfis() {
  const ul = document.querySelector('.profiles');
  ul.innerHTML = '';

  // Renderiza cada perfil disponível na lista
  perfis.forEach(perfil => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'profile';

    const img = document.createElement('img');
    img.src = perfil.foto;
    img.alt = `Perfil ${perfil.nome}`;
    img.onerror = function() {
      // URL fallback caso a imagem não carregue
      this.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';
    };

    const p = document.createElement('p');
    p.textContent = perfil.nome;

    button.appendChild(img);
    button.appendChild(p);
    li.appendChild(button);
    ul.appendChild(li);
  });

  // Cria botão de adicionar novo perfil (sempre visível no fim da lista)
  const liAdd = document.createElement('li');
  const buttonAdd = document.createElement('button');
  buttonAdd.className = 'profile';
  buttonAdd.id = 'add-profile';

  const span = document.createElement('span');
  span.textContent = '+';

  const pAdd = document.createElement('p');
  pAdd.textContent = 'Adicionar perfil';

  buttonAdd.appendChild(span);
  buttonAdd.appendChild(pAdd);
  liAdd.appendChild(buttonAdd);
  ul.appendChild(liAdd);

  // Ligando evento ao botão de novo perfil.
  document.getElementById('add-profile').addEventListener('click', adicionarPerfil);
}

function adicionarPerfil() {
  // Input simples via prompt (considerar futuro modal/HTML para melhor UX)
  const nome = prompt('Digite o nome do perfil:');
  if (!nome) return;

  const foto = prompt('Digite a URL da foto do perfil:');
  if (!foto) return;

  const novoPerfil = { nome, foto };
  perfis.push(novoPerfil);

  // Persiste no localStorage para futuros acessos (funciona em GitHub Pages)
  localStorage.setItem('perfis', JSON.stringify(perfis));

  // Re-renderiza lista com o novo perfil incluso
  renderizarPerfis();
}

