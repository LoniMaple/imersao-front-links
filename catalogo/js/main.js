import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Usamos o DOMContentLoaded para garantir que o HTML (profile-icon e kids-link) já exista
document.addEventListener('DOMContentLoaded', () => {
    
    // Recupera o perfil salvo no localStorage (usando a chave que seus outros scripts já usam)
    const perfilAtualString = localStorage.getItem('perfilAtual');

    if (perfilAtualString) {
        const perfilAtual = JSON.parse(perfilAtualString);

        // Atualiza o nome ao lado do sininho
        const nomeLink = document.querySelector('.kids-link');
        if (nomeLink) {
            nomeLink.textContent = perfilAtual.nome;
        }

        // Atualiza a imagem do perfil (Avatar no canto superior direito)
        const profileIcon = document.querySelector('.profile-icon');
        if (profileIcon) {
            let fotoCaminho = perfilAtual.foto;

            // CORREÇÃO DE CAMINHO:
            // Se a foto for um arquivo local (ex: ./assets/...) e não um link da internet (http),
            // precisamos adicionar "../" para ele sair da pasta 'catalogo' e achar a pasta 'assets'.
            if (!fotoCaminho.startsWith('http')) {
                // Remove o "./" inicial se existir e adiciona "../"
                fotoCaminho = '../' + fotoCaminho.replace(/^\.\//, '');
            }

            profileIcon.src = fotoCaminho;
            profileIcon.alt = `Perfil de ${perfilAtual.nome}`;
        }
    } else {
        // Caso o usuário tente acessar o catálogo diretamente sem escolher um perfil
        window.location.href = '../index.html';
    }

    // Carregamento normal dos carrosséis que já estava no seu script
    const container = document.getElementById('main-content');
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});