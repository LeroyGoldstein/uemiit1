// Данные о городах и выпускниках УЭМИИТ
const citiesData = {
    cities: [
        {
            id: "moscow",
            name: "Москва",
            population: "0.5 млн",
            description: "Московская область",
            coordinates: { left: "35%", top: "37%" }
        },
        {
            id: "ekb",
            name: "Екатеринбург",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "67%", top: "54%" }
        },
        {
            id: "haldersfild",
            name: "Хаддерсфилд",
            population: "0.5 млн",
            description: "Англия, Западный Йоркшир",
            coordinates: { left: "3%", top: "10%" }
        },
        {
            id: "kumertau",
            name: "Кумертау",
            population: "0.5 млн",
            description: "Башкирия",
            coordinates: { left: "48%", top: "74%" }
        },
        {
            id: "apsheronsk",
            name: "Апшеронск",
            population: "0.5 млн",
            description: "Краснодарский край",
            coordinates: { left: "6%", top: "70%" }
        },
        {
            id: "krasnodar",
            name: "Краснодар",
            population: "0.5 млн",
            description: "Краснодарский край",
            coordinates: { left: "11%", top: "68%" }
        },
        {
            id: "gatchina",
            name: "Гатчина",
            population: "0.5 млн",
            description: "Ленинградская область",
            coordinates: { left: "33%", top: "14%" }
        },
        {
            id: "orenburg",
            name: "Оренбург",
            population: "0.5 млн",
            description: "Оренбургская область",
            coordinates: { left: "46%", top: "78%" }
        },
        {
            id: "orsk",
            name: "Орск",
            population: "0.5 млн",
            description: "Оренбургская область",
            coordinates: { left: "52%", top: "81%" }
        },
        {
            id: "dobryanka",
            name: "Добрянка",
            population: "0.5 млн",
            description: "Пермский край",
            coordinates: { left: "60%", top: "48%" }
        },
        {
            id: "perm",
            name: "Пермь",
            population: "0.5 млн",
            description: "Пермский край",
            coordinates: { left: "59%", top: "51%" }
        },
        {
            id: "saratov",
            name: "Саратов",
            population: "0.5 млн",
            description: "Саратовская область",
            coordinates: { left: "30%", top: "63%" }
        },
        {
            id: "kamensk_uralskii",
            name: "Каменск-Уральский",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "69%", top: "57%" }
        },
        {
            id: "kachkanar",
            name: "Качканар",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "64%", top: "49%" }
        },
        {
            id: "krasnoufimsk",
            name: "Красноуфимск",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "62%", top: "58%" }
        },
        {
            id: "revda",
            name: "Ревда",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "64%", top: "56%" }
        },
        {
            id: "serov",
            name: "Серов",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "64%", top: "44%" }
        },
        {
            id: "sysert",
            name: "Сысерть",
            population: "0.5 млн",
            description: "Свердловская область",
            coordinates: { left: "67%", top: "57%" }
        },
        {
            id: "tumen",
            name: "Тюмень",
            population: "0.5 млн",
            description: "Тюменская область",
            coordinates: { left: "75%", top: "57%" }
        },
        {
            id: "izhevsk",
            name: "Ижевск",
            population: "0.5 млн",
            description: "Удмуртская республика",
            coordinates: { left: "55%", top: "60%" }
        },
        {
            id: "zlatoust",
            name: "Златоуст",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "53%", top: "67%" }
        },
        {
            id: "magnitogorsk",
            name: "Магнитогорск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "59%", top: "70%" }
        },
        {
            id: "snezhinsk",
            name: "Снежинск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "62%", top: "64%" }
        },
        {
            id: "troick",
            name: "Троицк",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "68%", top: "68%" }
        },
        {
            id: "chelyabinsk",
            name: "Челябинск",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "67%", top: "64%" }
        },
		{
            id: "kartali",
            name: "Карталы",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "62%", top: "73%" }
        },
		{
            id: "irbit",
            name: "Ирбит",
            population: "0.5 млн",
            description: "Челябинская область",
            coordinates: { left: "72%", top: "54%" }
        }
    ],
    
    people: {
        moscow: [
            {
                id: 1001,
                name: "Алабжина (Солощенкова) Елена",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Алабжина-Солощенкова 1.jpg",
                photo2: "foto/Алабжина-Солощенкова 2.jpg"
            },
            {
                id: 1002,
                name: "Тресцова(Михайлина) Наталья",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Тресцова-Михайлина 1.jpg",
                photo2: "foto/Тресцова-Михайлина 2.jpg"
            }
        ],
       
        ekb: [
            {
                id: 2001,
                name: "Бекселеева (Валитова) Лира",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Валитова-Бекселеева 1.jpg",
                photo2: "foto/Валитова-Бекселеева 2.jpg"
            },
            {
                id: 2002,
                name: "Быц (Старикова) Татьяна",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Быц-Старикова 1.jpg",
                photo2: "foto/Быц-Старикова 2.jpg"
            },
            {
                id: 2003,
                name: "Даниелян Тигран",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Даниелян 1.jpg",
                photo2: "foto/Даниелян 2.jpg"
            },
            {
                id: 2004,
                name: "Гафурьянов Артур",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Марина Куликова, Артур Гафурьянов 1.jpg",
                photo2: "foto/Марина Куликова, Артур Гафурьянов 2.jpg"
            },
            {
                id: 2005,
                name: "Куликова (Гафурьянова) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Марина Куликова, Артур Гафурьянов 1.jpg",
                photo2: "foto/Марина Куликова, Артур Гафурьянов 2.jpg"
            },
            {
                id: 2006,
                name: "Ключинская (Шашкина) Лариса",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Шашкина (Ключинская) 1.jpg",
                photo2: "foto/Шашкина (Ключинская) 2.jpg"
            },
            {
                id: 2007,
                name: "Мельникова (Кузовкова) Ольга",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Мельникова-Кузовкова 1.jpg",
                photo2: "foto/Мельникова-Кузовкова 2.jpg"
            },
            {
                id: 2008,
                name: "Мызгина (Адамович) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Мызгина-Адамович 1.jpg",
                photo2: "foto/Мызгина-Адамович 2.jpg"
            },
            {
                id: 2009,
                name: "Новожилова (Сапрыкина) Юлия",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Новожилова-Сапрыкина 1.jpg",
                photo2: "foto/Новожилова-Сапрыкина 2.jpg"
            },
            {
                id: 2010,
                name: "Носова (Михалёва) Елена",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Носова-Михалева 1.jpg",
                photo2: "foto/Носова-Михалева 2.jpg"
            },
            {
                id: 2011,
                name: "Полторацкий Виктор",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Виктор Полторацкий 1.jpg",
                photo2: "foto/Виктор Полторацкий 2.jpg"
            },
            {
                id: 2012,
                name: "Пушкарёв Владимир",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Пушкарев 1.jpg",
                photo2: "foto/Пушкарев 2.jpg"
            },
            {
                id: 2013,
                name: "Смертина (Кочеткова) Светлана",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Смертина-Кочеткова 1.jpg",
                photo2: "foto/Смертина-Кочеткова 2.jpg"
            },
            {
                id: 2014,
                name: "Смирнова (Власова) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Смирнова-Власова 1.jpg",
                photo2: "foto/Смирнова-Власова 2.jpg"
            },
            {
                id: 2015,
                name: "Спирин Анатолий",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Анатолий Спирин 1.jpg",
                photo2: "foto/Анатолий Спирин 2.jpg"
            },
			{
                id: 2055,
                name: "Акжига Алдашева-Федосеева",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Алдашева-Федосеева 1.jpg",
                photo2: "foto/Алдашева-Федосеева 2.jpg"
            },
			{
                id: 2056,
                name: "Сергей Колокольников, Ирина Петровская",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Сергей Колокольников, Ирина Петровская 1.jpg",
                photo2: "foto/Сергей Колокольников, Ирина Петровская 1.jpg"
            },
            {
                id: 2016,
                name: "Федотов Виталий",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Виталий Федотов 1.jpg",
                photo2: "foto/Виталий Федотов 2.jpg"
            }
        ],
        haldersfild: [
            {
                id: 3001,
                name: "Есаулкова (Зуева) Алёна",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Андрей Зуев, Алёна Есаулкова 1.jpg",
                photo2: "foto/Андрей Зуев, Алёна Есаулкова 3.jpg"
            },
            {
                id: 3002,
                name: "Зуев Андрей",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Андрей Зуев, Алёна Есаулкова 2.jpg",
                photo2: "foto/Андрей Зуев, Алёна Есаулкова 3.jpg"
            }
        ],
        kumertau: [
            {
                id: 3003,
                name: "Юмаев Фаниль",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Фаниль Юмаев 1.jpg",
                photo2: "foto/Фаниль Юмаев 2.jpg"
            }
        ],
        apsheronsk: [
            {
                id: 3004,
                name: "Давыдова (Малухина) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Давыдова-Малухина 1.jpg",
                photo2: "foto/Давыдова-Малухина 2.jpg"
            }
        ],
        krasnodar: [
            {
                id: 3005,
                name: "Соколова(Рыбакова)Наталья",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Соколова-Рыбакова 1.jpg",
                photo2: "foto/Соколова-Рыбакова 2.jpg"
            }
        ],
        gatchina: [
            {
                id: 3006,
                name: "Благина (Власова) Светлана",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Благина-Власова 1.jpg",
                photo2: "foto/Благина-Власова 2.jpg"
            }
        ],
        orenburg: [
            {
                id: 3007,
                name: "Полищук ( Кузьмина) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Полищук-Кузьмина 1.jpg",
                photo2: "foto/Полищук-Кузьмина 2.jpg"
            }
        ],
        orsk: [
            {
                id: 3008,
                name: "Федоров Сергей",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Сергей Федоров, Светлана Колесова 2.jpg",
                photo2: "foto/Сергей Федоров, Светлана Колесова 3.jpg"
            },
			{
                id: 3111,
                name: "Федорова Светлана",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Сергей Федоров, Светлана Колесова 1.jpg",
                photo2: "foto/Сергей Федоров, Светлана Колесова 3.jpg"
            },			
            {
                id: 3009,
                name: "Кинжегулова( Дружинина) Антонина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Кинжегулова-Дружинина 1.jpg",
                photo2: "foto/Кинжегулова-Дружинина 2.jpg"
            }
        ],
        dobryanka: [
            {
                id: 3010,
                name: "Ивинских (Петухова) Наталья",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Наталья Ивинских 1.jpg",
                photo2: "foto/Наталья Ивинских 2.jpg"
            }
        ],
        perm: [
            {
                id: 3011,
                name: "Волкова (Старкова) Ольга",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Волкова-Старкова 1.jpg",
                photo2: "foto/Волкова-Старкова 2.jpg"
            }
        ],
        saratov: [
            {
                id: 3012,
                name: "Данилов Юрий",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Юрий Данилов 1.jpg",
                photo2: "foto/Юрий Данилов 2.jpg"
            }
        ],
        kamensk_uralskii: [
            {
                id: 3013,
                name: "Алексеева Надежда",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Надежда Алексеева 1.jpg",
                photo2: "foto/Надежда Алексеева 2.jpg"
            }
        ],
        kachkanar: [
            {
                id: 3014,
                name: "Овсянникова Светлана",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Овсянникова-Кочемасова 1.jpg",
                photo2: "foto/Овсянникова-Кочемасова 2.jpg"
            },
            {
                id: 3015,
                name: "Мамаева (Булатова) Светлана",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Мамаева-Бултанова 1.jpg",
                photo2: "foto/Мамаева-Бултанова 2.jpg"
            },
            {
                id: 3016,
                name: "Домаренко (Младенцева) Людмила",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Домаренко-Младенцева 1.jpg",
                photo2: "foto/Домаренко-Младенцева 2.jpg"
            }
        ],
        krasnoufimsk: [
            {
                id: 3017,
                name: "Соловей (Сисина) Елена",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Соловей-Сисина 1.jpg",
                photo2: "foto/Соловей-Сисина 2.jpg"
            }
        ],
        revda: [
            {
                id: 3018,
                name: "Ахмадеев Ягфар",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Ягфар Ахмадеев 1.jpg",
                photo2: "foto/Ягфар Ахмадеев 2.jpg"
            }
        ],
        serov: [
            {
                id: 3019,
                name: "Евстафьева (Токарева) Лариса",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Евстафьева-Токарева 1.jpg",
                photo2: "foto/Евстафьева-Токарева 2.jpg"
            },
            {
                id: 3020,
                name: "Олесевич (Палкина) Наташа",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Олесевич-Палкина 1.jpg",
                photo2: "foto/Олесевич - Палкина 2.jpg"
            }
        ],
        sysert: [
            {
                id: 3021,
                name: "Жуйкова (Глумова) Инга",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Жуйкова-Глумова 1.jpg",
                photo2: "foto/Жуйкова-Глумова 2.jpg"
            }
        ],
        tumen: [
            {
                id: 3022,
                name: "Новгородова ( Бачинина) Ирина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Новгородова-Бачинина 1.jpg",
                photo2: "foto/Новгородова-Бачинина 2.jpg"
            }
        ],
        izhevsk: [
            {
                id: 3023,
                name: "Гладкова (Холмогорова) Марина",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Гладкова-Холмогорова 1.jpg",
                photo2: "foto/Гладкова-Холмогорова 2.jpg"
            }
        ],
        zlatoust: [
            {
                id: 3024,
                name: "Золотухин Игорь",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Игорь Золотухин 1.jpg",
                photo2: "foto/Игорь Золотухин 2.jpg"
            }
        ],
        magnitogorsk: [
            {
                id: 3025,
                name: "Савинова (Лазарева) Инга",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Савинова-Лазарева 1.jpg",
                photo2: "foto/Савинова-Лазарева 2.jpg"
            },
            {
                id: 3026,
                name: "Рогозина( Галюк) Елена",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Рогозина-Галюк 1.jpg",
                photo2: "foto/Рогозина-Галюк 2.jpg"
            }
        ],
        snezhinsk: [
            {
                id: 3027,
                name: "Безденежных (Халдина) Лариса",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Александр Халдин Лариса Безденежных 1.jpg",
                photo2: "foto/Александр Халдин Лариса Безденежных 3.jpg"
            },
            {
                id: 3028,
                name: "Халдин Александр",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Александр Халдин Лариса Безденежных 2.jpg",
                photo2: "foto/Александр Халдин Лариса Безденежных 3.jpg"
            }
        ],
        troick: [
            {
                id: 3029,
                name: "Пойловы Надежда и Сергей",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Надежда Смольникова, Сергей Пойлов 1.jpg",
                photo2: "foto/Надежда Смольникова, Сергей Пойлов 2.jpg"
            }
        ],
        chelyabinsk: [
            {
                id: 3030,
                name: "Заслонова (Шевченко) Лариса",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Заслонова-Шевченко 1.jpg",
                photo2: "foto/Заслонова-Шевченко 2.jpg"
            }
        ],
		kartali: [
            {
                id: 3033,
                name: "Виктор Бабенко, Ирина Позднякова. Семья Бабенко",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Виктор Бабенко, Ирина Позднякова 1.jpg",
                photo2: "foto/Виктор Бабенко, Ирина Позднякова  3.jpg"
            },
			{
                id: 3034,
                name: "Виктор Бабенко, Ирина Позднякова. Семья Бабенко",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Виктор Бабенко, Ирина Позднякова 2.jpg",
                photo2: "foto/Виктор Бабенко, Ирина Позднякова  3.jpg"
            }
        ],
		irbit: [
            {
                id: 3031,
                name: "Евгений Рулев",
                position: "Выпуск 1988 года",
                company: "Выпускник УЭМИИТ",
                photo1: "foto/Евгений Рулев 1.jpg",
                photo2: "foto/Евгений Рулев 2.jpg"
            }
        ]
    }
};

