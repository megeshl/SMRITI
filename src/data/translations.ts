import { SupportedLanguage } from '../types';

export interface TranslationDict {
  brandTagline: string;
  getStarted: string;
  tryDemo: string;
  chooseRoleTitle: string;
  roleElderly: string;
  roleElderlyDesc: string;
  roleCaregiver: string;
  roleCaregiverDesc: string;
  selectLanguage: string;
  navHome: string;
  navMemories: string;
  navGames: string;
  navProgress: string;
  navCarePulse: string;
  navCareTag: string;
  navSettings: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingSubtitle: string;
  todaysFocus: string;
  todaysFocusTitle: string;
  todaysFocusDesc: string;
  startActivity: string;
  todaysActivities: string;
  chooseGame: string;
  photoRecallTitle: string;
  photoRecallDesc: string;
  objectMatchTitle: string;
  objectMatchDesc: string;
  storyBuilderTitle: string;
  storyBuilderDesc: string;
  dailyRoutineTitle: string;
  dailyRoutineDesc: string;
  soundMemoryTitle: string;
  soundMemoryDesc: string;
  myMemoriesTitle: string;
  myMemoriesSubtitle: string;
  addMemory: string;
  searchMemories: string;
  allCategories: string;
  listenInstruction: string;
  nextQuestion: string;
  previousQuestion: string;
  finishActivity: string;
  gentleEncouragement: string;
  wellDone: string;
  activityCompleted: string;
  activitySummary: string;
  backToHome: string;
  carePulseTitle: string;
  carePulseSubtitle: string;
  overallEngagement: string;
  activitiesCompleted: string;
  activeDays: string;
  recentActivities: string;
  recommendations: string;
  caregiverNotes: string;
  addNote: string;
  demoDataNotice: string;
  medicalDisclaimer: string;
  offlineStatus: string;
  onlineStatus: string;
}

