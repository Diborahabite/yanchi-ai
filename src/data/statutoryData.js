// Verified Ethiopian Statutory Laws, SRHR Guidelines, and Shelter Directory

export const statutoryLaws = [
  {
    id: 'labour-1156',
    proclamation: 'Ethiopian Labour Proclamation No. 1156/2019',
    amTitle: 'የአሠሪና ሠራተኛ ጉዳይ አዋጅ ቁጥር 1156/2011',
    category: 'Workplace & Factory Workers',
    articles: [
      {
        number: 'Article 14 (1) (f)',
        title: 'Prohibition of Sexual Harassment at Workplace',
        amTitle: 'በሥራ ቦታ ላይ የሚፈጸም ፆታዊ ትንኮሳ ክልከላ',
        summary: 'Explicitly bans committing sexual harassment or sexual violence against an employee at the workplace. Any supervisor or colleague guilty faces administrative and legal liability.',
        actionableTakeaway: 'You can terminate your contract without notice under Article 32 and receive full severance payment plus compensation if subjected to harassment by the employer.'
      },
      {
        number: 'Article 29 & 32',
        title: 'Termination for Cause by Employee (Constructive Dismissal)',
        amTitle: 'በሠራተኛው አማካይነት የሚደረግ የሥራ ውል ማቋረጥ',
        summary: 'If an employer or manager commits sexual harassment or mistreatment, the worker has the statutory right to quit immediately with full entitlements and damages.',
        actionableTakeaway: 'File a complaint with the Enterprise Grievance Committee, Woreda Labour Office, or EWLA immediately.'
      },
      {
        number: 'Articles 87 - 88',
        title: 'Protection of Female Workers & Maternity Leave',
        amTitle: 'የሴት ሠራተኞች ጥበቃ እና የወሊድ ፈቃድ',
        summary: 'Female employees are entitled to 120 consecutive days of paid maternity leave (30 days prenatal and 90 days postnatal). Pregnant workers cannot be assigned night shifts or hazardous duties.',
        actionableTakeaway: 'Industrial park factories cannot dismiss or demote you because of pregnancy or maternity leave.'
      },
      {
        number: 'Articles 66 - 68',
        title: 'Maximum Working Hours & Overtime Rights',
        amTitle: 'የሥራ ሰዓት እና የትርፍ ሰዓት ክፍያ',
        summary: 'Standard working hours must not exceed 8 hours per day or 48 hours per week. Overtime must be compensated at statutory multiplied rates (1.25x to 2.5x).',
        actionableTakeaway: 'Forced uncompensated overtime in garment/textile factories is a direct violation of federal labour law.'
      }
    ]
  },
  {
    id: 'criminal-414',
    proclamation: 'Ethiopian Revised Criminal Code (Proclamation No. 414/2004)',
    amTitle: 'የኢፌዴሪ የተሻሻለው የወንጀል ሕግ አዋጅ ቁጥር 414/1996',
    category: 'GBV, Assault & Criminal Protections',
    articles: [
      {
        number: 'Article 620',
        title: 'Rape & Severe Sexual Assault',
        amTitle: 'አስገድዶ መድፈር',
        summary: 'Criminalizes compelling a person to submit to sexual intercourse by violence, grave threat, or by taking advantage of inability to resist. Penalties range from rigorous imprisonment of 5 to 20 years.',
        actionableTakeaway: 'Rape is a grave public crime. No family or elder settlement ("Shimgilina") can legally cancel criminal liability.'
      },
      {
        number: 'Article 625',
        title: 'Sexual Harassment and Abuse of Authority',
        amTitle: 'በስልጣን በመነገድ የሚፈጸም ፆታዊ ትንኮሳ',
        summary: 'Any person who, by taking advantage of professional, educational, or hierarchical position, solicits sexual acts is punishable by imprisonment.',
        actionableTakeaway: 'Supervisors, foremen, and university professors cannot demand sexual favours for grades, promotions, or retention.'
      },
      {
        number: 'Article 555 & 556',
        title: 'Bodily Injury & Domestic Physical Assault',
        amTitle: 'አካላዊ ጉዳት ማድረስ',
        summary: 'Intentionally causing grave or simple bodily harm to a spouse, partner, or family member is severely punished under the penal code.',
        actionableTakeaway: 'Police stations (Polis Tabiya) are legally required to issue a medical examination dispatch form (ፎርም 8) for treatment.'
      }
    ]
  },
  {
    id: 'family-213',
    proclamation: 'Ethiopian Revised Family Code (Proclamation No. 213/2000)',
    amTitle: 'የተሻሻለው የቤተሰብ ሕግ አዋጅ ቁጥር 213/1992',
    category: 'Marriage, Divorce & Custody Rights',
    articles: [
      {
        number: 'Article 81 - 85',
        title: 'Divorce on Grounds of Incompatibility or Abuse',
        amTitle: 'የጋብቻ መፍረስ እና ፍቺ',
        summary: 'Either spouse has the independent right to petition the court for divorce without requiring the husband’s agreement or parental consent.',
        actionableTakeaway: 'You cannot be forced to remain in an abusive marriage. Courts will grant temporary protection and maintenance.'
      },
      {
        number: 'Article 113',
        title: 'Best Interests of the Child in Custody Determinations',
        amTitle: 'የልጆች አስተዳደግ እና የይገባኛል ጥያቄ',
        summary: 'Child custody is decided exclusively based on the child’s best interests, emotional security, and age (young children typically remain with the mother).',
        actionableTakeaway: 'The father cannot unilaterally take children away or threaten to seize custody because you leave an abusive home.'
      },
      {
        number: 'Article 86',
        title: 'Equal Division of Common Marital Property',
        amTitle: 'የጋራ ንብረት እኩል ክፍፍል',
        summary: 'All property acquired during marriage is legally presumed common property and must be divided equally upon dissolution.',
        actionableTakeaway: 'Even if the husband is the sole wage earner, domestic labour is legally acknowledged as contributing equally.'
      }
    ]
  },
  {
    id: 'criminal-551-abortion',
    proclamation: 'Ethiopian Revised Criminal Code (Article 551) & MoH Guidelines',
    amTitle: 'የኢፌዴሪ የወንጀል ሕግ አንቀጽ 551 እና የጤና ጥበቃ መመሪያ',
    category: 'Reproductive Rights & Safe Care',
    articles: [
      {
        number: 'Article 551',
        title: 'Exceptions to Criminalization of Pregnancy Termination',
        amTitle: 'በሕግ የተፈቀደ አስተማማኝ የፅንስ ማቋረጥ ሁኔታዎች',
        summary: 'Termination of pregnancy is legally permitted in Ethiopia under specific conditions: (1) When pregnancy resulted from rape or incest; (2) When continuation threatens the life or physical/mental health of the woman; (3) In cases of severe fetal deformity; (4) When the woman is a minor (under 18) or physically/mentally unfit.',
        actionableTakeaway: 'Under Ministry of Health clinical guidelines, a woman\'s own statement that pregnancy resulted from rape is legally sufficient; no prior police report or court conviction is required for safe medical care at certified health facilities or Marie Stopes (MSI).'
      }
    ]
  },
  {
    id: 'cyber-958',
    proclamation: 'Ethiopian Computer Crime Proclamation No. 958/2016',
    amTitle: 'የኮምፒውተር ወንጀል አዋጅ ቁጥር 958/2008',
    category: 'Digital Safety & Blackmail Protection',
    articles: [
      {
        number: 'Articles 13 & 14',
        title: 'Online Harassment, Non-Consensual Image Sharing & Cyber-Stalking',
        amTitle: 'በዲጂታል እና በኢንተርኔት የሚፈጸም ፆታዊ ትንኮሳና ስም ማጥፋት',
        summary: 'Prohibits disseminating non-consensual intimate images, intimate videos, or threatening extortion/blackmail via Telegram, Facebook, TikTok, or phone messaging.',
        actionableTakeaway: 'Do not delete the messages. Take timestamped screenshots showing the sender’s phone number or username. File a report with the Federal Police Cyber Crime Division and INSA, or call EWLA (8055) for representation.'
      }
    ]
  }
];

