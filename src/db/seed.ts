import "dotenv/config";
import { db } from "@/db/index";
import { user, categories, listings, type CategorySchema } from "@/db/schema";
import { faker } from "@faker-js/faker";
import { CATEGORY_TREE } from "@/lib/categories";

async function main() {
  console.log("🌱 Seeding maiņa.lv…");

  await db.delete(listings);
  await db.delete(categories);
  await db.delete(user);

  const [demo] = await db.insert(user).values({
    id:            "seed_user_1",
    email:         "demo@maina.lv",
    name:          "Demo Pārdevējs",
    emailVerified: true,
  }).returning();

  // ── Attrs schemas for key subcategories ──────────────────────────────────
  const carAttrs: CategorySchema = {
    fields: [
      { key: "make",         type: "text",   label: "Marka",       required: true },
      { key: "model",        type: "text",   label: "Modelis",     required: true },
      { key: "year",         type: "number", label: "Gads",        required: true },
      { key: "mileage_km",   type: "number", label: "Nobraukums",  unit: "km" },
      { key: "fuel",         type: "select", label: "Degviela", options: [
        { value: "petrol",   label: "Benzīns"   },
        { value: "diesel",   label: "Dīzelis"   },
        { value: "hybrid",   label: "Hibrīds"   },
        { value: "electric", label: "Elektro"   },
        { value: "gas",      label: "Gāze"      },
      ]},
      { key: "transmission", type: "select", label: "Ātrumkārba", options: [
        { value: "manual",    label: "Manuālā"    },
        { value: "automatic", label: "Automātiskā"},
      ]},
    ],
  };

  const aptAttrs: CategorySchema = {
    fields: [
      { key: "rooms",         type: "number", label: "Istabas",     required: true },
      { key: "sqm",           type: "number", label: "Platība",     unit: "m²", required: true },
      { key: "floor",         type: "number", label: "Stāvs" },
      { key: "building_type", type: "select", label: "Mājas tips", options: [
        { value: "brick", label: "Ķieģeļu"        },
        { value: "panel", label: "Lielpaneļu"      },
        { value: "new",   label: "Jaunais projekts" },
        { value: "wood",  label: "Koka"            },
      ]},
    ],
  };

  const houseAttrs: CategorySchema = {
    fields: [
      { key: "rooms",    type: "number", label: "Istabas",     required: true },
      { key: "sqm",      type: "number", label: "Mājas platība", unit: "m²", required: true },
      { key: "floors",   type: "number", label: "Stāvi" },
      { key: "land_sqm", type: "number", label: "Zemes platība", unit: "m²" },
    ],
  };

  const phoneAttrs: CategorySchema = {
    fields: [
      { key: "brand",   type: "text",   label: "Zīmols",  required: true },
      { key: "model",   type: "text",   label: "Modelis", required: true },
      { key: "storage", type: "select", label: "Atmiņa", options: [
        { value: "64",  label: "64 GB"  },
        { value: "128", label: "128 GB" },
        { value: "256", label: "256 GB" },
        { value: "512", label: "512 GB" },
      ]},
    ],
  };

  const computerAttrs: CategorySchema = {
    fields: [
      { key: "type",  type: "select", label: "Veids", options: [
        { value: "laptop",  label: "Klēpjdators" },
        { value: "desktop", label: "Galddators"  },
        { value: "tablet",  label: "Planšete"    },
      ]},
      { key: "brand", type: "text",   label: "Zīmols" },
      { key: "ram",   type: "number", label: "RAM", unit: "GB" },
    ],
  };

  const noAttrs: CategorySchema = { fields: [] };

  const schemaMap: Record<string, CategorySchema> = {
    "vieglie-auto":     carAttrs,
    "kravas-auto":      carAttrs,
    "motortransports":  carAttrs,
    "dzivokli":         aptAttrs,
    "majas-vasarnicas": houseAttrs,
    "telefoni-sakari":  phoneAttrs,
    "datori-biroja":    computerAttrs,
  };

  // ── Insert parents ────────────────────────────────────────────────────────
  const parentRows = await db.insert(categories).values(
    CATEGORY_TREE.map((c) => ({
      slug:        c.slug,
      nameLv:      c.nameLv,
      nameRu:      c.nameRu,
      nameEn:      c.nameEn,
      sort:        c.sort,
      attrsSchema: noAttrs,
    })),
  ).returning();

  const parentBySlug = Object.fromEntries(parentRows.map((r) => [r.slug, r]));

  // ── Insert children ───────────────────────────────────────────────────────
  const childValues = CATEGORY_TREE.flatMap((parent) =>
    parent.children.map((child) => ({
      parentId:    parentBySlug[parent.slug].id,
      slug:        child.slug,
      nameLv:      child.nameLv,
      nameRu:      child.nameRu,
      nameEn:      child.nameEn,
      sort:        child.sort,
      attrsSchema: schemaMap[child.slug] ?? noAttrs,
    })),
  );

  const childRows = await db.insert(categories).values(childValues).returning();
  const childBySlug = Object.fromEntries(childRows.map((r) => [r.slug, r]));

  // ── Seed listings ─────────────────────────────────────────────────────────
  const cities    = ["Rīga", "Jūrmala", "Liepāja", "Daugavpils", "Ventspils", "Jelgava"];
  const districts = ["Centrs", "Purvciems", "Mežciems", "Imanta", "Āgenskalns", "Teika"];
  const carMakes  = ["BMW", "Audi", "Mercedes-Benz", "Volkswagen", "Toyota", "Škoda", "Volvo"];
  const phoneBrands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Google"];

  const rows: typeof listings.$inferInsert[] = [];

  for (const parent of CATEGORY_TREE) {
    for (const child of parent.children.slice(0, 3)) {
      const cat = childBySlug[child.slug];
      if (!cat) continue;

      for (let i = 0; i < 20; i++) {
        const createdAt = faker.date.recent({ days: 30 });
        const expiresAt = new Date(createdAt.getTime() + 30 * 864e5);
        let title = "", priceCents = 0, attrs: Record<string, unknown> = {};

        switch (child.slug) {
          case "vieglie-auto":
          case "kravas-auto":
          case "motortransports": {
            const make = faker.helpers.arrayElement(carMakes);
            const year = faker.number.int({ min: 2005, max: 2024 });
            title = `${make} ${faker.string.alpha({ length: 3, casing: "upper" })}, ${year}`;
            attrs = {
              make, model: faker.vehicle.model(), year,
              mileage_km: faker.number.int({ min: 20_000, max: 300_000 }),
              fuel: faker.helpers.arrayElement(["petrol", "diesel", "hybrid"]),
              transmission: faker.helpers.arrayElement(["manual", "automatic"]),
            };
            priceCents = faker.number.int({ min: 1_000, max: 60_000 }) * 100;
            break;
          }
          case "dzivokli": {
            const rooms = faker.number.int({ min: 1, max: 5 });
            const sqm   = faker.number.int({ min: 25, max: 130 });
            title  = `${rooms}-ist. dz., ${faker.helpers.arrayElement(districts)}, ${sqm} m²`;
            attrs  = { rooms, sqm, floor: faker.number.int({ min: 1, max: 9 }), building_type: faker.helpers.arrayElement(["brick", "panel", "new"]) };
            priceCents = faker.number.int({ min: 30_000, max: 250_000 }) * 100;
            break;
          }
          case "majas-vasarnicas": {
            const rooms = faker.number.int({ min: 3, max: 8 });
            const sqm   = faker.number.int({ min: 80, max: 400 });
            title  = `${rooms}-ist. māja, ${sqm} m², ${faker.helpers.arrayElement(cities)}`;
            attrs  = { rooms, sqm, floors: faker.number.int({ min: 1, max: 3 }), land_sqm: faker.number.int({ min: 400, max: 3000 }) };
            priceCents = faker.number.int({ min: 50_000, max: 500_000 }) * 100;
            break;
          }
          case "telefoni-sakari": {
            const brand = faker.helpers.arrayElement(phoneBrands);
            title  = `${brand} ${faker.string.alpha({ length: 2, casing: "upper" })}${faker.number.int({ min: 10, max: 15 })} Pro`;
            attrs  = { brand, model: title, storage: faker.helpers.arrayElement(["64", "128", "256"]) };
            priceCents = faker.number.int({ min: 100, max: 1400 }) * 100;
            break;
          }
          default: {
            title      = faker.commerce.productName();
            priceCents = faker.number.int({ min: 5, max: 2000 }) * 100;
          }
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
  }

  await db.insert(listings).values(rows);
  console.log(`✓ ${parentRows.length} parent categories, ${childRows.length} subcategories, ${rows.length} listings`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
