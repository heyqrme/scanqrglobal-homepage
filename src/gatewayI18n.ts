import { useState, useEffect, useCallback } from 'react'

export type GatewayLocale = 'en' | 'es' | 'th' | 'pt' | 'fr' | 'de' | 'ja' | 'zh'

export interface LocaleOption {
  code: GatewayLocale
  label: string
}

// Sleek minimal selector options - NO raw flag emojis
export const GATEWAY_LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'th', label: 'ภาษาไทย' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
]

export interface GatewayTranslations {
  nav: {
    brand: string
    badge: string
    navButton: string
  }
  hero: {
    tag: string
    headlineLine1: string
    headlineLine2: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
  }
  ticker: {
    guests: string
    knocks: string
    lounges: string
  }
  features: {
    eyebrow: string
    title: string
    cards: {
      rule: string
      tag: string
      title: string
      body: string
      action: string
    }[]
  }
  hubs: {
    eyebrow: string
    title: string
    cards: {
      city: string
      neighborhood: string
      status: string
      icon: string
    }[]
  }
  bottomCta: {
    headline: string
    subheadline: string
    primaryBtn: string
    secondaryLink: string
  }
  footer: {
    copyright: string
  }
  modals: {
    radarTitle: string
    radarSubtitle: string
    badgeTitle: string
    badgeSubtitle: string
    appTitle: string
    appSubtitle: string
    ghostModeActive: string
    ghostModeInactive: string
    knockSent: string
    copied: string
    close: string
  }
}

