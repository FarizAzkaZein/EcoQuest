
"use strict";

/* Local Storage & State Management */
const STORAGE_KEY = "ecoquest_v2";
const LANG_KEY = "ecoquest_language";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let language = localStorage.getItem(LANG_KEY) || "id";
let currentUser = localStorage.getItem("ecoquest_current_user") || null;
let currentQuiz = null;
let questionIndex = 0;
let quizScore = 0;
let answered = false;
let toastTimer = null;

/* Multi-Language Dictionary */
const translations = {
  id: {
    navHome: "Beranda",
    navFeatures: "Fitur",
    navQuiz: "Kuis",
    navLibrary: "Pustaka",
    navImpact: "Dampak",
    login: "Masuk",
    logout: "Keluar",
    forest: "Hutanku",
    heroEyebrow: "Edukasi Lingkungan Berkelanjutan",
    heroText: "Kenali lingkungan, uji pengetahuanmu melalui kuis interaktif, dan bangun kebiasaan hijau satu langkah setiap hari secara konsisten.",
    startQuiz: "Mulai Kuis",
    exploreLibrary: "Jelajahi Pustaka",
    heroNote: "Bergabung bersama komunitas menjaga masa depan bumi.",
    dailyTitle: "Pengingat Hari Ini",
    discover: "Jelajahi EcoQuest",
    discoverTitle: "Temukan cara baru untuk peduli.",
    discoverText: "Belajar tidak harus rumit. Pilih langkah yang ingin kamu mulai hari ini.",
    featureTitle: "Fakta & Edukasi",
    featureText: "Kenali fakta dan langkah sederhana untuk hidup lebih ramah lingkungan.",
    quizTitle: "Kuis Interaktif",
    quizText: "Uji pemahamanmu tentang sampah, energi, air, dan keanekaragaman hayati.",
    libraryTitle: "Pustaka Modul",
    libraryText: "Baca materi ringkas dan temukan kebiasaan yang bisa diterapkan sehari-hari.",
    impactTitle: "Dampak & Pohon",
    impactText: "Lihat gambaran kontribusi belajar dan kebiasaan hijau di EcoQuest.",
    learnMore: "Kenali lebih lanjut →",
    startNow: "Mulai sekarang →",
    readMaterials: "Baca materi →",
    seeImpact: "Lihat dampak →",
    quote: "Kita tidak perlu menjadi sempurna untuk mulai menjaga bumi. Kita hanya perlu mulai.",
    featureEyebrow: "MULAI DARI HAL SEDERHANA",
    featurePageTitle: "Pengetahuan yang bisa diterapkan.",
    featurePageText: "Pahami masalah lingkungan melalui fakta ilmiah sederhana dan temukan kebiasaan kecil yang bisa kamu lakukan setiap hari.",
    card1Title: "Daur Ulang Tepat",
    card1Text: "Memilah sampah secara benar membantu bahan plastik dan kertas masuk ke rantai daur ulang yang bersih.",
    card2Title: "Hemat Listrik",
    card2Text: "Mematikan perangkat elektronik standby mengurangi konsumsi energi fosil tak terpakai.",
    card3Title: "Gunakan Reusable",
    card3Text: "Membawa botol dan kantong sendiri dapat mengurangi ratusan sampah sekali pakai setiap tahunnya.",
    calloutTitle: "Tidak harus langsung sempurna.",
    calloutText: "Pilih satu kebiasaan, lakukan dengan konsisten, lalu tambah langkah berikutnya saat kamu sudah terbiasa.",
    quizEyebrow: "COBA DAN PELAJARI",
    quizPageTitle: "Seberapa hijau pengetahuanmu?",
    quizPageText: "Pilih topik kuis di bawah ini, jawab pertanyaan, dan pelajari penjelasan komprehensif di setiap akhir soal.",
    libraryEyebrow: "RUANG BELAJAR",
    libraryPageTitle: "Baca sedikit, pahami lebih banyak.",
    libraryPageText: "Materi singkat terstruktur untuk membantumu mengenal isu lingkungan dan mengambil tindakan nyata.",
    yourProgress: "Progres Belajarmu",
    impactEyebrow: "LANGKAH KECIL, ARTI BESAR",
    impactPageTitle: "Perubahan dimulai dari kesadaran.",
    impactPageText: "EcoQuest mengajak kita semua untuk belajar, mencoba, dan membangun kebiasaan yang lebih bertanggung jawab secara kolektif.",
    impactOneTitle: "Kenali",
    impactOneText: "Pahami isu lingkungan secara mendalam melalui materi ringkas berbasis fakta terverifikasi.",
    impactTwoTitle: "Pelajari",
    impactTwoText: "Uji pemahamanmu dengan kuis interaktif dan pahami alasan ilmiah di balik setiap jawaban.",
    impactThreeTitle: "Terapkan",
    impactThreeText: "Ubah pengetahuan yang didapat menjadi kebiasaan hijau nyata yang konsisten sehari-hari.",
    impactDisclaimer: "Catatan: Progres dan dampak lingkungan pada demo EcoQuest disimpan secara lokal di browser kamu sebagai gambaran komitmen pribadi belajar.",
    forestEyebrow: "RUANG PERTUMBUHANMU",
    hello: "Halo",
    forestIntro: "Pohon virtualmu tumbuh seiring proses belajarmu. Rawat pengetahuanmu satu langkah demi satu langkah.",
    yourTree: "POHON VIRTUALMU",
    growth: "Pertumbuhan",
    treeHint: "Belajar kuis dan selesaikan modul pustaka untuk menaikkan level pohonmu.",
    dailyActions: "KEBIASAAN HARIAN",
    actionsTitle: "Apa yang sudah kamu lakukan?",
    actionsText: "Tandai tindakan yang benar-benar sudah kamu lakukan hari ini untuk mencatat komitmen.",
    yourJourney: "PERJALANANMU",
    journeyTitle: "Terus bertumbuh.",
    share: "Bagikan EcoQuest",
    footerText: "Belajar hari ini, menjaga bumi setiap hari.",
    footerNote: "Proyek Edukasi Lingkungan",
    welcome: "SELAMAT DATANG",
    loginTitle: "Mulai perjalanan hijaumu.",
    loginText: "Masukkan nama kamu untuk menyimpan progres kuis dan pohon virtual di browser ini.",
    nameLabel: "Nama Kamu",
    loginContinue: "Lanjutkan",
    loginDisclaimer: "Login demo tanpa kata sandi. Data tersimpan secara aman di browser lokal milikmu.",
    loginRequired: "Masuk terlebih dahulu untuk menyimpan progres belajarmu.",
    logoutSuccess: "Kamu telah keluar.",
    saved: "Progres berhasil disimpan.",
    completed: "Selesai",
    markComplete: "Tandai Selesai",
    completedLabel: "Sudah Selesai",
    moduleProgress: "materi selesai",
    questions: "soal",
    next: "Pertanyaan Berikutnya →",
    seeResult: "Lihat Hasil Kuis",
    backCategories: "← Kembali ke Topik",
    question: "Pertanyaan",
    score: "Nilai",
    correct: "Benar!",
    incorrect: "Belum Tepat.",
    quizFinished: "Kuis Selesai!",
    retry: "Coba Lagi",
    treeProgress: "Progres Pohon",
    statTopics: "Topik Kuis",
    statModules: "Materi Selesai",
    statAverage: "Rata-rata Nilai",
    actionWater: "Hemat Air",
    actionWaterDesc: "Gunakan air secukupnya hari ini.",
    actionBottle: "Bawa Botol Minum",
    actionBottleDesc: "Kurangi botol plastik sekali pakai.",
    actionWaste: "Pilah Sampah",
    actionWasteDesc: "Pisahkan sampah organik & anorganik.",
    actionEnergy: "Hemat Listrik",
    actionEnergyDesc: "Matikan lampu/perangkat tidak terpakai.",
    actionPlant: "Rawat Tanaman",
    actionPlantDesc: "Siram dan rawat ruang hijau di sekitar.",
    actionRecorded: "Aksi harian berhasil dicatat!",
    actionAlready: "Aksi ini sudah kamu lakukan hari ini.",
    shareCopied: "Tautan EcoQuest berhasil disalin!",
    categoryWaste: "Sampah & Daur Ulang",
    categoryClimate: "Iklim & Karbon",
    categoryEnergy: "Energi Terbarukan",
    categoryLifestyle: "Gaya Hidup Hijau",
    categoryNature: "Keanekaragaman Hayati",
    catWasteDesc: "Belajar memilah dan mengurangi sampah plastik.",
    catClimateDesc: "Pahami emisi gas rumah kaca dan iklim.",
    catEnergyDesc: "Sumber energi terbarukan & efisiensi.",
    catLifestyleDesc: "Pilihan konsumsi bijak sehari-hari.",
    catNatureDesc: "Pelestarian air, flora, dan fauna.",
    stage0: "Benih",
    stage1: "Tunas Pertama",
    stage2: "Tanaman Muda",
    stage3: "Pohon Bertumbuh",
    stage4: "Pohon Rimbun",
    stageDesc0: "Setiap pohon besar dimulai dari benih kecil. Mulailah kuis dan baca pustaka untuk tumbuh.",
    stageDesc1: "Tunas pertamamu mulai tumbuh dari tanah. Terus tingkatkan kuis dan membaca modul.",
    stageDesc2: "Daun-daun hijau baru mulai berkembang seiring bertambahnya pengetahuanmu.",
    stageDesc3: "Batang dan dahan semakin kokoh. Kamu telah konsisten belajar menjaga bumi.",
    stageDesc4: "Pohonmu tumbuh rimbun dan lebat! Pertahankan kebiasaan baik ini setiap hari."
  },

  en: {
    navHome: "Home",
    navFeatures: "Features",
    navQuiz: "Quiz",
    navLibrary: "Library",
    navImpact: "Impact",
    login: "Log In",
    logout: "Log Out",
    forest: "My Forest",
    heroEyebrow: "Sustainable Environmental Education",
    heroText: "Explore the environment, test your knowledge with interactive quizzes, and build greener habits step by step.",
    startQuiz: "Start Quiz",
    exploreLibrary: "Explore Library",
    heroNote: "Join a community caring for the future of our planet.",
    dailyTitle: "Today's Reminder",
    discover: "Discover EcoQuest",
    discoverTitle: "Find new ways to care.",
    discoverText: "Learning doesn't have to be complicated. Choose a step to begin today.",
    featureTitle: "Facts & Education",
    featureText: "Explore facts and simple actionable steps for eco-friendly living.",
    quizTitle: "Interactive Quiz",
    quizText: "Test your knowledge on waste, energy, water, and biodiversity.",
    libraryTitle: "Module Library",
    libraryText: "Read concise lessons and find practical daily green habits.",
    impactTitle: "Impact & Virtual Tree",
    impactText: "See how learning and green habits drive real personal impact.",
    learnMore: "Learn more →",
    startNow: "Start now →",
    readMaterials: "Read lessons →",
    seeImpact: "See impact →",
    quote: "We don't need to be perfect to care for the planet. We just need to start.",
    featureEyebrow: "START WITH SIMPLE STEPS",
    featurePageTitle: "Actionable Knowledge.",
    featurePageText: "Understand environmental challenges with clear facts and adopt simple daily habits.",
    card1Title: "Proper Recycling",
    card1Text: "Correctly sorting waste helps plastic and paper materials enter clean recycling streams.",
    card2Title: "Save Electricity",
    card2Text: "Turning off standby electronics reduces unnecessary fossil energy consumption.",
    card3Title: "Use Reusables",
    card3Text: "Bringing your own bottle and bag can eliminate hundreds of single-use items every year.",
    calloutTitle: "You don't need to be perfect overnight.",
    calloutText: "Pick one simple habit, practice it consistently, then build on your progress.",
    quizEyebrow: "TRY & LEARN",
    quizPageTitle: "How green is your knowledge?",
    quizPageText: "Choose a quiz topic below, answer questions, and read detailed scientific explanations.",
    libraryEyebrow: "LEARNING SPACE",
    libraryPageTitle: "Read a little, understand more.",
    libraryPageText: "Structured short lessons to help you understand environmental issues and take action.",
    yourProgress: "Your Learning Progress",
    impactEyebrow: "SMALL STEPS, BIG IMPACT",
    impactPageTitle: "Change begins with awareness.",
    impactPageText: "EcoQuest empowers us to learn, experiment, and build responsible habits together.",
    impactOneTitle: "Discover",
    impactOneText: "Understand environmental issues through verified, simple facts.",
    impactTwoTitle: "Learn",
    impactTwoText: "Test yourself with quizzes and learn the reasoning behind every answer.",
    impactThreeTitle: "Apply",
    impactThreeText: "Turn acquired knowledge into real-world daily green habits.",
    impactDisclaimer: "Note: Demo progress and tree data are saved locally in your browser to represent your personal commitment.",
    forestEyebrow: "YOUR GROWTH SPACE",
    hello: "Hello",
    forestIntro: "Your virtual tree grows with your learning journey. Nurture your knowledge step by step.",
    yourTree: "YOUR VIRTUAL TREE",
    growth: "Growth",
    treeHint: "Take quizzes and complete library modules to help your tree grow taller.",
    dailyActions: "DAILY HABITS",
    actionsTitle: "What have you done today?",
    actionsText: "Check off actions you genuinely completed today to log your commitment.",
    yourJourney: "YOUR JOURNEY",
    journeyTitle: "Keep growing.",
    share: "Share EcoQuest",
    footerText: "Learn today, protect the planet every day.",
    footerNote: "Environmental Education Project",
    welcome: "WELCOME",
    loginTitle: "Start your green journey.",
    loginText: "Enter your name to save learning progress and your virtual tree in this browser.",
    nameLabel: "Your Name",
    loginContinue: "Continue",
    loginDisclaimer: "Demo login without password. Data is stored safely on your browser.",
    loginRequired: "Please log in first to save your learning progress.",
    logoutSuccess: "You have logged out.",
    saved: "Progress saved successfully.",
    completed: "Completed",
    markComplete: "Mark Complete",
    completedLabel: "Completed",
    moduleProgress: "modules done",
    questions: "questions",
    next: "Next Question →",
    seeResult: "See Results",
    backCategories: "← Back to Topics",
    question: "Question",
    score: "Score",
    correct: "Correct!",
    incorrect: "Not quite.",
    quizFinished: "Quiz Finished!",
    retry: "Try Again",
    treeProgress: "Tree Progress",
    statTopics: "Quiz Topics",
    statModules: "Modules Completed",
    statAverage: "Average Score",
    actionWater: "Save Water",
    actionWaterDesc: "Use only what you need today.",
    actionBottle: "Bring Reusable Bottle",
    actionBottleDesc: "Avoid single-use plastic bottles.",
    actionWaste: "Sort Waste",
    actionWasteDesc: "Separate recyclables from organic waste.",
    actionEnergy: "Save Electricity",
    actionEnergyDesc: "Turn off unused lights and devices.",
    actionPlant: "Care for Plants",
    actionPlantDesc: "Water plants or care for nearby green space.",
    actionRecorded: "Daily action logged!",
    actionAlready: "Action already logged today.",
    shareCopied: "EcoQuest link copied to clipboard!",
    categoryWaste: "Waste & Recycling",
    categoryClimate: "Climate & Carbon",
    categoryEnergy: "Renewable Energy",
    categoryLifestyle: "Sustainable Lifestyle",
    categoryNature: "Biodiversity",
    catWasteDesc: "Learn to sort and reduce plastic waste.",
    catClimateDesc: "Understand greenhouse emissions & climate.",
    catEnergyDesc: "Renewable sources and energy efficiency.",
    catLifestyleDesc: "Thoughtful everyday choices.",
    catNatureDesc: "Protect water, plants, and wildlife.",
    stage0: "Seed",
    stage1: "First Sprout",
    stage2: "Young Sapling",
    stage3: "Growing Tree",
    stage4: "Lush Canopy Tree",
    stageDesc0: "Every giant tree begins as a small seed. Start quizzes and library modules to grow.",
    stageDesc1: "Your first green sprout has emerged. Keep learning to help it expand.",
    stageDesc2: "Fresh green leaves grow as your environmental knowledge deepens.",
    stageDesc3: "Stems and branches strengthen. You have shown strong consistency.",
    stageDesc4: "Your tree has reached a lush canopy! Keep up the great habits every day."
  }
};

