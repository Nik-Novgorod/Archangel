const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const showAllButton = document.getElementById('showAllButton');
const listContainer = document.getElementById('listContainer');
const lettersContainer = document.getElementById('lettersContainer');

// Предзагруженные записи (временные данные, если API не доступен)
let records = [
   /* { 
        id: 1, 
        fullName: 'Абрамов Василий Васильевич', 
        worker: "монах", 
        description: "1895 – родился и проживал в д. ВерколАПинежского р-на Архангельской обл. Был насельником Артемие-Веркольского монастыря Архангельской губернии.\n\n1937, 15 декабря - арестован по обвинению в \"контрреволюционной агитации\".\n\n1938, 2 января – постановлением особого совещания тройки УНКВД приговорен к расстрелу.\n\n1938, 11 января – расстрелян.\n\n1989, 31 мая – реабилитирован посмертно."
    },
    { id: 2, fullName: 'Петров Петр Петрович', worker: "прихожанин", description: 'Инженер по качеству' },
    { id: 3, fullName: 'Сидорова Мария Алексеевна', worker: "протоиерей", description: 'Бухгалтер' },
    { id: 4, fullName: 'Кузнецов Алексей Викторович', worker: "архиепископ", description: 'Дизайнер' },*/
];

// Функция создания элемента карточки
function createListItem(record) {

    console.log('Создание карточки для:', record); // Добавьте эту строку для отладки

    const li = document.createElement('li');
    li.className = 'list-item';

// 1. Создаем элемент для ФИО с проверкой всех возможных вариантов
    const nameEl = document.createElement('h3');
    const displayName =  record.full_name || 'ФИО не указано';
    nameEl.textContent = displayName;
    
    // 2. Добавляем красную подсветку для теста (убрать после проверки)
   // nameEl.style.color = 'red';
   // nameEl.style.fontWeight = 'bold';

    // 3. Добавляем обработчик клика только если есть ID
    if (record.id) {
        nameEl.style.cursor = 'pointer';
        nameEl.addEventListener('click', () => {
            window.location.href = `card${record.id}.html`;
        });
    }

    const workEl = document.createElement('p');
    workEl.textContent = `Статус: ${record.worker}`;

    const descEl = document.createElement('p');
    descEl.className = 'description-preview';
    descEl.textContent = record.description.length > 150 
        ? record.description.substring(0, 180) + '...' 
        : record.description;
    descEl.title = record.description;

    li.appendChild(nameEl);
    li.appendChild(workEl);
    li.appendChild(descEl);

    return li;
}

// Отрисовка списка
function renderList(recordsToRender) {
    listContainer.innerHTML = '';
    recordsToRender.forEach(record => {
        const item = createListItem(record);
        listContainer.appendChild(item);
    });
}

// Генерация кнопок букв
function generateLetterButtons() {

    console.log('Запуск generateLetterButtons');
    console.log('Текущие записи:', records);

    const firstLettersSet = new Set();
    records.forEach(r => {
        if (r.fullName && r.fullName.length > 0) {
            const firstLetter = r.fullName[0].toUpperCase();
            console.log(`Обработка: ${r.fullName} → Буква: ${firstLetter}`);
            firstLettersSet.add(firstLetter);
        }
    });
    
    console.log('Уникальные буквы:', Array.from(firstLettersSet).sort());
    
    const lettersArray = Array.from(firstLettersSet).sort();
    lettersContainer.innerHTML = '';
    
    lettersArray.forEach(letter => {
        /*const btn = document.createElement('button');
        btn.className = 'letter-button';
        btn.textContent = letter;
        btn.addEventListener('click', () => filterByLetter(letter));
        lettersContainer.appendChild(btn);*/
        console.log(`Создание кнопки для: ${letter}`);
        const btn = document.createElement('button');
        btn.className = 'letter-button';
        btn.textContent = letter;
        btn.style.margin = '0 5px'; // Временный стиль для видимости
        btn.style.padding = '5px 10px';
        btn.style.backgroundColor = '#f0f0f0'; // Яркий цвет для теста
        
        btn.addEventListener('click', () => {
            console.log(`Клик по букве: ${letter}`);
            filterByLetter(letter);
        });
        
        lettersContainer.appendChild(btn);
    });
    
}

// Фильтрация по букве
function filterByLetter(letter) {
    const filtered = records.filter(r => r.fullName && r.fullName[0].toUpperCase() === letter);
    renderList(filtered);
}

// Обработчики событий
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert('Введите ФИО для поиска');
        return;
    }
    const filtered = records.filter(r => r.fullName.toLowerCase().includes(query));
    renderList(filtered);
});

resetButton.addEventListener('click', () => {
    searchInput.value = '';
    renderList(records);
});

showAllButton.addEventListener('click', () => {
    renderList(records);
});

// Загрузка данных с сервера
async function loadRecords() {
    try {
        const response = await fetch('http://localhost:8000/api/persons/');
        if (!response.ok) throw new Error('Ошибка сети');
        const data = await response.json();
        records = data; // Обновляем records данными с сервера
        return data;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return records; // Возвращаем локальные данные при ошибке
    }
}

// Инициализация страницы
async function init() {
    await loadRecords(); // Загружаем данные
    generateLetterButtons();
    renderList(records);
}

// Запускаем инициализацию
document.addEventListener('DOMContentLoaded', init);