export const srhrMedicalWindows = [
  {
    id: 'pep',
    name: 'HIV Post-Exposure Prophylaxis (PEP)',
    amName: 'የኤች አይ ቪ ድህረ-ተጋላጭነት መከላከያ መድሃኒት (PEP)',
    criticalWindow: 'Within 72 Hours (3 Days)',
    hoursLimit: 72,
    urgency: 'high',
    badge: '72h Window',
    icon: 'ShieldAlert',
    description: 'A 28-day antiretroviral treatment that stops HIV from taking hold in the body after potential exposure (e.g. rape, condom tear, or assault).',
    rules: [
      'Must be started as early as possible — ideally within the first 2 to 24 hours, and strictly within 72 hours.',
      'Available free of charge at government public health centers (ጤና ጣቢያ) and hospital emergency desks.',
      'A baseline rapid HIV test will be conducted confidentially prior to dispensation.'
    ]
  },
  {
    id: 'ecp',
    name: 'Emergency Contraceptive Pills (ECP)',
    amName: 'የአስቸኳይ ጊዜ የእርግዝና መከላከያ ኪኒን (ECP / Postinor)',
    criticalWindow: 'Within 72 to 120 Hours',
    hoursLimit: 120,
    urgency: 'medium',
    badge: '3-5 Days Window',
    icon: 'Pill',
    description: 'Hormonal oral medication that prevents pregnancy if taken promptly after unprotected intercourse or sexual assault.',
    rules: [
      'Levonorgestrel (e.g., Postinor-2): Most effective within 72 hours (up to 95% efficacy within 24h).',
      'Ulipristal acetate: Can be taken up to 120 hours (5 days) post-exposure.',
      'Available over-the-counter at Marie Stopes (MSI) clinics, Red Cross pharmacies, and local pharmacies without a prescription.'
    ]
  },
  {
    id: 'forensic',
    name: 'Clinical Care & Evidence Preservation',
    amName: 'የህክምና ምርመራ እና የፎረንሲክ ማስረጃ ጥበቃ',
    criticalWindow: 'Before Washing / Promptly',
    hoursLimit: 48,
    urgency: 'high',
    badge: 'Urgent Care',
    icon: 'Stethoscope',
    description: 'Critical physical care to treat trauma, obtain tetanus shots, screen for STIs, and collect legal forensic evidence.',
    rules: [
      'Do not bathe, shower, douche, or change clothes before going to the clinic if you intend to pursue legal justice.',
      'If you have already changed, place the worn clothing in a clean paper bag (not plastic) to preserve biological evidence.',
      'Request the attending doctor to fill out the standard Police Medical Report (Form 8 / ፎርም 8).'
    ]
  }
];