function t(key) {
  return translations[language]?.[key] || translations["id"]?.[key] || key;
}

/* Database Helpers */
function loadDatabase() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"users":{}}');
  } catch (e) {
    return { users: {} };
  }
}

let database = loadDatabase();

function saveDatabase() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
  } catch (e) {
    showToast("Storage error.");
  }
}

function getUser() {
  return currentUser && database.users[currentUser] ? database.users[currentUser] : null;
}

function getOrCreateUser(name) {
  if (!database.users[name]) {
    database.users[name] = {
      quizScores: {},
      completedModules: [],
      actions: {},
      dailyActions: {}
    };
  }
  return database.users[name];
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function showToast(msg) {
  const toast = $("#toast");
  $("#toastMessage").textContent = msg;
  toast.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
  }, 3000);
}

/* ================= NAVIGATION SYSTEM ================= */
const pageMap = {
  "#beranda": "beranda",
  "#fitur": "beranda",
  "#fakta": "beranda",
  "#kuis": "kuis",
  "#pustaka": "pustaka",
  "#dampak": "beranda",
  "#hutanku": "hutanku"
};

function showPage(targetId, targetHash) {
  if (targetId === "hutanku" && !currentUser) {
    openLogin();
    targetId = "beranda";
    history.replaceState(null, "", "#beranda");
  }

  $$(".page-section").forEach(sec => sec.classList.remove("active"));
  const targetSection = $(`#${targetId}`);
  if (targetSection) targetSection.classList.add("active");

  const navKeyMap = {
    "#beranda": "home",
    "#fitur": "features",
    "#kuis": "quiz",
    "#pustaka": "library",
    "#dampak": "impact",
    "#hutanku": "forest"
  };

  const activeNavKey = navKeyMap[targetHash] || "home";
  $$(".nav-link").forEach(link => {
    if (link.dataset.nav === activeNavKey) {
      link.classList.add("bg-white", "text-forest-900", "shadow-sm");
    } else if (link.id !== "forestNav") {
      link.classList.remove("bg-white", "text-forest-900", "shadow-sm");
    }
  });

  if (targetId === "hutanku") renderForest();
  if (targetId === "pustaka") renderLibrary();

  if (targetHash === "#fitur" || targetHash === "#dampak" || targetHash === "#fakta") {
    setTimeout(() => {
      const sectionEl = $(targetHash);
      if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function navigateToHash(hash) {
  const pageId = pageMap[hash] || "beranda";
  showPage(pageId, hash);
}

window.addEventListener("hashchange", () => navigateToHash(location.hash));

document.addEventListener("click", (e) => {
  const anchor = e.target.closest("a[href^='#']");
  if (anchor) {
    const hash = anchor.getAttribute("href");
    if (pageMap[hash]) {
      e.preventDefault();
      location.hash = hash;
      $("#mobileNav").classList.add("hidden");
    }
  }
});

/* ================= QUIZ DATA & ENGINE ================= */


const quizCategories = [
  {
    id: "waste",
    titleKey: "categoryWaste",
    descKey: "catWasteDesc",
    svgPath: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    questions: [
      {
        q: {
          id: "Apa langkah awal sebelum botol plastik dimasukkan ke tempat daur ulang?",
          en: "What should you do before putting a plastic bottle into recycling?"
        },
        options: [
          { id: "A", idText: "Kosongkan dan bilas jika diperlukan", enText: "Empty and rinse it if needed" },
          { id: "B", idText: "Isi dengan sampah makanan", enText: "Fill it with food waste" },
          { id: "C", idText: "Bakar botol tersebut", enText: "Burn the bottle" },
          { id: "D", idText: "Campur dengan baterai bekas", enText: "Mix it with used batteries" }
        ],
        answer: "A",
        explanation: {
          id: "Sisa cairan dan kotoran dapat mengontaminasi bahan daur ulang. Ikuti aturan pemilahan di daerahmu.",
          en: "Leftover liquid and dirt can contaminate recyclable materials. Follow local sorting rules."
        }
      },
      {
        q: {
          id: "Tindakan yang paling tepat untuk mengurangi sampah sekali pakai adalah...",
          en: "Which action best reduces single-use waste?"
        },
        options: [
          { id: "A", idText: "Membawa botol dan tas pakai ulang", enText: "Bring reusable bottles and bags" },
          { id: "B", idText: "Meminta dua kantong plastik", enText: "Ask for two plastic bags" },
          { id: "C", idText: "Menggunakan alat makan sekali pakai setiap hari", enText: "Use disposable cutlery every day" },
          { id: "D", idText: "Membuang barang yang masih bisa dipakai", enText: "Throw away usable items" }
        ],
        answer: "A",
        explanation: {
          id: "Barang pakai ulang mengurangi kebutuhan mengambil dan membuang produk sekali pakai.",
          en: "Reusable items reduce the need to consume and discard single-use products."
        }
      },
      {
        q: {
          id: "Sisa sayuran dan daun kering yang sesuai dapat diolah menjadi...",
          en: "Suitable vegetable scraps and dry leaves can be turned into..."
        },
        options: [
          { id: "A", idText: "Kompos", enText: "Compost" },
          { id: "B", idText: "Bensin", enText: "Gasoline" },
          { id: "C", idText: "Logam", enText: "Metal" },
          { id: "D", idText: "Kaca", enText: "Glass" }
        ],
        answer: "A",
        explanation: {
          id: "Sampah organik tertentu dapat terurai dan diolah menjadi kompos untuk memperbaiki tanah.",
          en: "Some organic waste can decompose into compost that improves soil."
        }
      }
    ]
  },
  {
    id: "climate",
    titleKey: "categoryClimate",
    descKey: "catClimateDesc",
    svgPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    questions: [
      {
        q: {
          id: "Apa yang dimaksud dengan gas rumah kaca?",
          en: "What are greenhouse gases?"
        },
        options: [
          { id: "A", idText: "Gas di atmosfer yang menyerap dan memancarkan radiasi inframerah", enText: "Atmospheric gases that absorb and emit infrared radiation" },
          { id: "B", idText: "Gas yang hanya ditemukan di dalam rumah", enText: "Gases found only inside houses" },
          { id: "C", idText: "Gas yang selalu mendinginkan bumi", enText: "Gases that always cool the planet" },
          { id: "D", idText: "Oksigen murni saja", enText: "Pure oxygen only" }
        ],
        answer: "A",
        explanation: {
          id: "Gas rumah kaca membantu menahan panas di atmosfer. Peningkatan konsentrasinya akibat aktivitas manusia memperkuat pemanasan global.",
          en: "Greenhouse gases retain heat in the atmosphere. Human-caused increases strengthen global warming."
        }
      },
      {
        q: {
          id: "Aktivitas manusia yang banyak menghasilkan karbon dioksida adalah...",
          en: "Which human activity produces substantial carbon dioxide emissions?"
        },
        options: [
          { id: "A", idText: "Pembakaran batu bara, minyak, dan gas", enText: "Burning coal, oil, and gas" },
          { id: "B", idText: "Berjalan kaki", enText: "Walking" },
          { id: "C", idText: "Menanam tanaman", enText: "Planting vegetation" },
          { id: "D", idText: "Menggunakan cahaya matahari", enText: "Using sunlight" }
        ],
        answer: "A",
        explanation: {
          id: "Pembakaran bahan bakar fosil melepaskan karbon yang tersimpan selama jutaan tahun ke atmosfer sebagai CO₂.",
          en: "Burning fossil fuels releases carbon stored for millions of years into the atmosphere as CO₂."
        }
      },
      {
        q: {
          id: "Mengapa hutan penting dalam menghadapi perubahan iklim?",
          en: "Why are forests important in addressing climate change?"
        },
        options: [
          { id: "A", idText: "Menyerap dan menyimpan karbon", enText: "They absorb and store carbon" },
          { id: "B", idText: "Menghasilkan bahan bakar fosil", enText: "They produce fossil fuels" },
          { id: "C", idText: "Menghentikan seluruh cuaca ekstrem", enText: "They stop all extreme weather" },
          { id: "D", idText: "Menghilangkan kebutuhan energi", enText: "They eliminate the need for energy" }
        ],
        answer: "A",
        explanation: {
          id: "Pohon menyerap CO₂ melalui fotosintesis dan menyimpan karbon pada biomassa serta tanah.",
          en: "Trees absorb CO₂ through photosynthesis and store carbon in biomass and soil."
        }
      }
    ]
  },
  {
    id: "energy",
    titleKey: "categoryEnergy",
    descKey: "catEnergyDesc",
    svgPath: "M13 10V3L4 14h7v7l9-11h-7z",
    questions: [
      {
        q: {
          id: "Manakah contoh sumber energi terbarukan?",
          en: "Which is an example of renewable energy?"
        },
        options: [
          { id: "A", idText: "Matahari", enText: "Solar energy" },
          { id: "B", idText: "Batu bara", enText: "Coal" },
          { id: "C", idText: "Minyak bumi", enText: "Petroleum" },
          { id: "D", idText: "Gas alam", enText: "Natural gas" }
        ],
        answer: "A",
        explanation: {
          id: "Energi matahari berasal dari radiasi Matahari dan tersedia secara berkelanjutan dalam skala waktu manusia.",
          en: "Solar energy comes from the Sun's radiation and is continually available on human timescales."
        }
      },
      {
        q: {
          id: "Panel surya mengubah energi cahaya menjadi energi...",
          en: "Solar panels convert light energy into..."
        },
        options: [
          { id: "A", idText: "Listrik", enText: "Electricity" },
          { id: "B", idText: "Batu bara", enText: "Coal" },
          { id: "C", idText: "Bensin", enText: "Gasoline" },
          { id: "D", idText: "Bahan plastik", enText: "Plastic material" }
        ],
        answer: "A",
        explanation: {
          id: "Sel fotovoltaik pada panel surya mengubah energi cahaya menjadi energi listrik.",
          en: "Photovoltaic cells in solar panels convert light energy into electrical energy."
        }
      },
      {
        q: {
          id: "Kebiasaan yang membantu menghemat energi listrik adalah...",
          en: "Which habit helps conserve electrical energy?"
        },
        options: [
          { id: "A", idText: "Mematikan lampu saat tidak diperlukan", enText: "Turn off lights when they are not needed" },
          { id: "B", idText: "Membiarkan semua perangkat menyala", enText: "Leave every device switched on" },
          { id: "C", idText: "Membuka kulkas terlalu lama", enText: "Keep the refrigerator door open" },
          { id: "D", idText: "Menyalakan lampu saat siang terang", enText: "Turn on lights during bright daylight" }
        ],
        answer: "A",
        explanation: {
          id: "Mematikan perangkat yang tidak digunakan mengurangi konsumsi listrik dan kebutuhan pembangkitan energi.",
          en: "Switching off unused devices reduces electricity consumption and energy-generation demand."
        }
      }
    ]
  },
  {
    id: "lifestyle",
    titleKey: "categoryLifestyle",
    descKey: "catLifestyleDesc",
    svgPath: "M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m12.728 0L5.636 5.636",
    questions: [
      {
        q: {
          id: "Pilihan transportasi yang dapat mengurangi emisi perjalanan jarak dekat adalah...",
          en: "Which transport choice can reduce emissions on short trips?"
        },
        options: [
          { id: "A", idText: "Berjalan kaki atau bersepeda", enText: "Walking or cycling" },
          { id: "B", idText: "Menggunakan mobil sendirian untuk jarak sangat dekat", enText: "Driving alone for a very short trip" },
          { id: "C", idText: "Memanaskan mesin kendaraan tanpa tujuan", enText: "Idling a vehicle without purpose" },
          { id: "D", idText: "Memilih perjalanan tambahan yang tidak perlu", enText: "Taking unnecessary extra trips" }
        ],
        answer: "A",
        explanation: {
          id: "Berjalan kaki dan bersepeda tidak membutuhkan bahan bakar dan juga bermanfaat bagi kesehatan.",
          en: "Walking and cycling require no fuel and can also benefit health."
        }
      },
      {
        q: {
          id: "Mengapa merencanakan belanja dapat menjadi kebiasaan ramah lingkungan?",
          en: "Why can planning purchases be an environmentally friendly habit?"
        },
        options: [
          { id: "A", idText: "Mengurangi pembelian berlebihan dan potensi sampah", enText: "It reduces overbuying and potential waste" },
          { id: "B", idText: "Membuat semua barang menjadi gratis", enText: "It makes all goods free" },
          { id: "C", idText: "Menghilangkan kebutuhan memilah sampah", enText: "It removes the need to sort waste" },
          { id: "D", idText: "Meningkatkan penggunaan kemasan", enText: "It increases packaging use" }
        ],
        answer: "A",
        explanation: {
          id: "Daftar belanja membantu membeli sesuai kebutuhan sehingga mengurangi sisa makanan dan kemasan yang tidak perlu.",
          en: "A shopping list helps match purchases to needs, reducing food waste and unnecessary packaging."
        }
      },
      {
        q: {
          id: "Cara yang tepat menggunakan air di rumah adalah...",
          en: "What is a sensible way to use water at home?"
        },
        options: [
          { id: "A", idText: "Menutup keran ketika tidak digunakan", enText: "Turn off taps when not in use" },
          { id: "B", idText: "Membiarkan keran terus mengalir", enText: "Leave taps running continuously" },
          { id: "C", idText: "Menggunakan air berlebihan", enText: "Use excessive amounts of water" },
          { id: "D", idText: "Mengabaikan kebocoran pipa", enText: "Ignore leaking pipes" }
        ],
        answer: "A",
        explanation: {
          id: "Menutup keran saat tidak digunakan dan memperbaiki kebocoran membantu mengurangi pemborosan air.",
          en: "Turning off unused taps and fixing leaks helps reduce water waste."
        }
      }
    ]
  },
  {
    id: "nature",
    titleKey: "categoryNature",
    descKey: "catNatureDesc",
    svgPath: "M12 3C7 3 3 7 3 12c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9zm0 0v18m0-9c-3-3-6-3-8-3m8 3c3-3 6-3 8-3",
    questions: [
      {
        q: {
          id: "Apa yang dimaksud dengan keanekaragaman hayati?",
          en: "What does biodiversity mean?"
        },
        options: [
          { id: "A", idText: "Variasi gen, spesies, dan ekosistem", enText: "The variety of genes, species, and ecosystems" },
          { id: "B", idText: "Jumlah gedung dalam kota", enText: "The number of buildings in a city" },
          { id: "C", idText: "Satu jenis tumbuhan saja", enText: "Only one type of plant" },
          { id: "D", idText: "Jumlah kendaraan bermotor", enText: "The number of motor vehicles" }
        ],
        answer: "A",
        explanation: {
          id: "Keanekaragaman hayati mencakup variasi kehidupan pada tingkat genetik, spesies, dan ekosistem.",
          en: "Biodiversity includes variation at genetic, species, and ecosystem levels."
        }
      },
      {
        q: {
          id: "Apa salah satu peran penting lebah dalam ekosistem?",
          en: "What is one important role of bees in ecosystems?"
        },
        options: [
          { id: "A", idText: "Membantu penyerbukan tanaman", enText: "Helping pollinate plants" },
          { id: "B", idText: "Menghasilkan polusi udara", enText: "Producing air pollution" },
          { id: "C", idText: "Menghentikan siklus air", enText: "Stopping the water cycle" },
          { id: "D", idText: "Menghilangkan seluruh tumbuhan", enText: "Removing all plants" }
        ],
        answer: "A",
        explanation: {
          id: "Lebah membantu memindahkan serbuk sari sehingga mendukung reproduksi banyak tumbuhan berbunga.",
          en: "Bees transfer pollen and support the reproduction of many flowering plants."
        }
      },
      {
        q: {
          id: "Tindakan yang membantu menjaga keanekaragaman hayati adalah...",
          en: "Which action helps protect biodiversity?"
        },
        options: [
          { id: "A", idText: "Menjaga habitat alami dan tidak mengganggu satwa liar", enText: "Protect natural habitats and avoid disturbing wildlife" },
          { id: "B", idText: "Membuang sampah ke sungai", enText: "Dump waste into rivers" },
          { id: "C", idText: "Merusak kawasan hutan", enText: "Destroy forest areas" },
          { id: "D", idText: "Memperdagangkan satwa liar secara ilegal", enText: "Trade wildlife illegally" }
        ],
        answer: "A",
        explanation: {
          id: "Habitat yang sehat menyediakan makanan, tempat berlindung, dan ruang berkembang biak bagi berbagai spesies.",
          en: "Healthy habitats provide food, shelter, and breeding areas for many species."
        }
      }
    ]
  }
];

function renderQuizCategories() {
  const container = $("#quizCategories");
  if (!container) return;

  container.innerHTML = quizCategories.map((cat, index) => `
    <button type="button" data-quiz-id="${cat.id}"
      class="text-left p-5 rounded-2xl bg-white border border-warm-border shadow-sm hover:shadow-md hover:border-forest-400 transition-all group">
      <div class="w-11 h-11 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mb-4 group-hover:bg-forest-800 group-hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${cat.svgPath}"/>
        </svg>
      </div>
      <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        ${language === "id" ? "TOPIK" : "TOPIC"} ${index + 1}
      </p>
      <h3 class="font-serif-title text-lg text-forest-950 mb-2">${t(cat.titleKey)}</h3>
      <p class="text-xs text-slate-500 leading-relaxed">${t(cat.descKey)}</p>
      <div class="mt-4 pt-3 border-t border-warm-border flex items-center justify-between">
        <span class="text-[11px] font-semibold text-forest-700">${cat.questions.length} ${t("questions")}</span>
        <span class="text-forest-800 text-sm">→</span>
      </div>
    </button>
  `).join("");

  $$("[data-quiz-id]").forEach(btn => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.quizId));
  });
}

function startQuiz(id) {
  currentQuiz = quizCategories.find(cat => cat.id === id);
  if (!currentQuiz) return;

  questionIndex = 0;
  quizScore = 0;
  answered = false;

  $("#quizArea").classList.remove("hidden");
  $("#quizArea").scrollIntoView({ behavior: "smooth", block: "start" });

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = currentQuiz.questions[questionIndex];
  const total = currentQuiz.questions.length;
  const progress = ((questionIndex + 1) / total) * 100;

  $("#quizArea").innerHTML = `
    <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
      <span class="uppercase tracking-wider text-forest-700">${t(currentQuiz.titleKey)}</span>
      <span>${t("question")} ${questionIndex + 1} / ${total}</span>
    </div>

    <div class="w-full h-1.5 rounded-full bg-warm-subtle overflow-hidden mb-6">
      <div class="h-full bg-forest-600 transition-all duration-300" style="width:${progress}%"></div>
    </div>

    <h3 class="font-serif-title text-xl sm:text-2xl font-normal text-forest-950 mb-6">
      ${q.q[language] || q.q.id}
    </h3>

    <div class="space-y-3 mb-6">
      ${q.options.map(opt => `
        <button type="button" data-ans="${opt.id}"
          class="quiz-opt-btn w-full p-4 rounded-xl border border-warm-border hover:border-forest-400 hover:bg-forest-50/50 text-left text-xs sm:text-sm font-medium text-slate-700 flex items-center justify-between transition-all">
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-lg bg-warm-subtle text-forest-900 font-bold flex items-center justify-center text-xs shrink-0">${opt.id}</span>
            <span>${language === "id" ? opt.idText : opt.enText}</span>
          </div>
        </button>
      `).join("")}
    </div>

    <div id="quizFeedback" class="mb-6"></div>

    <div class="flex items-center justify-between pt-4 border-t border-warm-border">
      <button id="cancelQuizBtn" type="button" class="text-xs font-bold text-slate-500 hover:text-slate-800">
        ${t("backCategories")}
      </button>
      <button id="nextQuizBtn" type="button"
        class="hidden px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-700 transition-all">
        ${questionIndex === total - 1 ? t("seeResult") : t("next")}
      </button>
    </div>
  `;

  $$("[data-ans]").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(btn.dataset.ans));
  });

  $("#cancelQuizBtn").addEventListener("click", () => {
    $("#quizArea").classList.add("hidden");
    renderQuizCategories();
  });
}

