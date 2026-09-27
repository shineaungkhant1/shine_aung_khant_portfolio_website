export const profile = {
  name: "Shine Aung Khant",
  role: "Flutter developer",
  location: "Ho Chi Minh City",
  origin: "Yangon, Myanmar",
  email: "shineaungkhant1@gmail.com",
  emailHref: "https://mail.google.com/mail/?view=cm&fs=1&to=shineaungkhant1@gmail.com",
  phone: "+84 38 440 1005",
  phoneHref: "tel:+84384401005",
  linkedin: "https://www.linkedin.com/in/shine-aung-khant/",
  github: "https://github.com/shineaungkhant1",
  resume: "/Shine-Aung-Khant-Resume.pdf",
  summary:
    "Mid-level Flutter developer shipping Android and iOS apps for streaming, commerce, and education. I use Clean Architecture and BLoC, and I tune playback, images, and startup so the apps stay usable on low-end phones.",
};

export type Category =
  | "Streaming"
  | "Commerce"
  | "Education"
  | "Delivery";

export type Project = {
  slug: string;
  name: string;
  category: Category;
  org: string;
  period: string;
  summary: string;
  outcome?: string;
  points: string[];
  stack: string[];
  appStore?: string;
  playStore?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "saytaman",
    name: "SAYTAMAN",
    category: "Streaming",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "A movie and live streaming app for Myanmar and international films, with subscriptions and playback that holds up on weak connections.",
    outcome: "Active user retention rose 48% after launch.",
    points: [
      "Owned the Flutter app from architecture through App Store and Play Store release.",
      "Modeled playback, live updates, and subscription state with BLoC and Clean Architecture.",
      "Tuned media rendering and image caching for low-connectivity networks.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "REST", "Firebase"],
    appStore: "https://apps.apple.com/app/saytaman/id6758314311",
    playStore:
      "https://play.google.com/store/apps/details?id=com.saytaman.say_ta_man",
    featured: true,
  },
  {
    slug: "saytaman-tv",
    name: "SAYTAMAN TV",
    category: "Streaming",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "The living-room version of SAYTAMAN: Myanmar and international movies on Android TV, laid out for a remote rather than a thumb.",
    points: [
      "Built the TV client for a large film library and live channels.",
      "Adapted navigation, focus, and playback for a big screen.",
    ],
    stack: ["Flutter", "Dart", "Android TV", "BLoC"],
    playStore:
      "https://play.google.com/store/apps/details?id=com.saytaman_tv.say_ta_man_tv",
  },
  {
    slug: "ogo-home",
    name: "OGO Home",
    category: "Commerce",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "A shopping app for home products, with catalog browsing, cart, checkout, and order updates.",
    outcome: "Passed 1,000 downloads in the first three months.",
    points: [
      "Built the customer app for product browsing, cart, and checkout.",
      "Connected orders to backend APIs so status stays current after purchase.",
      "Released and updated the app on the App Store and Play Store.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST", "Firebase"],
    appStore: "https://apps.apple.com/app/ogo-home/id6742512062",
    playStore: "https://play.google.com/store/apps/details?id=com.olivego.shop",
    featured: true,
  },
  {
    slug: "natsay",
    name: "NATSAY",
    category: "Commerce",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "An e-commerce app with search, favorites, cart, checkout, orders, and notifications.",
    points: [
      "Implemented the shopping flow from browse to order history.",
      "Added booking, language, and account screens around the same architecture.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST"],
  },
  {
    slug: "saung",
    name: "Saung",
    category: "Streaming",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "A music streaming app with a library, media playback, and a premium tier.",
    points: [
      "Built home, library, and playback around a premium account model.",
      "Handled app updates, language, and signed-in user state.",
    ],
    stack: ["Flutter", "Dart", "BLoC"],
  },
  {
    slug: "strategyfirst-learn",
    name: "StrategyFirst Learn",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "The college app for digital student IDs, campus wallet, schedules, news, and sign-in.",
    outcome: "Active student logins rose 48% after the release.",
    points: [
      "Built Android and iOS flows for campus life, not only course content.",
      "Integrated Firebase, Cloud Firestore, and REST for auth and live updates.",
      "Shipped releases on the App Store and Play Store.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Firebase", "Cloud Firestore", "REST"],
    appStore: "https://apps.apple.com/app/strategyfirst-learn/id6444846287",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sfu.studentapp",
    featured: true,
  },
  {
    slug: "sfux",
    name: "SFUx",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "An online learning app for certified courses, with social login, quizzes, and certificates generated after a passing score.",
    outcome: "Reached more than 12,000 downloads in the first three months.",
    points: [
      "Built lesson, quiz, and certificate flows for professional courses.",
      "Connected authentication and course data through Firebase and REST.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Firebase", "REST"],
    appStore: "https://apps.apple.com/app/sfux/id1506353798",
    playStore: "https://play.google.com/store/apps/details?id=com.edu.sfuxlearn",
    featured: true,
  },
  {
    slug: "waso-learn",
    name: "Waso Learn KG-12",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "A mobile classroom for kindergarten through grade 12, aligned with the Myanmar school curriculum.",
    outcome: "More than 5,000 active students in the first six months.",
    points: [
      "Built learning flows students can use from a phone, including on modest hardware.",
      "Shipped the public app on the App Store and Play Store.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Firebase"],
    appStore: "https://apps.apple.com/app/waso-learn-kg-12/id1531073432",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sfu.waso_learn",
    featured: true,
  },
  {
    slug: "waso-lite",
    name: "Waso Lite",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "A smaller Waso Learn for low-RAM phones, covering the same KG–12 curriculum without the full app’s weight.",
    outcome: "Cut about 25 MB from the app and improved load time by 60%.",
    points: [
      "Stripped the learning app down so it starts and runs on low-end Android phones.",
      "Kept the curriculum path intact while reducing what the device has to load.",
    ],
    stack: ["Flutter", "Dart", "Performance", "Firebase"],
    appStore: "https://apps.apple.com/app/waso-lite/id6739276883",
    playStore: "https://play.google.com/store/apps/details?id=com.sfu.waso_lite",
    featured: true,
  },
  {
    slug: "waso-learn-tv",
    name: "Waso Learn TV",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "Waso lessons on a television, so students can study the KG–12 material on a larger screen.",
    points: [
      "Adapted the learning product for TV navigation and playback.",
    ],
    stack: ["Flutter", "Dart"],
    playStore: "https://play.google.com/store/apps/details?id=com.waso.tv",
  },
  {
    slug: "putet-comics",
    name: "Putet Comics 2.0",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "A reading app for Putet Comics, including weekly journals, a classics library, and free Buddhist comics.",
    outcome: "Monthly active users rose 35% within three months of the 2.0 release.",
    points: [
      "Added interactive reading features on top of the existing comics library.",
      "Improved image loading so high-page comics stay quick to open.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Firebase"],
    appStore: "https://apps.apple.com/app/putet-comics-2-0/id1559173511",
    playStore: "https://play.google.com/store/apps/details?id=com.putet.comic",
  },
  {
    slug: "ssbu-elearn",
    name: "SSBU eLearn",
    category: "Education",
    org: "Strategy First International College",
    period: "Mar 2024 — Jun 2025",
    summary:
      "A learning app for State Pariyatti Sasana University students, published with the rest of the Strategy First education apps.",
    points: [
      "Built and maintained the Flutter client and its store releases.",
    ],
    stack: ["Flutter", "Dart", "BLoC"],
    appStore: "https://apps.apple.com/app/ssbu-elearn/id6444035277",
    playStore:
      "https://play.google.com/store/apps/details?id=com.sfu.ssbuElearn",
  },
  {
    slug: "matali-food-express",
    name: "MATALI Food Express",
    category: "Delivery",
    org: "Freelance",
    period: "Dec 2024 — Present",
    summary:
      "The customer app for browsing restaurants, building an order, saving addresses, and tracking delivery.",
    outcome:
      "Paired with the rider app, the delivery operation ran about 30% more efficiently.",
    points: [
      "Built restaurant browse, search, cart, and order tracking.",
      "Integrated maps, payments, and push notifications.",
      "Covered auth, addresses, and profile with BLoC.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Firebase", "Maps"],
    appStore: "https://apps.apple.com/app/matali-food-express/id6765841474",
    playStore: "https://play.google.com/store/apps/details?id=com.matali.food_express",
  },
  {
    slug: "matali-business-delivery",
    name: "MATALI Business Delivery",
    category: "Delivery",
    org: "Freelance",
    period: "Dec 2024 — Present",
    summary:
      "The rider app that sits beside MATALI Food Express, so orders can be picked up and completed in real time.",
    points: [
      "Built the courier side of the same delivery system as the customer app.",
      "Used the same architecture so both apps could ship on a shared schedule.",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Maps", "Firebase"],
    appStore: "https://apps.apple.com/app/matali-business-delivery/id6760626835",
    playStore: "https://play.google.com/store/apps/details?id=com.matali.business_delivery",
  },
  {
    slug: "harvest-box",
    name: "Harvest Box",
    category: "Delivery",
    org: "Freelance",
    period: "Dec 2024 — Present",
    summary:
      "The customer app for a community-supported agriculture service: see the week’s harvest and place an order.",
    points: [
      "Built the customer ordering experience for produce from local farms.",
    ],
    stack: ["Flutter", "Dart", "BLoC"],
  },
  {
    slug: "harvest-share",
    name: "Harvest Share",
    category: "Delivery",
    org: "Freelance",
    period: "Dec 2024 — Present",
    summary:
      "The farmer-side app paired with Harvest Box, so growers can manage what they are offering to the community.",
    points: [
      "Built the farmer client that complements the customer ordering app.",
    ],
    stack: ["Flutter", "Dart", "BLoC"],
  },
  {
    slug: "citi-cab-partner",
    name: "Citi Cab Partner",
    category: "Delivery",
    org: "AXRA Tech",
    period: "Jul 2025 — Present",
    summary:
      "A partner app for a taxi operation: cars, drivers, trips, monitoring, and payments.",
    points: [
      "Built the owner tools for fleet, trip, and payment history.",
      "Kept live operational screens separate from driver and vehicle records.",
    ],
    stack: ["Flutter", "Dart", "BLoC"],
  },
];

export const categories: Array<Category | "All"> = [
  "All",
  "Streaming",
  "Commerce",
  "Education",
  "Delivery",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const experience = [
  {
    role: "Mid Flutter Developer",
    org: "AXRA Tech",
    place: "Yangon",
    period: "Jul 2025 — Present",
    points: [
      "Architected and shipped Flutter apps for Android and iOS, including SAYTAMAN and OGO Home.",
      "Standardized new work on Clean Architecture and BLoC.",
      "Integrated Cloud Firestore and REST for live data, payments, and inventory.",
      "Managed App Store and Play Store releases, and profiled startup, memory, and stability.",
    ],
  },
  {
    role: "Freelance Flutter Developer",
    org: "Independent",
    place: "Remote",
    period: "Dec 2024 — Present",
    points: [
      "Delivered food delivery, rider, and farm-to-community apps with maps, payments, and push notifications.",
      "Wrote unit and widget tests before release and shipped updates with designers, backend, and QA.",
    ],
  },
  {
    role: "Flutter Developer",
    org: "Strategy First International College",
    place: "Yangon",
    period: "Mar 2024 — Jun 2025",
    points: [
      "Built the college learning apps: StrategyFirst Learn, SFUx, Waso Learn, Waso Lite, and Putet Comics 2.0.",
      "Integrated social login, quizzes, digital IDs, schedules, and certificates.",
      "Designed the UI so it still works on low-RAM phones and uneven networks.",
    ],
  },
  {
    role: "Junior Flutter Developer",
    org: "Xlance Collective",
    place: "Yangon",
    period: "Sep 2023 — Feb 2024",
    points: [
      "Built client apps for delivery, dating, and games using GetX and Provider.",
      "Shipped a dating app that reached 15,000 downloads and a 4.3 rating in six months.",
      "Contributed to a Wordle-style game and a gym update that doubled daily active users.",
    ],
  },
  {
    role: "Junior Flutter Developer, volunteer",
    org: "Tee Htwin",
    place: "Yangon",
    period: "May 2023 — Oct 2023",
    points: [
      "Helped build an art marketplace for browsing, buying, selling, and live bidding.",
      "The launch reached 3,500 registered users in the first month.",
    ],
  },
];

export const education = [
  {
    title: "UK BSc (Hons) Computer Science",
    org: "Strategy First International College",
    period: "Dec 2025 — Present (expected Dec 2028)",
  },
  {
    title: "Diploma in Network Communication",
    org: "KMD College, Myanmar",
    period: "Completed",
  },
  {
    title: "Physics",
    org: "University of Distance Education, Myanmar",
    period: "Completed",
  },
];

export const certifications = [
  {
    title: "Flutter Developer Certificate (A+)",
    href: "https://drive.google.com/drive/folders/1Mdl13YRT59k_RtjT4-Cq11rWFYNzIx5H",
  },
  {
    title: "Advanced Java Certificate",
    href: "https://drive.google.com/drive/folders/18TwUmtbzciJB4dM7PUdSKXqKq_9VVCzD",
  },
  {
    title: "PHP Programming Professional Certificate (A)",
    href: "https://drive.google.com/drive/folders/1Rvke1J47QfDX5PFLmZ0jVycUoMbXeZb2",
  },
  {
    title: "Google Cybersecurity Professional Certificate, Coursera",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/CVIQJ9IQX49D",
  },
];

export const projectMedia: Record<string, { icon: string; cover?: string }> = {
  saytaman: { icon: "/projects/saytaman.png" },
  "saytaman-tv": { icon: "/projects/saytaman-tv.png" },
  "ogo-home": { icon: "/projects/ogo-home.png", cover: "/projects/ogo-home-cover.png" },
  natsay: { icon: "/projects/natsay.png" },
  saung: { icon: "/projects/saung.png" },
  "strategyfirst-learn": { icon: "/projects/strategyfirst-learn.png" },
  sfux: { icon: "/projects/sfux.png", cover: "/projects/sfux-cover.png" },
  "waso-learn": { icon: "/projects/waso-learn.png" },
  "waso-lite": { icon: "/projects/waso-lite.png" },
  "waso-learn-tv": { icon: "/projects/waso-learn-tv.png" },
  "putet-comics": { icon: "/projects/putet-comics.png", cover: "/projects/putet-comics-cover.png" },
  "ssbu-elearn": { icon: "/projects/ssbu-elearn.png" },
  "matali-food-express": { icon: "/projects/matali-food-express.png" },
  "matali-business-delivery": { icon: "/projects/matali-business-delivery.png" },
  "harvest-box": { icon: "/projects/harvest-box.png", cover: "/projects/harvest-box-cover.png" },
  "harvest-share": { icon: "/projects/harvest-share.png" },
  "citi-cab-partner": { icon: "/projects/citi-cab-partner.png" },
};

export const skillGroups = [
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "BLoC", "Provider", "GetX", "Clean Architecture"],
  },
  {
    label: "Platform",
    items: ["Firebase", "Cloud Firestore", "REST", "Stripe", "App Store", "Play Store"],
  },
  {
    label: "Also used",
    items: ["Java", "Spring", "JavaScript", "Angular", "PHP", "MySQL", "PostgreSQL"],
  },
];
