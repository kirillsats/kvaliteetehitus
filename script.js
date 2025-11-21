import "./styles.css";

let givenProfile = "";
let profileName = "";
let profileID = "";
let profileLink = "";
let profileRepos = "";

/* Хранит ID интервалов для колонок, чтобы можно было очищать при перерендере */
let galleryIntervals = [];

/* --- Рендер страницы (включая блок профиля и галерею) --- */
function renderPage() {
  document.getElementById("app").innerHTML = `
    <div class="container">

      <header class="header">
        <h1 class="site-title">Строительная компания — Главная</h1>
        <div class="profile-box">
          <p>Поиск GitHub аккаунта:</p>
          <input id="github-input" placeholder="Введите GitHub имя" value="${givenProfile}" />
          <div class="content">
            <h2 id="nimi">Nimi: ${profileName ? profileName : "-"}</h2>
            <p id="profileid">ID: ${profileID ? profileID : "-"}</p>
            <p id="profilerepos">Repos: ${profileRepos ? profileRepos : "-"}</p>
            <p id="profileurl">Link: ${
              profileLink && profileName
                ? `<a href="${profileLink}" target="_blank">${profileLink}</a>`
                : "-"
            }</p>
          </div>
        </div>
      </header>

      <main>
        <section class="intro">
          <h2>Наши работы — До и После</h2>
          <p>Ниже — автоматические колонны с фотографиями проектов. Класть файлы в папку <code>img/</code>.</p>
        </section>

        <!-- ТРИ КОЛОНКИ ГАЛЕРЕИ -->
        <section class="triple-gallery">
          <div class="gallery-column" data-speed="5000">
            <!-- вставь свои фото сюда или в HTML ниже -->
            <img src="img/1.jpg" alt="">
            <img src="img/2.jpg" alt="">
            <img src="img/3.jpg" alt="">
            <img src="img/4.jpg" alt="">
            <img src="img/5.jpg" alt="">
            <img src="img/6.jpg" alt="">
          </div>

          <div class="gallery-column" data-speed="4200">
            <img src="img/7.jpg" alt="">
            <img src="img/8.jpg" alt="">
            <img src="img/9.jpg" alt="">
            <img src="img/10.jpg" alt="">
            <img src="img/11.jpg" alt="">
            <img src="img/12.jpg" alt="">
          </div>

          <div class="gallery-column" data-speed="3500">
            <img src="img/13.jpg" alt="">
            <img src="img/14.jpg" alt="">
            <img src="img/15.jpg" alt="">
            <img src="img/16.jpg" alt="">
            <img src="img/17.jpg" alt="">
            <img src="img/18.jpg" alt="">
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>© ${new Date().getFullYear()} Строительная компания</p>
      </footer>
    </div>
  `;

  // Повесим слушатель на input (не спрашиваем — просто делаем)
  const input = document.getElementById("github-input");
  if (input) {
    input.addEventListener("change", updateValue);
  }

  // После рендера — инициализируем галерею (очищает старые интервалы)
  initGallery();
}

/* --- Обработка изменения input --- */
function updateValue(e) {
  givenProfile = e.target.value.trim();
  fetchProfile();
}

/* --- Fetch GitHub профиля --- */
async function fetchProfile() {
  if (!givenProfile) {
    profileName = "";
    profileID = "";
    profileLink = "";
    profileRepos = "";
    renderPage();
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${givenProfile}`);
    const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");

    if (!response.ok) {
      profileName = "User not found";
      profileID = "-";
      profileLink = "";
      profileRepos = "-";
    } else {
      const data = await response.json();
      profileName = data.login || "-";
      profileID = data.id || "-";
      profileLink = data.html_url || "-";
      profileRepos = data.public_repos || "-";
    }

    if (rateLimitRemaining === "0") {
      profileName = "API rate limit reached. Try again later.";
      profileID = "-";
      profileLink = "";
      profileRepos = "-";
    }

    renderPage();
  } catch (e) {
    console.error(e);
    profileName = "Error";
    profileID = "-";
    profileLink = "";
    profileRepos = "-";
    renderPage();
  }
}

/* --- Инициализация галереи: ставим интервалы для каждой колонки.
       При каждом вызове очищаем предыдущие интервалы, чтобы не было "утечек". --- */
function initGallery() {
  // очистка предыдущих интервалов
  if (galleryIntervals.length) {
    galleryIntervals.forEach(id => clearInterval(id));
    galleryIntervals = [];
  }

  const columns = document.querySelectorAll(".gallery-column");
  columns.forEach(col => {
    // начальные параметры
    col.style.transition = "transform 0.8s ease-in-out";
    col.style.willChange = "transform";
    let index = 0;
    const imgs = col.querySelectorAll("img");
    const speed = col.dataset.speed ? parseInt(col.dataset.speed, 10) : 4000;

    // если нет изображений — ничего не делаем
    if (!imgs.length) return;

    // функция обновления с учётом фактической высоты изображения
    const step = () => {
      // высота одного изображения (берём актуальную высоту первого)
      const imgHeight = imgs[0].clientHeight || imgs[0].naturalHeight || 600;
      index = (index + 1) % imgs.length;
      col.style.transform = `translateY(-${index * imgHeight}px)`;
    };

    // стартовое положение (убедимся, что transform = 0)
    col.style.transform = `translateY(0px)`;

    // если картинка ещё не загружена, дождёмся, чтобы высота была корректной
    if (!imgs[0].complete) {
      imgs[0].addEventListener("load", () => {
        // подстраиваем (обнуляем), на случай если высота изменилась
        col.style.transform = `translateY(0px)`;
      }, { once: true });
    }

    // создаём интервал и сохраняем ID
    const id = setInterval(step, speed);
    galleryIntervals.push(id);

    // опционально: при наведении стопим автопрокрутку на этой колонке
    col.addEventListener("mouseenter", () => {
      clearInterval(id);
    });
    col.addEventListener("mouseleave", () => {
      // при уходе — создаём новый интервал и обновляем ID в массиве
      const newId = setInterval(step, speed);
      // заменим старый (удалённый) id в массиве на newId
      const pos = galleryIntervals.indexOf(id);
      if (pos !== -1) galleryIntervals[pos] = newId;
      else galleryIntervals.push(newId);
    });
  });
}

/* --- Инициализация начального рендера --- */
renderPage();