function handleAnswer(selected) {
  if (answered) return;
  answered = true;

  const q = currentQuiz.questions[questionIndex];
  const isCorrect = selected === q.answer;

  if (isCorrect) quizScore++;

  $$("[data-ans]").forEach(btn => {
    btn.disabled = true;

    if (btn.dataset.ans === q.answer) {
      btn.classList.add("border-emerald-500", "bg-emerald-50", "text-emerald-950");
    } else if (btn.dataset.ans === selected) {
      btn.classList.add("border-rose-400", "bg-rose-50", "text-rose-950");
    }
  });

  $("#quizFeedback").innerHTML = `
    <div class="p-4 rounded-xl ${isCorrect
      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
      : "bg-rose-50 border border-rose-200 text-rose-900"} text-xs leading-relaxed">
      <p class="font-bold mb-1">${isCorrect ? t("correct") : t("incorrect")}</p>
      <p>${q.explanation[language] || q.explanation.id}</p>
    </div>
  `;

  const nextBtn = $("#nextQuizBtn");
  nextBtn.classList.remove("hidden");

  nextBtn.addEventListener("click", () => {
    if (questionIndex < currentQuiz.questions.length - 1) {
      questionIndex++;
      answered = false;
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }, { once: true });
}

function finishQuiz() {
  const finalScore = Math.round((quizScore / currentQuiz.questions.length) * 100);
  const user = getUser();

  if (user) {
    user.quizScores[currentQuiz.id] = Math.max(
      finalScore,
      user.quizScores[currentQuiz.id] || 0
    );
    saveDatabase();
  }

  $("#quizArea").innerHTML = `
    <div class="text-center py-6 space-y-4">
      <div class="inline-flex p-4 rounded-2xl bg-forest-50 text-forest-800 mb-2">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      </div>

      <h2 class="font-serif-title text-3xl font-normal text-forest-950">${t("quizFinished")}</h2>

      <p class="text-sm text-slate-600">
        ${t("score")}:
        <strong class="text-forest-800 text-xl font-serif-title">${finalScore}/100</strong>
      </p>

      ${!user ? `
        <p class="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
          ${t("loginRequired")}
        </p>
      ` : ""}

      <div class="flex items-center justify-center gap-3 pt-4">
        <button id="closeQuizResult" type="button"
          class="px-5 py-2.5 rounded-xl border border-warm-border text-xs font-bold text-slate-700 hover:bg-warm-subtle">
          ${t("backCategories")}
        </button>

        <button id="retryQuiz" type="button"
          class="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-700">
          ${t("retry")}
        </button>
      </div>
    </div>
  `;

  $("#closeQuizResult").addEventListener("click", () => {
    $("#quizArea").classList.add("hidden");
    renderQuizCategories();
  });

  $("#retryQuiz").addEventListener("click", () => startQuiz(currentQuiz.id));

  renderQuizCategories();
  if (currentUser) renderForest();
}

/* ================= LIBRARY ENGINE ================= */
const libraryModules = [
  {
    id: "waste",
    title: { id: "Sampah & Daur Ulang", en: "Waste & Recycling" },
    desc: {
      id: "Memahami jenis sampah, pemilahan, dan pengurangan limbah.",
      en: "Understand waste types, sorting, and waste reduction."
    },
    lessons: [
      {
        id: "Sampah organik berasal dari makhluk hidup, misalnya sisa sayur, kulit buah, dan daun.",
        en: "Organic waste comes from living things, such as vegetable scraps, fruit peels, and leaves."
      },
      {
        id: "Sampah anorganik seperti logam, kaca, dan beberapa jenis plastik dapat didaur ulang jika dipilah dan dikelola dengan benar.",
        en: "Inorganic waste such as metal, glass, and some plastics can be recycled when correctly sorted and managed."
      },
      {
        id: "Terapkan prinsip 3R: Reduce (mengurangi), Reuse (menggunakan kembali), dan Recycle (mendaur ulang).",
        en: "Apply the 3Rs: Reduce, Reuse, and Recycle."
      },
      {
        id: "Bersihkan kemasan yang akan didaur ulang sesuai ketentuan fasilitas setempat agar tidak mencemari bahan lain.",
        en: "Clean recyclable packaging according to local facility rules to avoid contaminating other materials."
      }
    ],
    action: {
      id: "Mulai dengan membawa tas belanja dan botol minum pakai ulang.",
      en: "Start by carrying a reusable shopping bag and water bottle."
    }
  },
  {
    id: "climate",
    title: { id: "Iklim & Karbon", en: "Climate & Carbon" },
    desc: {
      id: "Mengenal efek rumah kaca, emisi, dan peran ekosistem.",
      en: "Learn about the greenhouse effect, emissions, and ecosystems."
    },
    lessons: [
      {
        id: "Iklim adalah pola cuaca jangka panjang di suatu wilayah, sedangkan cuaca menggambarkan kondisi atmosfer dalam waktu singkat.",
        en: "Climate describes long-term weather patterns in a region, while weather describes short-term atmospheric conditions."
      },
      {
        id: "Gas rumah kaca seperti karbon dioksida dan metana menyerap serta memancarkan radiasi inframerah di atmosfer.",
        en: "Greenhouse gases such as carbon dioxide and methane absorb and emit infrared radiation in the atmosphere."
      },
      {
        id: "Pembakaran bahan bakar fosil dan perubahan penggunaan lahan merupakan sumber emisi gas rumah kaca akibat aktivitas manusia.",
        en: "Fossil fuel combustion and land-use change are sources of human-caused greenhouse gas emissions."
      },
      {
        id: "Hutan dan lahan basah menyimpan karbon serta menyediakan habitat bagi banyak spesies.",
        en: "Forests and wetlands store carbon and provide habitats for many species."
      }
    ],
    action: {
      id: "Hemat energi dan pilih perjalanan rendah emisi jika memungkinkan.",
      en: "Conserve energy and choose lower-emission travel when practical."
    }
  },
  {
    id: "energy",
    title: { id: "Energi Terbarukan", en: "Renewable Energy" },
    desc: {
      id: "Mengenal sumber energi bersih dan efisiensi penggunaannya.",
      en: "Explore cleaner energy sources and energy efficiency."
    },
    lessons: [
      {
        id: "Energi surya memanfaatkan cahaya matahari, umumnya melalui panel fotovoltaik untuk menghasilkan listrik.",
        en: "Solar energy uses sunlight, commonly through photovoltaic panels to generate electricity."
      },
      {
        id: "Energi angin menggunakan turbin untuk mengubah energi gerak udara menjadi energi listrik.",
        en: "Wind energy uses turbines to convert moving air into electricity."
      },
      {
        id: "Tenaga air dan panas bumi juga termasuk sumber energi terbarukan, dengan dampak yang bergantung pada lokasi dan pengelolaannya.",
        en: "Hydropower and geothermal energy are also renewable sources, with impacts depending on location and management."
      },
      {
        id: "Efisiensi energi berarti memperoleh layanan yang sama dengan penggunaan energi lebih sedikit.",
        en: "Energy efficiency means getting the same service while using less energy."
      }
    ],
    action: {
      id: "Matikan lampu dan perangkat elektronik saat tidak digunakan.",
      en: "Switch off lights and electronic devices when not in use."
    }
  },
  {
    id: "lifestyle",
    title: { id: "Gaya Hidup Hijau", en: "Sustainable Lifestyle" },
    desc: {
      id: "Pilihan sehari-hari yang membantu mengurangi jejak lingkungan.",
      en: "Everyday choices that help reduce environmental footprints."
    },
    lessons: [
      {
        id: "Belanja sesuai kebutuhan dapat mengurangi konsumsi berlebihan, sampah kemasan, dan makanan terbuang.",
        en: "Buying only what you need can reduce overconsumption, packaging waste, and food waste."
      },
      {
        id: "Gunakan barang tahan lama dan perbaiki barang yang masih layak sebelum menggantinya.",
        en: "Choose durable goods and repair usable items before replacing them."
      },
      {
        id: "Berjalan kaki, bersepeda, atau menggunakan transportasi umum dapat menjadi pilihan perjalanan yang lebih rendah emisi.",
        en: "Walking, cycling, or using public transport can be lower-emission travel options."
      },
      {
        id: "Hemat air dengan menutup keran, memperbaiki kebocoran, dan menggunakan air secukupnya.",
        en: "Save water by turning off taps, fixing leaks, and using only what is needed."
      }
    ],
    action: {
      id: "Pilih satu kebiasaan hijau untuk dilakukan secara konsisten minggu ini.",
      en: "Choose one green habit to practice consistently this week."
    }
  },
  {
    id: "nature",
    title: { id: "Keanekaragaman Hayati", en: "Biodiversity" },
    desc: {
      id: "Memahami ragam kehidupan dan pentingnya menjaga habitat.",
      en: "Understand the variety of life and why habitats matter."
    },
    lessons: [
      {
        id: "Keanekaragaman hayati mencakup variasi gen, spesies, dan ekosistem.",
        en: "Biodiversity includes diversity of genes, species, and ecosystems."
      },
      {
        id: "Setiap spesies memiliki peran dalam ekosistem, misalnya sebagai penyerbuk, pengurai, predator, atau sumber makanan.",
        en: "Each species has a role in ecosystems, such as pollinator, decomposer, predator, or food source."
      },
      {
        id: "Perusakan habitat, polusi, eksploitasi berlebihan, dan spesies invasif dapat mengancam keanekaragaman hayati.",
        en: "Habitat destruction, pollution, overexploitation, and invasive species can threaten biodiversity."
      },
      {
        id: "Melindungi habitat alami dan tidak memperdagangkan satwa liar secara ilegal membantu menjaga populasi spesies.",
        en: "Protecting natural habitats and avoiding illegal wildlife trade help conserve species populations."
      }
    ],
    action: {
      id: "Jaga ruang hijau sekitar dan hindari mengganggu satwa liar.",
      en: "Care for nearby green spaces and avoid disturbing wildlife."
    }
  }
];

function renderLibrary() {
  const user = getUser();
  const completed = user?.completedModules || [];
  const completedCount = libraryModules.filter(mod => completed.includes(mod.id)).length;

  $("#libraryCount").textContent = `${completedCount}/${libraryModules.length} ${t("moduleProgress")}`;
  $("#libraryProgressBar").style.width = `${(completedCount / libraryModules.length) * 100}%`;

  $("#libraryGrid").innerHTML = libraryModules.map((mod, index) => {
    const isDone = completed.includes(mod.id);
    const title = mod.title[language] || mod.title.id;
    const desc = mod.desc[language] || mod.desc.id;

    return `
      <article class="p-6 rounded-3xl bg-white border border-warm-border shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              isDone
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-warm-subtle text-slate-500"
            }">
              ${isDone ? t("completedLabel") : (language === "id" ? "MODUL " : "MODULE ") + (index + 1)}
            </span>
          </div>

          <h3 class="font-serif-title text-xl font-normal text-forest-950 mb-2">${title}</h3>
          <p class="text-xs text-slate-500 mb-4">${desc}</p>

          <ul class="space-y-3 border-t border-warm-border/60 pt-4">
            ${mod.lessons.map(lesson => `
              <li class="text-xs text-slate-600 flex items-start gap-2">
                <svg class="w-4 h-4 text-forest-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>${lesson[language] || lesson.id}</span>
              </li>
            `).join("")}
          </ul>

          <div class="mt-4 p-3 rounded-xl bg-forest-50/70 border border-forest-100">
            <p class="text-[10px] font-bold uppercase tracking-wide text-forest-800 mb-1">
              ${language === "id" ? "COBA LAKUKAN" : "TAKE ACTION"}
            </p>
            <p class="text-xs text-forest-900">${mod.action[language] || mod.action.id}</p>
          </div>
        </div>

        <button type="button" data-module-id="${mod.id}"
          ${isDone || !user ? "disabled" : ""}
          class="w-full py-2.5 px-4 rounded-xl ${
            isDone
              ? "bg-warm-subtle text-slate-400 cursor-default"
              : "bg-forest-800 hover:bg-forest-700 text-white"
          } text-xs font-bold transition-all">
          ${isDone ? t("completedLabel") : t("markComplete")}
        </button>
      </article>
    `;
  }).join("");

  $$("[data-module-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const activeUser = getUser();
      if (!activeUser) return openLogin();

      const moduleId = btn.dataset.moduleId;
      activeUser.completedModules = activeUser.completedModules || [];

      if (!activeUser.completedModules.includes(moduleId)) {
        activeUser.completedModules.push(moduleId);
        saveDatabase();
        renderLibrary();
        renderForest();
        showToast(t("saved"));
      }
    });
  });
}

