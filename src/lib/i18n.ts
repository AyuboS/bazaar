export type Locale = "lv" | "ru" | "en";

export const LOCALES: Locale[] = ["lv", "ru", "en"];
export const DEFAULT_LOCALE: Locale = "lv";

export type Translations = {
  nav: {
    search_placeholder: string;
    all_latvia: string;
    sign_in: string;
    post_ad: string;
    notifications: string;
    my_listings: string;
    messages: string;
    sign_out: string;
  };
  home: {
    categories_heading: string;
    featured_heading: string;
    recent_heading: string;
    no_listings: string;
    view_all: string;
    listings_count: (n: number) => string;
  };
  browse: {
    all: string;
    search_prefix: string;
    no_results_title: string;
    no_results_for: (q: string) => string;
    try_another: string;
    popular_cats: string;
    all_link: string;
  };
  filter: {
    sort: string;
    city: string;
    price: string;
    photo_only: string;
    clear: string;
    show_results: string;
    filters: string;
    all_cities: string;
    newest: string;
    price_asc: string;
    price_desc: string;
  };
  listing: {
    home: string;
    not_found: string;
    description: string;
    specs: string;
    negotiable: string;
    no_phone: string;
    valid_until: string;
    views: (n: number) => string;
    similar: string;
    login_to_message: string;
    member_since: string;
    seller: string;
    id_label: string;
  };
  auth: {
    sign_in_title: string;
    sign_in_google: string;
    or: string;
    email: string;
    password: string;
    forgot: string;
    no_account: string;
    register: string;
    loading: string;
    error_default: string;
    sign_up_title: string;
    name: string;
    has_account: string;
    sign_in_link: string;
    creating: string;
    min_password: string;
    failed: string;
  };
  lang: { lv: string; ru: string; en: string };
};

const lv: Translations = {
  nav: {
    search_placeholder: "Ko meklē?",
    all_latvia: "Visa Latvija",
    sign_in: "Ieiet",
    post_ad: "Ievietot",
    notifications: "Paziņojumi",
    my_listings: "Mani sludinājumi",
    messages: "Ziņojumi",
    sign_out: "Iziet",
  },
  home: {
    categories_heading: "Pārlūko kategorijas",
    featured_heading: "TOP sludinājumi",
    recent_heading: "Jaunākie sludinājumi",
    no_listings: "Pagaidām nav sludinājumu. Esi pirmais!",
    view_all: "Skatīt visus",
    listings_count: (n) => `${n} sludinājumi`,
  },
  browse: {
    all: "Visi sludinājumi",
    search_prefix: "Meklēšana",
    no_results_title: "Nav atrasts neviens sludinājums",
    no_results_for: (q) => `Nav rezultātu priekš "${q}"`,
    try_another: "Mēģini citu meklēšanas vārdu vai maini filtrus",
    popular_cats: "Populāras kategorijas:",
    all_link: "Visi",
  },
  filter: {
    sort: "Kārtot",
    city: "Pilsēta",
    price: "Cena (€)",
    photo_only: "Tikai ar foto",
    clear: "Notīrīt filtrus",
    show_results: "Rādīt rezultātus",
    filters: "Filtri",
    all_cities: "Visas pilsētas",
    newest: "Jaunākie",
    price_asc: "Cena ↑",
    price_desc: "Cena ↓",
  },
  listing: {
    home: "Sākums",
    not_found: "Sludinājums nav atrasts",
    description: "Apraksts",
    specs: "Raksturojums",
    negotiable: "Cena sarunājama",
    no_phone: "Tālrunis nav norādīts",
    valid_until: "Derīgs līdz",
    views: (n) => `${n} skatījumi`,
    similar: "Līdzīgi sludinājumi",
    login_to_message: "Ienākt, lai sūtītu ziņu",
    member_since: "Dalībnieks kopš",
    seller: "Pārdevējs",
    id_label: "ID",
  },
  auth: {
    sign_in_title: "Ienākt",
    sign_in_google: "Turpināt ar Google",
    or: "vai",
    email: "E-pasts",
    password: "Parole",
    forgot: "Aizmirsi?",
    no_account: "Nav konta?",
    register: "Reģistrēties",
    loading: "Ienāk…",
    error_default: "Nepareizs e-pasts vai parole.",
    sign_up_title: "Izveidot kontu",
    name: "Vārds",
    has_account: "Jau ir konts?",
    sign_in_link: "Ienākt",
    creating: "Reģistrējas…",
    min_password: "Parolei jābūt vismaz 8 simbolus garai.",
    failed: "Reģistrācija neizdevās.",
  },
  lang: { lv: "Latviešu", ru: "Русский", en: "English" },
};

