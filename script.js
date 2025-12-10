// ========== СИСТЕМА АВТОРИЗАЦИИ ==========
const PASSWORD = "uemiit2025";
const STORAGE_KEY = "map_auth_token";

// Главная функция при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    if (checkAuth()) {
        // Если авторизован - показываем карту
        showMainContent();
        setTimeout(initMainApplication, 100);
    } else {
        // Если нет - показываем форму входа
        showLoginScreen();
        setupLoginListeners();
    }
});

// Проверка авторизации
function checkAuth() {
    const authData = localStorage.getItem(STORAGE_KEY);
    if (!authData) return false;
    
    try {
        const { token, expires } = JSON.parse(authData);
        return Date.now() < expires && token === btoa(PASSWORD);
    } catch {
        return false;
    }
}

// Сохранение авторизации
function saveAuth() {
    const authData = {
        token: btoa(PASSWORD),
        expires: Date.now() + (8 * 60 * 60 * 1000) // 8 часов
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
}

// Показать/скрыть экраны
function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (loginScreen) loginScreen.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
}

function showMainContent() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (loginScreen) loginScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
}

// Обработчики формы входа
function setupLoginListeners() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    
    // Показать/скрыть пароль
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' 
                ? '<i class="fas fa-eye"></i>' 
                : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    // Отправка формы
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === PASSWORD) {
            saveAuth();
            showMainContent();
            setTimeout(initMainApplication, 100);
        } else {
            alert('Неверный пароль! Попробуйте снова.');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
}

// ========== ОСНОВНОЕ ПРИЛОЖЕНИЕ ==========
let currentSelectedCity = null;
let tooltipSource = 'map'; // 'map' или 'list' - откуда открыли tooltip

function initMainApplication() {
    console.log('Инициализация основного приложения');
    
    // 1. Загружаем данные
    updateStatistics();
    
    // 2. Создаем маркеры на карте
    createCityMarkers();
    
    // 3. Загружаем список городов
    loadCitiesList();
    
    // 4. Настраиваем обработчики
    setupApplicationListeners();
    
    console.log('Приложение запущено');
}

// 1. Обновить статистику
function updateStatistics() {
    const stats = getStatistics();
    const totalPeopleElem = document.getElementById('totalPeople');
    const totalCitiesElem = document.getElementById('totalCities');
    
    if (totalPeopleElem) {
        totalPeopleElem.textContent = `Выпускников: ${stats.totalPeople}`;
    }
    
    if (totalCitiesElem) {
        totalCitiesElem.textContent = `Городов: ${stats.totalCities}`;
    }
}

// 2. Создать маркеры на карте
function createCityMarkers() {
    const container = document.getElementById('cityMarkersContainer');
    if (!container) {
        console.error('Контейнер для маркеров не найден!');
        return;
    }
    
    container.innerHTML = '';
    
    // Берем ВСЕ города
    const cities = citiesData.cities;
    
    // Создаем массив маркеров
    const markers = [];
    
    cities.forEach(city => {
        // Создаем контейнер
        const marker = document.createElement('div');
        marker.className = 'city-marker-container';
        marker.style.left = city.coordinates.left;
        marker.style.top = city.coordinates.top;
        marker.setAttribute('data-city', city.id);
        
        // Название города - БЕЗ ФОНА
        const name = document.createElement('div');
        name.className = 'city-name-on-map';
        name.textContent = city.name;
        name.dataset.cityId = city.id;
        
        // Точка города (разный цвет если есть люди)
        const dot = document.createElement('div');
        dot.className = 'marker-dot';
        
        // Подсчитываем людей в городе
        const peopleCount = getPeopleCount(city.id);
        if (peopleCount > 0) {
            dot.style.background = '#e74c3c'; // Красный - есть люди
            dot.title = `${peopleCount} выпускник(ов)`;
        } else {
            dot.style.background = '#95a5a6'; // Серый - нет людей
            dot.title = 'Нет выпускников';
        }
        
        // Добавляем элементы
        marker.appendChild(name);
        marker.appendChild(dot);
        
        // Сохраняем данные маркера
        markers.push({
            element: marker,
            nameElement: name,
            cityId: city.id,
            cityName: city.name,
            x: parseFloat(city.coordinates.left),
            y: parseFloat(city.coordinates.top)
        });
        
        // Обработчики событий
        marker.addEventListener('click', function(e) {
            e.stopPropagation();
            showCityPeople(city.id, 'map'); // Источник - карта
        });
        
        marker.addEventListener('mouseenter', function() {
            this.style.zIndex = '1000';
            dot.style.transform = 'scale(1.2)';
            name.style.color = '#e74c3c';
            name.style.fontWeight = '700';
        });
        
        marker.addEventListener('mouseleave', function() {
            if (currentSelectedCity !== city.id) {
                this.style.zIndex = '10';
                dot.style.transform = 'scale(1)';
                name.style.color = '#1a237e';
                name.style.fontWeight = '600';
            }
        });
        
        container.appendChild(marker);
    });
    
    // Позиционируем названия с умным алгоритмом
    setTimeout(() => positionCityLabelsSmart(markers), 100);
}