// Глобальные переменные для навигации по фото
let currentPhotoIndex = 0;
let currentPersonPhotos = [];
let currentPersonName = "";

// Функция для получения всех фото человека
function getAllPersonPhotos(cityId, personId) {
    const cityPeople = citiesData.people[cityId];
    if (!cityPeople) return [];
    
    const person = cityPeople.find(p => p.id === personId);
    if (!person) return [];
    
    const photos = [];
    if (person.photo1 && person.photo1.trim() !== "") photos.push(person.photo1);
    if (person.photo2 && person.photo2.trim() !== "" && person.photo2 !== person.photo1) photos.push(person.photo2);
    
    return photos;
}

// Функция для обновления счетчика фото
function updatePhotoCounter() {
    const counter = document.getElementById('photoCounter');
    if (counter && currentPersonPhotos.length > 1) {
        counter.textContent = `${currentPhotoIndex + 1} / ${currentPersonPhotos.length}`;
        counter.style.display = 'block';
    } else if (counter) {
        counter.style.display = 'none';
    }
}

// Для обратной совместимости добавляем поле photo
function preparePeopleData() {
    for (const cityId in citiesData.people) {
        citiesData.people[cityId].forEach(person => {
            // Если есть photo1, используем его как основное фото
            if (person.photo1 && !person.photo) {
                person.photo = person.photo1;
            }
        });
    }
}

// Подготавливаем данные при загрузке
preparePeopleData();

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

function getPeopleCount(cityId) {
    return citiesData.people[cityId] ? citiesData.people[cityId].length : 0;
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