const ru: Translations = {
  nav: {
    search_placeholder: "Что ищешь?",
    all_latvia: "Вся Латвия",
    sign_in: "Войти",
    post_ad: "Разместить",
    notifications: "Уведомления",
    my_listings: "Мои объявления",
    messages: "Сообщения",
    sign_out: "Выйти",
  },
  home: {
    categories_heading: "Просмотр категорий",
    featured_heading: "ТОП объявления",
    recent_heading: "Последние объявления",
    no_listings: "Пока нет объявлений. Будь первым!",
    view_all: "Смотреть все",
    listings_count: (n) => `${n} объявлений`,
  },
  browse: {
    all: "Все объявления",
    search_prefix: "Поиск",
    no_results_title: "Объявления не найдены",
    no_results_for: (q) => `Нет результатов для "${q}"`,
    try_another: "Попробуй другое слово или измени фильтры",
    popular_cats: "Популярные категории:",
    all_link: "Все",
  },
  filter: {
    sort: "Сортировать",
    city: "Город",
    price: "Цена (€)",
    photo_only: "Только с фото",
    clear: "Очистить фильтры",
    show_results: "Показать результаты",
    filters: "Фильтры",
    all_cities: "Все города",
    newest: "Новые",
    price_asc: "Цена ↑",
    price_desc: "Цена ↓",
  },
  listing: {
    home: "Главная",
    not_found: "Объявление не найдено",
    description: "Описание",
    specs: "Характеристики",
    negotiable: "Цена договорная",
    no_phone: "Телефон не указан",
    valid_until: "Действует до",
    views: (n) => `${n} просмотров`,
    similar: "Похожие объявления",
    login_to_message: "Войти, чтобы написать",
    member_since: "Участник с",
    seller: "Продавец",
    id_label: "ID",
  },
  auth: {
    sign_in_title: "Войти",
    sign_in_google: "Продолжить с Google",
    or: "или",
    email: "E-mail",
    password: "Пароль",
    forgot: "Забыли?",
    no_account: "Нет аккаунта?",
    register: "Зарегистрироваться",
    loading: "Входим…",
    error_default: "Неверный e-mail или пароль.",
    sign_up_title: "Создать аккаунт",
    name: "Имя",
    has_account: "Уже есть аккаунт?",
    sign_in_link: "Войти",
    creating: "Регистрируемся…",
    min_password: "Пароль должен быть не менее 8 символов.",
    failed: "Регистрация не удалась.",
  },
  lang: { lv: "Latviešu", ru: "Русский", en: "English" },
};

const en: Translations = {
  nav: {
    search_placeholder: "What are you looking for?",
    all_latvia: "All Latvia",
    sign_in: "Sign in",
    post_ad: "Post Ad",
    notifications: "Notifications",
    my_listings: "My listings",
    messages: "Messages",
    sign_out: "Sign out",
  },
  home: {
    categories_heading: "Browse categories",
    featured_heading: "TOP listings",
    recent_heading: "Latest listings",
    no_listings: "No listings yet. Be the first!",
    view_all: "View all",
    listings_count: (n) => `${n} listings`,
  },
  browse: {
    all: "All listings",
    search_prefix: "Search",
    no_results_title: "No listings found",
    no_results_for: (q) => `No results for "${q}"`,
    try_another: "Try a different search term or change filters",
    popular_cats: "Popular categories:",
    all_link: "All",
  },
  filter: {
    sort: "Sort",
    city: "City",
    price: "Price (€)",
    photo_only: "With photo only",
    clear: "Clear filters",
    show_results: "Show results",
    filters: "Filters",
    all_cities: "All cities",
    newest: "Newest",
    price_asc: "Price ↑",
    price_desc: "Price ↓",
  },
  listing: {
    home: "Home",
    not_found: "Listing not found",
    description: "Description",
    specs: "Specifications",
    negotiable: "Negotiable",
    no_phone: "Phone not provided",
    valid_until: "Valid until",
    views: (n) => `${n} views`,
    similar: "Similar listings",
    login_to_message: "Sign in to send a message",
    member_since: "Member since",
    seller: "Seller",
    id_label: "ID",
  },
  auth: {
    sign_in_title: "Sign in",
    sign_in_google: "Continue with Google",
    or: "or",
    email: "Email",
    password: "Password",
    forgot: "Forgot?",
    no_account: "No account?",
    register: "Register",
    loading: "Signing in…",
    error_default: "Invalid email or password.",
    sign_up_title: "Create account",
    name: "Name",
    has_account: "Already have an account?",
    sign_in_link: "Sign in",
    creating: "Creating account…",
    min_password: "Password must be at least 8 characters.",
    failed: "Registration failed.",
  },
  lang: { lv: "Latviešu", ru: "Русский", en: "English" },
};

const dict: Record<Locale, Translations> = { lv, ru, en };

export function getTranslations(locale: Locale): Translations {
  return dict[locale] ?? lv;
}

export function getCategoryName(
  cat: { nameLv: string; nameRu: string; nameEn: string },
  locale: Locale,
): string {
  if (locale === "ru") return cat.nameRu;
  if (locale === "en") return cat.nameEn;
  return cat.nameLv;
}