// Умное позиционирование названий (без перекрытий, максимум 25px)
function positionCityLabelsSmart(markers) {
    // Максимальное расстояние от маркера
    const MAX_DISTANCE = 25;
    
    // Рассчитываем реальные позиции на экране
    const container = document.getElementById('cityMarkersContainer');
    const containerRect = container.getBoundingClientRect();
    
    // Создаем массив для хранения позиций названий
    const labelPositions = [];
    
    // Сортируем маркеры по Y координате (сверху вниз)
    markers.sort((a, b) => a.y - b.y);
    
    markers.forEach(marker => {
        const name = marker.nameElement;
        
        // Рассчитываем позицию маркера в пикселях
        const markerX = (marker.x / 100) * containerRect.width;
        const markerY = (marker.y / 100) * containerRect.height;
        
        // Варианты позиционирования (право, лево, верх, низ)
        const positions = [
            { side: 'right', x: markerX + MAX_DISTANCE, y: markerY },
            { side: 'left', x: markerX - MAX_DISTANCE, y: markerY },
            { side: 'top', x: markerX, y: markerY - MAX_DISTANCE },
            { side: 'bottom', x: markerX, y: markerY + MAX_DISTANCE }
        ];
        
        // Ищем лучшую позицию без перекрытий
        let bestPosition = positions[0]; // По умолчанию справа
        let minOverlap = Infinity;
        
        // Предварительно вычисляем размер названия
        name.style.display = 'block';
        name.style.position = 'absolute';
        name.style.left = '0';
        name.style.top = '0';
        const nameRect = name.getBoundingClientRect();
        const nameWidth = nameRect.width;
        const nameHeight = nameRect.height;
        
        // Пробуем все позиции
        for (const pos of positions) {
            let overlapCount = 0;
            const testRect = {
                left: pos.x - nameWidth/2,
                right: pos.x + nameWidth/2,
                top: pos.y - nameHeight/2,
                bottom: pos.y + nameHeight/2
            };
            
            // Проверяем перекрытие с уже размещенными названиями
            for (const existing of labelPositions) {
                if (rectsOverlap(testRect, existing.rect)) {
                    overlapCount++;
                }
            }
            
            // Проверяем, выходит ли за пределы контейнера
            if (testRect.left < 0 || testRect.right > containerRect.width ||
                testRect.top < 0 || testRect.bottom > containerRect.height) {
                overlapCount += 2; // Штраф за выход за границы
            }
            
            if (overlapCount < minOverlap) {
                minOverlap = overlapCount;
                bestPosition = pos;
            }
            
            // Если нашли позицию без перекрытий - останавливаемся
            if (overlapCount === 0) {
                break;
            }
        }
        
        // Применяем лучшую позицию
        let cssPosition = {};
        switch(bestPosition.side) {
            case 'right':
                cssPosition = {
                    left: MAX_DISTANCE + 'px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    textAlign: 'left'
                };
                break;
            case 'left':
                cssPosition = {
                    right: MAX_DISTANCE + 'px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    textAlign: 'right'
                };
                break;
            case 'top':
                cssPosition = {
                    left: '50%',
                    bottom: MAX_DISTANCE + 'px',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                };
                break;
            case 'bottom':
                cssPosition = {
                    left: '50%',
                    top: MAX_DISTANCE + 'px',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                };
                break;
        }
        
        // Применяем стили
        Object.assign(name.style, cssPosition);
        
        // Сохраняем позицию для проверки перекрытий
        labelPositions.push({
            cityId: marker.cityId,
            rect: {
                left: bestPosition.x - nameWidth/2,
                right: bestPosition.x + nameWidth/2,
                top: bestPosition.y - nameHeight/2,
                bottom: bestPosition.y + nameHeight/2
            }
        });
    });
}