/* ================= FACTS SYSTEM ================= */
const facts = [
  {
    svg: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    title: {
      id: "Daur Ulang Tepat",
      en: "Proper Recycling"
    },
    text: {
      id: "Memilah sampah secara benar membantu bahan plastik dan kertas masuk ke rantai daur ulang yang bersih.",
      en: "Proper waste sorting helps plastic and paper enter clean recycling streams."
    }
  },
  {
    svg: "M13 10V3L4 14h7v7l9-11h-7z",
    title: {
      id: "Hemat Listrik",
      en: "Save Electricity"
    },
    text: {
      id: "Mematikan perangkat elektronik yang tidak digunakan dapat mengurangi konsumsi energi.",
      en: "Turning off unused electronic devices can reduce energy consumption."
    }
  },
  {
    svg: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    title: {
      id: "Gunakan Barang Pakai Ulang",
      en: "Choose Reusable Items"
    },
    text: {
      id: "Membawa botol dan kantong sendiri dapat mengurangi penggunaan barang sekali pakai.",
      en: "Carrying your own bottle and bag can reduce single-use items."
    }
  }
];

function renderFacts() {
  const container = $("#factGrid");
  if (!container) return;

  container.innerHTML = facts.map(f => `
    <div class="p-6 rounded-2xl bg-white border border-warm-border shadow-sm space-y-3">
      <div class="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${f.svg}"/>
        </svg>
      </div>
      <h3 class="font-serif-title text-lg font-semibold text-forest-950">
        ${f.title[language] || f.title.id}
      </h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        ${f.text[language] || f.text.id}
      </p>
    </div>
  `).join("");
}

