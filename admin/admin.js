/* vasylian admin: the site owner's editor at site.com/admin/.
   Reads schema.json next to it (fields, labels, languages, the API address), signs in at the vasylian-admin Worker and saves
   the content there; the public pages pick it up with assets/js/cms.js. Photos are made smaller in the browser (<= 1600 px,
   WebP or JPEG, <= 2 MB) before they are sent. Nothing secret lives here: only this tab's 12-hour token (sessionStorage).
   Every text from the schema or the server is put in the page as text (never as HTML). */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var UI_LANGS = ['lv', 'ru', 'pl', 'et', 'uk', 'en'];
  var LANG_NAME = { lv: 'Latviešu', ru: 'Русский', pl: 'Polski', et: 'Eesti', uk: 'Українська', en: 'English' };
  var STR = {
    lv: { admin: 'Administrēšana', user: 'Lietotājvārds', pass: 'Parole', show: 'Rādīt paroli', hide: 'Slēpt paroli', signIn: 'Ieiet', signingIn: 'Pārbauda…',
      bad: 'Nepareizs lietotājvārds vai parole.', left: 'Atlikuši mēģinājumi: {n}.', locked: 'Pārāk daudz mēģinājumu. Mēģiniet vēlreiz pēc {m} min.',
      origin: 'No šīs adreses vietni rediģēt nevar.', net: 'Nav savienojuma ar serveri. Pārbaudiet internetu un mēģiniet vēlreiz.', srv: 'Serverī radās kļūda. Mēģiniet vēlreiz vēlāk.',
      expired: 'Sesija beigusies. Ielogojieties vēlreiz, izmaiņas nepazudīs.', save: 'Saglabāt', saving: 'Saglabā…',
      saved: 'Saglabāts. Vietnē izmaiņas būs redzamas pēc minūtes.', savedDemo: 'Saglabāts. Izmaiņas redzat tikai jūs.', dirty: 'Ir nesaglabātas izmaiņas',
      clean: 'Visas izmaiņas saglabātas', err: 'Neizdevās saglabāt. Mēģiniet vēlreiz.', badField: 'Lauks «{f}» nav aizpildīts pareizi.',
      unknownField: 'Lauks «{f}» vēl nav pieslēgts. Sazinieties ar izstrādātāju.', texts: 'Tekstu valoda', view: 'Skatīt vietni', logout: 'Iziet',
      undo: 'Atcelt pēdējo saglabāšanu', undoQ: 'Atgriezt vietni stāvoklī pirms pēdējās saglabāšanas?', undone: 'Atjaunots iepriekšējais variants.',
      noUndo: 'Iepriekšējā varianta nav.', add: 'Pievienot', remove: 'Dzēst', up: 'Uz augšu', down: 'Uz leju', removeQ: 'Dzēst šo ierakstu?',
      photo: 'Mainīt foto', photoUp: 'Augšupielādē foto…', photoOk: 'Foto augšupielādēts. Nospiediet «Saglabāt».',
      photoBad: 'Šo failu nevar atvērt kā foto. Izvēlieties JPG, PNG vai WEBP.', photoBig: 'Foto ir pārāk liels.', resetPhoto: 'Atjaunot oriģinālo',
      items: '{n} no {max}', demo: 'Šī ir demonstrācija: izmaiņas redzat tikai jūs, un pēc 24 stundām tās pazūd.',
      demoCreds: 'Demo pieeja: lietotājvārds {u}, parole {p}', busy: 'Uzgaidiet, foto vēl augšupielādējas.', limit: 'Sasniegts demo limits.',
      newItem: 'Jauns ieraksts', loadErr: 'Neizdevās ielādēt vietnes saturu.', schemaErr: 'Neizdevās ielādēt redaktora iestatījumus (schema.json).',
      item: 'Ieraksts {n}', orig: 'Oriģināls', empty: 'Tukšs: vietnē paliek oriģinālais teksts' },
    ru: { admin: 'Администрирование', user: 'Логин', pass: 'Пароль', show: 'Показать пароль', hide: 'Скрыть пароль', signIn: 'Войти', signingIn: 'Проверяем…',
      bad: 'Неверный логин или пароль.', left: 'Осталось попыток: {n}.', locked: 'Слишком много попыток. Попробуйте снова через {m} мин.',
      origin: 'С этого адреса редактировать сайт нельзя.', net: 'Нет связи с сервером. Проверьте интернет и попробуйте снова.', srv: 'Ошибка на сервере. Попробуйте позже.',
      expired: 'Сессия закончилась. Войдите снова, изменения не пропадут.', save: 'Сохранить', saving: 'Сохраняем…',
      saved: 'Сохранено. На сайте изменения появятся в течение минуты.', savedDemo: 'Сохранено. Изменения видите только вы.', dirty: 'Есть несохранённые изменения',
      clean: 'Все изменения сохранены', err: 'Не удалось сохранить. Попробуйте снова.', badField: 'Поле «{f}» заполнено неверно.',
      unknownField: 'Поле «{f}» ещё не подключено. Свяжитесь с разработчиком.', texts: 'Язык текстов', view: 'Открыть сайт', logout: 'Выйти',
      undo: 'Отменить последнее сохранение', undoQ: 'Вернуть сайт к состоянию до последнего сохранения?', undone: 'Предыдущий вариант восстановлен.',
      noUndo: 'Предыдущего варианта нет.', add: 'Добавить', remove: 'Удалить', up: 'Выше', down: 'Ниже', removeQ: 'Удалить эту запись?',
      photo: 'Заменить фото', photoUp: 'Загружаем фото…', photoOk: 'Фото загружено. Нажмите «Сохранить».',
      photoBad: 'Этот файл не открывается как фото. Выберите JPG, PNG или WEBP.', photoBig: 'Фото слишком большое.', resetPhoto: 'Вернуть исходное',
      items: '{n} из {max}', demo: 'Это демонстрация: изменения видите только вы, через 24 часа они исчезнут.',
      demoCreds: 'Демо-доступ: логин {u}, пароль {p}', busy: 'Подождите, фото ещё загружается.', limit: 'Достигнут лимит демо.',
      newItem: 'Новая запись', loadErr: 'Не удалось загрузить содержимое сайта.', schemaErr: 'Не удалось загрузить настройки редактора (schema.json).',
      item: 'Запись {n}', orig: 'Исходное', empty: 'Пусто: на сайте остаётся исходный текст' },
    pl: { admin: 'Panel administracyjny', user: 'Login', pass: 'Hasło', show: 'Pokaż hasło', hide: 'Ukryj hasło', signIn: 'Zaloguj się', signingIn: 'Sprawdzanie…',
      bad: 'Nieprawidłowy login lub hasło.', left: 'Pozostałe próby: {n}.', locked: 'Zbyt wiele prób. Spróbuj ponownie za {m} min.',
      origin: 'Z tego adresu nie można edytować strony.', net: 'Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.', srv: 'Błąd serwera. Spróbuj ponownie później.',
      expired: 'Sesja wygasła. Zaloguj się ponownie, zmiany nie zginą.', save: 'Zapisz', saving: 'Zapisywanie…',
      saved: 'Zapisano. Zmiany pojawią się na stronie w ciągu minuty.', savedDemo: 'Zapisano. Zmiany widzisz tylko Ty.', dirty: 'Niezapisane zmiany',
      clean: 'Wszystkie zmiany zapisane', err: 'Nie udało się zapisać. Spróbuj ponownie.', badField: 'Pole «{f}» jest wypełnione nieprawidłowo.',
      unknownField: 'Pole «{f}» nie jest jeszcze podłączone. Skontaktuj się z twórcą strony.', texts: 'Język tekstów', view: 'Zobacz stronę', logout: 'Wyloguj',
      undo: 'Cofnij ostatni zapis', undoQ: 'Przywrócić stronę do stanu sprzed ostatniego zapisu?', undone: 'Przywrócono poprzednią wersję.',
      noUndo: 'Brak poprzedniej wersji.', add: 'Dodaj', remove: 'Usuń', up: 'W górę', down: 'W dół', removeQ: 'Usunąć ten wpis?',
      photo: 'Zmień zdjęcie', photoUp: 'Wysyłanie zdjęcia…', photoOk: 'Zdjęcie wysłane. Naciśnij «Zapisz».',
      photoBad: 'Tego pliku nie da się otworzyć jako zdjęcia. Wybierz JPG, PNG lub WEBP.', photoBig: 'Zdjęcie jest za duże.', resetPhoto: 'Przywróć oryginał',
      items: '{n} z {max}', demo: 'To jest demo: zmiany widzisz tylko Ty i znikają po 24 godzinach.',
      demoCreds: 'Demo: login {u}, hasło {p}', busy: 'Poczekaj, zdjęcie jeszcze się wysyła.', limit: 'Osiągnięto limit demo.',
      newItem: 'Nowy wpis', loadErr: 'Nie udało się wczytać treści strony.', schemaErr: 'Nie udało się wczytać ustawień edytora (schema.json).',
      item: 'Wpis {n}', orig: 'Oryginał', empty: 'Puste: na stronie zostaje oryginalny tekst' },
    et: { admin: 'Haldus', user: 'Kasutajanimi', pass: 'Parool', show: 'Näita parooli', hide: 'Peida parool', signIn: 'Logi sisse', signingIn: 'Kontrollin…',
      bad: 'Vale kasutajanimi või parool.', left: 'Katseid jäänud: {n}.', locked: 'Liiga palju katseid. Proovige uuesti {m} minuti pärast.',
      origin: 'Sellelt aadressilt ei saa saiti muuta.', net: 'Serveriga ei saa ühendust. Kontrollige internetti ja proovige uuesti.', srv: 'Serveri viga. Proovige hiljem uuesti.',
      expired: 'Seanss on lõppenud. Logige uuesti sisse, muudatused jäävad alles.', save: 'Salvesta', saving: 'Salvestan…',
      saved: 'Salvestatud. Saidil on muudatused näha umbes minuti pärast.', savedDemo: 'Salvestatud. Muudatusi näete ainult teie.', dirty: 'Salvestamata muudatused',
      clean: 'Kõik muudatused on salvestatud', err: 'Salvestamine ebaõnnestus. Proovige uuesti.', badField: 'Väli «{f}» ei ole korrektne.',
      unknownField: 'Väli «{f}» pole veel ühendatud. Võtke ühendust arendajaga.', texts: 'Tekstide keel', view: 'Vaata saiti', logout: 'Logi välja',
      undo: 'Tühista viimane salvestus', undoQ: 'Kas taastada sait viimase salvestuse eelsesse seisu?', undone: 'Eelmine versioon on taastatud.',
      noUndo: 'Eelmist versiooni ei ole.', add: 'Lisa', remove: 'Kustuta', up: 'Üles', down: 'Alla', removeQ: 'Kas kustutada see kirje?',
      photo: 'Vaheta foto', photoUp: 'Laadin fotot üles…', photoOk: 'Foto on üles laaditud. Vajutage «Salvesta».',
      photoBad: 'Seda faili ei saa fotona avada. Valige JPG, PNG või WEBP.', photoBig: 'Foto on liiga suur.', resetPhoto: 'Taasta algne',
      items: '{n} / {max}', demo: 'See on demo: muudatusi näete ainult teie ja need kaovad 24 tunni pärast.',
      demoCreds: 'Demo: kasutajanimi {u}, parool {p}', busy: 'Oodake, foto laadimine on pooleli.', limit: 'Demo piirang on täis.',
      newItem: 'Uus kirje', loadErr: 'Saidi sisu ei õnnestunud laadida.', schemaErr: 'Redaktori seadeid (schema.json) ei õnnestunud laadida.',
      item: 'Kirje {n}', orig: 'Algne', empty: 'Tühi: saidil jääb algne tekst' },
    uk: { admin: 'Адміністрування', user: 'Логін', pass: 'Пароль', show: 'Показати пароль', hide: 'Сховати пароль', signIn: 'Увійти', signingIn: 'Перевіряємо…',
      bad: 'Неправильний логін або пароль.', left: 'Залишилося спроб: {n}.', locked: 'Забагато спроб. Спробуйте знову через {m} хв.',
      origin: 'З цієї адреси редагувати сайт не можна.', net: 'Немає зв’язку із сервером. Перевірте інтернет і спробуйте знову.', srv: 'Помилка на сервері. Спробуйте пізніше.',
      expired: 'Сесія завершилася. Увійдіть знову, зміни не зникнуть.', save: 'Зберегти', saving: 'Зберігаємо…',
      saved: 'Збережено. На сайті зміни з’являться протягом хвилини.', savedDemo: 'Збережено. Зміни бачите лише ви.', dirty: 'Є незбережені зміни',
      clean: 'Усі зміни збережено', err: 'Не вдалося зберегти. Спробуйте знову.', badField: 'Поле «{f}» заповнено неправильно.',
      unknownField: 'Поле «{f}» ще не підключене. Зверніться до розробника.', texts: 'Мова текстів', view: 'Відкрити сайт', logout: 'Вийти',
      undo: 'Скасувати останнє збереження', undoQ: 'Повернути сайт до стану перед останнім збереженням?', undone: 'Попередній варіант відновлено.',
      noUndo: 'Попереднього варіанта немає.', add: 'Додати', remove: 'Видалити', up: 'Вище', down: 'Нижче', removeQ: 'Видалити цей запис?',
      photo: 'Замінити фото', photoUp: 'Завантажуємо фото…', photoOk: 'Фото завантажено. Натисніть «Зберегти».',
      photoBad: 'Цей файл не відкривається як фото. Виберіть JPG, PNG або WEBP.', photoBig: 'Фото завелике.', resetPhoto: 'Повернути початкове',
      items: '{n} з {max}', demo: 'Це демонстрація: зміни бачите лише ви, через 24 години вони зникнуть.',
      demoCreds: 'Демо-доступ: логін {u}, пароль {p}', busy: 'Зачекайте, фото ще завантажується.', limit: 'Досягнуто ліміту демо.',
      newItem: 'Новий запис', loadErr: 'Не вдалося завантажити вміст сайту.', schemaErr: 'Не вдалося завантажити налаштування редактора (schema.json).',
      item: 'Запис {n}', orig: 'Початкове', empty: 'Порожньо: на сайті лишається початковий текст' },
    en: { admin: 'Site editor', user: 'Username', pass: 'Password', show: 'Show password', hide: 'Hide password', signIn: 'Sign in', signingIn: 'Checking…',
      bad: 'Wrong username or password.', left: 'Tries left: {n}.', locked: 'Too many tries. Try again in {m} min.',
      origin: 'The site cannot be edited from this address.', net: 'No connection to the server. Check the internet and try again.', srv: 'Server error. Please try again later.',
      expired: 'Your session has ended. Sign in again; your changes are kept.', save: 'Save', saving: 'Saving…',
      saved: 'Saved. The site shows the changes within a minute.', savedDemo: 'Saved. Only you see these changes.', dirty: 'Unsaved changes',
      clean: 'All changes saved', err: 'Could not save. Please try again.', badField: 'The field «{f}» is not filled in correctly.',
      unknownField: 'The field «{f}» is not connected yet. Please contact the developer.', texts: 'Text language', view: 'View site', logout: 'Sign out',
      undo: 'Undo the last save', undoQ: 'Return the site to how it was before the last save?', undone: 'The previous version is back.',
      noUndo: 'There is no previous version.', add: 'Add', remove: 'Delete', up: 'Move up', down: 'Move down', removeQ: 'Delete this item?',
      photo: 'Change photo', photoUp: 'Uploading the photo…', photoOk: 'Photo uploaded. Press «Save».',
      photoBad: 'This file cannot be opened as a photo. Choose a JPG, PNG or WEBP.', photoBig: 'The photo is too large.', resetPhoto: 'Restore the original',
      items: '{n} of {max}', demo: 'This is a demo: only you see your changes, and they disappear after 24 hours.',
      demoCreds: 'Demo access: username {u}, password {p}', busy: 'Please wait, a photo is still uploading.', limit: 'The demo limit is reached.',
      newItem: 'New item', loadErr: 'Could not load the site content.', schemaErr: 'Could not load the editor settings (schema.json).',
      item: 'Item {n}', orig: 'Original', empty: 'Empty: the site keeps its original text' }
  };
  // 23.11: works with several photos ("ui": "albums"), choice buttons, texts grouped by language, phone and e-mail checks
  var MORE = {
    lv: { addWork: 'Pievienot darbu', addPhotos: 'Pievienot foto', emptyAlbums: 'Šeit vēl nav neviena darba. Nospiediet «{b}» un izvēlieties foto no telefona galerijas.',
      nPhotos: '{n} foto', noPhoto: 'Pievienojiet vismaz vienu foto: bez foto darbs vietnē neparādīsies.', cover: 'Galvenais', makeCover: 'Padarīt par galveno',
      left: 'Pa kreisi', right: 'Pa labi', removePhoto: 'Dzēst foto', removePhotoQ: 'Noņemt šo foto no vietnes?', removeWork: 'Dzēst darbu',
      removeWorkQ: 'Dzēst šo darbu un visus tā foto no vietnes?', prep: 'Sagatavo foto {i} no {n}…', upl: 'Augšupielādē foto {i} no {n}…',
      uplDone: 'Foto augšupielādēti. Nospiediet «Saglabāt», lai tie parādītos vietnē.', tooMany: 'Vienā darbā var būt līdz {max} foto. Liekie netika pievienoti.',
      failed: 'Neizdevās', retry: 'Mēģināt vēlreiz', otherLangs: 'Citas valodas (nav obligāti)', optional: '(nav obligāti)', workN: 'Darbs {n}',
      badTel: 'Pārbaudiet numuru laukā «{f}».', badMail: 'Pārbaudiet e-pasta adresi laukā «{f}».', full: 'Vietas foto vairs nav. Sazinieties ar izstrādātāju.',
      busyMany: 'Uzgaidiet, foto vēl augšupielādējas.', photoN: 'Foto {i}', photoHint: '★ padara foto par galveno (vietnē tas ir pirmais). Secība: pārvelciet foto aiz punktiem stūrī vai spiediet bultiņas.', drag: 'Pārvilkt foto', dragWork: 'Pārvilkt darbu', worksHint: 'Darbu secība: pārvelciet darbu aiz punktiem kreisajā pusē vai ar pogām «Uz augšu» un «Uz leju».' },
    ru: { addWork: 'Добавить работу', addPhotos: 'Добавить фото', emptyAlbums: 'Здесь пока нет работ. Нажмите «{b}» и выберите фото из галереи телефона.',
      nPhotos: '{n} фото', noPhoto: 'Добавьте хотя бы одно фото: без фото работа не появится на сайте.', cover: 'Главное', makeCover: 'Сделать главным',
      left: 'Левее', right: 'Правее', removePhoto: 'Удалить фото', removePhotoQ: 'Убрать это фото с сайта?', removeWork: 'Удалить работу',
      removeWorkQ: 'Удалить эту работу и все её фото с сайта?', prep: 'Готовим фото {i} из {n}…', upl: 'Загружаем фото {i} из {n}…',
      uplDone: 'Фото загружены. Нажмите «Сохранить», чтобы они появились на сайте.', tooMany: 'В одной работе можно до {max} фото. Лишние не добавлены.',
      failed: 'Не загрузилось', retry: 'Повторить', otherLangs: 'Другие языки (необязательно)', optional: '(необязательно)', workN: 'Работа {n}',
      badTel: 'Проверьте номер в поле «{f}».', badMail: 'Проверьте адрес почты в поле «{f}».', full: 'Место для фото закончилось. Напишите разработчику.',
      busyMany: 'Подождите, фото ещё загружаются.', photoN: 'Фото {i}', photoHint: '★ делает фото главным (на сайте оно первое). Порядок: перетащите фото за точки в углу или нажимайте стрелки.', drag: 'Перетащить фото', dragWork: 'Перетащить работу', worksHint: 'Порядок работ: перетащите работу за точки слева или кнопками «Выше» и «Ниже».' },
    pl: { addWork: 'Dodaj realizację', addPhotos: 'Dodaj zdjęcia', emptyAlbums: 'Nie ma tu jeszcze realizacji. Naciśnij «{b}» i wybierz zdjęcia z galerii telefonu.',
      nPhotos: '{n} zdj.', noPhoto: 'Dodaj co najmniej jedno zdjęcie: bez zdjęć realizacja nie pojawi się na stronie.', cover: 'Główne', makeCover: 'Ustaw jako główne',
      left: 'W lewo', right: 'W prawo', removePhoto: 'Usuń zdjęcie', removePhotoQ: 'Usunąć to zdjęcie ze strony?', removeWork: 'Usuń realizację',
      removeWorkQ: 'Usunąć tę realizację i wszystkie jej zdjęcia ze strony?', prep: 'Przygotowanie zdjęcia {i} z {n}…', upl: 'Wysyłanie zdjęcia {i} z {n}…',
      uplDone: 'Zdjęcia wysłane. Naciśnij «Zapisz», aby pojawiły się na stronie.', tooMany: 'Jedna realizacja może mieć do {max} zdjęć. Nadmiarowe nie zostały dodane.',
      failed: 'Nie wysłano', retry: 'Ponów', otherLangs: 'Inne języki (opcjonalnie)', optional: '(opcjonalnie)', workN: 'Realizacja {n}',
      badTel: 'Sprawdź numer w polu «{f}».', badMail: 'Sprawdź adres e-mail w polu «{f}».', full: 'Brak miejsca na zdjęcia. Skontaktuj się z twórcą strony.',
      busyMany: 'Poczekaj, zdjęcia jeszcze się wysyłają.', photoN: 'Zdjęcie {i}', photoHint: '★ ustawia zdjęcie jako główne (na stronie jest pierwsze). Kolejność: przeciągnij zdjęcie za kropki w rogu albo użyj strzałek.', drag: 'Przeciągnij zdjęcie', dragWork: 'Przeciągnij realizację', worksHint: 'Kolejność realizacji: przeciągnij za kropki po lewej albo użyj przycisków «W górę» i «W dół».' },
    et: { addWork: 'Lisa töö', addPhotos: 'Lisa fotod', emptyAlbums: 'Siin pole veel ühtegi tööd. Vajutage «{b}» ja valige fotod telefoni galeriist.',
      nPhotos: '{n} fotot', noPhoto: 'Lisage vähemalt üks foto: ilma fotota tööd saidil ei näidata.', cover: 'Peamine', makeCover: 'Tee peamiseks',
      left: 'Vasakule', right: 'Paremale', removePhoto: 'Kustuta foto', removePhotoQ: 'Kas eemaldada see foto saidilt?', removeWork: 'Kustuta töö',
      removeWorkQ: 'Kas kustutada see töö koos kõigi fotodega saidilt?', prep: 'Valmistan ette fotot {i}/{n}…', upl: 'Laadin üles fotot {i}/{n}…',
      uplDone: 'Fotod on üles laaditud. Vajutage «Salvesta», et need saidil näha oleksid.', tooMany: 'Ühes töös võib olla kuni {max} fotot. Ülejäänuid ei lisatud.',
      failed: 'Ei õnnestunud', retry: 'Proovi uuesti', otherLangs: 'Teised keeled (ei ole kohustuslik)', optional: '(ei ole kohustuslik)', workN: 'Töö {n}',
      badTel: 'Kontrollige numbrit väljal «{f}».', badMail: 'Kontrollige e-posti aadressi väljal «{f}».', full: 'Fotode jaoks pole enam ruumi. Võtke ühendust arendajaga.',
      busyMany: 'Oodake, fotode üleslaadimine on pooleli.', photoN: 'Foto {i}', photoHint: '★ teeb foto peamiseks (saidil on see esimene). Järjekord: lohistage fotot nurgas olevatest punktidest või vajutage nooli.', drag: 'Lohista fotot', dragWork: 'Lohista tööd', worksHint: 'Tööde järjekord: lohistage tööd vasakul olevatest punktidest või nuppudega «Üles» ja «Alla».' },
    uk: { addWork: 'Додати роботу', addPhotos: 'Додати фото', emptyAlbums: 'Тут поки немає робіт. Натисніть «{b}» і виберіть фото з галереї телефона.',
      nPhotos: '{n} фото', noPhoto: 'Додайте хоча б одне фото: без фото робота не з’явиться на сайті.', cover: 'Головне', makeCover: 'Зробити головним',
      left: 'Ліворуч', right: 'Праворуч', removePhoto: 'Видалити фото', removePhotoQ: 'Прибрати це фото із сайту?', removeWork: 'Видалити роботу',
      removeWorkQ: 'Видалити цю роботу і всі її фото із сайту?', prep: 'Готуємо фото {i} з {n}…', upl: 'Завантажуємо фото {i} з {n}…',
      uplDone: 'Фото завантажено. Натисніть «Зберегти», щоб вони з’явилися на сайті.', tooMany: 'В одній роботі може бути до {max} фото. Зайві не додано.',
      failed: 'Не завантажилося', retry: 'Повторити', otherLangs: 'Інші мови (необов’язково)', optional: '(необов’язково)', workN: 'Робота {n}',
      badTel: 'Перевірте номер у полі «{f}».', badMail: 'Перевірте адресу пошти в полі «{f}».', full: 'Місце для фото закінчилося. Зверніться до розробника.',
      busyMany: 'Зачекайте, фото ще завантажуються.', photoN: 'Фото {i}', photoHint: '★ робить фото головним (на сайті воно перше). Порядок: перетягніть фото за крапки в куті або натискайте стрілки.', drag: 'Перетягнути фото', dragWork: 'Перетягнути роботу', worksHint: 'Порядок робіт: перетягніть роботу за крапки ліворуч або кнопками «Вище» і «Нижче».' },
    en: { addWork: 'Add a project', addPhotos: 'Add photos', emptyAlbums: 'No projects here yet. Press «{b}» and pick photos from the phone gallery.',
      nPhotos: '{n} photos', noPhoto: 'Add at least one photo: a project without photos does not show on the site.', cover: 'Main', makeCover: 'Make main photo',
      left: 'Move left', right: 'Move right', removePhoto: 'Delete photo', removePhotoQ: 'Remove this photo from the site?', removeWork: 'Delete project',
      removeWorkQ: 'Delete this project and all its photos from the site?', prep: 'Preparing photo {i} of {n}…', upl: 'Uploading photo {i} of {n}…',
      uplDone: 'Photos uploaded. Press «Save» to show them on the site.', tooMany: 'A project can have up to {max} photos. The extra ones were not added.',
      failed: 'Not uploaded', retry: 'Try again', otherLangs: 'Other languages (optional)', optional: '(optional)', workN: 'Project {n}',
      badTel: 'Please check the number in «{f}».', badMail: 'Please check the e-mail address in «{f}».', full: 'There is no more room for photos. Please contact the developer.',
      busyMany: 'Please wait, photos are still uploading.', photoN: 'Photo {i}', photoHint: '★ makes a photo the main one (it comes first on the site). Order: drag a photo by the dots in its corner or use the arrows.', drag: 'Drag the photo', dragWork: 'Drag the project', worksHint: 'Order of projects: drag a project by the dots on the left or use «Move up» and «Move down».' }
  };
  Object.keys(MORE).forEach(function (l) { Object.keys(MORE[l]).forEach(function (k) { STR[l][k] = MORE[l][k]; }); });
  var ICON = {
    eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    eyeOff: 'M3 3l18 18M10.6 6.1A10.7 10.7 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.1 3.9M6.6 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2',
    up: 'M12 19V5M5 12l7-7 7 7', down: 'M12 5v14M19 12l-7 7-7-7', trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
    plus: 'M12 5v14M5 12h14', ext: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5', out: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
    photo: 'M4 7h3l2-2h6l2 2h3v12H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', undo: 'M9 7L4 12l5 5M4 12h11a5 5 0 0 1 0 10h-2', chev: 'M6 9l6 6 6-6',
    left: 'M15 5l-7 7 7 7', right: 'M9 5l7 7-7 7', x: 'M6 6l12 12M18 6L6 18',
    star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
    grip: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01'
  };

  var S = null, API = '', SLUG = '', ui = 'lv', clang = null, auth = null;
  var base = {}, cur = {}, busy = 0, open = {}, dialogPromise = null;
  var store = function (kind) { try { var s = window[kind]; s.getItem('x'); return s; } catch (e) { return null; } };
  var SS = store('sessionStorage'), LS = store('localStorage');

  /* ---------------------------------------------------------------- small helpers */
  function t(k, vars) {
    var s = (STR[ui] && STR[ui][k]) || STR.en[k] || k;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, n) { return vars[n] != null ? vars[n] : m; });
    return s;
  }
  function L(x, fallback) {
    if (x == null) return fallback || '';
    if (typeof x === 'string') return x;
    return x[ui] || x.en || x.lv || x[Object.keys(x)[0]] || fallback || '';
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') el.textContent = v;
      else if (k === 'class') el.className = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      (Array.isArray(c) ? c : [c]).forEach(function (x) { if (x != null && x !== false) el.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
    }
    return el;
  }
  function icon(name) {
    var NS = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS(NS, 'path'); p.setAttribute('d', ICON[name]); s.appendChild(p);
    return s;
  }
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var langs = function () { return Array.isArray(S.langs) ? S.langs : []; };
  var isI18n = function (f) { return !!f.i18n && langs().length > 0; };
  function siteUrl(rel) {
    try { return new URL(rel || '', new URL(S.site || '../', location.href)).href; } catch (e) { return rel; }
  }

  /* ---------------------------------------------------------------- session */
  var AKEY = function () { return 'cms:auth:' + SLUG; };
  function loadAuth() {
    try {
      var a = JSON.parse(SS && SS.getItem(AKEY()) || 'null');
      if (a && a.token && a.exp - 30 > Date.now() / 1000) return a;
    } catch (e) {}
    return null;
  }
  function saveAuth(a) {
    auth = a;
    if (SS) { try { if (a) SS.setItem(AKEY(), JSON.stringify(a)); else SS.removeItem(AKEY()); } catch (e) {} }
    if (a && a.sb && LS) { try { LS.setItem('cms:sb:' + SLUG, a.sb); } catch (e) {} }
  }

  function call(method, path, body, headers) {
    var hd = Object.assign({}, headers || {});
    if (auth) hd.Authorization = 'Bearer ' + auth.token;
    var b = body;
    if (body != null && !(window.Blob && body instanceof Blob)) { b = JSON.stringify(body); hd['Content-Type'] = 'application/json'; }
    return fetch(API + path, { method: method, headers: hd, body: b, mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j || {} }; }); })
      .catch(function () { return { status: 0, j: { error: 'network' } }; });
  }
  // runs fn(); when the token has run out, asks for the password in a dialog (the edits stay) and runs fn() again
  function withSession(fn) {
    return fn().then(function (r) {
      if (r.status !== 401) return r;
      return askLogin(t('expired')).then(function () { return fn(); });
    });
  }

  /* ---------------------------------------------------------------- start */
  function fatal(msg) {
    app.className = 'app';
    app.removeAttribute('aria-busy');
    app.textContent = '';
    app.appendChild(h('div', { class: 'login' }, h('div', { class: 'login__card' }, h('p', { class: 'login__msg', role: 'alert', text: msg }))));
  }
  function pickUi() {
    var saved = LS && LS.getItem('cms:ui');
    if (saved && STR[saved]) return saved;
    if (S.ui && STR[S.ui]) return S.ui;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return STR[nav] ? nav : 'lv';
  }
  function accent(c) {
    if (!/^#[0-9a-f]{6}$/i.test(c || '')) return;
    var n = parseInt(c.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255;
    var root = document.documentElement.style;
    root.setProperty('--a', c);
    root.setProperty('--a-soft', 'rgba(' + r + ',' + g + ',' + b + ',.1)');
    root.setProperty('--a-ink', (0.2126 * r + 0.7152 * g + 0.0722 * b) > 160 ? '#1b1d1f' : '#ffffff');
  }
  function start() {
    fetch('schema.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (s) {
        S = s;
        API = String(S.api || '').replace(/\/+$/, '');
        SLUG = String(S.slug || '');
        ui = pickUi();
        clang = langs()[0] || null;
        accent(S.accent);
        document.documentElement.lang = ui;
        auth = loadAuth();
        if (auth) return enter();
        renderLogin();
      })
      .catch(function () { STR[ui] = STR[ui] || STR.lv; fatal(t('schemaErr')); });
  }
  function enter() {
    app.classList.add('is-loading');
    var sb = auth && auth.sb ? '&sb=' + encodeURIComponent(auth.sb) : '';
    return fetch(API + '/c/' + SLUG + '?fresh=1' + sb, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(function (r) {
        if (r.status === 404) return { data: {} };
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (c) {
        base = withDefaults(c.data || {});
        cur = clone(base);
        renderEditor();
      })
      .catch(function () { fatal(t('loadErr')); });
  }
  // fields the content does not have yet start from the schema's "default" (when it gives one)
  function withDefaults(d) {
    (S.sections || []).forEach(function (s) {
      (s.fields || []).forEach(function (f) {
        if (d[f.key] === undefined && f['default'] !== undefined && f.type !== 'image') d[f.key] = clone(f['default']);
      });
    });
    return d;
  }

  /* ---------------------------------------------------------------- login */
  function langSelect(onChange) {
    var offered = (Array.isArray(S.uiLangs) && S.uiLangs.length ? S.uiLangs : UI_LANGS).filter(function (l) { return STR[l]; });
    var sel = h('select', { 'aria-label': 'Language', onchange: function () { ui = sel.value; if (LS) { try { LS.setItem('cms:ui', ui); } catch (e) {} } document.documentElement.lang = ui; onChange(); } },
      offered.map(function (l) { var o = h('option', { value: l, text: LANG_NAME[l] }); if (l === ui) o.selected = true; return o; }));
    return sel;
  }
  function loginCard(msg, onDone, inDialog) {
    var user = h('input', { class: 'in', id: 'cmsUser', name: 'username', autocomplete: 'username', autocapitalize: 'off', spellcheck: 'false', required: true, maxlength: '64' });
    var pass = h('input', { class: 'in', id: 'cmsPass', name: 'password', type: 'password', autocomplete: 'current-password', required: true, maxlength: '256' });
    var eye = h('button', { type: 'button', class: 'btn btn--ghost btn--icon', 'aria-label': t('show'), 'aria-pressed': 'false' }, icon('eye'));
    eye.addEventListener('click', function () {
      var showing = pass.type === 'text';
      pass.type = showing ? 'password' : 'text';
      eye.setAttribute('aria-pressed', showing ? 'false' : 'true');
      eye.setAttribute('aria-label', t(showing ? 'show' : 'hide'));
      eye.replaceChild(icon(showing ? 'eye' : 'eyeOff'), eye.firstChild);
    });
    var go = h('button', { type: 'submit', class: 'btn btn--a login__go', text: t('signIn') });
    var out = h('p', { class: 'login__msg', role: 'alert', 'aria-live': 'assertive', text: msg || '' });
    if (S.demo && S.demo.user) { user.value = S.demo.user; pass.value = S.demo.pass || ''; }
    else if (auth && auth.user) user.value = auth.user;
    else if (LS && LS.getItem('cms:user:' + SLUG)) user.value = LS.getItem('cms:user:' + SLUG);

    var form = h('form', { class: 'login__card', novalidate: true, 'aria-labelledby': 'cmsLoginH' },
      h('p', { class: 'login__site', text: S.title || SLUG }),
      h('h1', { class: 'login__h', id: 'cmsLoginH', text: t('admin') }),
      h('label', { class: 'field', for: 'cmsUser' }, h('span', { class: 'field__l', text: t('user') }), user),
      h('label', { class: 'field', for: 'cmsPass' }, h('span', { class: 'field__l', text: t('pass') }), h('div', { class: 'pw' }, pass, eye)),
      go, out,
      S.demo && S.demo.user ? h('p', { class: 'login__demo' }, h('b', { text: t('demoCreds', { u: S.demo.user, p: S.demo.pass || '' }) }), h('br'), t('demo')) : null,
      inDialog ? null : h('div', { class: 'login__foot' }, langSelect(function () { renderLogin(out.textContent); }), h('span', { text: 'vasylian.com' })));
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!user.value.trim() || !pass.value) { out.textContent = t('bad'); (user.value.trim() ? pass : user).focus(); return; }
      go.disabled = true; go.textContent = t('signingIn'); out.textContent = '';
      var body = { slug: SLUG, user: user.value.trim(), pass: pass.value };
      var oldSb = (auth && auth.sb) || (LS && LS.getItem('cms:sb:' + SLUG));
      if (oldSb) body.sb = oldSb;
      var keep = auth;
      auth = null;                                          // the login request itself carries no token
      call('POST', '/login', body).then(function (r) {
        go.disabled = false; go.textContent = t('signIn');
        if (r.status === 200 && r.j.token) {
          pass.value = '';
          if (LS) { try { LS.setItem('cms:user:' + SLUG, body.user); } catch (e) {} }
          saveAuth({ token: r.j.token, exp: r.j.exp, user: r.j.user || body.user, sb: r.j.sb || null });
          onDone();
          return;
        }
        auth = keep;
        if (r.status === 429) out.textContent = r.j.error === 'rate_limited' ? t('locked', { m: Math.max(1, Math.ceil((r.j.retry || 600) / 60)) }) : t('limit');
        else if (r.status === 403) out.textContent = t('origin');
        else if (r.status === 401) out.textContent = t('bad') + (r.j.left != null && r.j.left <= 3 ? ' ' + t('left', { n: r.j.left }) : '');
        else out.textContent = r.status >= 500 ? t('srv') : t('net');
        pass.focus(); pass.select();
      });
    });
    setTimeout(function () { (user.value ? pass : user).focus(); }, 30);
    return form;
  }
  function renderLogin(msg) {
    app.className = 'app';
    app.removeAttribute('aria-busy');
    document.title = t('admin') + ' · ' + (S.title || SLUG);
    app.textContent = '';
    app.appendChild(h('main', { class: 'login' }, loginCard(msg, function () { enter(); })));
  }
  function askLogin(msg) {
    if (dialogPromise) return dialogPromise;
    dialogPromise = new Promise(function (resolve) {
      var dlg = h('div', { class: 'dlg', role: 'dialog', 'aria-modal': 'true' });
      dlg.appendChild(loginCard(msg, function () { document.body.removeChild(dlg); dialogPromise = null; resolve(); }, true));
      document.body.appendChild(dlg);
    });
    return dialogPromise;
  }

  /* ---------------------------------------------------------------- values */
  // lg: the content language of a field drawn for one language (a "byLang" section, an album); else the language buttons' one
  function getV(obj, f, lg) {
    var v = obj[f.key];
    if (isI18n(f)) { var l = lg || clang; return v && typeof v === 'object' && typeof v[l] === 'string' ? v[l] : ''; }
    return typeof v === 'string' ? v : '';
  }
  function setV(obj, f, val, lg) {
    if (isI18n(f)) {
      var o = obj[f.key] && typeof obj[f.key] === 'object' && !Array.isArray(obj[f.key]) ? obj[f.key] : {};
      o[lg || clang] = val;
      obj[f.key] = o;
    } else obj[f.key] = val;
    dirtyCheck();
  }
  // the name of a content language in the editor's language ("эстонский"), first letter capital
  function langName(l, asIs) {
    var n = '';
    try { n = new Intl.DisplayNames([ui], { type: 'language' }).of(l) || ''; } catch (e) { n = ''; }
    if (!n || n === l) n = LANG_NAME[l] || l.toUpperCase();
    return asIs ? n : n.charAt(0).toUpperCase() + n.slice(1);
  }
  var hasChoices = function (f) { return Array.isArray(f.choices) && f.choices.length > 0; };
  var TEL_OK = function (v) { var n = v.replace(/\D/g, '').length; return /^\+?[\d\s()./-]+$/.test(v) && n >= 5 && n <= 15; };
  var MAIL_OK = function (v) { return /^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(v); };
  function emptyItem(f) {
    if (!(f.fields || []).length) return '';
    return {};
  }
  function itemEmpty(it) {
    if (typeof it === 'string') return it.trim() === '';
    return Object.keys(it || {}).every(function (k) {
      var v = it[k];
      if (v && typeof v === 'object') return Object.keys(v).every(function (l) { return !String(v[l] || '').trim(); });
      return !String(v || '').trim();
    });
  }
  // an album counts as empty when it has no photo and no words (its choice buttons and the photo sizes do not count)
  function albumEmpty(it, f) {
    var keep = {};
    (f.fields || []).forEach(function (sf) { if (!sf.role && !sf.perPhoto && !sf.hidden && !hasChoices(sf)) keep[sf.key] = 1; });
    var o = {};
    Object.keys(it || {}).forEach(function (k) { if (keep[k]) o[k] = it[k]; });
    return itemEmpty(o);
  }
  function forSave() {
    var d = clone(cur);
    (S.sections || []).forEach(function (s) {
      (s.fields || []).forEach(function (f) {
        if (f.type === 'list' && Array.isArray(d[f.key])) d[f.key] = d[f.key].filter(function (it) { return f.ui === 'albums' ? !albumEmpty(it, f) : !itemEmpty(it); });
      });
    });
    return d;
  }
  var isDirty = function () { return JSON.stringify(forSave()) !== JSON.stringify(base); };

  /* ---------------------------------------------------------------- editor */
  var statusEl = null, saveBtn = null, undoBtn = null;
  function status(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'bar__st' + (kind ? ' is-' + kind : '');
  }
  function dirtyCheck() {
    var d = isDirty();
    if (saveBtn) saveBtn.disabled = !d;
    status(d ? t('dirty') : t('clean'), d ? 'dirty' : '');
  }
  function fieldLabel(path) {
    var top = String(path || '').split('.')[0];
    var found = null;
    (S.sections || []).forEach(function (s) { (s.fields || []).forEach(function (f) { if (f.key === path || f.key === top || path.indexOf(f.key + '.') === 0) found = found || f; }); });
    if (!found) return path;
    var sub = path.slice(found.key.length + 1);
    var sf = sub && (found.fields || []).filter(function (x) { return x.key === sub; })[0];
    return L(found.label, found.key) + (sf ? ' / ' + L(sf.label, sf.key) : '');
  }

  // lg: draw the field for this content language; o.suffix: added to the label; o.optional: «(optional)» after the label.
  // A field with "choices" ([{v, label}]) is a row of buttons; "format": "tel" | "email" gives the phone keyboard and a check on save.
  function textField(obj, f, id, lg, o) {
    o = o || {};
    if (hasChoices(f)) return choiceField(obj, f, id, lg, o.onPick);
    var area = f.type === 'textarea';
    var max = f.max || (area ? 3000 : f.type === 'price' ? 40 : 200);
    var fmt = f.format === 'tel' ? { type: 'tel', inputmode: 'tel', autocomplete: 'off' } : f.format === 'email' ? { type: 'email', inputmode: 'email', autocapitalize: 'off' } : {};
    var input = h(area ? 'textarea' : 'input', { class: 'in' + (f.type === 'price' ? ' in--price' : ''), id: id, maxlength: String(max), rows: area ? String(f.rows || 4) : null,
      type: fmt.type || null, inputmode: fmt.inputmode || null, autocapitalize: fmt.autocapitalize || null, lang: lg || (isI18n(f) ? clang : null),
      placeholder: o.placeholder != null ? o.placeholder : f.placeholder ? L(f.placeholder) : (getV(base, f, lg) ? null : t('empty')), spellcheck: f.format ? 'false' : 'true', autocomplete: 'off' });
    if (f.format) { input.setAttribute('data-format', f.format); input.setAttribute('data-key', f.key + (lg ? ':' + lg : '')); }
    input.value = getV(obj, f, lg);
    var n = h('span', { class: 'field__n', 'aria-hidden': 'true' });
    var name = L(f.label, f.key) + (o.suffix ? ' (' + o.suffix + ')' : '');
    var wrap = h('label', { class: 'field', for: id }, h('span', { class: 'field__l' }, h('span', null, name, o.optional ? h('span', { class: 'field__opt', text: ' ' + t('optional') }) : null), n),
      input, f.help && !o.noHelp ? h('p', { class: 'field__h', text: L(f.help) }) : null);
    function upd() {
      n.textContent = input.value.length + '/' + max;
      n.className = 'field__n' + (input.value.length > max * 0.9 ? ' is-near' : '');
      if (area) { input.style.height = 'auto'; input.style.height = Math.min(Math.max(input.scrollHeight + 2, 88), 560) + 'px'; }
    }
    input.addEventListener('input', function () {
      var v = area ? input.value : input.value.replace(/[\r\n]+/g, ' ');
      setV(obj, f, v, lg);
      upd();
      wrap.classList.remove('is-bad');
      wrap.classList.toggle('is-changed', obj === cur && getV(cur, f, lg) !== getV(base, f, lg));
    });
    setTimeout(upd, 0);
    return wrap;
  }
  function choiceField(obj, f, id, lg, onPick) {
    var lab = h('span', { class: 'field__l', id: id + '-l', text: L(f.label, f.key) });
    var dflt = f['default'] != null ? f['default'] : f.choices[0].v;
    var box = h('div', { class: 'chs', role: 'radiogroup', 'aria-labelledby': id + '-l' });
    function draw() {
      var now = getV(obj, f, lg) || dflt;
      box.textContent = '';
      f.choices.forEach(function (c) {
        var on = c.v === now;
        box.appendChild(h('button', { type: 'button', role: 'radio', 'aria-checked': String(on), class: 'chs__b', text: L(c.label, c.v), onclick: function () {
          if (getV(obj, f, lg) === c.v) return;
          setV(obj, f, c.v, lg); draw();
          var btn = box.querySelector('[aria-checked="true"]'); if (btn) btn.focus();
          if (onPick) onPick(c.v);
        } }));
      });
    }
    draw();
    return h('div', { class: 'field' }, lab, box, f.help ? h('p', { class: 'field__h', text: L(f.help) }) : null);
  }

  function photoField(obj, f, id) {
    var val = getV(obj, f);
    var img = h('img', { alt: '', loading: 'lazy', decoding: 'async' });
    var box = h('div', { class: 'ph__img' }, img);
    var tag = h('span', { class: 'ph__tag', text: t('orig') });
    var msg = h('p', { class: 'ph__msg', role: 'status', 'aria-live': 'polite' });
    var file = h('input', { type: 'file', id: id, accept: 'image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif' });
    var pick = h('label', { class: 'btn btn--s', for: id }, icon('photo'), h('span', { text: t('photo') }));
    var reset = h('button', { type: 'button', class: 'btn btn--s btn--ghost', text: t('resetPhoto') });
    // the original photo: the site's own file the field started with (its path in the content), or the schema's "default"
    var orig = /^assets\//.test(val) ? val : (f['default'] || '');
    function show(v) {
      var shown = v || orig;
      var src = !shown ? '' : shown.indexOf('/i/') === 0 ? API + shown : siteUrl(shown);
      if (src) { img.src = src; img.hidden = false; } else { img.removeAttribute('src'); img.hidden = true; }
      var isOrig = !!orig && (!v || v === orig);
      if (isOrig) box.appendChild(tag); else if (tag.parentNode) tag.parentNode.removeChild(tag);
      reset.hidden = isOrig || !orig;
    }
    show(val);
    reset.addEventListener('click', function () { setV(obj, f, orig); show(orig); msg.textContent = ''; msg.className = 'ph__msg'; });
    file.addEventListener('change', function () {
      var fl = file.files && file.files[0];
      file.value = '';
      if (!fl) return;
      busy++;
      box.classList.add('is-busy');
      msg.className = 'ph__msg'; msg.textContent = t('photoUp');
      shrink(fl).then(function (blob) {
        return withSession(function () { return call('POST', '/img/' + SLUG, blob, { 'Content-Type': blob.type }); });
      }).then(function (r) {
        if (r.status === 200 && r.j.path) {
          setV(obj, f, r.j.path);
          show(r.j.path);
          msg.textContent = t('photoOk');
        } else {
          msg.className = 'ph__msg is-err';
          msg.textContent = r.status === 413 ? t('photoBig') : r.status === 415 || r.status === 400 ? t('photoBad') : r.status === 429 ? t('limit') : r.status === 403 ? t('origin') : t('net');
        }
      }, function (e) {
        msg.className = 'ph__msg is-err';
        msg.textContent = e === 'too_large' ? t('photoBig') : t('photoBad');
      }).then(function () { busy--; box.classList.remove('is-busy'); });
    });
    return h('div', { class: 'field' },
      h('span', { class: 'field__l', text: L(f.label, f.key) }),
      h('div', { class: 'ph' }, box, h('div', null, h('div', { class: 'ph__acts' }, pick, reset), file, f.help ? h('p', { class: 'field__h', text: L(f.help) }) : null, msg)));
  }

  function listField(f, id) {
    if (!Array.isArray(cur[f.key])) cur[f.key] = [];
    var arr = cur[f.key];
    var max = f.max || 50;
    var box = h('div', { class: 'lst' });
    var count = h('span', { class: 'lst__k' });
    var add = h('button', { type: 'button', class: 'btn btn--s lst__add' }, icon('plus'), h('span', { text: t('add') }));
    // long lists start folded (the names stay in view); an item opens with a click on its name, a new one opens by itself
    var openSet = typeof WeakSet === 'function' ? new WeakSet() : null;
    var foldByDefault = arr.length > 3;
    function title(it, i) {
      var first = (f.fields || []).filter(function (x) { return x.type === 'text'; })[0];
      var v = first ? getV(it, first) : (typeof it === 'string' ? it : '');
      return v ? v.slice(0, 60) : t('item', { n: i + 1 });
    }
    function draw() {
      box.textContent = '';
      arr.forEach(function (it, i) {
        var plain = !(f.fields || []).length;
        var body = h('div', { class: 'lst__b' });
        if (plain) {
          var pf = { key: '_', type: 'text', max: f.itemMax || 300, label: t('item', { n: i + 1 }) };
          var holder = { _: it };
          var tf = textField(holder, pf, id + '-' + i);
          tf.querySelector('input').addEventListener('input', function () { arr[i] = holder._; dirtyCheck(); });
          body.appendChild(tf);
        } else {
          (f.fields || []).forEach(function (sf, k) {
            body.appendChild(sf.type === 'image' ? photoField(it, sf, id + '-' + i + '-' + k) : textField(it, sf, id + '-' + i + '-' + k));
          });
        }
        var upB = h('button', { type: 'button', class: 'btn btn--ghost btn--icon', 'aria-label': t('up'), title: t('up'), disabled: i === 0 }, icon('up'));
        var dnB = h('button', { type: 'button', class: 'btn btn--ghost btn--icon', 'aria-label': t('down'), title: t('down'), disabled: i === arr.length - 1 }, icon('down'));
        var rmB = h('button', { type: 'button', class: 'btn btn--ghost btn--icon', 'aria-label': t('remove'), title: t('remove') }, icon('trash'));
        upB.addEventListener('click', function () { arr.splice(i - 1, 0, arr.splice(i, 1)[0]); draw(); dirtyCheck(); });
        dnB.addEventListener('click', function () { arr.splice(i + 1, 0, arr.splice(i, 1)[0]); draw(); dirtyCheck(); });
        rmB.addEventListener('click', function () { if (itemEmpty(it) || window.confirm(t('removeQ'))) { arr.splice(i, 1); draw(); dirtyCheck(); } });
        var isObj = it && typeof it === 'object';
        var shut = !plain && foldByDefault && isObj && openSet && !openSet.has(it);
        var name = h('button', { type: 'button', class: 'lst__n', 'aria-expanded': String(!shut), text: plain ? t('item', { n: i + 1 }) : title(it, i) });
        var row = h('div', { class: 'lst__i', 'data-open': String(!shut) }, h('div', { class: 'lst__h' }, name, upB, dnB, rmB), body);
        name.addEventListener('click', function () {
          var o = row.getAttribute('data-open') !== 'true';
          row.setAttribute('data-open', String(o)); name.setAttribute('aria-expanded', String(o));
          if (isObj && openSet) { if (o) openSet.add(it); else openSet['delete'](it); }
        });
        box.appendChild(row);
      });
      count.textContent = t('items', { n: arr.length, max: max });
      add.disabled = arr.length >= max;
    }
    add.addEventListener('click', function () {
      if (arr.length >= max) return;
      var fresh = emptyItem(f);
      if (fresh && typeof fresh === 'object' && openSet) openSet.add(fresh);
      arr.push(fresh);
      draw();
      dirtyCheck();
      var last = box.lastElementChild;
      if (last) { var inp = last.querySelector('input,textarea'); if (inp) inp.focus(); last.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    });
    draw();
    return h('div', { class: 'field' }, h('span', { class: 'field__l' }, L(f.label, f.key), count), f.help ? h('p', { class: 'field__h', text: L(f.help) }) : null, box, add);
  }

  /* ---------------------------------------------------------------- albums: works with several photos each
     Schema: a "list" field with "ui": "albums". Its image sub-fields (p1 … p10) hold the photos in order, the first is the main
     one (cover). Text sub-fields that go photo by photo (comma-separated, in the photos' order, kept in step by this editor):
       "role": "dims"     each photo's "WxH", filled on upload (the site lays the photos out before they load)
       "role": "thumbs"   a small preview ('/i/…', about 400 px) uploaded with each photo; the editor shows it instead of the big one
       "perPhoto": true   anything else, kept as it is (the site's own file of a photo moved in from the old gallery, …)
     A sub-field with "choices" is a row of buttons; "hidden": true is not shown; the other text fields are shown once per content
     language (the first language open, the others folded). Optional: "addLabel", "firstNote" (a line under the first work).
     The newest work goes to the top. Photos are made smaller in the browser and sent one at a time, with a progress bar.
     Order of photos and of works: drag by the handle (finger or mouse; arrow keys on it), or the arrow buttons. */
  var pend = typeof WeakMap === 'function' ? new WeakMap() : null;   // work -> photos still on their way [{file, st, prog, err, url}]
  var views = typeof WeakMap === 'function' ? new WeakMap() : null;  // work -> its drawn card (redraws the photos only)
  var notes = typeof WeakMap === 'function' ? new WeakMap() : null;  // work -> a line shown on its card (too many photos)
  var localUrl = {};                                                  // '/i/…' -> blob: URL of the preview made in this browser
  var queue = [], sending = 0;
  var THUMB = 400;

  function albumParts(f) {
    var sub = f.fields || [];
    var per = sub.filter(function (x) { return x.type === 'text' && (x.role === 'dims' || x.role === 'thumbs' || x.perPhoto); });
    var keyOf = function (role) { return (per.filter(function (x) { return x.role === role; })[0] || {}).key || null; };
    return {
      imgs: sub.filter(function (x) { return x.type === 'image'; }).map(function (x) { return x.key; }),
      per: per.map(function (x) { return x.key; }), dims: keyOf('dims'), thumbs: keyOf('thumbs'),
      choice: sub.filter(function (x) { return hasChoices(x) && !x.hidden; })[0] || null,
      texts: sub.filter(function (x) { return (x.type === 'text' || x.type === 'textarea') && !x.role && !x.perPhoto && !x.hidden && !hasChoices(x); })
    };
  }
  // [{p: '/i/…', v: {per-photo key: value}}] in order
  function photosOf(it, P) {
    var cols = {}, out = [];
    P.per.forEach(function (q) { cols[q] = String(it[q] || '').split(','); });
    P.imgs.forEach(function (k) {
      if (typeof it[k] !== 'string' || !it[k]) return;
      var v = {};
      P.per.forEach(function (q) { v[q] = cols[q][out.length] || ''; });
      out.push({ p: it[k], v: v });
    });
    return out;
  }
  // writes the photos back as p1 … pN (no gaps) with their per-photo values; keeps the keys in the schema's order (exact "unsaved")
  function setPhotos(it, P, list, f) {
    P.imgs.forEach(function (k, i) { if (list[i]) it[k] = list[i].p; else delete it[k]; });
    P.per.forEach(function (q) {
      var vals = list.map(function (x) { return String(x.v && x.v[q] || '').replace(/,/g, ''); });
      if (vals.some(Boolean)) it[q] = vals.join(','); else delete it[q];
    });
    var o = {};
    (f.fields || []).forEach(function (sf) { if (it[sf.key] !== undefined) o[sf.key] = it[sf.key]; });
    Object.keys(it).forEach(function (k) { if (!(k in o)) o[k] = it[k]; });
    Object.keys(it).forEach(function (k) { delete it[k]; });
    Object.keys(o).forEach(function (k) { it[k] = o[k]; });
  }
  var imgUrl = function (p) { return p.indexOf('/i/') === 0 ? API + p : siteUrl(p); };
  var prevUrl = function (x, P) { return localUrl[x.p] || (P.thumbs && x.v[P.thumbs] ? imgUrl(x.v[P.thumbs]) : imgUrl(x.p)); };
  var pendOf = function (it) { return (pend && pend.get(it)) || []; };
  var activeOf = function (it) { return pendOf(it).filter(function (e) { return e.st !== 'err'; }); };

  // drag by a handle (o.handle, else [data-drag], inside an item): a copy follows the finger, the place it lands on is outlined, the page scrolls
  // near the top and bottom edges; o.onMove(from, to) changes the data. o.ghost(item): the part of the item that is copied.
  function dragSort(box, sel, o) {
    box.addEventListener('pointerdown', function (ev) {
      var hd = ev.target.closest ? ev.target.closest(o.handle || '[data-drag]') : null;
      if (!hd || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
      var item = hd.closest(sel);
      if (!item || item.parentNode !== box) return;
      var items = Array.prototype.filter.call(box.children, function (el) { return el.matches(sel); });
      var from = items.indexOf(item);
      if (from < 0 || items.length < 2) return;
      ev.preventDefault(); ev.stopPropagation();                         // a photo's handle does not also drag its work
      var src = (o.ghost && o.ghost(item)) || item, r = src.getBoundingClientRect();
      var g = src.cloneNode(true);
      g.removeAttribute('id');
      Array.prototype.forEach.call(g.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
      g.className += ' drag-ghost';
      g.setAttribute('aria-hidden', 'true');
      g.style.cssText = 'position:fixed;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;margin:0;z-index:60;pointer-events:none';
      document.body.appendChild(g);
      item.classList.add('is-lifted'); box.classList.add('is-sorting');
      var ox = ev.clientX - r.left, oy = ev.clientY - r.top, px = ev.clientX, py = ev.clientY, to = from, raf = 0, pid = ev.pointerId;
      try { hd.setPointerCapture(pid); } catch (e) {}
      function aim() {
        g.style.left = (px - ox) + 'px'; g.style.top = (py - oy) + 'px';
        var best = from, bd = Infinity;
        items.forEach(function (el, i) {
          var q = el.getBoundingClientRect();
          var d = px >= q.left && px <= q.right && py >= q.top && py <= q.bottom ? -1 : Math.pow(px - (q.left + q.right) / 2, 2) + Math.pow(py - (q.top + q.bottom) / 2, 2);
          if (d < bd) { bd = d; best = i; }
        });
        to = best;
        items.forEach(function (el, i) { el.classList.toggle('is-target', i === to && to !== from); });
      }
      function edge() {
        raf = 0;
        var v = py < 90 ? -14 : py > window.innerHeight - 130 ? 14 : 0;
        if (!v) return;
        window.scrollBy(0, v); aim();
        raf = requestAnimationFrame(edge);
      }
      function move(e) { if (e.pointerId !== pid) return; px = e.clientX; py = e.clientY; aim(); if (!raf) raf = requestAnimationFrame(edge); }
      function end(e) {
        if (e.pointerId !== pid) return;
        hd.removeEventListener('pointermove', move); hd.removeEventListener('pointerup', end); hd.removeEventListener('pointercancel', end);
        if (raf) cancelAnimationFrame(raf);
        if (g.parentNode) g.parentNode.removeChild(g);
        items.forEach(function (el) { el.classList.remove('is-target', 'is-lifted'); });
        box.classList.remove('is-sorting');
        if (e.type === 'pointerup' && to !== from) o.onMove(from, to);
      }
      hd.addEventListener('pointermove', move); hd.addEventListener('pointerup', end); hd.addEventListener('pointercancel', end);
    });
  }

  function sendImg(blob, onProg) {
    return new Promise(function (res) {
      var x = new XMLHttpRequest();
      x.open('POST', API + '/img/' + SLUG);
      if (auth) x.setRequestHeader('Authorization', 'Bearer ' + auth.token);
      x.setRequestHeader('Content-Type', blob.type);
      x.timeout = 180000;
      if (x.upload && onProg) x.upload.onprogress = function (e) { if (e.lengthComputable && e.total) onProg(e.loaded / e.total); };
      x.onload = function () { var j = {}; try { j = JSON.parse(x.responseText) || {}; } catch (e) { j = {}; } res({ status: x.status, j: j }); };
      x.onerror = x.ontimeout = x.onabort = function () { res({ status: 0, j: { error: 'network' } }); };
      x.send(blob);
    });
  }
  function upErr(r) {
    return r.status === 413 ? t('photoBig') : r.status === 415 || r.status === 400 ? t('photoBad') : r.status === 409 ? t('full')
      : r.status === 429 ? t('limit') : r.status === 403 ? t('origin') : r.status >= 500 ? t('srv') : t('net');
  }
  var upDone = 0, lastErr = '';                                       // photos sent in this run; the last error
  function queueStatus(c) { status(t(c.st === 'prep' ? 'prep' : 'upl', { i: upDone + 1, n: upDone + queue.length + 1 }), 'dirty'); }
  function addFiles(it, files, f, P) {
    var room = P.imgs.length - photosOf(it, P).length - activeOf(it).length;
    var take = files.slice(0, Math.max(0, room));
    if (notes) { if (files.length > take.length) notes.set(it, t('tooMany', { max: P.imgs.length })); else notes['delete'](it); }
    if (!take.length || !pend) return take.length;
    var list = pendOf(it);
    pend.set(it, list);
    take.forEach(function (file) {
      var e = { it: it, f: f, P: P, file: file, st: 'wait', prog: 0, err: '', url: '', tries: 0 };
      list.push(e); queue.push(e); busy++;
    });
    pump();
    return take.length;
  }
  function pump() {
    if (sending || !queue.length) return;
    var e = queue.shift();
    sending = 1;
    e.st = 'prep'; e.prog = 0; tick(e); queueStatus(e);
    shrinkWH(e.file).then(function (r) {
      e.blob = r.b; e.tb = r.t; e.d = r.w + 'x' + r.h;
      if (!e.url) e.url = URL.createObjectURL(r.t || r.b);
      e.st = 'up'; tick(e); queueStatus(e);
      return withSession(function () { return sendImg(e.blob, function (p) { e.prog = p * 0.9; tick(e); }); }).then(function (r1) {
        if (r1.status !== 200 || !r1.j || !r1.j.path || !e.P.thumbs || !e.tb) return r1;
        // the small preview: if it does not get through, the editor shows the big photo instead
        return withSession(function () { return sendImg(e.tb); }).then(function (r2) {
          if (r2.status === 200 && r2.j && r2.j.path) r1.thumb = r2.j.path;
          return r1;
        });
      });
    }, function (er) { return { status: -1, why: er }; }).then(function (r) {
      e.tries++;
      if (r.status === 200 && r.j && r.j.path) {
        var list = pendOf(e.it), i = list.indexOf(e);
        if (i >= 0) list.splice(i, 1);
        localUrl[r.j.path] = e.url;
        var ph = photosOf(e.it, e.P), v = {};
        e.P.per.forEach(function (q) { v[q] = ''; });
        if (e.P.dims) v[e.P.dims] = e.d;
        if (e.P.thumbs && r.thumb) v[e.P.thumbs] = r.thumb;
        if (ph.length < e.P.imgs.length) { ph.push({ p: r.j.path, v: v }); setPhotos(e.it, e.P, ph, e.f); }
        upDone++;
        done(e);
      } else if (r.status === 0 && e.tries < 2) {
        queue.unshift(e);                                   // one quiet retry after a dropped connection (slow mobile internet)
        sending = 0;
        setTimeout(pump, 1500);
        return;
      } else {
        e.st = 'err';
        e.err = r.status === -1 ? (r.why === 'too_large' ? t('photoBig') : t('photoBad')) : upErr(r);
        e.again = !(r.status === -1 || r.status === 400 || r.status === 413 || r.status === 415);   // a bad file stays bad
        lastErr = e.err;
        done(e);
      }
      sending = 0;
      if (queue.length) { pump(); return; }
      upDone = 0;
      if (busy) return;
      dirtyCheck();
      if (app.querySelector('.ph2.is-err')) status(lastErr || t('failed'), 'err');
      else status(t('uplDone'), 'dirty');
    });
    function done(x) { busy--; var v = views && views.get(x.it); if (v) v.photos(); dirtyCheck(); }
  }
  function tick(e) {
    var el = e.el;
    if (!el || !el.isConnected) return;
    el.querySelector('.ph2__fill').style.width = Math.round((e.st === 'up' ? 10 + e.prog * 90 : 4)) + '%';
    var lab = el.querySelector('.ph2__st');
    lab.textContent = e.st === 'up' ? Math.round(e.prog * 100) + ' %' : '…';
    if (e.url) { var im = el.querySelector('img'); if (im && im.getAttribute('src') !== e.url) { im.src = e.url; im.hidden = false; } }
  }

  function albumsField(f, id) {
    if (!Array.isArray(cur[f.key])) cur[f.key] = [];
    var arr = cur[f.key], P = albumParts(f), max = f.max || 50;
    var openSet = typeof WeakSet === 'function' ? new WeakSet() : null;
    if (arr.length === 1 && openSet && arr[0] && typeof arr[0] === 'object') openSet.add(arr[0]);
    var addLabel = L(f.addLabel) || t('addWork');
    var listBox = h('div', { class: 'alb__list' });
    var listHint = h('p', { class: 'field__h alb__lhint', text: t('worksHint') });
    var pickId = id + '-new';
    var picker = h('input', { type: 'file', id: pickId, class: 'filein', accept: 'image/*', multiple: true });
    var addBtn = h('label', { class: 'btn btn--a alb__add', for: pickId }, icon('plus'), h('span', { text: addLabel }));
    var count = h('span', { class: 'lst__k' });
    picker.addEventListener('change', function () {
      var files = Array.prototype.slice.call(picker.files || []);
      picker.value = '';
      if (!files.length) return;
      if (arr.length >= max) { status(t('items', { n: arr.length, max: max }), 'err'); return; }
      var it = {};
      if (P.choice) it[P.choice.key] = P.choice['default'] != null ? P.choice['default'] : P.choice.choices[0].v;
      arr.unshift(it);
      if (openSet) openSet.add(it);
      addFiles(it, files, f, P);
      draw();
      dirtyCheck();
      var first = listBox.firstElementChild;
      if (first) setTimeout(function () { first.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 60);
    });
    function moveWork(from, to, focusDrag) {
      if (to < 0 || to >= arr.length || to === from) return;
      arr.splice(to, 0, arr.splice(from, 1)[0]);
      draw(); dirtyCheck();
      var c = listBox.children[to];
      if (!c) return;
      var b = focusDrag ? c.querySelector('.alb__drag') : c.querySelector('.alb__acts button:' + (to < from ? 'first-child' : 'nth-child(2)'));
      if (b && b.disabled) b = c.querySelector('.alb__acts button:not([disabled])');
      if (b) b.focus();
      c.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    dragSort(listBox, '.alb__i', { handle: '[data-drag="work"]', ghost: function (item) { return item.querySelector('.alb__hrow'); }, onMove: function (a, b) { moveWork(a, b, false); } });
    function title(it, i) {
      var tf = P.texts[0];
      var v = tf ? (getV(it, tf, langs()[0]) || langs().map(function (l) { return getV(it, tf, l); }).filter(Boolean)[0] || '') : '';
      if (v) return v;
      if (P.choice) { var c = P.choice.choices.filter(function (x) { return x.v === (it[P.choice.key] || P.choice.choices[0].v); })[0]; if (c) return L(c.label, c.v); }
      return t('workN', { n: i + 1 });
    }
    function card(it, i) {
      var isOpen = !openSet || openSet.has(it);
      var thumb = h('span', { class: 'alb__thumb' });
      var name = h('b', { class: 'alb__name' });
      var sub = h('small', { class: 'alb__sub' });
      var head = h('button', { type: 'button', class: 'alb__h', 'aria-expanded': String(isOpen) }, thumb, h('span', { class: 'alb__t' }, name, sub), icon('chev'));
      var drag = h('button', { type: 'button', class: 'alb__drag', 'data-drag': 'work', title: t('dragWork') }, icon('grip'));
      drag.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
        if (d) { e.preventDefault(); moveWork(i, i + d, true); }
      });
      var grid = h('div', { class: 'ph2s' });
      var warn = h('p', { class: 'alb__warn', role: 'note', text: t('noPhoto') });
      var note = h('p', { class: 'alb__warn alb__note', role: 'status', hidden: true });
      var hint = h('p', { class: 'field__h ph2__hint', text: t('photoHint') });
      var pickId2 = id + '-p-' + i + '-' + Math.random().toString(36).slice(2, 7);
      var picker2 = h('input', { type: 'file', id: pickId2, class: 'filein', accept: 'image/*', multiple: true });
      picker2.addEventListener('change', function () {
        var files = Array.prototype.slice.call(picker2.files || []);
        picker2.value = '';
        if (files.length) { addFiles(it, files, f, P); photos(); dirtyCheck(); }
      });
      function headText() {
        var ph = photosOf(it, P), act = activeOf(it).length;
        thumb.textContent = '';
        if (ph[0]) thumb.appendChild(h('img', { src: prevUrl(ph[0], P), alt: '', loading: 'lazy', decoding: 'async' }));
        else thumb.appendChild(icon('photo'));
        name.textContent = title(it, i);
        drag.setAttribute('aria-label', t('dragWork') + ': ' + name.textContent);
        sub.textContent = t('nPhotos', { n: ph.length + act }) + (i === 0 && f.firstNote ? ' · ' + L(f.firstNote) : '');
      }
      function movePhoto(from, to, focusSel) {
        var list = photosOf(it, P);
        if (to < 0 || to >= list.length || to === from) return;
        list.splice(to, 0, list.splice(from, 1)[0]);
        setPhotos(it, P, list, f); photos(); dirtyCheck();
        var cell = grid.children[to];
        if (cell) { var b = cell.querySelector(focusSel + ':not([disabled])') || cell.querySelector('button:not([disabled])'); if (b) b.focus(); }
      }
      dragSort(grid, '.ph2:not(.is-pend):not(.ph2--add)', { handle: '[data-drag="photo"]', onMove: function (a, b) { movePhoto(a, b, '.ph2__drag'); } });
      function photos() {
        var ph = photosOf(it, P), pl = pendOf(it);
        grid.textContent = '';
        ph.forEach(function (x, k) {
          var n = t('photoN', { i: k + 1 });
          var dh = h('button', { type: 'button', class: 'ph2__drag', 'data-drag': 'photo', 'aria-label': t('drag') + ': ' + n, title: t('drag') }, icon('grip'));
          dh.addEventListener('keydown', function (e) {
            var d = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : 0;
            if (d) { e.preventDefault(); movePhoto(k, k + d, '.ph2__drag'); }
          });
          grid.appendChild(h('div', { class: 'ph2' + (k === 0 ? ' is-cover' : ''), role: 'group', 'aria-label': n },
            h('img', { src: prevUrl(x, P), alt: n, loading: 'lazy', decoding: 'async', draggable: 'false' }),
            dh,
            h('button', { type: 'button', class: 'ph2__x', 'aria-label': t('removePhoto') + ': ' + n, title: t('removePhoto'), onclick: function () {
              if (!window.confirm(t('removePhotoQ'))) return;
              var list = photosOf(it, P); list.splice(k, 1); setPhotos(it, P, list, f); photos(); dirtyCheck();
            } }, icon('x')),
            h('div', { class: 'ph2__bar' },
              k === 0 ? h('span', { class: 'ph2__badge', text: t('cover') })
                : h('button', { type: 'button', 'data-act': 'left', 'aria-label': t('left') + ': ' + n, title: t('left'), onclick: function () { movePhoto(k, k - 1, '[data-act="left"]'); } }, icon('left')),
              k === 0 ? null : h('button', { type: 'button', class: 'ph2__star', 'aria-label': t('makeCover') + ': ' + n, title: t('makeCover'), onclick: function () { movePhoto(k, 0, '.ph2__drag'); } }, icon('star')),
              h('button', { type: 'button', 'data-act': 'right', 'aria-label': t('right') + ': ' + n, title: t('right'), disabled: k === ph.length - 1, onclick: function () { movePhoto(k, k + 1, '[data-act="right"]'); } }, icon('right')))));
        });
        pl.forEach(function (e) {
          var cell = h('div', { class: 'ph2 is-pend' + (e.st === 'err' ? ' is-err' : '') },
            h('img', { alt: '', hidden: !e.url, src: e.url || null }),
            e.st === 'err'
              ? h('div', { class: 'ph2__errbox' }, h('p', { class: 'ph2__err', text: (e.file && e.file.name ? e.file.name.slice(0, 40) + ': ' : '') + (e.err || t('failed')) }),
                  h('div', { class: 'ph2__erracts' },
                    !e.again ? null : h('button', { type: 'button', class: 'btn btn--s', text: t('retry'), onclick: function () { e.st = 'wait'; e.err = ''; e.tries = 0; queue.push(e); busy++; photos(); dirtyCheck(); pump(); } }),
                    h('button', { type: 'button', class: 'btn btn--s' + (e.again ? ' btn--ghost' : ''), text: t('remove'), onclick: function () { var l = pendOf(it), j = l.indexOf(e); if (j >= 0) l.splice(j, 1); photos(); dirtyCheck(); } })))
              : h('div', { class: 'ph2__prog' }, h('span', { class: 'ph2__st', text: '…' }), h('span', { class: 'ph2__track' }, h('span', { class: 'ph2__fill' }))));
          e.el = cell;
          grid.appendChild(cell);
          if (e.st !== 'err') tick(e);
        });
        if (ph.length + activeOf(it).length < P.imgs.length) {
          grid.appendChild(h('div', { class: 'ph2 ph2--add' }, picker2, h('label', { for: pickId2, class: 'ph2__addl' }, icon('plus'), h('span', { text: t('addPhotos') }))));
        }
        warn.hidden = ph.length + pl.length > 0;
        var nt = notes && notes.get(it);
        note.textContent = nt || ''; note.hidden = !nt;
        hint.hidden = ph.length < 2;
        headText();
      }
      if (views) views.set(it, { photos: photos });
      var body = h('div', { class: 'alb__b' }, h('div', null, grid, hint), warn, note);
      if (P.choice) body.appendChild(textField(it, P.choice, id + '-' + i + '-c', null, { onPick: function () { headText(); } }));
      var L0 = langs()[0] || null, rest = langs().slice(1);
      P.texts.forEach(function (sf, k) {
        var fl = textField(it, sf, id + '-' + i + '-t' + k + '-' + (L0 || 'x'), isI18n(sf) ? L0 : null, { optional: !sf.required, placeholder: sf.placeholder ? L(sf.placeholder) : '' });
        if (k === 0) fl.querySelector('input,textarea').addEventListener('input', headText);
        body.appendChild(fl);
      });
      var i18nTexts = P.texts.filter(isI18n);
      if (rest.length && i18nTexts.length) {
        var more = h('details', { class: 'alb__more' }, h('summary', { text: L(f.langsLabel) || t('otherLangs') }));
        if (f.langsHelp) more.appendChild(h('p', { class: 'field__h', text: L(f.langsHelp) }));
        rest.forEach(function (l) {
          i18nTexts.forEach(function (sf, k) {
            more.appendChild(textField(it, sf, id + '-' + i + '-t' + k + '-' + l, l, { suffix: langName(l, true), optional: true, placeholder: '', noHelp: true }));
          });
        });
        if (rest.some(function (l) { return i18nTexts.some(function (sf) { return getV(it, sf, l); }); })) more.open = true;
        body.appendChild(more);
      }
      body.appendChild(h('div', { class: 'alb__acts' },
        h('button', { type: 'button', class: 'btn btn--s', disabled: i === 0, onclick: function () { moveWork(i, i - 1, false); } }, icon('up'), h('span', { text: t('up') })),
        h('button', { type: 'button', class: 'btn btn--s', disabled: i === arr.length - 1, onclick: function () { moveWork(i, i + 1, false); } }, icon('down'), h('span', { text: t('down') })),
        h('button', { type: 'button', class: 'btn btn--s btn--danger', onclick: function () {
          if (!albumEmpty(it, f) && !window.confirm(t('removeWorkQ'))) return;
          queue = queue.filter(function (e) { if (e.it === it) { busy--; return false; } return true; });
          if (pend) pend['delete'](it);
          arr.splice(i, 1); draw(); dirtyCheck();
        } }, icon('trash'), h('span', { text: t('removeWork') }))));
      var box = h('section', { class: 'alb__i', 'data-open': String(isOpen) }, h('div', { class: 'alb__hrow' }, drag, head), body);
      head.addEventListener('click', function () {
        var o = box.getAttribute('data-open') !== 'true';
        box.setAttribute('data-open', String(o)); head.setAttribute('aria-expanded', String(o));
        if (openSet) { if (o) openSet.add(it); else openSet['delete'](it); }
      });
      photos();
      return box;
    }
    function draw() {
      listBox.textContent = '';
      arr.forEach(function (it, i) { if (it && typeof it === 'object') listBox.appendChild(card(it, i)); });
      if (!arr.length) listBox.appendChild(h('p', { class: 'alb__empty', text: t('emptyAlbums', { b: addLabel }) }));
      listHint.hidden = arr.length < 2;
      count.textContent = t('items', { n: arr.length, max: max });
      addBtn.classList.toggle('is-off', arr.length >= max);
      picker.disabled = arr.length >= max;
    }
    draw();
    return h('div', { class: 'field alb' }, f.label ? h('span', { class: 'field__l' }, L(f.label, f.key), count) : null,
      f.help ? h('p', { class: 'field__h', text: L(f.help) }) : null, picker, addBtn, listHint, listBox);
  }

  function renderEditor() {
    app.className = 'app';
    app.removeAttribute('aria-busy');
    document.title = t('admin') + ' · ' + (S.title || SLUG);
    var y = window.scrollY;
    app.textContent = '';
    var viewHref = siteUrl('') + (siteUrl('').indexOf('?') < 0 ? '?' : '&') + 'cms=fresh';
    var top = h('header', { class: 'top' },
      h('div', { class: 'top__t' }, h('span', { class: 'top__site', text: S.title || SLUG }), h('span', { class: 'top__sub', text: t('admin') + (auth && auth.user ? ' · ' + auth.user : '') })),
      langSelect(renderEditor),
      h('a', { class: 'btn btn--s btn--ghost', href: viewHref, target: '_blank', rel: 'noopener' }, icon('ext'), h('span', { class: 'hide-s', text: t('view') })),
      h('button', { type: 'button', class: 'btn btn--s btn--ghost', 'aria-label': t('logout'), title: t('logout'), onclick: logout }, icon('out'), h('span', { class: 'hide-s', text: t('logout') })));
    var main = h('main', { class: 'wrap', id: 'cmsMain' });
    if (S.demo) main.appendChild(h('p', { class: 'notice', text: t('demo') }));
    // the language buttons only when some field still follows them (byLang sections and albums show every language themselves)
    var segNeeded = (S.sections || []).some(function (s) {
      return !s.byLang && (s.fields || []).some(function (f) {
        return f.type === 'list' ? f.ui !== 'albums' && (f.fields || []).some(isI18n) : isI18n(f);
      });
    });
    if (langs().length > 1 && segNeeded) {
      main.appendChild(h('div', { class: 'clang', role: 'group', 'aria-label': t('texts') }, h('span', { class: 'clang__k', text: t('texts') }),
        h('div', { class: 'seg' }, langs().map(function (l) {
          return h('button', { type: 'button', 'aria-pressed': String(l === clang), lang: l, text: l.toUpperCase(), onclick: function () { if (l !== clang) { clang = l; renderEditor(); } } });
        }))));
    }
    (S.sections || []).forEach(function (s, si) {
      var id = 's-' + (s.id || si);
      if (open[id] === undefined) open[id] = true;
      var head = h('button', { type: 'button', class: 'card__h', 'aria-expanded': String(open[id]), 'aria-controls': id + '-b' }, h('span', { text: L(s.label, s.id) }), icon('chev'));
      var body = h('div', { class: 'card__b', id: id + '-b' }, s.help ? h('p', { class: 'card__d', text: L(s.help) }) : null);
      var one = function (f, fid) {
        return f.type === 'list' ? (f.ui === 'albums' ? albumsField(f, fid) : listField(f, fid)) : f.type === 'image' ? photoField(cur, f, fid) : textField(cur, f, fid);
      };
      if (s.byLang && langs().length) {
        // texts grouped by language: one folding group per language (the first open), the other fields before them
        (s.fields || []).forEach(function (f, fi) { if (!f.hidden && (!isI18n(f) || f.type === 'list')) body.appendChild(one(f, id + '-' + fi)); });
        langs().forEach(function (l, li) {
          var key = id + ':' + l;
          if (open[key] === undefined) open[key] = li === 0;
          var g = h('details', { class: 'lgrp' }, h('summary', { class: 'lgrp__h' }, h('span', { text: langName(l) }), icon('chev')));
          g.open = !!open[key];
          g.addEventListener('toggle', function () { open[key] = g.open; });
          (s.fields || []).forEach(function (f, fi) { if (!f.hidden && isI18n(f) && f.type !== 'list') g.appendChild(textField(cur, f, id + '-' + fi + '-' + l, l)); });
          body.appendChild(g);
        });
      } else {
        (s.fields || []).forEach(function (f, fi) { if (!f.hidden) body.appendChild(one(f, id + '-' + fi)); });
      }
      var card = h('section', { class: 'card', 'data-open': String(open[id]) }, head, body);
      head.addEventListener('click', function () { open[id] = !open[id]; card.setAttribute('data-open', String(open[id])); head.setAttribute('aria-expanded', String(open[id])); });
      main.appendChild(card);
    });
    statusEl = h('p', { class: 'bar__st', role: 'status', 'aria-live': 'polite' });
    undoBtn = h('button', { type: 'button', class: 'btn btn--s btn--ghost', title: t('undo'), onclick: undo }, icon('undo'), h('span', { class: 'hide-s', text: t('undo') }));
    saveBtn = h('button', { type: 'button', class: 'btn btn--a', text: t('save'), onclick: save });
    var bar = h('div', { class: 'bar' }, h('div', { class: 'bar__in' }, statusEl, undoBtn, saveBtn));
    app.appendChild(top); app.appendChild(main); app.appendChild(bar);
    dirtyCheck();
    window.scrollTo(0, y);
  }

  function save() {
    if (busy) { status(t(busy > 1 ? 'busyMany' : 'busy'), 'err'); return; }
    var data = forSave();
    // phone numbers and e-mail addresses ("format" in the schema): a typo would leave the site with a dead link
    var badF = null;
    (S.sections || []).forEach(function (s) {
      (s.fields || []).forEach(function (f) {
        if (badF || (f.format !== 'tel' && f.format !== 'email')) return;
        (isI18n(f) ? langs() : [null]).forEach(function (l) {
          var v = getV(cur, f, l).trim();
          if (!badF && v && !(f.format === 'tel' ? TEL_OK(v) : MAIL_OK(v))) badF = { f: f, l: l };
        });
      });
    });
    if (badF) {
      status(t(badF.f.format === 'tel' ? 'badTel' : 'badMail', { f: L(badF.f.label, badF.f.key) }), 'err');
      var bi = app.querySelector('[data-key="' + badF.f.key + (badF.l ? ':' + badF.l : '') + '"]');
      if (bi) { var bw = bi.closest('.field'); if (bw) bw.classList.add('is-bad'); var card = bi.closest('.card'); if (card && card.getAttribute('data-open') === 'false') card.querySelector('.card__h').click(); bi.focus(); }
      return;
    }
    saveBtn.disabled = true; saveBtn.textContent = t('saving'); status(t('saving'));
    withSession(function () { return call('PUT', '/c/' + SLUG, { data: data }); }).then(function (r) {
      saveBtn.textContent = t('save');
      if (r.status === 200) {
        base = clone(data);
        // the fields on screen keep writing into cur: it is replaced only together with a new drawing (empty list items dropped).
        // (Before 24.11 it was always replaced, so after a first save the edits went into the old object and «Saglabāt» stayed off.)
        if (JSON.stringify(cur) !== JSON.stringify(data)) { cur = clone(data); renderEditor(); }
        dirtyCheck();
        status(r.j.sandbox ? t('savedDemo') : t('saved'), 'ok');
        app.querySelectorAll('.field.is-changed').forEach(function (el) { el.classList.remove('is-changed'); });
        return;
      }
      saveBtn.disabled = false;
      if (r.status === 400 && r.j.error === 'unknown_field') status(t('unknownField', { f: fieldLabel(r.j.key) }), 'err');
      else if (r.status === 400 && r.j.key) status(t('badField', { f: fieldLabel(r.j.key) }), 'err');
      else if (r.status === 403) status(t('origin'), 'err');
      else if (r.status === 429) status(t('limit'), 'err');
      else if (r.status === 0) status(t('net'), 'err');
      else status(t('err'), 'err');
    });
  }
  function undo() {
    if (!window.confirm(t('undoQ'))) return;
    withSession(function () { return call('POST', '/c/' + SLUG + '/restore'); }).then(function (r) {
      if (r.status === 200) { enter().then(function () { status(t('undone'), 'ok'); }); }
      else if (r.status === 404) status(t('noUndo'), 'err');
      else status(r.status === 0 ? t('net') : t('err'), 'err');
    });
  }
  function logout() {
    if (isDirty() && !window.confirm(t('dirty') + '. ' + t('logout') + '?')) return;
    saveAuth(null);
    base = {}; cur = {};
    renderLogin();
  }
  window.addEventListener('beforeunload', function (e) {
    if (auth && statusEl && isDirty()) { e.preventDefault(); e.returnValue = ''; }
  });

  /* ---------------------------------------------------------------- photos: smaller in the browser before upload */
  function decode(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: 'from-image' }).catch(function () { return viaImg(file); });
    }
    return viaImg(file);
  }
  function viaImg(file) {
    return new Promise(function (res, rej) {
      var u = URL.createObjectURL(file), im = new Image();
      im.onload = function () { res(im); setTimeout(function () { URL.revokeObjectURL(u); }, 1000); };
      im.onerror = function () { URL.revokeObjectURL(u); rej('decode'); };
      im.src = u;
    });
  }
  function toBlob(c, type, q) { return new Promise(function (res) { c.toBlob(res, type, q); }); }
  function shrink(file) { return shrinkWH(file).then(function (r) { return r.b; }); }
  // {b: the smaller photo, w, h}. Intermediate canvases are emptied at once: iPhones stop drawing after ~10 big photos otherwise.
  function shrinkWH(file) {
    if (file.size > 40 * 1024 * 1024) return Promise.reject('too_large');
    return decode(file).then(function (src) {
      var w0 = src.naturalWidth || src.width, h0 = src.naturalHeight || src.height;
      if (!w0 || !h0) throw 'decode';
      var k = Math.min(1, 1600 / Math.max(w0, h0));
      var w = Math.max(1, Math.round(w0 * k)), hh = Math.max(1, Math.round(h0 * k));
      // halve in steps first: one big jump down makes a photo grainy
      var cw = w0, ch = h0, cur2 = src;
      while (cw / 2 >= w * 1.1) {
        var c2 = document.createElement('canvas');
        c2.width = Math.round(cw / 2); c2.height = Math.round(ch / 2);
        var x2 = c2.getContext('2d'); x2.imageSmoothingQuality = 'high'; x2.drawImage(cur2, 0, 0, c2.width, c2.height);
        if (cur2 !== src) { cur2.width = 0; cur2.height = 0; }
        cur2 = c2; cw = c2.width; ch = c2.height;
      }
      var c = document.createElement('canvas');
      c.width = w; c.height = hh;
      var x = c.getContext('2d');
      x.imageSmoothingQuality = 'high';
      x.drawImage(cur2, 0, 0, w, hh);
      if (cur2 !== src) { cur2.width = 0; cur2.height = 0; }
      if (src.close) src.close();
      // the editor's preview (about 400 px, a few dozen KB): lists open fast on mobile data
      var kt = Math.min(1, THUMB / Math.max(w, hh)), tc = document.createElement('canvas');
      tc.width = Math.max(1, Math.round(w * kt)); tc.height = Math.max(1, Math.round(hh * kt));
      var tx = tc.getContext('2d'); tx.imageSmoothingQuality = 'high'; tx.drawImage(c, 0, 0, tc.width, tc.height);
      var thumbP = toBlob(tc, 'image/webp', 0.72).then(function (tb) {
        if (!tb || tb.type !== 'image/webp') return toBlob(tc, 'image/jpeg', 0.75);
        return tb;
      }).then(function (tb) { tc.width = 0; tc.height = 0; return tb; }, function () { return null; });
      var qs = [0.86, 0.8, 0.72, 0.62, 0.52];
      var i = 0;
      function next() {
        if (i >= qs.length) throw 'too_large';
        var q = qs[i++];
        return toBlob(c, 'image/webp', q).then(function (b) {
          if (!b || b.type !== 'image/webp') return toBlob(c, 'image/jpeg', q);     // Safari before 17 cannot write WebP
          return b;
        }).then(function (b) {
          if (!b) throw 'decode';
          if (b.size <= 2 * 1024 * 1024 - 2048) { c.width = 0; c.height = 0; return thumbP.then(function (tb) { return { b: b, w: w, h: hh, t: tb }; }); }
          return next();
        });
      }
      return next();
    });
  }

  start();
})();