// Проверка пересечения прямоугольников
function rectsOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// 3. Загрузить список городов (ВСЕ города с сортировкой по количеству выпускников)
function loadCitiesList() {
    const container = document.getElementById('citiesList');
    if (!container) {
        console.error('Контейнер списка городов не найден!');
        return;
    }
    
    container.innerHTML = '';
    
    // Создаем массив всех городов с информацией о выпускниках
    const citiesWithInfo = citiesData.cities.map(city => {
        const peopleCount = getPeopleCount(city.id);
        return {
            id: city.id,
            name: city.name,
            description: city.description,
            peopleCount: peopleCount,
            hasPeople: peopleCount > 0
        };
    });
    
    // СОРТИРОВКА: сначала города с выпускниками (от большего к меньшему), затем без выпускников
    citiesWithInfo.sort((a, b) => {
        // Если оба города имеют выпускников
        if (a.hasPeople && b.hasPeople) {
            return b.peopleCount - a.peopleCount; // По убыванию количества
        }
        // Если только a имеет выпускников
        if (a.hasPeople && !b.hasPeople) {
            return -1; // a идет перед b
        }
        // Если только b имеет выпускников
        if (!a.hasPeople && b.hasPeople) {
            return 1; // b идет перед a
        }
        // Если оба не имеют выпускников - сортируем по алфавиту
        return a.name.localeCompare(b.name);
    });
    
    if (citiesWithInfo.length === 0) {
        container.innerHTML = '<div class="no-cities">Городов не найдено</div>';
        return;
    }
    
    // Статистика для отладки
    console.log(`Всего городов: ${citiesWithInfo.length}`);
    console.log(`Городов с выпускниками: ${citiesWithInfo.filter(c => c.hasPeople).length}`);
    console.log(`Городов без выпускников: ${citiesWithInfo.filter(c => !c.hasPeople).length}`);
    
    // Показываем все города
    citiesWithInfo.forEach(cityInfo => {
        const item = document.createElement('div');
        item.className = 'city-item';
        item.setAttribute('data-city', cityInfo.id);
        
        // Разный стиль для городов с людьми и без
        if (!cityInfo.hasPeople) {
            item.classList.add('city-empty');
        }
        
        item.innerHTML = `
            <div>
                <div class="city-name">${cityInfo.name}</div>
                <div class="city-description">${cityInfo.description}</div>
            </div>
            <div class="city-count ${cityInfo.hasPeople ? 'has-people' : 'no-people'}">
                ${cityInfo.peopleCount}
            </div>
        `;
        
        item.addEventListener('click', function() {
            showCityPeople(cityInfo.id, 'list'); // Источник - список
        });
        
        item.addEventListener('mouseenter', function() {
            highlightCityMarker(cityInfo.id);
        });
        
        item.addEventListener('mouseleave', function() {
            if (currentSelectedCity !== cityInfo.id) {
                removeMarkerHighlight();
            }
        });
        
        container.appendChild(item);
    });
}