/* ================= VIRTUAL TREE & HUTANKU ================= */

const treeSvgStages = [
  // Stage 0: Benih
  `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="80" rx="35" ry="8" fill="#2f5344" opacity="0.3"/>
    <path d="M50 78 C50 78 46 70 50 66 C54 70 50 78 50 78Z"
      fill="#87a987" stroke="#4e826b" stroke-width="2"/>
  </svg>`,

  // Stage 1: Tunas
  `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none"
    stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="50" cy="82" rx="30" ry="6" fill="#2f5344" opacity="0.3"/>
    <path d="M50 80 Q50 60 50 50" stroke="#72a08a"/>
    <path d="M50 50 Q38 40 32 46 Q42 54 50 50"
      fill="#87a987" stroke="#3a6854"/>
    <path d="M50 50 Q62 40 68 46 Q58 54 50 50"
      fill="#87a987" stroke="#3a6854"/>
  </svg>`,

  // Stage 2: Pohon kecil
  `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none"
    stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="50" cy="85" rx="35" ry="7" fill="#2f5344" opacity="0.4"/>
    <path d="M50 82 Q48 55 50 35" stroke="#72a08a" stroke-width="3.5"/>
    <circle cx="38" cy="38" r="12" fill="#4e826b" opacity="0.8"/>
    <circle cx="62" cy="38" r="12" fill="#4e826b" opacity="0.8"/>
    <circle cx="50" cy="26" r="15" fill="#87a987" opacity="0.9"/>
  </svg>`,

  // Stage 3: Pohon berkembang
  `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none"
    stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="50" cy="86" rx="38" ry="7" fill="#183a29" opacity="0.5"/>
    <path d="M50 85 L50 40 M50 60 L35 48 M50 52 L65 42"
      stroke="#72a08a" stroke-width="4"/>
    <circle cx="32" cy="42" r="16" fill="#3a6854"/>
    <circle cx="68" cy="38" r="16" fill="#3a6854"/>
    <circle cx="50" cy="24" r="22" fill="#72a08a"/>
  </svg>`,

  // Stage 4: Pohon lebat
  `<svg class="w-full h-full" viewBox="0 0 100 100" fill="none"
    stroke-width="2.5" stroke-linecap="round">
    <ellipse cx="50" cy="88" rx="40" ry="8" fill="#0c2016" opacity="0.6"/>
    <path d="M50 86 L50 38 M50 62 L30 46 M50 54 L70 42"
      stroke="#72a08a" stroke-width="5"/>
    <circle cx="30" cy="42" r="20" fill="#2f5344"/>
    <circle cx="70" cy="38" r="20" fill="#2f5344"/>
    <circle cx="50" cy="22" r="26" fill="#4e826b"/>
    <circle cx="50" cy="22" r="18" fill="#87a987" opacity="0.4"/>
  </svg>`
];

