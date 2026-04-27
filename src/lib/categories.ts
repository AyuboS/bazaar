export type ChildCategoryDef = {
  slug: string;
  nameLv: string;
  nameRu: string;
  nameEn: string;
  sort: number;
};

export type CategoryDef = ChildCategoryDef & {
  children: ChildCategoryDef[];
};

export const CATEGORY_TREE: CategoryDef[] = [
  {
    slug: "transports", nameLv: "Transports", nameRu: "Транспорт", nameEn: "Transport", sort: 1,
    children: [
      { slug: "vieglie-auto",        nameLv: "Vieglie auto",               nameRu: "Легковые авто",           nameEn: "Cars",              sort: 1 },
      { slug: "kravas-auto",         nameLv: "Kravas auto",                nameRu: "Грузовые машины",          nameEn: "Trucks",            sort: 2 },
      { slug: "motortransports",     nameLv: "Motortransports",            nameRu: "Мото транспорт",           nameEn: "Motorcycles",       sort: 3 },
      { slug: "velosipedi-skuteri",  nameLv: "Velosipēdi, skūteri",        nameRu: "Велосипеды, самокаты",     nameEn: "Bikes & scooters",  sort: 4 },
      { slug: "auto-maina",          nameLv: "Auto maiņa",                 nameRu: "Обмен авто",               nameEn: "Car exchange",      sort: 5 },
      { slug: "remonts-rezerves",    nameLv: "Remonts un rezerves daļas",  nameRu: "Ремонт и запчасти",        nameEn: "Repair & parts",    sort: 6 },
      { slug: "parvadajumi",         nameLv: "Kravu pārvadājumi",          nameRu: "Перевозка грузов",         nameEn: "Freight",           sort: 7 },
      { slug: "transporta-noma",     nameLv: "Transporta noma",            nameRu: "Аренда транспорта",        nameEn: "Vehicle rental",    sort: 8 },
      { slug: "cits-transports",     nameLv: "Cits transports",            nameRu: "Другое",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "nekustamais-ipasums", nameLv: "Nekustamais īpašums", nameRu: "Недвижимость", nameEn: "Real estate", sort: 2,
    children: [
      { slug: "dzivokli",            nameLv: "Dzīvokļi",                   nameRu: "Квартиры",                 nameEn: "Apartments",        sort: 1 },
      { slug: "majas-vasarnicas",    nameLv: "Mājas, vasarnīcas",          nameRu: "Дома, дачи",               nameEn: "Houses",            sort: 2 },
      { slug: "saimniecibas",        nameLv: "Saimniecības, muižas",       nameRu: "Хутора, поместья",         nameEn: "Farmsteads",        sort: 3 },
      { slug: "telpas",              nameLv: "Telpas, noliktavas",         nameRu: "Помещения",                nameEn: "Premises",          sort: 4 },
      { slug: "biroji",              nameLv: "Biroji",                     nameRu: "Офисы",                    nameEn: "Offices",           sort: 5 },
      { slug: "zeme-gabali",         nameLv: "Zeme un gabali",             nameRu: "Земля и участки",          nameEn: "Land",              sort: 6 },
      { slug: "mezi",                nameLv: "Meži",                       nameRu: "Лес",                      nameEn: "Forest",            sort: 7 },
      { slug: "ni-pakalpojumi",      nameLv: "NĪ pakalpojumi",             nameRu: "Услуги риелтора",          nameEn: "Realtor services",  sort: 8 },
      { slug: "cits-nekustamais",    nameLv: "Cits",                       nameRu: "Другое",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "darbs", nameLv: "Darbs un bizness", nameRu: "Работа и бизнес", nameEn: "Jobs & business", sort: 3,
    children: [
      { slug: "vakances",            nameLv: "Vakances",                   nameRu: "Вакансии",                 nameEn: "Vacancies",         sort: 1 },
      { slug: "mekle-darbu",         nameLv: "Meklē darbu",                nameRu: "Ищут работу",              nameEn: "Job seekers",       sort: 2 },
      { slug: "kursi-izglitiba",     nameLv: "Kursi, izglītība",           nameRu: "Курсы, образование",       nameEn: "Courses",           sort: 3 },
      { slug: "biznesa-kontakti",    nameLv: "Biznesa kontakti",           nameRu: "Деловые контакты",         nameEn: "Business contacts", sort: 4 },
      { slug: "juridiskie-pak",      nameLv: "Juridiskie pakalpojumi",     nameRu: "Юридические услуги",       nameEn: "Legal services",    sort: 5 },
      { slug: "finansu-pak",         nameLv: "Finanšu pakalpojumi",        nameRu: "Финансовые услуги",        nameEn: "Financial",         sort: 6 },
      { slug: "tulkosana",           nameLv: "Tulkošana",                  nameRu: "Переводы",                 nameEn: "Translation",       sort: 7 },
      { slug: "interneta-pak",       nameLv: "Interneta pakalpojumi",      nameRu: "Интернет-услуги",          nameEn: "Internet services", sort: 8 },
      { slug: "cits-darbs",          nameLv: "Cits",                       nameRu: "Разное",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "elektronika", nameLv: "Elektronika", nameRu: "Электроника", nameEn: "Electronics", sort: 4,
    children: [
      { slug: "telefoni-sakari",     nameLv: "Telefoni un sakari",         nameRu: "Телефоны и связь",         nameEn: "Phones",            sort: 1 },
      { slug: "sadzives-tehnika",    nameLv: "Sadzīves tehnika",           nameRu: "Бытовая техника",          nameEn: "Home appliances",   sort: 2 },
      { slug: "datori-biroja",       nameLv: "Datori, biroja tehnika",     nameRu: "Компьютеры, оргтехника",   nameEn: "Computers",         sort: 3 },
      { slug: "audio-video",         nameLv: "Audio, Video, SAT",          nameRu: "Аудио, Видео, SAT",        nameEn: "Audio & video",     sort: 4 },
      { slug: "baterijas",           nameLv: "Baterijas, akumulatori",     nameRu: "Батарейки, аккумуляторы",  nameEn: "Batteries",         sort: 5 },
      { slug: "televizori",          nameLv: "Televizori",                 nameRu: "Телевизоры",               nameEn: "TVs",               sort: 6 },
      { slug: "foto-optika",         nameLv: "Foto un optika",             nameRu: "Фото и оптика",            nameEn: "Photo",             sort: 7 },
      { slug: "gps-navigatori",      nameLv: "GPS navigatori",             nameRu: "GPS навигаторы",           nameEn: "GPS",               sort: 8 },
      { slug: "cita-elektronika",    nameLv: "Cits un remonts",            nameRu: "Разное и ремонт",          nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "majai", nameLv: "Mājai", nameRu: "Для дома", nameEn: "Home", sort: 5,
    children: [
      { slug: "mebeles-interjers",   nameLv: "Mēbeles, interjers",        nameRu: "Мебель, интерьер",         nameEn: "Furniture",         sort: 1 },
      { slug: "veseliba-skaistums",  nameLv: "Veselība, skaistums",       nameRu: "Здоровье, красота",        nameEn: "Health & beauty",   sort: 2 },
      { slug: "rotas-lietas",        nameLv: "Rotaslietas, dārglietas",   nameRu: "Драгоценности",            nameEn: "Jewelry",           sort: 3 },
      { slug: "davanas-suveniri",    nameLv: "Dāvanas, suvenīri",         nameRu: "Подарки, сувениры",        nameEn: "Gifts",             sort: 4 },
      { slug: "rokdarbi",            nameLv: "Rokdarbi",                  nameRu: "Изделия ручной работы",    nameEn: "Handmade",          sort: 5 },
      { slug: "antikvariats",        nameLv: "Antikvariāts, gleznas",     nameRu: "Антиквариат, картины",     nameEn: "Antiques",          sort: 6 },
      { slug: "istabas-augi",        nameLv: "Istabas augi",              nameRu: "Домашние растения",        nameEn: "Plants",            sort: 7 },
      { slug: "meklesana-atradumi",  nameLv: "Meklēšana, atradumi",       nameRu: "Поиски, находки",          nameEn: "Lost & found",      sort: 8 },
      { slug: "cits-majai",          nameLv: "Cits",                      nameRu: "Другое",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "apgerbs-apavi", nameLv: "Apģērbs, apavi", nameRu: "Одежда, обувь", nameEn: "Clothes & shoes", sort: 6,
    children: [
      { slug: "sieviesu-apgerbs",    nameLv: "Sieviešu apģērbs",          nameRu: "Женская одежда",           nameEn: "Women's clothing",  sort: 1 },
      { slug: "viriesu-apgerbs",     nameLv: "Vīriešu apģērbs",           nameRu: "Мужская одежда",           nameEn: "Men's clothing",    sort: 2 },
      { slug: "bernu-apgerbs",       nameLv: "Bērnu apģērbs, apavi",      nameRu: "Детская одежда, обувь",    nameEn: "Kids' clothing",    sort: 3 },
      { slug: "apavi",               nameLv: "Apavi",                     nameRu: "Обувь",                    nameEn: "Footwear",          sort: 4 },
      { slug: "aksesuari-apgerbs",   nameLv: "Pulksteņi, brilles, somas", nameRu: "Часы, очки, сумки",        nameEn: "Accessories",       sort: 5 },
      { slug: "rotas-bizuterija",    nameLv: "Rotaslietas, bižutērija",   nameRu: "Украшения, бижутерия",     nameEn: "Jewelry",           sort: 6 },
      { slug: "specialais-apgerbs",  nameLv: "Speciālais apģērbs",        nameRu: "Спецодежда",               nameEn: "Workwear",          sort: 7 },
      { slug: "susanas-pak",         nameLv: "Šūšanas pakalpojumi",       nameRu: "Услуги швей",              nameEn: "Tailoring",         sort: 8 },
      { slug: "cits-apgerbs",        nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "dzivnieki", nameLv: "Dzīvnieki", nameRu: "Животные", nameEn: "Animals", sort: 7,
    children: [
      { slug: "suni-kuceni",         nameLv: "Suņi, kucēni",              nameRu: "Собаки, щенки",            nameEn: "Dogs",              sort: 1 },
      { slug: "kaki-kateni",         nameLv: "Kaķi, kaķēni",              nameRu: "Кошки, котята",            nameEn: "Cats",              sort: 2 },
      { slug: "grauzezi",            nameLv: "Grauzēji",                  nameRu: "Грызуны",                  nameEn: "Rodents",           sort: 3 },
      { slug: "papagaili-putni",     nameLv: "Papagaiļi un putni",        nameRu: "Попугаи и птицы",          nameEn: "Birds",             sort: 4 },
      { slug: "zivis-akvariji",      nameLv: "Zivis, akvāriji",           nameRu: "Рыбки, аквариумы",         nameEn: "Fish",              sort: 5 },
      { slug: "eksotiskie",          nameLv: "Eksotiskie dzīvnieki",      nameRu: "Экзотические животные",    nameEn: "Exotic",            sort: 6 },
      { slug: "lauks-dzivnieki",     nameLv: "Lauksaimn. dzīvnieki",      nameRu: "Сельхоз животные",         nameEn: "Farm animals",      sort: 7 },
      { slug: "veterinarija",        nameLv: "Veterinārija",              nameRu: "Ветеринария",              nameEn: "Veterinary",        sort: 8 },
      { slug: "citi-dzivnieki",      nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "bernu-preces", nameLv: "Bērniem", nameRu: "Для детей", nameEn: "Kids", sort: 8,
    children: [
      { slug: "viss-skolai",         nameLv: "Viss skolai",               nameRu: "Все для школы",            nameEn: "School",            sort: 1 },
      { slug: "bernu-apgerbs-apavi", nameLv: "Bērnu apģērbs, apavi",      nameRu: "Детская одежда, обувь",    nameEn: "Kids' clothes",     sort: 2 },
      { slug: "rotalietas-supoles",  nameLv: "Rotaļlietas, šūpoles",      nameRu: "Игрушки, качели",          nameEn: "Toys",              sort: 3 },
      { slug: "bernu-rati",          nameLv: "Bērnu rati",                nameRu: "Коляски",                  nameEn: "Strollers",         sort: 4 },
      { slug: "bernu-mebeles",       nameLv: "Bērnu mēbeles",             nameRu: "Детская мебель",           nameEn: "Kids' furniture",   sort: 5 },
      { slug: "autokresli-nesaji",   nameLv: "Autokrēsli, nesēji",        nameRu: "Автокресла, переноски",    nameEn: "Car seats",         sort: 6 },
      { slug: "bariba-aksesuari",    nameLv: "Barošana, aksesuāri",       nameRu: "Аксессуары и питание",     nameEn: "Baby food",         sort: 7 },
      { slug: "pulkini-darzini",     nameLv: "Pulciņi, dārziņi",          nameRu: "Кружки, садики",           nameEn: "Activities",        sort: 8 },
      { slug: "cits-berniem",        nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "lauksaimnieciba", nameLv: "Lauksaimniecība", nameRu: "Сельское хозяйство", nameEn: "Agriculture", sort: 9,
    children: [
      { slug: "lopkopiba",           nameLv: "Lopkopība",                 nameRu: "Животноводство",           nameEn: "Livestock",         sort: 1 },
      { slug: "putnkopiba",          nameLv: "Putnkopība",                nameRu: "Птицеводство",             nameEn: "Poultry",           sort: 2 },
      { slug: "zvejnieciba",         nameLv: "Zvejniecība",               nameRu: "Рыбное хозяйство",         nameEn: "Fishing",           sort: 3 },
      { slug: "lauks-darbi",         nameLv: "Lauksaimniecības darbi",    nameRu: "Сельхозработы",            nameEn: "Farm work",         sort: 4 },
      { slug: "lauks-tehnika",       nameLv: "Lauksaimn. tehnika",        nameRu: "Сельхозтехника",           nameEn: "Farm machinery",    sort: 5 },
      { slug: "darzkopiba",          nameLv: "Dārzkopība",                nameRu: "Садоводство",              nameEn: "Gardening",         sort: 6 },
      { slug: "meslojumi",           nameLv: "Mēslojumi un ķīmija",       nameRu: "Удобрения и химикаты",     nameEn: "Fertilizers",       sort: 7 },
      { slug: "seklas-stadi",        nameLv: "Sēklas un stādi",           nameRu: "Семена и рассада",         nameEn: "Seeds",             sort: 8 },
      { slug: "cits-lauks",          nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 9 },
    ],
  },
  {
    slug: "buvnieciba", nameLv: "Būvniecība", nameRu: "Строительство", nameEn: "Construction", sort: 10,
    children: [
      { slug: "buvmateriali",        nameLv: "Būvmateriāli",              nameRu: "Стройматериалы",           nameEn: "Building materials",sort: 1 },
      { slug: "buvdarbi",            nameLv: "Būvdarbi",                  nameRu: "Строительные работы",      nameEn: "Construction work", sort: 2 },
      { slug: "instruments-tehnika", nameLv: "Instruments un tehnika",    nameRu: "Инструмент и техника",     nameEn: "Tools",             sort: 3 },
      { slug: "instrumentu-noma",    nameLv: "Instrumentu noma",          nameRu: "Аренда инструмента",       nameEn: "Tool rental",       sort: 4 },
      { slug: "santehnika",          nameLv: "Santehnika",                nameRu: "Сантехника",               nameEn: "Plumbing",          sort: 5 },
      { slug: "darz-tehnika",        nameLv: "Dārza tehnika",             nameRu: "Садовая техника",          nameEn: "Garden equipment",  sort: 6 },
      { slug: "projekti-dizains",    nameLv: "Projekti, dizains",         nameRu: "Проекты, дизайн",          nameEn: "Design",            sort: 7 },
      { slug: "cita-buvnieciba",     nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 8 },
    ],
  },
  {
    slug: "razosana", nameLv: "Ražošana", nameRu: "Производство", nameEn: "Production", sort: 11,
    children: [
      { slug: "iekartas",            nameLv: "Iekārtas",                  nameRu: "Оборудование",             nameEn: "Equipment",         sort: 1 },
      { slug: "razosana-pasutij",    nameLv: "Ražošana, pasūtījumi",      nameRu: "Производство, заказы",     nameEn: "Production orders", sort: 2 },
      { slug: "saimniec-darbi",      nameLv: "Saimniecības darbi",        nameRu: "Хозяйственные работы",     nameEn: "Maintenance",       sort: 3 },
      { slug: "malka-briketes",      nameLv: "Malka, briketes, granulas", nameRu: "Дрова, брикеты, гранулы",  nameEn: "Firewood",          sort: 4 },
      { slug: "partikas-preces",     nameLv: "Pārtikas preces",           nameRu: "Продовольствие",           nameEn: "Food products",     sort: 5 },
      { slug: "cita-razosana",       nameLv: "Cits",                      nameRu: "Разное",                   nameEn: "Other",             sort: 6 },
    ],
  },
  {
    slug: "atputa", nameLv: "Atpūta, vaļasprieki", nameRu: "Отдых, увлечения", nameEn: "Leisure", sort: 12,
    children: [
      { slug: "hobiji-valas",        nameLv: "Hobiji, vaļasprieki",       nameRu: "Хобби, увлечения",         nameEn: "Hobbies",           sort: 1 },
      { slug: "kolekcionesana",      nameLv: "Kolekcionēšana",            nameRu: "Коллекционирование",       nameEn: "Collecting",        sort: 2 },
      { slug: "biletes-koncerti",    nameLv: "Biļetes, koncerti",         nameRu: "Билеты, концерты",         nameEn: "Tickets",           sort: 3 },
      { slug: "muzika-instrumenti",  nameLv: "Mūzika, instrumenti",       nameRu: "Музыка, инструменты",      nameEn: "Music",             sort: 4 },
      { slug: "gramatas",            nameLv: "Grāmatas",                  nameRu: "Книги",                    nameEn: "Books",             sort: 5 },
      { slug: "sports-atputa",       nameLv: "Sports, aktīvā atpūta",     nameRu: "Спорт, активный отдых",    nameEn: "Sports",            sort: 6 },
      { slug: "medibas-makskere",    nameLv: "Medības, makšķerēšana",     nameRu: "Охота, рыбалка",           nameEn: "Hunting & fishing", sort: 7 },
      { slug: "turisms",             nameLv: "Tūrisms",                   nameRu: "Туризм",                   nameEn: "Tourism",           sort: 8 },
      { slug: "iepazisanas",         nameLv: "Iepazīšanās",               nameRu: "Знакомства",               nameEn: "Dating",            sort: 9 },
      { slug: "viss-parejais",       nameLv: "Viss pārējais",             nameRu: "Всё остальное",            nameEn: "Everything else",   sort: 10 },
    ],
  },
];