export const translations: Record<SupportedLanguage, TranslationDict> = {
  en: {
    brandTagline: 'From personal memories to meaningful care.',
    getStarted: 'Get Started',
    tryDemo: 'Explore Demo (Lakshmi Amma)',
    chooseRoleTitle: 'Welcome to SMRITI. How would you like to experience it?',
    roleElderly: 'Elderly User Experience',
    roleElderlyDesc: 'Gentle, large buttons, familiar memories and soothing games.',
    roleCaregiver: 'Caregiver Experience',
    roleCaregiverDesc: 'Manage family memories, view activity patterns & recommendations.',
    selectLanguage: 'Select Language',
    navHome: 'Home',
    navMemories: 'My Memories',
    navGames: 'Cognitive Games',
    navProgress: 'My Progress',
    navCarePulse: 'Care Pulse',
    navCareTag: 'Care Tag Concept',
    navSettings: 'Settings',
    greetingMorning: 'Good Morning',
    greetingAfternoon: 'Good Afternoon',
    greetingEvening: 'Good Evening',
    greetingSubtitle: "Let's explore some familiar memories together today.",
    todaysFocus: "Today's Focus",
    todaysFocusTitle: 'Places You Love',
    todaysFocusDesc: "Let's revisit familiar places and the special moments connected to them.",
    startActivity: 'Start Activity',
    todaysActivities: "Today's Activities",
    chooseGame: 'Choose a Game',
    photoRecallTitle: 'Photo Recall',
    photoRecallDesc: 'Recognize familiar faces and warm family moments.',
    objectMatchTitle: 'Object Match',
    objectMatchDesc: 'Match familiar everyday household items and rituals.',
    storyBuilderTitle: 'Story Builder',
    storyBuilderDesc: 'Arrange personal story events in a gentle sequence.',
    dailyRoutineTitle: 'Daily Routine',
    dailyRoutineDesc: 'Arrange familiar daily steps in your peaceful routine.',
    soundMemoryTitle: 'Sound Memory',
    soundMemoryDesc: 'Listen to familiar voices and beloved sounds.',
    myMemoriesTitle: 'My Memories',
    myMemoriesSubtitle: 'Organize personal photos, people, places, voices, and stories that power cognitive care.',
    addMemory: 'Add Memory',
    searchMemories: 'Search by person, place, or occasion...',
    allCategories: 'All Categories',
    listenInstruction: 'Read Aloud',
    nextQuestion: 'Continue',
    previousQuestion: 'Previous',
    finishActivity: 'Complete Activity',
    gentleEncouragement: 'Take your time. Every moment with your memories is precious.',
    wellDone: 'Wonderful! Beautifully done.',
    activityCompleted: 'Activity Completed',
    activitySummary: 'You spent wonderful gentle moments with your family memories today.',
    backToHome: 'Back to Home',
    carePulseTitle: 'Care Pulse',
    carePulseSubtitle: 'Understand activity patterns and plan meaningful support.',
    overallEngagement: 'Overall Engagement',
    activitiesCompleted: 'Activities Completed',
    activeDays: 'Active Days This Month',
    recentActivities: 'Recent Activities',
    recommendations: 'Care Recommendations',
    caregiverNotes: 'Caregiver Notes',
    addNote: 'Add Note',
    demoDataNotice: 'Sample demonstration profile — Lakshmi Amma (72).',
    medicalDisclaimer: 'SMRITI provides gentle cognitive engagement. It does not diagnose medical conditions or replace healthcare professionals.',
    offlineStatus: 'Offline Mode (Local Storage)',
    onlineStatus: 'Online & Synchronized'
  },
  ta: {
    brandTagline: 'அன்பான நினைவுகளிலிருந்து அர்த்தமுள்ள பராமரிப்பு வரை.',
    getStarted: 'தொடங்குங்கள்',
    tryDemo: 'மாதிரிப் பார்வை (லட்சுமி அம்மா)',
    chooseRoleTitle: 'ஸ்மிருதிக்கு நல்வரவு. நீங்கள் எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள்?',
    roleElderly: 'முதியோர் அனுபவம்',
    roleElderlyDesc: 'பெரிய எழுத்துகள், பழக்கமான நினைவுகள் மற்றும் அமைதியான பயிற்சிகள்.',
    roleCaregiver: 'பராமரிப்பாளர் அனுபவம்',
    roleCaregiverDesc: 'நினைவுகளைச் சேர்க்கவும், செயல்பாட்டு முறைகளை அறியவும்.',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    navHome: 'முகப்பு',
    navMemories: 'என் நினைவுகள்',
    navGames: 'நினைவுப் பயிற்சிகள்',
    navProgress: 'என் முன்னேற்றம்',
    navCarePulse: 'கவனிப்புத் துடிப்பு',
    navCareTag: 'கேர் டேக் கருப்பொருள்',
    navSettings: 'அமைப்புகள்',
    greetingMorning: 'காலை வணக்கம்',
    greetingAfternoon: 'மதிய வணக்கம்',
    greetingEvening: 'மாலை வணக்கம்',
    greetingSubtitle: 'இன்று நாம் சில இனிமையான குடும்ப நினைவுகளை அசைபோடுவோம்.',
    todaysFocus: 'இன்றைய முக்கியப் பார்வை',
    todaysFocusTitle: 'நீங்கள் விரும்பும் இடங்கள்',
    todaysFocusDesc: 'பழக்கமான இடங்களையும் அவற்றுடன் இணைந்த சிறப்பு தருணங்களையும் நினைவு கூர்வோம்.',
    startActivity: 'பயிற்சியைத் தொடங்கு',
    todaysActivities: 'இன்றைய செயல்பாடுகள்',
    chooseGame: 'ஒரு பயிற்சியைத் தேர்ந்தெடுக்கவும்',
    photoRecallTitle: 'புகைப்பட நினைவு',
    photoRecallDesc: 'பழக்கமான முகங்களையும் பாசமான தருணங்களையும் அடையாளம் காணுங்கள்.',
    objectMatchTitle: 'பொருள் பொருத்துதல்',
    objectMatchDesc: 'வீட்டுப் பொருட்களையும் அன்றாட மங்கலப் பொருட்களையும் பொருத்துங்கள்.',
    storyBuilderTitle: 'கதை உருவாக்கம்',
    storyBuilderDesc: 'குடும்ப நிகழ்வுகளை அமைதியான முறையில் வரிசைப்படுத்துங்கள்.',
    dailyRoutineTitle: 'தினசரி பழக்கம்',
    dailyRoutineDesc: 'உங்கள் காலை மற்றும் மாலை பழக்கங்களை வரிசைப்படுத்துங்கள்.',
    soundMemoryTitle: 'குரல் நினைவு',
    soundMemoryDesc: 'அன்பான குரல்களையும் பிடித்த ஒலிகளையும் கேளுங்கள்.',
    myMemoriesTitle: 'என் நினைவுகள்',
    myMemoriesSubtitle: 'புகைப்படங்கள், மனிதர்கள், இடங்கள் மற்றும் கதைகளை இங்கே சேமியுங்கள்.',
    addMemory: 'நினைவைச் சேர்',
    searchMemories: 'பெயர், இடம் அல்லது நிகழ்வு மூலம் தேடுங்கள்...',
    allCategories: 'அனைத்து பிரிவுகளும்',
    listenInstruction: 'வாசித்துக் காட்டு',
    nextQuestion: 'அடுத்து',
    previousQuestion: 'முந்தைய',
    finishActivity: 'நிறைவு செய்',
    gentleEncouragement: 'நிதானமாகச் செய்யுங்கள். உங்கள் நினைவுகள் எப்போதும் அருமையானவை.',
    wellDone: 'மிகவும் அருமை! சிறப்பாக முடித்தீர்கள்.',
    activityCompleted: 'பயிற்சி நிறைவுற்றது',
    activitySummary: 'இன்று உங்கள் நினைவுகளுடன் இனிமையான நேரத்தைச் செலவிட்டீர்கள்.',
    backToHome: 'முகப்புக்குச் செல்',
    carePulseTitle: 'கவனிப்புத் துடிப்பு (Care Pulse)',
    carePulseSubtitle: 'செயல்பாட்டு முறைகளைப் புரிந்து கொண்டு அன்பான ஆதரவை வழங்குங்கள்.',
    overallEngagement: 'ஒட்டுமொத்த ஈடுபாடு',
    activitiesCompleted: 'முடிக்கப்பட்ட பயிற்சிகள்',
    activeDays: 'செயல்பாட்டு நாட்கள்',
    recentActivities: 'சமீபத்திய செயல்பாடுகள்',
    recommendations: 'பரிந்துரைகள்',
    caregiverNotes: 'பராமரிப்பாளர் குறிப்புகள்',
    addNote: 'குறிப்பு சேர்க்க',
    demoDataNotice: 'மாதிரி சுயவிவரம் — லட்சுமி அம்மா (72 வயது).',
    medicalDisclaimer: 'ஸ்மிருதி என்பது அறிவாற்றல் ஈடுபாட்டிற்கானது. இது எந்த மருத்துவப் பரிசோதனையோ சிகிச்சையோ அல்ல.',
    offlineStatus: 'ஆஃப்லைன் முறை (உள்ளூர் சேமிப்பு)',
    onlineStatus: 'ஆன்லைனில் இணைக்கப்பட்டுள்ளது'
  },
  hi: {
    brandTagline: 'व्यक्तिगत स्मृतियों से सार्थक देखभाल तक।',
    getStarted: 'शुरू करें',
    tryDemo: 'डेमो देखें (लक्ष्मी अम्मा)',
    chooseRoleTitle: 'स्मृति में आपका स्वागत है। आप इसे कैसे अनुभव करना चाहते हैं?',
    roleElderly: 'वरिष्ठ नागरिक अनुभव',
    roleElderlyDesc: 'सरल बड़े बटन, जानी-पहचानी यादें और आरामदायक गतिविधियाँ।',
    roleCaregiver: 'देखभालकर्ता अनुभव',
    roleCaregiverDesc: 'पारिवारिक यादें जोड़ें, दैनिक पैटर्न और सुझाव देखें।',
    selectLanguage: 'भाषा चुनें',
    navHome: 'होम',
    navMemories: 'मेरी यादें',
    navGames: 'संज्ञानात्मक खेल',
    navProgress: 'मेरी प्रगति',
    navCarePulse: 'केयर पल्स',
    navCareTag: 'केयर टैग कॉन्सेप्ट',
    navSettings: 'सेटिंग्स',
    greetingMorning: 'शुभ प्रभात',
    greetingAfternoon: 'शुभ दोपहर',
    greetingEvening: 'शुभ संध्या',
    greetingSubtitle: 'आइए आज साथ मिलकर कुछ प्यारी पारिवारिक यादों को ताज़ा करें।',
    todaysFocus: 'आज का मुख्य विषय',
    todaysFocusTitle: 'पसंदीदा जगहें',
    todaysFocusDesc: 'आइए अपनी जानी-पहचानी जगहों और उनसे जुड़े खास पलों को याद करें।',
    startActivity: 'गतिविधि शुरू करें',
    todaysActivities: 'आज की गतिविधियाँ',
    chooseGame: 'एक खेल चुनें',
    photoRecallTitle: 'फोटो पहचान',
    photoRecallDesc: 'पारिवारिक चेहरों और सुखद पलों को पहचानें।',
    objectMatchTitle: 'वस्तु मिलान',
    objectMatchDesc: 'दैनिक जीवन और पूजा की जानी-पहचानी वस्तुओं को जोड़ें।',
    storyBuilderTitle: 'कहानी निर्माता',
    storyBuilderDesc: 'पारिवारिक प्रसंगों को एक क्रम में संजोएं।',
    dailyRoutineTitle: 'दैनिक दिनचर्या',
    dailyRoutineDesc: 'अपनी शांत सुबह और शाम की दिनचर्या को व्यवस्थित करें।',
    soundMemoryTitle: 'ध्वनि स्मृति',
    soundMemoryDesc: 'अपने प्रियजनों की आवाज़ें और जाने-पहचाने स्वर सुनें।',
    myMemoriesTitle: 'मेरी यादें',
    myMemoriesSubtitle: 'तस्वीरें, लोग, स्थान और कहानियाँ यहाँ सुरक्षित रखें।',
    addMemory: 'याद जोड़ें',
    searchMemories: 'नाम, स्थान या अवसर से खोजें...',
    allCategories: 'सभी श्रेणियां',
    listenInstruction: 'सुनें (बोलकर पढ़ें)',
    nextQuestion: 'आगे बढ़ें',
    previousQuestion: 'पिछला',
    finishActivity: 'समाप्त करें',
    gentleEncouragement: 'आराम से करें। अपनी यादों के साथ बिताया हर पल अनमोल है।',
    wellDone: 'बहुत बढ़िया! सुंदर प्रयास।',
    activityCompleted: 'गतिविधि संपन्न',
    activitySummary: 'आज आपने अपनी पारिवारिक यादों के साथ सुंदर समय बिताया।',
    backToHome: 'होम पर लौटें',
    carePulseTitle: 'केयर पल्स (Care Pulse)',
    carePulseSubtitle: 'दैनिक गतिविधियों को समझें और बेहतर सहयोग दें।',
    overallEngagement: 'कुल सहभागिता',
    activitiesCompleted: 'पूर्ण गतिविधियाँ',
    activeDays: 'सक्रिय दिन',
    recentActivities: 'हाल की गतिविधियाँ',
    recommendations: 'देखभाल सुझाव',
    caregiverNotes: 'देखभालकर्ता नोट्स',
    addNote: 'नोट जोड़ें',
    demoDataNotice: 'नमूना प्रोफाइल — लक्ष्मी अम्मा (72 वर्ष)।',
    medicalDisclaimer: 'स्मृति एक संज्ञानात्मक जुड़ाव मंच है। यह कोई चिकित्सीय निदान या उपचार नहीं है।',
    offlineStatus: 'ऑफ़लाइन मोड (स्थानीय डेटा)',
    onlineStatus: 'ऑनलाइन और सिंक्रनाइज़्ड'
  },
  as: {
    brandTagline: 'ব্যক্তিগত স্মৃতিৰ পৰা অৰ্থপূৰ্ণ যত্নলৈ।',
    getStarted: 'আৰম্ভ কৰক',
    tryDemo: 'ডেমো চাওক (লক্ষ্মী আম্মা)',
    chooseRoleTitle: 'স্মৃতিলৈ স্বাগতম। আপুনি কেনেদৰে ব্যৱহাৰ কৰিব বিচাৰে?',
    roleElderly: 'জ্যেষ্ঠ নাগৰিকৰ অনুভৱ',
    roleElderlyDesc: 'সহজ ডাঙৰ বুটাম, পৰিচিত স্মৃতি আৰু শান্তিদায়ক কাৰ্যকলাপ।',
    roleCaregiver: 'যত্নলোৱাৰ অভিজ্ঞতা',
    roleCaregiverDesc: 'পৰিয়ালৰ স্মৃতি সংৰক্ষণ কৰক আৰু অগ্ৰগতিৰ ধাৰা চাওক।',
    selectLanguage: 'ভাষা বাছক',
    navHome: 'মূল পৃষ্ঠা',
    navMemories: 'মোৰ স্মৃতিবোৰ',
    navGames: 'স্মৃতি খেল',
    navProgress: 'মোৰ অগ্ৰগতি',
    navCarePulse: 'কেয়াৰ পাল্ছ',
    navCareTag: 'কেয়াৰ টেগ ধাৰণা',
    navSettings: 'ছেটিংছ',
    greetingMorning: 'শুভ প্ৰভাত',
    greetingAfternoon: 'শুভ অপৰাহ্ন',
    greetingEvening: 'শুভ গধূলি',
    greetingSubtitle: 'আহক আজি আপোনাৰ মৰমৰ স্মৃতিবোৰ একেলগে সোঁৱৰণ কৰোঁ।',
    todaysFocus: 'আজিৰ বিশেষ লক্ষ্য',
    todaysFocusTitle: 'আপোনাৰ প্ৰিয় ঠাইবোৰ',
    todaysFocusDesc: 'পৰিচিত ঠাই আৰু সুমধুৰ মুহূৰ্তবোৰ পুনৰ উপভোগ কৰক।',
    startActivity: 'কাৰ্য আৰম্ভ কৰক',
    todaysActivities: 'আজিৰ কাৰ্যকলাপ',
    chooseGame: 'এটা খেল বাছক',
    photoRecallTitle: 'ফটো চিনাক্তকৰণ',
    photoRecallDesc: 'পৰিচিত মুখ আৰু আত্মীয়সকলক চিনাকি হওক।',
    objectMatchTitle: 'বস্তু মিলোৱা',
    objectMatchDesc: 'দৈনন্দিন ঘৰুৱা আৰু পৰম্পৰাগত বস্তুবোৰ মিল কৰক।',
    storyBuilderTitle: 'কাহিনী নিৰ্মাণ',
    storyBuilderDesc: 'পৰিয়ালৰ ঘটনাবোৰ এটা শান্ত শৃংখলাত সজাওক।',
    dailyRoutineTitle: 'দৈনিক ৰুটিন',
    dailyRoutineDesc: 'আপোনাৰ প্ৰিয় প্ৰভাতী আৰু দৈনিক নিয়মবোৰ সজাওক।',
    soundMemoryTitle: 'শব্দ স্মৃতি',
    soundMemoryDesc: 'প্ৰিয়জনৰ কণ্ঠ আৰু পৰিচিত ধ্বনি শুনক।',
    myMemoriesTitle: 'মোৰ স্মৃতিবোৰ',
    myMemoriesSubtitle: 'ছবি, ব্যক্তি, স্থান আৰু কাহিনীসমূহ ইয়াত সংৰক্ষণ কৰক।',
    addMemory: 'স্মৃতি যোগ কৰক',
    searchMemories: 'নাম, স্থান বা অনুষ্ঠান অনুসৰি সন্ধান কৰক...',
    allCategories: 'সকলো বিভাগ',
    listenInstruction: 'শব্দৰে শুনক',
    nextQuestion: 'পৰৱৰ্তী',
    previousQuestion: 'পূৰ্বৱৰ্তী',
    finishActivity: 'সম্পূৰ্ণ কৰক',
    gentleEncouragement: 'ধীৰে কৰক। স্মৃতিৰ সৈতে কটোৱা প্ৰতিটো মুহূৰ্ত অমূল্য।',
    wellDone: 'অতি সুন্দৰ! প্ৰচেষ্টা প্ৰশংসনীয়।',
    activityCompleted: 'কাৰ্য সম্পূৰ্ণ হ’ল',
    activitySummary: 'আজি আপুনি আপোনাৰ পৰিয়ালৰ স্মৃতিৰ সৈতে সুন্দৰ সময় কটালে।',
    backToHome: 'মূল পৃষ্ঠালৈ উভতি যাওক',
    carePulseTitle: 'কেয়াৰ পাল্ছ (Care Pulse)',
    carePulseSubtitle: 'কাৰ্যকলাপৰ ধাৰা বুজি অৰ্থপূৰ্ণ সহায় আগবঢ়াওক।',
    overallEngagement: 'সামগ্ৰিক অংশগ্ৰহণ',
    activitiesCompleted: 'সম্পূৰ্ণ খেলসমূহ',
    activeDays: 'সক্ৰিয় দিনবোৰ',
    recentActivities: 'শেহতীয়া কাৰ্যকলাপ',
    recommendations: 'যত্নৰ পৰামৰ্শ',
    caregiverNotes: 'যত্নলোৱাৰ টোকা',
    addNote: 'টোকা যোগ কৰক',
    demoDataNotice: 'নমুনা প্ৰফাইল — লক্ষ্মী আম্মা (৭২ বছৰ)।',
    medicalDisclaimer: 'স্মৃতি এক বৌদ্ধিক কাৰ্যকলাপৰ মঞ্চ। ই কোনো চিকিৎসা নিদান নহয়।',
    offlineStatus: 'অফলাইন মোড (স্থানীয় সংৰক্ষণ)',
    onlineStatus: 'অনলাইন আৰু সংলগ্ন'
  }
};
