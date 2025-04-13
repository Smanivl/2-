const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('#filter-buttons button');
const imageForm = document.getElementById('image-form');

let images = [];

// Функция для загрузки изображений из JSON
async function loadImages() {
    try {
        const response = await fetch('images.json');
        const data = await response.json();
        images = data;
        displayImages();
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }
}

// Функция для отображения изображений
function displayImages(filter = 'all') {
    gallery.innerHTML = '';
    images.forEach(image => {
        if (filter === 'all' || image.tags.includes(filter)) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${image.src}" alt="${image.title}">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <p><strong>Теги:</strong> ${image.tags.join(', ')}</p>
            `;
            gallery.appendChild(card);
        }
    });
}

// Обработчик событий для фильтров
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        displayImages(filter);
    });
});

// Обработчик событий для формы
imageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('image-input').files[0];
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const tags = document.getElementById('tags-input').value.split(',').map(tag => tag.trim());

    const reader = new FileReader();
    reader.onload = (event) => {
        images.push({
            src: event.target.result,
            title: title,
            description: description,
            tags: tags
        });
        displayImages();
        imageForm.reset(); // Сброс формы после добавления
    };
    reader.readAsDataURL(file);
});

// Загрузка изображений при загрузке страницы
loadImages();