const dailyActions = [
  {
    id: "water",
    titleKey: "actionWater",
    descKey: "actionWaterDesc",
    svg: "M20 14c0 4.418-3.582 8-8 8s-8-3.582-8-8C4 8 12 2 12 2s8 6 8 12z"
  },
  {
    id: "bottle",
    titleKey: "actionBottle",
    descKey: "actionBottleDesc",
    svg: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
  },
  {
    id: "waste",
    titleKey: "actionWaste",
    descKey: "actionWasteDesc",
    svg: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  },
  {
    id: "energy",
    titleKey: "actionEnergy",
    descKey: "actionEnergyDesc",
    svg: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    id: "plant",
    titleKey: "actionPlant",
    descKey: "actionPlantDesc",
    svg: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
  }
];

function calculateGrowth(user) {
  const scores = Object.values(user.quizScores || {});
  const avgScore = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  const completedModules = (user.completedModules || []).length;
  const actionCount = Object.keys(user.actions || {}).length;

  const progress = Math.min(100, Math.round(
    (scores.length / quizCategories.length) * 35 +
    (avgScore / 100) * 25 +
    (completedModules / libraryModules.length) * 25 +
    (Math.min(actionCount, 5) / 5) * 15
  ));

  return {
    progress,
    avgScore: Math.round(avgScore),
    completedModules,
    topicCount: scores.length
  };
}