// 4. Показать людей в городе
function showCityPeople(cityId, source = 'map') {
    const city = getCityById(cityId);
    if (!city) return;
    
    tooltipSource = source;
    const people = citiesData.people[cityId] || [];
    const tooltip = document.getElementById('peopleTooltip');
    const peopleList = document.getElementById('peopleList');
    
    // Заголовок
    document.getElementById('tooltipCityName').textContent = city.name;
    
    // Список людей
    peopleList.innerHTML = '';
    
    if (people.length === 0) {
        peopleList.innerHTML = '<div class="no-people">В этом городе пока нет выпускников</div>';
    } else {
        people.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            
            const safePhoto = (person.photo || '').replace(/'/g, "\\'");
            const safeName = (person.name || '').replace(/'/g, "\\'");
            
            card.innerHTML = `
                <img src="${person.photo}" 
                     alt="${person.name}" 
                     class="person-photo"
                     onclick="openPhotoModal('${safePhoto}', '${safeName}')">
                <div class="person-info">
                    <div class="person-name">${person.name}</div>
                    <div class="person-company">${person.position}<br>${person.company}</div>
                </div>
            `;
            
            peopleList.appendChild(card);
        });
    }
    
    // ОБНОВЛЕНО: Для мобильных устройств всегда показываем tooltip по центру
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        showTooltipCentered(tooltip);
    } else {
        if (source === 'list') {
            showTooltipNearList(cityId, tooltip);
        } else {
            showTooltipOnMap(tooltip);
        }
    }
    
    currentSelectedCity = cityId;
    
    // Активируем город в списке
    document.querySelectorAll('.city-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-city') === cityId) {
            item.classList.add('active');
        }
    });
    
    // Подсвечиваем маркер на карте
    highlightCityMarker(cityId);
}

// НОВАЯ ФУНКЦИЯ: Показывать tooltip по центру (для мобильных)
function showTooltipCentered(tooltip) {
    tooltip.style.position = 'fixed';
    tooltip.style.top = '50%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translate(-50%, -50%)';
    tooltip.style.width = '90%';
    tooltip.style.maxWidth = '400px';
    tooltip.style.maxHeight = '80vh';
    tooltip.style.zIndex = '2000';
    tooltip.className = 'people-tooltip mobile-tooltip';
    tooltip.style.display = 'block';
}

// Показать tooltip рядом с элементом списка
function showTooltipNearList(cityId, tooltip) {
    const cityItem = document.querySelector(`.city-item[data-city="${cityId}"]`);
    if (!cityItem) {
        showTooltipOnMap(tooltip);
        return;
    }
    
    // Для мобильных устройств используем центральное расположение
    if (window.innerWidth <= 768) {
        showTooltipCentered(tooltip);
        return;
    }
    
    // Сначала скрываем
    tooltip.style.display = 'none';
    
    // Получаем координаты
    const rect = cityItem.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const tooltipWidth = 350;
    const tooltipHeight = Math.min(600, window.innerHeight - 100);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let top = rect.top + scrollTop;
    let left = rect.left + rect.width + 20;
    let animationClass = 'tooltip-slide-right';
    
    // Проверяем, помещается ли справа
    if (rect.left + rect.width + 20 + tooltipWidth > screenWidth) {
        left = Math.max(20, rect.left - tooltipWidth - 20);
        animationClass = 'tooltip-slide-left';
    }
    
    // Проверяем по высоте
    if (rect.top + tooltipHeight > screenHeight - 50) {
        top = Math.max(50, screenHeight - tooltipHeight - 50);
    }
    
    // Позиционируем
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.className = 'people-tooltip ' + animationClass;
    
    // Показываем
    tooltip.style.display = 'block';
}

// Показать tooltip на карте (в правом верхнем углу)
function showTooltipOnMap(tooltip) {
    tooltip.style.position = 'absolute';
    tooltip.style.top = '20px';
    tooltip.style.right = '20px';
    tooltip.style.left = 'auto';
    tooltip.style.transform = 'none';
    tooltip.className = 'people-tooltip map-tooltip';
    tooltip.style.display = 'block';
}

// Подсветка маркера
function highlightCityMarker(cityId) {
    document.querySelectorAll('.city-marker-container').forEach(marker => {
        marker.style.zIndex = '10';
        const dot = marker.querySelector('.marker-dot');
        const name = marker.querySelector('.city-name-on-map');
        
        if (dot) dot.style.transform = 'scale(1)';
        if (name) {
            name.style.color = '#1a237e';
            name.style.fontWeight = '600';
        }
    });
    
    const marker = document.querySelector(`.city-marker-container[data-city="${cityId}"]`);
    if (marker) {
        marker.style.zIndex = '1000';
        const dot = marker.querySelector('.marker-dot');
        const name = marker.querySelector('.city-name-on-map');
        
        if (dot) dot.style.transform = 'scale(1.2)';
        if (name) {
            name.style.color = '#e74c3c';
            name.style.fontWeight = '700';
        }
    }
}

function removeMarkerHighlight() {
    document.querySelectorAll('.city-marker-container').forEach(marker => {
        if (!marker.matches(':hover') && currentSelectedCity !== marker.getAttribute('data-city')) {
            marker.style.zIndex = '10';
            const dot = marker.querySelector('.marker-dot');
            const name = marker.querySelector('.city-name-on-map');
            
            if (dot) dot.style.transform = 'scale(1)';
            if (name) {
                name.style.color = '#1a237e';
                name.style.fontWeight = '600';
            }
        }
    });
}

// Закрыть окно с людьми
function closePeopleTooltip() {
    const tooltip = document.getElementById('peopleTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
        tooltip.style.position = '';
        tooltip.style.top = '';
        tooltip.style.left = '';
        tooltip.style.transform = '';
        tooltip.className = 'people-tooltip';
    }
    
    currentSelectedCity = null;
    tooltipSource = 'map';
    
    document.querySelectorAll('.city-item').forEach(item => {
        item.classList.remove('active');
    });
    
    removeMarkerHighlight();
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupApplicationListeners() {
    console.log('Настройка обработчиков событий...');
    
    // 1. КНОПКА ЗАКРЫТИЯ ОКНА
    const closeBtn = document.getElementById('closeTooltip');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closePeopleTooltip();
        });
    }
    
    // 2. ЗАКРЫТИЕ ПО ESCAPE
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePeopleTooltip();
        }
    });
    
    // 3. ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ ОКНА
    document.addEventListener('click', function(event) {
        const tooltip = document.getElementById('peopleTooltip');
        if (!tooltip || tooltip.style.display !== 'block') return;
        
        const clickedElement = event.target;
        
        // Если кликнули на tooltip или его содержимое - НЕ закрываем
        if (tooltip.contains(clickedElement)) return;
        
        // Если кликнули на кнопку закрытия - уже обработано
        if (clickedElement.id === 'closeTooltip' || clickedElement.closest('#closeTooltip')) return;
        
        // Если кликнули на маркер на карте и tooltip открыт с карты - НЕ закрываем
        if (clickedElement.closest('.city-marker-container') && tooltipSource === 'map') return;
        
        // Если кликнули на город в списке и tooltip открыт из списка - НЕ закрываем
        if (clickedElement.closest('.city-item') && tooltipSource === 'list') {
            // Но если кликнули на другой город, переоткроем tooltip
            const cityItem = clickedElement.closest('.city-item');
            if (cityItem) {
                const cityId = cityItem.getAttribute('data-city');
                if (cityId !== currentSelectedCity) {
                    showCityPeople(cityId, 'list');
                }
            }
            return;
        }
        
        // В остальных случаях закрываем
        closePeopleTooltip();
    });
    
    // 4. Поиск
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value;
            if (query.length < 2) {
                loadCitiesList();
                return;
            }
            
            const results = searchData(query);
            displaySearchResults(results);
        });
    }
    
    // 5. Предотвращаем закрытие при клике внутри tooltip
    const tooltip = document.getElementById('peopleTooltip');
    if (tooltip) {
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 6. Обновляем позицию tooltip при изменении размера окна
    window.addEventListener('resize', function() {
        if (currentSelectedCity && tooltipSource === 'list') {
            const tooltip = document.getElementById('peopleTooltip');
            if (tooltip && tooltip.style.display === 'block') {
                showTooltipNearList(currentSelectedCity, tooltip);
            }
        }
        // Перерисовываем маркеры при изменении размера окна
        setTimeout(() => {
            createCityMarkers();
        }, 300);
    });
    
    // 7. Обновляем позицию при скролле
    window.addEventListener('scroll', function() {
        if (currentSelectedCity && tooltipSource === 'list') {
            const tooltip = document.getElementById('peopleTooltip');
            if (tooltip && tooltip.style.display === 'block') {
                showTooltipNearList(currentSelectedCity, tooltip);
            }
        }
    });
}

