import "dotenv/config";
import { db } from "@/db/index";
import { user, categories, listings, type CategorySchema } from "@/db/schema";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("🌱 Seeding bazaar.lv…");

  await db.delete(listings);
  await db.delete(categories);
  await db.delete(user);

  const [demo] = await db.insert(user).values({
    id:            "seed_user_1",
    email:         "demo@bazaar.lv",
    name:          "Demo Pārdevējs",
    emailVerified: true,
  }).returning();

  const cats = await db.insert(categories).values([
    {
      slug: "nekustamais-ipasums", sort: 1,
      nameLv: "Nekustamais īpašums", nameRu: "Недвижимость", nameEn: "Real estate",
      attrsSchema: {
        fields: [
          { key: "rooms",         type: "number", label: "Istabas",    required: true },
          { key: "sqm",           type: "number", label: "Platība",    unit: "m²", required: true },
          { key: "floor",         type: "number", label: "Stāvs" },
          { key: "building_type", type: "select", label: "Mājas tips", options: [
            { value: "brick", label: "Ķieģeļu"       },
            { value: "panel", label: "Lielpaneļu"     },
            { value: "new",   label: "Jaunais projekts"},
            { value: "wood",  label: "Koka"           },
          ]},
        ],
      } satisfies CategorySchema,
    },
    {
      slug: "transports", sort: 2,
      nameLv: "Transports", nameRu: "Транспорт", nameEn: "Transport",
      attrsSchema: {
        fields: [
          { key: "make",         type: "text",   label: "Marka",       required: true },
          { key: "model",        type: "text",   label: "Modelis",     required: true },
          { key: "year",         type: "number", label: "Gads",        required: true },
          { key: "mileage_km",   type: "number", label: "Nobraukums",  unit: "km" },
          { key: "fuel",         type: "select", label: "Degviela",    options: [
            { value: "petrol",   label: "Benzīns"  },
            { value: "diesel",   label: "Dīzelis"  },
            { value: "hybrid",   label: "Hibrīds"  },
            { value: "electric", label: "Elektro"  },
          ]},
          { key: "transmission", type: "select", label: "Ātrumkārba", options: [
            { value: "manual",    label: "Manuālā"    },
            { value: "automatic", label: "Automātiskā"},
          ]},
        ],
      } satisfies CategorySchema,
    },
    { slug: "darbs",       sort: 3, nameLv: "Darbs",       nameRu: "Работа",      nameEn: "Jobs",        attrsSchema: { fields: [] } },
    { slug: "elektronika", sort: 4, nameLv: "Elektronika", nameRu: "Электроника", nameEn: "Electronics", attrsSchema: { fields: [] } },
    { slug: "pakalpojumi", sort: 5, nameLv: "Pakalpojumi", nameRu: "Услуги",      nameEn: "Services",    attrsSchema: { fields: [] } },
  ]).returning();

  const cities    = ["Rīga", "Jūrmala", "Liepāja", "Daugavpils", "Ventspils", "Jelgava"];
  const districts = ["Centrs", "Purvciems", "Mežciems", "Imanta", "Āgenskalns", "Teika"];
  const carMakes  = ["BMW", "Audi", "Mercedes-Benz", "Volkswagen", "Toyota", "Škoda", "Volvo"];

  const rows: typeof listings.$inferInsert[] = [];

  for (const cat of cats) {
    for (let i = 0; i < 60; i++) {
      const createdAt  = faker.date.recent({ days: 30 });
      const expiresAt  = new Date(createdAt.getTime() + 30 * 864e5);
      let title = "", priceCents = 0, attrs: Record<string, unknown> = {};

      if (cat.slug === "nekustamais-ipasums") {
        const rooms = faker.number.int({ min: 1, max: 5 });
        const sqm   = faker.number.int({ min: 25, max: 150 });
        title  = `${rooms}-ist. dz., ${faker.helpers.arrayElement(districts)}, ${sqm} m²`;
        attrs  = { rooms, sqm, floor: faker.number.int({ min: 1, max: 9 }),
                   building_type: faker.helpers.arrayElement(["brick", "panel", "new"]) };
        priceCents = faker.number.int({ min: 30_000, max: 250_000 }) * 100;
      } else if (cat.slug === "transports") {
        const make = faker.helpers.arrayElement(carMakes);
        const year = faker.number.int({ min: 2005, max: 2024 });
        title  = `${make} ${faker.string.alpha({ length: 3, casing: "upper" })}, ${year}`;
        attrs  = { make, model: faker.vehicle.model(), year,
                   mileage_km: faker.number.int({ min: 50_000, max: 300_000 }),
                   fuel: faker.helpers.arrayElement(["petrol", "diesel", "hybrid"]),
                   transmission: faker.helpers.arrayElement(["manual", "automatic"]) };
        priceCents = faker.number.int({ min: 2_000, max: 45_000 }) * 100;
      } else {
        title      = faker.commerce.productName();
        priceCents = faker.number.int({ min: 10, max: 2_000 }) * 100;
      }

      rows.push({
        userId: demo.id, categoryId: cat.id,
        title, description: faker.lorem.paragraphs(2),
        priceCents, city: faker.helpers.arrayElement(cities),
        district: faker.helpers.arrayElement(districts),
        images: [], attrs, status: "active",
        createdAt, updatedAt: createdAt, expiresAt,
      });
    }
  }

  await db.insert(listings).values(rows);
  console.log(`✓ ${cats.length} categories, ${rows.length} listings`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
