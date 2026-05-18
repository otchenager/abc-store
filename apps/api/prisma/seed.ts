import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── БРЕНДЫ ───────────────────────────────────────────────────────────────

  const apple = await prisma.brand.upsert({
    where: { slug: "apple" },
    update: {},
    create: { name: "Apple", slug: "apple" },
  });
  const dji = await prisma.brand.upsert({
    where: { slug: "dji" },
    update: {},
    create: { name: "DJI", slug: "dji" },
  });
  const rayban = await prisma.brand.upsert({
    where: { slug: "ray-ban" },
    update: {},
    create: { name: "Ray-Ban", slug: "ray-ban" },
  });
  const whoop = await prisma.brand.upsert({
    where: { slug: "whoop" },
    update: {},
    create: { name: "WHOOP", slug: "whoop" },
  });
  const plaud = await prisma.brand.upsert({
    where: { slug: "plaud" },
    update: {},
    create: { name: "Plaud", slug: "plaud" },
  });
  const beats = await prisma.brand.upsert({
    where: { slug: "beats" },
    update: {},
    create: { name: "Beats", slug: "beats" },
  });

  // ─── КАТЕГОРИИ ────────────────────────────────────────────────────────────

  const iphones = await prisma.category.upsert({
    where: { slug: "iphone" },
    update: {},
    create: { name: "iPhone", slug: "iphone" },
  });
  const macbooks = await prisma.category.upsert({
    where: { slug: "macbook" },
    update: {},
    create: { name: "MacBook", slug: "macbook" },
  });
  const airpods = await prisma.category.upsert({
    where: { slug: "airpods" },
    update: {},
    create: { name: "AirPods", slug: "airpods" },
  });
  const watches = await prisma.category.upsert({
    where: { slug: "watches" },
    update: {},
    create: { name: "Apple Watch", slug: "watches" },
  });
  const vision = await prisma.category.upsert({
    where: { slug: "vision" },
    update: {},
    create: { name: "Apple Vision", slug: "vision" },
  });
  const dji_cat = await prisma.category.upsert({
    where: { slug: "dji" },
    update: {},
    create: { name: "DJI", slug: "dji" },
  });
  const smartglasses = await prisma.category.upsert({
    where: { slug: "smart-glasses" },
    update: {},
    create: { name: "Умные очки", slug: "smart-glasses" },
  });
  const fitness = await prisma.category.upsert({
    where: { slug: "fitness" },
    update: {},
    create: { name: "Фитнес-трекеры", slug: "fitness" },
  });
  const dictaphones = await prisma.category.upsert({
    where: { slug: "dictaphones" },
    update: {},
    create: { name: "AI-диктофоны", slug: "dictaphones" },
  });
  const headphones = await prisma.category.upsert({
    where: { slug: "headphones" },
    update: {},
    create: { name: "Наушники", slug: "headphones" },
  });

  // ─── ТОВАРЫ ───────────────────────────────────────────────────────────────

  const IMG = {
    // Apple products — null until better image source found
    ip17promax: null, ip17pro: null, ip17: null,
    ip16promax: null, ip16pro: null, ip16: null,
    ip15promax: null, ip15pro: null, ip15: null,
    ip14promax: null, ip14: null,
    mba13m4: null, mba15m4: null, mbp14m4: null, mbp16m4: null,
    ap4: null, appro2: null, apmax: null,
    aws10: null, awultra2: null, visionpro: null, beats: null,
    // Non-Apple — real images
    djimavic4:  "https://abcdemo1.vercel.app/DJI_Mavic_4.png",
    djimini4:   "https://abcdemo1.vercel.app/DJI_Mavic_4.png",
    djiair3s:   "https://abcdemo1.vercel.app/DJI_Mavic_4.png",
    djifallback:"https://abcdemo1.vercel.app/DJI_Mavic_4.png",
    rayban:     "https://abcdemo1.vercel.app/ray-ban.png",
    whoop:      "https://abcdemo1.vercel.app/whoop.png",
    plaud:      "https://abcdemo1.vercel.app/plaude.png",
  };

  const products = [

    // ── iPhone 17 ──────────────────────────────────────────────────────────
    {
      name: "iPhone 17 Pro Max 256GB",
      slug: "iphone-17-pro-max-256",
      description: "Самый мощный iPhone в истории. Чип A18 Pro, камера 48 Мп с 5x зумом, экран Super Retina XDR 6.9\", Titanium Grade 5.",
      price: 119900, oldPrice: 129900, isFeatured: true, isPublished: true,
      imageUrl: IMG.ip17promax, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 17 Pro Max 512GB",
      slug: "iphone-17-pro-max-512",
      description: "iPhone 17 Pro Max с максимальным объёмом памяти. Для тех, кто снимает ProRes 4K 120fps.",
      price: 134900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.ip17promax, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 17 Pro 256GB",
      slug: "iphone-17-pro-256",
      description: "Titanium корпус, чип A18 Pro, Camera Control и Apple Intelligence. Профессиональные возможности в компактном форм-факторе.",
      price: 104900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.ip17pro, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 17 Pro 512GB",
      slug: "iphone-17-pro-512",
      description: "iPhone 17 Pro с 512GB памяти — идеален для фотографов и видеографов.",
      price: 119900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip17pro, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 17 128GB",
      slug: "iphone-17-128",
      description: "Новый iPhone 17 с чипом A18, улучшенной камерой и Apple Intelligence. Тонкий, лёгкий, быстрый.",
      price: 84900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip17, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 17 256GB",
      slug: "iphone-17-256",
      description: "iPhone 17 256GB — оптимальный выбор по соотношению цены и памяти.",
      price: 94900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip17, categoryId: iphones.id, brandId: apple.id,
    },

    // ── iPhone 16 ──────────────────────────────────────────────────────────
    {
      name: "iPhone 16 Pro Max 256GB",
      slug: "iphone-16-pro-max-256",
      description: "Чип A18 Pro, Camera Control, ProRes 4K 120fps. Флагман прошлого поколения по выгодной цене.",
      price: 99900, oldPrice: 109900, isFeatured: true, isPublished: true,
      imageUrl: IMG.ip16promax, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 16 Pro 256GB",
      slug: "iphone-16-pro-256",
      description: "iPhone 16 Pro с чипом A18 Pro и системой камер Pro. Отличный выбор после выхода 17 серии.",
      price: 89900, oldPrice: 99900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip16pro, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 16 128GB",
      slug: "iphone-16-128",
      description: "Базовый iPhone 16 с чипом A18, Action Button и USB-C. Хит продаж в среднем сегменте.",
      price: 74900, oldPrice: 84900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip16, categoryId: iphones.id, brandId: apple.id,
    },

    // ── iPhone 15 ──────────────────────────────────────────────────────────
    {
      name: "iPhone 15 Pro Max 256GB",
      slug: "iphone-15-pro-max-256",
      description: "Titanium корпус, чип A17 Pro, USB-C и Dynamic Island. Отличный выбор по сниженной цене.",
      price: 84900, oldPrice: 99900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip15promax, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 15 Pro 256GB",
      slug: "iphone-15-pro-256",
      description: "Чип A17 Pro, 48 Мп камера, USB 3.0. Профессиональный смартфон со скидкой.",
      price: 74900, oldPrice: 89900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip15pro, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 15 128GB",
      slug: "iphone-15-128",
      description: "Dynamic Island, USB-C и камера 48 Мп. Надёжный выбор с хорошей скидкой.",
      price: 64900, oldPrice: 74900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip15, categoryId: iphones.id, brandId: apple.id,
    },

    // ── iPhone 14 ──────────────────────────────────────────────────────────
    {
      name: "iPhone 14 Pro Max 256GB",
      slug: "iphone-14-pro-max-256",
      description: "Dynamic Island, Always-On дисплей, чип A16 Bionic. Лучшее соотношение цены и возможностей.",
      price: 69900, oldPrice: 84900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip14promax, categoryId: iphones.id, brandId: apple.id,
    },
    {
      name: "iPhone 14 128GB",
      slug: "iphone-14-128",
      description: "Надёжный iPhone с чипом A15 Bionic и отличной камерой. Бюджетный вход в экосистему Apple.",
      price: 54900, oldPrice: 64900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ip14, categoryId: iphones.id, brandId: apple.id,
    },

    // ── MacBook ────────────────────────────────────────────────────────────
    {
      name: "MacBook Air 13\" M4 16GB/256GB",
      slug: "macbook-air-13-m4-256",
      description: "Самый тонкий MacBook с чипом M4. До 18 часов автономной работы, дисплей Liquid Retina.",
      price: 109900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.mba13m4, categoryId: macbooks.id, brandId: apple.id,
    },
    {
      name: "MacBook Air 13\" M4 16GB/512GB",
      slug: "macbook-air-13-m4-512",
      description: "MacBook Air M4 с удвоенным хранилищем — для тех, кто хранит много файлов и проектов.",
      price: 124900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.mba13m4, categoryId: macbooks.id, brandId: apple.id,
    },
    {
      name: "MacBook Air 15\" M4 16GB/512GB",
      slug: "macbook-air-15-m4-512",
      description: "Большой экран 15.3\" Liquid Retina и чип M4. Идеален для работы и развлечений.",
      price: 139900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.mba15m4, categoryId: macbooks.id, brandId: apple.id,
    },
    {
      name: "MacBook Pro 14\" M4 24GB/512GB",
      slug: "macbook-pro-14-m4-512",
      description: "Профессиональный MacBook с чипом M4, дисплеем Liquid Retina XDR и MagSafe 3.",
      price: 179900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.mbp14m4, categoryId: macbooks.id, brandId: apple.id,
    },
    {
      name: "MacBook Pro 14\" M4 Pro 24GB/512GB",
      slug: "macbook-pro-14-m4-pro-512",
      description: "Чип M4 Pro с 14-ядерным CPU. Для профессиональной работы с видео, 3D и кодом.",
      price: 219900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.mbp14m4, categoryId: macbooks.id, brandId: apple.id,
    },
    {
      name: "MacBook Pro 16\" M4 Pro 24GB/512GB",
      slug: "macbook-pro-16-m4-pro-512",
      description: "Максимальная производительность в классе. Экран 16.2\", M4 Pro, до 24 часов работы.",
      price: 259900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.mbp16m4, categoryId: macbooks.id, brandId: apple.id,
    },

    // ── AirPods ────────────────────────────────────────────────────────────
    {
      name: "AirPods 4",
      slug: "airpods-4",
      description: "Новый дизайн, чип H2, персонализированный пространственный звук. Лучшие базовые AirPods.",
      price: 14900, oldPrice: 17900, isFeatured: false, isPublished: true,
      imageUrl: IMG.ap4, categoryId: airpods.id, brandId: apple.id,
    },
    {
      name: "AirPods 4 ANC",
      slug: "airpods-4-anc",
      description: "AirPods 4 с активным шумоподавлением. Прозрачный режим и адаптивный звук.",
      price: 18900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.ap4, categoryId: airpods.id, brandId: apple.id,
    },
    {
      name: "AirPods Pro 2 (USB-C)",
      slug: "airpods-pro-2-usb-c",
      description: "Лучшее шумоподавление в классе. Адаптивный звук, Conversation Awareness, H2 чип.",
      price: 22900, oldPrice: 26900, isFeatured: true, isPublished: true,
      imageUrl: IMG.appro2, categoryId: airpods.id, brandId: apple.id,
    },
    {
      name: "AirPods Max (USB-C)",
      slug: "airpods-max-usb-c",
      description: "Накладные наушники премиум-класса с Hi-Fi звуком, ANC и пространственным аудио.",
      price: 59900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.apmax, categoryId: airpods.id, brandId: apple.id,
    },

    // ── Apple Watch ────────────────────────────────────────────────────────
    {
      name: "Apple Watch Series 10",
      slug: "apple-watch-series-10",
      description: "Самые тонкие Apple Watch в истории. Большой дисплей, датчик сна с апноэ, быстрая зарядка.",
      price: 39900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.aws10, categoryId: watches.id, brandId: apple.id,
    },
    {
      name: "Apple Watch Ultra 2",
      slug: "apple-watch-ultra-2",
      description: "Титановый корпус, экстремальная точность GPS, 60 часов автономности. Для тех, кто не останавливается.",
      price: 89900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.awultra2, categoryId: watches.id, brandId: apple.id,
    },

    // ── Apple Vision Pro ───────────────────────────────────────────────────
    {
      name: "Apple Vision Pro 256GB",
      slug: "apple-vision-pro-256",
      description: "Первый пространственный компьютер в истории. visionOS, чип M2 + R1, дисплей micro-OLED 4K на каждый глаз.",
      price: 299900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.visionpro, categoryId: vision.id, brandId: apple.id,
    },

    // ── DJI ────────────────────────────────────────────────────────────────
    {
      name: "DJI Mavic 4 Pro",
      slug: "dji-mavic-4-pro",
      description: "Флагманский дрон с камерой Hasselblad 100 Мп, 3 объектива, 45 минут полёта. Для профессиональной аэросъёмки.",
      price: 149900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.djimavic4, categoryId: dji_cat.id, brandId: dji.id,
    },
    {
      name: "DJI Mini 4 Pro",
      slug: "dji-mini-4-pro",
      description: "Лёгкий дрон до 249г с 4K HDR видео и omnidirectional obstacle sensing. Не требует регистрации.",
      price: 79900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.djimini4, categoryId: dji_cat.id, brandId: dji.id,
    },
    {
      name: "DJI Air 3S",
      slug: "dji-air-3s",
      description: "Главная камера 1\" CMOS, 4K 60fps, 46 минут полёта. Идеальный баланс между качеством и ценой.",
      price: 99900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.djiair3s, categoryId: dji_cat.id, brandId: dji.id,
    },
    {
      name: "DJI Osmo Pocket 3",
      slug: "dji-osmo-pocket-3",
      description: "Карманная камера с 3-осевым стабилизатором, сенсором 1\" и OLED дисплеем. Видео как у кинематографа.",
      price: 49900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.djifallback, categoryId: dji_cat.id, brandId: dji.id,
    },
    {
      name: "DJI Osmo Mobile 7 Pro",
      slug: "dji-osmo-mobile-7-pro",
      description: "Стабилизатор для смартфона с ActiveTrack 7.0 и встроенной подсветкой. Съёмка без тряски.",
      price: 19900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.djifallback, categoryId: dji_cat.id, brandId: dji.id,
    },
    {
      name: "DJI Goggles 3",
      slug: "dji-goggles-3",
      description: "FPV-очки для дронов DJI с Micro-OLED дисплеями 1080p, задержкой 13 мс и до 3 часов работы.",
      price: 59900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.djifallback, categoryId: dji_cat.id, brandId: dji.id,
    },

    // ── Ray-Ban Meta ───────────────────────────────────────────────────────
    {
      name: "Ray-Ban Meta Wayfarer",
      slug: "ray-ban-meta-wayfarer",
      description: "Умные очки с AI-ассистентом, встроенной камерой 12 Мп и открытыми динамиками. Классический дизайн Wayfarer.",
      price: 29900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.rayban, categoryId: smartglasses.id, brandId: rayban.id,
    },
    {
      name: "Ray-Ban Meta Skyler",
      slug: "ray-ban-meta-skyler",
      description: "Женская модель умных очков Ray-Ban Meta. Съёмка фото/видео, музыка и голосовой AI.",
      price: 31900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.rayban, categoryId: smartglasses.id, brandId: rayban.id,
    },
    {
      name: "Ray-Ban Meta Headliner",
      slug: "ray-ban-meta-headliner",
      description: "Крупная овальная оправа с полным набором функций Meta AI. Самая заметная модель коллекции.",
      price: 34900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.rayban, categoryId: smartglasses.id, brandId: rayban.id,
    },

    // ── WHOOP ──────────────────────────────────────────────────────────────
    {
      name: "WHOOP 5.0 (подписка 12 мес.)",
      slug: "whoop-5-12m",
      description: "Биометрический трекер без дисплея. Мониторинг ЧСС, HRV, стресса, сна и восстановления 24/7. Носится на запястье.",
      price: 39900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.whoop, categoryId: fitness.id, brandId: whoop.id,
    },
    {
      name: "WHOOP 5.0 (подписка 6 мес.)",
      slug: "whoop-5-6m",
      description: "WHOOP 5.0 с подпиской на 6 месяцев. Идеально для тех, кто хочет попробовать.",
      price: 24900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.whoop, categoryId: fitness.id, brandId: whoop.id,
    },

    // ── Plaud ──────────────────────────────────────────────────────────────
    {
      name: "Plaud Note (MagSafe)",
      slug: "plaud-note-magsafe",
      description: "AI-диктофон на MagSafe. Запись 30 часов, транскрипция в реальном времени на 59 языках, саммари встреч.",
      price: 19900, oldPrice: null, isFeatured: true, isPublished: true,
      imageUrl: IMG.plaud, categoryId: dictaphones.id, brandId: plaud.id,
    },
    {
      name: "Plaud NotePin",
      slug: "plaud-notepin",
      description: "Миниатюрный AI-диктофон в форме значка. Носится на одежде, записывает переговоры, лекции и идеи.",
      price: 14900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.plaud, categoryId: dictaphones.id, brandId: plaud.id,
    },

    // ── Beats ──────────────────────────────────────────────────────────────
    {
      name: "Beats Studio Pro",
      slug: "beats-studio-pro",
      description: "Профессиональные наушники с ANC, прозрачным режимом и USB-C. Совместимы с Android и iOS. Отличная маржа.",
      price: 29900, oldPrice: null, isFeatured: false, isPublished: true,
      imageUrl: IMG.beats, categoryId: headphones.id, brandId: beats.id,
    },
  ];

  // Вставляем товары
  let created = 0;
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
        isFeatured: product.isFeatured,
        imageUrl: product.imageUrl,
      },
      create: product,
    });
    created++;
    process.stdout.write(`\r  ✓ ${created}/${products.length} товаров`);
  }

  console.log(`\n\n✅ Готово! Добавлено ${products.length} товаров:`);
  console.log(`   📱 iPhone — 14 моделей`);
  console.log(`   💻 MacBook — 6 моделей`);
  console.log(`   🎧 AirPods — 4 модели`);
  console.log(`   ⌚ Apple Watch — 2 модели`);
  console.log(`   🥽 Apple Vision Pro — 1 модель`);
  console.log(`   🚁 DJI — 6 моделей`);
  console.log(`   🕶️  Ray-Ban Meta — 3 модели`);
  console.log(`   💚 WHOOP — 2 модели`);
  console.log(`   🎙️  Plaud — 2 модели`);
  console.log(`   🎵 Beats — 1 модель`);
}

main()
  .catch((e) => {
    console.error("❌ Ошибка:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });