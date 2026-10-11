import { useState, useEffect, useCallback } from 'react'

export type GatewayLocale = 'en' | 'es' | 'th' | 'pt' | 'fr' | 'de' | 'ja' | 'zh'

export interface LocaleOption {
  code: GatewayLocale
  label: string
  flag: string
}

export const GATEWAY_LOCALES: LocaleOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇨🇴' },
  { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

export interface GatewayTranslations {
  nav: {
    radarActive: string
    exploreMap: string
    poweredBy: string
  }
  hero: {
    trustBadge: string
    headlineStart: string
    headlineGradient: string
    subheadline: string
    ctaMap: string
    ctaPlay: string
  }
  pillars: {
    tag: string
    heading: string
    openFeature: string
    items: {
      badge: string
      title: string
      short: string
      reveal: string
    }[]
  }
  hubs: {
    tag: string
    heading: string
    subheadline: string
    items: {
      city: string
      country: string
      detail: string
      badge: string
    }[]
  }
  footer: {
    openWeb: string
    downloadPlay: string
    copyright: string
  }
}

export const GATEWAY_TRANSLATIONS: Record<GatewayLocale, GatewayTranslations> = {
  // 1. ENGLISH (Default / USA)
  en: {
    nav: {
      radarActive: 'Live Radar Active',
      exploreMap: 'Explore Map Free',
      poweredBy: 'Powered by Cerca Social',
    },
    hero: {
      trustBadge: '🌐 AI-POWERED PROXIMITY RADAR • FREE ON WI-FI WORLDWIDE',
      headlineStart: 'See Who’s Out Tonight. Knock to Connect.',
      headlineGradient: 'Never Leak Your Number.',
      subheadline:
        'Real-time social map of nightlife, trending spots, and verified people nearby. Watch 10-second live flips, break language barriers with the AI Wingman, and exchange personal QR contact cards with zero cellular charges.',
      ctaMap: '🗺️ Launch Live Map (Guest Mode)',
      ctaPlay: '📱 Google Play App (4.8★)',
    },
    pillars: {
      tag: 'INSIDE THE CERCA ECOSYSTEM',
      heading: 'Tap to Preview How It Works',
      openFeature: 'Open Feature in Cerca Web',
      items: [
        {
          badge: 'DISCOVERY',
          title: "Faces & 'Out to Meet'",
          short:
            'Visual proximity grid of travelers, nomads, and verified locals ready to meet right now.',
          reveal:
            "Filter by 'Live Now', 'Spots', or specific scenes (like Miami Afro-House or Bangkok Rooftops). Send an instant \"Say Hi 👋\" or knock to unlock mutual chat without sharing social media handles.",
        },
        {
          badge: 'AI BRIDGE',
          title: 'The AI Wingman & Live Translation',
          short:
            'Two-way real-time voice, video, and text translation with contextual AI icebreakers.',
          reveal:
            'Chat effortlessly across Spanish, Thai, Portuguese, and English. The AI Wingman suggests smooth conversation starters, decodes venue menus, and bridges cultures so language is never a barrier.',
        },
        {
          badge: 'PRIVACY FIRST',
          title: 'Knock, Share QR & Ghost Mode',
          short:
            'Connect via wearable/shareable personal QR codes without exposing your phone number or WhatsApp.',
          reveal:
            "Total privacy control. Use 'Window Open' to accept chat requests, or go full 'Invisible / Ghost Mode' to browse the live map and scout venues without displaying your presence to strangers.",
        },
        {
          badge: 'NIGHTLIFE',
          title: 'Nightlife Hub & VIP Door Access',
          short:
            '10-second raw venue flips, table splits, guestlists, and 2 AM safe ride assistance.',
          reveal:
            'See unedited video drops posted in the last hour before paying cover, split bottle minimums with nearby verified groups, and access bilingual taxi placards when heading home safely.',
        },
      ],
    },
    hubs: {
      tag: 'ACTIVE PROXIMITY NETWORKS',
      heading: 'Live Global Hubs & Nightlife',
      subheadline:
        'Real-time radar feeds, verified checked-in crowds, and AI auto-translation active across major nightlife destinations worldwide.',
      items: [
        {
          city: 'Bogotá',
          country: 'Colombia',
          detail: 'Chapinero Lounges • Out to Meet Active • Wi-Fi VoIP',
          badge: 'LIVE NOW',
        },
        {
          city: 'Bangkok',
          country: 'Thailand',
          detail: 'Thonglor Rooftops • Live Flips • Auto-Translation',
          badge: 'TRENDING',
        },
        {
          city: 'Rio de Janeiro',
          country: 'Brazil',
          detail: 'Lapa Samba Circles • Table Splits • Free Chat',
          badge: 'POPULAR',
        },
        {
          city: 'Miami',
          country: 'United States',
          detail: 'South Beach & Wynwood • Afro-House Sessions • VIP Access',
          badge: 'VIP ACTIVE',
        },
      ],
    },
    footer: {
      openWeb: 'Open Cerca Web App',
      downloadPlay: 'Download on Google Play',
      copyright: '© 2026 ScanQRGlobal.ai • Official Gateway for Cerca Social (qr4luv.com)',
    },
  },

  // 2. ESPAÑOL (Colombia / LatAm / Spain)
  es: {
    nav: {
      radarActive: 'Radar en Vivo Activo',
      exploreMap: 'Explorar Mapa Gratis',
      poweredBy: 'Desarrollado por Cerca Social',
    },
    hero: {
      trustBadge: '🌐 RADAR DE PROXIMIDAD CON IA • GRATIS EN WI-FI EN TODO EL MUNDO',
      headlineStart: 'Mira quién sale esta noche. Llama para conectar.',
      headlineGradient: 'Nunca reveles tu número.',
      subheadline:
        'Mapa social en tiempo real de la vida nocturna, lugares de moda y personas verificadas cerca de ti. Mira videos en vivo de 10 segundos, rompe las barreras del idioma con el Wingman de IA e intercambia códigos QR personales sin cargos celulares.',
      ctaMap: '🗺️ Abrir Mapa en Vivo (Modo Invitado)',
      ctaPlay: '📱 App en Google Play (4.8★)',
    },
    pillars: {
      tag: 'DENTRO DEL ECOSISTEMA CERCA',
      heading: 'Toca para ver cómo funciona',
      openFeature: 'Abrir función en Cerca Web',
      items: [
        {
          badge: 'DESCUBRIMIENTO',
          title: "Rostros y 'Listos para Conocer'",
          short:
            'Cuadrícula visual de proximidad con viajeros, nómadas y locales verificados listos para encontrarse ahora.',
          reveal:
            "Filtra por 'En Vivo', 'Lugares' o escenas específicas (como Afro-House en Miami o Rooftops en Bangkok). Envía un \"Saludar 👋\" o llama para desbloquear chat mutuo sin compartir tus redes sociales.",
        },
        {
          badge: 'PUENTE DE IA',
          title: 'El Wingman de IA y Traducción en Vivo',
          short:
            'Traducción bidireccional en tiempo real de voz, video y texto con iniciadores de conversación inteligentes.',
          reveal:
            'Chatea sin esfuerzo en español, inglés, tailandés y portugués. El Wingman de IA te sugiere temas fluidos, traduce menús de bares y conecta culturas para que el idioma nunca sea una barrera.',
        },
        {
          badge: 'PRIVACIDAD TOTAL',
          title: 'Llamar, Código QR y Modo Fantasma',
          short:
            'Conecta mediante códigos QR personales sin exponer tu número de teléfono ni WhatsApp.',
          reveal:
            "Control absoluto de privacidad. Usa 'Ventana Abierta' para recibir solicitudes o activa el 'Modo Fantasma / Invisible' para explorar el mapa y locales sin mostrar tu presencia a extraños.",
        },
        {
          badge: 'VIDA NOCTURNA',
          title: 'Hub Nocturno y Acceso VIP',
          short:
            'Videos reales de 10 segundos, división de cuentas de mesas, listas VIP y transporte seguro a las 2 AM.',
          reveal:
            'Mira videos sin editar subidos en la última hora antes de pagar la entrada, comparte mesas con grupos verificados y accede a tarjetas bilingües para taxis al volver seguro a casa.',
        },
      ],
    },
    hubs: {
      tag: 'REDES DE PROXIMIDAD ACTIVAS',
      heading: 'Hubs Globales en Vivo y Vida Nocturna',
      subheadline:
        'Radares en tiempo real, personas verificadas presentes y auto-traducción con IA activa en los principales destinos del mundo.',
      items: [
        {
          city: 'Bogotá',
          country: 'Colombia',
          detail: 'Lounges en Chapinero • Conexiones Activas • VoIP Wi-Fi',
          badge: 'EN VIVO',
        },
        {
          city: 'Bangkok',
          country: 'Tailandia',
          detail: 'Rooftops en Thonglor • Videos en Vivo • Auto-Traducción',
          badge: 'TENDENCIA',
        },
        {
          city: 'Río de Janeiro',
          country: 'Brasil',
          detail: 'Ruedas de Samba en Lapa • División de Mesas • Chat Gratis',
          badge: 'POPULAR',
        },
        {
          city: 'Miami',
          country: 'Estados Unidos',
          detail: 'South Beach y Wynwood • Afro-House • Acceso VIP',
          badge: 'VIP ACTIVO',
        },
      ],
    },
    footer: {
      openWeb: 'Abrir Aplicación Web Cerca',
      downloadPlay: 'Descargar en Google Play',
      copyright: '© 2026 ScanQRGlobal.ai • Portal Oficial de Cerca Social (qr4luv.com)',
    },
  },

  // 3. ภาษาไทย (Thailand)
  th: {
    nav: {
      radarActive: 'เรดาร์สดเปิดใช้งาน',
      exploreMap: 'สำรวจแผนที่ฟรี',
      poweredBy: 'ขับเคลื่อนโดย Cerca Social',
    },
    hero: {
      trustBadge: '🌐 เรดาร์ค้นหาคนใกล้เคียงด้วย AI • ฟรีบน Wi-Fi ทั่วโลก',
      headlineStart: 'ดูว่าใครออกไปเที่ยวคืนนี้ เคาะเพื่อเชื่อมต่อ',
      headlineGradient: 'ไม่ต้องเปิดเผยเบอร์โทรศัพท์',
      subheadline:
        'แผนที่โซเชียลแบบเรียลไทม์สำหรับไนท์ไลฟ์ จุดยอดนิยม และผู้คนที่ได้รับการยืนยันใกล้เคียง ชมคลิปสั้นสด 10 วินาที ทลายกำแพงภาษาด้วย AI Wingman และแลกเปลี่ยน QR โค้ดส่วนตัวโดยไม่มีค่าบริการเซลลูลาร์',
      ctaMap: '🗺️ เปิดแผนที่สด (โหมดผู้เยี่ยมชม)',
      ctaPlay: '📱 ดาวน์โหลดบน Google Play (4.8★)',
    },
    pillars: {
      tag: 'ภายในระบบนิเวศ CERCA',
      heading: 'แตะเพื่อดูตัวอย่างการทำงาน',
      openFeature: 'เปิดฟีเจอร์ใน Cerca Web',
      items: [
        {
          badge: 'การค้นพบ',
          title: "ใบหน้า & 'พร้อมพบปะ'",
          short:
            'กริดระยะใกล้แสดงนักเดินทาง ดิจิทัลโนแมด และคนท้องถิ่นที่ยืนยันตัวตนแล้ว พร้อมพบเจอกันทันที',
          reveal:
            "กรองตาม 'กำลังออนไลน์', 'สถานที่' หรือบรรยากาศเฉพาะ (เช่น รูฟท็อปทองหล่อ หรือ Afro-House ไมอามี) ส่ง \"ทักทาย 👋\" ทันทีหรือเคาะเพื่อปลดล็อกแชทคู่โดยไม่ต้องแชร์โซเชียลมีเดีย",
        },
        {
          badge: 'สะพาน AI',
          title: 'AI Wingman & การแปลสด',
          short:
            'การแปลเสียง วิดีโอ และข้อความแบบเรียลไทม์สองทาง พร้อมประโยคเปิดบทสนทนาอันชาญฉลาด',
          reveal:
            'แชทได้อย่างง่ายดายทั้งภาษาไทย อังกฤษ สเปน และโปรตุเกส AI Wingman แนะนำหัวข้อสนทนาที่ลื่นไหล แปลเมนูในร้าน และเชื่อมโยงวัฒนธรรมโดยไม่มีอุปสรรคทางภาษา',
        },
        {
          badge: 'ความเป็นส่วนตัวสูงสุด',
          title: 'เคาะ แลก QR & โหมดซ่อนตัว',
          short:
            'เชื่อมต่อผ่าน QR โค้ดส่วนตัวโดยไม่ต้องเปิดเผยเบอร์โทรศัพท์หรือ WhatsApp',
          reveal:
            "ควบคุมความเป็นส่วนตัวอย่างสมบูรณ์ ใช้ 'เปิดหน้าต่าง' เพื่อรับคำขอแชท หรือใช้ 'โหมดล่องหน / ผี' เพื่อดูแผนที่สดและสำรวจสถานที่โดยไม่เปิดเผยตำแหน่งของคุณ",
        },
        {
          badge: 'ไนท์ไลฟ์',
          title: 'ศูนย์รวมไนท์ไลฟ์ & ทางเข้า VIP',
          short:
            'คลิปบรรยากาศสด 10 วินาที แชร์เปิดโต๊ะ เกสต์ลิสต์ และตัวช่วยเรียกรถปลอดภัยตอนตี 2',
          reveal:
            'ดูคลิปวิดีโอสดที่โพสต์ในชั่วโมงที่ผ่านมา ก่อนตัดสินใจจ่ายค่าเข้า แชร์ขั้นต่ำเปิดขวดกับกลุ่มใกล้เคียง และแสดงป้ายบอกทางสองภาษาให้แท็กซี่เพื่อกลับบ้านอย่างปลอดภัย',
        },
      ],
    },
    hubs: {
      tag: 'เครือข่ายระยะใกล้ที่ใช้งานอยู่',
      heading: 'ศูนย์กลางไนท์ไลฟ์ระดับโลกสด',
      subheadline:
        'ฟีดเรดาร์แบบเรียลไทม์ ผู้คนที่เช็คอินจริง และการแปลภาษาอัตโนมัติด้วย AI ในจุดหมายปลายทางไนท์ไลฟ์ชั้นนำทั่วโลก',
      items: [
        {
          city: 'โบโกตา',
          country: 'โคลอมเบีย',
          detail: 'เลานจ์ Chapinero • กำลังออกเที่ยว • Wi-Fi VoIP',
          badge: 'กำลังสด',
        },
        {
          city: 'กรุงเทพฯ',
          country: 'ไทย',
          detail: 'รูฟท็อปทองหล่อ • คลิปบรรยากาศสด • แปลภาษาอัตโนมัติ',
          badge: 'มาแรง',
        },
        {
          city: 'ริโอเดจาเนโร',
          country: 'บราซิล',
          detail: 'วงดนตรีแซมบ้า Lapa • แชร์โต๊ะ • แชทฟรี',
          badge: 'ยอดนิยม',
        },
        {
          city: 'ไมอามี',
          country: 'สหรัฐอเมริกา',
          detail: 'South Beach & Wynwood • ปาร์ตี้ Afro-House • สิทธิ์ VIP',
          badge: 'VIP ออนไลน์',
        },
      ],
    },
    footer: {
      openWeb: 'เปิด Cerca Web App',
      downloadPlay: 'ดาวน์โหลดบน Google Play',
      copyright: '© 2026 ScanQRGlobal.ai • ประตูทางการสำหรับ Cerca Social (qr4luv.com)',
    },
  },

  // 4. PORTUGUÊS (Brazil / Portugal)
  pt: {
    nav: {
      radarActive: 'Radar ao Vivo Ativo',
      exploreMap: 'Explorar Mapa Grátis',
      poweredBy: 'Desenvolvido por Cerca Social',
    },
    hero: {
      trustBadge: '🌐 RADAR DE PROXIMIDADE COM IA • GRÁTIS NO WI-FI NO MUNDO INTEIRO',
      headlineStart: 'Veja quem está saindo hoje. Toque para conectar.',
      headlineGradient: 'Nunca revele seu número.',
      subheadline:
        'Mapa social em tempo real da vida noturna, picos em alta e pessoas verificadas por perto. Veja flips de 10 segundos ao vivo, quebre barreiras linguísticas com o AI Wingman e troque cartões QR de contato sem gastar dados móveis.',
      ctaMap: '🗺️ Abrir Mapa ao Vivo (Modo Convidado)',
      ctaPlay: '📱 App no Google Play (4.8★)',
    },
    pillars: {
      tag: 'DENTRO DO ECOSSISTEMA CERCA',
      heading: 'Toque para ver como funciona',
      openFeature: 'Abrir no Cerca Web',
      items: [
        {
          badge: 'DESCOBERTA',
          title: "Rostos & 'A fim de Encontrar'",
          short:
            'Grade visual de proximidade com viajantes, nômades e moradores verificados prontos para se encontrar agora.',
          reveal:
            "Filtre por 'Ao Vivo', 'Lugares' ou cenários específicos (como Afro-House em Miami ou Rooftops em Bangkok). Envie um \"Dar um Oi 👋\" ou bata na porta para liberar chat mútuo sem compartilhar redes sociais.",
        },
        {
          badge: 'PONTE DE IA',
          title: 'O AI Wingman & Tradução ao Vivo',
          short:
            'Tradução bidirecional em tempo real de voz, vídeo e texto com quebra-gelos inteligentes de IA.',
          reveal:
            'Converse facilmente em português, inglês, espanhol e tailandês. O AI Wingman sugere assuntos naturais, traduz cardápios e conecta culturas sem que o idioma seja uma barreira.',
        },
        {
          badge: 'PRIVACIDADE EM 1º LUGAR',
          title: 'Bater na Porta, QR Code & Modo Fantasma',
          short:
            'Conecte-se por QR codes pessoais sem expor seu telefone ou WhatsApp.',
          reveal:
            "Controle total da privacidade. Ative a 'Janela Aberta' para receber mensagens ou o 'Modo Fantasma / Invisível' para explorar o mapa sem mostrar sua presença a estranhos.",
        },
        {
          badge: 'VIDA NOTURNA',
          title: 'Hub Noturno & Acesso VIP',
          short:
            'Vídeos reais de 10 segundos, divisão de mesa/camarote, listas VIP e volta segura para casa às 2h.',
          reveal:
            'Veja drops de vídeo sem filtro da última hora antes de pagar a entrada, rache camarotes com grupos verificados e mostre cartões bilíngues para motoristas voltarem seguros.',
        },
      ],
    },
    hubs: {
      tag: 'REDES DE PROXIMIDADE ATIVAS',
      heading: 'Hubs Globais ao Vivo & Baladas',
      subheadline:
        'Radares em tempo real, galera verificada presente e tradução automática com IA nos principais destinos do mundo.',
      items: [
        {
          city: 'Bogotá',
          country: 'Colômbia',
          detail: 'Lounges em Chapinero • Ativos para Encontro • Wi-Fi VoIP',
          badge: 'AO VIVO',
        },
        {
          city: 'Bangkok',
          country: 'Tailândia',
          detail: 'Rooftops em Thonglor • Flips ao Vivo • Tradução Automática',
          badge: 'EM ALTA',
        },
        {
          city: 'Rio de Janeiro',
          country: 'Brasil',
          detail: 'Rodas de Samba na Lapa • Divisão de Mesas • Chat Grátis',
          badge: 'POPULAR',
        },
        {
          city: 'Miami',
          country: 'Estados Unidos',
          detail: 'South Beach e Wynwood • Afro-House • Acesso VIP',
          badge: 'VIP ATIVO',
        },
      ],
    },
    footer: {
      openWeb: 'Abrir App Web Cerca',
      downloadPlay: 'Baixar no Google Play',
      copyright: '© 2026 ScanQRGlobal.ai • Portal Oficial do Cerca Social (qr4luv.com)',
    },
  },

  // 5. FRANÇAIS (France / Worldwide)
  fr: {
    nav: {
      radarActive: 'Radar en Direct Actif',
      exploreMap: 'Explorer la Carte Gratuitement',
      poweredBy: 'Propulsé par Cerca Social',
    },
    hero: {
      trustBadge: '🌐 RADAR DE PROXIMITÉ IA • GRATUIT SUR WI-FI DANS LE MONDE ENTIER',
      headlineStart: 'Voyez qui sort ce soir. Frappez pour vous connecter.',
      headlineGradient: 'Ne donnez jamais votre numéro.',
      subheadline:
        'Carte sociale en temps réel de la vie nocturne, des lieux branchés et des personnes vérifiées à proximité. Regardez des aperçus vidéo de 10 secondes, franchissez la barrière de la langue avec l’AI Wingman et échangez des QR codes personnels sans frais de données.',
      ctaMap: '🗺️ Lancer la Carte en Direct (Mode Invité)',
      ctaPlay: '📱 Application Google Play (4.8★)',
    },
    pillars: {
      tag: 'AU CŒUR DE L’ÉCOSYSTÈME CERCA',
      heading: 'Touchez pour découvrir le fonctionnement',
      openFeature: 'Ouvrir la fonction sur Cerca Web',
      items: [
        {
          badge: 'DÉCOUVERTE',
          title: "Visages & 'Prêts à se Rencontrer'",
          short:
            'Grille visuelle de proximité de voyageurs, nomades et habitants vérifiés prêts à se rencontrer dès maintenant.',
          reveal:
            "Filtrez par 'En Direct', 'Lieux' ou ambiances spécifiques (comme Afro-House à Miami ou Rooftops à Bangkok). Envoyez un \"Dire Bonjour 👋\" ou frappez pour débloquer le chat sans partager vos réseaux sociaux.",
        },
        {
          badge: 'PASSERELLE IA',
          title: 'AI Wingman & Traduction en Direct',
          short:
            'Traduction bidirectionnelle voix, vidéo et texte en temps réel avec amorces de conversation contextuelles.',
          reveal:
            'Discutez sans effort en espagnol, thaï, portugais, français et anglais. L’AI Wingman suggère des sujets fluides, traduit les menus et élimine toute barrière linguistique.',
        },
        {
          badge: 'CONFIDENTIALITÉ D’ABORD',
          title: 'Frapper, Partager QR & Mode Fantôme',
          short:
            'Connectez-vous via des codes QR personnels sans exposer votre numéro de téléphone ni WhatsApp.',
          reveal:
            "Contrôle total de la vie privée. Utilisez 'Fenêtre Ouverte' pour accepter les discussions, ou passez en 'Mode Fantôme / Invisible' pour explorer les lieux sans signaler votre présence.",
        },
        {
          badge: 'VIE NOCTURNE',
          title: 'Hub Nocturne & Accès Portes VIP',
          short:
            'Aperçus vidéo bruts de 10 secondes, partage d’additions, listes VIP et retour sécurisé à 2h du matin.',
          reveal:
            'Regardez des vidéos non filtrées publiées dans la dernière heure avant de payer l’entrée, partagez des tables avec des groupes vérifiés et profitez de fiches bilingues pour les taxis.',
        },
      ],
    },
    hubs: {
      tag: 'RÉSEAUX DE PROXIMITÉ ACTIFS',
      heading: 'Hubs Mondiaux en Direct & Vie Nocturne',
      subheadline:
        'Flux radar en temps réel, foules vérifiées et traduction automatique par IA dans les plus grandes destinations nocturnes du monde.',
      items: [
        {
          city: 'Bogota',
          country: 'Colombie',
          detail: 'Lounges à Chapinero • Prêts à se Rencontrer • VoIP Wi-Fi',
          badge: 'EN DIRECT',
        },
        {
          city: 'Bangkok',
          country: 'Thaïlande',
          detail: 'Rooftops à Thonglor • Vidéos en Direct • Traduction Auto',
          badge: 'TENDANCE',
        },
        {
          city: 'Rio de Janeiro',
          country: 'Brésil',
          detail: 'Cercles de Samba à Lapa • Partage de Tables • Chat Gratuit',
          badge: 'POPULAIRE',
        },
        {
          city: 'Miami',
          country: 'États-Unis',
          detail: 'South Beach & Wynwood • Soirées Afro-House • Accès VIP',
          badge: 'VIP ACTIF',
        },
      ],
    },
    footer: {
      openWeb: 'Ouvrir l’Application Web Cerca',
      downloadPlay: 'Télécharger sur Google Play',
      copyright: '© 2026 ScanQRGlobal.ai • Portail Officiel de Cerca Social (qr4luv.com)',
    },
  },

  // 6. DEUTSCH (Germany / Austria / Switzerland)
  de: {
    nav: {
      radarActive: 'Live-Radar Aktiv',
      exploreMap: 'Karte Kostenlos Erkunden',
      poweredBy: 'Unterstützt von Cerca Social',
    },
    hero: {
      trustBadge: '🌐 KI-GESTÜTZTES NAHBEREICHS-RADAR • WELTWEIT KOSTENLOS IM WLAN',
      headlineStart: 'Sieh, wer heute Nacht unterwegs ist. Anklopfen zum Verbinden.',
      headlineGradient: 'Gib niemals deine Nummer preis.',
      subheadline:
        'Soziale Echtzeitkarte für Nachtleben, Trend-Locations und verifizierte Personen in deiner Nähe. Sieh dir 10-Sekunden-Live-Flips an, überbrücke Sprachbarrieren mit dem KI-Wingman und tausche persönliche QR-Karten ohne Roaminggebühren aus.',
      ctaMap: '🗺️ Live-Karte Starten (Gastmodus)',
      ctaPlay: '📱 Google Play App (4.8★)',
    },
    pillars: {
      tag: 'DAS CERCA-ÖKOSYSTEM',
      heading: 'Tippen für Funktionsübersicht',
      openFeature: 'Funktion in Cerca Web öffnen',
      items: [
        {
          badge: 'ENTDECKUNG',
          title: "Gesichter & 'Offen für Treffen'",
          short:
            'Visuelles Nahbereichs-Raster von Reisenden, Nomaden und verifizierten Einheimischen, die sich jetzt treffen möchten.',
          reveal:
            "Filtere nach 'Jetzt Live', 'Locations' oder Szenen (wie Miami Afro-House oder Bangkok Rooftops). Sende ein sofortiges \"Hallo 👋\" oder klopfe an für gemeinsamen Chat ohne Social-Media-Handles.",
        },
        {
          badge: 'KI-BRÜCKE',
          title: 'Der KI-Wingman & Live-Übersetzung',
          short:
            'Zwei-Wege-Echtzeitübersetzung für Sprache, Video und Text mit intelligenten Gesprächseinstiegen.',
          reveal:
            'Chatte mühelos auf Spanisch, Thailändisch, Portugiesisch und Englisch. Der KI-Wingman schlägt Eisbrecher vor, übersetzt Speisekarten und verbindet Kulturen ohne Sprachbarrieren.',
        },
        {
          badge: 'DATENSCHUTZ ZUERST',
          title: 'Anklopfen, QR Teilen & Geistermodus',
          short:
            'Verbinde dich über persönliche QR-Codes, ohne Handynummer oder WhatsApp weiterzugeben.',
          reveal:
            "Volle Kontrolle: Öffne das 'Fenster' für Anfragen oder nutze den 'Geister- / Unsichtbarmodus', um Locations zu scouten, ohne anderen deine Anwesenheit zu zeigen.",
        },
        {
          badge: 'NACHTLEBEN',
          title: 'Nightlife-Hub & VIP-Einlass',
          short:
            '10-Sekunden-Videos aus Clubs, Tisch-Splits, Gästelisten und sichere Heimfahrt um 2 Uhr nachts.',
          reveal:
            'Sieh unverfälschte Videos der letzten Stunde vor dem Eintritt, teile Mindestverzehr mit verifizierten Gruppen und zeige zweisprachige Taxikarten für eine sichere Heimfahrt.',
        },
      ],
    },
    hubs: {
      tag: 'AKTIVE NAHBEREICHS-NETZWERKE',
      heading: 'Live Globale Hubs & Nachtleben',
      subheadline:
        'Echtzeit-Radar-Feeds, verifizierte Check-ins und automatische KI-Übersetzung an weltweiten Top-Nightlife-Zielen.',
      items: [
        {
          city: 'Bogotá',
          country: 'Kolumbien',
          detail: 'Chapinero Lounges • Offen für Treffen • WLAN VoIP',
          badge: 'JETZT LIVE',
        },
        {
          city: 'Bangkok',
          country: 'Thailand',
          detail: 'Thonglor Rooftops • Live-Flips • Auto-Übersetzung',
          badge: 'TREND',
        },
        {
          city: 'Rio de Janeiro',
          country: 'Brasilien',
          detail: 'Lapa Samba-Runden • Tisch-Splits • Gratis-Chat',
          badge: 'BELIEBT',
        },
        {
          city: 'Miami',
          country: 'Vereinigte Staaten',
          detail: 'South Beach & Wynwood • Afro-House • VIP-Zugang',
          badge: 'VIP AKTIV',
        },
      ],
    },
    footer: {
      openWeb: 'Cerca Web-App öffnen',
      downloadPlay: 'Auf Google Play herunterladen',
      copyright: '© 2026 ScanQRGlobal.ai • Offizielles Gateway für Cerca Social (qr4luv.com)',
    },
  },

  // 7. 日本語 (Japan)
  ja: {
    nav: {
      radarActive: 'リアルタイムレーダー稼働中',
      exploreMap: 'マップを無料で探索',
      poweredBy: 'Powered by Cerca Social',
    },
    hero: {
      trustBadge: '🌐 AI近接レーダー • 世界中のWi-Fiで完全無料',
      headlineStart: '今夜街に出ている人を見つけよう。ノックして繋がる。',
      headlineGradient: '電話番号を公開する必要はありません。',
      subheadline:
        'ナイトライフ、話題のスポット、近くの認証済みユーザーを表示するリアルタイムソーシャルマップ。10秒のライブフリップをチェックし、AIウィングマンで言語の壁を越え、通信料ゼロで個人QRコードを交換。',
      ctaMap: '🗺️ ライブマップを開く (ゲストモード)',
      ctaPlay: '📱 Google Playアプリ (4.8★)',
    },
    pillars: {
      tag: 'CERCA エコシステム',
      heading: 'タップして使い方をプレビュー',
      openFeature: 'Cerca Webで機能を開く',
      items: [
        {
          badge: '発見',
          title: "顔写真 & '今会える人'",
          short: '今すぐ合流できる旅行者、ノマド、認証済みローカルの近接グリッド。',
          reveal:
            "「今ライブ」「スポット」「特定のシーン」（マイアミのAfro-Houseやバンコクのルーフトップなど）で絞り込み。SNSアカウントを教えることなく、「挨拶 👋」やノックでチャットを開始できます。",
        },
        {
          badge: 'AIブリッジ',
          title: 'AIウィングマン & リアルタイム翻訳',
          short: '双方向のリアルタイム音声・ビデオ・テキスト翻訳とスマートな話題提案。',
          reveal:
            '英語、スペイン語、タイ語、ポルトガル語など自在に会話。AIウィングマンが会話のきっかけを提案し、メニューを翻訳して異文化交流をサポートします。',
        },
        {
          badge: 'プライバシー重視',
          title: 'ノック、QR共有 & ゴーストモード',
          short: '電話番号やWhatsAppを教えずに個人QRコードで瞬時に接続。',
          reveal:
            "完全なプライバシー管理。「ウィンドウオープン」でチャットを受け付けるか、「ゴースト / インビジブルモード」で居場所を隠したままマップを閲覧可能。",
        },
        {
          badge: 'ナイトライフ',
          title: 'ナイトライフHub & VIP入場',
          short: '10秒のリアルな会場動画、テーブル割り勘、ゲストリスト、深夜2時の安全帰宅支援。',
          reveal:
            '入場料を払う前に直近1時間に投稿された動画を確認し、認証済みグループとボトル代をシェア。帰宅時はタクシー用の2言語カードを表示できます。',
        },
      ],
    },
    hubs: {
      tag: 'アクティブ近接ネットワーク',
      heading: 'グローバルHub & ナイトライフ',
      subheadline:
        '世界中の主要ナイトライフ都市でリアルタイムレーダーとAI自動翻訳が稼働中。',
      items: [
        {
          city: 'ボゴタ',
          country: 'コロンビア',
          detail: 'Chapineroラウンジ • 出会い受付中 • Wi-Fi VoIP',
          badge: 'ライブ中',
        },
        {
          city: 'バンコク',
          country: 'タイ',
          detail: 'Thonglorルーフトップ • ライブ動画 • 自動翻訳',
          badge: '急上昇',
        },
        {
          city: 'リオデジャネイロ',
          country: 'ブラジル',
          detail: 'Lapaサンバ • テーブル割り勘 • 無料チャット',
          badge: '人気',
        },
        {
          city: 'マイアミ',
          country: 'アメリカ',
          detail: 'サウスビーチ & Wynwood • Afro-House • VIPアクセス',
          badge: 'VIP稼働中',
        },
      ],
    },
    footer: {
      openWeb: 'Cerca Webアプリを開く',
      downloadPlay: 'Google Playでダウンロード',
      copyright: '© 2026 ScanQRGlobal.ai • Official Gateway for Cerca Social (qr4luv.com)',
    },
  },

  // 8. 中文 (China / Taiwan / Singapore)
  zh: {
    nav: {
      radarActive: '实时雷达已启动',
      exploreMap: '免费探索地图',
      poweredBy: '由 Cerca Social 提供支持',
    },
    hero: {
      trustBadge: '🌐 AI近距离雷达 • 全球Wi-Fi完全免费',
      headlineStart: '查看今晚谁在外面。敲门即连。',
      headlineGradient: '绝不泄露您的电话号码。',
      subheadline:
        '汇集夜生活、热门地点及附近已验证人群的实时社交地图。观看10秒实时视频快照，借助AI僚机跨越语言障碍，在无蜂窝漫游费用的情况下交换个人QR名片。',
      ctaMap: '🗺️ 打开实时地图 (访客模式)',
      ctaPlay: '📱 Google Play 客户端 (4.8★)',
    },
    pillars: {
      tag: 'CERCA 生态系统',
      heading: '点击预览工作原理',
      openFeature: '在 Cerca Web 中打开功能',
      items: [
        {
          badge: '发现',
          title: "面孔与'随时见面'",
          short: '准备立即见面的旅行者、数字游民和已验证当地人的视觉距离网格。',
          reveal:
            "按“当前在线”、“地点”或特定场景（如迈阿密Afro-House或曼谷屋顶酒吧）进行筛选。发送即时“打招呼 👋”或敲门以解锁双方聊天，无需透露社交账号。",
        },
        {
          badge: 'AI 桥梁',
          title: 'AI僚机与实时翻译',
          short: '双向实时语音、视频和文字翻译，附带情境化AI破冰话题。',
          reveal:
            '在西班牙语、泰语、葡萄牙语和英语之间顺畅交流。AI僚机建议流畅开场白，解码酒吧菜单，消除语言隔阂。',
        },
        {
          badge: '隐私优先',
          title: '敲门、分享QR与幽灵隐身模式',
          short: '通过可佩戴/可分享的个人QR码连接，无需暴露您的手机号或微信。',
          reveal:
            "完全隐私控制。使用“开窗”接受聊天请求，或进入完全“隐身/幽灵模式”查看实时地图和探店，而不向陌生人展示您的行踪。",
        },
        {
          badge: '夜生活',
          title: '夜生活中心与VIP入场通道',
          short: '10秒未剪辑现场快照、拼卡座包厢、嘉宾名单与凌晨2点安全返程协助。',
          reveal:
            '在支付门票前查看过去一小时上传的真实视频，与附近的认证群体平摊酒水最低消费，并在安全返程时向司机出示双语乘车卡。',
        },
      ],
    },
    hubs: {
      tag: '活跃近距离网络',
      heading: '全球实时夜生活枢纽',
      subheadline:
        '全球主要夜生活目的地均已激活实时雷达信息流、已签到人群和AI自动翻译。',
      items: [
        {
          city: '波哥大',
          country: '哥伦比亚',
          detail: 'Chapinero 酒廊 • 活跃社交 • Wi-Fi VoIP',
          badge: '正在进行',
        },
        {
          city: '曼谷',
          country: '泰国',
          detail: 'Thonglor 屋顶酒吧 • 现场快照 • 自动翻译',
          badge: '热门趋势',
        },
        {
          city: '里约热内卢',
          country: '巴西',
          detail: 'Lapa 桑巴圈 • 拼桌消费 • 免费聊天',
          badge: '热门',
        },
        {
          city: '迈阿密',
          country: '美国',
          detail: '南海滩与温伍德 • Afro-House • VIP通道',
          badge: 'VIP活跃',
        },
      ],
    },
    footer: {
      openWeb: '打开 Cerca Web 应用',
      downloadPlay: '在 Google Play 下载',
      copyright: '© 2026 ScanQRGlobal.ai • Official Gateway for Cerca Social (qr4luv.com)',
    },
  },
}

// ----------------------------------------------------------------------
// Geolocation & Fallback Detection Engine
// ----------------------------------------------------------------------

export function getInitialLocale(): GatewayLocale {
  if (typeof window === 'undefined') return 'en'

  // 1. Manual user override stored in localStorage always takes highest priority!
  try {
    const saved = localStorage.getItem('scanqr_locale') as GatewayLocale | null
    if (saved && GATEWAY_LOCALES.some((l) => l.code === saved)) {
      return saved
    }
  } catch {}

  // 2. Synchronous Geolocation detection via Device TimeZone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
    if (
      tz.includes('bogota') ||
      tz.includes('colombia') ||
      tz.includes('buenos_aires') ||
      tz.includes('santiago') ||
      tz.includes('lima') ||
      tz.includes('mexico') ||
      tz.includes('caracas') ||
      tz.includes('madrid') ||
      tz.includes('panama') ||
      tz.includes('guatemala') ||
      tz.includes('havana') ||
      tz.includes('santo_domingo')
    ) {
      return 'es'
    }

    if (
      tz.includes('bangkok') ||
      tz.includes('thailand') ||
      tz.includes('indochina')
    ) {
      return 'th'
    }

    if (
      tz.includes('sao_paulo') ||
      tz.includes('brazil') ||
      tz.includes('recife') ||
      tz.includes('belem') ||
      tz.includes('fortaleza') ||
      tz.includes('manaus') ||
      tz.includes('lisbon')
    ) {
      return 'pt'
    }

    if (tz.includes('paris') || tz.includes('brussels') || tz.includes('geneva')) {
      return 'fr'
    }

    if (tz.includes('berlin') || tz.includes('vienna') || tz.includes('zurich')) {
      return 'de'
    }

    if (tz.includes('tokyo')) {
      return 'ja'
    }

    if (
      tz.includes('shanghai') ||
      tz.includes('beijing') ||
      tz.includes('taipei') ||
      tz.includes('hong_kong')
    ) {
      return 'zh'
    }
  } catch {}

  // 3. Browser language detection
  try {
    const nav = (navigator?.language || '').toLowerCase()
    if (nav.startsWith('th')) return 'th'
    if (nav.startsWith('es')) return 'es'
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
    // If user has already made an explicit selection, never override it
    try {
      if (localStorage.getItem('scanqr_locale')) {
        return
      }
    } catch {}

    // Asynchronous edge geolocation probe
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

              // Guard again in case user picked language while request was in-flight
              try {
                if (localStorage.getItem('scanqr_locale')) return
              } catch {}

              const market = (data?.market || data?.hub?.market || '').toLowerCase()
              const country = (data?.countryCode || data?.hub?.countryCode || '').toUpperCase()

              if (market === 'colombia' || country === 'CO' || country === 'ES' || country === 'MX' || country === 'AR') {
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
          } catch {
            // probe next endpoint
          }
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
