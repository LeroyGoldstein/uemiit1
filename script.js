// ========== СИСТЕМА АВТОРИЗАЦИИ ==========
const PASSWORD = "uemiit2025";
const STORAGE_KEY = "map_auth_token";

// Главная функция при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    if (checkAuth()) {
        showMainContent();
        setTimeout(initMainApplication, 100);
    } else {
        showLoginScreen();
        setupLoginListeners();
    }
});

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

function saveAuth() {
    const authData = {
        token: btoa(PASSWORD),
        expires: Date.now() + (8 * 60 * 60 * 1000)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
}

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

function setupLoginListeners() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' 
                ? '<i class="fas fa-eye"></i>' 
                : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
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

// ========== ФУНКЦИИ ДЛЯ МОДАЛЬНОГО ОКНА ФОТО ==========

// Открыть модальное окно с фото
function openPhotoModal(photoUrl, personName, cityId = null, personId = null, photoIndex = 0) {
    const modal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalInfo = document.getElementById('modalPhotoInfo');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    
    if (!modal || !modalPhoto || !modalInfo) return;
    
    // Сохраняем информацию для навигации
    if (cityId && personId) {
        const allPhotos = getAllPersonPhotos(cityId, personId);
        if (allPhotos.length > 0) {
            currentPersonPhotos = allPhotos;
            currentPhotoIndex = photoIndex;
            currentPersonName = personName;
            
            // Показываем/скрываем кнопки навигации
            if (prevBtn) prevBtn.style.display = allPhotos.length > 1 ? 'flex' : 'none';
            if (nextBtn) nextBtn.style.display = allPhotos.length > 1 ? 'flex' : 'none';
            
            // Обновляем счетчик
            updatePhotoCounter();
        }
    } else {
        // Если нет информации о городе/человеке, просто показываем одно фото
        currentPersonPhotos = [photoUrl];
        currentPhotoIndex = 0;
        currentPersonName = personName;
        
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        updatePhotoCounter();
    }
    
    modalPhoto.src = currentPersonPhotos[currentPhotoIndex] || photoUrl;
    modalPhoto.alt = currentPersonName;
    modalInfo.textContent = currentPersonName;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Добавляем обработчики для навигации
    document.addEventListener('keydown', handlePhotoNavigation);
}

// Обновить счетчик фото (функция должна быть объявлена)
function updatePhotoCounter() {
    const counter = document.getElementById('photoCounter');
    if (counter && currentPersonPhotos.length > 1) {
        counter.textContent = `${currentPhotoIndex + 1} / ${currentPersonPhotos.length}`;
        counter.style.display = 'block';
    } else if (counter) {
        counter.style.display = 'none';
    }
}

// Показать предыдущее фото
function showPrevPhoto() {
    if (currentPersonPhotos.length <= 1) return;
    
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPersonPhotos.length) % currentPersonPhotos.length;
    const modalPhoto = document.getElementById('modalPhoto');
    if (modalPhoto) {
        modalPhoto.style.opacity = '0';
        setTimeout(() => {
            modalPhoto.src = currentPersonPhotos[currentPhotoIndex];
            updatePhotoCounter();
            setTimeout(() => {
                modalPhoto.style.opacity = '1';
            }, 50);
        }, 200);
    }
}

// Показать следующее фото
function showNextPhoto() {
    if (currentPersonPhotos.length <= 1) return;
    
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPersonPhotos.length;
    const modalPhoto = document.getElementById('modalPhoto');
    if (modalPhoto) {
        modalPhoto.style.opacity = '0';
        setTimeout(() => {
            modalPhoto.src = currentPersonPhotos[currentPhotoIndex];
            updatePhotoCounter();
            setTimeout(() => {
                modalPhoto.style.opacity = '1';
            }, 50);
        }, 200);
    }
}

// Обработчик навигации по фото
function handlePhotoNavigation(event) {
    if (!document.getElementById('photoModal').classList.contains('active')) return;
    
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            showPrevPhoto();
            break;
        case 'ArrowRight':
            event.preventDefault();
            showNextPhoto();
            break;
        case 'Escape':
            closePhotoModal();
            break;
    }
}