function renderForest() {
  const user = getUser();
  if (!user) return;

  const stats = calculateGrowth(user);

  const stageIdx =
    stats.progress >= 80 ? 4 :
    stats.progress >= 55 ? 3 :
    stats.progress >= 30 ? 2 :
    stats.progress >= 10 ? 1 : 0;

  $("#forestName").textContent = currentUser;

  $("#forestStats").innerHTML = `
    <div class="p-4 rounded-2xl bg-white border border-warm-border shadow-sm">
      <span class="text-xs text-slate-500 font-medium">${t("treeProgress")}</span>
      <p class="font-serif-title text-2xl text-forest-950 mt-1">${stats.progress}%</p>
    </div>

    <div class="p-4 rounded-2xl bg-white border border-warm-border shadow-sm">
      <span class="text-xs text-slate-500 font-medium">${t("statTopics")}</span>
      <p class="font-serif-title text-2xl text-forest-950 mt-1">${stats.topicCount}/${quizCategories.length}</p>
    </div>

    <div class="p-4 rounded-2xl bg-white border border-warm-border shadow-sm">
      <span class="text-xs text-slate-500 font-medium">${t("statModules")}</span>
      <p class="font-serif-title text-2xl text-forest-950 mt-1">${stats.completedModules}/${libraryModules.length}</p>
    </div>

    <div class="p-4 rounded-2xl bg-white border border-warm-border shadow-sm">
      <span class="text-xs text-slate-500 font-medium">${t("statAverage")}</span>
      <p class="font-serif-title text-2xl text-forest-950 mt-1">${stats.avgScore}%</p>
    </div>
  `;

  $("#treeSvgContainer").innerHTML = treeSvgStages[stageIdx];
  $("#treeStageName").textContent = t(`stage${stageIdx}`);
  $("#treeDescription").textContent = t(`stageDesc${stageIdx}`);
  $("#growthValue").textContent = `${stats.progress}%`;
  $("#growthBar").style.width = `${stats.progress}%`;

  const today = todayKey();
  const doneToday = user.dailyActions?.[today] || [];

  $("#actionList").innerHTML = dailyActions.map(act => {
    const isDone = doneToday.includes(act.id);

    return `
      <div class="p-3.5 rounded-2xl border border-warm-border flex items-center justify-between gap-3 bg-white">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${act.svg}"/>
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-forest-950">${t(act.titleKey)}</p>
            <p class="text-[11px] text-slate-500">${t(act.descKey)}</p>
          </div>
        </div>

        <button type="button" data-action-id="${act.id}"
          ${isDone ? "disabled" : ""}
          class="w-7 h-7 rounded-lg border ${
            isDone
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "border-warm-border hover:bg-warm-subtle text-slate-600"
          } flex items-center justify-center font-bold text-xs shrink-0">
          ${isDone ? "✓" : "+"}
        </button>
      </div>
    `;
  }).join("");

  $$("[data-action-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const activeUser = getUser();
      if (!activeUser) return;

      const actionId = btn.dataset.actionId;

      activeUser.dailyActions = activeUser.dailyActions || {};
      activeUser.dailyActions[today] = activeUser.dailyActions[today] || [];
      activeUser.actions = activeUser.actions || {};

      if (!activeUser.dailyActions[today].includes(actionId)) {
        activeUser.dailyActions[today].push(actionId);
        activeUser.actions[actionId] = true;

        saveDatabase();
        renderForest();
        showToast(t("actionRecorded"));
      }
    });
  });

  $("#journeyList").innerHTML = [0, 1, 2, 3, 4].map(idx => `
    <div class="flex items-center gap-3 p-2.5 rounded-xl ${
      stageIdx >= idx ? "bg-forest-50/70 border border-forest-100" : "opacity-50"
    }">
      <div class="w-6 h-6 rounded-full ${
        stageIdx >= idx ? "bg-forest-800 text-white" : "bg-warm-subtle text-slate-400"
      } text-[10px] font-bold flex items-center justify-center shrink-0">
        ${idx + 1}
      </div>
      <div>
        <p class="text-xs font-bold text-forest-950">${t(`stage${idx}`)}</p>
        <p class="text-[10px] text-slate-500">${t(`stageDesc${idx}`)}</p>
      </div>
    </div>
  `).join("");
}

