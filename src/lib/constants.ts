export const APP_NAME = "bazaar.lv";
export const APP_URL  = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const LISTINGS_PER_PAGE  = 24;
export const LISTING_EXPIRY_DAYS = 30;

export const CITIES = [
  "Rīga", "Jūrmala", "Liepāja", "Daugavpils",
  "Ventspils", "Jelgava", "Rēzekne", "Valmiera",
] as const;

export type City = (typeof CITIES)[number];

export const RIGA_DISTRICTS = [
  "Centrs", "Āgenskalns", "Imanta", "Mežciems",
  "Purvciems", "Teika", "Pļavnieki", "Ziepniekkalns",
] as const;

export const SORT_OPTIONS = [
  { value: "newest",     label: "Jaunākie"  },
  { value: "price_asc",  label: "Cena ↑"    },
  { value: "price_desc", label: "Cena ↓"    },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const CATEGORY_ICONS: Record<string, string> = {
  "nekustamais-ipasums": "Building2",
  "transports":          "Car",
  "darbs":               "Briefcase",
  "elektronika":         "Smartphone",
  "pakalpojumi":         "Wrench",
  "majai-un-darzam":     "Home",
  "apgerbs-apavi":       "ShoppingBag",
  "dziivnieki":          "PawPrint",
  "bernu-preces":        "Baby",
  "hobiji":              "Gamepad2",
};

export const CURRENCY_SYMBOL: Record<string, string> = {
  EUR: "€",
  USD: "$",
};

export const BOOST_OPTIONS = [
  { days: 7,  priceCents: 200, label: "7 dienas — €2"     },
  { days: 14, priceCents: 350, label: "14 dienas — €3.50"  },
  { days: 30, priceCents: 500, label: "30 dienas — €5"     },
] as const;