export const emergencyHotlines = [
  {
    id: 'gbv-8044',
    name: 'National GBV Helpline',
    amName: 'ብሔራዊ የጾታ ጥቃት መስመር',
    phone: '8044',
    tel: 'tel:8044',
    free: true,
    hours: '24/7 Hours',
    languages: 'Amharic, Afaan Oromoo, Tigrinya, Somali, English',
    description: 'Federal toll-free hotline providing immediate trauma counseling, emergency coordination, and shelter dispatch.'
  },
  {
    id: 'ewla-8055',
    name: 'Ethiopian Women Lawyers Association (EWLA)',
    amName: 'የኢትዮጵያ ሴት ሕግ ባለሙያዎች ማህበር',
    phone: '8055',
    tel: 'tel:8055',
    free: true,
    hours: 'Monday – Friday (Working hours)',
    languages: 'Amharic, Afaan Oromoo, Tigrinya, English',
    description: 'Provides free certified legal aid, courtroom representation, divorce advocacy, and emergency protection orders.'
  },
  {
    id: 'police-991',
    name: 'Federal & Regional Police Emergency',
    amName: 'የፖሊስ አስቸኳይ አደጋ ጥሪ',
    phone: '991',
    tel: 'tel:991',
    free: true,
    hours: '24/7 Hours',
    languages: 'All National Languages',
    description: 'Direct dispatch for active physical threats, forced entries, armed violence, and immediate physical rescue.'
  },
  {
    id: 'medical-907',
    name: 'Ethiopian Red Cross & Emergency Ambulance',
    amName: 'የቀይ መስቀል እና አምቡላንስ ጥሪ',
    phone: '907',
    tel: 'tel:907',
    free: true,
    hours: '24/7 Hours',
    languages: 'All National Languages',
    description: 'Emergency medical transport and rapid response for bleeding, physical trauma, or acute injury.'
  }
];

export const sanctuaryShelters = [
  {
    name: "AWSAD (Association for Women's Sanctuary and Development)",
    amName: 'የአክሳድ የሴቶች መጠለያ እና ልማት ማህበር',
    locations: ['Addis Ababa (አዲስ አበባ)', 'Adama (አዳማ)', 'Hawassa (ሀዋሳ)', 'Dessie (ደሴ)'],
    services: 'Safe emergency housing, psychological trauma therapy, medical referrals, childcare support, and vocational skills.',
    contact: '+251 11 667 4333 / 8044 Helpline Referral',
    confidential: 'Strictly secret shelter addresses for resident safety'
  },
  {
    name: 'Marie Stopes International (MSI Ethiopia)',
    amName: 'ማሪ ስቶፕስ ኢትዮጵያ (MSI)',
    locations: ['Addis Ababa', 'Hawassa', 'Dire Dawa', 'Mekelle', 'Bahir Dar', 'Adama'],
    services: 'Confidential sexual and reproductive healthcare, emergency contraception (ECP), STI testing, and counseling.',
    contact: 'Toll-free hotline 8044 / Local clinic desks'
  },
  {
    name: 'EWLA Regional Legal Desks',
    amName: 'የኢትዮጵያ ሴት ሕግ ባለሙያዎች ማህበር የክልል ቢሮዎች',
    locations: [
      'Addis Ababa Head Office (Kazanchis)',
      'Hawassa Branch (Southern Region)',
      'Adama Branch (Oromia Region)',
      'Bahir Dar Branch (Amhara Region)',
      'Dire Dawa Branch (Eastern Region)'
    ],
    services: 'Pro-bono legal counsel for factory harassment, unlawful wage withholding, domestic battery, and child custody.',
    contact: 'Hotline 8055 / direct branch appointments'
  }
];
