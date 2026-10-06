// ScanQR Global & Cerca i18n Language Pack
// Comprehensive localization supporting Thai (ไทย), English, Spanish, Portuguese, French, German, Japanese, and Chinese

export type Locale = 'en' | 'th' | 'es' | 'pt' | 'fr' | 'de' | 'ja' | 'zh'

export interface LocaleOption {
  code: Locale
  label: string
  flag: string
}

export const SUPPORTED_LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'th', label: 'ภาษาไทย (Thai)', flag: '🇹🇭' },
  { code: 'es', label: 'Español', flag: '🇨🇴' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

export interface CityTranslation {
  name: string
  tag: string
  pulse: string
  venuesCount: string
  highlights?: string
}

export interface HostTranslation {
  role: string
  badge: string
  bio: string
  name?: string
  city?: string
}

export interface UiTranslations {
  nav: {
    exploreMap: string
    launchApp: string
    languageLabel: string
  }
  telemetry: {
    liveBadge: string
    tickerHeader: string
    pingLatency: string
    hubActive: string
  }
  hero: {
    trustBadge: string
    headline: string
    headlineHighlight: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    statsHubs: string
    statsVitals: string
    statsSafety: string
    statsHandshake: string
  }
  queryBar: {
    title: string
    placeholder: string
    synthesizing: string
    chipAll: string
    chips: {
      bangkok: string
      phuket: string
      bogota: string
      rio: string
      miami: string
      qr: string
    }
  }
  geoPing: {
    detectBtn: string
    scanning: string
    lockedTitle: string
    distance: string
    recommendedSpot: string
    pulseLabel: string
    exploreCityCta: string
    browserPrompt: string
  }
  pillars: {
    sectionTitle: string
    sectionSubtitle: string
    guestModeTitle: string
    guestModeDesc: string
    guestModeCta: string
    touristModeTitle: string
    touristModeDesc: string
    touristModeCta: string
    pulseModeTitle: string
    pulseModeDesc: string
    pulseModeCta: string
    qrModeTitle: string
    qrModeDesc: string
    qrModeCta: string
  }
  markets: {
    sectionTitle: string
    sectionSubtitle: string
    tabThailand: string
    tabColombia: string
    tabBrazil: string
    tabUsa: string
    viewCityGuide: string
  }
  carousel: {
    badge: string
    viewFullGuide: string
  }
  hosts: {
    sectionTitle: string
    sectionSubtitle: string
    tapToEmail: string
    dossierBadge: string
    overviewTitle: string
    servicesTitle: string
    topSpotsTitle: string
    languagesTitle: string
    musicTitle: string
    emailBtn: string
    cercaBtn: string
    whatsappBtn: string
    reviewsText: string
  }
  trust: {
    sectionTitle: string
    zeroDataTitle: string
    zeroDataDesc: string
    cryptoTitle: string
    cryptoDesc: string
    hostsTitle: string
    hostsDesc: string
    supportEmailBadge: string
  }
  classifieds: {
    badge: string
    title: string
    subtitle: string
    allTab: string
    bangkokTab: string
    phuketTab: string
    samuiTab: string
    globalTab: string
    postBtn: string
    modalTitle: string
    modalSubtitle: string
    formType: string
    formCity: string
    formTitle: string
    formDetails: string
    formContact: string
    submitBtn: string
    closeBtn: string
    successMsg: string
    contactConcierge: string
  }
  telemetryMonitor: {
    title: string
    sessionsToday: string
    appRoutes: string
    activeNow: string
    status: string
  }
  footer: {
    citiesCol: string
    featuresCol: string
    safetyCol: string
    privacy: string
    terms: string
    androidApp: string
    aiContext: string
    languageSelectorTitle: string
    copyright: string
  }
}

export const TRANSLATIONS: Record<Locale, UiTranslations> = {
  // 1. ENGLISH (Default)
  en: {
    nav: {
      exploreMap: 'Explore Map',
      launchApp: 'Launch Cerca App',
      languageLabel: 'Language',
    },
    telemetry: {
      liveBadge: 'LIVE TELEMETRY',
      tickerHeader: 'Cerca Global Signal Lock',
      pingLatency: 'Ping',
      hubActive: 'Hub Active',
    },
    hero: {
      trustBadge: "🔥 TONIGHT'S LIVE SOCIAL RADAR",
      headline: 'Know Where the Party Is Before You Pay for a Cab.',
      headlineHighlight: '',
      subheadline: 'Live venue crowd gauges, vetted expat hosts, and instant VIP table splits across Bangkok, Miami, Rio, and Bogotá.',
      ctaPrimary: "See What's Packed Tonight (Free Map)",
      ctaSecondary: 'Split a VIP Table',
      statsHubs: '15 Active Regional Hubs',
      statsVitals: 'Live Venue Crowd Meters',
      statsSafety: 'Verified Local Hosts',
      statsHandshake: 'Zero Sign-Up Required',
    },
    queryBar: {
      title: 'Cerca AI Natural-Language Query',
      placeholder: "Ask Cerca AI (e.g. 'Best clubs in Bangkok', 'Rooftops in Phuket', 'How QR check-in works')...",
      synthesizing: 'Analyzing global telemetry & regional guides...',
      chipAll: 'Popular AI Queries:',
      chips: {
        bangkok: 'Bangkok Nightlife',
        phuket: 'Phuket Beach Clubs',
        bogota: 'Bogotá Secret Spots',
        rio: 'Rio Street Sambas',
        miami: 'Miami Afro-House',
        qr: 'How QR Check-in Works',
      },
    },
    geoPing: {
      detectBtn: 'Detect My Vibe / Check Nearest Hub',
      scanning: 'Triangulating telemetry to nearest regional hub...',
      lockedTitle: 'Nearest Regional Hub Locked',
      distance: 'Great-Circle Distance',
      recommendedSpot: 'Featured Hotspot',
      pulseLabel: 'Atmosphere Pulse',
      exploreCityCta: 'Explore Regional Hub Guide →',
      browserPrompt: 'Calculating closest verified district...',
    },
    pillars: {
      sectionTitle: 'Everything You Need Tonight. Nothing You Don’t.',
      sectionSubtitle: 'Zero technical clutter. Real-time crowd heatmaps, instant table splits, and vetted local connections.',
      guestModeTitle: '1-Click Live Radar',
      guestModeDesc: 'See real-time venue heatmaps and crowd sizes immediately. No login, no downloads, zero barrier.',
      guestModeCta: 'Open Free Radar Map →',
      touristModeTitle: 'Local Insider & Safety',
      touristModeDesc: 'Instant live translation, safe transit routes, and vetted neighborhood guides from local concierges.',
      touristModeCta: 'Meet Local Insiders →',
      pulseModeTitle: 'Crowd & Vibe Meter',
      pulseModeDesc: 'Know whether a spot is Dead, Warming Up, or at Peak Capacity before heading out.',
      pulseModeCta: "Check Tonight's Vibe →",
      qrModeTitle: 'Private Social QR',
      qrModeDesc: 'Meet someone at the bar? Exchange contact cards instantly with one scan—without handing out your personal phone number or WhatsApp.',
      qrModeCta: 'Create Free Social Card →',
    },
    markets: {
      sectionTitle: 'Regional Hubs & Verified City Guides',
      sectionSubtitle: 'Click any city to view its curated venues, live host statuses, and district vibes on Cerca.',
      tabThailand: 'Thailand 🇹🇭',
      tabColombia: 'Colombia 🇨🇴',
      tabBrazil: 'Brazil 🇧🇷',
      tabUsa: 'United States 🇺🇸',
      viewCityGuide: 'Explore Guide →',
    },
    carousel: {
      badge: "Tonight's Curated District Drops",
      viewFullGuide: 'View Full Guide on Cerca',
    },
    hosts: {
      sectionTitle: 'Verified Local Hosts & Concierges',
      sectionSubtitle: 'Connect with trusted district insiders and local creators live on Cerca.',
      tapToEmail: 'Tap to Email & Book',
      dossierBadge: 'Verified Host Dossier',
      overviewTitle: 'Local Insider Dossier',
      servicesTitle: 'Available Concierge Services',
      topSpotsTitle: 'Top Recommended Spots in',
      languagesTitle: 'Languages Spoken',
      musicTitle: 'Music & Vibe Pulse',
      emailBtn: 'Email Guide / Request Booking',
      cercaBtn: 'Explore on Cerca App',
      whatsappBtn: 'WhatsApp Direct Concierge',
      reviewsText: 'verified reviews',
    },
    trust: {
      sectionTitle: 'Trust, Security & Compliance',
      zeroDataTitle: 'Zero Personal Data Stored',
      zeroDataDesc: 'Ephemeral sessions expire automatically with zero digital footprint or location tracking history.',
      cryptoTitle: 'TLS 1.3 End-to-End Security',
      cryptoDesc: 'Encrypted telemetry signal locks and discrete QR contact handshakes across all 15 hubs.',
      hostsTitle: '100% Vetted Local Hosts',
      hostsDesc: 'Every district curator and guide is certified by Cerca on-the-ground field ambassadors.',
      supportEmailBadge: 'Direct Concierge Email',
    },
    classifieds: {
      badge: 'Tonight’s Live Social Board',
      title: 'Live VIP Table Splits & Nightlife Board',
      subtitle: 'Never walk into an empty club or pay full price for bottle service alone. Join active VIP table splits, curated crawls, and yacht charters with vetted travelers.',
      allTab: 'All Splits & Listings',
      bangkokTab: 'Bangkok 🇹🇭',
      phuketTab: 'Phuket 🇹🇭',
      samuiTab: 'Koh Samui 🇹🇭',
      globalTab: 'Americas & Global 🌐',
      postBtn: '+ Post Listing / Split a Table',
      modalTitle: 'Submit a Classified Listing / Propose Table Split',
      modalSubtitle: 'Directly verified by Darwin & Cerca Concierge. Once approved, your listing goes live across our global hubs.',
      formType: 'Listing Category',
      formCity: 'Destination City',
      formTitle: 'Listing Title',
      formDetails: 'Details, Dates & Split Cost',
      formContact: 'Your Contact (Email or WhatsApp)',
      submitBtn: 'Submit Listing to Concierge',
      closeBtn: 'Close',
      successMsg: 'Inquiry dispatched to Darwin & Cerca Concierge! Check your email.',
      contactConcierge: 'Inquire via Concierge',
    },
    telemetryMonitor: {
      title: 'LIVE TRAFFIC & TELEMETRY MONITOR',
      sessionsToday: 'Verified Sessions Today',
      appRoutes: 'Cerca App Routes',
      activeNow: 'Active Visitors Now',
      status: 'Hub Status: Thailand Online',
    },
    footer: {
      citiesCol: 'Active Regional Hubs',
      featuresCol: 'Live Capabilities',
      safetyCol: 'Safety & Compliance',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      androidApp: 'Android App (Google Play)',
      aiContext: 'AI Context (llms.txt)',
      languageSelectorTitle: 'Interface Language',
      copyright: 'All rights reserved. ScanQR Global & Cerca Social Network.',
    },
  },

  // 2. THAI (ภาษาไทย) - First-Class Language Support
  th: {
    nav: {
      exploreMap: 'สำรวจแผนที่',
      launchApp: 'เปิดแอป Cerca',
      languageLabel: 'ภาษา',
    },
    telemetry: {
      liveBadge: 'สัญญาณสดแบบเรียลไทม์',
      tickerHeader: 'เชื่อมต่อเครือข่าย Cerca ทั่วโลก',
      pingLatency: 'เวลาตอบสนอง',
      hubActive: 'ฮับเปิดให้บริการ',
    },
    hero: {
      trustBadge: 'ไกด์ท้องถิ่นผ่านการตรวจสอบ 100% & แผนที่โซเชียลไร้กำแพงกั้น',
      headline: 'เรดาร์โซเชียลแบบเรียลไทม์ สำหรับ',
      headlineHighlight: 'ไนท์ไลฟ์ นักเดินทาง และชีพจรเมือง',
      subheadline: 'สำรวจ 15 ฮับระดับโลกทั้งไทย โคลอมเบีย บราซิล และสหรัฐอเมริกา ตรวจวัดความหนาแน่นคน คอนเซียร์จท้องถิ่น การแชร์ QR ที่ปลอดภัย และแปลภาษาอัตโนมัติ',
      ctaPrimary: 'เปิดเว็บแอป Cerca ทันที',
      ctaSecondary: 'ดู 15 ฮับท่องเที่ยวทั่วโลก',
      statsHubs: '15 ฮับภูมิภาคที่เปิดบริการ',
      statsVitals: 'ข้อมูลและเกจวัดคนสดๆ',
      statsSafety: 'โหมด Ghost ปลอดภัยไร้ตัวตน',
      statsHandshake: 'แลกเปลี่ยน QR ปลอดภัยในคลิกเดียว',
    },
    queryBar: {
      title: 'ค้นหาด้วย Cerca AI (ภาษาธรรมชาติ)',
      placeholder: 'ถาม Cerca AI (เช่น "คลับที่ดีที่สุดในกรุงเทพฯ", "รูฟท็อปในภูเก็ต", "ระบบเช็คอิน QR")...',
      synthesizing: 'กำลังประมวลผลข้อมูลสดจากฮับทั่วโลก...',
      chipAll: 'คำค้นหายอดนิยม:',
      chips: {
        bangkok: 'ไนท์ไลฟ์กรุงเทพฯ',
        phuket: 'บีชคลับภูเก็ต',
        bogota: 'บาร์ลับในโบโกตา',
        rio: 'วงแซมบ้าสดที่ริโอ',
        miami: 'แอฟโฟรเฮาส์ไมแอมี',
        qr: 'ระบบเช็คอิน QR ทำงานอย่างไร',
      },
    },
    geoPing: {
      detectBtn: 'ตรวจจับพิกัด / ค้นหาฮับที่ใกล้ที่สุด',
      scanning: 'กำลังคำนวณระยะทางไปยังฮับภูมิภาคที่ใกล้ที่สุด...',
      lockedTitle: 'ล็อคพิกัดฮับที่ใกล้ที่สุดแล้ว',
      distance: 'ระยะทางพิกัดผิวโลก',
      recommendedSpot: 'จุดเด่นแนะนำ',
      pulseLabel: 'บรรยากาศ & ดนตรี',
      exploreCityCta: 'สำรวจคู่มือเมืองนี้ →',
      browserPrompt: 'กำลังระบุพิกัดย่านท่องเที่ยวที่ใกล้ที่สุด...',
    },
    pillars: {
      sectionTitle: 'สี่โหมดหลัก ใช้งานง่ายไร้ความซับซ้อน',
      sectionSubtitle: 'ออกแบบมาเพื่อการสำรวจโลกจริงอย่างเป็นธรรมชาติและการท่องราตรียามค่ำคืน',
      guestModeTitle: 'โหมดผู้เยี่ยมชม (Guest Mode)',
      guestModeDesc: 'ดูฮีทแมพเมือง สถานที่ อีเวนต์ และคู่มือท้องถิ่นได้ทันทีโดยไม่ต้องสร้างบัญชี',
      guestModeCta: 'สำรวจแผนที่ในโหมดผู้เยี่ยมชม',
      touristModeTitle: 'โหมดนักท่องเที่ยว (Tourist Mode)',
      touristModeDesc: 'ระบบแปลภาษาแบบเรียลไทม์ คำแนะนำความปลอดภัย และแผนการเที่ยวชายหาดและไนท์ไลฟ์ทั่วโลก',
      touristModeCta: 'เปิดระบบเพื่อนร่วมเดินทาง',
      pulseModeTitle: 'ชีพจรไนท์ไลฟ์ & กิจกรรมสด',
      pulseModeDesc: 'ตรวจเช็คระดับความหนาแน่นคน แนวดนตรี สไตล์การแต่งกาย และค่าเข้าก่อนออกจากบ้าน',
      pulseModeCta: 'เช็คชีพจรไนท์ไลฟ์คืนนี้',
      qrModeTitle: 'ตัวตน QR ส่วนตัว (ทางเลือก)',
      qrModeDesc: 'เช็คอินสถานที่และแลกเปลี่ยนคอนแทกต์การ์ดที่ผ่านการยืนยันได้อย่างปลอดภัยโดยไม่ต้องเปิดเผยเบอร์โทรส่วนตัว',
      qrModeCta: 'สแกน QR คอนแทกต์การ์ด',
    },
    markets: {
      sectionTitle: 'ฮับภูมิภาคและคู่มือเมืองที่ผ่านการตรวจสอบ',
      sectionSubtitle: 'คลิกเมืองใดก็ได้เพื่อดูสถานที่คัดสรร สถานะโฮสต์สด และบรรยากาศย่านเมืองบน Cerca',
      tabThailand: 'ประเทศไทย 🇹🇭',
      tabColombia: 'โคลอมเบีย 🇨🇴',
      tabBrazil: 'บราซิล 🇧🇷',
      tabUsa: 'สหรัฐอเมริกา 🇺🇸',
      viewCityGuide: 'สำรวจคู่มือเมือง →',
    },
    carousel: {
      badge: 'ไฮไลท์ประจำคืนนี้จากย่านยอดนิยม',
      viewFullGuide: 'ดูคู่มือฉบับเต็มบน Cerca',
    },
    hosts: {
      sectionTitle: 'โฮสต์และคอนเซียร์จท้องถิ่นที่ได้รับการยืนยัน',
      sectionSubtitle: 'เชื่อมต่อกับคนท้องถิ่นและคอนเซียร์จที่คุณไว้ใจได้บน Cerca แบบเรียลไทม์',
      tapToEmail: 'แตะเพื่อส่งอีเมล & จอง',
      dossierBadge: 'แฟ้มข้อมูลโฮสต์ที่ได้รับการยืนยัน',
      overviewTitle: 'ข้อมูลเชิงลึกจากคนท้องถิ่น',
      servicesTitle: 'บริการคอนเซียร์จที่พร้อมดูแล',
      topSpotsTitle: 'สถานที่แนะนำยอดนิยมใน',
      languagesTitle: 'ภาษาที่สามารถสื่อสารได้',
      musicTitle: 'แนวดนตรีและบรรยากาศ',
      emailBtn: 'ส่งอีเมลถึงไกด์ / ขอจองบริการ',
      cercaBtn: 'สำรวจบนแอป Cerca',
      whatsappBtn: 'ติดต่อคอนเซียร์จผ่าน WhatsApp',
      reviewsText: 'รีวิวที่ได้รับการยืนยัน',
    },
    trust: {
      sectionTitle: 'ความปลอดภัย ความเป็นส่วนตัว และความน่าเชื่อถือ',
      zeroDataTitle: 'ไม่จัดเก็บข้อมูลส่วนตัวของผู้ใช้',
      zeroDataDesc: 'เซสชันชั่วคราวจะหมดอายุโดยอัตโนมัติ ไม่มีการเก็บประวัติตำแหน่งหรือร่องรอยดิจิทัล',
      cryptoTitle: 'การเข้ารหัสระดับสูง TLS 1.3',
      cryptoDesc: 'สัญญาณข้อมูลปลอดภัยและการส่งผ่าน QR ที่เป็นส่วนตัวในทั้ง 15 ฮับทั่วโลก',
      hostsTitle: 'โฮสต์ท้องถิ่นผ่านการตรวจสอบ 100%',
      hostsDesc: 'ผู้ดูแลและไกด์ทุกคนได้รับการรับรองโดยทูตภาคสนามของ Cerca ในแต่ละเมือง',
      supportEmailBadge: 'อีเมลคอนเซียร์จโดยตรง',
    },
    classifieds: {
      badge: 'กระดานชุมชนประเทศไทย & สากล',
      title: 'บอร์ดแชร์โต๊ะ VIP & บริการท้องถิ่น',
      subtitle: 'แชร์โต๊ะ VIP คลับดัง, ไนท์ไลฟ์ทัวร์พร้อมไกด์ที่ผ่านการตรวจสอบ, เรือเหมาลำเที่ยวเกาะ และที่พัก Digital Nomad ในกรุงเทพฯ ภูเก็ต และสมุย',
      allTab: 'รายการทั้งหมด',
      bangkokTab: 'กรุงเทพฯ 🇹🇭',
      phuketTab: 'ภูเก็ต 🇹🇭',
      samuiTab: 'เกาะสมุย 🇹🇭',
      globalTab: 'สากล / ละตินอเมริกา 🌐',
      postBtn: '+ โพสต์ประกาศ / ขอแชร์โต๊ะ VIP',
      modalTitle: 'ลงประกาศ / เสนอแชร์โต๊ะหรือกิจกรรม',
      modalSubtitle: 'ส่งตรงถึงทีมคอนเซียร์จ Cerca เพื่อตรวจสอบและเผยแพร่บนเครือข่ายฮับทั่วโลก',
      formType: 'หมวดหมู่ประกาศ',
      formCity: 'เมืองเป้าหมาย',
      formTitle: 'หัวข้อประกาศ',
      formDetails: 'รายละเอียด วันที่ และค่าใช้จ่ายที่แชร์',
      formContact: 'ช่องทางติดต่อของคุณ (อีเมล หรือ WhatsApp)',
      submitBtn: 'ส่งข้อมูลถึงคอนเซียร์จ',
      closeBtn: 'ปิด',
      successMsg: 'ส่งข้อมูลถึงทีมงานเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็ว',
      contactConcierge: 'ติดต่อคอนเซียร์จเพื่อเข้าร่วม',
    },
    telemetryMonitor: {
      title: 'ระบบติดตามทราฟฟิก & สัญญาณสด',
      sessionsToday: 'การเข้าชมที่ผ่านการตรวจสอบวันนี้',
      appRoutes: 'การเชื่อมต่อสู่แอป Cerca',
      activeNow: 'ผู้ใช้งานออนไลน์ขณะนี้',
      status: 'สถานะระบบ: ฮับไทยเปิดให้บริการ',
    },
    footer: {
      citiesCol: 'ฮับภูมิภาคที่เปิดบริการ',
      featuresCol: 'ฟีเจอร์เด่น',
      safetyCol: 'ความปลอดภัยและข้อกำหนด',
      privacy: 'นโยบายความเป็นส่วนตัว',
      terms: 'ข้อกำหนดการให้บริการ',
      androidApp: 'แอป Android (Google Play)',
      aiContext: 'บริบท AI (llms.txt)',
      languageSelectorTitle: 'เลือกภาษาของระบบ',
      copyright: 'สงวนลิขสิทธิ์ทั้งหมด ScanQR Global และเครือข่าย Cerca Social',
    },
  },

  // 3. SPANISH (Español)
  es: {
    nav: {
      exploreMap: 'Explorar Mapa',
      launchApp: 'Lanzar App Cerca',
      languageLabel: 'Idioma',
    },
    telemetry: {
      liveBadge: 'TELEMETRÍA EN VIVO',
      tickerHeader: 'Bloqueo de Señal Global Cerca',
      pingLatency: 'Latencia',
      hubActive: 'Hub Activo',
    },
    hero: {
      trustBadge: 'Guías Locales Verificados y Mapa Social Sin Barreras',
      headline: 'Radar Social en Tiempo Real para',
      headlineHighlight: 'Vida Nocturna, Viajeros y Pulso Local',
      subheadline: 'Explora 15 hubs globales en Colombia, Tailandia, Brasil y EE. UU. Monitores de afluencia en vivo, anfitriones verificados, saludos QR seguros y traducción instantánea.',
      ctaPrimary: 'Abrir Web App Cerca',
      ctaSecondary: 'Explorar 15 Hubs Globales',
      statsHubs: '15 Hubs Regionales Activos',
      statsVitals: 'Afluencia y Ritmo en Vivo',
      statsSafety: 'Modos Invisible y Discreto',
      statsHandshake: 'Intercambio QR Seguro',
    },
    queryBar: {
      title: 'Consulta Cerca AI en Lenguaje Natural',
      placeholder: 'Pregunta a Cerca AI (ej. "Mejores discotecas en Bogotá", "Rooftops en Bangkok")...',
      synthesizing: 'Analizando telemetría en vivo y guías regionales...',
      chipAll: 'Consultas Populares:',
      chips: {
        bangkok: 'Vida Nocturna en Bangkok',
        phuket: 'Beach Clubs en Phuket',
        bogota: 'Lugares Secretos en Bogotá',
        rio: 'Ruedas de Samba en Río',
        miami: 'Afro-House en Miami',
        qr: 'Cómo Funciona el Check-in QR',
      },
    },
    geoPing: {
      detectBtn: 'Detectar Mi Vibe / Buscar Hub Cercano',
      scanning: 'Triangulando coordenadas al hub regional más cercano...',
      lockedTitle: 'Hub Regional Más Cercano Fijado',
      distance: 'Distancia Ortodrómica',
      recommendedSpot: 'Lugar Recomendado',
      pulseLabel: 'Pulso de Ambiente',
      exploreCityCta: 'Explorar Guía Regional →',
      browserPrompt: 'Localizando distrito verificado más próximo...',
    },
    pillars: {
      sectionTitle: 'Cuatro Modos. Cero Confusión.',
      sectionSubtitle: 'Diseñado para la exploración intuitiva en el mundo real y noches espontáneas.',
      guestModeTitle: 'Modo Invitado',
      guestModeDesc: 'Explora mapas de calor de ciudades, lugares, eventos y guías locales de inmediato sin registrarte.',
      guestModeCta: 'Explorar Mapa como Invitado',
      touristModeTitle: 'Modo Turista',
      touristModeDesc: 'Traducción multilingüe en tiempo real, consejos de seguridad verificados e itinerarios nocturnos en todo el mundo.',
      touristModeCta: 'Abrir Travel Buddy',
      pulseModeTitle: 'Pulso Nocturno & Eventos',
      pulseModeDesc: 'Niveles de multitud en vivo (Tranquilo, Moderado, Lleno, Pico), géneros musicales y códigos de vestimenta.',
      pulseModeCta: 'Ver Pulso de Esta Noche',
      qrModeTitle: 'Identidad QR Opcional',
      qrModeDesc: 'Apretón de manos digital seguro para check-in en locales e intercambio de contactos sin revelar tu teléfono.',
      qrModeCta: 'Escanear Tarjeta QR',
    },
    markets: {
      sectionTitle: 'Hubs Regionales y Guías de Ciudad Verificadas',
      sectionSubtitle: 'Haz clic en cualquier ciudad para ver locales seleccionados, estados en vivo y vibras en Cerca.',
      tabThailand: 'Tailandia 🇹🇭',
      tabColombia: 'Colombia 🇨🇴',
      tabBrazil: 'Brasil 🇧🇷',
      tabUsa: 'Estados Unidos 🇺🇸',
      viewCityGuide: 'Explorar Guía →',
    },
    carousel: {
      badge: 'Lanzamientos Destacados de Esta Noche',
      viewFullGuide: 'Ver Guía Completa en Cerca',
    },
    hosts: {
      sectionTitle: 'Anfitriones y Concierges Locales Verificados',
      sectionSubtitle: 'Conecta en vivo con expertos de confianza y creadores locales en Cerca.',
      tapToEmail: 'Toca para Enviar Correo',
      dossierBadge: 'Expediente de Anfitrión Verificado',
      overviewTitle: 'Resumen del Experto Local',
      servicesTitle: 'Servicios Disponibles',
      topSpotsTitle: 'Lugares Más Recomendados en',
      languagesTitle: 'Idiomas Hablados',
      musicTitle: 'Pulso Musical y Ambiente',
      emailBtn: 'Enviar Correo al Guía / Reservar',
      cercaBtn: 'Explorar en la App Cerca',
      whatsappBtn: 'Concierge Directo por WhatsApp',
      reviewsText: 'reseñas verificadas',
    },
    trust: {
      sectionTitle: 'Confianza, Seguridad y Cumplimiento',
      zeroDataTitle: 'Cero Datos Personales Almacenados',
      zeroDataDesc: 'Las sesiones efímeras caducan automáticamente sin historial de ubicación ni rastro digital.',
      cryptoTitle: 'Seguridad Extremo a Extremo TLS 1.3',
      cryptoDesc: 'Señales encriptadas y saludos de contacto QR discretos en los 15 centros activos.',
      hostsTitle: '100% Anfitriones Locales Verificados',
      hostsDesc: 'Cada curador y guía está certificado por embajadores de campo de Cerca.',
      supportEmailBadge: 'Correo Directo de Concierge',
    },
    classifieds: {
      badge: 'Tablón Comunitario Tailandia & Global',
      title: 'Mesas VIP & Clasificados de Vida Nocturna',
      subtitle: 'Compartir mesas VIP, tours nocturnos seleccionados, chárter de botes y alojamientos nómadas en Bangkok, Phuket y Samui.',
      allTab: 'Todos los Anuncios',
      bangkokTab: 'Bangkok 🇹🇭',
      phuketTab: 'Phuket 🇹🇭',
      samuiTab: 'Koh Samui 🇹🇭',
      globalTab: 'América & Global 🌐',
      postBtn: '+ Publicar Anuncio / Compartir Mesa',
      modalTitle: 'Publicar Anuncio / Proponer Mesa Compartida',
      modalSubtitle: 'Verificado por el Concierge de Cerca. Tu anuncio se publica en nuestros hubs globales tras su aprobación.',
      formType: 'Categoría',
      formCity: 'Ciudad',
      formTitle: 'Título del Anuncio',
      formDetails: 'Detalles, Fechas y Costo por Persona',
      formContact: 'Contacto (Email o WhatsApp)',
      submitBtn: 'Enviar Anuncio al Concierge',
      closeBtn: 'Cerrar',
      successMsg: '¡Solicitud enviada al Concierge! Te contactaremos pronto.',
      contactConcierge: 'Consultar con Concierge',
    },
    telemetryMonitor: {
      title: 'MONITOR DE TRÁFICO Y TELEMETRÍA EN VIVO',
      sessionsToday: 'Sesiones Verificadas Hoy',
      appRoutes: 'Rutas al App Cerca',
      activeNow: 'Visitantes Activos Ahora',
      status: 'Estado: Hub Tailandia Online',
    },
    footer: {
      citiesCol: 'Hubs Regionales Activos',
      featuresCol: 'Funciones en Vivo',
      safetyCol: 'Seguridad y Cumplimiento',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      androidApp: 'App Android (Google Play)',
      aiContext: 'Contexto AI (llms.txt)',
      languageSelectorTitle: 'Idioma de Interfaz',
      copyright: 'Todos los derechos reservados. ScanQR Global y Red Social Cerca.',
    },
  },

  // 4. PORTUGUESE (Português)
  pt: {
    nav: {
      exploreMap: 'Explorar Mapa',
      launchApp: 'Abrir App Cerca',
      languageLabel: 'Idioma',
    },
    telemetry: {
      liveBadge: 'TELEMETRIA AO VIVO',
      tickerHeader: 'Sinal Global Cerca Ativo',
      pingLatency: 'Latência',
      hubActive: 'Hub Ativo',
    },
    hero: {
      trustBadge: 'Guias Locais Verificados & Mapa Social Sem Barreiras',
      headline: 'Radar Social em Tempo Real para',
      headlineHighlight: 'Vida Noturna, Viajantes e Pulso Local',
      subheadline: 'Explore 15 hubs globais no Brasil, Colômbia, Tailândia e EUA. Monitores de lotação ao vivo, concierges verificados, conexões QR seguras e tradução instantânea.',
      ctaPrimary: 'Abrir Web App Cerca',
      ctaSecondary: 'Ver 15 Hubs Globais',
      statsHubs: '15 Hubs Regionais Ativos',
      statsVitals: 'Lotação e Ritmo ao Vivo',
      statsSafety: 'Modos Invisível e Discreto',
      statsHandshake: 'Troca de QR Segura',
    },
    queryBar: {
      title: 'Pesquisa Cerca AI em Linguagem Natural',
      placeholder: 'Pergunte à Cerca AI (ex: "Baladas em São Paulo", "Samba no Rio")...',
      synthesizing: 'Analisando telemetria ao vivo e guias regionais...',
      chipAll: 'Pesquisas Populares:',
      chips: {
        bangkok: 'Vida Noturna em Bangkok',
        phuket: 'Beach Clubs em Phuket',
        bogota: 'Lugares Secretos em Bogotá',
        rio: 'Rodas de Samba no Rio',
        miami: 'Afro-House em Miami',
        qr: 'Como Funciona o Check-in QR',
      },
    },
    geoPing: {
      detectBtn: 'Detectar Minha Vibe / Buscar Hub Próximo',
      scanning: 'Triangulando sinal para o hub regional mais próximo...',
      lockedTitle: 'Hub Regional Mais Próximo Localizado',
      distance: 'Distância Geodésica',
      recommendedSpot: 'Local em Destaque',
      pulseLabel: 'Atmosfera e Música',
      exploreCityCta: 'Explorar Guia da Cidade →',
      browserPrompt: 'Localizando distrito verificado mais próximo...',
    },
    pillars: {
      sectionTitle: 'Quatro Modos. Zero Confusão.',
      sectionSubtitle: 'Projetado para exploração intuitiva no mundo real e noites espontâneas.',
      guestModeTitle: 'Modo Convidado',
      guestModeDesc: 'Navegue pelos mapas de calor da cidade, locais, eventos e microguias imediatamente sem criar conta.',
      guestModeCta: 'Explorar Mapa como Convidado',
      touristModeTitle: 'Modo Turista',
      touristModeDesc: 'Tradução multilíngue em tempo real, dicas de segurança verificadas e roteiros de praia e vida noturna no mundo todo.',
      touristModeCta: 'Abrir Travel Buddy',
      pulseModeTitle: 'Pulso da Vida Noturna & Eventos',
      pulseModeDesc: 'Lotação em tempo real (Calmo, Moderado, Movimentado, Pico), gêneros musicais e dress code.',
      pulseModeCta: 'Conferir Pulso de Hoje',
      qrModeTitle: 'Identidade QR Opcional',
      qrModeDesc: 'Handshake físico seguro para check-in em locais e troca de cartões sociais sem revelar números pessoais.',
      qrModeCta: 'Escanear Cartão QR',
    },
    markets: {
      sectionTitle: 'Hubs Regionais e Guias de Cidades Verificados',
      sectionSubtitle: 'Clique em qualquer cidade para conferir locais selecionados, status em tempo real e vibes no Cerca.',
      tabThailand: 'Tailândia 🇹🇭',
      tabColombia: 'Colômbia 🇨🇴',
      tabBrazil: 'Brasil 🇧🇷',
      tabUsa: 'Estados Unidos 🇺🇸',
      viewCityGuide: 'Explorar Guia →',
    },
    carousel: {
      badge: 'Destaques Noturnos Selecionados',
      viewFullGuide: 'Ver Guia Completo no Cerca',
    },
    hosts: {
      sectionTitle: 'Anfitriões e Concierges Locais Verificados',
      sectionSubtitle: 'Conecte-se com pessoas e criadores locais confiáveis ao vivo no Cerca.',
      tapToEmail: 'Toque para Enviar E-mail',
      dossierBadge: 'Dossiê do Anfitrião Verificado',
      overviewTitle: 'Visão Geral do Anfitrião',
      servicesTitle: 'Serviços de Concierge Disponíveis',
      topSpotsTitle: 'Locais Mais Recomendados em',
      languagesTitle: 'Idiomas Falados',
      musicTitle: 'Gêneros e Vibe Musical',
      emailBtn: 'Enviar E-mail ao Guia / Reservar',
      cercaBtn: 'Explorar no App Cerca',
      whatsappBtn: 'Concierge Direto no WhatsApp',
      reviewsText: 'avaliações verificadas',
    },
    trust: {
      sectionTitle: 'Confiança, Segurança e Privacidade',
      zeroDataTitle: 'Zero Dados Pessoais Armazenados',
      zeroDataDesc: 'Sessões efêmeras expiram automaticamente sem histórico de rastreamento ou dados salvos.',
      cryptoTitle: 'Segurança Ponta a Ponta TLS 1.3',
      cryptoDesc: 'Sinais criptografados e conexões QR discretas em todos os 15 hubs.',
      hostsTitle: '100% Anfitriões Locais Verificados',
      hostsDesc: 'Todos os guias e curadores são certificados por embaixadores de campo do Cerca.',
      supportEmailBadge: 'E-mail Direto do Concierge',
    },
    classifieds: {
      badge: 'Mural Comunitário Tailândia & Global',
      title: 'Mesas VIP & Classificados Noturnos',
      subtitle: 'Divisão de camarotes VIP, tours guiados por especialistas, passeios de barco e vilas nômades em Bangkok, Phuket e Samui.',
      allTab: 'Todos os Anúncios',
      bangkokTab: 'Bangkok 🇹🇭',
      phuketTab: 'Phuket 🇹🇭',
      samuiTab: 'Koh Samui 🇹🇭',
      globalTab: 'Américas & Global 🌐',
      postBtn: '+ Criar Anúncio / Dividir Mesa',
      modalTitle: 'Enviar Anúncio / Propor Divisão de Mesa',
      modalSubtitle: 'Verificado pelo Concierge Cerca para publicação imediata.',
      formType: 'Categoria',
      formCity: 'Cidade',
      formTitle: 'Título do Anúncio',
      formDetails: 'Detalhes, Datas e Valor por Pessoa',
      formContact: 'Seu Contato (Email ou WhatsApp)',
      submitBtn: 'Enviar Anúncio ao Concierge',
      closeBtn: 'Fechar',
      successMsg: 'Enviado com sucesso ao Concierge Cerca!',
      contactConcierge: 'Consultar via Concierge',
    },
    telemetryMonitor: {
      title: 'MONITOR DE TRÁFEGO & TELEMETRIA AO VIVO',
      sessionsToday: 'Sessões Verificadas Hoje',
      appRoutes: 'Rotas ao App Cerca',
      activeNow: 'Visitantes Online Agora',
      status: 'Status: Hub Tailândia Online',
    },
    footer: {
      citiesCol: 'Hubs Regionais Ativos',
      featuresCol: 'Recursos ao Vivo',
      safetyCol: 'Segurança e Termos',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      androidApp: 'App Android (Google Play)',
      aiContext: 'Contexto AI (llms.txt)',
      languageSelectorTitle: 'Idioma da Interface',
      copyright: 'Todos os direitos reservados. ScanQR Global e Rede Social Cerca.',
    },
  },

  // 5. FRENCH (Français)
  fr: {
    nav: {
      exploreMap: 'Explorer la Carte',
      launchApp: "Lancer l'App Cerca",
      languageLabel: 'Langue',
    },
    telemetry: {
      liveBadge: 'TÉLÉMÉTRIE EN DIRECT',
      tickerHeader: 'Signal Mondial Cerca Actif',
      pingLatency: 'Latence',
      hubActive: 'Hub Actif',
    },
    hero: {
      trustBadge: 'Guides Locaux Vérifiés & Carte Sociale Sans Obstacle',
      headline: 'Radar Social en Temps Réel pour',
      headlineHighlight: 'Vie Nocturne, Voyageurs et Pouls Local',
      subheadline: 'Explorez 15 hubs mondiaux en Thaïlande, Colombie, Brésil et États-Unis. Jauges d’affluence en direct, concierges vérifiés, QR sécurisés et traduction instantanée.',
      ctaPrimary: "Ouvrir l'App Web Cerca",
      ctaSecondary: 'Découvrir les 15 Hubs Mondiaux',
      statsHubs: '15 Hubs Régionaux Actifs',
      statsVitals: 'Affluence et Rythme en Direct',
      statsSafety: 'Modes Fantôme et Discret',
      statsHandshake: 'Connexion QR Sécurisée',
    },
    queryBar: {
      title: 'Recherche Cerca AI en Langage Naturel',
      placeholder: 'Demandez à Cerca AI (ex. "Meilleurs clubs à Bangkok", "Rooftops à Phuket")...',
      synthesizing: 'Analyse de la télémétrie et des guides...',
      chipAll: 'Requêtes Populaires :',
      chips: {
        bangkok: 'Vie Nocturne à Bangkok',
        phuket: 'Beach Clubs à Phuket',
        bogota: 'Lieux Secrets à Bogotá',
        rio: 'Samba de Rue à Rio',
        miami: 'Afro-House à Miami',
        qr: 'Comment Fonctionne le Check-in QR',
      },
    },
    geoPing: {
      detectBtn: 'Détecter Mon Vibe / Trouver le Hub Proche',
      scanning: 'Triangulation du signal vers le hub le plus proche...',
      lockedTitle: 'Hub Régional le Plus Proche Fixé',
      distance: 'Distance Orthodromique',
      recommendedSpot: 'Lieu Recommandé',
      pulseLabel: 'Atmosphère & Musique',
      exploreCityCta: 'Explorer le Guide Régional →',
      browserPrompt: 'Localisation du quartier le plus proche...',
    },
    pillars: {
      sectionTitle: 'Quatre Modes. Zéro Confusion.',
      sectionSubtitle: 'Conçu pour une exploration intuitive du monde réel et des sorties nocturnes spontanées.',
      guestModeTitle: 'Mode Invité',
      guestModeDesc: 'Consultez immédiatement les heatmaps de villes, lieux, événements et guides sans créer de compte.',
      guestModeCta: 'Explorer la Carte en Invité',
      touristModeTitle: 'Mode Touriste',
      touristModeDesc: 'Traduction multilingue en temps réel, conseils de sécurité vérifiés et itinéraires nocturnes mondiaux.',
      touristModeCta: 'Ouvrir Travel Buddy',
      pulseModeTitle: 'Pouls Nocturne & Événements',
      pulseModeDesc: 'Affluence en direct (Calme, Modéré, Animé, Pic), styles musicaux et ambiance vestimentaire.',
      pulseModeCta: 'Voir le Pouls de ce Soir',
      qrModeTitle: 'Identité QR Optionnelle',
      qrModeDesc: 'Check-in sécurisé dans les lieux et échange de fiches de contact sans dévoiler votre numéro personnel.',
      qrModeCta: 'Scanner la Carte QR',
    },
    markets: {
      sectionTitle: 'Hubs Régionaux & Guides de Villes Vérifiés',
      sectionSubtitle: 'Cliquez sur une ville pour découvrir ses lieux sélectionnés, son statut en direct et son ambiance sur Cerca.',
      tabThailand: 'Thaïlande 🇹🇭',
      tabColombia: 'Colombie 🇨🇴',
      tabBrazil: 'Brésil 🇧🇷',
      tabUsa: 'États-Unis 🇺🇸',
      viewCityGuide: 'Explorer le Guide →',
    },
    carousel: {
      badge: 'Sélections Nocturnes de Ce Soir',
      viewFullGuide: 'Voir le Guide Complet sur Cerca',
    },
    hosts: {
      sectionTitle: 'Hôtes et Concierges Locaux Vérifiés',
      sectionSubtitle: 'Connectez-vous en direct avec des experts de confiance sur Cerca.',
      tapToEmail: 'Toucher pour Envoyer un E-mail',
      dossierBadge: "Dossier de l'Hôte Vérifié",
      overviewTitle: "Présentation de l'Expert Local",
      servicesTitle: 'Services de Conciergerie Disponibles',
      topSpotsTitle: 'Lieux les Plus Recommandés à',
      languagesTitle: 'Langues Parlées',
      musicTitle: 'Ambiance et Style Musical',
      emailBtn: 'Envoyer un E-mail au Guide / Réserver',
      cercaBtn: "Explorer sur l'App Cerca",
      whatsappBtn: 'Concierge Direct via WhatsApp',
      reviewsText: 'avis vérifiés',
    },
    trust: {
      sectionTitle: 'Confiance, Sécurité & Confidentialité',
      zeroDataTitle: 'Zéro Donnée Personnelle Stockée',
      zeroDataDesc: 'Sessions éphémères expirant automatiquement sans aucun suivi ni historique de localisation.',
      cryptoTitle: 'Sécurité de Bout en Bout TLS 1.3',
      cryptoDesc: 'Signaux chiffrés et partages de contacts QR discrets dans les 15 hubs.',
      hostsTitle: '100% Hôtes Locaux Vérifiés',
      hostsDesc: 'Chaque guide et curateur est certifié par des ambassadeurs de terrain Cerca.',
      supportEmailBadge: 'E-mail Direct du Concierge',
    },
    classifieds: {
      badge: 'Panneau Communautaire Thaïlande & Global',
      title: 'Partage de Tables VIP & Petites Annonces',
      subtitle: 'Partage de tables VIP, visites nocturnes certifiées, locations de bateaux et villas nomades à Bangkok, Phuket et Koh Samui.',
      allTab: 'Toutes les Annonces',
      bangkokTab: 'Bangkok 🇹🇭',
      phuketTab: 'Phuket 🇹🇭',
      samuiTab: 'Koh Samui 🇹🇭',
      globalTab: 'Amériques & International 🌐',
      postBtn: '+ Déposer une Annonce / Partager une Table',
      modalTitle: 'Déposer une Annonce / Proposer un Partage VIP',
      modalSubtitle: 'Vérifié par la Conciergerie Cerca avant publication immédiate.',
      formType: 'Catégorie',
      formCity: 'Ville',
      formTitle: "Titre de l'Annonce",
      formDetails: 'Détails, Dates & Coût Partagé',
      formContact: 'Votre Contact (Email ou WhatsApp)',
      submitBtn: 'Envoyer à la Conciergerie',
      closeBtn: 'Fermer',
      successMsg: 'Demande transmise avec succès à la Conciergerie Cerca !',
      contactConcierge: 'Contacter la Conciergerie',
    },
    telemetryMonitor: {
      title: 'MONITEUR DE TRAFIC & TÉLÉMÉTRIE EN DIRECT',
      sessionsToday: "Sessions Vérifiées Aujourd'hui",
      appRoutes: 'Redirections vers Cerca',
      activeNow: 'Visiteurs Actifs en ce Moment',
      status: 'Statut du Hub : Thaïlande En Ligne',
    },
    footer: {
      citiesCol: 'Hubs Régionaux Actifs',
      featuresCol: 'Fonctionnalités en Direct',
      safetyCol: 'Sécurité et Conformité',
      privacy: 'Politique de Confidentialité',
      terms: "Conditions d'Utilisation",
      androidApp: 'App Android (Google Play)',
      aiContext: 'Contexte IA (llms.txt)',
      languageSelectorTitle: "Langue de l'Interface",
      copyright: 'Tous droits réservés. ScanQR Global & Cerca Social Network.',
    },
  },

  // 6. GERMAN (Deutsch)
  de: {
    nav: {
      exploreMap: 'Karte Erkunden',
      launchApp: 'Cerca App Starten',
      languageLabel: 'Sprache',
    },
    telemetry: {
      liveBadge: 'LIVE-TELEMETRIE',
      tickerHeader: 'Cerca Globales Signal Aktiv',
      pingLatency: 'Latenz',
      hubActive: 'Hub Aktiv',
    },
    hero: {
      trustBadge: 'Geprüfte Lokale Guides & Barrierefreie Soziale Karte',
      headline: 'Echtzeit-Sozialradar für',
      headlineHighlight: 'Nachtleben, Reisende & Lokalen Puls',
      subheadline: 'Erkunden Sie 15 weltweite Hubs in Thailand, Kolumbien, Brasilien und den USA. Live-Gästeanzahl, verifizierte Concierges, sichere QR-Verbindungen und Sofortübersetzung.',
      ctaPrimary: 'Cerca Web-App Öffnen',
      ctaSecondary: '15 Globale Hubs Entdecken',
      statsHubs: '15 Aktive Regionale Hubs',
      statsVitals: 'Live-Auslastung & Vibe',
      statsSafety: 'Geist- & Diskretionsmodus',
      statsHandshake: 'Sicherer QR-Handshake',
    },
    queryBar: {
      title: 'Cerca AI Schnellsuche',
      placeholder: 'Fragen Sie Cerca AI (z. B. "Beste Clubs in Bangkok", "Rooftops in Phuket")...',
      synthesizing: 'Analysiere Live-Telemetrie & Guides...',
      chipAll: 'Beliebte Anfragen:',
      chips: {
        bangkok: 'Nachtleben in Bangkok',
        phuket: 'Beach Clubs in Phuket',
        bogota: 'Geheimtipps in Bogotá',
        rio: 'Samba-Kreise in Rio',
        miami: 'Afro-House in Miami',
        qr: 'Wie QR Check-in Funktioniert',
      },
    },
    geoPing: {
      detectBtn: 'Meinen Vibe Erkennen / Nächsten Hub Finden',
      scanning: 'Berechne Entfernung zum nächsten Hub...',
      lockedTitle: 'Nächster Regionaler Hub Gefunden',
      distance: 'Orthodrome Distanz',
      recommendedSpot: 'Empfohlener Ort',
      pulseLabel: 'Atmosphäre & Musik',
      exploreCityCta: 'Stadtführer Öffnen →',
      browserPrompt: 'Ermittle nächsten geprüften Bezirk...',
    },
    pillars: {
      sectionTitle: 'Vier Modi. Keine Verwirrung.',
      sectionSubtitle: 'Entwickelt für intuitive Echtzeit-Erkundung und spontane Nächte.',
      guestModeTitle: 'Gast-Modus',
      guestModeDesc: 'Durchsuchen Sie Stadt-Heatmaps, Veranstaltungsorte, Events und Reiseführer sofort ohne Registrierung.',
      guestModeCta: 'Karte als Gast erkunden',
      touristModeTitle: 'Touristen-Modus',
      touristModeDesc: 'Echtzeit-Übersetzung, geprüfte Sicherheitstipps und weltweite Strand- und Nachtleben-Routen.',
      touristModeCta: 'Travel Buddy öffnen',
      pulseModeTitle: 'Nachtleben & Event-Puls',
      pulseModeDesc: 'Live-Auslastung (Ruhig, Moderat, Voll, Peak), Musikgenres, Dresscode und Eintrittspreise.',
      pulseModeCta: 'Heutigen Puls prüfen',
      qrModeTitle: 'Optionale QR-Identität',
      qrModeDesc: 'Sicherer Check-in vor Ort und Austausch von Kontaktkarten ohne Preisgabe persönlicher Telefonnummern.',
      qrModeCta: 'QR-Kontaktkarte scannen',
    },
    markets: {
      sectionTitle: 'Regionale Hubs & Verifizierte Stadtführer',
      sectionSubtitle: 'Klicken Sie auf eine Stadt, um kuratierte Orte, Live-Status und Vibes auf Cerca zu sehen.',
      tabThailand: 'Thailand 🇹🇭',
      tabColombia: 'Kolumbien 🇨🇴',
      tabBrazil: 'Brasilien 🇧🇷',
      tabUsa: 'Vereinigte Staaten 🇺🇸',
      viewCityGuide: 'Stadtführer Öffnen →',
    },
    carousel: {
      badge: 'Kuratierte Empfehlungen für Heute Abend',
      viewFullGuide: 'Vollständigen Guide auf Cerca Ansehen',
    },
    hosts: {
      sectionTitle: 'Verifizierte Lokale Hosts & Concierges',
      sectionSubtitle: 'Verbinden Sie sich live auf Cerca mit vertrauenswürdigen Insidern vor Ort.',
      tapToEmail: 'Tippen für E-Mail & Buchung',
      dossierBadge: 'Verifiziertes Host-Dossier',
      overviewTitle: 'Lokale Insider-Übersicht',
      servicesTitle: 'Verfügbare Concierge-Dienste',
      topSpotsTitle: 'Top-Empfehlungen in',
      languagesTitle: 'Gesprochene Sprachen',
      musicTitle: 'Musik & Atmosphäre',
      emailBtn: 'Guide E-Mailen / Anfrage Senden',
      cercaBtn: 'In der Cerca App Öffnen',
      whatsappBtn: 'Direkter WhatsApp-Concierge',
      reviewsText: 'verifizierte Bewertungen',
    },
    trust: {
      sectionTitle: 'Vertrauen, Sicherheit & Datenschutz',
      zeroDataTitle: 'Keine Speicherung Persönlicher Daten',
      zeroDataDesc: 'Flüchtige Sitzungen verfallen automatisch ohne Standortverlauf oder digitale Spuren.',
      cryptoTitle: 'TLS 1.3 Ende-zu-Ende-Sicherheit',
      cryptoDesc: 'Verschlüsselte Signale und diskreter QR-Kontaktaustausch in allen 15 Hubs.',
      hostsTitle: '100% Verifizierte Lokale Hosts',
      hostsDesc: 'Jeder Guide und Kurator ist von Cerca-Feldrepräsentanten persönlich zertifiziert.',
      supportEmailBadge: 'Direkte Concierge-E-Mail',
    },
    classifieds: {
      badge: 'Community-Board Thailand & Global',
      title: 'VIP-Tisch-Sharing & Lokale Kleinanzeigen',
      subtitle: 'VIP-Tische teilen, exklusive Nachtleben-Touren, Bootstouren und Nomaden-Villen in Bangkok, Phuket und Samui.',
      allTab: 'Alle Anzeigen',
      bangkokTab: 'Bangkok 🇹🇭',
      phuketTab: 'Phuket 🇹🇭',
      samuiTab: 'Koh Samui 🇹🇭',
      globalTab: 'Amerika & Weltweit 🌐',
      postBtn: '+ Anzeige Aufgeben / Tisch Teilen',
      modalTitle: 'Kleinanzeige Aufgeben / VIP-Tisch Vorschlagen',
      modalSubtitle: 'Direkt vom Cerca-Concierge geprüft und im globalen Netzwerk veröffentlicht.',
      formType: 'Kategorie',
      formCity: 'Zielstadt',
      formTitle: 'Anzeigentitel',
      formDetails: 'Details, Termine & Kostenaufteilung',
      formContact: 'Kontakt (E-Mail oder WhatsApp)',
      submitBtn: 'Anzeige an Concierge Senden',
      closeBtn: 'Schließen',
      successMsg: 'Anfrage erfolgreich an den Cerca-Concierge übermittelt!',
      contactConcierge: 'Über Concierge Anfragen',
    },
    telemetryMonitor: {
      title: 'LIVE-TRAFFIC & TELEMETRIE-MONITOR',
      sessionsToday: 'Geprüfte Sitzungen Heute',
      appRoutes: 'Cerca App Weiterleitungen',
      activeNow: 'Besucher Gerade Online',
      status: 'Hub-Status: Thailand Online',
    },
    footer: {
      citiesCol: 'Aktive Regionale Hubs',
      featuresCol: 'Live-Funktionen',
      safetyCol: 'Sicherheit & Richtlinien',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      androidApp: 'Android App (Google Play)',
      aiContext: 'KI-Kontext (llms.txt)',
      languageSelectorTitle: 'Oberflächensprache',
      copyright: 'Alle Rechte vorbehalten. ScanQR Global & Cerca Social Network.',
    },
  },

  // 7. JAPANESE (日本語)
  ja: {
    nav: {
      exploreMap: 'マップを探索',
      launchApp: 'Cercaアプリを開く',
      languageLabel: '言語',
    },
    telemetry: {
      liveBadge: 'リアルタイム信号',
      tickerHeader: 'Cercaグローバルテレメトリー',
      pingLatency: 'レイテンシ',
      hubActive: 'ハブ稼働中',
    },
    hero: {
      trustBadge: '100%認証済み現地ガイド & 登録不要のソーシャルマップ',
      headline: 'ナイトライフ、旅行者、街の熱気を捉える',
      headlineHighlight: 'リアルタイム・ソーシャルレーダー',
      subheadline: 'タイ、コロンビア、ブラジル、米国の世界15ハブを探索。リアルタイム混雑度ゲージ、認証済みコンシェルジュ、安全なQRハンドシェイク、即時翻訳を搭載。',
      ctaPrimary: 'Cercaウェブアプリを起動',
      ctaSecondary: '世界15都市のハブを見る',
      statsHubs: '15の稼働中地域ハブ',
      statsVitals: '店舗のリアルタイム状況',
      statsSafety: 'ゴースト＆プライバシーモード',
      statsHandshake: '安全なQRコード共有',
    },
    queryBar: {
      title: 'Cerca AI 自然言語検索',
      placeholder: 'Cerca AIに質問（例：「バンコクで最高のクラブ」「プーケットのルーフトップ」）...',
      synthesizing: 'ライブ信号と都市ガイドを解析中...',
      chipAll: '人気の検索：',
      chips: {
        bangkok: 'バンコクのナイトライフ',
        phuket: 'プーケットのビーチクラブ',
        bogota: 'ボゴタの隠れ家スポット',
        rio: 'リオのストリートサンバ',
        miami: 'マイアミのアフロハウス',
        qr: 'QRチェックインの仕組み',
      },
    },
    geoPing: {
      detectBtn: '現在地から最寄りハブを検索',
      scanning: '最寄りの地域ハブへの測位中...',
      lockedTitle: '最寄りハブをロックしました',
      distance: '大圏距離',
      recommendedSpot: 'おすすめスポット',
      pulseLabel: '雰囲気＆音楽ジャンル',
      exploreCityCta: '都市ガイドを見る →',
      browserPrompt: '最寄りの認証エリアを検索中...',
    },
    pillars: {
      sectionTitle: '4つのモード。迷わず直感的に。',
      sectionSubtitle: 'リアルな街歩きやナイトライフを直感的に楽しめる設計。',
      guestModeTitle: 'ゲストモード',
      guestModeDesc: 'アカウント登録なしで、都市のヒートマップ、人気スポット、イベント、限定ガイドをすぐに閲覧できます。',
      guestModeCta: 'ゲストとしてマップを探索',
      touristModeTitle: 'ツーリストモード',
      touristModeDesc: 'リアルタイム多言語翻訳、安全ガイド、世界各地のビーチ＆ナイトライフ攻略情報を網羅。',
      touristModeCta: 'トラベルバディを開く',
      pulseModeTitle: 'ナイトライフ＆イベントパルス',
      pulseModeDesc: '現在の混雑状況（空いている、普通、混雑、ピーク）、音楽ジャンル、ドレスコードを出発前に確認。',
      pulseModeCta: '今夜のパルスを確認',
      qrModeTitle: 'オプショナルQR ID',
      qrModeDesc: '電話番号を公開することなく、安全なチェックインや連絡先の交換が可能。',
      qrModeCta: 'QRカードをスキャン',
    },
    markets: {
      sectionTitle: '地域ハブ＆認証済み都市ガイド',
      sectionSubtitle: '都市をクリックして、Cerca上で厳選スポットやリアルタイム状況を確認できます。',
      tabThailand: 'タイ 🇹🇭',
      tabColombia: 'コロンビア 🇨🇴',
      tabBrazil: 'ブラジル 🇧🇷',
      tabUsa: 'アメリカ 🇺🇸',
      viewCityGuide: 'ガイドを見る →',
    },
    carousel: {
      badge: '今夜の厳選ディストリクト特集',
      viewFullGuide: 'Cercaで完全ガイドを見る',
    },
    hosts: {
      sectionTitle: '認証済み現地ホスト＆コンシェルジュ',
      sectionSubtitle: 'Cerca上で信頼できる現地のインサイダーやクリエイターとリアルタイムに繋がれます。',
      tapToEmail: 'タップしてメール・予約',
      dossierBadge: '認証済みホスト情報',
      overviewTitle: '現地インサイダーの紹介',
      servicesTitle: '対応可能なコンシェルジュサービス',
      topSpotsTitle: 'のおすすめスポット',
      languagesTitle: '対応言語',
      musicTitle: '音楽＆雰囲気',
      emailBtn: 'ガイドにメール / 予約リクエスト',
      cercaBtn: 'Cercaアプリで探索',
      whatsappBtn: 'WhatsAppで直接相談',
      reviewsText: '件の認証済みレビュー',
    },
    trust: {
      sectionTitle: '信頼・セキュリティ・コンプライアンス',
      zeroDataTitle: '個人データ保存ゼロ',
      zeroDataDesc: '位置情報履歴やデジタルフットプリントを残さず、一時セッションは自動で消滅します。',
      cryptoTitle: 'TLS 1.3 エンドツーエンド暗号化',
      cryptoDesc: '15全ハブで暗号化されたテレメトリー信号とセキュアなQR共有を実現。',
      hostsTitle: '100%認証済み現地ホスト',
      hostsDesc: 'すべてのキュレーターとガイドはCerca現地アンバサダーにより直接認証されています。',
      supportEmailBadge: 'コンシェルジュ直通メール',
    },
    classifieds: {
      badge: 'タイ＆グローバル・コミュニティ掲示板',
      title: 'VIPテーブルシェア＆ナイトライフ掲示板',
      subtitle: 'バンコク、プーケット、サムイ島のVIPテーブル共同利用、認証ガイドツアー、プライベートボート、ノマド向けヴィラ情報。',
      allTab: 'すべての募集',
      bangkokTab: 'バンコク 🇹🇭',
      phuketTab: 'プーケット 🇹🇭',
      samuiTab: 'サムイ島 🇹🇭',
      globalTab: 'グローバル / 米州 🌐',
      postBtn: '+ 募集を投稿 / テーブルシェアを提案',
      modalTitle: '募集・提案を投稿する',
      modalSubtitle: 'Cercaコンシェルジュが直接確認し、承認後にグローバルハブに掲載されます。',
      formType: 'カテゴリー',
      formCity: '対象都市',
      formTitle: '投稿タイトル',
      formDetails: '詳細・日時・シェア費用',
      formContact: '連絡先（メールまたはWhatsApp）',
      submitBtn: 'コンシェルジュに送信する',
      closeBtn: '閉じる',
      successMsg: 'コンシェルジュに送信されました！追ってご連絡いたします。',
      contactConcierge: 'コンシェルジュ経由で問い合わせ',
    },
    telemetryMonitor: {
      title: 'リアルタイム・トラフィック＆テレメトリーモニター',
      sessionsToday: '本日の認証セッション数',
      appRoutes: 'Cercaアプリ遷移数',
      activeNow: '現在のオンライン訪問者数',
      status: 'ハブ稼働状況: タイ（オンライン）',
    },
    footer: {
      citiesCol: '稼働中地域ハブ',
      featuresCol: 'ライブ機能',
      safetyCol: '安全と利用規約',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      androidApp: 'Androidアプリ (Google Play)',
      aiContext: 'AIコンテキスト (llms.txt)',
      languageSelectorTitle: '表示言語の選択',
      copyright: 'All rights reserved. ScanQR Global & Cerca Social Network.',
    },
  },

  // 8. CHINESE (中文)
  zh: {
    nav: {
      exploreMap: '探索社交地图',
      launchApp: '打开 Cerca 应用',
      languageLabel: '语言',
    },
    telemetry: {
      liveBadge: '实时全球信号',
      tickerHeader: 'Cerca 全球信号同步',
      pingLatency: '网络延迟',
      hubActive: '枢纽在线',
    },
    hero: {
      trustBadge: '100% 认证本地向导 & 零门槛实时社交地图',
      headline: '专为夜生活、旅行者与街区脉搏打造的',
      headlineHighlight: '实时社交雷达',
      subheadline: '探索泰国、哥伦比亚、巴西与美国的15个全球活力枢纽。提供实时人流监测、认证街区礼宾向导、安全动态QR码名片与多语言即时互译。',
      ctaPrimary: '即刻体验 Cerca 网页版',
      ctaSecondary: '浏览 15 大全球枢纽',
      statsHubs: '15 个已上线活力区域',
      statsVitals: '实时客流与氛围指数',
      statsSafety: '隐身与隐私保护模式',
      statsHandshake: '安全动态二维码名片',
    },
    queryBar: {
      title: 'Cerca AI 自然语言智能问答',
      placeholder: '询问 Cerca AI（例如：“曼谷最佳夜生活”、“普吉岛海滩俱乐部”等）...',
      synthesizing: '正在分析全球实时信号与向导档案...',
      chipAll: '热门咨询：',
      chips: {
        bangkok: '曼谷精彩夜生活',
        phuket: '普吉岛海滩俱乐部',
        bogota: '波哥大隐秘酒吧',
        rio: '里约街头桑巴',
        miami: '迈阿密非洲浩室',
        qr: '动态QR签到如何运作',
      },
    },
    geoPing: {
      detectBtn: '定位附近枢纽 / 测算最近城市',
      scanning: '正在测算与最近枢纽的距离...',
      lockedTitle: '已锁定最近区域枢纽',
      distance: '大圆球面距离',
      recommendedSpot: '精选热门地标',
      pulseLabel: '音乐与氛围',
      exploreCityCta: '进入该城市指南 →',
      browserPrompt: '正在识别距离最近的认证街区...',
    },
    pillars: {
      sectionTitle: '四大核心模式，直观无界',
      sectionSubtitle: '专为现实世界的直观探索与即兴夜生活设计。',
      guestModeTitle: '访客模式 (Guest Mode)',
      guestModeDesc: '无需注册即可立即浏览全球城市热力图、热门去处、活动及精选向导。',
      guestModeCta: '以访客身份探索地图',
      touristModeTitle: '旅行者模式 (Tourist Mode)',
      touristModeDesc: '实时多语言翻译、安全指南及全球海滩与夜生活精选路线。',
      touristModeCta: '开启旅行伴侣',
      pulseModeTitle: '夜生活与活动实时脉搏',
      pulseModeDesc: '实时客流密度（清闲、适中、热闹、高峰）、音乐类型、着装风格与入场信息。',
      pulseModeCta: '查看今晚实时脉搏',
      qrModeTitle: '安全QR身份互换 (可选)',
      qrModeDesc: '安全入场签到并交换社交联系卡，无需透露私人电话号码。',
      qrModeCta: '扫描QR名片',
    },
    markets: {
      sectionTitle: '区域枢纽与认证城市指南',
      sectionSubtitle: '点击任一城市，即刻在 Cerca 上查看精选场馆、实时客流与向导动态。',
      tabThailand: '泰国 🇹🇭',
      tabColombia: '哥伦比亚 🇨🇴',
      tabBrazil: '巴西 🇧🇷',
      tabUsa: '美国 🇺🇸',
      viewCityGuide: '探索指南 →',
    },
    carousel: {
      badge: '今夜精选街区风向',
      viewFullGuide: '在 Cerca 查看完整指南',
    },
    hosts: {
      sectionTitle: '官方认证本地向导与礼宾员',
      sectionSubtitle: '在 Cerca 上与值得信赖的街区达人及本地向导实时连线。',
      tapToEmail: '点击发送邮件与预约',
      dossierBadge: '认证向导专属档案',
      overviewTitle: '本地向导背景档案',
      servicesTitle: '提供礼宾与向导服务',
      topSpotsTitle: '本地精选推荐地标',
      languagesTitle: '精通语言',
      musicTitle: '音乐流派与氛围',
      emailBtn: '发送邮件预约向导服务',
      cercaBtn: '在 Cerca 应用中探索',
      whatsappBtn: 'WhatsApp 直联礼宾',
      reviewsText: '条已验证真实评价',
    },
    trust: {
      sectionTitle: '信任、安全与隐私合规',
      zeroDataTitle: '零个人隐私数据留存',
      zeroDataDesc: '临时无痕会话自动失效，绝不保留位置足迹或数字监控数据。',
      cryptoTitle: 'TLS 1.3 端到端金融级加密',
      cryptoDesc: '15大枢纽全域采用加密信号锁定与离散型QR名片安全交互。',
      hostsTitle: '100% 实地认证本地向导',
      hostsDesc: '每位街区策划人均由 Cerca 实地特派大使面对面核实认证。',
      supportEmailBadge: '礼宾向导直通邮箱',
    },
    classifieds: {
      badge: '泰国与全球社区公告栏',
      title: 'VIP卡座拼单与本地生活分类信息',
      subtitle: '曼谷、普吉岛与苏梅岛热门夜店VIP卡座分摊、认证向导微旅行、私人长尾船出海及数字游民海景别墅转租。',
      allTab: '全部列表',
      bangkokTab: '曼谷 🇹🇭',
      phuketTab: '普吉岛 🇹🇭',
      samuiTab: '苏梅岛 🇹🇭',
      globalTab: '美洲与全球 🌐',
      postBtn: '+ 发布分类信息 / 发起卡座拼单',
      modalTitle: '提交分类信息 / 发起VIP拼桌',
      modalSubtitle: '经由 Cerca 专属礼宾团队审核后，即时同步至全球各大活力枢纽。',
      formType: '分类类型',
      formCity: '所属城市',
      formTitle: '信息标题',
      formDetails: '活动详情、日期与分摊金额',
      formContact: '联系方式（邮箱或 WhatsApp）',
      submitBtn: '提交至礼宾团队',
      closeBtn: '关闭',
      successMsg: '已成功发送至 Cerca 礼宾团队！我们将尽快与您联系。',
      contactConcierge: '联系礼宾咨询',
    },
    telemetryMonitor: {
      title: '实时流量与全球信号监控器',
      sessionsToday: '今日认证访问次数',
      appRoutes: '引导至 Cerca 应用数',
      activeNow: '当前在线访客',
      status: '枢纽状态：泰国在线活跃',
    },
    footer: {
      citiesCol: '已上线区域枢纽',
      featuresCol: '实时核心功能',
      safetyCol: '安全合规与条款',
      privacy: '隐私权政策',
      terms: '服务条款',
      androidApp: '安卓客户端 (Google Play)',
      aiContext: '大语言模型上下文 (llms.txt)',
      languageSelectorTitle: '选择界面语言',
      copyright: '版权所有 © ScanQR Global 与 Cerca 社交网络。',
    },
  },
}

// POSTED LOCATIONS TRANSLATIONS (Cities across Thailand, Colombia, Brazil, USA)
export const LOCATION_TRANSLATIONS: Record<string, Partial<Record<Locale, CityTranslation>>> = {
  // THAILAND
  bangkok: {
    en: { name: 'Bangkok', tag: 'Theatrical Speakeasies & Skybars', pulse: 'Deep House & Melodic Techno', venuesCount: 'Curated Skybars & Clubs', highlights: 'Sing Sing Theater, Onyx RCA, Tichuca Rooftop' },
    th: { name: 'กรุงเทพมหานคร (Bangkok)', tag: 'บาร์ลับสุดหรู สกายบาร์วิวระฟ้า และอาร์ซีเอ', pulse: 'ดีพเฮาส์และเมโลดิกเทคโน', venuesCount: '12 สกายบาร์และคลับระดับพรีเมียม', highlights: 'Sing Sing Theater, Tichuca Rooftop, Onyx RCA' },
    es: { name: 'Bangkok', tag: 'Speakeasies Teatrales y Bares de Altura', pulse: 'Deep House y Techno Melódico', venuesCount: 'Rooftops y Discotecas VIP', highlights: 'Sing Sing Theater, Onyx RCA, Tichuca' },
    pt: { name: 'Bangkok', tag: 'Bares Secretos e Rooftops Iluminados', pulse: 'Deep House e Melodic Techno', venuesCount: 'Rooftops e Baladas Selecionadas', highlights: 'Sing Sing Theater, Onyx RCA, Tichuca' },
    ja: { name: 'バンコク (Bangkok)', tag: '劇場型スピークイージー＆ルーフトップ', pulse: 'ディープハウス＆テクノ', venuesCount: '厳選スカイバー＆クラブ', highlights: 'Sing Sing Theater, Tichuca, Onyx RCA' },
    zh: { name: '曼谷 (Bangkok)', tag: '沉浸式隐秘酒吧与璀璨高空吧', pulse: '深邃浩室与旋律科技舞曲', venuesCount: '精选高空酒吧与夜总会', highlights: 'Sing Sing Theater, Tichuca Rooftop, Onyx RCA' },
  },
  phuket: {
    en: { name: 'Phuket', tag: 'Sunset Beach Clubs & Island Beats', pulse: 'Tropical House & Sunset Grooves', venuesCount: 'Beach Clubs & Nightspots', highlights: 'Café del Mar Kamala, Catch Beach Club, Bangla Road' },
    th: { name: 'ภูเก็ต (Phuket)', tag: 'บีชคลับริมหาด ปาร์ตี้เกาะ และถนนบางลา', pulse: 'ทรอปิคอลเฮาส์และซันเซ็ตบีทส์', venuesCount: '9 บีชคลับริมอันดามัน', highlights: 'Café del Mar Kamala, Catch Beach Club Bang Tao, Bangla Road' },
    es: { name: 'Phuket', tag: 'Clubes de Playa al Atardecer y Fiesta Isleña', pulse: 'Tropical House y Atardeceres', venuesCount: 'Clubes de Playa y Noche', highlights: 'Café del Mar, Catch Beach Club, Bangla Road' },
    pt: { name: 'Phuket', tag: 'Beach Clubs no Pôr do Sol e Ilhas', pulse: 'Tropical House e Vibe Praiana', venuesCount: 'Beach Clubs e Pontos Noturnos', highlights: 'Café del Mar, Catch Beach Club, Bangla Road' },
    ja: { name: 'プーケット (Phuket)', tag: 'サンセットビーチクラブ＆アイランドパーティー', pulse: 'トロピカルハウス＆サンセットビート', venuesCount: '厳選ビーチクラブ＆バー', highlights: 'Café del Mar, Catch Beach Club, Bangla Road' },
    zh: { name: '普吉岛 (Phuket)', tag: '落日海滩俱乐部与安达曼海浪狂欢', pulse: '热带浩室与落日律动', venuesCount: '精选海滩俱乐部与夜市', highlights: 'Café del Mar, Catch Beach Club, Bangla Road' },
  },
  'koh-samui': {
    en: { name: 'Koh Samui', tag: 'Gulf Day Clubs & Fire Acrobatics', pulse: 'Beach House & Reggae Rhythms', venuesCount: 'Day Clubs & Lounges', highlights: "Ark Bar Chaweng, SEEN Beach Club, Coco Tam's" },
    th: { name: 'เกาะสมุย (Koh Samui)', tag: 'คลับหาดเฉวง โชว์ควงกระบองไฟ และวิวอ่าวไทย', pulse: 'บีชเฮาส์และจังหวะเร้กเก้', venuesCount: '8 คลับริมชายหาด', highlights: "Ark Bar Beach Club, SEEN Beach Club, Coco Tam's" },
    es: { name: 'Koh Samui', tag: 'Clubes de Día en el Golfo y Malabares de Fuego', pulse: 'Beach House y Reggae', venuesCount: 'Clubes Costeros y Terrazas', highlights: 'Ark Bar Chaweng, SEEN Beach Club' },
    pt: { name: 'Koh Samui', tag: 'Day Clubs à Beira-Mar e Shows de Fogo', pulse: 'Beach House e Ritmos Tropicais', venuesCount: 'Day Clubs e Lounges Praianos', highlights: 'Ark Bar Chaweng, SEEN Beach Club' },
    ja: { name: 'サムイ島 (Koh Samui)', tag: 'デイクラブ＆ファイヤーショー', pulse: 'ビーチハウス＆レゲエ', venuesCount: '厳選オーシャンラウンジ', highlights: 'Ark Bar, SEEN Beach Club' },
    zh: { name: '苏梅岛 (Koh Samui)', tag: '查汶海滩俱乐部与炫目火舞秀', pulse: '海滩浩室与热带雷鬼', venuesCount: '精选临海俱乐部与酒廊', highlights: 'Ark Bar Beach Club, SEEN Beach Club' },
  },
  krabi: {
    en: { name: 'Krabi', tag: 'Limestone Cliff Bars & Railay Caverns', pulse: 'Acoustic Sunset & Chillout', venuesCount: 'Karst Cliff Bars & Lounges', highlights: 'Tew Lay Bar Railay, The Grotto at Rayavadee, Ao Nang' },
    th: { name: 'กระบี่ (Krabi)', tag: 'บาร์หน้าผาหินปูน หาดไร่เลย์ และถ้ำริมทะเล', pulse: 'อะคูสติกยามเย็นและชิลล์เอาท์', venuesCount: '7 บาร์วิวอ่าวไร่เลย์และอ่าวนาง', highlights: 'Tew Lay Bar Railay, The Grotto at Rayavadee, อ่าวนาง' },
    es: { name: 'Krabi', tag: 'Bares en Acantilados Calizos y Cuevas de Railay', pulse: 'Acústico y Chillout al Atardecer', venuesCount: 'Terrazas en Acantilados', highlights: 'Tew Lay Bar, The Grotto Rayavadee' },
    pt: { name: 'Krabi', tag: 'Bares nos Penhascos de Calcário e Cavernas', pulse: 'Acústico e Chillout Praiano', venuesCount: 'Bares em Falésias e Enseadas', highlights: 'Tew Lay Bar, The Grotto Rayavadee' },
    ja: { name: 'クラビ (Krabi)', tag: '石灰岩クリフバー＆ライレイ洞窟', pulse: 'アコースティック＆チルアウト', venuesCount: '絶景クリフラウンジ', highlights: 'Tew Lay Bar Railay, The Grotto' },
    zh: { name: '甲米 (Krabi)', tag: '喀斯特石灰岩悬崖吧与莱利秘境', pulse: '原声民谣与日落舒缓乐', venuesCount: '精选悬崖海景酒廊', highlights: 'Tew Lay Bar, The Grotto Rayavadee' },
  },
  pattaya: {
    en: { name: 'Pattaya', tag: '34th-Floor Terraces & Walking Street', pulse: 'High-Energy EDM & Beachfront Lounges', venuesCount: 'Ocean Terraces & Mega-Clubs', highlights: 'Horizon Rooftop Bar, Republic Club, Walking Street' },
    th: { name: 'พัทยา (Pattaya)', tag: 'สกายบาร์ชั้น 34 วิวทะเล และวอล์คกิ้งสตรีท', pulse: 'อีดีเอ็มเร้าใจและเลานจ์ริมอ่าว', venuesCount: '10 คลับและรูฟท็อปริมอ่าวพัทยา', highlights: 'Horizon Rooftop Bar, Republic Club, Walking Street' },
    es: { name: 'Pattaya', tag: 'Terrazas en Piso 34 y Walking Street', pulse: 'EDM Energético y Lounges', venuesCount: 'Terrazas al Océano y Mega-Clubs', highlights: 'Horizon Rooftop, Republic Club' },
    pt: { name: 'Pattaya', tag: 'Terraços no 34º Andar e Walking Street', pulse: 'EDM de Alta Energia e Lounges', venuesCount: 'Terraços Marítimos e Baladas', highlights: 'Horizon Rooftop, Republic Club' },
    ja: { name: 'パタヤ (Pattaya)', tag: '34階オーシャンテラス＆ウォーキングストリート', pulse: 'エネルギッシュなEDM＆ラウンジ', venuesCount: 'オーシャンテラス＆メガクラブ', highlights: 'Horizon Rooftop, Republic Club' },
    zh: { name: '芭堤雅 (Pattaya)', tag: '34层海景露台与风情步行街', pulse: '高能电子舞曲与滨海酒廊', venuesCount: '精选观海露台与超级派对', highlights: 'Horizon Rooftop Bar, Republic Club' },
  },

  // COLOMBIA
  bogota: {
    en: { name: 'Bogotá', tag: 'Zona Rosa & Chapinero Mega-Parties', pulse: 'Cumbia, Salsa & Andean Techno', venuesCount: 'Cosmopolitan Mega-Clubs', highlights: 'Theatron Chapinero, Andrés D.C., Esposito Zona Rosa' },
    th: { name: 'โบโกตา (Bogotá)', tag: 'ย่านโซน่า โรซ่า และชาปิเนโร 13 ห้องเต้น', pulse: 'คุมเบีย ซัลซ่า และอันเดียนเทคโน', venuesCount: '11 เมกะคลับและบาร์อาหารระดับโลก', highlights: 'Theatron Chapinero, Andrés D.C., Esposito' },
    es: { name: 'Bogotá', tag: 'Zona Rosa y Fiestas en Chapinero', pulse: 'Cumbia, Salsa y Techno Andino', venuesCount: 'Mega-Discotecas Cosmopolitas', highlights: 'Theatron Chapinero, Andrés D.C., Esposito' },
    pt: { name: 'Bogotá', tag: 'Zona Rosa e Baladas em Chapinero', pulse: 'Cumbia, Salsa e Techno Andino', venuesCount: 'Mega-Baladas Cosmopolitas', highlights: 'Theatron Chapinero, Andrés D.C.' },
    ja: { name: 'ボゴタ (Bogotá)', tag: 'ソナ・ロサ＆チャピネロの熱狂ナイト', pulse: 'クンビア、サルサ＆アンデステクノ', venuesCount: '世界的メガクラブ＆ラウンジ', highlights: 'Theatron Chapinero, Andrés D.C.' },
    zh: { name: '波哥大 (Bogotá)', tag: '粉红区与查皮内罗13厅超大型派对', pulse: '昆比亚舞曲、萨尔萨与安第斯电子', venuesCount: '国际大都会级超级舞厅', highlights: 'Theatron Chapinero, Andrés D.C.' },
  },

  // BRAZIL
  'sao-paulo': {
    en: { name: 'São Paulo', tag: 'Underground Temples & Copan Views', pulse: 'Dark Minimal Techno & Nu-Disco', venuesCount: 'Underground Vaults & Rooftops', highlights: 'D-Edge Barra Funda, Tokyo SP Centro, Bar dos Arcos' },
    th: { name: 'เซาเปาโล (São Paulo)', tag: 'วิหารดนตรีเทคโนใต้ดินและรูฟท็อปโคปัน', pulse: 'ดาร์กมินิมอลเทคโนและนู-ดิสโก้', venuesCount: '14 คลับใต้ดินและรูฟท็อป', highlights: 'D-Edge Barra Funda, Tokyo SP, Bar dos Arcos' },
    es: { name: 'São Paulo', tag: 'Templos Underground y Vistas de Copan', pulse: 'Techno Minimal Oscuro y Nu-Disco', venuesCount: 'Bóvedas Subterráneas y Rooftops', highlights: 'D-Edge, Tokyo SP, Bar dos Arcos' },
    pt: { name: 'São Paulo', tag: 'Templos Subterrâneos e Vistas do Copan', pulse: 'Techno Minimalista e Nu-Disco', venuesCount: 'Cavas Subterrâneas e Rooftops', highlights: 'D-Edge Barra Funda, Tokyo SP, Bar dos Arcos' },
    ja: { name: 'サンパウロ (São Paulo)', tag: '地下神殿テクノ＆コパン絶景', pulse: 'ダークミニマルテクノ＆ディスコ', venuesCount: '地下ボルト＆ルーフトップ', highlights: 'D-Edge, Tokyo SP, Bar dos Arcos' },
    zh: { name: '圣保罗 (São Paulo)', tag: '地下电子乐殿堂与科潘大厦高空夜景', pulse: '暗黑极简科技舞曲与新迪斯科', venuesCount: '地下金库酒吧与全景露台', highlights: 'D-Edge, Tokyo SP Centro, Bar dos Arcos' },
  },
  rio: {
    en: { name: 'Rio de Janeiro', tag: 'Lapa Street Sambas & Coastal Sunsets', pulse: 'Samba de Raiz, Funk & Bossa Nova', venuesCount: 'Historic Sambas & Beach Bars', highlights: 'Circo Voador Lapa, Rio Scenarium, Bar Urca' },
    th: { name: 'ริโอเดจาเนโร (Rio de Janeiro)', tag: 'วงแซมบ้าสดถนนลาปาและพระอาทิตย์ตกหาดอีปาเนมา', pulse: 'แซมบ้าเดอไรซ์ ฟังก์คาริโอกา และบอสซาโนวา', venuesCount: '10 จุดแซมบ้าประวัติศาสตร์และบาร์ริมหาด', highlights: 'Circo Voador Lapa, Rio Scenarium, Bar Urca' },
    es: { name: 'Río de Janeiro', tag: 'Sambas Callejeras en Lapa y Arpoador', pulse: 'Samba de Raiz, Funk Carioca y Bossa Nova', venuesCount: 'Sambas Históricas y Bares de Playa', highlights: 'Circo Voador, Rio Scenarium, Bar Urca' },
    pt: { name: 'Rio de Janeiro', tag: 'Rodas de Samba na Lapa e Pôr do Sol', pulse: 'Samba de Raiz, Funk Carioca e Bossa Nova', venuesCount: 'Sambas Históricos e Quiosques', highlights: 'Circo Voador Lapa, Rio Scenarium, Bar Urca' },
    ja: { name: 'リオデジャネイロ (Rio)', tag: 'ラパのストリートサンバ＆海岸の夕日', pulse: '本場サンバ、ファンク＆ボサノバ', venuesCount: '歴史的サンバ会場＆ビーチバー', highlights: 'Circo Voador Lapa, Rio Scenarium' },
    zh: { name: '里约热内卢 (Rio)', tag: '拉帕街头桑巴盛会与科帕卡巴纳日落', pulse: '正统桑巴、卡里奥卡放克与波萨诺瓦', venuesCount: '百年历史桑巴馆与海滨餐吧', highlights: 'Circo Voador, Rio Scenarium, Bar Urca' },
  },
  florianopolis: {
    en: { name: 'Florianópolis', tag: 'Jurerê Electronic Beach Clubs & Lagoa', pulse: 'Electro-Beach & Deep House', venuesCount: 'Luxury Day Clubs & Pier Bars', highlights: 'P12 Jurerê, Cafe de la Musique, Praia Mole' },
    th: { name: 'โฟลเรียนอโปลิส (Florianópolis)', tag: 'บีชคลับหรูหาดจูเรเรและทะเลสาบลาโกอา', pulse: 'อิเล็กโทรบีชและดีพเฮาส์', venuesCount: '8 บีชคลับระดับพรีเมียม', highlights: 'P12 Jurerê, Cafe de la Musique, Praia Mole' },
    es: { name: 'Florianópolis', tag: 'Clubes de Playa Electrónicos en Jurerê', pulse: 'Electro-Beach y Deep House', venuesCount: 'Clubes de Lujo y Bares de Muelle', highlights: 'P12 Jurerê, Cafe de la Musique' },
    pt: { name: 'Florianópolis', tag: 'Beach Clubs Eletrônicos em Jurerê e Lagoa', pulse: 'Electro-Beach e Deep House', venuesCount: 'Day Clubs de Luxo e Píers', highlights: 'P12 Jurerê, Cafe de la Musique' },
    ja: { name: 'フロリアノポリス (Florianópolis)', tag: 'ジュレレ極上ビーチクラブ＆ラゴア', pulse: 'エレクトロビーチ＆ディープハウス', venuesCount: '高級デイクラブ＆ピアバー', highlights: 'P12 Jurerê, Cafe de la Musique' },
    zh: { name: '弗洛里亚诺波利斯 (Floripa)', tag: '朱雷雷顶级奢华海滩俱乐部', pulse: '海滨电子与深邃浩室', venuesCount: '海滨名流俱乐部与落日码头', highlights: 'P12 Jurerê, Cafe de la Musique' },
  },
  salvador: {
    en: { name: 'Salvador', tag: 'Pelourinho Percussion & Afro Rhythms', pulse: 'Samba-Reggae, Axé & Afrobeat', venuesCount: 'Historic Cultural Hotspots', highlights: 'Largo do Pelourinho, Porto da Barra, Rio Vermelho' },
    th: { name: 'ซัลวาดอร์ (Salvador)', tag: 'จังหวะกลองเปโลรินโญและวัฒนธรรมแอฟโฟร-บราซิล', pulse: 'แซมบ้า-เร้กเก้ แอกเซ่ และแอฟโฟรบีท', venuesCount: '9 จุดรวมวัฒนธรรมดนตรีสด', highlights: 'Largo do Pelourinho, Porto da Barra' },
    es: { name: 'Salvador de Bahía', tag: 'Percusión de Pelourinho y Ritmos Afro', pulse: 'Samba-Reggae, Axé y Afrobeat', venuesCount: 'Centros Culturales Históricos', highlights: 'Largo do Pelourinho, Porto da Barra' },
    pt: { name: 'Salvador da Bahia', tag: 'Percussão do Pelourinho e Ritmos Afro', pulse: 'Samba-Reggae, Axé e Afrobeat', venuesCount: 'Pontos Históricos e Culturais', highlights: 'Largo do Pelourinho, Porto da Barra' },
    ja: { name: 'サルバドール (Salvador)', tag: 'ペロウリーニョの打楽器＆アフロリズム', pulse: 'サンバ・レゲエ、アシェー＆アフロビート', venuesCount: '歴史的カルチャースポット', highlights: 'Largo do Pelourinho, Porto da Barra' },
    zh: { name: '萨尔瓦多 (Salvador)', tag: '佩洛里尼奥打击乐与非裔巴西文化', pulse: '桑巴雷鬼、阿谢乐与非洲节奏', venuesCount: '历史文化地标与海湾露台', highlights: 'Largo do Pelourinho, Porto da Barra' },
  },

  // USA
  la: {
    en: { name: 'Los Angeles', tag: 'Coastal Lounges & Sunset Speakeasies', pulse: 'Melodic House & Sunset Disco', venuesCount: 'Curated Rooftops & Lounges', highlights: 'Élephante Santa Monica, Desert 5 Spot, Sound' },
    th: { name: 'ลอสแอนเจลิส (Los Angeles)', tag: 'เลานจ์ชายหาด รูฟท็อป และบาร์ลับซันเซ็ต', pulse: 'เมโลดิกเฮาส์และซันเซ็ตดิสโก้', venuesCount: '12 รูฟท็อปและบาร์ลับคัดสรร', highlights: 'Élephante Santa Monica, Desert 5 Spot, Sound' },
    es: { name: 'Los Ángeles', tag: 'Lounges Costeros y Speakeasies al Atardecer', pulse: 'Melodic House y Disco al Atardecer', venuesCount: 'Rooftops y Lounges Exclusivos', highlights: 'Élephante, Desert 5 Spot, Sound' },
    pt: { name: 'Los Angeles', tag: 'Lounges na Costa e Bares Secretos', pulse: 'Melodic House e Disco no Pôr do Sol', venuesCount: 'Rooftops e Lounges Selecionados', highlights: 'Élephante, Desert 5 Spot, Sound' },
    ja: { name: 'ロサンゼルス (LA)', tag: '海岸ラウンジ＆夕日の隠れ家バー', pulse: 'メロディックハウス＆ディスコ', venuesCount: '厳選ルーフトップ＆バー', highlights: 'Élephante, Desert 5 Spot, Sound' },
    zh: { name: '洛杉矶 (Los Angeles)', tag: '太平洋海岸观景吧与复古落日酒廊', pulse: '旋律浩室与日落迪斯科', venuesCount: '精选屋顶露台与暗门酒吧', highlights: 'Élephante, Desert 5 Spot, Sound' },
  },
  miami: {
    en: { name: 'Miami', tag: 'South Beach Energy & Wynwood Art Beats', pulse: 'Afro-House, Tech-House & Latin Beats', venuesCount: 'Ultra-Clubs & VIP Rooftops', highlights: 'Club Space Terrace, LIV Miami, 1 Hotel' },
    th: { name: 'ไมแอมี (Miami)', tag: 'เซาท์บีชระดับโลกและศิลปะย่านวินวูด', pulse: 'แอฟโฟรเฮาส์ เทคเฮาส์ และละตินบีทส์', venuesCount: '15 อัลตร้าคลับและรูฟท็อปวีไอพี', highlights: 'Club Space Terrace, LIV Miami, 1 Hotel' },
    es: { name: 'Miami', tag: 'Energía de South Beach y Wynwood', pulse: 'Afro-House, Tech-House y Ritmos Latinos', venuesCount: 'Ultra-Clubs y Terrazas VIP', highlights: 'Club Space, LIV, 1 Hotel' },
    pt: { name: 'Miami', tag: 'Energia de South Beach e Arte em Wynwood', pulse: 'Afro-House, Tech-House e Batidas Latinas', venuesCount: 'Super Baladas e Rooftops VIP', highlights: 'Club Space Terrace, LIV Miami' },
    ja: { name: 'マイアミ (Miami)', tag: 'サウスビーチの熱気＆ウィンウッドのアート', pulse: 'アフロハウス＆ラテンビート', venuesCount: 'ウルトラクラブ＆VIPルーフトップ', highlights: 'Club Space, LIV Miami, 1 Hotel' },
    zh: { name: '迈阿密 (Miami)', tag: '南海滩不夜狂欢与温伍德艺术脉动', pulse: '非洲浩室、科技浩室与拉丁节奏', venuesCount: '世界顶级超级舞厅与VIP露台', highlights: 'Club Space, LIV Miami, 1 Hotel' },
  },
  nyc: {
    en: { name: 'New York City', tag: 'Underground Dance & Hidden Speakeasies', pulse: 'Analog Vinyl Sets, Minimal Techno & Jazz', venuesCount: 'Hidden Speakeasies & Sound Vaults', highlights: 'House of Yes, Please Don’t Tell (PDT), Nebula' },
    th: { name: 'นิวยอร์ก (New York City)', tag: 'คลับแดนซ์ใต้ดินและบาร์ลับหลังตู้โทรศัพท์', pulse: 'แอนะล็อกไวนิล มินิมอลเทคโน และแจ๊ส', venuesCount: '16 บาร์ลับและห้องจัดแสดงดนตรี', highlights: 'House of Yes Brooklyn, PDT, Nebula NYC' },
    es: { name: 'Nueva York', tag: 'Baile Underground y Speakeasies Ocultos', pulse: 'Vinilo Análogo, Techno Minimal y Jazz', venuesCount: 'Speakeasies Secretos y Clubes de Sonido', highlights: 'House of Yes, PDT, Nebula' },
    pt: { name: 'Nova York', tag: 'Dança Underground e Bares Secretos', pulse: 'Vinil Analógico, Techno Minimal e Jazz', venuesCount: 'Bares Escondidos e Templos Sonoros', highlights: 'House of Yes, PDT, Nebula' },
    ja: { name: 'ニューヨーク (NYC)', tag: 'アンダーグラウンドダンス＆秘密の隠れ家バー', pulse: 'アナログレコード、ミニマルテクノ＆ジャズ', venuesCount: '隠れ家バー＆サウンドスペース', highlights: 'House of Yes, PDT, Nebula' },
    zh: { name: '纽约 (New York City)', tag: '地下先锋舞厅与神秘电话亭暗门酒吧', pulse: '黑胶唱片鉴赏、极简科技舞曲与爵士乐', venuesCount: '精选隐秘酒吧与声学圣殿', highlights: 'House of Yes, PDT, Nebula NYC' },
  },
  austin: {
    en: { name: 'Austin', tag: 'Live Music Capital & East Side Patios', pulse: 'Two-Step, Outlaw Country & Psych-Rock', venuesCount: 'Live Music Venues & Honky-Tonks', highlights: 'The White Horse, Hotel Vegas, Continental Club' },
    th: { name: 'ออสติน (Austin)', tag: 'เมืองหลวงดนตรีสดและบาร์ลานกลางแจ้งฝั่งตะวันออก', pulse: 'ทูสเต็ป คันทรี และไซเคเดลิกร็อก', venuesCount: '11 เวทีดนตรีสดและฮองกีทองก์', highlights: 'The White Horse, Hotel Vegas, Continental Club' },
    es: { name: 'Austin', tag: 'Capital de Música en Vivo y Patios del East Side', pulse: 'Two-Step, Country Rebelde y Psych-Rock', venuesCount: 'Escenarios en Vivo y Honky-Tonks', highlights: 'The White Horse, Hotel Vegas' },
    pt: { name: 'Austin', tag: 'Capital da Música ao Vivo e Pátios do East Side', pulse: 'Two-Step, Country Raiz e Rock Psicodélico', venuesCount: 'Casas de Show e Honky-Tonks', highlights: 'The White Horse, Hotel Vegas' },
    ja: { name: 'オースティン (Austin)', tag: 'ライブ音楽の都＆イーストサイドのパティオ', pulse: 'ツーステップ＆サイケロック', venuesCount: 'ライブ会場＆ホンキートンク', highlights: 'The White Horse, Hotel Vegas' },
    zh: { name: '奥斯汀 (Austin)', tag: '世界现场音乐之都与东区露天庭院', pulse: '双步舞曲、叛逆乡村乐与迷幻摇滚', venuesCount: '老牌音乐现场与乡村酒吧', highlights: 'The White Horse, Hotel Vegas' },
  },
  nashville: {
    en: { name: 'Nashville', tag: 'Broadway Honky-Tonk & Roots Music', pulse: 'Live Roots, Americana & Bluegrass', venuesCount: 'Historic Honky-Tonk Stages', highlights: "Robert's Western World, The 5 Spot, Station Inn" },
    th: { name: 'แนชวิลล์ (Nashville)', tag: 'ฮองกีทองก์ถนนบรอดเวย์และดนตรีรูทส์คันทรี', pulse: 'ดนตรีสด บลูแกรสส์ และอเมริกาน่า', venuesCount: '10 เวทีประวัติศาสตร์ดนตรีอเมริกัน', highlights: "Robert's Western World, The 5 Spot, Station Inn" },
    es: { name: 'Nashville', tag: 'Honky-Tonk en Broadway y Música de Raíz', pulse: 'Música de Raíz, Americana y Bluegrass', venuesCount: 'Escenarios Históricos de Honky-Tonk', highlights: "Robert's Western World, The 5 Spot" },
    pt: { name: 'Nashville', tag: 'Honky-Tonk da Broadway e Música Raiz', pulse: 'Raízes Musicais, Americana e Bluegrass', venuesCount: 'Palcos Históricos de Honky-Tonk', highlights: "Robert's Western World, The 5 Spot" },
    ja: { name: 'ナッシュビル (Nashville)', tag: 'ブロードウェイのホンキートンク＆ルーツ音楽', pulse: 'ルーツミュージック＆ブルーグラス', venuesCount: '歴史的ホンキートンクステージ', highlights: "Robert's Western World, The 5 Spot" },
    zh: { name: '纳什维尔 (Nashville)', tag: '百老汇乡村酒吧与原生态根源音乐', pulse: '现场根源民谣、美洲风情与蓝草音乐', venuesCount: '传奇历史现场舞台', highlights: "Robert's Western World, The 5 Spot" },
  },
}

// HOST TRANSLATIONS FOR THAI AND OTHER KEY LOCALES
export const HOST_TRANSLATIONS: Record<string, Partial<Record<Locale, HostTranslation>>> = {
  'top-bangkok': {
    th: {
      role: 'ผู้เชี่ยวชาญไนท์ไลฟ์สุขุมวิท',
      badge: 'วีไอพี โฮสต์',
      bio: 'ผู้ดูแลการต้อนรับย่านสุขุมวิทและผู้เชี่ยวชาญทองหล่อ พาเปิดประสบการณ์เลานจ์ลับ Sing Sing Theater, อาร์ซีเอ และจิบค็อกเทลชมวิวระฟ้าที่ Tichuca',
    },
    es: {
      role: 'Insider de Vida Nocturna',
      badge: 'Anfitrión VIP',
      bio: 'Curador de hospitalidad en Sukhumvit y experto en Thong Lo. Conectando viajeros con lounges secretos en Sing Sing Theater, mega-clubs de RCA y cócteles en Tichuca.',
    },
    pt: {
      role: 'Insider Noturno em Sukhumvit',
      badge: 'Host VIP',
      bio: 'Curador de hospitalidade em Sukhumvit e especialista em Thong Lo. Levando visitantes aos mezaninos secretos do Sing Sing Theater, mega-baladas no RCA e vista no Tichuca.',
    },
  },
  'somchai-phuket': {
    th: {
      role: 'ไกด์เกาะและไนท์ไลฟ์ภูเก็ต',
      badge: 'ไกด์รับรอง ททท.',
      bio: 'นักดำน้ำมาสเตอร์ PADI และกัปตันเรือท่องเกาะอันดามัน เชี่ยวชาญทริปสปีดโบ๊ทชมพระอาทิตย์ขึ้น หลบฝูงชนสู่หาดส่วนตัว และเดินชิมอาหารตลาดเก่าภูเก็ต',
    },
    es: {
      role: 'Guía Isleño Certificado TAT',
      badge: 'Guía Oficial TAT',
      bio: 'Buzo PADI y capitán de lanchas. Especializado en tours al amanecer evitando multitudes, playas secretas de arena blanca y paseos culinarios en el casco antiguo de Phuket.',
    },
    pt: {
      role: 'Guia de Ilhas e Vida Noturna',
      badge: 'Guia Oficial TAT',
      bio: 'Mergulhador PADI e capitão de barco. Especialista em passeios de lancha ao nascer do sol, praias desertas e passeios gastronômicos no centro histórico de Phuket.',
    },
  },
  'may-krabi': {
    th: {
      role: 'โฮสต์ท้องถิ่นหาดไร่เลย์',
      badge: 'โฮสต์ที่ได้รับการยืนยัน',
      bio: 'เจ้าของอีโค่ลอดจ์หาดไร่เลย์และครูฝึกปีนผา แนะนำเส้นทางเรือหางยาว ลากูนมรกตลับ และชมโชว์ควงกระบองไฟริมผาหินปูน',
    },
    es: {
      role: 'Anfitriona de Railay',
      badge: 'Anfitriona Verificada',
      bio: 'Propietaria de un eco-lodge en Railay Beach e instructora de escalada. Ayudando a viajeros con rutas en barcos tradicionales, lagunas esmeralda y shows de fuego.',
    },
    pt: {
      role: 'Anfitriã em Railay Beach',
      badge: 'Anfitriã Verificada',
      bio: 'Proprietária de eco-lodge em Railay Beach e instrutora de escalada. Conectando viajantes a rotas de barco longtail, lagoas secretas e malabaristas de fogo na praia.',
    },
  },
  'camila-bogota': {
    th: {
      role: 'ไกด์และภัณฑารักษ์อาหารโบโกตา',
      badge: 'ผู้เชี่ยวชาญโบโกตา',
      bio: 'ภัณฑารักษ์อาหารย่านโซน่า โรซ่า และช่างภาพไนท์ไลฟ์ พาสัมผัสปาร์ตี้ 13 ธีมที่ Theatron ร้านอาหารซัลซ่า Andrés D.C. และดนตรีใต้ดินในชาปิเนโร',
    },
    es: {
      role: 'Curadora y Guía Local',
      badge: 'Experta de Bogotá',
      bio: 'Curadora gastronómica de la Zona Rosa y fotógrafa nocturna. Llevando viajeros a las 13 salas de Theatron, cena y salsa en Andrés D.C. y fiestas electrónicas en Chapinero.',
    },
    pt: {
      role: 'Curadora e Guia Local',
      badge: 'Especialista em Bogotá',
      bio: 'Curadora gastronômica da Zona Rosa e fotógrafa. Mostrando as 13 pistas do Theatron, o ritmo latino de Andrés D.C. e a cena eletrônica de Chapinero.',
    },
  },
  'thiago-rio': {
    th: {
      role: 'ไกด์ท้องถิ่นคาริโอกา',
      badge: 'ไกด์คาริโอกา',
      bio: 'เกิดและเติบโตที่อีปาเนมา ครูสอนเซิร์ฟและมือกีตาร์แซมบ้า พาชมหาดธรรมชาติ ปรบมือรับพระอาทิตย์ตกที่อาร์โปอาดอร์ และวงแซมบ้าสดที่ลาปา',
    },
    es: {
      role: 'Guía Carioca Nativo',
      badge: 'Guía Carioca',
      bio: 'Nacido y criado en Ipanema. Entrenador de surf y guitarrista de samba. Guiando visitantes a playas salvajes (Prainha, Grumari), atardeceres en Arpoador y ruedas en Lapa.',
    },
    pt: {
      role: 'Guia Carioca Nativo',
      badge: 'Guia Carioca',
      bio: 'Nascido e criado em Ipanema. Professor de surf e músico de samba. Levando turistas para praias selvagens (Prainha, Grumari), pôr do sol no Arpoador e rodas de samba na Lapa.',
    },
  },
  'elena-la': {
    th: {
      role: 'ทูตไนท์ไลฟ์เวสต์ฮอลลีวูด',
      badge: 'โฮสต์ที่ได้รับการยืนยัน',
      bio: 'ช่างภาพเวสต์ฮอลลีวูดและผู้นำทริปพระอาทิตย์ตก แนะนำรูฟท็อปยามเย็น เซสชันเซิร์ฟหาดเวนิส และสปีคอีซี่ลับดาวน์ทาวน์',
    },
  },
  'sofia-miami': {
    th: {
      role: 'คอนเซียร์จไนท์ไลฟ์เซาท์บีช',
      badge: 'วีไอพี โฮสต์',
      bio: 'ผู้ดูแลอีเวนต์เซาท์บีชและครีเอทีฟย่านวินวูด ช่วยจองเกสต์ลิสต์รูฟท็อป มิกเซอร์วอลเลย์บอลชายหาด และปาร์ตี้แอฟโฟรเฮาส์',
    },
  },
}

// Helpers
export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('scanqr_locale') as Locale | null
    if (saved && SUPPORTED_LOCALES.some((l) => l.code === saved)) {
      return saved
    }
  } catch {
    // Private browsing mode storage protection
  }
  // Auto-detect browser language
  try {
    const navLang = (navigator?.language || '').toLowerCase()
    if (navLang.startsWith('th')) return 'th'
    if (navLang.startsWith('es')) return 'es'
    if (navLang.startsWith('pt')) return 'pt'
    if (navLang.startsWith('fr')) return 'fr'
    if (navLang.startsWith('de')) return 'de'
    if (navLang.startsWith('ja')) return 'ja'
    if (navLang.startsWith('zh')) return 'zh'
  } catch {
    // Fallback to default
  }
  return 'en'
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('scanqr_locale', locale)
    } catch {
      // Private browsing mode safe
    }
  }
}
