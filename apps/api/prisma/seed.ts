  import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── СПЕЦИФИКАЦИИ ─────────────────────────────────────────────────────────────

type Spec = { icon: string; label: string; value: string };
const s = (items: Spec[]) => JSON.stringify(items);

const SPEC = {
  // ── iPhones 17 ──────────────────────────────────────────────────────────────
  ip17pmax: s([
    { icon: "⚡", label: "Чип",      value: "A18 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 5× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 33 часов" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.9\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip17pro: s([
    { icon: "⚡", label: "Чип",      value: "A18 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 5× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 27 часов" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.3\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip17: s([
    { icon: "⚡", label: "Чип",      value: "A18" },
    { icon: "📸", label: "Камера",   value: "48 Мп" },
    { icon: "🔋", label: "Батарея",  value: "До 22 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.1\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Aluminium, IP68" },
  ]),
  // ── iPhones 16 ──────────────────────────────────────────────────────────────
  ip16pmax: s([
    { icon: "⚡", label: "Чип",      value: "A18 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 5× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 33 часов" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.9\" ProMotion 120Гц" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip16pro: s([
    { icon: "⚡", label: "Чип",      value: "A18 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 5× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 27 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.3\" ProMotion 120Гц" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip16: s([
    { icon: "⚡", label: "Чип",      value: "A18" },
    { icon: "📸", label: "Камера",   value: "48 Мп" },
    { icon: "🔋", label: "Батарея",  value: "До 22 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.1\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Aluminium, IP68" },
  ]),
  // ── iPhones 15 ──────────────────────────────────────────────────────────────
  ip15pmax: s([
    { icon: "⚡", label: "Чип",      value: "A17 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 5× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 29 часов" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.7\" ProMotion 120Гц" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip15pro: s([
    { icon: "⚡", label: "Чип",      value: "A17 Pro" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 3× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 23 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.1\" ProMotion 120Гц" },
    { icon: "🛡️", label: "Защита",  value: "Titanium, IP68" },
  ]),
  ip15: s([
    { icon: "⚡", label: "Чип",      value: "A16 Bionic" },
    { icon: "📸", label: "Камера",   value: "48 Мп" },
    { icon: "🔋", label: "Батарея",  value: "До 20 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.1\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Aluminium, IP68" },
  ]),
  // ── iPhones 14 ──────────────────────────────────────────────────────────────
  ip14pmax: s([
    { icon: "⚡", label: "Чип",      value: "A16 Bionic" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 3× зум" },
    { icon: "🔋", label: "Батарея",  value: "До 29 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.7\" ProMotion 120Гц" },
    { icon: "🛡️", label: "Защита",  value: "Steel, IP68" },
  ]),
  ip14: s([
    { icon: "⚡", label: "Чип",      value: "A15 Bionic" },
    { icon: "📸", label: "Камера",   value: "12 Мп" },
    { icon: "🔋", label: "Батарея",  value: "До 20 часов" },
    { icon: "💾", label: "Память",   value: "128 / 256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.1\" Super Retina XDR" },
    { icon: "🛡️", label: "Защита",  value: "Aluminium, IP67" },
  ]),
  // ── MacBooks ─────────────────────────────────────────────────────────────────
  mba13_256: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4" },
    { icon: "💾", label: "Память",   value: "16GB / 256GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 18 часов" },
    { icon: "📱", label: "Экран",    value: "13.6\" Liquid Retina" },
    { icon: "⚖️", label: "Вес",     value: "1.24 кг" },
    { icon: "🔌", label: "Порты",   value: "2× USB-C, MagSafe 3" },
  ]),
  mba13_512: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4" },
    { icon: "💾", label: "Память",   value: "16GB / 512GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 18 часов" },
    { icon: "📱", label: "Экран",    value: "13.6\" Liquid Retina" },
    { icon: "⚖️", label: "Вес",     value: "1.24 кг" },
    { icon: "🔌", label: "Порты",   value: "2× USB-C, MagSafe 3" },
  ]),
  mba15: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4" },
    { icon: "💾", label: "Память",   value: "16GB / 512GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 18 часов" },
    { icon: "📱", label: "Экран",    value: "15.3\" Liquid Retina" },
    { icon: "⚖️", label: "Вес",     value: "1.51 кг" },
    { icon: "🔌", label: "Порты",   value: "2× USB-C, MagSafe 3" },
  ]),
  mbp14: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4" },
    { icon: "💾", label: "Память",   value: "24GB / 512GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 24 часов" },
    { icon: "📱", label: "Экран",    value: "14.2\" Liquid Retina XDR" },
    { icon: "⚖️", label: "Вес",     value: "1.55 кг" },
    { icon: "🔌", label: "Порты",   value: "3× USB-C, HDMI, SD, MagSafe" },
  ]),
  mbp14pro: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4 Pro" },
    { icon: "💾", label: "Память",   value: "24GB / 512GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 24 часов" },
    { icon: "📱", label: "Экран",    value: "14.2\" Liquid Retina XDR" },
    { icon: "⚖️", label: "Вес",     value: "1.62 кг" },
    { icon: "🔌", label: "Порты",   value: "3× USB-C, HDMI, SD, MagSafe" },
  ]),
  mbp16: s([
    { icon: "⚡", label: "Чип",      value: "Apple M4 Pro" },
    { icon: "💾", label: "Память",   value: "24GB / 512GB SSD" },
    { icon: "🔋", label: "Батарея",  value: "До 24 часов" },
    { icon: "📱", label: "Экран",    value: "16.2\" Liquid Retina XDR" },
    { icon: "⚖️", label: "Вес",     value: "2.14 кг" },
    { icon: "🔌", label: "Порты",   value: "3× USB-C, HDMI, SD, MagSafe" },
  ]),
  // ── AirPods ──────────────────────────────────────────────────────────────────
  ap4: s([
    { icon: "🎵", label: "Звук",     value: "Пространственный" },
    { icon: "⚡", label: "Чип",      value: "H2" },
    { icon: "🔋", label: "Батарея",  value: "До 30 ч с кейсом" },
    { icon: "🎙️", label: "Микрофон", value: "Адаптивный" },
  ]),
  ap4anc: s([
    { icon: "🎵", label: "Звук",     value: "Пространственный" },
    { icon: "🔇", label: "Шум",      value: "Активное ANC" },
    { icon: "⚡", label: "Чип",      value: "H2" },
    { icon: "🔋", label: "Батарея",  value: "До 30 ч с кейсом" },
  ]),
  appro2: s([
    { icon: "🎵", label: "Звук",     value: "Пространственный" },
    { icon: "🔇", label: "Шум",      value: "Лучшее ANC в классе" },
    { icon: "⚡", label: "Чип",      value: "H2" },
    { icon: "🔋", label: "Батарея",  value: "До 30 ч с кейсом" },
    { icon: "💧", label: "Защита",   value: "IP54" },
  ]),
  apmax: s([
    { icon: "🎵", label: "Звук",     value: "Hi-Fi, 40мм динамик" },
    { icon: "🔇", label: "Шум",      value: "Адаптивное ANC" },
    { icon: "⚡", label: "Чип",      value: "H2" },
    { icon: "🔋", label: "Батарея",  value: "До 30 часов" },
    { icon: "📱", label: "Bluetooth", value: "BT 5.3" },
  ]),
  // ── Apple Watch ───────────────────────────────────────────────────────────────
  aws10: s([
    { icon: "📱", label: "Экран",     value: "46мм / 42мм OLED" },
    { icon: "❤️", label: "Здоровье", value: "ЧСС, ЭКГ, O2" },
    { icon: "🔋", label: "Батарея",  value: "До 18 часов" },
    { icon: "💧", label: "Защита",   value: "WR50, IP6X" },
    { icon: "⚡", label: "Зарядка",  value: "Быстрая, 80% за 30 мин" },
  ]),
  awultra2: s([
    { icon: "📱", label: "Экран",     value: "49мм LTPO OLED" },
    { icon: "❤️", label: "Здоровье", value: "ЧСС, ЭКГ, O2, Температура" },
    { icon: "🔋", label: "Батарея",  value: "До 60 часов" },
    { icon: "💧", label: "Защита",   value: "100м, MIL-STD-810H" },
    { icon: "🗺️", label: "GPS",     value: "Двухдиапазонный L1+L5" },
    { icon: "🔩", label: "Корпус",   value: "Titanium Grade 5" },
  ]),
  // ── Apple Vision Pro ──────────────────────────────────────────────────────────
  visionpro: s([
    { icon: "⚡", label: "Чип",        value: "M2 + R1" },
    { icon: "👁️", label: "Дисплей",  value: "Micro-OLED 4K на глаз" },
    { icon: "🎮", label: "Управление", value: "Глаза, руки, голос" },
    { icon: "🔋", label: "Батарея",   value: "До 2 часов" },
    { icon: "📦", label: "Хранилище", value: "256GB / 512GB / 1TB" },
  ]),
  // ── Samsung ───────────────────────────────────────────────────────────────────
  s26ultra: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite Gen 5" },
    { icon: "📸", label: "Камера",   value: "200 Мп, тройная" },
    { icon: "🔋", label: "Батарея",  value: "5000 мАч, 65Вт" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
    { icon: "📱", label: "Экран",    value: "6.9\" Dynamic AMOLED 120Гц" },
    { icon: "✏️", label: "S Pen",   value: "Встроенный" },
  ]),
  s26plus: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite Gen 5" },
    { icon: "📸", label: "Камера",   value: "50 Мп тройная" },
    { icon: "🔋", label: "Батарея",  value: "4900 мАч, 45Вт" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.7\" Dynamic AMOLED 120Гц" },
  ]),
  s26: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite Gen 5" },
    { icon: "📸", label: "Камера",   value: "50 Мп тройная" },
    { icon: "🔋", label: "Батарея",  value: "4000 мАч, 25Вт" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB" },
    { icon: "📱", label: "Экран",    value: "6.2\" Dynamic AMOLED 120Гц" },
  ]),
  s25edge: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite" },
    { icon: "📸", label: "Камера",   value: "200 Мп основная" },
    { icon: "🔋", label: "Батарея",  value: "3900 мАч" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB" },
    { icon: "📏", label: "Толщина",  value: "5.8мм — рекорд" },
    { icon: "🔩", label: "Корпус",   value: "Titanium, IP68" },
  ]),
  zfold7: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite" },
    { icon: "📱", label: "Экран",    value: "7.6\" внутр., 6.3\" внешн." },
    { icon: "📸", label: "Камера",   value: "200 Мп тройная" },
    { icon: "🔋", label: "Батарея",  value: "4400 мАч, 25Вт" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB / 1TB" },
  ]),
  zflip7: s([
    { icon: "⚡", label: "Чип",      value: "Snapdragon 8 Elite" },
    { icon: "📱", label: "Экран",    value: "6.7\" + внешний 3.4\"" },
    { icon: "📸", label: "Камера",   value: "50 Мп двойная" },
    { icon: "🔋", label: "Батарея",  value: "4000 мАч, 25Вт" },
    { icon: "💾", label: "Память",   value: "256 / 512 GB" },
  ]),
  // ── Gaming ────────────────────────────────────────────────────────────────────
  ps5pro: s([
    { icon: "⚡", label: "Процессор", value: "AMD Zen 2, 3.85 ГГц" },
    { icon: "🎮", label: "Графика",  value: "AMD RDNA, 4K 120fps" },
    { icon: "💾", label: "SSD",      value: "2TB NVMe" },
    { icon: "📀", label: "Привод",   value: "Ultra HD Blu-ray" },
    { icon: "🎯", label: "Геймпад",  value: "DualSense Wireless" },
  ]),
  ps5slim: s([
    { icon: "⚡", label: "Процессор", value: "AMD Zen 2, 3.5 ГГц" },
    { icon: "🎮", label: "Графика",  value: "AMD RDNA 2, 4K HDR" },
    { icon: "💾", label: "SSD",      value: "1TB NVMe" },
    { icon: "📀", label: "Привод",   value: "Ultra HD Blu-ray" },
    { icon: "🎯", label: "Геймпад",  value: "DualSense Wireless" },
  ]),
  xseriesx: s([
    { icon: "⚡", label: "Процессор", value: "AMD Zen 2, 3.8 ГГц" },
    { icon: "🎮", label: "Графика",  value: "12 TFLOPS, 4K 120fps" },
    { icon: "💾", label: "SSD",      value: "1TB NVMe" },
    { icon: "🎯", label: "Геймпад",  value: "Xbox Wireless Controller" },
    { icon: "☁️", label: "Game Pass", value: "Совместим" },
  ]),
  xseriess: s([
    { icon: "⚡", label: "Процессор", value: "AMD Zen 2, 3.6 ГГц" },
    { icon: "🎮", label: "Графика",  value: "4 TFLOPS, 1440p 120fps" },
    { icon: "💾", label: "SSD",      value: "512GB NVMe" },
    { icon: "🎯", label: "Геймпад",  value: "Xbox Wireless Controller" },
    { icon: "☁️", label: "Game Pass", value: "Совместим" },
  ]),
  // ── DJI дроны ─────────────────────────────────────────────────────────────────
  mavic4: s([
    { icon: "📸", label: "Камера",   value: "Hasselblad 100 Мп" },
    { icon: "🚁", label: "Дальность", value: "До 20 км" },
    { icon: "⏱️", label: "Полёт",   value: "До 45 минут" },
    { icon: "🎬", label: "Видео",    value: "4K 120fps HDR" },
    { icon: "💨", label: "Скорость", value: "До 90 км/ч" },
  ]),
  mini4: s([
    { icon: "⚖️", label: "Вес",     value: "249г (без регистрации)" },
    { icon: "📸", label: "Камера",   value: "48 Мп, 1/1.3\" сенсор" },
    { icon: "⏱️", label: "Полёт",   value: "До 34 минут" },
    { icon: "🚁", label: "Дальность", value: "До 20 км" },
    { icon: "🎬", label: "Видео",    value: "4K 100fps HDR" },
  ]),
  air3s: s([
    { icon: "📸", label: "Камера",   value: "1\" CMOS, 50 Мп" },
    { icon: "⏱️", label: "Полёт",   value: "До 46 минут" },
    { icon: "🚁", label: "Дальность", value: "До 20 км" },
    { icon: "🎬", label: "Видео",    value: "4K 60fps HDR" },
    { icon: "💨", label: "Скорость", value: "До 75 км/ч" },
  ]),
  // ── DJI камеры ────────────────────────────────────────────────────────────────
  osmopocket3: s([
    { icon: "📸", label: "Сенсор",       value: "1\" CMOS" },
    { icon: "🎬", label: "Видео",        value: "4K 120fps" },
    { icon: "🔄", label: "Стабилизация", value: "3-осевой gimbal" },
    { icon: "📱", label: "Экран",        value: "OLED 1.4\"" },
    { icon: "🔋", label: "Батарея",      value: "До 166 минут" },
  ]),
  osmomobile7: s([
    { icon: "🔄", label: "Стабилизация", value: "3-осевой gimbal" },
    { icon: "🎯", label: "Слежение",     value: "ActiveTrack 7.0" },
    { icon: "💡", label: "Подсветка",    value: "Встроенная LED" },
    { icon: "🔋", label: "Батарея",      value: "До 9 часов" },
    { icon: "📱", label: "Совместимость", value: "iOS и Android" },
  ]),
  goggles3: s([
    { icon: "👁️", label: "Дисплей",   value: "Micro-OLED 1080p" },
    { icon: "⚡", label: "Задержка",   value: "13 мс" },
    { icon: "🔋", label: "Батарея",    value: "До 3 часов" },
    { icon: "🚁", label: "Совместимость", value: "DJI Avata 2, Inspire 3" },
  ]),
  // ── DJI Микрофоны ─────────────────────────────────────────────────────────────
  mic2: s([
    { icon: "🎙️", label: "Запись",    value: "32-bit Float" },
    { icon: "📡", label: "Дальность", value: "250 метров" },
    { icon: "🔇", label: "Шум",       value: "AI подавление" },
    { icon: "🔋", label: "Батарея",   value: "6 часов (передатчик)" },
    { icon: "📦", label: "Комплект",  value: "2 передатчика + приёмник" },
  ]),
  micmini: s([
    { icon: "🎙️", label: "Тип",       value: "Беспроводная петличка" },
    { icon: "📡", label: "Дальность", value: "До 400 метров" },
    { icon: "🔇", label: "Шум",       value: "AI подавление" },
    { icon: "🔋", label: "Батарея",   value: "6 часов" },
    { icon: "🧲", label: "Крепление", value: "Магнитное" },
  ]),
  // ── Ray-Ban Meta ──────────────────────────────────────────────────────────────
  rayban_wayfarer: s([
    { icon: "📸", label: "Камера",    value: "12 Мп, 1080p видео" },
    { icon: "🔊", label: "Звук",      value: "Открытые динамики" },
    { icon: "🤖", label: "AI",        value: "Meta AI ассистент" },
    { icon: "🔋", label: "Батарея",   value: "До 4 часов" },
    { icon: "📱", label: "Приложение", value: "Meta View" },
  ]),
  rayban_skyler: s([
    { icon: "📸", label: "Камера",    value: "12 Мп, 1080p видео" },
    { icon: "🔊", label: "Звук",      value: "Открытые динамики" },
    { icon: "🤖", label: "AI",        value: "Meta AI ассистент" },
    { icon: "🔋", label: "Батарея",   value: "До 4 часов" },
    { icon: "👓", label: "Дизайн",   value: "Женская оправа" },
  ]),
  rayban_headliner: s([
    { icon: "📸", label: "Камера",    value: "12 Мп, 1080p видео" },
    { icon: "🔊", label: "Звук",      value: "Открытые динамики" },
    { icon: "🤖", label: "AI",        value: "Meta AI ассистент" },
    { icon: "🔋", label: "Батарея",   value: "До 4 часов" },
    { icon: "👓", label: "Дизайн",   value: "Овальная оправа" },
  ]),
  // ── WHOOP ────────────────────────────────────────────────────────────────────
  whoop12m: s([
    { icon: "❤️", label: "ЧСС",       value: "24/7 мониторинг" },
    { icon: "😴", label: "Сон",       value: "Анализ фаз сна" },
    { icon: "📊", label: "HRV",       value: "Ежедневные метрики" },
    { icon: "🔋", label: "Батарея",   value: "До 5 дней" },
    { icon: "💧", label: "Защита",    value: "IP68, водонепроницаем" },
    { icon: "📱", label: "Подписка",  value: "12 месяцев включена" },
  ]),
  whoop6m: s([
    { icon: "❤️", label: "ЧСС",       value: "24/7 мониторинг" },
    { icon: "😴", label: "Сон",       value: "Анализ фаз сна" },
    { icon: "📊", label: "HRV",       value: "Ежедневные метрики" },
    { icon: "🔋", label: "Батарея",   value: "До 5 дней" },
    { icon: "💧", label: "Защита",    value: "IP68, водонепроницаем" },
    { icon: "📱", label: "Подписка",  value: "6 месяцев включена" },
  ]),
  // ── Garmin ────────────────────────────────────────────────────────────────────
  fenix8solar: s([
    { icon: "☀️", label: "Зарядка",  value: "Солнечная + USB-C" },
    { icon: "🔋", label: "Батарея",  value: "До 29 дней" },
    { icon: "🏃", label: "Спорт",    value: "30+ режимов" },
    { icon: "🗺️", label: "GPS",     value: "Multi-band L1+L5" },
    { icon: "📱", label: "Экран",    value: "AMOLED 1.4\"" },
    { icon: "🔩", label: "Корпус",   value: "Titanium, сапфировое стекло" },
  ]),
  fenix8: s([
    { icon: "🔋", label: "Батарея",  value: "До 16 дней" },
    { icon: "🏃", label: "Спорт",    value: "30+ режимов" },
    { icon: "🗺️", label: "GPS",     value: "Multi-band L1+L5" },
    { icon: "📱", label: "Экран",    value: "AMOLED 1.4\"" },
    { icon: "🔩", label: "Корпус",   value: "Titanium, сапфировое стекло" },
    { icon: "💧", label: "Защита",   value: "100м водонепроницаем" },
  ]),
  fr965: s([
    { icon: "🔋", label: "Батарея",  value: "До 31 дня" },
    { icon: "🏃", label: "Бег",      value: "Расширенные метрики" },
    { icon: "🗺️", label: "GPS",     value: "Multi-band" },
    { icon: "📱", label: "Экран",    value: "AMOLED 1.4\"" },
    { icon: "❤️", label: "Здоровье", value: "ЧСС, O2, стресс" },
  ]),
  epixpro: s([
    { icon: "🔋", label: "Батарея",  value: "До 31 дня" },
    { icon: "🔦", label: "Фонарик",  value: "Встроенный LED" },
    { icon: "🗺️", label: "GPS",     value: "Multi-band L1+L5" },
    { icon: "📱", label: "Экран",    value: "AMOLED 1.3\"" },
    { icon: "🛡️", label: "Стандарт", value: "MIL-STD-810" },
    { icon: "💧", label: "Защита",   value: "100м водонепроницаем" },
  ]),
  // ── Dyson ─────────────────────────────────────────────────────────────────────
  v15detect: s([
    { icon: "🔋", label: "Работа",   value: "До 60 минут" },
    { icon: "💡", label: "Лазер",    value: "Обнаружение пыли" },
    { icon: "🌪️", label: "Мощность", value: "240 АВт" },
    { icon: "🫁", label: "Фильтр",   value: "HEPA, 99.99%" },
    { icon: "📊", label: "Датчик",   value: "Piezo, считает частицы" },
  ]),
  airwrap: s([
    { icon: "🌡️", label: "Температура", value: "Без экстремального жара" },
    { icon: "💨", label: "Технология",  value: "Coanda эффект" },
    { icon: "🔌", label: "Питание",     value: "1300 Вт" },
    { icon: "📦", label: "Насадки",     value: "Полный комплект" },
    { icon: "🌍", label: "Напряжение",  value: "220-240В" },
  ]),
  supersonic: s([
    { icon: "💨", label: "Мотор",    value: "V9, 110 000 об/мин" },
    { icon: "🌡️", label: "Контроль", value: "Умный термодатчик" },
    { icon: "🔌", label: "Питание",  value: "1600 Вт" },
    { icon: "🔇", label: "Шум",      value: "Тихий режим" },
    { icon: "📦", label: "Насадки",  value: "5 в комплекте" },
  ]),
  // ── Яндекс ────────────────────────────────────────────────────────────────────
  station2: s([
    { icon: "🔊", label: "Звук",     value: "30 Вт, Dolby Atmos" },
    { icon: "🤖", label: "Голос",    value: "Алиса" },
    { icon: "🏠", label: "Умный дом", value: "Zigbee хаб" },
    { icon: "📡", label: "Wi-Fi",    value: "2.4 / 5 ГГц" },
    { icon: "🎬", label: "Видео",    value: "4K HDR стриминг" },
  ]),
  stationmax: s([
    { icon: "🔊", label: "Звук",     value: "65 Вт, Dolby Atmos" },
    { icon: "📱", label: "Экран",    value: "10\" IPS, 1080p" },
    { icon: "🤖", label: "Голос",    value: "Алиса" },
    { icon: "🏠", label: "Умный дом", value: "Zigbee хаб" },
    { icon: "🎬", label: "Видео",    value: "4K HDR стриминг" },
  ]),
  // ── Plaud ─────────────────────────────────────────────────────────────────────
  plaud_note: s([
    { icon: "⏱️", label: "Запись",   value: "До 30 часов" },
    { icon: "🌍", label: "Языки",    value: "59 языков" },
    { icon: "🧲", label: "Крепление", value: "MagSafe" },
    { icon: "🤖", label: "AI",       value: "Саммари и транскрипция" },
    { icon: "🔋", label: "Батарея",  value: "До 20 часов" },
  ]),
  plaud_notepin: s([
    { icon: "📌", label: "Форм-фактор", value: "Значок на одежде" },
    { icon: "⏱️", label: "Запись",     value: "До 20 часов" },
    { icon: "🌍", label: "Языки",      value: "59 языков" },
    { icon: "🤖", label: "AI",         value: "Саммари и транскрипция" },
    { icon: "🔋", label: "Батарея",    value: "До 8 часов" },
  ]),
  // ── Beats ─────────────────────────────────────────────────────────────────────
  beats_studio: s([
    { icon: "🔇", label: "Шум",           value: "Активное ANC" },
    { icon: "🎵", label: "Звук",          value: "Персонализированный" },
    { icon: "🔋", label: "Батарея",       value: "До 40 часов" },
    { icon: "🔌", label: "Подключение",   value: "USB-C, 3.5мм, BT 5.3" },
    { icon: "📱", label: "Совместимость", value: "iOS и Android" },
  ]),
};

