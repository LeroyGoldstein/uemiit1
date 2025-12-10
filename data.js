// Данные о городах и выпускниках УЭМИИТ
const citiesData = {
    cities: [
        
        // Импортированные города из Excel
		{
            id: "moscow",
            name: "Москва",
            population: "0.5 млн",
            description: "Московская область",
            coordinates: { left: "15%", top: "40%" }
        },
		
		{
            id: "ekb",
            name: "Екатеринбург",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "27%", top: "54%" }
        },
		
        {
            id: "haldersfild",
            name: "Халдерсфилд",
            population: "0.5 млн",
            description: "Англия, Западный Йоркшир",
            coordinates: { left: "12%", top: "18%" }
        },
        {
            id: "kumertau",
            name: "Кумертау",
            population: "0.5 млн",
            description: "Башкирия",
            coordinates: { left: "15%", top: "54%" }
        },
        {
            id: "apsheronsk",
            name: "Апшеронск",
            population: "0.5 млн",
            description: "Краснодарский край",
            coordinates: { left: "3%", top: "59%" }
        },
        {
            id: "krasnodar",
            name: "Краснодар",
            population: "0.5 млн",
            description: "Краснодарский край",
            coordinates: { left: "4%", top: "57%" }
        },
        {
            id: "gatchina",
            name: "Гатчина",
            population: "0.5 млн",
            description: "Ленинградская область",
            coordinates: { left: "12%", top: "30%" }
        },
        {
            id: "orenburg",
            name: "Оренбург",
            population: "0.5 млн",
            description: "Оренбургская область",
            coordinates: { left: "15%", top: "56%" }
        },
        {
            id: "orsk",
            name: "Орск",
            population: "0.5 млн",
            description: "Оренбургская область",
            coordinates: { left: "23%", top: "62%" }
        },
        {
            id: "dobryanka",
            name: "Добрянка",
            population: "0.5 млн",
            description: "Пермский край",
            coordinates: { left: "28%", top: "44%" }
        },
        {
            id: "perm",
            name: "Пермь",
            population: "0.5 млн",
            description: "Пермский край",
            coordinates: { left: "23%", top: "54%" }
        },
        {
            id: "saratov",
            name: "Саратов",
            population: "0.5 млн",
            description: "Саратовская область",
            coordinates: { left: "9%", top: "55%" }
        },
        {
            id: "kamensk_uralskii",
            name: "Каменск-Уральский",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "25%", top: "56%" }
        },
        {
            id: "kachkanar",
            name: "Качканар",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "32%", top: "47%" }
        },
        {
            id: "krasnoufimsk",
            name: "Красноуфимск",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "31%", top: "48%" }
        },
        {
            id: "revda",
            name: "Ревда",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "32%", top: "48%" }
        },
        {
            id: "serov",
            name: "Серов",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "32%", top: "45%" }
        },
        {
            id: "sysert",
            name: "Сысерть",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "34%", top: "48%" }
        },
        {
            id: "tumen",
            name: "Тюмень",
            population: "0.5 млн",
            description: "Тюменская область",
            coordinates: { left: "29%", top: "54%" }
        },
        {
            id: "izhevsk",
            name: "Ижевск",
            population: "0.5 млн",
            description: "Удмуртская республика",
            coordinates: { left: "17%", top: "47%" }
        },
        {
            id: "zlatoust",
            name: "Златоуст",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "27%", top: "56%" }
        },
        {
            id: "magnitogorsk",
            name: "Магнитогорск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "23%", top: "60%" }
        },
        {
            id: "snezhinsk",
            name: "Снежинск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "23%", top: "56%" }
        },
        {
            id: "troick",
            name: "Троицк",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "24%", top: "58%" }
        },
        {
            id: "chelyabinsk",
            name: "Челябинск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "24%", top: "57%" }
        }
    ],
    
    people: {
        moscow: [
                       // Импортированные выпускники Москвы
            {
                id: 1001,
                name: "Алабжина ( Солощенкова) Елена",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "foto/1.jpg"
            },
            {
                id: 1002,
                name: "Тресцова(Михайлина) Наталья",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=12"
            }
        ],
       
        ekb: [
            
            // Импортированные выпускники Екатеринбурга
            {
                id: 2001,
                name: "Бекселеева (Валитова) Лира",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=13"
            },
            {
                id: 2002,
                name: "Быц (Старикова) Татьяна",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=14"
            },
            {
                id: 2003,
                name: "Даниелян Тигран",
                position: "Выпуск 2015 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=15"
            },
            {
                id: 2004,
                name: "Гафурьянов Артур",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=16"
            },
            {
                id: 2005,
                name: "Куликова (Гафурьянова) Марина",
                position: "Выпуск 2019 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=17"
            },
            {
                id: 2006,
                name: "Ключинская (Шашкина) Лариса",
                position: "Выпуск 2020 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=18"
            },
            {
                id: 2007,
                name: "Мельникова (Кузовкова) Ольга",
                position: "Выпуск 2021 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=19"
            },
            {
                id: 2008,
                name: "Мызгина (Адамович) Марина",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=20"
            },
            {
                id: 2009,
                name: "Новожилова (Сапрыкина) Юлия",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=21"
            },
            {
                id: 2010,
                name: "Носова (Михалёва) Елена",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=22"
            },
            {
                id: 2011,
                name: "Полторацкий Виктор",
                position: "Выпуск 2015 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=23"
            },
            {
                id: 2012,
                name: "Пушкарёв Владимир",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=24"
            },
            {
                id: 2013,
                name: "Смертина (Кочеткова) Светлана",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=25"
            },
            {
                id: 2014,
                name: "Смирнова (Власова) Марина",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=26"
            },
            {
                id: 2015,
                name: "Спирин Анатолий",
                position: "Выпуск 2019 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=27"
            },
            {
                id: 2016,
                name: "Федотов Виталий",
                position: "Выпуск 2020 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=28"
            }
        ],
        // Новые города и их выпускники
        haldersfild: [
            {
                id: 3001,
                name: "Есаулкова (Зуева) Алёна",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=29"
            },
            {
                id: 3002,
                name: "Зуев Андрей",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=30"
            }
        ],
        kumertau: [
            {
                id: 3003,
                name: "Юмаев Фаниль",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=31"
            }
        ],
        apsheronsk: [
            {
                id: 3004,
                name: "Давыдова (Малухина) Марина",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=32"
            }
        ],
        krasnodar: [
            {
                id: 3005,
                name: "Соколова(Рыбакова)Наталия",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=33"
            }
        ],
        gatchina: [
            {
                id: 3006,
                name: "Благина (Власова) Светлана",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=34"
            }
        ],
        orenburg: [
            {
                id: 3007,
                name: "Полищук ( Кузьмина) Марина",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=35"
            }
        ],
        orsk: [
            {
                id: 3008,
                name: "Федоровы Светлана и Сергей",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=36"
            },
            {
                id: 3009,
                name: "Кинжегулова( Дружинина) Антонина",
                position: "Выпуск 2019 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=37"
            }
        ],
        dobryanka: [
            {
                id: 3010,
                name: "Ивинских (Петухова) Наталья",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=38"
            }
        ],
        perm: [
            {
                id: 3011,
                name: "Волкова (Старкова) Ольга",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=39"
            }
        ],
        saratov: [
            {
                id: 3012,
                name: "Данилов Юрий",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=40"
            }
        ],
        kamensk_uralskii: [
            {
                id: 3013,
                name: "Алексеева Надежда",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=41"
            }
        ],
        kachkanar: [
            {
                id: 3014,
                name: "Овсянникова Светлана",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=42"
            },
            {
                id: 3015,
                name: "Мамаева (Булатова) Светлана",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=43"
            },
            {
                id: 3016,
                name: "Домаренко (Младенцева) Людмила",
                position: "Выпуск 2019 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=44"
            }
        ],
        krasnoufimsk: [
            {
                id: 3017,
                name: "Соловей (Сисина) Елена",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=45"
            }
        ],
        revda: [
            {
                id: 3018,
                name: "Ахмадеев Ягфар",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=46"
            }
        ],
        serov: [
            {
                id: 3019,
                name: "Евстафьева (Токарева) Лариса",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=47"
            },
            {
                id: 3020,
                name: "Олесевич (Палкина) Наташа",
                position: "Выпуск 2019 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=48"
            }
        ],
        sysert: [
            {
                id: 3021,
                name: "Жуйкова (Глумова) Инга",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=49"
            }
        ],
        tumen: [
            {
                id: 3022,
                name: "Новгородова ( Бачинина) Ирина",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=50"
            }
        ],
        izhevsk: [
            {
                id: 3023,
                name: "Гладкова (Холмогорова) Марина",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=51"
            }
        ],
        zlatoust: [
            {
                id: 3024,
                name: "Золотухин Игорь",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=52"
            }
        ],
        magnitogorsk: [
            {
                id: 3025,
                name: "Савинова (Лазарева) Инга",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=53"
            },
            {
                id: 3026,
                name: "Рогозина( Галюк) Елена",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=54"
            }
        ],
        snezhinsk: [
            {
                id: 3027,
                name: "Безденежных (Халдина) Лариса",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=55"
            },
            {
                id: 3028,
                name: "Халдин Александр",
                position: "Выпуск 2017 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=56"
            }
        ],
        troick: [
            {
                id: 3029,
                name: "Пойловы Надежда и Сергей",
                position: "Выпуск 2018 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=57"
            }
        ],
        chelyabinsk: [
            {
                id: 3030,
                name: "Заслонова (Шевченко) Лариса",
                position: "Выпуск 2016 года",
                company: "Выпускник УЭМИИТ",
                photo: "https://i.pravatar.cc/200?img=58"
            }
        ]
    }
};

