const translations = {
    ru: {
        navHome: "Главная",
        navServices: "Услуги",
        navAbout: "О компании",
        navContacts: "Контакты",
        welcomeTitle: "Добро пожаловать!",
        welcomeText: "Мы строим дома, ремонтируем квартиры и создаём комфорт для вас.",
        servicesTitle: "Наши услуги",
        servicesList: [
            "Реконструкция",
            "Постройка домов с нуля",
            "Демонтаж",
            "Ремонт"
        ],
        repairTitle: "Ремонт:",
        repairList: [
            "Косметический — 130",
            "Капитальный — 270",
            "Дизайнерский — 450"
        ],
        aboutTitle: "О компании",
        aboutText: "KvaliteetEhitus OÜ — это команда профессионалов с более чем 10-летним опытом в строительстве и ремонте. Мы воплощаем идеи в реальность: от уютных квартир до масштабных проектов. Наш приоритет — качество, надежность и соблюдение сроков. Мы верим, что ваш дом — это ваша крепость, и создаём его с вниманием к каждой детали.",
        contactsTitle: "Контакты",
        emailLabel: "📧 Почта:",
        phoneLabel: "📞 Номер телефона:"
    },
    et: {
        navHome: "Avaleht",
        navServices: "Teenused",
        navAbout: "Meist",
        navContacts: "Kontaktid",
        welcomeTitle: "Tere tulemast!",
        welcomeText: "Me ehitame maju, remondime kortereid ja loome teile mugavust.",
        servicesTitle: "Meie teenused",
        servicesList: [
            "Rekonstrueerimine",
            "Majade ehitamine nullist",
            "Lammutustööd",
            "Remont"
        ],
        repairTitle: "Remont:",
        repairList: [
            "Kosmeetiline — 130",
            "Kapitaalne — 270",
            "Disain — 450"
        ],
        aboutTitle: "Meist",
        aboutText: "KvaliteetEhitus OÜ on professionaalne meeskond, kellel on üle 10 aasta kogemust ehituse ja remondi vallas. Me viime ellu teie ideed — alates hubastest korteritest kuni suurte projektideni. Meie prioriteedid on kvaliteet, usaldusväärsus ja tähtaegadest kinnipidamine. Usume, et teie kodu on teie kindlus ning loome selle hoolikalt iga detaili osas.",
        contactsTitle: "Meie kontaktid",
        emailLabel: "📧 Email:",
        phoneLabel: "📞 Telefoninumber:"
    }
};

// Переключение языка
function setLang(lang) {
    document.getElementById("nav-home").textContent = translations[lang].navHome;
    document.getElementById("nav-services").textContent = translations[lang].navServices;
    document.getElementById("nav-about").textContent = translations[lang].navAbout;
    document.getElementById("nav-contacts").textContent = translations[lang].navContacts;
    document.getElementById("welcome-title").textContent = translations[lang].welcomeTitle;
    document.getElementById("welcome-text").textContent = translations[lang].welcomeText;
    document.getElementById("services-title").textContent = translations[lang].servicesTitle;
    document.getElementById("about-title").textContent = translations[lang].aboutTitle;
    document.getElementById("about-text").textContent = translations[lang].aboutText;
    document.getElementById("contacts-title").textContent = translations[lang].contactsTitle;
    document.getElementById("email-label").textContent = translations[lang].emailLabel;
    document.getElementById("phone-label").textContent = translations[lang].phoneLabel;

    // Список услуг
    const servicesList = document.getElementById("services-list");
    servicesList.innerHTML = "";
    translations[lang].servicesList.forEach(service => {
        const li = document.createElement("li");
        li.textContent = service;
        servicesList.appendChild(li);
    });

    // ✅ Список видов ремонта
    document.getElementById("repair-title").textContent = translations[lang].repairTitle;
    const repairList = document.getElementById("repair-list");
    repairList.innerHTML = "";
    translations[lang].repairList.forEach(type => {
        const li = document.createElement("li");
        li.textContent = type;
        repairList.appendChild(li);
    });

    document.documentElement.lang = lang;
}

// Переключение секций
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// По умолчанию
setLang("ru");
showSection("home");
