/* Semar kitchens: language switch (ET/EN/RU), header, menu, call bar, gallery tabs + lightbox, form with files (relay, mailto fallback),
   click-to-load map, footer social links. No libraries. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var MAIL = 'sergeiinstaller@gmail.com';

  /* ---------- texts ---------- */
  var RU = {
    skip: 'Перейти к содержанию', navAria: 'Главное меню', ftrNavAria: 'Меню в подвале', menuOpen: 'Открыть меню',
    navServ: 'Услуги', navWork: 'Наши работы', navHow: 'Как мы работаем', navAbout: 'О нас', navContact: 'Контакты',
    heroWhere: 'Эстония', h1: 'Кухни и мебель на заказ',
    heroAlt: 'Угловая кухня с зеленоватыми фасадами, высокими шкафами в тёмном древесном тоне и золотистыми ручками',
    call: 'Позвонить', cta: 'Запросите предложение',
    heroLead: 'Мы семейная мастерская: делаем кухни и мебель по размерам вашего дома. Замеряем, проектируем, изготавливаем и устанавливаем.',
    heroReg: 'Semar kitchens OÜ, рег. код 16677638',
    servH: 'Услуги', servIntro: 'Изготавливаем кухни и мебель на заказ в Таллинне и по всей Эстонии. Возможна доставка и за её пределы.', tel2Lbl: 'На эстонском:',
    s1h: 'Кухонная мебель', s1p: 'Делаем кухню по размерам вашего помещения и устанавливаем её. Фасады выставляем с ровными зазорами.',
    s1alt: 'Кухонные шкафы и ящики терракотового цвета, тёмная столешница',
    s2h: 'Столешницы', s2p: 'Устанавливаем столешницу и встраиваем в неё мойку и варочную панель.',
    s2alt: 'Столешница под мрамор, варочная панель и подсветка под верхними шкафами',
    s3h: 'Встраиваемая техника', s3p: 'Встраиваем духовой шкаф, микроволновку, варочную панель и вытяжку в шкафы и столешницу.',
    s3alt: 'Тёмные высокие шкафы со встроенными микроволновкой и духовкой',
    s4h: 'Шкафы и гардеробные', s4p: 'Делаем их по размерам помещения, в том числе с зеркальными дверями и скруглённым торцом.',
    s4alt: 'Встроенный шкаф со скруглённым торцом в спальне',
    s5h: 'Мебель для ванной', s5p: 'Изготавливаем и устанавливаем тумбы под раковину и высокий шкаф для стиральной и сушильной машин.',
    s5alt: 'Высокий шкаф в древесном тоне для стиральной и сушильной машины и тумба с белой раковиной',
    workH: 'Наши работы', workIntro: 'Все фото с наших объектов. Нажмите на фото, чтобы увеличить.',
    tabsAria: 'Виды работ', catKitchen: 'Кухни', catWardrobe: 'Шкафы и гардеробы', catBath: 'Ванные', catOutdoor: 'Летние уличные кухни',
    w10: 'Угловая кухня с зеленоватыми фасадами, высокими шкафами в тёмном древесном тоне и золотистыми ручками',
    w07: 'Прямая кухня: светлые серо-зелёные верхние шкафы с подсветкой, более тёмные серо-зелёные нижние и столешница под мрамор',
    w02: 'Встроенный шкаф со скруглённым торцом в спальне, рядом открытая дверь в гардеробную',
    w05: 'Кухня терракотового цвета с тёмной столешницей и чёрной мойкой',
    w09: 'Тёмные высокие шкафы с микроволновкой и духовкой, рядом белые нижние шкафы с тёмной столешницей',
    w03: 'Голубая тумба с двумя раковинами и золотистыми ручками',
    w01: 'Светло-бежевый шкаф с двумя зеркальными дверями в спальне',
    w04: 'Серая подвесная тумба под раковину с открытыми полками',
    w08: 'Ванная: высокий шкаф в древесном тоне для стиральной и сушильной машины и подвесная тумба',
    // 04.11 Telegram photos
    w11: 'Светло-бежевая кухня со столешницей и стеновой панелью под дерево, впереди деревянный стол',
    w12: 'Небольшая белая кухня с тёмными ручками и светло-серой столешницей',
    w13: 'Белая стена шкафов с рамочными фасадами и ручками бронзового цвета',
    w14: 'Горчично-жёлтая стенка: верхние шкафы и комод с ящиками со скруглённым краем',
    w15: 'Узкая прихожая, двухстворчатый шкаф до потолка с длинными ручками',
    w16: 'Открытый шкаф: полки, штанги для одежды и два ящика',
    w17: 'Белая подвесная тумба под раковину с двумя ящиками и тёмными ручками',
    w18: 'Летняя кухня в саду: откидная крыша с подсветкой, гриль, мойка и серые шкафы на деревянном настиле',
    w19: 'Та же летняя кухня ближе: гриль, ящики и стены, обшитые деревом',
    w20: 'Летняя кухня вечером: гриль, вытяжка, мойка и тёмно-серые шкафы под навесом',
    w21: 'Летняя уличная кухня, перед ней владельцы фирмы',
    // 06.11 his photo files
    w22: 'Та же терракотовая кухня у другой стены: белые высокие и верхние шкафы, тёмная столешница и чёрная мойка',
    w23: 'Та же кухня с открытыми дверцами и ящиками: полки в верхних шкафах, посудомоечная машина, духовка и глубокие ящики',
    w24: 'Светло-серый кухонный гарнитур с ручками бронзового цвета: мойка, ящики и светлая столешница',
    w25: 'Ванная: высокий шкаф в тёмном древесном тоне для стиральной и сушильной машины, открытая полка и тёмная тумба под раковину',
    w26: 'Прихожая: зеркало от пола до потолка, стеновые панели с волнистым рельефом и подвесная консоль в древесном тоне с ящиком',
    // 16.11 new kitchen (Telegram)
    w27: 'Г-образная кухня со светлыми фасадами под дуб, серой столешницей и стеновой панелью под камень, подсветка под верхними шкафами',
    w28: 'Угол той же кухни: варочная панель, мойка и высокие верхние шкафы светлого дуба',
    w29: 'Та же кухня ближе: угол с мойкой, духовка и серая столешница под камень',
    // 16.11 «Uusim töö» block
    featLabel: 'Новая работа', featH: 'Светлый дуб и серый камень',
    featP: 'Г-образная кухня с фасадами без ручек в тоне светлого дуба. Столешница и стеновая панель с одинаковым серым рисунком камня, под верхними шкафами LED-подсветка.',
    featAsk: 'Хотите такую же кухню?',
    motto1a: 'Каждый дом особенный.', motto1b: 'Каждый проект уникальный.', motto2: 'Сделано так, как вы хотели.',
    howH: 'Как мы работаем', howIntro: 'Четыре шага от замера до готовой мебели.',
    st1h: 'Замер', st1p: 'Приезжаем и измеряем помещение. Обсуждаем, что вам нужно.',
    st2h: 'Проект', st2p: 'Делаем проект по вашим размерам и пожеланиям. Вместе выбираем материалы и цвета.',
    st3h: 'Изготовление', st3p: 'Делаем шкафы и фасады в своей мастерской. Каждая деталь делается для вашего дома.',
    st4h: 'Монтаж', st4p: 'Привозим и устанавливаем мебель. Регулируем двери и ящики и вместе с вами всё проверяем.',
    aboutH: 'О нас',
    aboutP1: 'Мы, Сергей и Марина, основали семейную фирму Semar kitchens в 2023 году. Кухни и мебель делаем в своей мастерской в Виймси, Rohuneeme tee 1.',
    aboutP2: 'Каждый шкаф и фасад делаем по размерам вашего помещения. Замеряем, проектируем, изготавливаем и устанавливаем сами. Работаем в Таллинне, Харьюмаа и по всей Эстонии.',
    aboutPhotoAlt: 'В мастерской: распил детали на форматно-раскроечном станке',
    dataH: 'Данные компании',
    dName: 'Название', dCode: 'Регистрационный код', dReg: 'Зарегистрирована', dSeat: 'Юридический адрес', dSeatV: 'Маарду, Харьюмаа',
    contactH: 'Контакты', contactLead: 'Звоните, пишите в WhatsApp или запросите предложение через форму.',
    waWrite: 'Написать в WhatsApp', cMail: 'E-mail', cArea: 'Где работаем', cAddress: 'Адрес', addrFull: 'Rohuneeme tee 1, Viimsi',
    mapShow: 'Показать карту', mapNote: 'Карта загружается из Google Maps только после нажатия на кнопку.', mapOpen: 'Открыть в Google Maps',
    formH: 'Запросите предложение', fName: 'Имя', fPhone: 'Телефон', fCity: 'Город или волость', fOpt: '(необязательно)',
    fCityPh: 'Например: Таллин', fType: 'Тип проекта', fTypeNone: 'Выберите', fTypeKitchen: 'Кухня', fTypeWardrobe: 'Шкаф',
    fTypeBath: 'Мебель для ванной', fTypeOther: 'Другое', fSource: 'Откуда вы о нас узнали?', fSourcePh: 'Например: от знакомых или из интернета',
    fFiles: 'Фото, чертежи или эскизы', fFilesHint: 'До 6 файлов, всего до 18 МБ: JPG, PNG, WEBP, HEIC или PDF.', fFilesAdd: 'Добавить файлы',
    fSubmit: 'Отправить запрос', fNote: 'Запрос и файлы придут прямо к нам на почту.', fAlt: 'Или напишите напрямую:',
    openMail: 'Открыть готовое письмо', failAddr: 'Или напишите на этот адрес:',
    copyAddr: 'Скопировать адрес', copyText: 'Скопировать текст письма',
    ftrFacts: '© 2026 Semar kitchens OÜ', up: 'Наверх', socIg: 'Semar kitchens в Instagram', socFb: 'Semar kitchens в Facebook',
    lbAria: 'Фото крупно', lbClose: 'Закрыть', lbPrev: 'Предыдущее фото', lbNext: 'Следующее фото'
  };
  var EN = {
    skip: 'Skip to content', navAria: 'Main menu', ftrNavAria: 'Footer menu', menuOpen: 'Open menu',
    navServ: 'Services', navWork: 'Our work', navHow: 'How we work', navAbout: 'About us', navContact: 'Contact',
    heroWhere: 'Estonia', h1: 'Kitchens and furniture made to order',
    heroAlt: 'Corner kitchen with green-grey fronts, tall cabinets in a dark wood tone and golden handles',
    call: 'Call', cta: 'Request a quote',
    heroLead: 'We are a family workshop making kitchens and furniture to fit your home. We measure, design, build and install.',
    heroReg: 'Semar kitchens OÜ, registry code 16677638',
    servH: 'Services', servIntro: 'We make kitchens and furniture to order in Tallinn and all over Estonia. Delivery outside Estonia is also possible.', tel2Lbl: 'In Estonian:',
    s1h: 'Kitchen furniture', s1p: 'We make the kitchen to the measurements of your room and install it. We align the fronts with even gaps.',
    s1alt: 'Terracotta kitchen cabinets and drawers, a dark worktop',
    s2h: 'Worktops', s2p: 'We fit the worktop and set the sink and the hob into it.',
    s2alt: 'Marble-look worktop, a hob and lighting under the wall cabinets',
    s3h: 'Built-in appliances', s3p: 'We fit the oven, microwave, hob and cooker hood into the cabinets and the worktop.',
    s3alt: 'Dark tall cabinets with a built-in microwave and oven',
    s4h: 'Wardrobes and dressing rooms', s4p: 'Made to the measurements of the room, including mirrored doors and a rounded end.',
    s4alt: 'Wardrobe with a rounded end in a bedroom',
    s5h: 'Bathroom furniture', s5p: 'We make and install vanity units and a tall cabinet for the washer and dryer.',
    s5alt: 'Tall wood-tone cabinet for the washer and dryer and a vanity unit with a white basin',
    workH: 'Our work', workIntro: 'Every photo is from our own jobs. Click or tap a photo to enlarge it.',
    tabsAria: 'Types of work', catKitchen: 'Kitchens', catWardrobe: 'Wardrobes and walk-in closets', catBath: 'Bathrooms', catOutdoor: 'Outdoor summer kitchens',
    w10: 'Corner kitchen with green-grey fronts, tall cabinets in a dark wood tone and golden handles',
    w07: 'Straight kitchen: light grey-green wall cabinets with lighting, darker grey-green base cabinets and a marble-look worktop',
    w02: 'Wardrobe with a rounded end in a bedroom, an open door to the walk-in closet next to it',
    w05: 'Terracotta kitchen with a dark worktop and a black sink',
    w09: 'Dark tall cabinets with a microwave and an oven, white base cabinets with a dark worktop next to them',
    w03: 'Light blue vanity unit with two basins and golden handles',
    w01: 'Light beige wardrobe with two mirrored doors in a bedroom',
    w04: 'Grey wall-hung vanity unit with open shelves',
    w08: 'Bathroom: a tall wood-tone cabinet for the washer and dryer and a wall-hung vanity unit',
    w11: 'Light beige kitchen with a wood-look worktop and wall panel, a wooden table in front',
    w12: 'Small white kitchen with dark handles and a light grey worktop',
    w13: 'Wall of white wardrobes with framed doors and bronze-tone handles',
    w14: 'Mustard yellow storage wall: wall cupboards and a chest of drawers with a rounded edge',
    w15: 'Narrow hallway with a floor-to-ceiling two-door wardrobe and long handles',
    w16: 'Open wardrobe: shelves, clothes rails and two drawers',
    w17: 'White wall-hung vanity unit with two drawers and dark handles',
    w18: 'Outdoor summer kitchen in a garden: a lift-up roof with lights, a grill, a sink and grey cabinets on a wooden deck',
    w19: 'The same outdoor kitchen up close: grill, drawers and wood-clad walls',
    w20: 'Outdoor kitchen in the evening light: grill, cooker hood, sink and dark grey cabinets under a roof',
    w21: 'Outdoor summer kitchen, the owners in front of it',
    w22: 'The same terracotta kitchen along the other wall: white tall and wall cabinets, a dark worktop and a black sink',
    w23: 'The same kitchen with the doors and drawers open: shelves in the wall cabinets, a dishwasher, an oven and deep drawers',
    w24: 'Light grey kitchen run with bronze-tone handles: a sink, drawers and a light worktop',
    w25: 'Bathroom: a tall dark wood-tone cabinet for the washer and dryer, an open shelf and a dark vanity unit',
    w26: 'Hallway: a floor-to-ceiling mirror, wall panels with a wavy relief and a wall-mounted wood-tone console with a drawer',
    // 16.11 new kitchen (Telegram)
    w27: 'L-shaped kitchen with light oak fronts, a grey stone-look worktop and splashback, lighting under the wall cabinets',
    w28: 'Corner of the same kitchen: hob, sink and tall wall cabinets in light oak',
    w29: 'The same kitchen up close: sink corner, oven and a grey stone-look worktop',
    // 16.11 «Uusim töö» block
    featLabel: 'Latest project', featH: 'Light oak and grey stone',
    featP: 'An L-shaped kitchen with handleless fronts in a light oak tone. The worktop and splashback share the same grey stone pattern, with LED lighting under the wall cabinets.',
    featAsk: 'Want a kitchen like this?',
    motto1a: 'Every home is special.', motto1b: 'Every project is unique.', motto2: 'Made the way you wanted.',
    howH: 'How we work', howIntro: 'Four steps from measuring to finished furniture.',
    st1h: 'Measuring', st1p: 'We come over and measure the room. We talk through what you need.',
    st2h: 'Design', st2p: 'We draw up the design to your measurements and wishes. Together we choose the materials and colours.',
    st3h: 'Manufacturing', st3p: 'We make the cabinets and fronts in our own workshop. Every part is made for your home.',
    st4h: 'Installation', st4p: 'We bring the furniture over and install it. We adjust the doors and drawers and check everything together with you.',
    aboutH: 'About us',
    aboutP1: 'Semar kitchens is the family firm of Sergei and Marina. We founded it in 2023 and make kitchens and furniture in our own workshop in Viimsi, Rohuneeme tee 1.',
    aboutP2: 'Every cabinet and front is made to the measurements of your room. We measure, design, build and install everything ourselves. We work in Tallinn, Harju County and all over Estonia.',
    aboutPhotoAlt: 'In the workshop: cutting a panel on the sliding table saw',
    dataH: 'Company details',
    dName: 'Company name', dCode: 'Registry code', dReg: 'Registered', dSeat: 'Registered address', dSeatV: 'Maardu, Harju County',
    contactH: 'Contact', contactLead: 'Call, message us on WhatsApp or request a quote with the form.',
    waWrite: 'Message on WhatsApp', cMail: 'E-mail', cArea: 'Area', cAddress: 'Address', addrFull: 'Rohuneeme tee 1, Viimsi',
    mapShow: 'Show map', mapNote: 'The map loads from Google Maps only after you press the button.', mapOpen: 'Open in Google Maps',
    formH: 'Request a quote', fName: 'Name', fPhone: 'Phone', fCity: 'Town or parish', fOpt: '(optional)',
    fCityPh: 'For example: Tallinn', fType: 'Project type', fTypeNone: 'Choose', fTypeKitchen: 'Kitchen', fTypeWardrobe: 'Wardrobe',
    fTypeBath: 'Bathroom furniture', fTypeOther: 'Other', fSource: 'How did you hear about us?', fSourcePh: 'For example: from friends or online',
    fFiles: 'Photos, drawings or sketches', fFilesHint: 'Up to 6 files, 18 MB in total: JPG, PNG, WEBP, HEIC or PDF.', fFilesAdd: 'Add files',
    fSubmit: 'Send request', fNote: 'Your request and files come straight to our e-mail.', fAlt: 'Or write directly:',
    openMail: 'Open the ready e-mail', failAddr: 'Or write to this address:',
    copyAddr: 'Copy address', copyText: 'Copy message text',
    ftrFacts: '© 2026 Semar kitchens OÜ', up: 'Top', socIg: 'Semar kitchens on Instagram', socFb: 'Semar kitchens on Facebook',
    lbAria: 'Photo full size', lbClose: 'Close', lbPrev: 'Previous photo', lbNext: 'Next photo'
  };
  var DICT = { ru: RU, en: EN };
  // 11.11 SEO: the same titles and descriptions are written into /, /ru/ and /en/ by _work/build_golive.py (it reads META from here)
  var META = {
    et: { title: 'Köögimööbel ja mööbel eritellimusel Tallinnas | Semar kitchens',
          desc: 'Pereettevõte Semar kitchens: köögimööbel, riidekapid ja vannitoamööbel eritellimusel. Oma töökoda Viimsis, töötame Tallinnas ja üle Eesti. Tel +372 5594 6489.' },
    ru: { title: 'Кухни и мебель на заказ в Таллинне | Semar kitchens',
          desc: 'Семейная мастерская Semar kitchens: кухни, шкафы и мебель для ванной на заказ. Своя мастерская в Виймси, работаем в Таллинне и по всей Эстонии. Тел. +372 5554 9755.' },
    en: { title: 'Custom kitchens and furniture in Tallinn | Semar kitchens',
          desc: 'Semar kitchens is a family workshop in Viimsi making kitchens, wardrobes and bathroom furniture to order. We work in Tallinn and all over Estonia. Call +372 5554 9755.' }
  };
  // 11.11 SEO: every language has its own address; the switch stays instant and only rewrites the address bar
  var PATH = { et: '/', ru: '/ru/', en: '/en/' };
  var MSG = {
    et: { menuOpen: 'Ava menüü', menuClose: 'Sulge menüü',
          eName: 'Kirjutage oma nimi.', ePhone: 'Kirjutage telefoninumber.', ePhoneBad: 'Kontrollige telefoninumbrit.', eType: 'Valige projekti tüüp.',
          eFilesMany: 'Lisada saab kuni 6 faili.', eFilesBig: 'Failid on kokku üle 18 MB. Eemaldage mõni fail või saatke suured failid e-postiga.',
          eFilesType: 'See fail ei sobi: {f}. Sobivad JPG, PNG, WEBP, HEIC ja PDF.', rmFile: 'Eemalda fail: ', unitKB: 'KB', unitMB: 'MB',
          sending: 'Saadame päringut…', sendBtn: 'Saadame…', sent: 'Aitäh! Päring on saadetud. Võtame Teiega ühendust.',
          fail: 'Päringut ei õnnestunud otse saata. Saatke see e-postiga: valmis kiri avaneb Teie e-posti programmis. Kui see ei avanenud, vajutage nupule.',
          failFiles: 'Lisage fotod ja joonised kirjale ise manusena.', mapTitle: 'Google Mapsi kaart: Rohuneeme tee 1, Viimsi',
          cAddr: 'Aadress on kopeeritud.', cText: 'Kirja tekst on kopeeritud. Kleepige see uude kirja.', cFail: 'Kopeerimine ei õnnestunud. Märkige aadress ja kopeerige see käsitsi.',
          subj: 'Pakkumise päring', lName: 'Nimi', lPhone: 'Telefon', lCity: 'Linn või vald', lType: 'Projekt', lSource: 'Kust kuulsite',
          lFiles: 'Failid (lisan manusena)', lLang: 'Keel', langName: 'eesti' },
    ru: { menuOpen: 'Открыть меню', menuClose: 'Закрыть меню',
          eName: 'Укажите имя.', ePhone: 'Укажите номер телефона.', ePhoneBad: 'Проверьте номер телефона.', eType: 'Выберите тип проекта.',
          eFilesMany: 'Можно добавить не больше 6 файлов.', eFilesBig: 'Файлы вместе больше 18 МБ. Удалите какой-нибудь файл или отправьте большие файлы по почте.',
          eFilesType: 'Этот файл не подходит: {f}. Подходят JPG, PNG, WEBP, HEIC и PDF.', rmFile: 'Удалить файл: ', unitKB: 'КБ', unitMB: 'МБ',
          sending: 'Отправляем запрос…', sendBtn: 'Отправляем…', sent: 'Спасибо! Запрос отправлен. Мы свяжемся с вами.',
          fail: 'Не получилось отправить запрос напрямую. Отправьте его по почте: готовое письмо откроется в вашей почтовой программе. Если оно не открылось, нажмите на кнопку.',
          failFiles: 'Приложите фото и чертежи к письму сами.', mapTitle: 'Карта Google Maps: Rohuneeme tee 1, Viimsi',
          cAddr: 'Адрес скопирован.', cText: 'Текст письма скопирован. Вставьте его в новое письмо.', cFail: 'Не удалось скопировать. Выделите адрес и скопируйте его вручную.',
          subj: 'Запрос предложения', lName: 'Имя', lPhone: 'Телефон', lCity: 'Город или волость', lType: 'Проект', lSource: 'Откуда узнали',
          lFiles: 'Файлы (приложу к письму)', lLang: 'Язык', langName: 'русский' },
    en: { menuOpen: 'Open menu', menuClose: 'Close menu',
          eName: 'Please enter your name.', ePhone: 'Please enter a phone number.', ePhoneBad: 'Please check the phone number.', eType: 'Please choose the project type.',
          eFilesMany: 'You can add up to 6 files.', eFilesBig: 'The files are over 18 MB in total. Remove a file or send large files by e-mail.',
          eFilesType: 'This file cannot be added: {f}. Use JPG, PNG, WEBP, HEIC or PDF.', rmFile: 'Remove file: ', unitKB: 'KB', unitMB: 'MB',
          sending: 'Sending your request…', sendBtn: 'Sending…', sent: 'Thank you! Your request has been sent. We will get back to you.',
          fail: 'We could not send the request directly. Please send it by e-mail: a ready message opens in your e-mail program. If it did not open, press the button.',
          failFiles: 'Please attach your photos and drawings to the e-mail yourself.', mapTitle: 'Google Maps: Rohuneeme tee 1, Viimsi',
          cAddr: 'The address is copied.', cText: 'The message text is copied. Paste it into a new e-mail.', cFail: 'Copying did not work. Select the address and copy it by hand.',
          subj: 'Quote request', lName: 'Name', lPhone: 'Phone', lCity: 'Town or parish', lType: 'Project', lSource: 'Heard about us from',
          lFiles: 'Files (attached to this e-mail)', lLang: 'Language', langName: 'English' }
  };

  /* ---------- language ---------- */
  // the page's own language: 'et' on /, 'ru' on /ru/, 'en' on /en/ (those two are pre-rendered in their language and carry the Estonian texts in #i18n-et)
  var page = (root.getAttribute('lang') === 'ru' || root.getAttribute('lang') === 'en') ? root.getAttribute('lang') : 'et';
  var lang = page;
  var textEls = doc.querySelectorAll('[data-t]'), attrEls = doc.querySelectorAll('[data-ta]');
  var ET = {}, etJson = doc.getElementById('i18n-et');
  if (etJson) { try { ET = JSON.parse(etJson.textContent); } catch (e) { ET = {}; } }
  else {
    Array.prototype.forEach.call(textEls, function (el) { var k = el.getAttribute('data-t'); if (!(k in ET)) ET[k] = el.textContent; });
    Array.prototype.forEach.call(attrEls, function (el) {
      el.getAttribute('data-ta').split(',').forEach(function (pair) { var p = pair.split(':'); if (!(p[1] in ET)) ET[p[1]] = el.getAttribute(p[0]); });
    });
  }
  ET.menuOpen = MSG.et.menuOpen;
  function setUrl() { try { history.replaceState(null, '', PATH[lang] + location.hash); } catch (e) {} }
  function t(k) { var d = DICT[lang]; return (d ? d[k] : ET[k]) || ET[k] || ''; }
  function setMeta(sel, val) { var m = doc.querySelector(sel); if (m) m.setAttribute('content', val); }

  // 03.11 (Sergei): Estonian callers reach Marina, Russian and English callers Sergei; the other number is shown under the big one.
  // 23.11: outside applyLang, so the site editor can change the numbers; telText = the links that show the number itself
  var TEL = { et: ['+37255946489', '+372 5594 6489'], ru: ['+37255549755', '+372 5554 9755'], en: ['+37255549755', '+372 5554 9755'] };
  var telText = Array.prototype.filter.call(doc.querySelectorAll('a[data-tel]'), function (a) { return /^\+372/.test(a.textContent.trim()); });

  function applyLang(l, save) {
    lang = (l === 'ru' || l === 'en') ? l : 'et';
    root.lang = lang;
    Array.prototype.forEach.call(textEls, function (el) { el.textContent = t(el.getAttribute('data-t')); });
    Array.prototype.forEach.call(attrEls, function (el) {
      el.getAttribute('data-ta').split(',').forEach(function (pair) { var p = pair.split(':'); el.setAttribute(p[0], t(p[1])); });
    });
    doc.title = META[lang].title;
    setMeta('meta[name="description"]', META[lang].desc);
    setMeta('meta[property="og:title"]', META[lang].title);
    setMeta('meta[property="og:description"]', META[lang].desc);
    setMeta('meta[name="twitter:title"]', META[lang].title);
    setMeta('meta[name="twitter:description"]', META[lang].desc);
    var LOC = { et: 'et_EE', ru: 'ru_RU', en: 'en_GB' };
    setMeta('meta[property="og:locale"]', LOC[lang]);
    Array.prototype.forEach.call(doc.querySelectorAll('meta[property="og:locale:alternate"]'), function (m, i) {
      m.setAttribute('content', ['et', 'ru', 'en'].filter(function (x) { return x !== lang; }).map(function (x) { return LOC[x]; })[i]);
    });
    Array.prototype.forEach.call(doc.querySelectorAll('.lang__b'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    menuLabel();
    clearErrors();
    var ALT = lang === 'et' ? TEL.ru : TEL.et;
    Array.prototype.forEach.call(doc.querySelectorAll('a[data-tel]'), function (a) {
      var n = a.getAttribute('data-tel') === 'main' ? TEL[lang] : ALT;
      a.setAttribute('href', 'tel:' + n[0]);
      if (telText.indexOf(a) >= 0) a.textContent = n[1];
    });
    if (lbOpen) showPhoto(cur);
    renderFiles();
    if (sending) submitBtn.textContent = MSG[lang].sendBtn;
    if (mapIf) mapIf.title = MSG[lang].mapTitle;
    if (save) { try { localStorage.setItem('semar-lang', lang); } catch (e) {} }
    cmsLang();
    root.classList.remove('i18n-wait');
  }
  Array.prototype.forEach.call(doc.querySelectorAll('.lang__b'), function (b) {
    b.addEventListener('click', function () {
      applyLang(b.getAttribute('data-lang'), true);
      setUrl();
    });
  });

  /* ---------- header + menu ---------- */
  var hdr = doc.querySelector('.hdr'), menuBtn = doc.querySelector('.menu-btn'), menu = doc.getElementById('menu');
  function onScroll() { hdr.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function menuLabel() { menuBtn.setAttribute('aria-label', MSG[lang][menuBtn.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuOpen']); }
  function setMenu(open, focusBack) {
    menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); menuLabel();
    if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
    else if (focusBack) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  doc.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.hdr')) setMenu(false); });

  /* ---------- call bar: after the hero buttons, never over the contact section or footer ---------- */
  var bar = doc.getElementById('callbar');
  if ('IntersectionObserver' in window && bar) {
    var seen = { cta: true, contact: false, footer: false };
    var map = new Map([[doc.querySelector('.hero__cta'), 'cta'], [doc.getElementById('kontakt'), 'contact'], [doc.getElementById('jalus'), 'footer']]);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var k = map.get(en.target);
        seen[k] = k === 'cta' ? (en.isIntersecting || en.boundingClientRect.top > 0) : en.isIntersecting;
      });
      var on = !seen.cta && !seen.contact && !seen.footer;
      bar.classList.toggle('is-on', on);
      if (on) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
    });
    map.forEach(function (_, el) { if (el) io.observe(el); });
  }

  /* ---------- gallery: category tabs (WAI-ARIA tabs, automatic activation) ---------- */
  var tabs = Array.prototype.slice.call(doc.querySelectorAll('.tab')), tablist = doc.querySelector('.tabs');
  function panelOf(tab) { return doc.getElementById(tab.getAttribute('aria-controls')); }
  // a category without photos (outdoor kitchens until they arrive) hides its tab and panel; one photo in its list shows them
  tabs.forEach(function (tab) { var empty = !panelOf(tab).querySelector('.tile__b'); tab.hidden = empty; if (empty) panelOf(tab).hidden = true; });
  var liveTabs = tabs.filter(function (tab) { return !tab.hidden; });
  function selectTab(tab, focus) {
    liveTabs.forEach(function (x) {
      var on = x === tab;
      x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; panelOf(x).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab) { tab.addEventListener('click', function () { if (!tab.hidden) selectTab(tab); }); });
  if (tablist) tablist.addEventListener('keydown', function (e) {
    var i = liveTabs.indexOf(doc.activeElement), n = liveTabs.length, j = -1;
    if (i < 0) return;
    if (e.key === 'ArrowRight') j = (i + 1) % n;
    else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j < 0) return;
    e.preventDefault(); selectTab(liveTabs[j], true);
  });
  if (liveTabs.length) selectTab(liveTabs.filter(function (x) { return x.getAttribute('aria-selected') === 'true'; })[0] || liveTabs[0]);
  if (tablist && liveTabs.length < 2) tablist.hidden = true;   // one category only: no tab row
  /* ---------- 04.11: a service card opens its photos in the gallery (Sergei tapped the bathroom card) ---------- */
  Array.prototype.slice.call(doc.querySelectorAll('.front[data-goto]')).forEach(function (card) {
    var tab = doc.getElementById(card.getAttribute('data-goto'));
    if (!tab || tab.hidden) return;
    card.tabIndex = 0; card.setAttribute('role', 'link'); card.classList.add('front--go');
    function go() { selectTab(tab); var sec = doc.getElementById('tood'); if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    card.addEventListener('click', go);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* ---------- gallery lightbox: prev/next stay inside the category on show ---------- */
  var lb = doc.getElementById('lb'), lbImg = doc.getElementById('lb-img'), lbCap = doc.getElementById('lb-cap'), lbCount = doc.getElementById('lb-count');
  var order = [], cur = 0, lbOpen = false, opener = null;
  function visualOrder(list) {
    return list.slice().sort(function (a, b) {
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return Math.abs(ra.top - rb.top) > 4 ? ra.top - rb.top : ra.left - rb.left;
    });
  }
  function showPhoto(i) {
    cur = (i + order.length) % order.length;
    var b = order[cur], im = b.querySelector('img');
    lbImg.src = b.getAttribute('data-full');
    lbImg.alt = im.getAttribute('alt');
    lbCap.textContent = im.getAttribute('alt');
    lbCount.textContent = (cur + 1) + ' / ' + order.length;
  }
  function openLb(btn) {
    var box = btn.closest('.panel, .feat'), list = Array.prototype.slice.call((box || doc).querySelectorAll('.tile__b'));
    order = box && box.classList.contains('feat') ? list : visualOrder(list); opener = btn; lbOpen = true;
    showPhoto(order.indexOf(btn));
    lb.hidden = false; root.style.overflow = 'hidden';
    doc.getElementById('lb-close').focus();
  }
  function closeLb() {
    if (!lbOpen) return;
    lbOpen = false; lb.hidden = true; root.style.overflow = ''; lbImg.removeAttribute('src');
    if (opener) opener.focus();
  }
  doc.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('.tile__b') : null; if (b) openLb(b); });
  doc.getElementById('lb-close').addEventListener('click', closeLb);
  doc.getElementById('lb-prev').addEventListener('click', function () { showPhoto(cur - 1); });
  doc.getElementById('lb-next').addEventListener('click', function () { showPhoto(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  doc.addEventListener('keydown', function (e) {
    if (lbOpen) {
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
      else if (e.key === 'ArrowLeft') showPhoto(cur - 1);
      else if (e.key === 'ArrowRight') showPhoto(cur + 1);
      else if (e.key === 'Tab') {
        var f = lb.querySelectorAll('button'), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    } else if (e.key === 'Escape' && !menu.hidden) { setMenu(false, true); }
  });
  var x0 = null, y0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) showPhoto(cur + (dx < 0 ? 1 : -1));
  });

  /* ---------- form: check, send with the files through the forms relay; if that fails, the mailto fallback ---------- */
  // relay: tools/forms_relay/Code.gs (site 'semar'); JSON sent as text/plain so the browser makes no CORS preflight
  var RELAY = 'https://script.google.com/macros/s/AKfycbxG8sh9Xi-msP2Ol6iG9FBB__M4_Btafq6KlNpsJNSXS-XnmKKVrajYfpyaGgVzA8zG/exec';
  var MAX_FILES = 6, MAX_BYTES = 18 * 1024 * 1024;
  var TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf' };
  var form = doc.getElementById('paring'), status = doc.getElementById('f-status'), done = doc.getElementById('f-done'),
      copied = doc.getElementById('f-copied'), formAlt = form.querySelector('.form__alt'), formNote = form.querySelector('.form__note'), mailText = '',
      fileIn = doc.getElementById('f-files'), fileList = doc.getElementById('f-list'), fileErr = doc.getElementById('e-files'),
      submitBtn = doc.getElementById('f-submit'), mailBtn = doc.getElementById('f-mail'), hp = doc.getElementById('f-hp');
  var files = [], sending = false, tLoad = Date.now(), tShown = 0;
  // t for the relay's bot check: time since the form was first on screen (or first touched)
  if ('IntersectionObserver' in window) {
    var fio = new IntersectionObserver(function (en) {
      if (!tShown && en.some(function (x) { return x.isIntersecting; })) { tShown = Date.now(); fio.disconnect(); }
    });
    fio.observe(form);
  }
  form.addEventListener('focusin', function () { if (!tShown) tShown = Date.now(); });

  /* files: images (jpeg/png/webp/heic) and PDF, up to 6, together up to 18 MB */
  function typeOf(f) {
    var tp = (f.type || '').toLowerCase(), ext = ((/\.([a-z0-9]+)$/i.exec(f.name || '') || [])[1] || '').toLowerCase();
    if (/^(image\/(jpeg|png|webp|heic|heif)|application\/pdf)$/.test(tp)) return tp;
    if (TYPES[ext] && (!tp || tp === 'application/octet-stream' || tp.indexOf('image/') === 0)) return TYPES[ext];   // e.g. HEIC on Windows comes without a type
    return '';
  }
  function fmtSize(b) {
    var m = MSG[lang];
    if (b < 1048576) return Math.max(1, Math.round(b / 1024)) + ' ' + m.unitKB;
    var s = (b / 1048576).toFixed(1);
    return (lang === 'en' ? s : s.replace('.', ',')) + ' ' + m.unitMB;
  }
  function totalBytes() { return files.reduce(function (s, it) { return s + it.file.size; }, 0); }
  function setFileErr(key, arg) {
    if (key) { fileErr.textContent = MSG[lang][key].replace('{f}', arg || ''); fileErr.hidden = false; fileErr.setAttribute('data-k', key); fileErr.setAttribute('data-a', arg || ''); }
    else { fileErr.textContent = ''; fileErr.hidden = true; fileErr.removeAttribute('data-k'); fileErr.removeAttribute('data-a'); }
  }
  function renderFiles() {
    if (!fileList) return;
    fileList.textContent = '';
    files.forEach(function (it, i) {
      var li = doc.createElement('li'), nm = doc.createElement('span'), sz = doc.createElement('span'), rm = doc.createElement('button');
      li.className = 'files__item';
      li.innerHTML = '<svg class="files__ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2.8h8l4.2 4.2v14.2H6z M14 2.8v4.2h4.2"/></svg>';
      nm.className = 'files__name'; nm.textContent = it.file.name; nm.title = it.file.name;
      sz.className = 'files__size'; sz.textContent = fmtSize(it.file.size);
      rm.type = 'button'; rm.className = 'files__rm'; rm.setAttribute('aria-label', MSG[lang].rmFile + it.file.name);
      rm.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      rm.addEventListener('click', function () { removeFile(i); });
      li.appendChild(nm); li.appendChild(sz); li.appendChild(rm); fileList.appendChild(li);
    });
  }
  function removeFile(i) {
    if (sending) return;
    files.splice(i, 1); setFileErr(null); renderFiles();
    var rms = fileList.querySelectorAll('.files__rm');
    (rms[Math.min(i, rms.length - 1)] || fileIn).focus();
  }
  fileIn.addEventListener('change', function () {
    var picked = Array.prototype.slice.call(fileIn.files || []), errs = {}, badName = '';
    fileIn.value = '';   // the list below keeps the files, so picking again adds to it
    picked.forEach(function (f) {
      if (files.some(function (it) { return it.file.name === f.name && it.file.size === f.size && it.file.lastModified === f.lastModified; })) return;
      var tp = typeOf(f);
      if (!tp) { errs.type = true; if (!badName) badName = f.name; return; }
      if (files.length >= MAX_FILES) { errs.many = true; return; }
      if (totalBytes() + f.size > MAX_BYTES) { errs.big = true; return; }
      files.push({ file: f, type: tp });
    });
    setFileErr(errs.many ? 'eFilesMany' : errs.big ? 'eFilesBig' : errs.type ? 'eFilesType' : null, badName);
    renderFiles();
  });
  function toBase64(f) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { var s = String(r.result), i = s.indexOf(','); resolve(i < 0 ? '' : s.slice(i + 1)); };
      r.onerror = function () { reject(r.error || new Error('read')); };
      r.readAsDataURL(f);
    });
  }
  function withTimeout(p, ms, ctl) {
    return new Promise(function (resolve, reject) {
      var tm = setTimeout(function () { if (ctl) ctl.abort(); reject(new Error('timeout')); }, ms);
      p.then(function (v) { clearTimeout(tm); resolve(v); }, function (er) { clearTimeout(tm); reject(er); });
    });
  }

  /* result box: 'sending', 'sent', 'fail' or 'fail+files' (data-k keeps it, so a language switch re-translates it) */
  function statusText(k) {
    var m = MSG[lang], p = k.split('+');
    return p[0] === 'fail' ? m.fail + (p[1] ? ' ' + m.failFiles : '') : m[p[0]];
  }
  function showStatus(k) {
    status.textContent = statusText(k); status.setAttribute('data-k', k);
    done.className = 'form__done is-' + k.split('+')[0]; done.hidden = false;
    formAlt.hidden = formNote.hidden = k.indexOf('fail') === 0;   // the fallback box shows the address itself; "straight to our e-mail" would be wrong then
    copied.textContent = ''; copied.removeAttribute('data-k');
  }
  function setSending(on) {
    sending = on; submitBtn.disabled = on; fileIn.disabled = on;
    form.setAttribute('aria-busy', String(on));
    submitBtn.textContent = on ? MSG[lang].sendBtn : t('fSubmit');
  }
  function fieldOf(id) { return doc.getElementById(id).closest('.field'); }
  function setErr(id, key) {
    var fld = fieldOf(id), err = fld.querySelector('.err'), inp = doc.getElementById(id);
    if (key) { err.textContent = MSG[lang][key]; err.hidden = false; err.setAttribute('data-k', key); fld.classList.add('is-bad'); inp.setAttribute('aria-invalid', 'true'); }
    else { err.textContent = ''; err.hidden = true; err.removeAttribute('data-k'); fld.classList.remove('is-bad'); inp.removeAttribute('aria-invalid'); }
  }
  function clearErrors() {
    if (!form) return;
    Array.prototype.forEach.call(form.querySelectorAll('.err'), function (er) {
      var k = er.getAttribute('data-k'); if (k) er.textContent = MSG[lang][k].replace('{f}', er.getAttribute('data-a') || '');
    });
    var sk = status.getAttribute('data-k'); if (sk) status.textContent = statusText(sk);
    var ck = copied.getAttribute('data-k'); if (ck) copied.textContent = MSG[lang][ck];
  }
  function okPhone(v) { var n = v.replace(/\D/g, '').length; return n >= 7 && n <= 15; }
  function openMail(href) { var link = doc.createElement('a'); link.href = href; link.hidden = true; doc.body.appendChild(link); link.click(); link.remove(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    function val(id) { return doc.getElementById(id).value.trim(); }
    var name = val('f-name'), phone = val('f-phone'), city = val('f-city'), type = val('f-type'), source = val('f-source');
    var sel = doc.getElementById('f-type'), typeTxt = type ? sel.options[sel.selectedIndex].textContent : '';
    var bad = [];
    setErr('f-name', name ? null : 'eName'); if (!name) bad.push('f-name');
    var pk = !phone ? 'ePhone' : (okPhone(phone) ? null : 'ePhoneBad');
    setErr('f-phone', pk); if (pk) bad.push('f-phone');
    setErr('f-type', type ? null : 'eType'); if (!type) bad.push('f-type');
    status.textContent = ''; status.removeAttribute('data-k'); copied.textContent = ''; copied.removeAttribute('data-k');
    if (bad.length) { done.hidden = true; formAlt.hidden = formNote.hidden = false; doc.getElementById(bad[0]).focus(); return; }
    var m = MSG[lang], list = files.slice(), names = list.map(function (it) { return it.file.name; });
    var subject = m.subj + ': ' + name + (city ? ', ' + city : '');
    var body = [m.lName + ': ' + name, m.lPhone + ': ' + phone, city ? m.lCity + ': ' + city : '', m.lType + ': ' + typeTxt,
                source ? m.lSource + ': ' + source : '', names.length ? m.lFiles + ': ' + names.join(', ') : ''].filter(Boolean).join('\n') + '\n';
    var href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    mailText = subject + '\n\n' + body; mailBtn.href = href;
    var payload = { site: 'semar', name: name, contact: phone, svc: typeTxt, place: city,
                    msg: [source ? m.lSource + ': ' + source : '', m.lLang + ': ' + m.langName].filter(Boolean).join('\n'),
                    hp: hp.value, t: Date.now() - (tShown || tLoad) };
    var clickedAt = Date.now(), ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var wait = 30000 + Math.ceil(totalBytes() / 1048576) * 6000;   // 30 s, plus 6 s per MB of files
    setSending(true); showStatus('sending');
    Promise.all(list.map(function (it) { return toBase64(it.file).then(function (d) { return { name: it.file.name, type: it.type, data: d }; }); }))
      .then(function (photos) {
        payload.photos = photos;
        return withTimeout(fetch(RELAY, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload),
                                          signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.json(); }), wait, ctl);
      })
      .then(function (j) { if (!j || j.ok !== true) throw new Error('relay'); return true; })
      .catch(function () { return false; })
      .then(function (ok) {
        setSending(false);
        if (ok) {
          form.reset(); files = []; renderFiles(); setFileErr(null);
          showStatus('sent');
        } else {
          /* relay down or refused: the mailto as before; files cannot go into a mailto, so the box asks to attach them */
          showStatus(list.length ? 'fail+files' : 'fail');
          if (Date.now() - clickedAt < 4000) openMail(href);   // browsers open a mail program only shortly after the click; the button always works
        }
      });
  });
  /* copy helper: Clipboard API, with a textarea fallback (file:// and older browsers) */
  function fallbackCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = doc.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-1000px';
      doc.body.appendChild(ta); ta.select(); var ok = false;
      try { ok = doc.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove(); if (ok) resolve(); else reject(new Error('copy'));
    });
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    return fallbackCopy(text);
  }
  function showCopied(key) { copied.textContent = MSG[lang][key]; copied.setAttribute('data-k', key); }
  doc.getElementById('copy-addr').addEventListener('click', function () { copyText(MAIL).then(function () { showCopied('cAddr'); }, function () { showCopied('cFail'); }); });
  doc.getElementById('copy-text').addEventListener('click', function () { copyText(mailText).then(function () { showCopied('cText'); }, function () { showCopied('cFail'); }); });
  Array.prototype.forEach.call(form.querySelectorAll('input, textarea, select'), function (inp) {
    inp.addEventListener(inp.tagName === 'SELECT' ? 'change' : 'input', function () { if (inp.getAttribute('aria-invalid')) setErr(inp.id, null); });
  });

  /* ---------- map: the Google embed loads only after a click (no request to Google before that) ---------- */
  var mapBtn = doc.getElementById('map-btn'), mapFrame = doc.getElementById('map-frame'), mapIf = null;
  if (mapBtn && mapFrame) mapBtn.addEventListener('click', function () {
    mapIf = doc.createElement('iframe');
    mapIf.className = 'map__if';
    mapIf.title = MSG[lang].mapTitle;
    mapIf.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    mapIf.setAttribute('allowfullscreen', '');
    mapIf.src = 'https://www.google.com/maps?q=' + (ADDR === ADDR0 ? 'Rohuneeme+tee+1,+Viimsi' : encodeURIComponent(ADDR)) + '&output=embed&hl=' + lang;
    mapFrame.textContent = ''; mapFrame.appendChild(mapIf); mapFrame.classList.add('is-on');
    mapIf.focus();
  });

  /* ---------- footer social links: shown only when index.html has a real address in data-url ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('.social__a'), function (a) {
    var u = (a.getAttribute('data-url') || '').trim();
    if (/^https:\/\/\S+$/.test(u)) { a.setAttribute('href', u); a.hidden = false; }
  });
  var soc = doc.querySelector('.social');
  if (soc) soc.hidden = !soc.querySelector('.social__a:not([hidden])');

  /* ---------- 23.11 site editor (semarkitchens.com/admin/): Sergei's texts, contacts and new works ----------
     js/cms.js (vasylian-admin) loads what he saved and sends "cms:applied". A value equal to the page's own one, or empty,
     changes nothing, so the untouched site stays exactly as it was (the HTML texts stay what search engines read).
       texts     h1, heroLead, aboutP1, aboutP2 per language (et, ru, en)
       contacts  telEt (the Estonian page's number), telRu (Russian and English pages), wa, mail, addr
       works     [{c: k|w|b|o, t: {et, ru, en}, d: {et, ru, en}, p1 … p10: '/i/semar/<id>', s: 'WxH,…', th: previews, o: 'w07,…'}],
                 newest first. o = the site's own photo a work photo stands for (the old gallery, moved into the editor on
                 24.11 by tools/migrate_old.py; v: 'g1' marks that). See renderWorks for how the gallery follows the list. */
  var CMS_TXT = ['h1', 'heroLead', 'aboutP1', 'aboutP2'];
  var ORIG = { et: {}, ru: {}, en: {} };
  CMS_TXT.concat(['addrFull']).forEach(function (k) { ORIG.et[k] = ET[k]; ORIG.ru[k] = RU[k]; ORIG.en[k] = EN[k]; });
  var TEL0 = { et: TEL.et.slice(), ru: TEL.ru.slice() }, MAIL0 = MAIL;
  var waLinks = Array.prototype.slice.call(doc.querySelectorAll('a[href^="https://wa.me/"]'));
  var WA0 = waLinks.length ? waLinks[0].getAttribute('href').slice(14) : '';
  var mapLinks = Array.prototype.slice.call(doc.querySelectorAll('a[href^="https://www.google.com/maps/search/"]'));
  var mapHref0 = mapLinks.map(function (a) { return a.getAttribute('href'); });
  var mapAddrEl = doc.querySelector('.map__addr');
  var ADDR0 = mapAddrEl ? mapAddrEl.textContent.trim() : 'Rohuneeme tee 1, Viimsi', ADDR = ADDR0;
  var mapTitle0 = { et: MSG.et.mapTitle, ru: MSG.ru.mapTitle, en: MSG.en.mapTitle };
  var CATS = { k: 'p-koogid', w: 'p-kapid', b: 'p-vann', o: 'p-oues' };
  var GEN = {        // the title of a work Sergei did not name in this language
    k: { et: 'Köök eritellimusel', ru: 'Кухня на заказ', en: 'Custom-made kitchen' },
    w: { et: 'Riidekapp eritellimusel', ru: 'Шкаф на заказ', en: 'Custom-made wardrobe' },
    b: { et: 'Vannitoamööbel eritellimusel', ru: 'Мебель для ванной на заказ', en: 'Custom-made bathroom furniture' },
    o: { et: 'Väliköök', ru: 'Уличная кухня', en: 'Outdoor kitchen' } };
  var ASK = {        // the question next to «Küsige pakkumist!» (kitchens keep featAsk)
    w: { et: 'Soovite sarnast riidekappi?', ru: 'Хотите такой же шкаф?', en: 'Want a wardrobe like this?' },
    b: { et: 'Soovite sarnast vannitoamööblit?', ru: 'Хотите такую же мебель для ванной?', en: 'Want bathroom furniture like this?' },
    o: { et: 'Soovite sarnast välikööki?', ru: 'Хотите такую же уличную кухню?', en: 'Want an outdoor kitchen like this?' } };
  var cmsData = {}, cmsApi = '', cmsSite = '', cmsBinds = [];
  var featStatic = doc.querySelector('.feat'), featCms = null;
  function cmsSig() { return JSON.stringify([CMS_TXT.map(function (k) { return [ET[k], RU[k], EN[k]]; }), TEL, MAIL, ADDR]); }
  var cmsLast = cmsSig();

  function cmsStr(v, l) {
    if (l && v && typeof v === 'object') v = v[l];
    return typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '';
  }
  function telOf(v) {          // [href digits, shown text] or null
    var d = v.replace(/[^\d+]/g, ''), n = d.replace(/\D/g, '').length;
    return n >= 7 && n <= 15 && /^\+?\d+$/.test(d) ? [d, v] : null;
  }
  function cmsLang() { cmsBinds.forEach(function (fn) { fn(); }); }
  function mk(tag, cls) { var e = doc.createElement(tag); if (cls) e.className = cls; return e; }

  function cmsContacts() {
    var te = telOf(cmsStr(cmsData.telEt)), tr = telOf(cmsStr(cmsData.telRu));
    TEL.et = te && te[1] !== TEL0.et[1] ? te : TEL0.et.slice();
    TEL.ru = tr && tr[1] !== TEL0.ru[1] ? tr : TEL0.ru.slice();
    TEL.en = TEL.ru;
    // WhatsApp: digits with the country code (a local Estonian number gets 372)
    var wa = cmsStr(cmsData.wa), wd = wa.replace(/\D/g, '');
    if (wd && !/^(\+|00)/.test(wa) && wd.length <= 8) wd = '372' + wd;
    if (/^00/.test(wa)) wd = wd.slice(2);
    if (wd.length < 8 || wd.length > 15) wd = WA0;
    waLinks.forEach(function (a) { a.setAttribute('href', 'https://wa.me/' + wd); });
    // e-mail: the links, the address shown in the form's fallback box, and the address the form's ready e-mail goes to
    var m = cmsStr(cmsData.mail);
    if (!/^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(m)) m = MAIL0;
    if (m !== MAIL) {
      Array.prototype.forEach.call(doc.querySelectorAll('a[href^="mailto:"]'), function (a) {
        var hr = a.getAttribute('href');
        if (hr === 'mailto:' + MAIL || hr.indexOf('mailto:' + MAIL + '?') === 0) a.setAttribute('href', 'mailto:' + m + hr.slice(7 + MAIL.length));
        if (a.textContent.trim() === MAIL) a.textContent = m;
      });
      Array.prototype.forEach.call(doc.querySelectorAll('.form__addr'), function (p) { if (p.textContent.trim() === MAIL) p.textContent = m; });
      MAIL = m;
    }
    // address: contact list, footer, map box, Google Maps links and the map's title
    var ad = cmsStr(cmsData.addr) || ADDR0;
    if (ad !== ADDR) {
      var same = ad === ADDR0;
      ['et', 'ru', 'en'].forEach(function (l) {
        (l === 'et' ? ET : DICT[l]).addrFull = same ? ORIG[l].addrFull : ad;
        MSG[l].mapTitle = same ? mapTitle0[l] : mapTitle0[l].replace(ADDR0, ad);
      });
      mapLinks.forEach(function (a, i) {
        a.setAttribute('href', same ? mapHref0[i] : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ad));
        if (!a.hasAttribute('data-t') && a.textContent.trim() === ADDR) a.textContent = ad;
      });
      if (mapAddrEl) mapAddrEl.textContent = ad;
      ADDR = ad;
    }
  }

  // the gallery as the page has it: per kind its tiles and their photo keys (w07 …), and the keys of the «Uusim töö» block
  function keyOf(im) { var m = /(?:^|,)alt:(w\d{2,3})(?:,|$)/.exec(im && im.getAttribute('data-ta') || ''); return m ? m[1] : ''; }
  var STATIC = {}, staticTile = {};
  Object.keys(CATS).forEach(function (c) {
    var panel = doc.getElementById(CATS[c]), grid = panel && panel.querySelector('.grid');
    if (!grid) return;
    var kids = Array.prototype.slice.call(grid.children);
    STATIC[c] = { grid: grid, kids: kids, keys: kids.map(function (li) { var k = keyOf(li.querySelector('img')); if (k) staticTile[k] = li; return k; }) };
  });
  var featKeys = featStatic ? Array.prototype.map.call(featStatic.querySelectorAll('.tile__b img'), keyOf) : [];
  var featEls = featStatic ? { h: featStatic.querySelector('.feat__h'), p: featStatic.querySelector('.feat__p'), ask: featStatic.querySelector('[data-t="featAsk"]') } : null;

  function cmsWorks() {
    var list = Array.isArray(cmsData.works) ? cmsData.works : [], out = [];
    var re = /^\/i\/[a-z0-9][a-z0-9-]{1,40}\/[A-Za-z0-9_-]{16,64}$/;
    list.forEach(function (it) {
      if (!it || typeof it !== 'object') return;
      var dims = String(it.s || '').split(','), keys = String(it.o || '').split(','), ph = [];
      for (var i = 1; i <= 10; i++) {
        var p = it['p' + i];
        if (typeof p !== 'string' || !re.test(p) || p.split('/')[2] !== cmsSite) continue;
        var m = /^(\d{1,5})x(\d{1,5})$/.exec(dims[i - 1] || ''), k = keys[i - 1] || '';
        ph.push({ src: cmsApi + p, w: m ? +m[1] : 1600, h: m ? +m[2] : 1200, key: /^w\d{2,3}$/.test(k) && staticTile[k] ? k : '' });
      }
      if (ph.length) out.push({ c: CATS[it.c] ? it.c : 'k', t: it.t, d: it.d, ph: ph });
    });
    return out;
  }
  function workTitle(w) { return cmsStr(w.t, lang) || GEN[w.c][lang]; }
  function sameKeys(phs, keys) {
    return phs.length === keys.length && phs.every(function (ph, i) { return ph.key && ph.key === keys[i]; });
  }

  // tile sizes in rows of 4 desktop cells: 1 = plain (portrait), 2 = tile--l (landscape), 4 = tile--w (alone in its row).
  // Least changes from each photo's own shape; every row full, so phones (2 columns) get pairs and no hole is left
  function pack(want) {
    var n = want.length, INF = 1e9, best = [], from = [], i, f;
    for (i = 0; i <= n; i++) { best.push([INF, INF, INF, INF]); from.push([null, null, null, null]); }
    best[0][0] = 0;
    for (i = 0; i < n; i++) for (f = 0; f < 4; f++) {
      if (best[i][f] >= INF) continue;
      [want[i], 3 - want[i], 4].forEach(function (s) {
        if (s === 4 ? f !== 0 : f + s > 4) return;
        var nf = (f + s) % 4, c = best[i][f] + (s === want[i] ? 0 : s === 4 ? 3 : 1);
        if (c < best[i + 1][nf]) { best[i + 1][nf] = c; from[i + 1][nf] = [f, s]; }
      });
    }
    var out = [], ff = 0;
    for (i = n; i > 0; i--) { var st = from[i][ff]; out.unshift(st[1]); ff = st[0]; }
    return out;
  }
  // a photo of the old gallery keeps the site's own files (900/1600 px, its crop); a new one comes from the editor's Worker
  function photoImg(ph, sizes) {
    var im;
    if (ph.key) { im = staticTile[ph.key].querySelector('img').cloneNode(false); im.removeAttribute('data-ta'); }
    else { im = mk('img'); im.src = ph.src; im.width = ph.w; im.height = ph.h; }
    im.loading = 'lazy'; im.decoding = 'async'; im.alt = '';
    if (sizes && im.hasAttribute('srcset')) im.setAttribute('sizes', sizes);
    return im;
  }
  function fullOf(ph) { return ph.key ? staticTile[ph.key].querySelector('.tile__b').getAttribute('data-full') : ph.src; }
  function altOf(ph, w) { return ph.key ? t(ph.key) : workTitle(w); }
  function buildFeat(w) {
    var art = mk('article', 'feat feat--cms'), txt = mk('div', 'feat__text');
    var label = mk('p', 'feat__label'), hh = mk('h3', 'feat__h'), p = mk('p', 'feat__p'), ask = mk('p', 'feat__ask'), askT = mk('span'), cta = mk('a', 'btn btn--cta btn--sm');
    hh.id = 'feat-h-cms'; art.setAttribute('aria-labelledby', 'feat-h-cms'); cta.href = '#paring';
    ask.appendChild(askT); ask.appendChild(doc.createTextNode(' ')); ask.appendChild(cta);
    txt.appendChild(label); txt.appendChild(hh); txt.appendChild(p); txt.appendChild(ask);
    var n = w.ph.length, pics = mk('div', 'feat__pics feat__pics--n' + Math.min(n, 3)), imgs = [];
    w.ph.forEach(function (ph, i) {
      var b = mk('button', 'tile__b feat__b' + (i === 0 ? ' feat__b--main' : ''));
      b.type = 'button'; b.setAttribute('data-full', fullOf(ph));
      var im = photoImg(ph, i === 0 ? '(min-width: 960px) 44vw, 100vw' : '(min-width: 960px) 22vw, 50vw'); imgs.push([im, ph]); b.appendChild(im);
      if (i > 2) b.hidden = true;                        // in the lightbox only
      if (i === 2 && n > 3) { b.className += ' feat__b--more'; var more = mk('span', 'feat__more'); more.setAttribute('aria-hidden', 'true'); more.textContent = '+' + (n - 3); b.appendChild(more); }
      pics.appendChild(b);
    });
    art.appendChild(txt); art.appendChild(pics);
    cmsBinds.push(function () {
      var tt = workTitle(w), dd = cmsStr(w.d, lang);
      label.textContent = t('featLabel'); hh.textContent = tt; p.textContent = dd; p.hidden = !dd;
      askT.textContent = w.c === 'k' ? t('featAsk') : ASK[w.c][lang]; cta.textContent = t('cta');
      imgs.forEach(function (x) { x[0].alt = x[1].key ? t(x[1].key) : tt; });
    });
    return art;
  }
  var SIZES = { 1: '(min-width: 960px) 23vw, 50vw', 2: '(min-width: 960px) 46vw, 100vw', 4: '(min-width: 960px) 92vw, 100vw' };
  function tileFor(ph, w, size) {
    var li = mk('li', 'tile' + (size === 2 ? ' tile--l' : size === 4 ? ' tile--w' : '')), b = mk('button', 'tile__b'), im = photoImg(ph, SIZES[size]);
    li.setAttribute('data-cms-tile', '');
    b.type = 'button'; b.setAttribute('data-full', fullOf(ph)); b.appendChild(im); li.appendChild(b);
    cmsBinds.push(function () { im.alt = altOf(ph, w); });
    return li;
  }
  function refreshTabs() {
    var sel = liveTabs.filter(function (x) { return x.getAttribute('aria-selected') === 'true'; })[0];
    liveTabs.length = 0;
    tabs.forEach(function (tab) {
      var empty = !panelOf(tab).querySelector('.tile__b');
      tab.hidden = empty; if (empty) panelOf(tab).hidden = true; else liveTabs.push(tab);
    });
    if (liveTabs.length) selectTab(liveTabs.indexOf(sel) >= 0 ? sel : liveTabs[0]);
    if (tablist) tablist.hidden = liveTabs.length < 2;
  }
  function setGrid(S, nodes) {
    var now = Array.prototype.slice.call(S.grid.children);
    if (now.length === nodes.length && now.every(function (x, i) { return x === nodes[i]; })) return;
    S.grid.textContent = '';
    nodes.forEach(function (x) { S.grid.appendChild(x); });
  }
  function renderWorks() {
    cmsBinds.length = 0;
    if (featCms) { featCms.parentNode.removeChild(featCms); featCms = null; }
    var works = cmsWorks();
    var managed = cmsData.v === 'g1' || works.some(function (w) { return w.ph.some(function (ph) { return ph.key; }); });
    if (!managed) {
      // the old gallery is not in the editor (yet): it stays as it is; the editor's works come first
      Object.keys(STATIC).forEach(function (c) { setGrid(STATIC[c], STATIC[c].kids); });
      if (featStatic) featStatic.hidden = works.length > 0;
      if (!works.length) { refreshTabs(); return; }
      if (featStatic) { featCms = buildFeat(works[0]); featStatic.parentNode.insertBefore(featCms, featStatic); }
      var byCat = {};
      works.slice(1).forEach(function (w) { w.ph.forEach(function (ph) { (byCat[w.c] = byCat[w.c] || []).push({ ph: ph, w: w }); }); });
      Object.keys(byCat).forEach(function (c) {
        if (!STATIC[c]) return;
        var sizes = pack(byCat[c].map(function (x) { return x.ph.w >= x.ph.h * 1.1 ? 2 : 1; }));
        setGrid(STATIC[c], byCat[c].map(function (x, i) { return tileFor(x.ph, x.w, sizes[i]); }).concat(STATIC[c].kids));
      });
      refreshTabs();
      return;
    }
    // the whole gallery is in the editor (24.11 migration): the first work fills «Uusim töö» and closes its tab (as the page
    // has it), the others go into their tab in the list's order. A tab or the block whose photos are exactly the page's own stays
    // the page's own (same tiles, same crops); a changed tab is laid out again in full rows.
    var W0 = works[0] || null;
    if (featStatic) featStatic.hidden = !(W0 && sameKeys(W0.ph, featKeys));
    if (W0 && featStatic && !featStatic.hidden) {
      cmsBinds.push(function () {
        var dd = cmsStr(W0.d, lang);
        featEls.h.textContent = workTitle(W0); featEls.p.textContent = dd; featEls.p.hidden = !dd;
        featEls.ask.textContent = W0.c === 'k' ? t('featAsk') : ASK[W0.c][lang];
      });
    } else if (W0 && featStatic) {
      featCms = buildFeat(W0); featStatic.parentNode.insertBefore(featCms, featStatic);
    }
    Object.keys(STATIC).forEach(function (c) {
      var S = STATIC[c], list = [];
      works.forEach(function (w, i) { if (i > 0 && w.c === c) w.ph.forEach(function (ph) { list.push({ ph: ph, w: w }); }); });
      if (W0 && W0.c === c) W0.ph.forEach(function (ph) { list.push({ ph: ph, w: W0 }); });
      if (sameKeys(list.map(function (x) { return x.ph; }), S.keys)) { setGrid(S, S.kids); return; }
      var sizes = pack(list.map(function (x) { return x.ph.w >= x.ph.h * 1.1 ? 2 : 1; }));
      setGrid(S, list.map(function (x, i) { return tileFor(x.ph, x.w, sizes[i]); }));
    });
    refreshTabs();
  }
  doc.addEventListener('cms:applied', function (e) {
    var s = doc.querySelector('script[data-cms-api]');
    if (!s) return;
    cmsApi = (s.getAttribute('data-cms-api') || '').replace(/\/+$/, '');
    cmsSite = s.getAttribute('data-cms-site') || '';
    var d = e.detail && e.detail.data;
    cmsData = d && typeof d === 'object' && !Array.isArray(d) ? d : {};
    CMS_TXT.forEach(function (k) {
      ['et', 'ru', 'en'].forEach(function (l) { (l === 'et' ? ET : DICT[l])[k] = cmsStr(cmsData[k], l) || ORIG[l][k]; });
    });
    cmsContacts();
    renderWorks();
    // texts or numbers changed (now or before this load): put them in the page; else only the works' words
    var sig = cmsSig();
    if (sig !== cmsLast) { cmsLast = sig; applyLang(lang, false); } else cmsLang();
  });

  /* ---------- start ---------- */
  // old ?lang= links still work and move to the language address; a saved choice applies on / only (a /ru/ or /en/ page keeps its language)
  var start = page, mm = null;
  try {
    mm = /[?&]lang=(et|ru|en)\b/.exec(location.search);
    start = mm ? mm[1] : (page === 'et' ? (localStorage.getItem('semar-lang') || 'et') : page);
  } catch (e) {}
  if (start !== 'ru' && start !== 'en') start = 'et';
  if (start !== page) applyLang(start, false); else root.classList.remove('i18n-wait');
  if (start !== page || mm) setUrl();
})();