// Функции для работы с данными
// Функции для работы с данными
function getStatistics() {
    let totalPeople = 0;
    let totalCities = 0;
    let citiesWithPeople = 0;
    
    // Считаем города, в которых есть люди
    for (const cityId in citiesData.people) {
        if (citiesData.people[cityId].length > 0) {
            citiesWithPeople++;
            totalPeople += citiesData.people[cityId].length;
        }
    }
    
    // Общее количество городов
    totalCities = citiesData.cities.length;
    
    return { 
        totalPeople, 
        totalCities,
        citiesWithPeople 
    };
}

function searchData(query) {
    query = query.toLowerCase().trim();
    const results = { cities: [], people: [] };
    
    // Поиск городов
    citiesData.cities.forEach(city => {
        if (city.name.toLowerCase().includes(query)) {
            results.cities.push(city);
        }
    });
    
    // Поиск людей
    for (const cityId in citiesData.people) {
        const city = citiesData.cities.find(c => c.id === cityId);
        citiesData.people[cityId].forEach(person => {
            if (person.name.toLowerCase().includes(query) || 
                person.company.toLowerCase().includes(query)) {
                results.people.push({
                    ...person,
                    cityName: city.name,
                    cityId: cityId
                });
            }
        });
    }
    
    return results;
}

function getAllCitiesSorted() {
    const citiesWithPeople = [];
    const citiesWithoutPeople = [];
    
    citiesData.cities.forEach(city => {
        if (citiesData.people[city.id] && citiesData.people[city.id].length > 0) {
            citiesWithPeople.push(city);
        } else {
            citiesWithoutPeople.push(city);
        }
    });
    
    return [...citiesWithPeople, ...citiesWithoutPeople];
}

function getCityById(cityId) {
    return citiesData.cities.find(city => city.id === cityId);
}

// Загрузить данные из localStorage
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('uemiit_map_data');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Обновляем только если данные есть
            if (parsedData.cities && parsedData.people) {
                citiesData.cities = parsedData.cities;
                citiesData.people = parsedData.people;
                console.log('Данные загружены из localStorage');
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Инициализация данных (загружаем из localStorage при запуске)
loadFromLocalStorage();