export const GATEWAY_TRANSLATIONS: Record<GatewayLocale, GatewayTranslations> = {
  // 1. ENGLISH (Official master copy)
  en: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● Radar Live in 4 Cities',
      navButton: 'Enter Radar →',
    },
    hero: {
      tag: 'EXCLUSIVE ACCESS • REAL-TIME NIGHTLIFE PROXIMITY',
      headlineLine1: 'Stop Guessing Who’s Out Tonight.',
      headlineLine2: 'See the Room. Make Your Move.',
      subheadline:
        'An electric map of real people, trending lounges, and private radar knocks happening around you right now. No phone numbers shared. No paper trails. Just instant chemistry.',
      ctaPrimary: 'See Who’s Out Tonight →',
      ctaSecondary: 'Scan Private QR Badge',
    },
    ticker: {
      guests: '🔥 312 Active Guests Nearby',
      knocks: '🍸 84 Knocks Exchanged Tonight',
      lounges: '⚡ 19 VIP Lounges Trending Now',
    },
    features: {
      eyebrow: 'THE RULES OF ENGAGEMENT',
      title: 'Everything Happens in the Moment',
      cards: [
        {
          rule: 'RULE 01',
          tag: 'PRIVATE KNOCK',
          title: 'Catch Someone’s Eye Across the Room',
          body:
            'Spot someone intriguing nearby? Send a private Knock. Mutual intrigue opens a direct line instantly—no awkward rejections, no handles traded, zero strings attached.',
          action: 'Simulate Knock',
        },
        {
          rule: 'RULE 02',
          tag: 'LIVE FLIPS',
          title: 'Feel the Vibe Before You Walk In',
          body:
            '10-second raw clips from inside the hottest rooms tonight. See who’s at the bar, what the crowd looks like, and where the energy is shifting before you even call your ride.',
          action: 'Watch 10s Clip',
        },
        {
          rule: 'RULE 03',
          tag: 'GHOST MODE',
          title: 'Total Control. Never Leak Your Number.',
          body:
            'Connect using your private encrypted QR badge. Step into Ghost Mode with a single tap to vanish from the radar whenever you want. Your real contacts and identity stay completely shielded.',
          action: 'Toggle Ghost Mode',
        },
        {
          rule: 'RULE 04',
          tag: 'ZERO BARRIERS',
          title: 'Chemistry Needs No Translation',
          body:
            'Two-way real-time voice, video, and text translation running live in-feed. Talk effortlessly with anyone in the room, whether you\'re in a rooftop lounge in Bangkok or a speakeasy in Bogotá.',
          action: 'Live Translation',
        },
      ],
    },
    hubs: {
      eyebrow: 'ACTIVE RADAR NETWORKS',
      title: 'Where the Night Is Moving',
      cards: [
        {
          city: 'Bogotá',
          neighborhood: 'Zona T & Chapinero',
          status: '🔴 42 Knocks Tonight • High Energy • Afro-House & Speakeasy Lounges',
          icon: '🔴',
        },
        {
          city: 'Bangkok',
          neighborhood: 'Thonglor & Sukhumvit',
          status: '🔥 88 Checked In • VIP Rooftops Active • Real-Time Translation Live',
          icon: '🔥',
        },
        {
          city: 'Rio de Janeiro',
          neighborhood: 'Ipanema & Lapa',
          status: '⚡ Samba Lounges Packed • 24 Live Flips Posted • Beach Heat',
          icon: '⚡',
        },
        {
          city: 'Miami',
          neighborhood: 'South Beach & Wynwood',
          status: '🍸 Late-Night Rush • Velvet Rope Access • Guestlists Moving',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'The room is already talking. Step inside.',
      subheadline: 'Join guests in your city on the live proximity map tonight.',
      primaryBtn: 'Unlock Live Proximity Radar →',
      secondaryLink: 'Get the Mobile App (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • Discretion Guaranteed.',
    },
    modals: {
      radarTitle: 'Live Proximity Radar',
      radarSubtitle: 'Real-time encrypted room telemetry',
      badgeTitle: 'Private Encrypted QR Badge',
      badgeSubtitle: 'Zero phone numbers shared. Step into Ghost Mode anytime.',
      appTitle: 'ScanQR Global Mobile',
      appSubtitle: 'Live Nightlife Proximity • iOS & Android Progressive App',
      ghostModeActive: 'Ghost Mode Active — Completely Invisible',
      ghostModeInactive: 'Radar Visible — Accepting Private Knocks',
      knockSent: 'Knock Dispatched — Direct line opens upon mutual intrigue',
      copied: 'Private badge link copied to clipboard',
      close: 'Close',
    },
  },

  // 2. ESPAÑOL
  es: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● Radar en Vivo en 4 Ciudades',
      navButton: 'Entrar al Radar →',
    },
    hero: {
      tag: 'ACCESO EXCLUSIVO • PROXIMIDAD NOCTURNA EN TIEMPO REAL',
      headlineLine1: 'Deja de adivinar quién sale esta noche.',
      headlineLine2: 'Mira la sala. Da tu paso.',
      subheadline:
        'Un mapa eléctrico de personas reales, lounges en tendencia y toques de radar privados sucediendo a tu alrededor ahora mismo. Sin números compartidos. Sin rastros. Solo química instantánea.',
      ctaPrimary: 'Mira quién sale esta noche →',
      ctaSecondary: 'Escanear QR Privado',
    },
    ticker: {
      guests: '🔥 312 Invitados Activos a tu Alrededor',
      knocks: '🍸 84 Knocks Intercambiados Esta Noche',
      lounges: '⚡ 19 Lounges VIP en Tendencia Ahora',
    },
    features: {
      eyebrow: 'LAS REGLAS DEL JUEGO',
      title: 'Todo Sucede en el Momento',
      cards: [
        {
          rule: 'REGLA 01',
          tag: 'KNOCK PRIVADO',
          title: 'Cruza miradas desde el otro lado de la sala',
          body:
            '¿Ves a alguien intrigante en la sala? Envía un Knock privado. El interés mutuo abre una línea directa al instante: sin rechazos incómodos, sin intercambiar redes, sin ataduras.',
          action: 'Simular Knock',
        },
        {
          rule: 'REGLA 02',
          tag: 'VIDEOS EN VIVO',
          title: 'Siente la vibra antes de entrar',
          body:
            'Clips reales de 10 segundos desde las salas más exclusivas de esta noche. Mira quién está en la barra, cómo es la gente y adónde se mueve la energía antes de pedir tu transporte.',
          action: 'Ver Clip de 10s',
        },
        {
          rule: 'REGLA 03',
          tag: 'MODO FANTASMA',
          title: 'Control total. Nunca reveles tu número.',
          body:
            'Conéctate con tu badge QR privado encriptado. Activa el Modo Fantasma con un solo toque para desaparecer del radar cuando quieras. Tus contactos e identidad real quedan 100% blindados.',
          action: 'Alternar Modo Fantasma',
        },
        {
          rule: 'REGLA 04',
          tag: 'CERO BARRERAS',
          title: 'La química no necesita traducción',
          body:
            'Traducción bidireccional en tiempo real de voz, video y texto en vivo en el feed. Habla con fluidez con cualquiera en la sala, ya sea en un rooftop en Bangkok o en un speakeasy en Bogotá.',
          action: 'Traducción en Vivo',
        },
      ],
    },
    hubs: {
      eyebrow: 'REDES DE RADAR ACTIVAS',
      title: 'Hacia Dónde se Mueve la Noche',
      cards: [
        {
          city: 'Bogotá',
          neighborhood: 'Zona T y Chapinero',
          status: '🔴 42 Knocks Esta Noche • Alta Energía • Afro-House y Speakeasies',
          icon: '🔴',
        },
        {
          city: 'Bangkok',
          neighborhood: 'Thonglor y Sukhumvit',
          status: '🔥 88 Registrados • Rooftops VIP Activos • Auto-Traducción en Vivo',
          icon: '🔥',
        },
        {
          city: 'Río de Janeiro',
          neighborhood: 'Ipanema y Lapa',
          status: '⚡ Samba Lounges Llenos • 24 Flips en Vivo • Calor de Playa',
          icon: '⚡',
        },
        {
          city: 'Miami',
          neighborhood: 'South Beach y Wynwood',
          status: '🍸 Fiebre Nocturna • Acceso Velvet Rope • Listas VIP en Movimiento',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'La sala ya está hablando. Entra.',
      subheadline: 'Únete a los invitados en tu ciudad en el mapa de proximidad en vivo esta noche.',
      primaryBtn: 'Desbloquear Radar de Proximidad en Vivo →',
      secondaryLink: 'Obtener la App Móvil (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • Discreción Garantizada.',
    },
    modals: {
      radarTitle: 'Radar de Proximidad en Vivo',
      radarSubtitle: 'Telemetría de sala encriptada en tiempo real',
      badgeTitle: 'Badge QR Encriptado Privado',
      badgeSubtitle: 'Sin números de teléfono compartidos. Modo Fantasma en cualquier momento.',
      appTitle: 'ScanQR Global Móvil',
      appSubtitle: 'Proximidad Nocturna en Vivo • iOS y Android PWA',
      ghostModeActive: 'Modo Fantasma Activo — Completamente Invisible',
      ghostModeInactive: 'Radar Visible — Aceptando Knocks Privados',
      knockSent: 'Knock Enviado — Línea directa abierta con intriga mutua',
      copied: 'Enlace de badge privado copiado al portapapeles',
      close: 'Cerrar',
    },
  },

  // 3. THAI
  th: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● เรดาร์สดใน 4 เมืองหลัก',
      navButton: 'เข้าสู่เรดาร์ →',
    },
    hero: {
      tag: 'สิทธิ์พิเศษเฉพาะ • เรดาร์ไนท์ไลฟ์ตามระยะใกล้เคียงแบบเรียลไทม์',
      headlineLine1: 'เลิกเดาว่าคืนนี้ใครออกไปเที่ยวข้างนอก',
      headlineLine2: 'มองเห็นบรรยากาศในร้าน แล้วเริ่มก้าวของคุณ',
      subheadline:
        'แผนที่เรดาร์สดของคนจริง เลานจ์สุดฮิต และการส่งสัญญาณ Knock ส่วนตัวรอบตัวคุณตอนนี้ ไม่ต้องเปิดเผยเบอร์โทรศัพท์ ไร้ร่องรอยดิจิทัล มีเพียงเคมีที่ตรงกันทันที',
      ctaPrimary: 'ดูว่าใครกำลังเที่ยวคืนนี้ →',
      ctaSecondary: 'สแกน QR Badge ส่วนตัว',
    },
    ticker: {
      guests: '🔥 312 แขกใกล้คุณกำลังใช้งาน',
      knocks: '🍸 84 Knocks แลกเปลี่ยนกันคืนนี้',
      lounges: '⚡ 19 VIP เลานจ์กำลังมาแรง',
    },
    features: {
      eyebrow: 'กฎแห่งการเชื่อมต่อ',
      title: 'ทุกสิ่งเกิดขึ้นในช่วงเวลานี้',
      cards: [
        {
          rule: 'กฎข้อที่ 01',
          tag: 'PRIVATE KNOCK',
          title: 'สบตากับใครบางคนจากอีกฟากของร้าน',
          body:
            'เจอใครน่าสนใจอยู่ใกล้ๆ ไหม? ส่ง Knock ส่วนตัวไป ความสนใจที่ตรงกันจะเปิดแชทลับทันที โดยไม่ต้องแลกคอนแทกต์ ไม่มีการปฏิเสธที่น่าอึดอัด',
          action: 'จำลองการ Knock',
        },
        {
          rule: 'กฎข้อที่ 02',
          tag: 'LIVE FLIPS',
          title: 'สัมผัสบรรยากาศจริงก่อนก้าวขาเข้าไป',
          body:
            'คลิปดิบความยาว 10 วินาทีจากข้างในคลับคืนนี้ ดูว่าใครอยู่ที่บาร์ บรรยากาศเป็นอย่างไร และพลังงานเคลื่อนไปทางไหนก่อนเรียกรถ',
          action: 'ดูคลิปสด 10 วินาที',
        },
        {
          rule: 'กฎข้อที่ 03',
          tag: 'GHOST MODE',
          title: 'ควบคุมความเป็นส่วนตัว ไม่หลุดเบอร์โทรศัพท์',
          body:
            'เชื่อมต่อด้วย QR Badge ที่เข้ารหัสเฉพาะตัว แตะครั้งเดียวเพื่อเข้าสู่ Ghost Mode และหายไปจากเรดาร์ได้ทุกเมื่อ ตัวตนจริงของคุณจะถูกปกป้องเสมอ',
          action: 'สลับ Ghost Mode',
        },
        {
          rule: 'กฎข้อที่ 04',
          tag: 'ZERO BARRIERS',
          title: 'เคมีตรงกันไม่จำเป็นต้องมีล่าม',
          body:
            'ระบบแปลภาษาเสียง วิดีโอ และข้อความสด 2 ทางในฟีด พูดคุยอย่างเป็นธรรมชาติได้กับทุกคนในห้อง ไม่ว่าจะเป็นรูฟท็อปในทองหล่อหรือสปีกอีซี่ในโบโกตา',
          action: 'แปลภาษาสด',
        },
      ],
    },
    hubs: {
      eyebrow: 'เครือข่ายเรดาร์ที่เปิดใช้งาน',
      title: 'ที่ที่ค่ำคืนกำลังเคลื่อนไหว',
      cards: [
        {
          city: 'โบโกตา',
          neighborhood: 'โซนา ที & ชาปิเนโร',
          status: '🔴 42 Knocks คืนนี้ • พลังงานสูง • Afro-House & Speakeasy',
          icon: '🔴',
        },
        {
          city: 'กรุงเทพฯ',
          neighborhood: 'ทองหล่อ & สุขุมวิท',
          status: '🔥 88 เช็คอินแล้ว • VIP รูฟท็อปเปิดใช้งาน • ระบบแปลสดพร้อมใช้งาน',
          icon: '🔥',
        },
        {
          city: 'ริโอเดจาเนโร',
          neighborhood: 'อิปาเนมา & ลาปา',
          status: '⚡ แซมบ้าเลานจ์แน่นขนัด • 24 คลิปสดถูกโพสต์ • บรรยากาศชายหาด',
          icon: '⚡',
        },
        {
          city: 'ไมอามี',
          neighborhood: 'เซาท์บีช & วินวู้ด',
          status: '🍸 ความคึกคักรอบดึก • ทางเข้า Velvet Rope • เกสต์ลิสต์ขยับตัว',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'ในห้องกำลังเริ่มบทสนทนา ก้าวเข้ามาเลย',
      subheadline: 'เข้าร่วมกับแขกในเมืองของคุณบนแผนที่เรดาร์ระยะใกล้เคียงคืนนี้',
      primaryBtn: 'ปลดล็อกเรดาร์ระยะใกล้เคียงสด →',
      secondaryLink: 'ดาวน์โหลดแอปมือถือ (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • รับประกันความเป็นส่วนตัวระดับสูงสุด',
    },
    modals: {
      radarTitle: 'เรดาร์ระยะใกล้เคียงสด',
      radarSubtitle: 'การส่งข้อมูลเรดาร์ห้องแบบเข้ารหัสสด',
      badgeTitle: 'QR Badge ส่วนตัวที่เข้ารหัส',
      badgeSubtitle: 'ไม่แชร์เบอร์โทรศัพท์ เปิด Ghost Mode ได้ทุกเวลา',
      appTitle: 'ScanQR Global บนมือถือ',
      appSubtitle: 'เรดาร์ไนท์ไลฟ์สด • สำหรับ iOS และ Android',
      ghostModeActive: 'เปิดใช้งาน Ghost Mode — ล่องหนสมบูรณ์แบบ',
      ghostModeInactive: 'แสดงบนเรดาร์ — พร้อมรับ Knock ส่วนตัว',
      knockSent: 'ส่ง Knock สำเร็จ — สัญญาณเปิดทันทีเมื่อทั้งสองฝ่ายสนใจตรงกัน',
      copied: 'คัดลอกลิงก์ Badge ส่วนตัวแล้ว',
      close: 'ปิด',
    },
  },

  // 4. PORTUGUÊS
  pt: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● Radar ao Vivo em 4 Cidades',
      navButton: 'Entrar no Radar →',
    },
    hero: {
      tag: 'ACESSO EXCLUSIVO • PROXIMIDADE NOTURNA EM TEMPO REAL',
      headlineLine1: 'Pare de adivinhar quem vai sair hoje.',
      headlineLine2: 'Veja o ambiente. Faça sua jogada.',
      subheadline:
        'Um mapa elétrico de pessoas reais, lounges em alta e knocks privados no radar acontecendo ao seu redor agora. Sem números compartilhados. Sem rastros. Apenas química instantânea.',
      ctaPrimary: 'Veja Quem Saiu Hoje →',
      ctaSecondary: 'Escanear QR Badge Privado',
    },
    ticker: {
      guests: '🔥 312 Convidados Ativos Por Perto',
      knocks: '🍸 84 Knocks Trocados Hoje',
      lounges: '⚡ 19 Lounges VIP em Alta Agora',
    },
    features: {
      eyebrow: 'AS REGRAS DO JOGO',
      title: 'Tudo Acontece no Momento',
      cards: [
        {
          rule: 'REGRA 01',
          tag: 'KNOCK PRIVADO',
          title: 'Troque olhares do outro lado do salão',
          body:
            'Avistou alguém interessante por perto? Envie um Knock privado. O interesse mútuo abre uma linha direta imediata—sem foras constrangedores, sem trocar arrobas, sem amarras.',
          action: 'Simular Knock',
        },
        {
          rule: 'REGRA 02',
          tag: 'VÍDEOS AO VIVO',
          title: 'Sinta a vibe antes de entrar',
          body:
            'Clipes crus de 10 segundos direto das casas mais disputadas desta noite. Veja quem está no bar, como está o público e para onde a energia está indo antes de chamar seu carro.',
          action: 'Ver Clipe de 10s',
        },
        {
          rule: 'REGRA 03',
          tag: 'MODO FANTASMA',
          title: 'Controle total. Nunca vaze seu número.',
          body:
            'Conecte-se pelo seu QR badge criptografado privado. Ative o Modo Fantasma com um toque para sumir do radar quando quiser. Seus contatos e identidade real continuam 100% blindados.',
          action: 'Alternar Modo Fantasma',
        },
        {
          rule: 'REGRA 04',
          tag: 'SEM BARREIRAS',
          title: 'Química não precisa de tradução',
          body:
            'Tradução bidirecional em tempo real de voz, vídeo e texto ao vivo no feed. Converse com tranquilidade com qualquer pessoa, seja em um rooftop em Bangkok ou em um speakeasy em Bogotá.',
          action: 'Tradução ao Vivo',
        },
      ],
    },
    hubs: {
      eyebrow: 'REDES DE RADAR ATIVAS',
      title: 'Onde a Noite Está Acontecendo',
      cards: [
        {
          city: 'Bogotá',
          neighborhood: 'Zona T & Chapinero',
          status: '🔴 42 Knocks Esta Noite • Alta Energia • Afro-House & Speakeasy Lounges',
          icon: '🔴',
        },
        {
          city: 'Bangkok',
          neighborhood: 'Thonglor & Sukhumvit',
          status: '🔥 88 Presentes • Rooftops VIP Ativos • Tradução ao Vivo',
          icon: '🔥',
        },
        {
          city: 'Rio de Janeiro',
          neighborhood: 'Ipanema & Lapa',
          status: '⚡ Rodas de Samba Lotadas • 24 Flips ao Vivo • Calor de Praia',
          icon: '⚡',
        },
        {
          city: 'Miami',
          neighborhood: 'South Beach & Wynwood',
          status: '🍸 Corrida Noturna • Acesso Velvet Rope • Listas VIP Girando',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'A casa já está comentando. Dê o primeiro passo.',
      subheadline: 'Junte-se aos convidados da sua cidade no mapa de proximidade ao vivo hoje.',
      primaryBtn: 'Desbloquear Radar de Proximidade ao Vivo →',
      secondaryLink: 'Baixar o App Móvel (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • Discrição Garantida.',
    },
    modals: {
      radarTitle: 'Radar de Proximidade ao Vivo',
      radarSubtitle: 'Telemetria do ambiente criptografada em tempo real',
      badgeTitle: 'QR Badge Privado Criptografado',
      badgeSubtitle: 'Sem números compartilhados. Ative o Modo Fantasma a qualquer instante.',
      appTitle: 'ScanQR Global Mobile',
      appSubtitle: 'Radar de Vida Noturna ao Vivo • iOS e Android',
      ghostModeActive: 'Modo Fantasma Ativo — Totalmente Invisível',
      ghostModeInactive: 'Visível no Radar — Aceitando Knocks Privados',
      knockSent: 'Knock Enviado — Linha aberta com interesse mútuo',
      copied: 'Link do badge copiado com sucesso',
      close: 'Fechar',
    },
  },

  // 5. FRANÇAIS
  fr: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● Radar en Direct dans 4 Villes',
      navButton: 'Entrer sur le Radar →',
    },
    hero: {
      tag: 'ACCÈS EXCLUSIF • PROXIMITÉ NOCTURNE EN TEMPS RÉEL',
      headlineLine1: 'Ne devinez plus qui sort ce soir.',
      headlineLine2: 'Observez la salle. Faites votre mouvement.',
      subheadline:
        'Une carte électrique de vraies personnes, de salons branchés et de knocks privés sur radar autour de vous maintenant. Aucun numéro partagé. Zéro trace. Juste une alchimie immédiate.',
      ctaPrimary: 'Voir Qui Sort Ce Soir →',
      ctaSecondary: 'Scanner le Badge QR Privé',
    },
    ticker: {
      guests: '🔥 312 Invités Actifs à Proximité',
      knocks: '🍸 84 Knocks Échangés Ce Soir',
      lounges: '⚡ 19 Salons VIP Très Tendance',
    },
    features: {
      eyebrow: 'LES RÈGLES DU JEU',
      title: 'Tout se Passe dans l’Instant',
      cards: [
        {
          rule: 'RÈGLE 01',
          tag: 'KNOCK PRIVÉ',
          title: 'Croisez un regard à l’autre bout de la pièce',
          body:
            'Une présence intrigante à proximité ? Envoyez un Knock privé. L’intérêt réciproque ouvre instantanément un salon direct—sans rejet embarrassant, sans identifiants partagés, sans engagement.',
          action: 'Simuler un Knock',
        },
        {
          rule: 'RÈGLE 02',
          tag: 'VIDÉOS EN DIRECT',
          title: 'Ressentez l’ambiance avant d’entrer',
          body:
            'Des vidéos brutes de 10 secondes depuis les clubs les plus sélects de la soirée. Voyez qui est au bar, l’énergie ambiante et la foule avant même d’appeler votre chauffeur.',
          action: 'Voir le Clip 10s',
        },
        {
          rule: 'RÈGLE 03',
          tag: 'MODE FANTÔME',
          title: 'Contrôle total. Ne donnez jamais votre numéro.',
          body:
            'Connectez-vous via votre badge QR chiffré privé. Basculez en Mode Fantôme d’un seul clic pour disparaître du radar à tout moment. Votre identité et vos contacts réels restent totalement protégés.',
          action: 'Activer Mode Fantôme',
        },
        {
          rule: 'RÈGLE 04',
          tag: 'ZÉRO BARRIÈRE',
          title: 'La séduction se passe de traduction',
          body:
            'Traduction bidirectionnelle voix, vidéo et texte en direct dans le flux. Discutez avec aisance avec n’importe qui, que vous soyez sur un rooftop à Bangkok ou dans un speakeasy à Bogotá.',
          action: 'Traduction en Direct',
        },
      ],
    },
    hubs: {
      eyebrow: 'RÉSEAUX DE RADAR ACTIFS',
      title: 'Où la Nuit s’Anime',
      cards: [
        {
          city: 'Bogotá',
          neighborhood: 'Zona T & Chapinero',
          status: '🔴 42 Knocks Ce Soir • Énergie Intense • Afro-House & Speakeasies',
          icon: '🔴',
        },
        {
          city: 'Bangkok',
          neighborhood: 'Thonglor & Sukhumvit',
          status: '🔥 88 Enregistrés • Rooftops VIP Actifs • Traduction en Direct',
          icon: '🔥',
        },
        {
          city: 'Rio de Janeiro',
          neighborhood: 'Ipanema & Lapa',
          status: '⚡ Bars de Samba Combles • 24 Vidéos Partagées • Ambiance Plage',
          icon: '⚡',
        },
        {
          city: 'Miami',
          neighborhood: 'South Beach & Wynwood',
          status: '🍸 Effervescence Nocturne • Accès Cordon de Sécurité • Listes VIP',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'La salle murmure déjà. Entrez.',
      subheadline: 'Rejoignez les invités de votre ville sur la carte de proximité en direct ce soir.',
      primaryBtn: 'Déverrouiller le Radar de Proximité en Direct →',
      secondaryLink: 'Obtenir l’App Mobile (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • Discrétion Garantie.',
    },
    modals: {
      radarTitle: 'Radar de Proximité en Direct',
      radarSubtitle: 'Télémétrie de salle chiffrée en temps réel',
      badgeTitle: 'Badge QR Chiffré Privé',
      badgeSubtitle: 'Aucun numéro partagé. Mode Fantôme disponible à tout instant.',
      appTitle: 'ScanQR Global Mobile',
      appSubtitle: 'Radar Nocturne en Direct • Application iOS & Android',
      ghostModeActive: 'Mode Fantôme Actif — Totalement Invisible',
      ghostModeInactive: 'Visible sur le Radar — Prêt pour les Knocks Privés',
      knockSent: 'Knock Envoyé — Connexion directe ouverte dès accord réciproque',
      copied: 'Lien du badge privé copié',
      close: 'Fermer',
    },
  },

  // 6. DEUTSCH
  de: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● Radar Live in 4 Städten',
      navButton: 'Radar Starten →',
    },
    hero: {
      tag: 'EXKLUSIVER ZUGANG • ECHTZEIT-NACHTLEBEN-PROXIMITÄT',
      headlineLine1: 'Rätsle nicht mehr, wer heute ausgeht.',
      headlineLine2: 'Sieh den Raum. Mach deinen Zug.',
      subheadline:
        'Eine elektrisierende Karte mit echten Menschen, angesagten Lounges und privaten Radar-Knocks direkt um dich herum. Keine Telefonnummern geteilt. Keine Papierspuren. Reine spontane Chemie.',
      ctaPrimary: 'Sieh, Wer Heute Ausgeht →',
      ctaSecondary: 'Privaten QR-Badge Scannen',
    },
    ticker: {
      guests: '🔥 312 Aktive Gäste in der Nähe',
      knocks: '🍸 84 Knocks Heute Ausgetauscht',
      lounges: '⚡ 19 VIP-Lounges im Trend',
    },
    features: {
      eyebrow: 'DIE SPIELREGELN',
      title: 'Alles Passiert im Augenblick',
      cards: [
        {
          rule: 'REGEL 01',
          tag: 'PRIVATER KNOCK',
          title: 'Blicke quer durch den Raum auffangen',
          body:
            'Jemanden Faszinierenden entdeckt? Sende einen privaten Knock. Gegenseitiges Interesse öffnet sofort eine direkte Verbindung—ohne peinliche Abfuhren, ohne Social-Media-Handles, ohne Verpflichtungen.',
          action: 'Knock Simulieren',
        },
        {
          rule: 'REGEL 02',
          tag: 'LIVE-CLIPS',
          title: 'Spüre den Vibe, bevor du reingehst',
          body:
            '10-Sekunden-Rohclips direkt aus den heißesten Clubs von heute Nacht. Sieh, wer an der Bar steht, wie die Crowd aussieht und wohin die Energie wandert, bevor du dein Taxi rufst.',
          action: '10s-Clip Ansehen',
        },
        {
          rule: 'REGEL 03',
          tag: 'GHOST-MODUS',
          title: 'Volle Kontrolle. Gib niemals deine Nummer preis.',
          body:
            'Verbinde dich über deinen privaten verschlüsselten QR-Badge. Aktiviere mit einem Fingertipp den Ghost-Modus, um unsichtbar zu werden. Deine echten Kontakte und Identität bleiben absolut geschützt.',
          action: 'Ghost-Modus Umschalten',
        },
        {
          rule: 'REGEL 04',
          tag: 'KEINE BARRIEREN',
          title: 'Chemie braucht keine Übersetzung',
          body:
            'Echtzeit-Sprach-, Video- und Textübersetzung direkt im Feed. Unterhalte dich mühelos mit jedem im Raum, egal ob in einer Rooftop-Bar in Bangkok oder einem Speakeasy in Bogotá.',
          action: 'Live-Übersetzung',
        },
      ],
    },
    hubs: {
      eyebrow: 'AKTIVE RADAR-NETZWERKE',
      title: 'Wohin die Nacht Sich Bewegt',
      cards: [
        {
          city: 'Bogotá',
          neighborhood: 'Zona T & Chapinero',
          status: '🔴 42 Knocks Heute • Hohe Energie • Afro-House & Speakeasies',
          icon: '🔴',
        },
        {
          city: 'Bangkok',
          neighborhood: 'Thonglor & Sukhumvit',
          status: '🔥 88 Eingecheckt • VIP-Rooftops Aktiv • Live-Übersetzung Bereit',
          icon: '🔥',
        },
        {
          city: 'Rio de Janeiro',
          neighborhood: 'Ipanema & Lapa',
          status: '⚡ Samba-Lounges Voll • 24 Live-Flips Geteilt • Strandwärme',
          icon: '⚡',
        },
        {
          city: 'Miami',
          neighborhood: 'South Beach & Wynwood',
          status: '🍸 Nacht-Rush • Velvet-Rope-Zugang • VIP-Gästelisten in Bewegung',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'Der Raum spricht bereits. Tritt ein.',
      subheadline: 'Triff heute Abend Gäste in deiner Stadt auf der Live-Proximitätskarte.',
      primaryBtn: 'Live-Proximitäts-Radar Freischalten →',
      secondaryLink: 'Mobile App Holen (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • Diskretion Garantiert.',
    },
    modals: {
      radarTitle: 'Live-Proximitäts-Radar',
      radarSubtitle: 'Verschlüsselte Raum-Telemetrie in Echtzeit',
      badgeTitle: 'Privater Verschlüsselter QR-Badge',
      badgeSubtitle: 'Keine Telefonnummern geteilt. Ghost-Modus jederzeit verfügbar.',
      appTitle: 'ScanQR Global Mobile',
      appSubtitle: 'Live-Nachtleben-Radar • Für iOS & Android',
      ghostModeActive: 'Ghost-Modus Aktiv — Völlig Unsichtbar',
      ghostModeInactive: 'Auf Radar Sichtbar — Bereit für Private Knocks',
      knockSent: 'Knock Gesendet — Direkte Leitung öffnet sich bei beidseitigem Interesse',
      copied: 'Privater Badge-Link kopiert',
      close: 'Schließen',
    },
  },

  // 7. 日本語
  ja: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● 4都市でレーダー稼働中',
      navButton: 'レーダーを開く →',
    },
    hero: {
      tag: '限定アクセス • リアルタイム・ナイトライフ近接レーダー',
      headlineLine1: '今夜誰が出かけているか、推測するのは終わり。',
      headlineLine2: 'フロアの気配を感じ、行動を起こそう。',
      subheadline:
        '本物の人々、人気ラウンジ、そして周囲で交わされるプライベートKnockを捉えるエレクトリックマップ。電話番号の共有なし。痕跡ゼロ。純粋な瞬間のケミストリー。',
      ctaPrimary: '今夜出ている人を見る →',
      ctaSecondary: 'プライベートQRバッジをスキャン',
    },
    ticker: {
      guests: '🔥 312名のゲストが近くで接続中',
      knocks: '🍸 今夜84件のKnockを交換',
      lounges: '⚡ 19箇所のVIPラウンジが盛り上がり中',
    },
    features: {
      eyebrow: 'エンゲージメントの掟',
      title: 'すべてはその瞬間に起こる',
      cards: [
        {
          rule: '掟 01',
          tag: 'プライベートKNOCK',
          title: 'フロアの向こうの視線を捉える',
          body:
            '近くに気になる人が？ プライベートKnockを送信。お互いの関心があれば瞬時にダイレクトラインが開設—気まずい拒絶もSNS交換も不要、完全ノートレース。',
          action: 'Knockを試す',
        },
        {
          rule: '掟 02',
          tag: 'ライブ動画',
          title: '入店前にその場のバイブスを体感',
          body:
            '今夜最も熱いフロアから届く10秒の無加工動画。タクシーを呼ぶ前に、バーカウンターの様子や客層、熱気の行方をリアルに把握。',
          action: '10秒動画を見る',
        },
        {
          rule: '掟 03',
          tag: 'ゴーストモード',
          title: '完全なコントロール。番号は一切漏洩しない。',
          body:
            '暗号化されたプライベートQRバッジで接続。ワンタップでゴーストモードに移行し、レーダーからいつでも姿を消去。本名や連絡先は完全に保護されます。',
          action: 'ゴーストモード切替',
        },
        {
          rule: '掟 04',
          tag: '言語の壁ゼロ',
          title: 'ケミストリーに通訳は不要',
          body:
            'フィード内で双方向リアルタイム音声・ビデオ・テキスト翻訳が稼働。バンコクのルーフトップでもボゴタのスピークイージーでも、目の前の相手と言葉の壁なく会話。',
          action: 'リアルタイム翻訳',
        },
      ],
    },
    hubs: {
      eyebrow: '稼働中のレーダーネットワーク',
      title: '夜が動き出す場所',
      cards: [
        {
          city: 'ボゴタ',
          neighborhood: 'ソナT & チャピネロ',
          status: '🔴 今夜42件のKnock • 高エネルギー • Afro-House & Speakeasy',
          icon: '🔴',
        },
        {
          city: 'バンコク',
          neighborhood: 'トンロー & スクンビット',
          status: '🔥 88名チェックイン • VIPルーフトップ稼働中 • リアルタイム翻訳稼働',
          icon: '🔥',
        },
        {
          city: 'リオデジャネイロ',
          neighborhood: 'イパネマ & ラパ',
          status: '⚡ サンバラウンジ満席 • 24件のライブ動画投稿 • ビーチの熱気',
          icon: '⚡',
        },
        {
          city: 'マイアミ',
          neighborhood: 'サウスビーチ & ウィンウッド',
          status: '🍸 深夜のラッシュ • ベルベットロープ入場 • ゲストリスト稼働中',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: 'フロアはすでに盛り上がっています。中へどうぞ。',
      subheadline: '今夜、あなたの街のゲストと近接マップで合流しましょう。',
      primaryBtn: '近接レーダーのロックを解除 →',
      secondaryLink: 'モバイルアプリを入手 (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • 完全なプライバシーを保証',
    },
    modals: {
      radarTitle: 'ライブ近接レーダー',
      radarSubtitle: 'リアルタイム暗号化フロアテレメトリ',
      badgeTitle: 'プライベート暗号化QRバッジ',
      badgeSubtitle: '電話番号の共有なし。いつでもゴーストモードへ移行可能。',
      appTitle: 'ScanQR Global モバイル',
      appSubtitle: 'ライブナイトライフレーダー • iOS & Android',
      ghostModeActive: 'ゴーストモード作動中 — 完全ステルス状態',
      ghostModeInactive: 'レーダー表示中 — プライベートKnock受付中',
      knockSent: 'Knockを送信しました — 相互関心でラインが開設されます',
      copied: 'プライベートバッジリンクをコピーしました',
      close: '閉じる',
    },
  },

  // 8. 中文
  zh: {
    nav: {
      brand: 'ScanQR Global',
      badge: '● 4大城市实时雷达已开启',
      navButton: '进入雷达 →',
    },
    hero: {
      tag: '独家权限 • 实时夜生活近邻雷达',
      headlineLine1: '不再猜测今晚谁在外狂欢。',
      headlineLine2: '洞悉全场。果断出击。',
      subheadline:
        '一张由真实人群、潮流酒廊和身边私密雷达Knock组成的实时动态地图。无需透露手机号，不留任何痕迹，只有瞬间点燃的默契。',
      ctaPrimary: '看看今晚谁在现场 →',
      ctaSecondary: '扫描私密QR徽章',
    },
    ticker: {
      guests: '🔥 附近 312 位活跃宾客',
      knocks: '🍸 今晚已传递 84 次 Knock',
      lounges: '⚡ 19 家 VIP 酒廊正在升温',
    },
    features: {
      eyebrow: '互动准则',
      title: '一切发生在此刻',
      cards: [
        {
          rule: '规则 01',
          tag: '私密KNOCK',
          title: '隔着人群锁定目光',
          body:
            '在附近发现了令人心动的人？发送私密 Knock。双方互生好感即刻开启私聊专线—无需尴尬拒绝，无需交换社交账号，全无羁绊。',
          action: '模拟 Knock',
        },
        {
          rule: '规则 02',
          tag: '现场快拍',
          title: '进门前感受现场气氛',
          body:
            '来自今晚最热门夜场的10秒未经剪辑快拍。在打车出门之前，先看看吧台前有谁、人群画像如何，以及热度正在往哪里涌动。',
          action: '观看10秒现场',
        },
        {
          rule: '规则 03',
          tag: '幽灵模式',
          title: '全面掌控。绝不泄露个人号码。',
          body:
            '使用你的专属加密QR徽章连接。轻点一下进入幽灵模式，随时从雷达中隐身。你的真实联系方式和个人身份始终受到绝对保护。',
          action: '切换幽灵模式',
        },
        {
          rule: '规则 04',
          tag: '零阻隔沟通',
          title: '心动无需翻译',
          body:
            '流内运行的双向实时语音、视频与文字翻译。无论是在曼谷的高空天台还是波哥大的地下清吧，都能与全场宾客无缝畅聊。',
          action: '实时翻译演示',
        },
      ],
    },
    hubs: {
      eyebrow: '已激活雷达网络',
      title: '今夜狂欢流向何方',
      cards: [
        {
          city: '波哥大',
          neighborhood: 'T区 & 查皮内罗',
          status: '🔴 今晚 42 次 Knocks • 高能现场 • 非洲浩室 & 地下清吧',
          icon: '🔴',
        },
        {
          city: '曼谷',
          neighborhood: '通罗 & 素坤逸',
          status: '🔥 88 人已签到 • VIP高空露台活跃 • 实时双向翻译就绪',
          icon: '🔥',
        },
        {
          city: '里约热内卢',
          neighborhood: '伊帕内玛 & 拉帕',
          status: '⚡ 桑巴酒廊爆满 • 24 条现场快拍 • 海滩狂热',
          icon: '⚡',
        },
        {
          city: '迈阿密',
          neighborhood: '南海滩 & 温伍德',
          status: '🍸 深夜热潮 • 丝绒红绳特权通道 • VIP宾客名单流动中',
          icon: '🍸',
        },
      ],
    },
    bottomCta: {
      headline: '全场已在耳语。即刻步入。',
      subheadline: '今晚与你所在城市的宾客在实时近邻地图上相聚。',
      primaryBtn: '解锁实时近邻雷达 →',
      secondaryLink: '获取移动端应用 (4.8★)',
    },
    footer: {
      copyright: '© 2026 ScanQRGlobal.ai • 隐私绝密保障',
    },
    modals: {
      radarTitle: '实时近邻雷达',
      radarSubtitle: '全场实时加密热度感知',
      badgeTitle: '专属加密QR徽章',
      badgeSubtitle: '无需交换电话号码。随时进入幽灵隐身模式。',
      appTitle: 'ScanQR Global 移动端',
      appSubtitle: '实时夜生活近邻雷达 • 适用于 iOS 与 Android',
      ghostModeActive: '幽灵隐身已开启 — 完全不可见',
      ghostModeInactive: '雷达显示中 — 随时接收私密 Knock',
      knockSent: 'Knock已发送 — 双方心动即刻开启专属连线',
      copied: '专属徽章链接已复制到剪贴板',
      close: '关闭',
    },
  },
}