// ─── ОТЗЫВЫ ───────────────────────────────────────────────────────────────────

type Review = { name: string; city: string; stars: number; text: string };
const rv = (items: Review[]) => JSON.stringify(items);

const REVIEW: Record<string, string> = {
  "iphone-17-pro-max-256": rv([
    { name: "Артём С.",    city: "Москва",           stars: 5, text: "Брал для работы — камера просто космос. ProRes видео снимает как профессиональная камера. Titanium корпус приятный на ощупь, не скользит." },
    { name: "Кристина В.", city: "Санкт-Петербург",  stars: 5, text: "Перешла с 14 Pro Max — разница огромная. A18 Pro летает, батарея держит весь день при активном использовании. Цвет Desert Titanium красивее вживую чем на фото." },
    { name: "Михаил Д.",   city: "Казань",           stars: 5, text: "Заказал через ABC Store — привезли за 2 часа, коробка запечатана, все документы. Менеджер помог с переносом данных. Рекомендую!" },
  ]),
  "iphone-17-pro-max-512": rv([
    { name: "Артём С.",    city: "Москва",           stars: 5, text: "Брал для работы — камера просто космос. ProRes видео снимает как профессиональная камера. Titanium корпус приятный на ощупь, не скользит." },
    { name: "Кристина В.", city: "Санкт-Петербург",  stars: 5, text: "Перешла с 14 Pro Max — разница огромная. A18 Pro летает, батарея держит весь день при активном использовании. Цвет Desert Titanium красивее вживую чем на фото." },
    { name: "Михаил Д.",   city: "Казань",           stars: 5, text: "Заказал через ABC Store — привезли за 2 часа, коробка запечатана, все документы. Менеджер помог с переносом данных. Рекомендую!" },
  ]),
  "iphone-17-pro-256": rv([
    { name: "Денис К.",  city: "Москва",        stars: 5, text: "Camera Control — убийственная фича. Снимаю контент для Instagram и теперь не нужен отдельный фотограф. Зум 5x работает без потери качества." },
    { name: "Алина Р.",  city: "Екатеринбург",  stars: 5, text: "Компактнее Max но мощь та же. Titanium лёгкий — забываешь что телефон в кармане. Apple Intelligence уже пользуюсь каждый день." },
    { name: "Сергей Т.", city: "Новосибирск",   stars: 5, text: "Взял 512GB — места хватает на всё. Игры, видео 4K, фото RAW. Заряжается быстро, за 30 минут до 70%." },
  ]),
  "iphone-17-pro-512": rv([
    { name: "Денис К.",  city: "Москва",        stars: 5, text: "Camera Control — убийственная фича. Снимаю контент для Instagram и теперь не нужен отдельный фотограф. Зум 5x работает без потери качества." },
    { name: "Алина Р.",  city: "Екатеринбург",  stars: 5, text: "Компактнее Max но мощь та же. Titanium лёгкий — забываешь что телефон в кармане. Apple Intelligence уже пользуюсь каждый день." },
    { name: "Сергей Т.", city: "Новосибирск",   stars: 5, text: "Взял 512GB — места хватает на всё. Игры, видео 4K, фото RAW. Заряжается быстро, за 30 минут до 70%." },
  ]),
  "iphone-17-128": rv([
    { name: "Валерия М.", city: "Москва",          stars: 5, text: "Первый iPhone 17 — не разочарована. Тонкий, лёгкий, быстрый. Камера 48 Мп делает снимки лучше чем мой старый Canon." },
    { name: "Никита О.",  city: "Ростов-на-Дону",  stars: 5, text: "Обновился с iPhone 13 — это небо и земля. Action Button настроил на фонарик — удобно. Батарея держит 2 дня при обычном использовании." },
    { name: "Татьяна Л.", city: "Краснодар",       stars: 5, text: "Брала дочери на день рождения. Девочка счастлива! Менеджер ABC Store помог выбрать цвет и объём памяти. Доставка в день заказа." },
  ]),
  "iphone-17-256": rv([
    { name: "Валерия М.", city: "Москва",          stars: 5, text: "Первый iPhone 17 — не разочарована. Тонкий, лёгкий, быстрый. Камера 48 Мп делает снимки лучше чем мой старый Canon." },
    { name: "Никита О.",  city: "Ростов-на-Дону",  stars: 5, text: "Обновился с iPhone 13 — это небо и земля. Action Button настроил на фонарик — удобно. Батарея держит 2 дня при обычном использовании." },
    { name: "Татьяна Л.", city: "Краснодар",       stars: 5, text: "Брала дочери на день рождения. Девочка счастлива! Менеджер ABC Store помог выбрать цвет и объём памяти. Доставка в день заказа." },
  ]),
  "iphone-16-pro-max-256": rv([
    { name: "Владимир С.",  city: "Москва",  stars: 5, text: "После выхода 17-й серии цена стала очень привлекательной. Камера 5x зум — лучшее что было в смартфонах. Camera Control использую постоянно." },
    { name: "Анастасия К.", city: "Уфа",    stars: 5, text: "Titanium корпус — это что-то. Лёгкий, прочный, не оставляет отпечатков. ProRes видео для YouTube снимаю прямо на телефон." },
    { name: "Роман Е.",     city: "Пермь",  stars: 5, text: "Брал б/у смотреть, взял новый в ABC Store. Разница в качестве очевидна. Гарантия, чек, оригинальная упаковка — всё как надо." },
  ]),
  "iphone-16-pro-256": rv([
    { name: "Игорь Н.",  city: "Москва",   stars: 5, text: "Отличный выбор по цене/качеству после выхода 17. A18 Pro не устареет ещё 3-4 года. Камера топ, экран яркий даже на солнце." },
    { name: "Марина Ф.", city: "Воронеж",  stars: 5, text: "Заменила разбитый 13 Pro. Настроила за 20 минут через Quick Start. Всё работает идеально. ABC Store — быстро и честно." },
    { name: "Павел В.",  city: "Тюмень",   stars: 5, text: "Размер 6.3 идеален — не маленький и не огромный. В кармане помещается. Face ID мгновенный даже в маске." },
  ]),
  "iphone-16-128": rv([
    { name: "Екатерина Ш.", city: "Москва",  stars: 5, text: "Лучший вход в экосистему Apple. Dynamic Island удобнее чем кажется — навигация, таймеры, музыка всегда на виду." },
    { name: "Андрей Б.",    city: "Самара",  stars: 5, text: "Перешёл с Android — не пожалел. iPhone 16 быстрый, стабильный, обновления приходят вовремя. Буду брать следующую модель тоже." },
    { name: "Юлия С.",      city: "Омск",   stars: 5, text: "USB-C наконец-то! Один провод для всего. Зарядка быстрая, качество фото отличное для своей цены." },
  ]),
  "iphone-15-pro-max-256": rv([
    { name: "Константин М.", city: "Москва",      stars: 5, text: "Titanium и USB-C — главные причины покупки. A17 Pro до сих пор быстрее многих конкурентов. Хорошая цена сейчас." },
    { name: "Ольга Д.",      city: "Челябинск",   stars: 5, text: "Снимаю свадьбы на побочке — iPhone 15 Pro Max справляется как профессиональная камера. Зум 5x без потерь это мощь." },
    { name: "Виктор Р.",     city: "Красноярск",  stars: 5, text: "Брал как замену сломавшемуся 12 Pro. Разница колоссальная. Dynamic Island, ProMotion 120Гц — привыкаешь быстро." },
  ]),
  "iphone-15-pro-256": rv([
    { name: "Дмитрий А.",   city: "Москва",           stars: 5, text: "Компактный профессиональный смартфон. Titanium лёгкий — с предыдущими Steel-моделями не сравнить. Action Button настроил на камеру." },
    { name: "Светлана К.",  city: "Нижний Новгород",  stars: 5, text: "Отличная цена сейчас. A17 Pro не тормозит даже в тяжёлых играх. Батарея на день при умеренном использовании." },
    { name: "Алексей М.",   city: "Волгоград",        stars: 5, text: "USB-C и Titanium — покупал именно за это. ABC Store доставили за 3 часа, всё оригинальное." },
  ]),
  "iphone-15-128": rv([
    { name: "Наталья В.", city: "Москва",   stars: 5, text: "Dynamic Island и 48 Мп камера за такую цену — отличный выбор. Переехала с 12 — довольна на 100%." },
    { name: "Максим Т.",  city: "Саратов",  stars: 5, text: "USB-C удобно — один кабель для ноутбука и телефона. Качество фото превзошло ожидания." },
    { name: "Ирина Б.",   city: "Тула",    stars: 5, text: "Купила маме — легко освоила, iOS понятная. Менеджер ABC Store помог с настройкой по телефону." },
  ]),
  "iphone-14-pro-max-256": rv([
    { name: "Борис К.",  city: "Москва",     stars: 5, text: "Always-On дисплей — привыкаешь за день и уже не можешь без него. Dynamic Island всё ещё лучше реализован чем у конкурентов." },
    { name: "Елена Ф.",  city: "Хабаровск", stars: 5, text: "Отличная цена на топовую модель. A16 Bionic быстрый, тормозов нет. Рекомендую тем кто хочет флагман без переплаты." },
    { name: "Тимур С.",  city: "Казань",    stars: 5, text: "Брал для бизнеса — Face ID, безопасность, стабильность. Два года пользуюсь, ни одного сбоя." },
  ]),
  "iphone-14-128": rv([
    { name: "Галина М.", city: "Москва",   stars: 5, text: "Лучший бюджетный вход в мир iPhone. A15 Bionic быстрый, камера хорошая. Для звонков, соцсетей и фото — идеально." },
    { name: "Руслан О.", city: "Уфа",     stars: 5, text: "Взял вместо Android среднего класса — iPhone 14 быстрее и стабильнее. Обновления iOS будут ещё несколько лет." },
    { name: "Нина Д.",   city: "Иркутск", stars: 5, text: "Подарок дочери — очень довольна. Камера, скорость, дизайн — всё на уровне. Доставка ABC Store в тот же день." },
  ]),
  "macbook-air-13-m4-256": rv([
    { name: "Иван П.",      city: "Москва",          stars: 5, text: "M4 — это зверь. Компилирую проекты на React в секунды. Вентилятора нет — абсолютно бесшумный. Батарея 18 часов — реальные, не маркетинговые." },
    { name: "Светлана Л.", city: "Санкт-Петербург",  stars: 5, text: "Работаю дизайнером в Figma — MacBook Air M4 справляется без проблем. Экран Liquid Retina яркий, цвета точные. Вес 1.24кг — ношу везде." },
    { name: "Артём С.",    city: "Екатеринбург",     stars: 5, text: "Перешёл с Windows ноутбука — жалею что не сделал этого раньше. macOS стабильная, программы не тормозят. ABC Store — лучший магазин Apple в городе." },
  ]),
  "macbook-air-13-m4-512": rv([
    { name: "Иван П.",      city: "Москва",          stars: 5, text: "M4 — это зверь. Компилирую проекты на React в секунды. Вентилятора нет — абсолютно бесшумный. Батарея 18 часов — реальные, не маркетинговые." },
    { name: "Светлана Л.", city: "Санкт-Петербург",  stars: 5, text: "Работаю дизайнером в Figma — MacBook Air M4 справляется без проблем. Экран Liquid Retina яркий, цвета точные. Вес 1.24кг — ношу везде." },
    { name: "Артём С.",    city: "Екатеринбург",     stars: 5, text: "Перешёл с Windows ноутбука — жалею что не сделал этого раньше. macOS стабильная, программы не тормозят. ABC Store — лучший магазин Apple в городе." },
  ]),
  "macbook-air-15-m4-512": rv([
    { name: "Марина Р.",  city: "Москва",       stars: 5, text: "15 дюймов — идеальный размер для работы дома и в кафе. Экран большой, но ноутбук тонкий и лёгкий. M4 тянет всё что нужно дизайнеру." },
    { name: "Алексей Ф.", city: "Новосибирск",  stars: 5, text: "Брал для видеомонтажа — Final Cut Pro летает. 4K видео рендерит быстрее чем мой старый i7. Рекомендую всем творческим людям." },
    { name: "Юлия К.",    city: "Казань",       stars: 5, text: "Большой экран без большого веса — мечта. Работаю в Excel и Word весь день — глаза не устают. Батарея держит рабочий день полностью." },
  ]),
  "macbook-pro-14-m4-512": rv([
    { name: "Дмитрий В.", city: "Москва",          stars: 5, text: "ProMotion 120Гц на MacBook — разница с Air заметна сразу. Для разработки iOS приложений — лучший инструмент. Xcode компилирует мгновенно." },
    { name: "Анна К.",    city: "Санкт-Петербург", stars: 5, text: "Работаю с тяжёлыми PSD файлами — M4 справляется без нагрева. MagSafe удобный, HDMI встроенный — не нужны переходники." },
    { name: "Павел Н.",   city: "Уфа",             stars: 5, text: "Взял для ML проектов — Python скрипты работают быстро. Neural Engine M4 реально ускоряет вычисления. Инвестиция на 5 лет." },
  ]),
  "macbook-pro-14-m4-pro-512": rv([
    { name: "Роман Б.",    city: "Москва",       stars: 5, text: "M4 Pro с 14-ядерным CPU — монтирую ProRes 4K без прокси. DaVinci Resolve летает. Это профессиональный инструмент за разумные деньги." },
    { name: "Виктория Е.", city: "Екатеринбург", stars: 5, text: "Архитектор, работаю в ArchiCAD и Lumion. M4 Pro справляется с большими проектами. Экран XDR с точными цветами — важно для профессии." },
    { name: "Сергей А.",   city: "Новосибирск",  stars: 5, text: "Сравнивал с PC за ту же цену — MacBook Pro выигрывает по производительности на задачах. Плюс macOS экосистема с iPhone." },
  ]),
  "macbook-pro-16-m4-pro-512": rv([
    { name: "Кирилл М.",  city: "Москва",          stars: 5, text: "16 дюймов для профессиональной работы — идеально. Монтирую рекламные ролики 8K. M4 Pro не греется даже под нагрузкой. Батарея 24 часа — реальные." },
    { name: "Наталья С.", city: "Санкт-Петербург", stars: 5, text: "Заменила старый MacBook Pro 2019. Разница в скорости — в 5 раз. Xcode, Instruments, симулятор — всё работает мгновенно." },
    { name: "Олег В.",    city: "Краснодар",       stars: 5, text: "Самый мощный ноутбук что у меня был. Для 3D рендеринга в Blender — незаменим. ABC Store привезли быстро, гарантия оформлена." },
  ]),
  "airpods-4": rv([
    { name: "Катя М.",  city: "Москва",        stars: 5, text: "Новый дизайн удобнее предыдущих — не выпадают при беге. Звук чистый, голосовой помощник срабатывает с первого раза. Кейс маленький, в кармане джинсов." },
    { name: "Лёша Б.",  city: "Казань",        stars: 5, text: "Первые AirPods — выбирал долго. Взял 4-е — не разочарован. Соединяются мгновенно, переключение между iPhone и Mac автоматическое." },
    { name: "Юля Т.",   city: "Ростов-на-Дону", stars: 5, text: "Слушаю подкасты и музыку каждый день. Держат 6 часов без подзарядки — хватает на весь рабочий день. Рекомендую как первые AirPods." },
  ]),
  "airpods-4-anc": rv([
    { name: "Андрей К.", city: "Москва",          stars: 5, text: "ANC работает лучше чем ожидал в открытых наушниках. В метро шум снижается значительно. Conversation Awareness — крутая фича, слышишь собеседника не снимая наушники." },
    { name: "Марина Н.", city: "Санкт-Петербург", stars: 5, text: "Работаю в open-space — ANC спасает. Музыка без отвлечений, коллеги не мешают. При звонке переключается автоматически." },
    { name: "Вася О.",   city: "Екатеринбург",    stars: 5, text: "Взял вместо Pro — дешевле а ANC тоже есть. Для офиса и улицы — отличный выбор. Качество звука на уровне наушников за 10тыс." },
  ]),
  "airpods-pro-2-usb-c": rv([
    { name: "Антон Ф.", city: "Москва",          stars: 5, text: "Лучшее ANC в классе TWS — это не маркетинг. В самолёте двигатели почти не слышно. Adaptive Audio подстраивается под ситуацию сам." },
    { name: "Алиса В.", city: "Санкт-Петербург", stars: 5, text: "Пользуюсь 2 года — ни одной проблемы. USB-C удобнее Lightning. Персонализированный пространственный звук в Apple Music — это что-то невероятное." },
    { name: "Максим С.", city: "Москва",         stars: 5, text: "Для спорта — идеальные. IP54 — можно тренироваться под дождём. Не выпадают даже при интенсивном беге. Звук мотивирует." },
  ]),
  "airpods-max-usb-c": rv([
    { name: "Виктор К.", city: "Москва",          stars: 5, text: "Hi-Fi звук это реально — слышу детали в треках которые не замечал раньше. ANC лучшее что я пробовал. Для работы дома — незаменимы." },
    { name: "Елена Р.",  city: "Санкт-Петербург", stars: 5, text: "Накладные наушники Apple — роскошь которую понимаешь сразу. Комфорт при 3-часовом ношении. Звонки в Zoom звучат профессионально." },
    { name: "Тимур А.",  city: "Казань",          stars: 5, text: "Слушаю классическую музыку — AirPods Max раскрывают её по-новому. Пространственный звук в Apple TV+ как в кинотеатре." },
  ]),
  "beats-studio-pro": rv([
    { name: "Женя К.",  city: "Москва",          stars: 5, text: "Звук Beats — мощный бас, чёткие высокие. ANC хорошее для студии. USB-C и 3.5мм — подключаю к любому устройству. 40 часов батареи — заряжаю раз в неделю." },
    { name: "Нина С.",  city: "Санкт-Петербург", stars: 5, text: "Диджей — мониторинг на репетициях. Звук детальный, изоляция хорошая. Совместимость с Android и iOS — переключаюсь между устройствами легко." },
    { name: "Тёма Д.",  city: "Екатеринбург",    stars: 5, text: "Взял вместо AirPods Max — дешевле и звук другой характер. Beats для энергичной музыки — идеально. В спортзале не выпадают, фиксация хорошая." },
  ]),
  "apple-watch-series-10": rv([
    { name: "Настя К.", city: "Москва",       stars: 5, text: "Самые тонкие часы на руке — почти не замечаешь. Датчик апноэ сна — неожиданно полезная функция. Обнаружил проблемы о которых не знал." },
    { name: "Коля М.",  city: "Екатеринбург", stars: 5, text: "Слежу за здоровьем через часы — ЧСС, ЭКГ, шаги. Зарядка за 30 минут до 80% — удобно. Apple Pay работает везде." },
    { name: "Саша Л.",  city: "Новосибирск",  stars: 5, text: "Интеграция с iPhone идеальная. Уведомления на запястье — больше не пропускаю важные сообщения. Тренировки отслеживает точно." },
  ]),
  "apple-watch-ultra-2": rv([
    { name: "Иван Г.",   city: "Москва",          stars: 5, text: "Бегаю ультрамарафоны — Ultra 2 идеален. 60 часов батареи в экономном режиме — хватает на трейл 100км. GPS точный, карты встроенные." },
    { name: "Денис Р.",  city: "Санкт-Петербург", stars: 5, text: "Дайвинг до 40 метров — часы выдержали. Яркость экрана 3000 нит — виден на солнце. Titanium прочный — ни царапины за полгода." },
    { name: "Кирилл С.", city: "Екатеринбург",    stars: 5, text: "Для активного образа жизни — лучший выбор. Siren Alert на случай чрезвычайной ситуации даёт уверенность в горах. Стоит каждой копейки." },
  ]),
  "apple-vision-pro-256": rv([
    { name: "Михаил К.",    city: "Москва",          stars: 5, text: "Первые 10 минут — шок. Это не VR, это другая реальность. Работаю в нём с документами — несколько виртуальных мониторов без физического железа." },
    { name: "Александр Ф.", city: "Санкт-Петербург", stars: 5, text: "Apple TV+ в Vision Pro — как личный IMAX. Spatial Video от iPhone 16 Pro — просматривать воспоминания в 3D это нечто невероятное." },
    { name: "Андрей В.",    city: "Москва",           stars: 5, text: "Купил для разработки visionOS приложений. Xcode в пространстве — продуктивность выросла. Это будущее вычислений — я уверен." },
  ]),
  "samsung-galaxy-s26-ultra": rv([
    { name: "Артём С.",  city: "Москва",           stars: 5, text: "S26 Ultra — лучший Android 2026. Privacy Display реально работает в метро. S Pen стал быстрее, AI функции на уровне." },
    { name: "Кира В.",   city: "Санкт-Петербург",  stars: 5, text: "Перешла с S24 Ultra — разница в камере заметна. Основной объектив с более широкой диафрагмой снимает в темноте значительно лучше." },
    { name: "Максим Д.", city: "Екатеринбург",     stars: 5, text: "Cobalt Violet выглядит невероятно вживую. Тоньше S25 Ultra, легче, но мощнее. ABC Store доставили за день." },
  ]),
  "samsung-galaxy-s26-plus": rv([
    { name: "Дмитрий К.", city: "Москва",     stars: 5, text: "S26+ — идеальный размер. Не такой большой как Ultra но мощь та же. Galaxy AI в 2026 году реально полезен." },
    { name: "Алина Р.",   city: "Казань",     stars: 5, text: "Sky Blue выглядит свежо. Тоньше предшественника, камера улучшена. Отличный выбор среди Android флагманов." },
    { name: "Сергей М.",  city: "Новосибирск", stars: 5, text: "Обновился с S24+ — заметное улучшение процессора и камеры. Батарея держит полтора дня." },
  ]),
  "samsung-galaxy-s26": rv([
    { name: "Никита Б.", city: "Москва",  stars: 5, text: "S26 наконец-то стартует с 256GB — это правильное решение. Компактный, быстрый, Galaxy AI работает отлично." },
    { name: "Таня М.",   city: "Воронеж", stars: 4, text: "Хороший телефон за свои деньги. Единственный минус — зарядка медленнее чем у Plus. В остальном всё на уровне." },
    { name: "Роман В.",  city: "Самара",  stars: 5, text: "Перешёл с iPhone 15 — доволен. Cobalt Violet — красивый цвет. ABC Store оформили быстро." },
  ]),
  "samsung-galaxy-s25-edge": rv([
    { name: "Владимир С.", city: "Москва",           stars: 5, text: "S25 Edge в руке не ощущается вообще. 5.8мм — это надо видеть. Titanium Icyblue — шикарный цвет. Камера 200 Мп впечатляет." },
    { name: "Ксения Д.",   city: "Санкт-Петербург",  stars: 5, text: "Купила за дизайн — осталась за функционалом. Тоньше чем кредитная карта стопкой. Galaxy AI работает отлично." },
    { name: "Павел Н.",    city: "Екатеринбург",     stars: 4, text: "Батарея 3900 — единственный компромисс за такую толщину. При умеренном использовании хватает на день. Дизайн 10/10." },
  ]),
  "samsung-galaxy-z-fold-7": rv([
    { name: "Вадим К.", city: "Москва",       stars: 5, text: "Работаю в двух приложениях одновременно — браузер и таблица. Это меняет подход к мобильной продуктивности. Планшет всегда со мной." },
    { name: "Инна Р.",  city: "Екатеринбург", stars: 5, text: "Читаю книги на внутреннем экране — как настоящая книга. Фотографирую на основную камеру видя результат на большом экране. Уникальный опыт." },
    { name: "Стас Л.",  city: "Казань",       stars: 5, text: "Шарнир надёжный — складываю-раскладываю сотни раз. Никакого скрипа. Samsung обещает 200тыс циклов — верю." },
  ]),
  "samsung-galaxy-z-flip-7": rv([
    { name: "Даша Н.",  city: "Москва",          stars: 5, text: "Стильный и компактный — в маленькой сумке помещается сложенный. Внешний экран показывает всё нужное не открывая телефон. Фото в стиле зеркала — отличные." },
    { name: "Лиза В.",  city: "Санкт-Петербург", stars: 5, text: "Покупала как модный гаджет — оказался реально удобным. Flex Mode для видеозвонков — ставишь на стол и руки свободны. Рекомендую девочкам." },
    { name: "Гриша Т.", city: "Нижний Новгород", stars: 5, text: "Взял ради формата — понравился функционал. Быстрый, камера хорошая, в кармане компактно. Snapdragon 8 Elite не тормозит ни в чём." },
  ]),
  "playstation-5-pro": rv([
    { name: "Дима К.",   city: "Москва",       stars: 5, text: "4K 120fps в Spider-Man 2 — это другой уровень. PSSR технология делает картинку лучше нативного 4K. SSD 2TB — больше не удаляю игры." },
    { name: "Серёжа М.", city: "Екатеринбург", stars: 5, text: "Обновился с базовой PS5 — разница в графике заметна. Трассировка лучей работает при 60fps. DualSense тактильный отклик всё так же крутой." },
    { name: "Костя Р.",  city: "Новосибирск",  stars: 5, text: "GTA VI на PS5 Pro — следующее поколение графики. Тихий, быстрый, никаких тормозов. ABC Store привезли на следующий день после заказа." },
  ]),
  "playstation-5-slim": rv([
    { name: "Ваня Б.",  city: "Москва",        stars: 5, text: "Компактнее оригинала — на 30% меньше места. В тумбу под телевизором поместилась легко. 4K HDR в Horizon — красота невероятная." },
    { name: "Миша С.",  city: "Казань",        stars: 5, text: "Первая PlayStation — выбрал Slim за цену. Не разочарован. PlayStation Plus — много отличных игр включено." },
    { name: "Лёня Д.",  city: "Ростов-на-Дону", stars: 5, text: "Тихая, быстрая, SSD мгновенный. Игры грузятся за секунды. God of War Ragnarök прошёл за неделю — не мог оторваться." },
  ]),
  "xbox-series-x": rv([
    { name: "Алёша К.", city: "Москва",          stars: 5, text: "Game Pass Ultimate — сотни игр за подписку. Xbox Series X мощный, тихий. Обратная совместимость со всеми поколениями Xbox — огромная библиотека." },
    { name: "Паша Р.",  city: "Санкт-Петербург", stars: 5, text: "Forza Horizon 5 в 4K 60fps — эталон автосимулятора. SSD быстрый, загрузки мгновенные. Геймпад Xbox лучший в индустрии по ощущениям." },
    { name: "Женя Н.",  city: "Екатеринбург",    stars: 5, text: "Купил для детей и себя. Game Pass окупается за месяц. Starfield, Halo, Forza — всё включено. Рекомендую как первую консоль." },
  ]),
  "xbox-series-s": rv([
    { name: "Тёма В.",  city: "Москва",  stars: 5, text: "Лучшая консоль за свои деньги. Game Pass — библиотека огромная. 1440p 120fps в большинстве игр. Маленькая — стоит где угодно." },
    { name: "Федя К.",  city: "Казань",  stars: 5, text: "Взял ребёнку — Minecraft, Roblox, FIFA. Всё работает отлично. Тихая, не греется. Родительский контроль настроил легко." },
    { name: "Борис Л.", city: "Самара",  stars: 5, text: "Цена-качество лучшее на рынке консолей. Game Pass за 500р в месяц даёт сотни игр. Для казуального геймера — идеально." },
  ]),
  "dji-mavic-4-pro": rv([
    { name: "Кирилл Ф.", city: "Москва",          stars: 5, text: "Снимаю рекламу для застройщиков — Mavic 4 Pro заменил профессиональную кино-технику. Hasselblad камера даёт кинематографичную картинку. 45 минут полёта — огонь." },
    { name: "Влад С.",   city: "Санкт-Петербург", stars: 5, text: "Три объектива — снимаю без смены высоты. Широкий для пейзажей, средний для архитектуры, теле для портретов с воздуха. Профессиональный инструмент." },
    { name: "Паша Д.",   city: "Екатеринбург",    stars: 5, text: "Купил для YouTube канала — подписчики отметили качество видео. ProRes 4K 120fps — монтирую как профессиональное кино. Инвестиция окупилась за месяц." },
  ]),
  "dji-mini-4-pro": rv([
    { name: "Лёша В.",  city: "Москва",          stars: 5, text: "249г — регистрация не нужна, летаю везде где разрешено. Omnidirectional obstacle sensing спас дрон несколько раз. 4K HDR видео лучше чем у дронов за вдвое большую цену." },
    { name: "Таня М.",  city: "Санкт-Петербург", stars: 5, text: "Первый дрон — легко научилась управлять. Режим ActiveTrack следит за мной сам. Видео для Instagram собирает тысячи лайков. Рекомендую начинающим." },
    { name: "Игорь Б.", city: "Новосибирск",     stars: 5, text: "Путешествую — Mini 4 Pro везде со мной. В рюкзак помещается легко. 34 минуты полёта хватает на съёмку достопримечательностей. Незаменимый помощник." },
  ]),
  "dji-air-3s": rv([
    { name: "Стас К.", city: "Москва",       stars: 5, text: "1 дюймовый сенсор — разница с маленькими сенсорами огромная. Съёмка на закате без потери деталей в тенях. 46 минут полёта рекорд в своём классе." },
    { name: "Коля Ф.", city: "Екатеринбург", stars: 5, text: "Баланс между Mini и Pro. Не нужно регистрировать как Pro, но качество как у профессионального дрона. APAS 360 обходит препятствия сам." },
    { name: "Жека Т.", city: "Казань",       stars: 5, text: "Снимаю свадьбы — клиенты восхищены аэросъёмкой. Dual tele камера — снимаю общий план и крупный без посадки. Надёжный рабочий инструмент." },
  ]),
  "dji-osmo-pocket-3": rv([
    { name: "Андрей К.", city: "Москва",          stars: 5, text: "Влог снимаю каждый день — Osmo Pocket 3 идеален. 1 дюймовый сенсор в таком маленьком корпусе — технологическое чудо. OLED экран поворотный, удобно для съёмки себя." },
    { name: "Маша С.",   city: "Санкт-Петербург", stars: 5, text: "Заменил смартфон для съёмки путешествий. Стабилизация трёхосевая — видео гладкое даже при ходьбе. 4K 120fps для слоу-мо в 4K это уникально в классе." },
    { name: "Рома В.",   city: "Новосибирск",     stars: 5, text: "Журналист — использую для репортажей. Компактный, незаметный, качество профессиональное. Аккумулятор на 166 минут хватает на весь съёмочный день." },
  ]),
  "dji-osmo-mobile-7-pro": rv([
    { name: "Катя Р.",  city: "Москва",       stars: 5, text: "Стабилизатор для iPhone — разница с ручной съёмкой колоссальная. ActiveTrack 7.0 следит за мной даже когда поворачиваюсь. Встроенная подсветка для интервью в помещении." },
    { name: "Витя Б.",  city: "Екатеринбург", stars: 5, text: "Снимаю корпоративные видео на iPhone + Osmo Mobile 7 Pro. Клиенты не верят что это смартфон. Складной, лёгкий, в сумку помещается." },
    { name: "Аня Л.",   city: "Казань",       stars: 5, text: "TikTok ведение — подписчики выросли после покупки стабилизатора. Видео профессиональное, переходы плавные. За цену — лучшее на рынке." },
  ]),
  "dji-goggles-3": rv([
    { name: "Миша К.",  city: "Москва",          stars: 5, text: "FPV полёт с Goggles 3 — абсолютное погружение. Micro-OLED 1080p на каждый глаз, задержка 13мс — ощущение что сам летишь. Незаменимо для гонок." },
    { name: "Дима Р.",  city: "Санкт-Петербург", stars: 5, text: "Снимаю FPV видео для клиентов — Goggles 3 дают точный контроль кадра. Батарея 3 часа — полные съёмочные сессии без перерыва." },
    { name: "Слава Т.", city: "Екатеринбург",    stars: 5, text: "Попробовал у друга — сразу заказал. Опыт управления дроном от первого лица несравним с экраном телефона. Стоит каждой копейки." },
  ]),
  "dji-mic-2": rv([
    { name: "Алина К.", city: "Москва",          stars: 5, text: "32-bit Float запись — никогда не получишь перегруз. Для интервью на улице AI шумоподавление убирает весь посторонний звук. Незаменим для видеографа." },
    { name: "Артём В.", city: "Санкт-Петербург", stars: 5, text: "Два передатчика — снимаю разговор двух людей одновременно. 250 метров дальности — достаточно для любой съёмки. Качество звука как у студийного микрофона." },
    { name: "Денис С.", city: "Казань",          stars: 5, text: "YouTube блог — звук это 50% восприятия видео. DJI Mic 2 поднял качество канала на новый уровень. Подписчики отметили улучшение в комментариях." },
  ]),
  "dji-mic-mini": rv([
    { name: "Вася М.",  city: "Москва",       stars: 5, text: "Магнитное крепление — прицепил за секунду. Ношу незаметно под одеждой. Для интервью и влогов — идеальный размер. 400 метров дальности больше чем нужно." },
    { name: "Маша Б.",  city: "Екатеринбург", stars: 5, text: "Компактный но мощный. AI шумоподавление работает в кафе где всегда шумно. Качество звука лучше встроенного микрофона камеры в разы." },
    { name: "Ваня Д.",  city: "Новосибирск",  stars: 5, text: "Первый беспроводной микрофон — выбрал Mini за цену. Для начинающего YouTube-блогера — отличный старт. Батарея на 6 часов — весь съёмочный день." },
  ]),
  "ray-ban-meta-wayfarer": rv([
    { name: "Настя Р.",  city: "Москва",          stars: 5, text: "Ношу как обычные очки — никто не догадывается что они умные. Снимаю видео в путешествиях незаметно. Meta AI отвечает на вопросы через наушники — удобно." },
    { name: "Кирилл В.", city: "Санкт-Петербург", stars: 5, text: "Слушаю подкасты и музыку через открытые динамики — слышу окружение, безопасно на улице. Instagram Stories снятые от первого лица — топ контент." },
    { name: "Соня Д.",   city: "Екатеринбург",    stars: 5, text: "Купила как стильный гаджет — оказалось очень функционально. Meta AI помогает переводить меню в ресторанах за границей. Будущее уже здесь." },
  ]),
  "ray-ban-meta-skyler": rv([
    { name: "Лена К.", city: "Москва",  stars: 5, text: "Женская оправа сидит идеально. Легче чем ожидала. Звонки через динамики в очках — руки свободны когда готовлю. Meta AI — умный помощник." },
    { name: "Оля В.",  city: "Казань",  stars: 5, text: "Работаю дизайнером — снимаю референсы от первого лица. 12 Мп камера даёт качественные снимки. Заряда на 4 часа хватает на рабочий день." },
    { name: "Даша М.", city: "Ростов-на-Дону", stars: 5, text: "Подарок себе — не разочаровалась. Стильные, функциональные, умные. Meta AI распознаёт что передо мной и рассказывает — полезная функция." },
  ]),
  "ray-ban-meta-headliner": rv([
    { name: "Денис К.", city: "Москва",          stars: 5, text: "Овальная оправа — выделяюсь из толпы. Все спрашивают что за очки. Meta AI через голос отвечает на вопросы — удобно в путешествиях." },
    { name: "Саша Л.",  city: "Санкт-Петербург", stars: 5, text: "Самая заметная модель Ray-Ban Meta — именно то что хотел. Встроенная камера снимает от первого лица — уникальные кадры для контента." },
    { name: "Гоша Н.",  city: "Новосибирск",     stars: 5, text: "Технологии и стиль в одном. Динамики звучат хорошо для открытого типа. 4 часа работы хватает на прогулку. Куплю ещё одну пару в подарок." },
  ]),
  "whoop-5-12m": rv([
    { name: "Иван С.",  city: "Москва",          stars: 5, text: "Ношу 8 месяцев — изменил подход к тренировкам. Recovery Score показывает когда можно жать на газ, когда отдыхать. Перестал перетренировываться. Результаты выросли." },
    { name: "Катя Б.",  city: "Санкт-Петербург", stars: 5, text: "Бегу первый марафон — WHOOP помог составить план. HRV метрики показали как питание влияет на восстановление. Изменила диету — почувствовала разницу." },
    { name: "Миша А.",  city: "Екатеринбург",    stars: 5, text: "CrossFit 5 раз в неделю — WHOOP даёт объективную картину нагрузки. Сон улучшился когда начал следить за метриками. Инвестиция в здоровье." },
  ]),
  "whoop-5-6m": rv([
    { name: "Антон Д.", city: "Москва",  stars: 5, text: "Взял на 6 месяцев попробовать — продлил на год. Данные о стрессе и восстановлении объективные. Понял что недосыпаю — исправил режим." },
    { name: "Таня К.",  city: "Казань",  stars: 5, text: "Для йоги и пилатеса тоже работает. Отслеживает ЧСС во время практики. Анализ сна помог понять в какое время ложиться для лучшего восстановления." },
    { name: "Серёжа В.", city: "Новосибирск", stars: 5, text: "Трекер без экрана — поначалу странно, потом понимаешь смысл. Не отвлекает уведомлениями. Данные смотришь когда хочешь в приложении." },
  ]),
  "garmin-fenix-8-solar": rv([
    { name: "Вася К.",  city: "Москва",          stars: 5, text: "Солнечная зарядка реально работает — летом на улице часы практически не разряжались. 29 дней без зарядки в реальных условиях трекинга." },
    { name: "Олег М.",  city: "Екатеринбург",    stars: 5, text: "Использую для трейлраннинга — AMOLED дисплей виден на солнце. Топографические карты встроенные — не нужен телефон в горах. Titanium прочный." },
    { name: "Женя Р.",  city: "Санкт-Петербург", stars: 5, text: "Триатлет — Fenix 8 Solar идеален для трёх видов спорта. Точный GPS в воде, на велосипеде и беге. Результаты соревнований улучшились." },
  ]),
  "garmin-fenix-8": rv([
    { name: "Саша Н.",  city: "Москва",  stars: 5, text: "AMOLED экран после Fenix 6 — небо и земля. Яркий, чёткий, виден под любым углом. 30 спортивных режимов — использую треккинг, плавание, велосипед." },
    { name: "Маша Д.",  city: "Казань",  stars: 5, text: "Первые умные часы — выбрала Fenix 8 для серьёзных тренировок. Данные точные, приложение Garmin Connect информативное. Рекомендую спортсменам." },
    { name: "Толя В.",  city: "Ростов-на-Дону", stars: 5, text: "Военный — MIL-STD-810 это не маркетинг. Часы выдержали всё что я им устроил. GPS точный даже в лесу. Надёжный инструмент на годы." },
  ]),
  "garmin-forerunner-965": rv([
    { name: "Лёша К.",  city: "Москва",          stars: 5, text: "Готовлюсь к марафону — Forerunner 965 анализирует форму бега и даёт рекомендации. Training Readiness показывает когда организм готов к нагрузке." },
    { name: "Настя Р.", city: "Санкт-Петербург", stars: 5, text: "AMOLED дисплей яркий и красивый. Данные о беге подробнее чем у Apple Watch. Для серьёзных бегунов — лучший выбор на рынке." },
    { name: "Гриша М.", city: "Новосибирск",     stars: 5, text: "Заменил Apple Watch на Forerunner 965 — спортивные метрики на другом уровне. Running Dynamics показывают длину шага, каденс, вертикальные колебания." },
  ]),
  "garmin-epix-pro-gen-2": rv([
    { name: "Иван Ф.",  city: "Москва",       stars: 5, text: "Встроенный фонарик — неожиданно полезный. На ночных пробежках освещает дорогу. MIL-STD-810 — бросал, ронял, мочил. Ни царапины, работает идеально." },
    { name: "Дима С.",  city: "Екатеринбург", stars: 5, text: "Тактический вид с фонариком — выделяет из толпы. AMOLED яркий, Multi-band GPS точный. Для охотников и туристов — идеальный выбор." },
    { name: "Костя Л.", city: "Казань",       stars: 5, text: "100м водонепроницаемость — плаваю с часами постоянно. Анализ плавания точный — темп, дистанция, SWOLF. Лучшие часы для активного отдыха." },
  ]),
  "dyson-v15-detect": rv([
    { name: "Лена К.",   city: "Москва",          stars: 5, text: "Лазерное обнаружение пыли — видишь что убираешь. После обычного пылесоса казалось пол чистый. Dyson V15 показал сколько пыли оставалось. HEPA фильтр — воздух чище." },
    { name: "Наташа В.", city: "Санкт-Петербург", stars: 5, text: "60 минут работы без подзарядки — убираю квартиру 80м² за раз. Насадки для разных поверхностей — паркет, ковёр, диван. Тихий по сравнению с обычным пылесосом." },
    { name: "Ира Б.",    city: "Екатеринбург",    stars: 5, text: "Аллергик — HEPA 99.99% улавливает аллергены. После покупки Dyson симптомы аллергии уменьшились. Цена высокая но здоровье дороже." },
  ]),
  "dyson-airwrap-complete": rv([
    { name: "Алина М.", city: "Москва",          stars: 5, text: "Укладка за 20 минут вместо 45 с обычными инструментами. Волосы не пересыхают — Coanda эффект без прямого жара. Завивка держится весь день." },
    { name: "Вика Д.",  city: "Санкт-Петербург", stars: 5, text: "Парикмахер посоветовала — купила не пожалела. Все насадки в комплекте — укладка, завивка, выпрямление. Один прибор заменил три." },
    { name: "Соня К.",  city: "Казань",          stars: 5, text: "Волосы тонкие — обычные щипцы сжигали. Airwrap не перегревает, укладка нежная. Через месяц использования волосы стали лучше. Стоит своих денег." },
  ]),
  "dyson-supersonic": rv([
    { name: "Маша Р.",  city: "Москва",          stars: 5, text: "V9 мотор в рукоятке — баланс идеальный, рука не устаёт. Тихий режим — сушу волосы пока муж спит. Термодатчик защищает волосы от перегрева." },
    { name: "Оля В.",   city: "Санкт-Петербург", stars: 5, text: "Сушу длинные волосы за 10 минут вместо 25. Магнитные насадки удобные — меняются одной рукой. Дорогой но волосы здоровее стали." },
    { name: "Катя С.",  city: "Екатеринбург",    stars: 5, text: "Подарок мужа — сначала скептически. Теперь не представляю жизнь без него. Укладка после сушки держится весь день. Инвестиция в красоту." },
  ]),
  "yandex-station-2": rv([
    { name: "Коля К.",  city: "Москва",          stars: 5, text: "Центр умного дома — управляю светом, розетками, шторами голосом. Zigbee хаб встроен — не нужна отдельная коробка. Алиса умнее чем год назад." },
    { name: "Таня М.",  city: "Санкт-Петербург", stars: 5, text: "Звук 30Вт для колонки такого размера — отличный. Яндекс Музыка через неё звучит как хорошая аудиосистема. Рецепты диктует пока готовлю." },
    { name: "Юра Б.",   city: "Казань",          stars: 5, text: "Детям нравится — загадки, сказки, уроки. Родительский контроль настраивается. Умный дом начал с неё — теперь 15 устройств подключено." },
  ]),
  "yandex-station-max": rv([
    { name: "Дима В.",  city: "Москва",          stars: 5, text: "Экран 10 дюймов — смотрю кулинарные видео на кухне. Алиса показывает рецепт пошагово. Звук 65Вт заполняет гостиную. Главное устройство умного дома." },
    { name: "Лена Р.",  city: "Санкт-Петербург", stars: 5, text: "Заменила телевизор на кухне. Netflix, YouTube, Яндекс.Эфир — всё есть. Голосовое управление без пультов. Качество картинки хорошее для кухни." },
    { name: "Петя С.",  city: "Екатеринбург",    stars: 5, text: "Старикам родителям подарил — освоили за день. Алиса понимает с первого раза. Видеозвонки через Яндекс — вижу их каждый день. Спасибо ABC Store за быструю доставку." },
  ]),
  "plaud-note-magsafe": rv([
    { name: "Борис К.",    city: "Москва",          stars: 5, text: "Юрист — диктую протоколы встреч. Транскрипция точная даже при быстрой речи. 59 языков — работаю с иностранными клиентами без переводчика. Революция в работе." },
    { name: "Анна Г.",     city: "Санкт-Петербург", stars: 5, text: "Журналист — интервью записываю на Plaud Note. MagSafe прилипает к iPhone незаметно. Саммари готово через минуту после интервью. Экономит часы работы." },
    { name: "Геннадий В.", city: "Екатеринбург",    stars: 5, text: "Предприниматель — фиксирую идеи голосом. ИИ группирует по темам. 30 часов записи — хватает на командировку. Возможности только растут с обновлениями." },
  ]),
  "plaud-notepin": rv([
    { name: "Светлана К.", city: "Москва",       stars: 5, text: "Врач — записываю осмотры в форме значка. Пациенты не замечают. Транскрипция медицинских терминов точная. Экономит час документации в день." },
    { name: "Алексей Д.",  city: "Казань",       stars: 5, text: "Лектор в университете — записываю лекции для студентов. NotePin незаметный, не отвлекает. Транскрипция готова к концу пары. Студенты довольны конспектами." },
    { name: "Марина В.",   city: "Новосибирск",  stars: 5, text: "Маленький и незаметный — ношу на пиджаке. 8 часов записи хватает на рабочий день. ИИ саммари выделяет главное из длинных встреч. Незаменимый помощник." },
  ]),
};