// Закрыть модальное окно с фото
function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Сбрасываем состояние
    currentPersonPhotos = [];
    currentPhotoIndex = 0;
    currentPersonName = "";
    
    // Удаляем обработчики
    document.removeEventListener('keydown', handlePhotoNavigation);
    
    // Скрываем кнопки навигации
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    // Скрываем счетчик
    const counter = document.getElementById('photoCounter');
    if (counter) counter.style.display = 'none';
}

// Делаем функции глобальными
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.showPrevPhoto = showPrevPhoto;
window.showNextPhoto = showNextPhoto;

// ========== ОСНОВНОЕ ПРИЛОЖЕНИЕ ==========
let currentSelectedCity = null;
let tooltipSource = 'map';

function initMainApplication() {
    console.log('Инициализация основного приложения');
    
    updateStatistics();
    createCityMarkers();
    loadCitiesList();
    setupApplicationListeners();
    
    console.log('Приложение запущено');
}

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

function createCityMarkers() {
    const container = document.getElementById('cityMarkersContainer');
    if (!container) {
        console.error('Контейнер для маркеров не найден!');
        return;
    }
    
    container.innerHTML = '';
    
    const cities = citiesData.cities;
    const markers = [];
    
    cities.forEach(city => {
        const marker = document.createElement('div');
        marker.className = 'city-marker-container';
        marker.style.left = city.coordinates.left;
        marker.style.top = city.coordinates.top;
        marker.setAttribute('data-city', city.id);
        
        const name = document.createElement('div');
        name.className = 'city-name-on-map';
        name.textContent = city.name;
        name.dataset.cityId = city.id;
        
        const dot = document.createElement('div');
        dot.className = 'marker-dot';
        
        const peopleCount = getPeopleCount(city.id);
        if (peopleCount > 0) {
            dot.style.background = '#e74c3c';
            dot.title = `${peopleCount} выпускник(ов)`;
        } else {
            dot.style.background = '#95a5a6';
            dot.title = 'Нет выпускников';
        }
        
        marker.appendChild(name);
        marker.appendChild(dot);
        
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
            showCityPeople(city.id, 'map');
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
    
    setTimeout(() => positionCityLabelsSmart(markers), 100);
}

function positionCityLabelsSmart(markers) {
    const MAX_DISTANCE = 25;
    const container = document.getElementById('cityMarkersContainer');
    const containerRect = container.getBoundingClientRect();
    const labelPositions = [];
    
    markers.sort((a, b) => a.y - b.y);
    
    markers.forEach(marker => {
        const name = marker.nameElement;
        const markerX = (marker.x / 100) * containerRect.width;
        const markerY = (marker.y / 100) * containerRect.height;
        
        const positions = [
            { side: 'right', x: markerX + MAX_DISTANCE, y: markerY },
            { side: 'left', x: markerX - MAX_DISTANCE, y: markerY },
            { side: 'top', x: markerX, y: markerY - MAX_DISTANCE },
            { side: 'bottom', x: markerX, y: markerY + MAX_DISTANCE }
        ];
        
        let bestPosition = positions[0];
        let minOverlap = Infinity;
        
        name.style.display = 'block';
        name.style.position = 'absolute';
        name.style.left = '0';
        name.style.top = '0';
        const nameRect = name.getBoundingClientRect();
        const nameWidth = nameRect.width;
        const nameHeight = nameRect.height;
        
        for (const pos of positions) {
            let overlapCount = 0;
            const testRect = {
                left: pos.x - nameWidth/2,
                right: pos.x + nameWidth/2,
                top: pos.y - nameHeight/2,
                bottom: pos.y + nameHeight/2
            };
            
            for (const existing of labelPositions) {
                if (rectsOverlap(testRect, existing.rect)) {
                    overlapCount++;
                }
            }
            
            if (testRect.left < 0 || testRect.right > containerRect.width ||
                testRect.top < 0 || testRect.bottom > containerRect.height) {
                overlapCount += 2;
            }
            
            if (overlapCount < minOverlap) {
                minOverlap = overlapCount;
                bestPosition = pos;
            }
            
            if (overlapCount === 0) {
                break;
            }
        }
        
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
        
        Object.assign(name.style, cssPosition);
        
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

function rectsOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function loadCitiesList() {
    const container = document.getElementById('citiesList');
    if (!container) {
        console.error('Контейнер списка городов не найден!');
        return;
    }
    
    container.innerHTML = '';
    
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
    
    citiesWithInfo.sort((a, b) => {
        if (a.hasPeople && b.hasPeople) {
            return b.peopleCount - a.peopleCount;
        }
        if (a.hasPeople && !b.hasPeople) return -1;
        if (!a.hasPeople && b.hasPeople) return 1;
        return a.name.localeCompare(b.name);
    });
    
    if (citiesWithInfo.length === 0) {
        container.innerHTML = '<div class="no-cities">Городов не найдено</div>';
        return;
    }
    
    citiesWithInfo.forEach(cityInfo => {
        const item = document.createElement('div');
        item.className = 'city-item';
        item.setAttribute('data-city', cityInfo.id);
        
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
            showCityPeople(cityInfo.id, 'list');
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

// 4. Показать людей в городе (С КЛИКАБЕЛЬНЫМИ ФОТО)
function showCityPeople(cityId, source = 'map') {
    const city = getCityById(cityId);
    if (!city) return;
    
    tooltipSource = source;
    const people = citiesData.people[cityId] || [];
    const tooltip = document.getElementById('peopleTooltip');
    const peopleList = document.getElementById('peopleList');
    
    document.getElementById('tooltipCityName').textContent = city.name;
    peopleList.innerHTML = '';
    
    if (people.length === 0) {
        peopleList.innerHTML = '<div class="no-people">В этом городе пока нет выпускников</div>';
    } else {
        people.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            
            const mainPhoto = person.photo1 || person.photo;
            const secondPhoto = person.photo2 || person.photo1 || person.photo;
            const hasSecondPhoto = secondPhoto && secondPhoto.trim() !== "" && secondPhoto !== mainPhoto;
            
            // Экранируем кавычки для безопасной передачи в onclick
            const safeMainPhoto = (mainPhoto || '').replace(/'/g, "\\'");
            const safeSecondPhoto = (secondPhoto || '').replace(/'/g, "\\'");
            const safeName = (person.name || '').replace(/'/g, "\\'");
            const safeCityId = (cityId || '').replace(/'/g, "\\'");
            
            card.innerHTML = `
                <div class="person-photos">
                    <img src="${mainPhoto}" 
                         alt="${person.name}" 
                         class="person-photo main-photo"
                         onclick="openPhotoModal('${safeMainPhoto}', '${safeName}', '${safeCityId}', ${person.id}, 0)">
                    ${hasSecondPhoto ? 
                        `<img src="${secondPhoto}" 
                              alt="${person.name}" 
                              class="person-photo second-photo"
                              onclick="openPhotoModal('${safeSecondPhoto}', '${safeName}', '${safeCityId}', ${person.id}, 1)">` 
                        : ''}
                </div>
                <div class="person-info">
                    <div class="person-name">${person.name}</div>
                    <div class="person-position">${person.position}</div>
                    <div class="person-company">${person.company}</div>
                </div>
            `;
            
            peopleList.appendChild(card);
        });
    }
    
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
    
    document.querySelectorAll('.city-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-city') === cityId) {
            item.classList.add('active');
        }
    });
    
    highlightCityMarker(cityId);
}

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

function showTooltipNearList(cityId, tooltip) {
    const cityItem = document.querySelector(`.city-item[data-city="${cityId}"]`);
    if (!cityItem) {
        showTooltipOnMap(tooltip);
        return;
    }
    
    if (window.innerWidth <= 768) {
        showTooltipCentered(tooltip);
        return;
    }
    
    tooltip.style.display = 'none';
    
    const rect = cityItem.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const tooltipWidth = 380;
    const tooltipHeight = Math.min(600, window.innerHeight - 100);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    let top = rect.top + scrollTop;
    let left = rect.left + rect.width + 20;
    let animationClass = 'tooltip-slide-right';
    
    if (rect.left + rect.width + 20 + tooltipWidth > screenWidth) {
        left = Math.max(20, rect.left - tooltipWidth - 20);
        animationClass = 'tooltip-slide-left';
    }
    
    if (rect.top + tooltipHeight > screenHeight - 50) {
        top = Math.max(50, screenHeight - tooltipHeight - 50);
    }
    
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.className = 'people-tooltip ' + animationClass;
    tooltip.style.display = 'block';
}

function showTooltipOnMap(tooltip) {
    tooltip.style.position = 'absolute';
    tooltip.style.top = '20px';
    tooltip.style.right = '20px';
    tooltip.style.left = 'auto';
    tooltip.style.transform = 'none';
    tooltip.className = 'people-tooltip map-tooltip';
    tooltip.style.display = 'block';
}

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
    
    const closeBtn = document.getElementById('closeTooltip');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closePeopleTooltip();
        });
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePeopleTooltip();
        }
    });
    
    document.addEventListener('click', function(event) {
        const tooltip = document.getElementById('peopleTooltip');
        if (!tooltip || tooltip.style.display !== 'block') return;
        
        const clickedElement = event.target;
        
        if (tooltip.contains(clickedElement)) return;
        
        if (clickedElement.id === 'closeTooltip' || clickedElement.closest('#closeTooltip')) return;
        
        if (clickedElement.closest('.city-marker-container') && tooltipSource === 'map') return;
        
        if (clickedElement.closest('.city-item') && tooltipSource === 'list') {
            const cityItem = clickedElement.closest('.city-item');
            if (cityItem) {
                const cityId = cityItem.getAttribute('data-city');
                if (cityId !== currentSelectedCity) {
                    showCityPeople(cityId, 'list');
                }
            }
            return;
        }
        
        closePeopleTooltip();
    });
    
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
    
    const tooltip = document.getElementById('peopleTooltip');
    if (tooltip) {
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    window.addEventListener('resize', function() {
        if (currentSelectedCity && tooltipSource === 'list') {
            const tooltip = document.getElementById('peopleTooltip');
            if (tooltip && tooltip.style.display === 'block') {
                showTooltipNearList(currentSelectedCity, tooltip);
            }
        }
        setTimeout(() => {
            createCityMarkers();
        }, 300);
    });
    
    window.addEventListener('scroll', function() {
        if (currentSelectedCity && tooltipSource === 'list') {
            const tooltip = document.getElementById('peopleTooltip');
            if (tooltip && tooltip.style.display === 'block') {
                showTooltipNearList(currentSelectedCity, tooltip);
            }
        }
    });
}

function displaySearchResults(results) {
    const container = document.getElementById('citiesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.cities.length === 0 && results.people.length === 0) {
        container.innerHTML = '<div class="no-results">Ничего не найдено</div>';
        return;
    }
    
    const allResults = [];
    
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
    
    results.people.forEach(person => {
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
    
    allResults.sort((a, b) => {
        if (a.type === 'city' && b.type === 'person') return -1;
        if (a.type === 'person' && b.type === 'city') return 1;
        
        if (a.type === 'city' && b.type === 'city') {
            if (a.hasPeople && b.hasPeople) {
                return b.peopleCount - a.peopleCount;
            }
            if (a.hasPeople && !b.hasPeople) return -1;
            if (!a.hasPeople && b.hasPeople) return 1;
            return a.name.localeCompare(b.name);
        }
        
        if (a.type === 'person' && b.type === 'person') {
            return a.name.localeCompare(b.name);
        }
        
        return 0;
    });
    
    allResults.forEach(result => {
        if (result.type === 'city') {
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

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

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

function refreshInterface() {
    if (typeof updateStatistics === 'function') updateStatistics();
    if (typeof createCityMarkers === 'function') createCityMarkers();
    if (typeof loadCitiesList === 'function') loadCitiesList();
}

setTimeout(refreshInterface, 500);
setTimeout(addLogoutButton, 1000);