// Показать результаты поиска (ВСЕ найденные результаты)
function displaySearchResults(results) {
    const container = document.getElementById('citiesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.cities.length === 0 && results.people.length === 0) {
        container.innerHTML = '<div class="no-results">Ничего не найдено</div>';
        return;
    }
    
    // Объединяем результаты
    const allResults = [];
    
    // Города из поиска
    results.cities.forEach(city => {
        const peopleCount = citiesData.people[city.id] ? citiesData.people[city.id].length : 0;
        allResults.push({
            type: 'city',
            id: city.id,
            name: city.name,
            description: city.description,
            peopleCount: peopleCount,
            hasPeople: peopleCount > 0
        });
    });
    
    // Люди из поиска
    results.people.forEach(person => {
        // Проверяем, не добавлен ли уже этот город
        const cityAlreadyAdded = allResults.some(item => item.id === person.cityId);
        if (!cityAlreadyAdded) {
            const peopleCount = citiesData.people[person.cityId] ? citiesData.people[person.cityId].length : 0;
            allResults.push({
                type: 'city',
                id: person.cityId,
                name: person.cityName,
                description: 'Найден по выпускнику',
                peopleCount: peopleCount,
                hasPeople: peopleCount > 0
            });
        }
        
        // Добавляем и самого человека
        allResults.push({
            type: 'person',
            id: person.cityId,
            personId: person.id,
            name: person.name,
            cityName: person.cityName,
            company: person.company,
            photo: person.photo
        });
    });
    
    // СОРТИРОВКА результатов поиска
    allResults.sort((a, b) => {
        // Сначала города, затем люди
        if (a.type === 'city' && b.type === 'person') return -1;
        if (a.type === 'person' && b.type === 'city') return 1;
        
        // Если оба города
        if (a.type === 'city' && b.type === 'city') {
            if (a.hasPeople && b.hasPeople) {
                return b.peopleCount - a.peopleCount; // По убыванию количества
            }
            if (a.hasPeople && !b.hasPeople) return -1;
            if (!a.hasPeople && b.hasPeople) return 1;
            return a.name.localeCompare(b.name);
        }
        
        // Если оба человека
        if (a.type === 'person' && b.type === 'person') {
            return a.name.localeCompare(b.name);
        }
        
        return 0;
    });
    
    // Отображаем все результаты
    allResults.forEach(result => {
        if (result.type === 'city') {
            // Отображаем город
            const item = document.createElement('div');
            item.className = 'city-item';
            item.setAttribute('data-city', result.id);
            
            if (!result.hasPeople) {
                item.classList.add('city-empty');
            }
            
            item.innerHTML = `
                <div>
                    <div class="city-name">${result.name}</div>
                    <div class="city-description">${result.description}</div>
                </div>
                <div class="city-count ${result.hasPeople ? 'has-people' : 'no-people'}">
                    ${result.peopleCount}
                </div>
            `;
            
            item.addEventListener('click', () => showCityPeople(result.id, 'list'));
            container.appendChild(item);
        } else {
            // Отображаем человека
            const item = document.createElement('div');
            item.className = 'city-item person-search-result';
            item.setAttribute('data-city', result.id);
            
            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
                    <img src="${result.photo}" 
                         alt="${result.name}" 
                         style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <div style="font-weight: 600; color: #2c3e50; margin-bottom: 2px;">${result.name}</div>
                        <div style="font-size: 0.85rem; color: #666;">
                            ${result.cityName} • ${result.company}
                        </div>
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => showCityPeople(result.id, 'list'));
            container.appendChild(item);
        }
    });
}