/* ================= LOGIN DIALOG ================= */

function openLogin() {
  const dialog = $("#loginDialog");
  if (dialog && !dialog.open) dialog.showModal();
}

$("#loginBtn").addEventListener("click", () => {
  if (currentUser) {
    location.hash = "#hutanku";
  } else {
    openLogin();
  }
});

$("#closeLogin").addEventListener("click", () => {
  $("#loginDialog").close();
});

$("#logoutBtn").addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem("ecoquest_current_user");

  $("#forestNav").classList.add("hidden");
  $("#mobileForestNav").classList.add("hidden");
  $("#logoutBtn").classList.add("hidden");
  $("#loginBtn").classList.remove("hidden");

  showToast(t("logoutSuccess"));
  location.hash = "#beranda";
});

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#username").value.trim();
  if (!name) return;

  currentUser = name;
  localStorage.setItem("ecoquest_current_user", name);

  getOrCreateUser(name);
  saveDatabase();

  $("#loginDialog").close();
  $("#loginBtn").classList.add("hidden");
  $("#logoutBtn").classList.remove("hidden");
  $("#forestNav").classList.remove("hidden");
  $("#mobileForestNav").classList.remove("hidden");

  showToast(`${t("welcome")}, ${name}!`);
  location.hash = "#hutanku";
});

/* ================= MOBILE NAVIGATION ================= */

$("#mobileMenuBtn").addEventListener("click", () => {
  $("#mobileNav").classList.toggle("hidden");
});

/* ================= LANGUAGE SWITCHER ================= */

function setLanguage(lang) {
  language = lang;
  localStorage.setItem(LANG_KEY, lang);

  $("#langLabel").textContent = lang === "id" ? "EN" : "ID";

  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    if (translations[language]?.[key]) {
      el.textContent = translations[language][key];
    }
  });

  renderQuizCategories();
  renderLibrary();
  renderFacts();

  if (currentUser) renderForest();
}

$("#languageBtn").addEventListener("click", () => {
  setLanguage(language === "id" ? "en" : "id");
});

/* ================= SHARE BUTTON ================= */

$("#shareBtn").addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    showToast(t("shareCopied"));
  }
});

/* ================= INITIALIZATION ================= */

function init() {
  $("#year").textContent = new Date().getFullYear();

  if (currentUser) {
    $("#forestNav").classList.remove("hidden");
    $("#mobileForestNav").classList.remove("hidden");
    $("#logoutBtn").classList.remove("hidden");
    $("#loginBtn").classList.add("hidden");
  }

  setLanguage(language);
  renderFacts();
  renderQuizCategories();
  renderLibrary();

  navigateToHash(location.hash || "#beranda");
}

window.addEventListener("DOMContentLoaded", init);