// ─── СТАТИСТИКА ────────────────────────────────────────────────────────────────

type Stats = { reviewCount: number; rating: number; clicks: number; clicksMonth: number };
const STATS: Record<string, Stats> = {
  "iphone-17-pro-max-256":   { reviewCount: 891, rating: 4.9, clicks: 3200, clicksMonth: 280 },
  "iphone-17-pro-max-512":   { reviewCount: 623, rating: 4.9, clicks: 2100, clicksMonth: 890 },
  "iphone-17-pro-256":       { reviewCount: 834, rating: 4.9, clicks: 2900, clicksMonth: 780 },
  "iphone-17-pro-512":       { reviewCount: 567, rating: 4.8, clicks: 1800, clicksMonth: 245 },
  "iphone-17-128":           { reviewCount: 743, rating: 4.8, clicks: 2400, clicksMonth: 210 },
  "iphone-17-256":           { reviewCount: 689, rating: 4.9, clicks: 2200, clicksMonth: 195 },
  "iphone-16-pro-max-256":   { reviewCount: 312, rating: 4.9, clicks: 1400, clicksMonth: 234 },
  "iphone-16-pro-256":       { reviewCount: 289, rating: 4.8, clicks: 1200, clicksMonth: 198 },
  "iphone-16-128":           { reviewCount: 334, rating: 4.8, clicks: 1600, clicksMonth: 267 },
  "iphone-15-pro-max-256":   { reviewCount: 134, rating: 4.9, clicks: 890,  clicksMonth: 145 },
  "iphone-15-pro-256":       { reviewCount: 112, rating: 4.8, clicks: 720,  clicksMonth: 112 },
  "iphone-15-128":           { reviewCount: 156, rating: 4.7, clicks: 980,  clicksMonth: 167 },
  "iphone-14-pro-max-256":   { reviewCount: 47,  rating: 4.8, clicks: 340,  clicksMonth: 45  },
  "iphone-14-128":           { reviewCount: 38,  rating: 4.7, clicks: 280,  clicksMonth: 34  },
  "macbook-air-13-m4-256":   { reviewCount: 89,  rating: 4.9, clicks: 980,  clicksMonth: 145 },
  "macbook-air-13-m4-512":   { reviewCount: 67,  rating: 4.9, clicks: 780,  clicksMonth: 112 },
  "macbook-air-15-m4-512":   { reviewCount: 54,  rating: 4.9, clicks: 650,  clicksMonth: 98  },
  "macbook-pro-14-m4-512":   { reviewCount: 43,  rating: 4.9, clicks: 540,  clicksMonth: 78  },
  "macbook-pro-14-m4-pro-512": { reviewCount: 38, rating: 4.9, clicks: 480, clicksMonth: 67  },
  "macbook-pro-16-m4-pro-512": { reviewCount: 29, rating: 4.8, clicks: 380, clicksMonth: 54  },
  "airpods-4":               { reviewCount: 156, rating: 4.8, clicks: 890,  clicksMonth: 134 },
  "airpods-4-anc":           { reviewCount: 134, rating: 4.8, clicks: 780,  clicksMonth: 112 },
  "airpods-pro-2-usb-c":     { reviewCount: 445, rating: 4.9, clicks: 1800, clicksMonth: 670 },
  "airpods-max-usb-c":       { reviewCount: 178, rating: 4.8, clicks: 980,  clicksMonth: 498 },
  "beats-studio-pro":        { reviewCount: 178, rating: 4.7, clicks: 890,  clicksMonth: 145 },
  "apple-watch-series-10":   { reviewCount: 167, rating: 4.8, clicks: 890,  clicksMonth: 134 },
  "apple-watch-ultra-2":     { reviewCount: 234, rating: 4.9, clicks: 1200, clicksMonth: 189 },
  "apple-vision-pro-256":    { reviewCount: 43,  rating: 4.9, clicks: 450,  clicksMonth: 67  },
  "samsung-galaxy-s26-ultra": { reviewCount: 134, rating: 4.9, clicks: 1100, clicksMonth: 312 },
  "samsung-galaxy-s26-plus":  { reviewCount: 89,  rating: 4.8, clicks: 890,  clicksMonth: 234 },
  "samsung-galaxy-s26":       { reviewCount: 67,  rating: 4.8, clicks: 780,  clicksMonth: 198 },
  "samsung-galaxy-s25-edge":  { reviewCount: 56,  rating: 4.8, clicks: 670,  clicksMonth: 189 },
  "samsung-galaxy-z-fold-7": { reviewCount: 34,  rating: 4.8, clicks: 380,  clicksMonth: 56  },
  "samsung-galaxy-z-flip-7": { reviewCount: 45,  rating: 4.7, clicks: 420,  clicksMonth: 67  },
  "playstation-5-pro":       { reviewCount: 246, rating: 4.9, clicks: 1560, clicksMonth: 345 },
  "playstation-5-slim":      { reviewCount: 690, rating: 4.8, clicks: 2400, clicksMonth: 534 },
  "xbox-series-x":           { reviewCount: 267, rating: 4.8, clicks: 890,  clicksMonth: 145 },
  "xbox-series-s":           { reviewCount: 389, rating: 4.7, clicks: 1100, clicksMonth: 198 },
  "dji-mavic-4-pro":         { reviewCount: 67,  rating: 4.9, clicks: 780,  clicksMonth: 123 },
  "dji-mini-4-pro":          { reviewCount: 145, rating: 4.9, clicks: 1200, clicksMonth: 198 },
  "dji-air-3s":              { reviewCount: 89,  rating: 4.8, clicks: 890,  clicksMonth: 145 },
  "dji-osmo-pocket-3":       { reviewCount: 234, rating: 4.9, clicks: 1400, clicksMonth: 223 },
  "dji-osmo-mobile-7-pro":   { reviewCount: 178, rating: 4.8, clicks: 980,  clicksMonth: 156 },
  "dji-goggles-3":           { reviewCount: 56,  rating: 4.8, clicks: 560,  clicksMonth: 89  },
  "dji-mic-2":               { reviewCount: 123, rating: 4.9, clicks: 890,  clicksMonth: 560 },
  "dji-mic-mini":            { reviewCount: 89,  rating: 4.8, clicks: 670,  clicksMonth: 112 },
  "ray-ban-meta-wayfarer":   { reviewCount: 167, rating: 4.8, clicks: 980,  clicksMonth: 156 },
  "ray-ban-meta-skyler":     { reviewCount: 89,  rating: 4.8, clicks: 560,  clicksMonth: 89  },
  "ray-ban-meta-headliner":  { reviewCount: 78,  rating: 4.7, clicks: 490,  clicksMonth: 78  },
  "whoop-5-12m":             { reviewCount: 234, rating: 4.9, clicks: 1100, clicksMonth: 178 },
  "whoop-5-6m":              { reviewCount: 145, rating: 4.8, clicks: 780,  clicksMonth: 123 },
  "garmin-fenix-8-solar":    { reviewCount: 89,  rating: 4.9, clicks: 780,  clicksMonth: 123 },
  "garmin-fenix-8":          { reviewCount: 123, rating: 4.9, clicks: 890,  clicksMonth: 145 },
  "garmin-forerunner-965":   { reviewCount: 167, rating: 4.8, clicks: 980,  clicksMonth: 156 },
  "garmin-epix-pro-gen-2":   { reviewCount: 78,  rating: 4.8, clicks: 560,  clicksMonth: 89  },
  "dyson-v15-detect":        { reviewCount: 345, rating: 4.9, clicks: 1400, clicksMonth: 223 },
  "dyson-airwrap-complete":  { reviewCount: 456, rating: 4.8, clicks: 1600, clicksMonth: 445 },
  "dyson-supersonic":        { reviewCount: 389, rating: 4.8, clicks: 1300, clicksMonth: 212 },
  "yandex-station-2":        { reviewCount: 567, rating: 4.7, clicks: 1800, clicksMonth: 389 },
  "yandex-station-max":      { reviewCount: 234, rating: 4.7, clicks: 980,  clicksMonth: 156 },
  "plaud-note-magsafe":      { reviewCount: 89,  rating: 4.9, clicks: 780,  clicksMonth: 123 },
  "plaud-notepin":           { reviewCount: 67,  rating: 4.8, clicks: 560,  clicksMonth: 89  },
};

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
  const samsung = await prisma.brand.upsert({
    where: { slug: "samsung" },
    update: {},
    create: { name: "Samsung", slug: "samsung" },
  });
  const sony = await prisma.brand.upsert({
    where: { slug: "sony" },
    update: {},
    create: { name: "Sony", slug: "sony" },
  });
  const microsoft = await prisma.brand.upsert({
    where: { slug: "microsoft" },
    update: {},
    create: { name: "Microsoft", slug: "microsoft" },
  });
  const dyson = await prisma.brand.upsert({
    where: { slug: "dyson" },
    update: {},
    create: { name: "Dyson", slug: "dyson" },
  });
  const yandex = await prisma.brand.upsert({
    where: { slug: "yandex" },
    update: {},
    create: { name: "Яндекс", slug: "yandex" },
  });
  const garmin = await prisma.brand.upsert({
    where: { slug: "garmin" },
    update: {},
    create: { name: "Garmin", slug: "garmin" },
  });

  // ─── КАТЕГОРИИ ────────────────────────────────────────────────────────────

  const smartphones = await prisma.category.upsert({
    where: { slug: "iphone" },
    update: { name: "Смартфоны" },
    create: { name: "Смартфоны", slug: "iphone" },
  });
  const laptops = await prisma.category.upsert({
    where: { slug: "macbook" },
    update: { name: "Ноутбуки" },
    create: { name: "Ноутбуки", slug: "macbook" },
  });
  const headphones_cat = await prisma.category.upsert({
    where: { slug: "airpods" },
    update: { name: "Наушники" },
    create: { name: "Наушники", slug: "airpods" },
  });
  const wearables = await prisma.category.upsert({
    where: { slug: "watches" },
    update: { name: "Носимые" },
    create: { name: "Носимые", slug: "watches" },
  });
  const vision_cat = await prisma.category.upsert({
    where: { slug: "vision" },
    update: { name: "VR / AR" },
    create: { name: "VR / AR", slug: "vision" },
  });
  const gaming_cat = await prisma.category.upsert({
    where: { slug: "gaming" },
    update: { name: "Консоли" },
    create: { name: "Консоли", slug: "gaming" },
  });
  const dji_cat = await prisma.category.upsert({
    where: { slug: "dji" },
    update: { name: "DJI" },
    create: { name: "DJI", slug: "dji" },
  });
  const cameras_cat = await prisma.category.upsert({
    where: { slug: "cameras" },
    update: { name: "Камеры" },
    create: { name: "Камеры", slug: "cameras" },
  });
  const microphones_cat = await prisma.category.upsert({
    where: { slug: "microphones" },
    update: { name: "Микрофоны" },
    create: { name: "Микрофоны", slug: "microphones" },
  });
  const rayban_cat = await prisma.category.upsert({
    where: { slug: "rayban" },
    update: { name: "Ray-Ban" },
    create: { name: "Ray-Ban", slug: "rayban" },
  });
  const whoop_cat = await prisma.category.upsert({
    where: { slug: "whoop" },
    update: { name: "WHOOP" },
    create: { name: "WHOOP", slug: "whoop" },
  });
  const garmin_cat = await prisma.category.upsert({
    where: { slug: "garmin" },
    update: { name: "Garmin" },
    create: { name: "Garmin", slug: "garmin" },
  });
  const dyson_cat = await prisma.category.upsert({
    where: { slug: "dyson" },
    update: { name: "Dyson" },
    create: { name: "Dyson", slug: "dyson" },
  });
  const yandex_cat = await prisma.category.upsert({
    where: { slug: "yandex" },
    update: { name: "Яндекс" },
    create: { name: "Яндекс", slug: "yandex" },
  });
  const plaud_cat = await prisma.category.upsert({
    where: { slug: "plaud-brand" },
    update: { name: "Plaud" },
    create: { name: "Plaud", slug: "plaud-brand" },
  });
  await prisma.category.upsert({
    where: { slug: "smart-glasses" },
    update: { name: "Умные очки" },
    create: { name: "Умные очки", slug: "smart-glasses" },
  });
  await prisma.category.upsert({
    where: { slug: "dictaphones" },
    update: { name: "AI-гаджеты" },
    create: { name: "AI-гаджеты", slug: "dictaphones" },
  });

  // ─── ТОВАРЫ ───────────────────────────────────────────────────────────────

  const IMG = {
    ip17promax: "/images/iphone-17-pro-max/cosmic-orange.png",
    ip17pro:    "/images/iphone-17-pro-max/deep-blue.png",
    ip17:       "/images/iphone-17/black.png",
    ip16promax: "/images/iphone-16-pro-max/desert-titanium.png",
    ip16pro:    "/images/iphone-16-pro-max/desert-titanium.png",
    ip16:       "/images/iphone-16/teal.png",
    ip15promax: "/images/iphone-15-pro-max/blue-titanium.png",
    ip15pro:    "/images/iphone-15-pro/natural-titanium.png",
    ip15:       "/images/iphone-15/black.png",
    ip14promax: "/images/iphone-14-pro-max/deep-purple.png",
    ip14:       "/images/iphone-14/midnight.png",
    mba13m4: "/images/macbook-air-13-m4/midnight.png", mba15m4: "/images/macbook-air-15-m4/midnight.png", mbp14m4: "/images/macbook.png", mbp16m4: "/images/macbook.png",
    ap4: "/images/airpods4.png", appro2: "/images/airpodspro2.png", apmax: "/images/airpods-max/midnight.png",
    aws10: "/images/applewatch10.png", awultra2: "/images/applewatchultra.png", visionpro: "/images/avp.png", beats: "/images/beats.png",
    dji:        "/images/DJI_Mavic_4.png",
    djimini4:   "/images/mini4.png",
    djiair3s:   "/images/airs3.png",
    djiosmo3:   "/images/osmo 3.png",
    djiosmo7:   "/images/osmo7pro.png",
    djigoggles: "/images/djiG.png",
    djimic2:    "/images/djimic2.png",
    djimicmini: "/images/djimicmini.png",
    ps5:    "/images/Sony PS5.png",
    xboxx:  "/images/xbox.png",
    xboxs:  "/images/xboxs.png",
    dysonv15:       "/images/v15.png",
    dysonairwrap:   "/images/dyson.png",
    dysonsupersonic:"/images/supersonic.png",
    yandex2:   "/images/yandex.png",
    yandexmax: "/images/yandexmax.png",
    rayban: "/images/ray-ban.png",
    whoop: "/images/whoop.png",
    plaud: "/images/plaude.png",
  };

  const products = [
    // ── iPhone 17 ────────────────────────────────────────────────────────────
    { name: "iPhone 17 Pro Max 256GB",      slug: "iphone-17-pro-max-256",      description: "iPhone 17 Pro Max — абсолютный флагман Apple, воплощающий всё лучшее, что современные технологии могут предложить в формате смартфона. Создан для тех, кто не готов идти на компромисс ни в одной категории.\n\nВ основе устройства лежит чип A18 Pro на 3-нм архитектуре. Шестиядерный CPU на 15% быстрее предшественника, шестиядерный GPU поддерживает аппаратную трассировку лучей. Нейронный движок 38 трлн операций в секунду обеспечивает работу Apple Intelligence локально, без передачи данных в облако: редактирование текстов, генерация изображений, расширенный Siri с пониманием контекста — всё приватно и мгновенно.\n\nСистема камер включает основную 48 Мп с апертурой f/1.78, телефото 5× зума с эквивалентом 120 мм и сверхширокоугольную 48 Мп с автофокусом для макросъёмки. ProRes 4K при 120 кадрах в секунду — уровень, недоступный ни одному другому смартфону. Camera Control — сапфировая кнопка на правой грани — открывает камеру без разблокировки и управляет зумом скольжением.\n\nКорпус из титана 5 марки весит 227 г при диагонали 6.9 дюйма. Дисплей Super Retina XDR с ProMotion 1–120 Гц, яркостью 2000 нит и Always-On Display. Батарея до 33 часов видео. Защита IP68 (6 м, 30 мин). ABC Store — оригинальная запечатанная упаковка, доставка в день заказа.",                      price: 119900, oldPrice: 129900, isFeatured: false,  isPublished: true, imageUrl: IMG.ip17promax, specs: SPEC.ip17pmax,  categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 17 Pro Max 512GB",      slug: "iphone-17-pro-max-512",      description: "iPhone 17 Pro Max 512 ГБ — для тех, кто снимает ProRes 4K 120fps и хранит медиатеку на устройстве без компромиссов. Все характеристики идентичны модели 256 ГБ — чип A18 Pro, камера Hasselblad-уровня, титановый корпус, 33 часа автономности.\n\nA18 Pro на 3-нм архитектуре обеспечивает производительность, сопоставимую с ноутбуками среднего класса. Apple Intelligence работает локально: Writing Tools, Priority Notifications, Genmoji, Image Playground и расширенный Siri с интеграцией ChatGPT — без отправки персональных данных в облако.\n\nКамера 48 Мп собирает на 22% больше света по сравнению с предыдущим поколением. Телефото 5× (120 мм) идеально для портретов и уличной съёмки. ProRes 4K 120fps записывается на внутренний SSD со скоростью USB 3 — никаких ограничений при длинных съёмочных сессиях. Camera Control переосмысляет управление камерой одной рукой.\n\nДисплей Super Retina XDR 6.9\" с ProMotion и Always-On. Titanium Grade 5, матовое стекло с нанотекстурой, IP68. Доставка ABC Store в день заказа по Москве.",                                                      price: 134900, oldPrice: null,    isFeatured: true,  isPublished: true, imageUrl: IMG.ip17promax, specs: SPEC.ip17pmax,  categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 17 Pro 256GB",          slug: "iphone-17-pro-256",          description: "iPhone 17 Pro — профессиональный инструмент в компактном корпусе 6.3 дюйма. Идентичная вычислительная мощность A18 Pro, полный набор камер и все функции Apple Intelligence — при весе 199 г, удобном для одноручного использования.\n\nA18 Pro с нейронным движком 38 трлн оп/с обрабатывает задачи Apple Intelligence локально. Siri понимает контекст многоэтапных запросов, Writing Tools редактирует тексты в любом приложении, Visual Intelligence через Camera Control распознаёт объекты, здания и QR-коды в реальном времени без дополнительных действий.\n\nТройная камера: основная 48 Мп f/1.78, телефото 5× (120 мм), сверхширокоугольная 48 Мп с автофокусом для макро с дистанции 2 см. ProRes 4K 120fps. Camera Control — сапфировая кнопка на правой грани — запускает камеру без разблокировки, управляет зумом касанием, переключает режимы двойным нажатием. Разработчики сторонних приложений интегрируют поддержку через API.\n\nTitanium 5 марки, матовая нанотекстура, IP68. Дисплей Super Retina XDR 6.3\" ProMotion 120 Гц, Always-On Display, 2000 нит пик. Батарея до 27 часов видео.",                   price: 104900, oldPrice: null,    isFeatured: true,  isPublished: true, imageUrl: IMG.ip17pro,    specs: SPEC.ip17pro,   categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 17 Pro 512GB",          slug: "iphone-17-pro-512",          description: "iPhone 17 Pro 512 ГБ — версия для фотографов, видеографов и всех, кто хранит рабочие материалы непосредственно на устройстве. RAW-снимки 48 Мп, ProRes 4K 120fps видео и проекты Apple Intelligence заполняют хранилище быстро — 512 ГБ дают запас на месяцы интенсивной работы.\n\nA18 Pro идентичен 256 ГБ-версии: 3-нм архитектура, аппаратная трассировка лучей GPU, нейронный движок 38 трлн оп/с. Производительность без ограничений независимо от объёма SSD. Apple Intelligence полный набор функций: умное реферирование, генерация изображений, расширенный Siri.\n\nКамера 48 Мп с Photonic Engine, телефото 5× зума, сверхширокоугольная 48 Мп с макро. ProRes 4K 120fps пишется прямо на внутренний накопитель — никаких компромиссов со скоростью. Camera Control для управления камерой одной рукой.\n\nTitanium Grade 5, IP68, дисплей 6.3\" Super Retina XDR ProMotion 120 Гц. Батарея до 27 часов. Четыре расцветки матового титана. Оригинальная гарантия ABC Store.",                                                                         price: 119900, oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.ip17pro,    specs: SPEC.ip17pro,   categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 17 128GB",              slug: "iphone-17-128",              description: "iPhone 17 — самый тонкий iPhone в истории Apple толщиной 5.1 мм. Обновлённый алюминиевый корпус серии 7000, чип A18 и полная поддержка Apple Intelligence делают его наиболее значимым обновлением базовой линейки за последние годы.\n\nA18 на 3-нм архитектуре в полтора раза быстрее A15 из iPhone 14. Нейронный движок обеспечивает весь спектр Apple Intelligence: Writing Tools, умная сортировка уведомлений Priority Notifications, Genmoji, Image Playground, Siri с интеграцией ChatGPT. Впервые в базовой линейке — полноценный ИИ-ассистент без облачной передачи данных.\n\nCamera Control — кнопка, дебютировавшая в Pro, теперь доступна в базовой модели. Камера 48 Мп с апертурой f/1.6 — самый светлый объектив базовой серии. Fusion Camera объединяет данные нескольких сенсоров для максимального качества кадра. Action Button настраивается под любую функцию. USB-C с зарядкой 45 Вт.\n\nДисплей Super Retina XDR 6.1\" с ProMotion 120 Гц. Dynamic Island. Пять цветов корпуса. Ceramic Shield. IP68. Батарея до 22 часов видео.",                                               price: 84900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.ip17,       specs: SPEC.ip17,      categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 17 256GB",              slug: "iphone-17-256",              description: "iPhone 17 256 ГБ — оптимальный выбор для тех, кому 128 ГБ не хватает для фото, видео и приложений. Все характеристики идентичны базовой версии: чип A18, Camera Control, Apple Intelligence, дисплей ProMotion 120 Гц.\n\nA18 обрабатывает все задачи Apple Intelligence локально: редактирование текстов Writing Tools, генерация персонализированных эмодзи Genmoji, умный анализ переписки, расширенный Siri. 256 ГБ хранят несколько тысяч фото в формате 48 Мп или десятки часов видео Dolby Vision 4K.\n\nCamera Control запускает камеру без разблокировки, управляет зумом и режимами одной рукой. Камера 48 Мп f/1.6 с Photonic Engine и Fusion Camera. Портретный режим работает автоматически — для людей, животных и объектов. Action Button под любую функцию.\n\nТолщина 5.1 мм, вес 170 г, алюминий 7000-й серии, Ceramic Shield, IP68. Дисплей 6.1\" Super Retina XDR ProMotion 120 Гц. Dynamic Island. USB-C 45 Вт. Батарея до 22 часов.",                                                                             price: 94900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.ip17,       specs: SPEC.ip17,      categoryId: smartphones.id, brandId: apple.id },
    // ── iPhone 16 ────────────────────────────────────────────────────────────
    { name: "iPhone 16 Pro Max 256GB",      slug: "iphone-16-pro-max-256",      description: "iPhone 16 Pro Max — флагман Apple прошлого поколения, который с выходом серии 17 стал исключительно привлекательным по соотношению цены и возможностей. Чип A18 Pro, дебютный Camera Control, профессиональная система камер с 5× зумом и ProRes 4K.\n\nA18 Pro на 3-нм архитектуре превосходит большинство Android-флагманов по производительности CPU и GPU. Нейронный движок обеспечивает Apple Intelligence: умные ответы в почте, Writing Tools, расширенный Siri. Camera Control — сапфировая кнопка — впервые появилась именно в iPhone 16 Pro. Visual Intelligence через Camera Control мгновенно находит информацию об объектах в кадре без ручного поиска.\n\nОсновная камера 48 Мп f/1.78, телефото 5× (120 мм) для профессиональных портретов, сверхширокоугольная 48 Мп с автофокусом для макро. ProRes 4K 120fps с записью на внешний SSD. Audio Mix адаптирует звук записи в реальном времени.\n\nТитановый корпус Desert Titanium, Natural, Black или White Titanium. Дисплей 6.9\" Super Retina XDR ProMotion, 2000 нит пик, Always-On. IP68. Батарея до 33 часов. Выгоднее новой модели — при идентичном чипе и камерах.",                                                  price: 99900,  oldPrice: 109900, isFeatured: false,  isPublished: true, imageUrl: IMG.ip16promax, specs: SPEC.ip16pmax,  categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 16 Pro 256GB",          slug: "iphone-16-pro-256",          description: "iPhone 16 Pro — компактный профессиональный смартфон 6.3 дюйма с чипом A18 Pro и дебютным Camera Control. После выхода iPhone 17 серии цена стала значительно привлекательнее при полностью актуальных характеристиках.\n\nA18 Pro обеспечивает производительность уровня профессиональных ноутбуков: Xcode компилирует проекты за секунды, Lightroom обрабатывает RAW мгновенно, мобильные игры с трассировкой лучей работают плавно. Apple Intelligence полный набор: Writing Tools, Priority Notifications, Genmoji, расширенный Siri.\n\nCamera Control впервые появилась в iPhone 16 Pro: сапфировая кнопка на правой грани открывает камеру без разблокировки, управляет зумом скольжением, запускает Visual Intelligence удержанием. Тройная камера 48 Мп + 5× телефото + 48 Мп сверхширокоугольная. ProRes 4K 120fps.\n\nTitanium 5 марки, IP68. Дисплей 6.3\" Super Retina XDR ProMotion 120 Гц, 2000 нит. Батарея до 27 часов. Четыре расцветки матового титана.",                                                     price: 89900,  oldPrice: 99900,  isFeatured: false, isPublished: true, imageUrl: IMG.ip16pro,    specs: SPEC.ip16pro,   categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 16 128GB",              slug: "iphone-16-128",              description: "iPhone 16 — смартфон, с которого началась эра Camera Control и Apple Intelligence в базовой линейке Apple. Три принципиальных обновления: Dynamic Island, Camera Control и чип A18 с полной поддержкой ИИ-функций.\n\nA18 на 3-нм архитектуре обеспечивает производительность, достаточную для всех задач Apple Intelligence. Впервые в базовой линейке доступны Writing Tools для редактирования текстов, умная сортировка уведомлений, Siri с пониманием контекста и интеграцией ChatGPT. Camera Control открывает камеру без разблокировки и запускает Visual Intelligence для контекстного поиска.\n\nОсновная камера 48 Мп f/1.6 с Photonic Engine и Fusion Camera. Портретный режим автоматически для людей, животных, объектов. Action Button — настраиваемая быстрая клавиша. USB-C с зарядкой 45 Вт. Dynamic Island с Live Activities.\n\nАлюминий 7000, Ceramic Shield, IP68. Дисплей 6.1\" Super Retina XDR ProMotion 120 Гц. Пять цветов. Батарея до 22 часов. Семь лет обновлений iOS гарантированы.",                                                         price: 74900,  oldPrice: 84900,  isFeatured: false, isPublished: true, imageUrl: IMG.ip16,       specs: SPEC.ip16,      categoryId: smartphones.id, brandId: apple.id },
    // ── iPhone 15 ────────────────────────────────────────────────────────────
    { name: "iPhone 15 Pro Max 256GB",      slug: "iphone-15-pro-max-256",      description: "iPhone 15 Pro Max вошёл в историю как первый iPhone с титановым корпусом и первый с 5-кратным оптическим зумом в серии Pro Max. Сегодня это один из наиболее выгодных способов получить флагманские технологии Apple с хорошей скидкой.\n\nA17 Pro — первый в мире мобильный процессор на 3-нм архитектуре — по производительности превосходит большинство Android-флагманов последнего поколения. GPU с аппаратной трассировкой лучей обеспечил портирование AAA-игр на iPhone. Действие Button заменило переключатель звука — теперь это программируемая клавиша быстрого доступа.\n\nПереход на USB-C с поддержкой стандарта USB 3 (10 Гбит/с) принципиально изменил рабочий процесс: ProRes 4K записывается на внешний SSD в реальном времени, перенос видео на MacBook занимает секунды. Телефото 5× (120 мм) — впервые в Pro Max. Основная 48 Мп с Photonic Engine, сверхширокоугольная с автофокусом для макро.\n\nТитан 5 марки на 19 г легче нержавеющей стали. Dynamic Island. Дисплей 6.7\" ProMotion 120 Гц. IP68. Батарея до 29 часов.",                                                      price: 84900,  oldPrice: 99900,  isFeatured: false, isPublished: true, imageUrl: IMG.ip15promax, specs: SPEC.ip15pmax,  categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 15 Pro 256GB",          slug: "iphone-15-pro-256",          description: "iPhone 15 Pro — компактный профессиональный смартфон, в котором Apple впервые объединила титановый корпус, USB 3 и Action Button в одном устройстве. При актуальной цене — исключительное предложение для тех, кто хочет Pro-возможности без переплаты.\n\nA17 Pro на 3-нм техпроцессе обеспечивает производительность CPU выше, чем у большинства ноутбуков на Intel Core i5. GPU с трассировкой лучей открыл iPhone для игр консольного уровня. Action Button — программируемая клавиша для запуска камеры, диктофона, фонарика или любой функции Быстрых команд без разблокировки.\n\nUSB-C с USB 3 (10 Гбит/с) заменил Lightning. ProRes 4K 30fps на внутреннюю память, 60fps — на внешний SSD. Тройная камера: 48 Мп f/1.78, телефото 3× (77 мм), сверхширокоугольная с автофокусом для макро от 2 см.\n\nТитан 5 марки, 187 г, IP68. Дисплей 6.1\" Super Retina XDR ProMotion 120 Гц. Dynamic Island. Батарея до 23 часов.",                                                                    price: 74900,  oldPrice: 89900,  isFeatured: false, isPublished: true, imageUrl: IMG.ip15pro,    specs: SPEC.ip15pro,   categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 15 128GB",              slug: "iphone-15-128",              description: "iPhone 15 — переломная модель для базовой линейки: первый не-Pro iPhone с Dynamic Island, первый с камерой 48 Мп и первый с USB-C. Три принципиальных обновления в одной модели делают iPhone 15 лучшей точкой входа для тех, кто переходит с iPhone 12, 13 или 14.\n\nЧип A16 Bionic, ранее устанавливавшийся только в Pro-версии iPhone 14, обеспечивает пятилетний запас производительности. Photonic Engine — технология обработки снимков до сжатия — прежде была доступна только в Pro-моделях. Камера 48 Мп с попиксельным биннингом позволяет кадрировать снимок после съёмки без потери качества.\n\nUSB-C открывает экосистему аксессуаров: один кабель для iPhone, iPad, MacBook и AirPods. Dynamic Island — интерактивная зона вокруг фронтальной камеры — отображает Live Activities в реальном времени. Cinematic Video для съёмки с профессиональным боке и сменой фокуса после записи.\n\nАлюминий, Ceramic Shield, IP68. Дисплей 6.1\" Super Retina XDR. Пять цветов. Батарея до 20 часов.",                                                                      price: 64900,  oldPrice: 74900,  isFeatured: false, isPublished: true, imageUrl: IMG.ip15,       specs: SPEC.ip15,      categoryId: smartphones.id, brandId: apple.id },
    // ── iPhone 14 ────────────────────────────────────────────────────────────
    { name: "iPhone 14 Pro Max 256GB",      slug: "iphone-14-pro-max-256",      description: "iPhone 14 Pro Max — модель, в которой Apple впервые представила Dynamic Island и Always-On Display, навсегда изменив интерфейс смартфона. Эти функции, дебютировавшие именно здесь, стали стандартом для всей линейки Pro. Сегодня — мощный флагман по цене значительно ниже актуальных моделей.\n\nDynamic Island превратила вырез фронтальной камеры в интерактивный элемент интерфейса: адаптируется под входящий звонок, Live Navigation, таймер, AirDrop, воспроизведение музыки и статус Face ID. Always-On Display показывает время, уведомления и виджеты без включения полного экрана.\n\nA16 Bionic на 4-нм архитектуре получит обновления iOS до 2027 года. Камера 48 Мп — дебют нового сенсора в Pro Max. Телефото 3× (77 мм). ProRes 4K 30fps. Экран 6.7\" Super Retina XDR ProMotion 120 Гц с Always-On.\n\nНержавеющая сталь, Ceramic Shield, IP68. Четыре расцветки Deep Purple, Gold, Silver, Space Black. Батарея до 29 часов.",                                                   price: 69900,  oldPrice: 84900,  isFeatured: false, isPublished: false, imageUrl: IMG.ip14promax, specs: SPEC.ip14pmax,  categoryId: smartphones.id, brandId: apple.id },
    { name: "iPhone 14 128GB",              slug: "iphone-14-128",              description: "iPhone 14 — доступный вход в современную экосистему Apple с функциями безопасности, которые могут спасти жизнь. Emergency SOS через спутник вызывает экстренные службы без сотовой связи. Crash Detection автоматически определяет ДТП и вызывает помощь.\n\nA15 Bionic, ранее устанавливавшийся только в Pro-серии iPhone 13, обеспечивает производительность выше среднего Android за ту же цену. iOS оптимизирована под аппаратное обеспечение Apple — скорость стабильна спустя годы использования. Обновления гарантированы до 2027 года.\n\nКамера 12 Мп f/1.5 с Photonic Engine и Action Mode для экстремальной стабилизации при движении. Cinematic Video. Портретный режим. Пять цветовых вариантов в алюминиевом корпусе с Ceramic Shield. IP68 (6 м, 30 мин).\n\nFace ID. Apple Pay. Dynamic Island отсутствует — это стандартный вырез, но Dynamic Island доступен начиная с iPhone 15 при обновлении. Дисплей 6.1\" Super Retina XDR. Батарея до 20 часов. Стартовая цена для входа в экосистему Apple.",                                                     price: 54900,  oldPrice: 64900,  isFeatured: false, isPublished: false, imageUrl: IMG.ip14,       specs: SPEC.ip14,      categoryId: smartphones.id, brandId: apple.id },
    // ── Samsung Galaxy ────────────────────────────────────────────────────────
    { name: "Samsung Galaxy S26 Ultra",     slug: "samsung-galaxy-s26-ultra",   description: "Флагман 2026 года с чипом Snapdragon 8 Elite Gen 5, камерой 200 Мп и встроенным S Pen. Privacy Display защищает экран от посторонних взглядов. Алюминиевый корпус, 5000 мАч, зарядка 65Вт.",                                          price: 129900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: "/images/samsung-galaxy-s26-ultra/black.png", specs: SPEC.s26ultra,  categoryId: smartphones.id, brandId: samsung.id },
    { name: "Samsung Galaxy S26+",          slug: "samsung-galaxy-s26-plus",    description: "Флагман среднего размера 2026 года с Snapdragon 8 Elite Gen 5 и Galaxy AI нового поколения. 6.7\" Dynamic AMOLED, тройная камера 50 Мп, 4900 мАч.",                                                                                              price: 109900, oldPrice: 119900, isFeatured: false, isPublished: true, imageUrl: "/images/samsung-galaxy-s26-plus/s26purple-removebg-preview.png", specs: SPEC.s26plus,   categoryId: smartphones.id, brandId: samsung.id },
    { name: "Samsung Galaxy S26",           slug: "samsung-galaxy-s26",         description: "Компактный флагман 2026 года с Snapdragon 8 Elite Gen 5. Теперь стартует с 256GB. 6.2\" Dynamic AMOLED, Galaxy AI, обновлённая тройная камера 50 Мп.",                                                                                              price: 89900,  oldPrice: 99900,  isFeatured: false, isPublished: true, imageUrl: "/images/samsung-galaxy-s26/s26white-removebg-preview.png", specs: SPEC.s26,       categoryId: smartphones.id, brandId: samsung.id },
    { name: "Samsung Galaxy S25 Edge",      slug: "samsung-galaxy-s25-edge",    description: "Самый тонкий Samsung Galaxy — всего 5.8мм. Titanium корпус, Snapdragon 8 Elite, камера 200 Мп, 3900 мАч. Corning Gorilla Glass Ceramic 2. Уникальный форм-фактор для тех кто ценит стиль.",                                                         price: 109900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: null, specs: SPEC.s25edge,   categoryId: smartphones.id, brandId: samsung.id },
    { name: "Samsung Galaxy Z Fold 7",      slug: "samsung-galaxy-z-fold-7",    description: "Samsung Galaxy Z Fold 7 — наиболее совершенный складной смартфон в истории мобильной индустрии. Thin Flex Hinge нового поколения рассчитан на 200 000 циклов складывания, корпус на 11% тоньше предшественника — помещается в карман брюк.\n\nВнутренний экран Dynamic AMOLED 2X 7.6 дюйма с шириной 158 мм в развёрнутом состоянии — полноценный планшет. Три приложения одновременно в Multi-Window без компромиссов. Документы формата A4 в натуральном масштабе. DeX-режим при подключении к монитору превращает устройство в компьютер.\n\nSnapdragon 8 Elite — та же платформа, что в Galaxy S25 Ultra. Камера 200 Мп основная, телефото 10×, внутренняя фронтальная камера скрыта под экраном. Flex Mode — половинчатое сложение как встроенная подставка для видеозвонков и таймерной съёмки.\n\nВнешний экран 6.3\" для использования в сложенном виде. Galaxy AI полный набор. IPX8. Gorilla Glass Victus 2.",                                                          price: 179900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: "/images/samsung-galaxy-z-fold-7/black.png", specs: SPEC.zfold7,    categoryId: smartphones.id, brandId: samsung.id },
    { name: "Samsung Galaxy Z Flip 7",      slug: "samsung-galaxy-z-flip-7",    description: "Samsung Galaxy Z Flip 7 — складной смартфон, переосмысливший понятие компактности. В сложенном состоянии помещается в маленький карман или кошелёк. В раскрытом — полноценный флагман 6.7 дюйма на Snapdragon 8 Elite.\n\nThin Flex Hinge нового поколения обеспечивает плоское складывание без зазора. Внешний экран FlexWindow 3.4 дюйма — полноценный интерфейс без раскрытия: уведомления, ответы на сообщения, управление музыкой, камера для селфи. Более 30% функций доступны через внешний экран без открытия.\n\nFlex Mode — полусложенное положение как встроенный штатив: нижняя половина управляет, верхняя показывает. Идеально для видеозвонков с руками свободно, рецептов и авто-фото по таймеру. Auto Framing в Flex Mode следит за движением объекта автоматически.\n\nSnapdragon 8 Elite, камера 50 Мп двойная, Dynamic AMOLED 2X 6.7\" 120 Гц. Батарея 4000 мАч, зарядка 25 Вт. Восемь цветов. Семь лет обновлений. IPX8.",                                  price: 119900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: "/images/samsung-galaxy-z-flip-7/black-removebg-preview.png", specs: SPEC.zflip7,    categoryId: smartphones.id, brandId: samsung.id },
    // ── MacBook ───────────────────────────────────────────────────────────────
    { name: "MacBook Air 13\" M4 16GB/256GB",  slug: "macbook-air-13-m4-256",   description: "MacBook Air 13 с чипом M4 — самый продаваемый ноутбук Apple и один из самых популярных ноутбуков в мире. Абсолютная бесшумность, 18 часов автономности и профессиональная производительность в корпусе 11.3 мм.\n\nM4 на второй итерации 3-нм архитектуры — в 1.5 раза быстрее M2 при вдвое лучшей энергоэффективности. Десятиядерный CPU, десятиядерный GPU, нейронный движок 38 трлн оп/с. Нет вентилятора — абсолютная тишина при любой нагрузке. Компиляция React-проекта, экспорт 4K в Final Cut, обработка RAW в Lightroom — без звука и перегрева.\n\nАвтономность 18 часов воспроизведения видео — реальный показатель при смешанной нагрузке (браузер, код, почта). MagSafe 3 заряжает до 50% за 30 минут от 67 Вт адаптера. 16 ГБ унифицированной памяти с пропускной способностью 120 ГБ/с разделяются между CPU и GPU без задержек.\n\nЭкран Liquid Retina 13.6\" 2560×1664 пикселей, P3, True Tone. Порты: MagSafe 3, два Thunderbolt 4, 3.5 мм. Три расцветки: Midnight, Starlight, Sky Blue. Вес 1.24 кг.",                                                       price: 109900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.mba13m4,    specs: SPEC.mba13_256, categoryId: laptops.id,     brandId: apple.id },
    { name: "MacBook Air 13\" M4 16GB/512GB",  slug: "macbook-air-13-m4-512",   description: "MacBook Air 13 с M4 и накопителем 512 ГБ — оптимальная конфигурация для профессионалов. Дизайнер хранит все активные проекты локально, разработчик держит несколько виртуальных машин, видеограф сохраняет исходники съёмок. Все характеристики идентичны модели 256 ГБ — M4, 18 часов, полная тишина.\n\nM4 на второй итерации 3-нм архитектуры. Десятиядерный CPU и десятиядерный GPU обеспечивают рендеринг видео 4K в Final Cut в реальном времени, обработку тысяч RAW-снимков в Capture One, работу с 3D-сценами средней сложности. Нейронный движок 38 трлн оп/с для Apple Intelligence: реферирование документов, Writing Tools, умные ответы в почте.\n\nSSD 512 ГБ со скоростью чтения 3700 МБ/с: открытие проекта Figma с сотнями фреймов за секунды, виртуальная машина Ubuntu стартует за 8 секунд. Unified memory architecture — SSD используется как расширение RAM без традиционных узких мест.\n\nЭкран Liquid Retina 13.6\" P3 True Tone. MagSafe 3, два Thunderbolt 4. Вес 1.24 кг, толщина 11.3 мм.",                                                        price: 124900, oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.mba13m4,    specs: SPEC.mba13_512, categoryId: laptops.id,     brandId: apple.id },
    { name: "MacBook Air 15\" M4 16GB/512GB",  slug: "macbook-air-15-m4-512",   description: "MacBook Air 15 с M4 — выбор тех, кто ценит большой экран, но не хочет тяжёлого корпуса профессионального ноутбука. Рабочее пространство на 20% больше, чем у 13-дюймовой модели — при весе 1.51 кг и толщине 11.5 мм.\n\nM4 идентичен модели 13 дюймов — Apple не ограничивает производительность ради размера. Десятиядерный CPU, десятиядерный GPU, нейронный движок 38 трлн оп/с. Та же абсолютная тишина — нет вентилятора. Та же автономность 18 часов воспроизведения видео.\n\nЭкран Liquid Retina 15.3\" с разрешением 2880×1864 пикселей и плотностью 224 PPI — текст как напечатанный на бумаге. P3, True Tone. При работе с многоколоночными таблицами, Premiere Pro с временной линейкой и окном предпросмотра 4K — всё умещается без перекрытий. Шесть динамиков с Spatial Audio и Dolby Atmos.\n\nMagSafe 3, два Thunderbolt 4. SSD 512 ГБ. Поддержка двух внешних мониторов при закрытой крышке. Три расцветки.",                                                              price: 139900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.mba15m4,    specs: SPEC.mba15,     categoryId: laptops.id,     brandId: apple.id },
    { name: "MacBook Pro 14\" M4 24GB/512GB",  slug: "macbook-pro-14-m4-512",   description: "MacBook Pro 14 с M4 — профессиональный ноутбук с системой активного охлаждения, позволяющей чипу работать на пике без ограничений. При продолжительной нагрузке на 15–20% быстрее MacBook Air M4 благодаря отсутствию теплового троттлинга.\n\nM4 с десятиядерным CPU, десятиядерным GPU и нейронным движком 38 трлн оп/с. Компиляция Swift-проекта за 45 секунд против 4 минут на аналогичном по цене ноутбуке Intel. Рендер 4K 10 мин в Final Cut Pro — 6 минут с Media Engine.\n\nЭкран Liquid Retina XDR 14.2\" с мини-LED 2596 зон подсветки, яркостью 1000 нит стандартной и 1600 нит HDR, ProMotion 24–120 Гц. Полный набор портов без адаптеров: три Thunderbolt 4, HDMI 2.1, SD UHS-II, MagSafe 3. До 24 часов автономности.\n\n24 ГБ унифицированной памяти, 120 ГБ/с. Нотч с Face ID. Space Black или Silver. Вес 1.55 кг.",                                                                 price: 179900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: "/images/macbook-air-13-m4/midnight.png",    specs: SPEC.mbp14,     categoryId: laptops.id,     brandId: apple.id },
    { name: "MacBook Pro 14\" M4 Pro 24GB/512GB", slug: "macbook-pro-14-m4-pro-512", description: "MacBook Pro 14 с M4 Pro — для задач, где базового M4 уже недостаточно. Четырнадцатиядерный CPU (10 производительных + 4 эффективных ядра) и двадцатиядерный GPU в 1.5 раза быстрее базового M4 при многопоточной нагрузке.\n\nM4 Pro идеален для видеомонтажа ProRes 4K без прокси в DaVinci Resolve, 3D-рендеринга в Blender, виртуализации нескольких ОС одновременно, обучения нейросетей на локальных данных. 24 ГБ унифицированной памяти с пропускной способностью 273 ГБ/с — в два раза выше, чем у базового M4. Media Engine с аппаратным ускорением ProRes: экспорт 60 минут 4K ProRes за 12 минут.\n\nЭкран Liquid Retina XDR 14.2\" ProMotion 120 Гц, 1000/1600 нит. Три Thunderbolt 5 (120 Гбит/с), HDMI 2.1, SD UHS-II, MagSafe 3. Face ID. Батарея до 24 часов.\n\nДля архитектора, видеографа, iOS-разработчика или ML-инженера — это рабочая станция, которая всегда с собой.",                                                          price: 219900, oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: "/images/macbook-air-13-m4/midnight.png",    specs: SPEC.mbp14pro,  categoryId: laptops.id,     brandId: apple.id },
    { name: "MacBook Pro 16\" M4 Pro 24GB/512GB", slug: "macbook-pro-16-m4-pro-512", description: "MacBook Pro 16 с M4 Pro — флагманский ноутбук Apple для профессионалов, которым нужен максимальный экран, максимальная производительность и максимальная автономность. Для кинорежиссёров, 3D-аниматоров и инженеров.\n\nM4 Pro с четырнадцатиядерным CPU и двадцатиядерным GPU обеспечивает производительность, конкурентоспособную с настольной рабочей станцией Mac Studio базовой конфигурации. В Unreal Engine 5 кадр в 4K с Lumen рендерится за 8 секунд. Полная компиляция крупного Go-проекта — менее минуты. 24 ГБ RAM, 273 ГБ/с пропускной способности.\n\nЭкран Liquid Retina XDR 16.2\" с разрешением 3456×2234, ProMotion 24–120 Гц, 1000/1600 нит — рабочее пространство, в котором Premiere Pro с временной линейкой, After Effects и предпросмотром 4K умещаются одновременно. Три Thunderbolt 5, HDMI 2.1, SD UHS-II, MagSafe 3.\n\nАккумулятор 100 Вт⋅ч, до 24 часов видео. MagSafe 140 Вт — 50% за 30 минут. Вес 2.14 кг. Space Black или Silver.",                                                   price: 259900, oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: "/images/macbook-air-15-m4/midnight.png",    specs: SPEC.mbp16,     categoryId: laptops.id,     brandId: apple.id },
    // ── AirPods ───────────────────────────────────────────────────────────────
    { name: "AirPods 4",                    slug: "airpods-4",                  description: "AirPods 4 — четвёртое поколение беспроводных наушников Apple с переработанной эргономикой на основе данных о форме миллионов человеческих ушей. Надёжная посадка без силиконовых амбушюров — не выпадают при беге, удобнее ушных вкладышей при долгом ношении.\n\nЧип H2 — тот же, что в AirPods Pro 2 — обеспечивает персонализированный пространственный звук с отслеживанием движений головы: при просмотре фильмов звук привязан к экрану, как в кинотеатре. Адаптивный эквалайзер подстраивает тональный баланс под акустику конкретного уха. Conversation Awareness снижает громкость и усиливает голоса при разговоре — не нужно снимать наушники.\n\nАвтономность 6 часов на одном заряде наушников, до 30 часов с кейсом USB-C. Пять минут зарядки — 1 час прослушивания. Автоматическое переключение между устройствами Apple. Find My для поиска потерявшихся наушников.\n\nKейс с беспроводной зарядкой Qi и MagSafe. Запросы к Siri без нажатий — голосом. Идеальные первые AirPods.",                                                      price: 14900,  oldPrice: 17900,  isFeatured: false, isPublished: true, imageUrl: IMG.ap4,        specs: SPEC.ap4,       categoryId: headphones_cat.id, brandId: apple.id },
    { name: "AirPods 4 ANC",                slug: "airpods-4-anc",              description: "AirPods 4 с ANC — принципиально новый класс наушников: открытая посадка без силиконовых вкладышей в сочетании с активным шумоподавлением. Apple решила задачу, которую многие считали технически невозможной.\n\nАктивное шумоподавление через два микрофона и алгоритмы чипа H2 снижает фоновый шум в офисе на 30 дБ — субъективно вчетверо тише. В метро подавляется низкочастотный гул, наиболее утомляющий при длинных поездках. Адаптивный звук Adaptive Audio выбирает между ANC и прозрачностью автоматически — при входе в магазин переключается на прозрачность, в метро — на ANC.\n\nConversation Awareness реагирует на собственную речь: как только говорите, музыка снижается, голоса усиливаются. Персонализированный пространственный звук с отслеживанием головы через чип H2.\n\nАвтономность 5 часов с ANC, 30 часов с кейсом USB-C + беспроводная зарядка MagSafe. Пять минут — 1 час прослушивания.",                                                                    price: 18900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.ap4,        specs: SPEC.ap4anc,    categoryId: headphones_cat.id, brandId: apple.id },
    { name: "AirPods Pro 2 (USB-C)",        slug: "airpods-pro-2-usb-c",        description: "AirPods Pro 2 — лучшие беспроводные наушники с ANC в классе TWS по результатам независимых тестов ведущих аудиоизданий мира. Шумоподавление настолько эффективно, что пользователи пересаживаются на них с накладных наушников.\n\nАNC второго поколения с алгоритмами H2 подавляет шум вдвое эффективнее первых AirPods Pro. Два микрофона — внешний и внутренний — работают в паре, вычитая шум микросекунда за микросекундой. В самолёте гул турбин исчезает настолько полно, что разборчивость речи улучшается без повышения громкости. Adaptive Audio постоянно находится в оптимальном промежуточном состоянии между ANC и прозрачностью.\n\nПерсонализированный пространственный звук с Dolby Atmos использует камеру TrueDepth iPhone для построения трёхмерной карты уха. IP54 — для тренировок в любую погоду. Четыре размера амбушюр с тестом посадки в iOS.\n\nUSB-C кейс. 6 часов с ANC, 30 часов суммарно. 5 минут — 1 час прослушивания.",                                                             price: 22900,  oldPrice: 26900,  isFeatured: true,  isPublished: true, imageUrl: IMG.appro2,     specs: SPEC.appro2,    categoryId: headphones_cat.id, brandId: apple.id },
    { name: "AirPods Max (USB-C)",          slug: "airpods-max-usb-c",          description: "AirPods Max — накладные наушники Apple, созданные для аудиофилов, не готовых жертвовать качеством звука ради компактности. Единственные наушники Apple с динамиком 40 мм, акустическим корпусом из алюминия и вязаными амбушюрами из дышащего текстиля.\n\nАкустическая архитектура разрабатывалась с нуля как Hi-Fi система, не как адаптация TWS-технологий. Динамик 40 мм с кастомным магнитным узлом воспроизводит диапазон 20 Гц — 20 кГц линейно. Девять микрофонов в каждом амбушюре: пять для ANC, четыре для прозрачности и звонков. Два чипа H2 обрабатывают данные 9000 раз в секунду.\n\nANC создаёт тишину уровня звукозаписывающей студии — сочетание пассивной изоляции амбушюров из памяти формы и активного подавления. Персонализированное пространственное аудио Dolby Atmos создаёт эффект личного кинотеатра при просмотре Apple TV+.\n\nUSB-C. 30 часов с активными ANC. 5 цветов: Midnight, Starlight, Blue, Purple, Orange. Алюминиевые чаши, стальная дуга, съёмные амбушюры.",                                                              price: 59900,  oldPrice: null,    isFeatured: true,  isPublished: true, imageUrl: IMG.apmax,      specs: SPEC.apmax,     categoryId: headphones_cat.id, brandId: apple.id },
    { name: "Beats Studio Pro",             slug: "beats-studio-pro",           description: "Beats Studio Pro — профессиональные накладные наушники с фирменным мощным звуком Beats, активным шумоподавлением и максимальной гибкостью подключения. В отличие от AirPods Max, одинаково хорошо работают с iPhone и Android, macOS и Windows, профессиональными аудиоинтерфейсами.\n\nАкустика Beats с акцентом на низкочастотный диапазон — для хип-хопа, электронной музыки и R&B это «живой» физический звук. Три варианта подключения: Bluetooth 5.3 с мультиточечным соединением к двум устройствам одновременно, USB-C для цифрового подключения к компьютеру без потерь, разъём 3.5 мм для аналогового подключения к DJ-оборудованию и бортовым системам самолёта.\n\nANC с тремя микрофонами снижает шум в офисе и транспорте. Прозрачный режим без снятия наушников. Персонализированный пространственный звук совместим с устройствами Apple через чип W1.\n\n40 часов автономности — заряжаете раз в неделю. USB-C быстрая зарядка: 10 минут — 3 часа. Складная конструкция с алюминиевыми чашами.",                                                     price: 29900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.beats,      specs: SPEC.beats_studio, categoryId: headphones_cat.id, brandId: beats.id },
    // ── Apple Watch ───────────────────────────────────────────────────────────
    { name: "Apple Watch Series 10",        slug: "apple-watch-series-10",      description: "Apple Watch Series 10 — самые тонкие Apple Watch в истории толщиной 9.7 мм, наиболее значимое обновление серии за последние годы. Практически не ощущается на запястье даже при долгом ношении.\n\nГлавное нововведение — датчик апноэ сна. Алгоритм на основе машинного обучения анализирует данные акселерометра ночью и выявляет признаки обструктивного апноэ. По статистике, каждый пятый человек имеет апноэ, не зная об этом — нелеченное апноэ ведёт к сердечно-сосудистым заболеваниям. ЭКГ с точностью 98.3%, непрерывный мониторинг ЧСС, SpO2, температурный датчик.\n\nДисплей OLED с Always-On на частоте 1 Гц, яркостью 2000 нит и углом обзора +40% относительно Series 4 при тех же размерах корпуса. Быстрая зарядка: 0 до 80% за 45 минут — достаточно зарядить во время утреннего душа.\n\nWR50, IP6X. 18 часов автономности. Алюминий или нержавеющая сталь. Шесть расцветок. Apple Pay. Emergency SOS.",                                                    price: 39900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.aws10,      specs: SPEC.aws10,     categoryId: wearables.id,      brandId: apple.id },
    { name: "Apple Watch Ultra 2",          slug: "apple-watch-ultra-2",        description: "Apple Watch Ultra 2 — профессиональный инструмент для экстремального спорта и экспедиций, созданный по стандартам военного снаряжения. Для ультрамарафонцев, альпинистов, дайверов и триатлетов.\n\nСертификат MIL-STD-810H подтверждает устойчивость к температурам от -20 до +55°C, ударным нагрузкам и соляному туману. Водонепроницаемость до 100 метров для рекреационного дайвинга с приложением Oceanic+. Двухдиапазонный GPS L1+L5 — точность 2 метра в городских каньонах и лесах, где обычный GPS теряет сигнал.\n\nДо 60 часов в стандартном GPS-режиме, до 72 часов в режиме Low Power — достаточно для ультрамарафона 100 км без зарядки. Сирена 86 дБ слышна на 600 метров в горах. Emergency SOS через спутник без сотовой связи. Дисплей OLED 49 мм с яркостью 3000 нит.\n\nKорпус титан Grade 6. Сапфировое стекло. Action Button. Три специализированных ремешка Alpine, Trail, Ocean.",                                        price: 89900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.awultra2,   specs: SPEC.awultra2,  categoryId: wearables.id,      brandId: apple.id },
    // ── Apple Vision Pro ──────────────────────────────────────────────────────
    { name: "Apple Vision Pro 256GB",       slug: "apple-vision-pro-256",       description: "Apple Vision Pro — первый пространственный компьютер в истории Apple. Это не VR-гарнитура — это принципиально новый тип взаимодействия с цифровым миром, где приложения существуют в физическом пространстве вокруг пользователя.\n\nДуэт чипов M2 и R1. M2 обрабатывает пространственный контент и приложения visionOS. R1 обрабатывает данные 12 камер, 5 сенсоров и 6 микрофонов с задержкой менее 12 мс — в 8 раз быстрее человеческого моргания. Дисплей — два микро-OLED с суммарным разрешением 23 млн пикселей (больше, чем в 4K телевизоре) при плотности 3386 PPI: текст читается как напечатанный на бумаге.\n\nУправление взглядом (точность <1°), сведением пальцев и голосом — без контроллеров. visionOS запускает все приложения iPad как плавающие окна произвольного размера. Apple TV+ — 30-метровый персональный IMAX. Пространственное видео iPhone 15 Pro/16 Pro — трёхмерные воспоминания.\n\nВнешняя батарея до 2 часов автономно, до 8 часов от розетки. 600 г. Регулируемые ремни Solo Knit и Dual Loop.",                                    price: 299900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.visionpro,  specs: SPEC.visionpro, categoryId: vision_cat.id,     brandId: apple.id },
    // ── PlayStation / Xbox ────────────────────────────────────────────────────
    { name: "PlayStation 5 Pro",            slug: "playstation-5-pro",          description: "PlayStation 5 Pro — самая мощная консоль Sony, созданная для максимального качества 4K-изображения. Технология PSSR (PlayStation Spectral Super Resolution) на основе машинного обучения реконструирует картинку до качества, превосходящего нативный 4K.\n\nGPU на 45% быстрее стандартной PS5. При трассировке лучей прирост достигает 60% — режим Верность теперь работает при 60fps вместо 30fps. Игры Spider-Man 2, Ratchet & Clank, Demon's Souls получили патчи PS5 Pro Enhanced. SSD 2 ТБ — больше не нужно удалять игры.\n\nDualSense с адаптивными триггерами физически имитирует сопротивление тетивы лука и отдачу оружия. Тактильная обратная связь с независимыми моторчиками создаёт физическую текстуру поверхностей. 3D Tempest Audio через обычные наушники — объёмный звук без специализированного оборудования.\n\nUltra HD Blu-ray. HDMI 2.1. VRR для синхронизации с OLED и QLED телевизорами. Библиотека эксклюзивов PlayStation: God of War, Spider-Man, Horizon, The Last of Us.",                                              price: 89900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.ps5,           specs: SPEC.ps5pro,    categoryId: gaming_cat.id,     brandId: sony.id },
    { name: "PlayStation 5 Slim",           slug: "playstation-5-slim",         description: "PlayStation 5 Slim — компактная версия флагманской консоли Sony, на 30% меньше оригинала по объёму. Та же игровая платформа в более изящном корпусе — идеальный вход в экосистему PlayStation.\n\nОдин и тот же процессор AMD Zen 2 и GPU RDNA 2 с 10.28 TFLOPS, тот же SSD со скоростью чтения 5.5 ГБ/с, те же технологии — трассировка лучей, 4K HDR, 120fps, 3D Audio. Полная совместимость со всей библиотекой PS5 без исключений.\n\nDualSense Wireless Controller с адаптивными триггерами и тактильной обратной связью — самый инновационный геймпад в истории консолей. 3D Tempest Audio Engine через обычные наушники создаёт точное пространственное позиционирование звука — конкурентное преимущество в мультиплеерных играх.\n\nUltra HD Blu-ray. SSD 1 ТБ с расширением через M.2 NVMe. Система охлаждения работает тихо до 38 дБ. PlayStation Plus — доступ к сотням игр по подписке.",                                                               price: 54900,  oldPrice: 59900,  isFeatured: true , isPublished: true, imageUrl: IMG.ps5,           specs: SPEC.ps5slim,   categoryId: gaming_cat.id,     brandId: sony.id },
    { name: "Xbox Series X",                slug: "xbox-series-x",              description: "Xbox Series X — самая мощная консоль Microsoft с GPU производительностью 12 TFLOPS. При нативном рендеринге 4K 60fps и трассировке лучей — эталонная платформа для игроков, которые хотят максимум без инвестиции в игровой PC.\n\nAMD Zen 2 8-ядерный CPU, GPU RDNA 2 12 TFLOPS с DirectX Raytracing. Forza Horizon 5 в 4K 60fps с трассировкой лучей. NVMe SSD 1 ТБ, 2.4 ГБ/с — загрузка в 40 раз быстрее Xbox One. Quick Resume удерживает пять игр в памяти с мгновенным переключением без сохранения.\n\nXbox Game Pass Ultimate открывает каталог 400+ игр: все первопартийные игры Microsoft в день релиза, EA Play, xCloud для игры на смартфоне. Обратная совместимость с тысячами игр Xbox One, Xbox 360 и оригинального Xbox — с улучшением до 4K и 60fps.\n\nГеймпад Xbox — отраслевой стандарт эргономики. HDMI 2.1. VRR и ALLM. Тихое охлаждение.",                                                                  price: 59900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.xboxx,           specs: SPEC.xseriesx,  categoryId: gaming_cat.id,     brandId: microsoft.id },
    { name: "Xbox Series S",                slug: "xbox-series-s",              description: "Xbox Series S — лучшее соотношение цены и возможностей на рынке игровых консолей. При трети цены Xbox Series X предлагает игры нового поколения в 1440p 120fps, мгновенную загрузку через NVMe SSD и полный доступ к Game Pass.\n\nAMD Zen 2 CPU и GPU RDNA 2 с 4 TFLOPS. DirectX Raytracing, VRS, Mesh Shaders — все технологии нового поколения. The Witcher 3, Cyberpunk 2077, Forza Horizon 5 работают в 1440p 60fps с трассировкой лучей. NVMe SSD 2.4 ГБ/с — мгновенная загрузка. Quick Resume для пяти игр одновременно.\n\nGame Pass Ultimate — 400+ игр по подписке. Все первопартийные игры Microsoft в день релиза. EA Play включён. xCloud для игры на телефоне. Minecraft, Roblox, FIFA для семей. Родительский контроль с тонкой настройкой.\n\nКорпус 2.8 литра — умещается за телевизором. Вес 1.93 кг. Тихое охлаждение. Геймпад Xbox Wireless. HDMI 2.1 4K 120fps через апскейлинг.",                                                         price: 34900,  oldPrice: 39900,  isFeatured: false, isPublished: true, imageUrl: IMG.xboxs,           specs: SPEC.xseriess,  categoryId: gaming_cat.id,     brandId: microsoft.id },
    // ── DJI дроны ─────────────────────────────────────────────────────────────
    { name: "DJI Mavic 4 Pro",              slug: "dji-mavic-4-pro",            description: "DJI Mavic 4 Pro — профессиональный аэросъёмочный комплекс с камерой Hasselblad. Партнёрство DJI с Hasselblad — шведским производителем среднеформатных камер с 85-летней историей — принесло цветопередачу на уровне профессиональных студийных систем.\n\nОсновной сенсор 4/3 дюйма 100 Мп с диафрагмой f/2.0–f/11 и оптической стабилизацией третьего поколения. Тройная объективная система: 24 мм для пейзажей, 70 мм для архитектуры, 166 мм для портретной аэросъёмки без смены высоты. ProRes 4K 120fps или CinemaDNG RAW для максимального контроля при постобработке.\n\nВремя полёта 45 минут — рекорд для складных профессиональных дронов. Дальность 20 км по OcuSync 4.0. Трансляция 1080p 60fps с задержкой 90 мс. Omnidirectional Obstacle Sensing третьего поколения с APAS 5.0 автоматически огибает препятствия без остановки полёта.\n\nДля рекламной, свадебной и документальной аэросъёмки — Mavic 4 Pro заменяет профессиональную кино-технику за значительно меньшие деньги.",                                 price: 149900, oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.dji,        specs: SPEC.mavic4,    categoryId: dji_cat.id,        brandId: dji.id },
    { name: "DJI Mini 4 Pro",               slug: "dji-mini-4-pro",             description: "DJI Mini 4 Pro — наиболее технологически совершенный дрон массой до 249 граммов. Граница 249 г имеет юридическое значение: в большинстве стран дроны до 250 г освобождены от обязательной регистрации и лицензирования.\n\nОсновная камера с сенсором 1/1.3 дюйма и апертурой f/1.7 — крупнейшая и самая светлая в истории серии Mini. 48 Мп, запись 4K 100fps в HDR. D-Log M для профессиональной цветокоррекции. Omnidirectional Obstacle Sensing со всех четырёх направлений и APAS 4.0 для автоматического облёта препятствий — страховка для новичков, свобода для опытных пилотов.\n\nActiveTrack 360° отслеживает объект на скорости до 55 км/ч с облётом препятствий. Для спортивной и свадебной съёмки — дрон работает сам, оператор составляет кадр.\n\nВремя полёта 34 минуты. Дальность 20 км. Скорость до 68 км/ч в режиме Sport. Режимы Normal и Cine для новичков.",                                               price: 79900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.djimini4,        specs: SPEC.mini4,     categoryId: dji_cat.id,        brandId: dji.id },
    { name: "DJI Air 3S",                   slug: "dji-air-3s",                 description: "DJI Air 3S занимает нишу между серией Mini и профессиональным Mavic, предлагая сенсор 1 дюйм в складном корпусе для операторов, которым нужно профессиональное качество без инвестиции в уровень Mavic Pro.\n\nСенсор 1/1-дюйм 50 Мп с апертурой f/1.8 обеспечивает 14 ступеней динамического диапазона — характеристика профессиональных кинокамер. Система двух камер: основная 1\" широкоугольная и телекамера 1/1.3\" с оптическим зумом 3× (70 мм). Запись 4K 60fps в HDR на обеих камерах одновременно.\n\nВремя полёта 46 минут — рекорд для дронов с 1-дюймовым сенсором. Omnidirectional Obstacle Sensing шести направлений с APAS 5.0. Дальность 20 км. Скорость 75 км/ч в Sport. D-Log M для постобработки.\n\nДля видеографов, снимающих свадьбы и коммерческие проекты — Air 3S обеспечивает качество, конкурентоспособное с более дорогими системами.",                                                price: 99900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.djiair3s,        specs: SPEC.air3s,     categoryId: dji_cat.id,        brandId: dji.id },
    // ── DJI камеры ────────────────────────────────────────────────────────────
    { name: "DJI Osmo Pocket 3",            slug: "dji-osmo-pocket-3",          description: "DJI Osmo Pocket 3 — карманная камера с встроенным трёхосевым механическим стабилизатором (gimbal). В отличие от электронной стабилизации смартфонов, механический gimbal физически компенсирует колебания: видео выглядит как снятое на операторской тележке даже при беге.\n\nСенсор 1 дюйм с апертурой f/2.0 — технологический прорыв для такого форм-фактора. Динамический диапазон и работа при слабом освещении сопоставимы с беззеркальными камерами начального уровня. Запись 4K 120fps — возможность кинематографического замедления в Ultra HD, уникальная в классе. D-Log M с 12.8 ступенями динамического диапазона для постобработки.\n\nПоворотный OLED-экран 1.4 дюйма вращается на 180° — для съёмки себя, мониторинга ракурсов снизу и сверху без слепых зон. ActiveTrack 3.0 следит за объектом через физический поворот всей платформы gimbal.\n\nАвтономность 166 минут. Для влогеров, путешественников и репортажной съёмки — незаменимый инструмент в кармане пиджака.",                                         price: 49900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.djiosmo3,        specs: SPEC.osmopocket3, categoryId: cameras_cat.id,  brandId: dji.id },
    { name: "DJI Osmo Mobile 7 Pro",        slug: "dji-osmo-mobile-7-pro",      description: "DJI Osmo Mobile 7 Pro — профессиональный стабилизатор для смартфонов седьмого поколения с встроенной LED-подсветкой. Превращает смартфон в профессиональную видеокамеру: трёхосевой механический gimbal компенсирует тряску при ходьбе и беге.\n\nActiveTrack 7.0 отслеживает людей, лица и транспортные средства на скорости до 35 км/ч. При частичном перекрытии объекта другим человеком — система восстанавливает трекинг автоматически. Shot Guide предлагает готовые операторские движения одним нажатием.\n\nВстроенная LED-панель 200 люмен с регулировкой цветовой температуры 2500–7000K и CRI≥95 — уникальная функция среди стабилизаторов для смартфонов. Для интервью в помещении, ночных влогов и фудфотографии — подсветка встроена, дополнительный свет не нужен.\n\nСкладная конструкция, раскрытие за 5 секунд. До 9 часов работы со встроенной зарядкой смартфона через USB-C. Совместим со смартфонами 67–90 мм шириной.",                                                    price: 19900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.djiosmo7,        specs: SPEC.osmomobile7, categoryId: cameras_cat.id,  brandId: dji.id },
    { name: "DJI Goggles 3",                slug: "dji-goggles-3",              description: "DJI Goggles 3 — FPV-очки с дисплеями Micro-OLED, открывающие полное погружение в полёт. Управление дроном через экран смартфона — это навигация по карте. Goggles 3 — ощущение физического присутствия в кабине: поворот головы совпадает с поворотом камеры.\n\nДвойные дисплеи Micro-OLED 1920×1080 пикселей на каждый глаз — абсолютно чёрный цвет, ослепительно яркий белый, без пикселизации на расстоянии нормального зрения. Угол обзора 46°. Задержка видеопотока 13 мс — реакция изображения быстрее, чем человеческое периферийное зрение. При задержке выше 50 мс возникает укачивание — 13 мс позволяют летать часами без дискомфорта.\n\nСовместимость с DJI Avata 2, Mavic 3 Pro, Mavic 4 Pro, Inspire 3, Air 3S. Motion Controller для управления наклонами запястья — интуитивный, осваивается за 15 минут.\n\nАккумулятор 2600 мАч — до 3 часов работы. Диоптрийная настройка без очков.",                                                   price: 59900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.djigoggles,        specs: SPEC.goggles3,    categoryId: cameras_cat.id,  brandId: dji.id },
    // ── DJI Микрофоны ─────────────────────────────────────────────────────────
    { name: "DJI Mic 2",                    slug: "dji-mic-2",                  description: "DJI Mic 2 — профессиональная беспроводная микрофонная система, ставшая отраслевым стандартом для видеографов. Первая беспроводная система с записью 32-bit Float в портативном форм-факторе.\n\n32-bit Float устраняет понятие «перегруз» математически: формат хранит данные сигнала с такой точностью, что даже при превышении уровня на 20 дБ при постобработке можно восстановить чистый сигнал. Уровень входного сигнала больше не нужно настраивать — это революция в рабочем процессе звукозаписи.\n\nДальность 250 метров. AI шумоподавление работает в передатчиках в реальном времени — голос отделяется от шума окружения до передачи сигнала. Комплект включает два передатчика и один приёмник: оба канала записываются независимо. Внутренняя память 8 ГБ в каждом передатчике для автономной записи без приёмника.\n\nПриёмник с сенсорным экраном. USB-C или 3.5 мм TRS/TRRS для подключения к любому оборудованию. Для интервью, репортажей, YouTube — незаменимый инструмент.",                                   price: 24900,  oldPrice: null,    isFeatured: true,  isPublished: true, imageUrl: IMG.djimic2,        specs: SPEC.mic2,      categoryId: microphones_cat.id, brandId: dji.id },
    { name: "DJI Mic Mini",                 slug: "dji-mic-mini",               description: "DJI Mic Mini — самый компактный беспроводной петличный микрофон DJI для создателей контента, которым важна незаметность оборудования. Передатчик размером с монету крепится магнитной клипсой без прокола ткани.\n\nВес 18 г не чувствуется при ношении даже на лёгкой рубашке. Беспроводной передатчик прячется под воротником или за лацканом — в кадре невидим. Для ТВ-интервью и деловых видео это принципиально важно. Дальность 400 метров — вдвое больше конкурентов в этом ценовом сегменте.\n\nAI шумоподавление второго поколения, обученное на 50 000 образцах окружающего шума, отделяет голос от кофемашин, кондиционеров и фонового трафика. Внутренняя память 8 ГБ — автономная запись без приёмника до 8 часов для документальных съёмок.\n\nАккумулятор 6 часов работы. Кейс-зарядник добавляет 18 часов резерва. Два передатчика к одному приёмнику одновременно. USB-C или 3.5 мм подключение.",                                                price: 12900,  oldPrice: 14900,  isFeatured: false, isPublished: true, imageUrl: IMG.djimicmini,        specs: SPEC.micmini,   categoryId: microphones_cat.id, brandId: dji.id },
    // ── Ray-Ban Meta ──────────────────────────────────────────────────────────
    { name: "Ray-Ban Meta Wayfarer",        slug: "ray-ban-meta-wayfarer",      description: "Ray-Ban Meta Wayfarer — умные очки, которые впервые сделали носимые технологии по-настоящему стильными. Внешне неотличимы от классических Ray-Ban Wayfarer, которые носят со времён Одри Хепберн — умная начинка полностью скрыта в дужках.\n\nКамера 12 Мп снимает от первого лица — ракурс, недостижимый ни на одном другом устройстве. Видео 1080p 60fps с оптической стабилизацией записывает то, что видят глаза, при свободных руках. Для путешествий, велопрогулок, кулинарных съёмок от первого лица — форм-фактор, недостижимый экшн-камерой.\n\nMeta AI активируется голосом «Привет, Meta» — отвечает на вопросы об объектах в поле зрения, переводит тексты, подсказывает информацию о ресторанах и достопримечательностях. Интеграция с WhatsApp и Messenger для голосовых сообщений без касания телефона.\n\nОткрытые динамики для безопасного прослушивания на улице. Вес 49 г. Батарея 4 часа с камерой, 32 часа суммарно с кейсом. Семь расцветок, три типа линз включая фотохром.",                                  price: 29900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.rayban,     specs: SPEC.rayban_wayfarer,   categoryId: rayban_cat.id,   brandId: rayban.id },
    { name: "Ray-Ban Meta Skyler",          slug: "ray-ban-meta-skyler",        description: "Ray-Ban Meta Skyler — женская модель умных очков с оправой, разработанной специально с учётом анатомических особенностей женского лица. Мягкие скруглённые углы и более тонкие дужки создают изящный силуэт — при полном функциональном паритете с Wayfarer.\n\nКамера 12 Мп, видео 1080p 60fps от первого лица, открытые динамики, Meta AI — все функции коллекции доступны полностью. Выбор между моделями Ray-Ban Meta — это выбор эстетики, а не возможностей.\n\nОправа Skyler на 12% меньше по ширине — принципиальная разница для людей с небольшим расстоянием между висками. Вес 48 г. Четыре варианта линз: прозрачные, солнцезащитные, фотохромные и поляризованные. Возможность установки корригирующих линз для людей с нарушениями зрения.\n\nПриложение Meta View для iOS и Android. 32 ГБ внутренней памяти. Батарея 4 часа активно, 32 часа суммарно с кейсом. Голосовой контроль без касания.",                                                           price: 31900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.rayban,     specs: SPEC.rayban_skyler,     categoryId: rayban_cat.id,   brandId: rayban.id },
    { name: "Ray-Ban Meta Headliner",       slug: "ray-ban-meta-headliner",     description: "Ray-Ban Meta Headliner — самая заметная и смелая модель коллекции. Крупная овальная оправа-заявление говорит о стиле и уверенности. Широкие дужки вписаны в дизайн как элемент стиля, а не компромисс — крупная оправа предполагает крупные дужки как часть эстетики 2020-х.\n\nКамера 12 Мп с углом обзора 82° — шире, чем у большинства смартфонных камер. Видео 1080p с оптической стабилизацией от первого лица. Meta AI через голос — в путешествиях: наведи взгляд на архитектуру, памятник или меню — очки расскажут о том, что видят. Функция Look and Ask.\n\nОткрытые динамики создают более широкую звуковую сцену благодаря увеличенному расстоянию между ними в широкой оправе Headliner. Восемь цветовых вариантов оправы от классического Shiny Black до Sand Transparent.\n\nВес 49 г. Meta View приложение. 32 ГБ. Батарея 4 часа активно, 32 часа с кейсом. Интеграция с Instagram для прямой публикации Stories.",                                                    price: 34900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.rayban,     specs: SPEC.rayban_headliner,  categoryId: rayban_cat.id,   brandId: rayban.id },
    // ── WHOOP ─────────────────────────────────────────────────────────────────
    { name: "WHOOP 5.0 (подписка 12 мес.)", slug: "whoop-5-12m",               description: "WHOOP 5.0 — биометрический трекер, радикально переосмысливший мониторинг здоровья. Намеренно без дисплея, кнопок и уведомлений — только непрерывный сбор данных и три ключевых показателя: Recovery, Strain, Sleep.\n\nПять световых датчиков и один цветовой датчик измеряют ЧСС с точностью 99%+ при высокоинтенсивных тренировках. HRV (вариабельность сердечного ритма) измеряется ежедневно во время сна — объективный показатель состояния нервной системы. Многие пользователи сообщают, что WHOOP предупредил о заражении за день до симптомов: HRV резко падает при начинающемся заболевании.\n\nRecovery Score 0–100% интегрирует ЧСС, HRV, частоту дыхания и температуру кожи. Зелёный — полная нагрузка. Жёлтый — умеренно. Красный — только восстановление. WHOOP Coach — ИИ-ассистент — объясняет данные естественным языком.\n\nБраслет IP68. Зарядка без снятия через накладной модуль. 12 месяцев подписки включены в стоимость. Для атлетов, биохакеров и всех, кто тренируется серьёзно.",                             price: 39900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.whoop,      specs: SPEC.whoop12m,  categoryId: whoop_cat.id,      brandId: whoop.id },
    { name: "WHOOP 5.0 (подписка 6 мес.)", slug: "whoop-5-6m",                description: "WHOOP 5.0 с подпиской 6 месяцев — оптимальный вариант для знакомства с платформой. Биометрические трекеры этого класса требуют нескольких недель ношения для накопления базы данных — 6 месяцев достаточно для реальных инсайтов о здоровье и тренировках.\n\nТе же характеристики, что в версии 12 месяцев: пять световых датчиков, HRV, Recovery Score, Sleep Coach. Функция Healthspan — новинка WHOOP 5.0 — рассчитывает биологический возраст на основе биометрических данных: объективная оценка эффекта тренировок и образа жизни.\n\nWHOOP Coach — ИИ-ассистент — отвечает на вопросы о данных: «Почему у меня низкий Recovery?», «Когда провести интенсивную тренировку?», «Как алкоголь влияет на мой сон?» — с анализом именно ваших данных.\n\nПодписка продлевается после 6 месяцев — большинство пользователей продолжают, получив ценность от данных. IP68. Зарядка без снятия. Браслет из гидрокнит ткани.",                                                                 price: 24900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.whoop,      specs: SPEC.whoop6m,   categoryId: whoop_cat.id,      brandId: whoop.id },
    // ── Garmin ────────────────────────────────────────────────────────────────
    { name: "Garmin Fenix 8 Solar",         slug: "garmin-fenix-8-solar",       description: "Garmin Fenix 8 Solar — флагманские мультиспортивные часы с технологией солнечной зарядки Power Glass, устанавливающие рекорд автономности среди всех AMOLED-часов. До 29 дней без зарядки от кабеля — реальный показатель при ежедневном GPS-трекинге.\n\nСолнечные элементы интегрированы в сапфировое стекло незаметно. При трёх часах прямого солнечного света ежедневно автономность GPS увеличивается с 40 до 60+ часов. В тропических широтах часы могут работать без зарядки неограниченно.\n\nAMOLED 1.4\" с топографическими картами AlphaMap и Birdseye Satellite Imagery — навигация без телефона в любом регионе. Мультиполосный GPS L1+L5 с точностью 1–2 метра в лесах и городских каньонах. SpO2 для горных трекингов. HRV Status. 30+ спортивных профилей.\n\nТитан Grade 6, сапфировое стекло, MIL-STD-810H, 100 м водонепроницаемость. Для триатлетов, трейлраннеров и экспедиционных атлетов.",                   price: 119900, oldPrice: null,    isFeatured: false,  isPublished: false, imageUrl: null,           specs: SPEC.fenix8solar, categoryId: garmin_cat.id,   brandId: garmin.id },
    { name: "Garmin Fenix 8",               slug: "garmin-fenix-8",             description: "Garmin Fenix 8 — флагманские мультиспортивные часы для атлетов, выбирающих максимальную функциональность без Solar. До 16 дней в смарт-режиме, до 40 часов GPS — достаточно для соревновательного ультрамарафона.\n\nAMOLED 1.4\" с Always-On при 25 нит — информация видна без поднятия руки. При активации — 1000 нит, читается под прямым солнцем. Топографические карты AlphaMap без телефона. Мультиполосный GPS L1+L5 — точность 1–2 метра в сложных условиях.\n\nСистема датчиков: SpO2 непрерывно для высокогорья, базальная температура для женского здоровья, HRV Status за 7 дней для отслеживания долгосрочных тенденций. Training Readiness интегрирует все данные в единый показатель готовности к нагрузке. Встроенный фонарик с белым и красным режимами.\n\nТитан, сапфировое стекло, MIL-STD-810H, 100 м. 30+ спортивных режимов. Три расцветки.",                             price: 89900,  oldPrice: 99900,  isFeatured: false,  isPublished: false, imageUrl: null,           specs: SPEC.fenix8,      categoryId: garmin_cat.id,   brandId: garmin.id },
    { name: "Garmin Forerunner 965",        slug: "garmin-forerunner-965",      description: "Garmin Forerunner 965 — эталонные беговые часы для серьёзных любителей и профессиональных бегунов. Оптимизированы именно для бега: 53 г — не замечаешь их при пятичасовом марафоне.\n\nRunning Dynamics с запястья без дополнительного датчика: каденс, вертикальное колебание, время контакта с землёй, длина шага, вертикальное соотношение. У большинства любителей вертикальное колебание чрезмерно — снижение на 1 см улучшает марафонское время на 1–2 минуты при том же потреблении кислорода.\n\nTraining Readiness анализирует 21 день нагрузки, HRV-статус, качество сна и хроническую нагрузку. Race Predictor рассчитывает потенциальное финишное время с точностью 3–5 минут на марафоне. Suggested Workouts предлагает оптимальную тренировку для текущего состояния.\n\nAMOLED 1.4\" 454×454 пикселей, 1000 нит. До 31 дня в смарт-режиме, до 31 часа GPS. Мультиполосный GPS. 100 м водонепроницаемость.",                                                    price: 59900,  oldPrice: 64900,  isFeatured: false, isPublished: false, imageUrl: null,           specs: SPEC.fr965,       categoryId: garmin_cat.id,   brandId: garmin.id },
    { name: "Garmin Epix Pro Gen 2",        slug: "garmin-epix-pro-gen-2",      description: "Garmin Epix Pro Gen 2 — тактические мультиспортивные часы с уникальным встроенным LED-фонариком. Для военных, спецподразделений и экстремальных атлетов. MIL-STD-810H — стандарт армии США: ударная нагрузка, вибрация, температуры от -20 до +55°C, соляной туман.\n\nВстроенный фонарик с белым и красным режимами: 10 метров освещения без налобника. Красный режим сохраняет ночное зрение при навигации в темноте. Strobe — импульсный световой сигнал для привлечения внимания в экстремальных ситуациях.\n\nAMOLED 1.3\" 1000 нит, Always-On. Мультиполосный GPS L1+L5 — точность 1–2 метра. Топографические карты без телефона. SpO2 непрерывно. HRV. До 31 дня в смарт-режиме.\n\n100 м водонепроницаемость — плавание постоянно. Анализ плавания: темп, каденс гребков, SWOLF. Corning Gorilla Glass DX+ без бликов. Titanium или Carbon Gray.",                                              price: 74900,  oldPrice: 84900,  isFeatured: false, isPublished: false, imageUrl: null,           specs: SPEC.epixpro,     categoryId: garmin_cat.id,   brandId: garmin.id },
    // ── Dyson ─────────────────────────────────────────────────────────────────
    { name: "Dyson V15 Detect",             slug: "dyson-v15-detect",           description: "Dyson V15 Detect — беспроводной пылесос с лазерным обнаружением пыли, буквально показывающий невидимое. Зелёный лазер 1.5 мВт под углом 1.5° в щётке освещает пыль боковым светом — частицы, которые были на полу всегда, но были невидимы, становятся очевидны. После первой уборки с лазером к пылесосам без него не возвращаются.\n\nПьезо-акустический датчик считает частицы, проходящие через пылесос, в реальном времени: размер и количество отображаются на экране. Auto-mode автоматически усиливает всасывание при переходе на загрязнённый участок. Мотор Hyperdymium 125 000 об/мин, 240 АВт — захватывает пыль из ворса ковра.\n\nHEPA фильтрация задерживает 99.97% частиц от 0.3 мкм — бактерии, пыльца, споры плесени. Весь воздух фильтруется до выхода через заднюю решётку. Для аллергиков — это не просто уборка пола, но и очистка воздуха.\n\nДо 60 минут в режиме Eco. Шесть насадок. Беспроводная конструкция.",                                                     price: 59900,  oldPrice: 69900,  isFeatured: false,  isPublished: true, imageUrl: IMG.dysonv15,           specs: SPEC.v15detect,   categoryId: dyson_cat.id,    brandId: dyson.id },
    { name: "Dyson Airwrap Complete",       slug: "dyson-airwrap-complete",     description: "Dyson Airwrap Complete — многофункциональный стайлер, использующий эффект Коанда вместо прямого теплового воздействия. Влажные волосы притягиваются к вращающемуся баррелю зоной пониженного давления и наматываются самостоятельно — без зажима, без щипцов, без ручного закручивания.\n\nIntellectual Heat Control измеряет температуру воздуха 100+ раз в секунду и поддерживает её не выше 150°C. Обычные щипцы нагреваются до 180–230°C без точного контроля. При регулярном использовании Airwrap вместо традиционных щипцов структура волос сохраняется — клинически подтверждено в исследованиях Dyson.\n\nКомплект Complete включает семь насадок: цилиндрический баррель для объёмных локонов, конусный для голливудских волн, сглаживающая щётка, щётка для прикорневого объёма, насадка для вьющихся волос, формирующая насадка. Один прибор заменяет фен, щипцы и выпрямитель.\n\nМотор V9 в рукоятке — идеальный баланс, рука не устаёт. Три режима потока, переключатель направления вращения. Магнитные насадки меняются мгновенно.",                                        price: 49900,  oldPrice: 54900,  isFeatured: true,  isPublished: true, imageUrl: IMG.dysonairwrap,           specs: SPEC.airwrap,     categoryId: dyson_cat.id,    brandId: dyson.id },
    { name: "Dyson Supersonic",             slug: "dyson-supersonic",           description: "Dyson Supersonic — профессиональный фен с мотором V9, расположенным в рукоятке, а не в насадке. Это решение перевернуло индустрию: центр тяжести смещён вниз — фен держится как рукопожатие, рука не устаёт даже при 20-минутной сушке длинных густых волос.\n\nМотор V9 вращается со скоростью 110 000 об/мин — в 8 раз быстрее обычных фенов. Частота вращения выходит за пределы слышимого диапазона — уровень шума около 78 дБ, значительно тише стандартных фенов при равной мощности. Supersonic можно использовать пока другие спят.\n\nThermoshield Technology контролирует температуру воздуха 20+ раз в секунду с точностью ±3°C. Четыре режима: 28°C холодный финиш, 60°C для тонких волос, 80°C нормальные, 100°C густые. Flyaway attachment статическим электричеством приглаживает выбивающиеся волоски.\n\nПять магнитных насадок. Три скорости, четыре температуры. Cold Shot фиксирует укладку. Сушка длинных волос — 10 минут.",                                          price: 34900,  oldPrice: 39900,  isFeatured: false, isPublished: true, imageUrl: IMG.dysonsupersonic,           specs: SPEC.supersonic,  categoryId: dyson_cat.id,    brandId: dyson.id },
    // ── Яндекс ────────────────────────────────────────────────────────────────
    { name: "Яндекс Станция 2",             slug: "yandex-station-2",           description: "Яндекс Станция 2 — умная колонка с встроенным Zigbee-хабом, устраняющим необходимость в отдельном контроллере умного дома. Zigbee — протокол большинства умных лампочек, розеток, датчиков и замков. Одно устройство становится центром всей экосистемы.\n\nАкустика пять динамиков суммарной мощностью 30 Вт: один низкочастотный 20 Вт и четыре высокочастотных с излучением 360°. Поддержка Dolby Atmos. Яндекс Музыка в высоком качестве через хорошую акустику — полноценная музыкальная атмосфера в комнате до 30 м².\n\nАлиса обрабатывает базовые команды локально — без задержки и без интернета. Сценарии автоматизации: при открытии входной двери включается свет, при фразе «Кино» приглушается свет и запускается сериал. Поддержка 3000+ устройств экосистемы Яндекс и Zigbee.\n\nHDMI ARC для телевизора. 4K HDR стриминг Яндекс Кино, Netflix, YouTube. Голосовое управление без пультов.",                                                               price: 14900,  oldPrice: 17900,  isFeatured: true , isPublished: true, imageUrl: IMG.yandex2,           specs: SPEC.station2,    categoryId: yandex_cat.id,   brandId: yandex.id },
    { name: "Яндекс Станция Макс",          slug: "yandex-station-max",         description: "Яндекс Станция Макс — топовое устройство линейки, объединяющее функции умной колонки, медиацентра и контроллера умного дома в корпусе с экраном 10 дюймов. Ставят на кухню вместо дополнительного телевизора, в спальню для контента перед сном, в детскую как интерактивный образовательный центр.\n\nАкустика семь динамиков 65 Вт с Dolby Atmos и DTS X — мощность сравнимая с компактной напольной акустикой начального уровня. Для комнаты до 50 м² создаёт полноценное звуковое поле без дополнительных колонок. Экран IPS 10 дюймов с сенсорным управлением: рецепты пошагово с фото, видеозвонки через Яндекс Телемост 720p, панель умного дома со статусом всех устройств.\n\nAlisa в Макс поддерживает одновременно до 128 Zigbee-устройств. Алгоритм изучает привычки и предлагает автоматизации. 4K HDR стриминг. Голосовое управление, жесты, сенсорный экран одновременно.\n\nYandex Музыка Hi-Fi. Яндекс Кино. YouTube. Netflix. Wi-Fi 6, Bluetooth 5.0.",                                                       price: 24900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.yandexmax,           specs: SPEC.stationmax,  categoryId: yandex_cat.id,   brandId: yandex.id },
    // ── Plaud ─────────────────────────────────────────────────────────────────
    { name: "Plaud Note (MagSafe)",         slug: "plaud-note-magsafe",         description: "Plaud Note — AI-диктофон для профессионалов, чья работа неразрывно связана с устным общением: переговоры, совещания, интервью, лекции. Форм-фактор MagSafe — тонкая карточка — прикрепляется к задней панели iPhone незаметно для собеседника.\n\nТранскрипция на 59 языках происходит в облаке Plaud после записи. Точность распознавания 95%+. Распознавание спикеров автоматически разделяет монолог нескольких участников по голосам. ИИ-резюмирование на базе GPT-4 создаёт структурированный протокол встречи: ключевые тезисы, решения, задачи с ответственными — через 7–10 минут после завершения часового совещания.\n\nДвусторонний направленный микрофон с AI шумоподавлением пишет чисто даже в кафе с фоновой музыкой. Запись 30 часов на одном заряде. Встроенная память 64 ГБ. Синхронизация с Notion, Google Docs, CRM.\n\nДля юристов, журналистов, врачей, предпринимателей — сокращает часы ручной документации до минут.",                                       price: 19900,  oldPrice: null,    isFeatured: false,  isPublished: true, imageUrl: IMG.plaud,      specs: SPEC.plaud_note,     categoryId: plaud_cat.id, brandId: plaud.id },
    { name: "Plaud NotePin",                slug: "plaud-notepin",              description: "Plaud NotePin — ультракомпактный AI-диктофон в форме значка для ситуаций, когда смартфон неуместен, а запись критически важна. Передатчик диаметром 36 мм крепится магнитной клипсой без прокола ткани — в кадре невидим под любым углом.\n\nДиаграмма направленности микрофона оптимизирована для ношения на одежде: основная чувствительность вперёд — к собеседнику — с подавлением шума от ткани и прикосновений. Для медицинских осмотров, лекций, деловых переговоров — пациенты и коллеги не замечают.\n\nTранскрипция на 59 языках, распознавание спикеров, GPT-4 резюме — та же платформа, что в Plaud Note. Voice Activation запускает запись при обнаружении речи автоматически — не нужно нажимать кнопку.\n\n8 часов записи на аккумуляторе. 64 ГБ памяти. Зарядка USB-C за 45 минут. Экспорт в Notion, Google Docs, CRM.",                                             price: 14900,  oldPrice: null,    isFeatured: false, isPublished: true, imageUrl: IMG.plaud,      specs: SPEC.plaud_notepin,  categoryId: plaud_cat.id, brandId: plaud.id },
  ];

  // Вставляем товары
  let created = 0;
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name:        product.name,
        description: product.description,
        price:       product.price,
        oldPrice:    product.oldPrice,
        isFeatured:  product.isFeatured,
        imageUrl:    product.imageUrl,
        specs:        product.specs,
        reviews:      REVIEW[product.slug] ?? null,
        reviewCount:  STATS[product.slug]?.reviewCount ?? 0,
        rating:       STATS[product.slug]?.rating ?? 5.0,
        clicks:       STATS[product.slug]?.clicks ?? 0,
        clicksMonth:  STATS[product.slug]?.clicksMonth ?? 0,
        isPublished:  product.isPublished,
        categoryId:   product.categoryId,
        brandId:      product.brandId,
      },
      create: { ...product, reviews: REVIEW[product.slug] ?? null, ...(STATS[product.slug] ?? {}) },
    });
    created++;
    process.stdout.write(`\r  ✓ ${created}/${products.length} товаров`);
  }

  console.log(`\n\n✅ Готово! Добавлено ${products.length} товаров со спецификациями.`);
}

main()
  .catch((e) => {
    console.error("❌ Ошибка:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