// ========== РАБОТА С ФОТО ==========

// Открыть модальное окно с фото
function openPhotoModal(photoUrl, personName) {
    const modal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalInfo = document.getElementById('modalPhotoInfo');
    
    if (!modal || !modalPhoto || !modalInfo) return;
    
    modalPhoto.src = photoUrl;
    modalPhoto.alt = personName;
    modalInfo.textContent = personName;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Добавляем обработчик для закрытия по Escape
    document.addEventListener('keydown', handlePhotoEscapeKey);
}

// Закрыть модальное окно с фото
function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Удаляем обработчик Escape
    document.removeEventListener('keydown', handlePhotoEscapeKey);
}

// Обработчик клавиши Escape для фото
function handlePhotoEscapeKey(event) {
    if (event.key === 'Escape') {
        closePhotoModal();
    }
}

// Делаем функции глобальными для вызова из HTML
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

// Получить количество людей в городе
function getPeopleCount(cityId) {
    return citiesData.people[cityId] ? citiesData.people[cityId].length : 0;
}

// Получить город по ID
function getCityById(cityId) {
    return citiesData.cities.find(city => city.id === cityId);
}

// Получить все города
function getAllCities() {
    return citiesData.cities;
}

// Функция для обновления интерфейса после изменений данных
function refreshInterface() {
    if (typeof updateStatistics === 'function') updateStatistics();
    if (typeof createCityMarkers === 'function') createCityMarkers();
    if (typeof loadCitiesList === 'function') loadCitiesList();
}

// Обновляем интерфейс при загрузке
setTimeout(refreshInterface, 500);

// Добавить кнопку выхода
function addLogoutButton() {
    const header = document.querySelector('header .header-content');
    if (!header) return;
    
    if (document.querySelector('.logout-btn')) return;
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Выход';
    logoutBtn.onclick = function() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };
    
    header.appendChild(logoutBtn);
}

// Простая версия для мобильных
function simpleMobileAdaptation() {
    if (!isMobileDevice()) return;
    
    const cityNames = document.querySelectorAll('.city-name-on-map');
    const viewportWidth = window.innerWidth;
    const baseWidth = 375; // iPhone шириной
    
    // Коэффициент масштаба
    const scaleFactor = viewportWidth / baseWidth;
    
    cityNames.forEach(name => {
        // Базовый размер шрифта
        let fontSize = 12;
        
        // Уменьшаем при увеличении
        if (scaleFactor < 0.9) { // Увеличено
            fontSize = 10;
        } else if (scaleFactor < 0.7) { // Сильно увеличено
            fontSize = 8;
        } else if (scaleFactor > 1.3) { // Уменьшено
            fontSize = 14;
        }
        
        // Для длинных названий делаем еще меньше
        if (name.textContent.length > 12) {
            fontSize = Math.max(8, fontSize - 2);
        }
        
        name.style.fontSize = `${fontSize}px`;
        name.style.lineHeight = '1.2';
    });
}

// Добавьте в обработчик resize
window.addEventListener('resize', function() {
    if (isMobileDevice()) {
        simpleMobileAdaptation();
    }
});

// Вызовите при загрузке
setTimeout(simpleMobileAdaptation, 500);

// Вызываем после инициализации
setTimeout(addLogoutButton, 1000);