function getInitialLocale(): GatewayLocale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('scanqr_locale') as GatewayLocale | null
    if (saved && GATEWAY_TRANSLATIONS[saved]) return saved

    const nav = (navigator.language || '').toLowerCase()
    if (nav.startsWith('es')) return 'es'
    if (nav.startsWith('th')) return 'th'
    if (nav.startsWith('pt')) return 'pt'
    if (nav.startsWith('fr')) return 'fr'
    if (nav.startsWith('de')) return 'de'
    if (nav.startsWith('ja')) return 'ja'
    if (nav.startsWith('zh')) return 'zh'
  } catch {}

  return 'en'
}

export function useGatewayI18n() {
  const [locale, setLocaleState] = useState<GatewayLocale>(() => getInitialLocale())

  const setLocale = useCallback((newLocale: GatewayLocale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem('scanqr_locale', newLocale)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      if (localStorage.getItem('scanqr_locale')) {
        return
      }
    } catch {}

    let active = true
    async function probeGeo() {
      try {
        const endpoints = ['/api/geo', 'https://scanqrglobal.ai/api/geo']
        for (const ep of endpoints) {
          try {
            const res = await fetch(ep, { signal: AbortSignal.timeout(2200) })
            if (res.ok) {
              const data = await res.json()
              if (!active) return

              try {
                if (localStorage.getItem('scanqr_locale')) return
              } catch {}

              const market = (data?.market || data?.hub?.market || '').toLowerCase()
              const country = (data?.countryCode || data?.hub?.countryCode || '').toUpperCase()

              if (
                market === 'colombia' ||
                country === 'CO' ||
                country === 'ES' ||
                country === 'MX' ||
                country === 'AR'
              ) {
                setLocaleState('es')
                return
              }
              if (market === 'thailand' || country === 'TH') {
                setLocaleState('th')
                return
              }
              if (market === 'brazil' || country === 'BR' || country === 'PT') {
                setLocaleState('pt')
                return
              }
            }
          } catch {}
        }
      } catch {}
    }

    probeGeo()

    return () => {
      active = false
    }
  }, [])

  const t = GATEWAY_TRANSLATIONS[locale] || GATEWAY_TRANSLATIONS.en

  return {
    locale,
    setLocale,
    t,
  }
}
