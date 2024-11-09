// Array com todas as receitas e seus detalhes (links para as receitas) 
const allRecipes = [
    { name: 'Arroz com Pequi', link: '#arroz-com-pequi' },
    { name: 'Galinhada Tocantinense', link: '#galinhada-tocantinense' },
    { name: 'Empadão Tocantinense', link: '#empadao-tocantinense' },
    { name: 'Pamonha', link: '#pamonha' },
    { name: 'Beijinho de Coco', link: '#beijinho-de-coco' },
    { name: 'Peixe na Telha', link: '#peixe na Telha' },
    { name: 'Pirão de Peixe', link: '#pirão de Peixe' },
    { name: 'Paçoca de Carne Seca', link: '#paçoca de Carne Seca' },
    { name: 'Sopa Paraguaia', link: '#sopa Paraguaia' }
];

// Função para exibir a seção correspondente ao menu clicado
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Função para alternar a exibição dos detalhes da receita
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        button.innerHTML = 'Ocultar Detalhes <i class="fas fa-angle-up"></i>';
    } else {
        details.style.display = "none";
        button.innerHTML = 'Mostrar Detalhes <i class="fas fa-angle-down"></i>';
    }
}

// Função de busca de receitas
function searchRecipes() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe');

    let found = false; // Variável para verificar se a receita foi encontrada

    recipes.forEach(recipe => {
        const recipeTitle = recipe.querySelector('h3').textContent.toLowerCase();
        if (recipeTitle.includes(input)) {
            recipe.style.display = 'block';
            found = true; // A receita foi encontrada
        } else {
            recipe.style.display = 'none';
        }
    });

    // Se uma receita foi encontrada, muda para a seção de receitas
    if (found) {
        showSection('receitas');
        addToHistory(input); // Adiciona a pesquisa ao Histórico
    }
}

// Função para atualizar as sugestões de receitas
document.getElementById('searchInput').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Limpa sugestões anteriores

    if (input) {
        const filteredRecipes = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(input)
        );

        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = recipe.name;
            li.classList.add('suggestion-item');
            li.onclick = function() {
                document.getElementById('searchInput').value = recipe.name; // Preenche o input com a sugestão
                suggestionsList.innerHTML = ''; // Limpa sugestões
                searchRecipes(); // Chama a função de busca
            };
            suggestionsList.appendChild(li);
        });
    }
});

// Função para adicionar receitas ao histórico
function addToHistory(recipeName) {
    const historicoList = document.getElementById('historicoList');

     // Verifica se a receita já está no histórico antes de adicionar
     if (Array.from(historicoList.children).some(item => item.textContent.toLowerCase().includes(recipeName.toLowerCase()))) {
        return; // Já está no histórico, não adiciona novamente
    }
    
    // Filtra a receita correspondente ao nome pesquisado
    const recipe = allRecipes.find(r => r.name.toLowerCase().includes(recipeName.toLowerCase()));
    
    if (recipe) {
        const newItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = recipe.link; // Link para a receita
        link.textContent = recipe.name; // Nome da receita
        // Remover event.preventDefault(), pois estamos usando um link de navegação real
        newItem.classList.add('historico-item');
        newItem.appendChild(link);
        historicoList.appendChild(newItem);
    }
}

// Função para mostrar a receita ao clicar no histórico
function showRecipe(recipeLink) {
    const recipeSection = document.querySelector(recipeLink);
    if (recipeSection) {
        showSection('receitas'); // Mostra a seção de receitas
        window.scrollTo({ top: recipeSection.offsetTop, behavior: 'smooth' }); // Rola para a receita
    }
}

// Função para inicializar a navegação e o histórico
document.addEventListener('DOMContentLoaded', () => {
    showSection('pesquisa');
});
