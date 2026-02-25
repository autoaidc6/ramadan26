
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ReflectionCard from './components/ReflectionCard';
import RamadanTracker from './components/RamadanTracker';
import QuranTracker from './components/QuranTracker';
import PrintablesGallery from './components/PrintablesGallery';
import AdminDashboard from './components/AdminDashboard';
import TraditionsSection from './components/TraditionsSection';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Reflection } from './types';
import { RAMADAN_2026 } from './constants';

const REFLECTIONS: Reflection[] = [
  {
    id: '1',
    day: 1,
    arabicAyah: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
    ayah: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.",
    reflectionText: "Ramadan begins with the intention of Taqwa (God-consciousness). Fasting is a shield that protects the soul and sharpens our spiritual focus.",
    journalQuestion: "What is your primary intention for this Ramadan? How do you hope to change by the end of these 30 days?",
    dua: "Allahumma laka sumtu wa bika amantu wa 'ala rizqika aftartu."
  },
  {
    id: '2',
    day: 2,
    arabicAyah: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ",
    ayah: "The month of Ramadhan [is that] in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion.",
    reflectionText: "The Quran is the heart of Ramadan. It is the light that guides us through the darkness and the criterion that helps us distinguish right from wrong.",
    journalQuestion: "How can you make the Quran a more central part of your daily life this month?",
    dua: "Allahumma ij'alil-Qur'ana rabi'a qulubina wa nura sudurina."
  },
  {
    id: '3',
    day: 3,
    arabicAyah: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
    ayah: "And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    reflectionText: "Allah is closer to us than our jugular vein. He hears every whisper of our hearts. Ramadan is the perfect time to strengthen our personal connection through Dua.",
    journalQuestion: "If you could ask Allah for one thing that would transform your spiritual state, what would it be?",
    dua: "Ya Hayyu Ya Qayyum, bi rahmatika astagheeth."
  },
  {
    id: '4',
    day: 4,
    arabicAyah: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    ayah: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    reflectionText: "Patience and prayer are the two wings that carry the believer through trials. Fasting is the ultimate exercise in Sabr (patience).",
    journalQuestion: "In what area of your life do you need more patience right now? How can prayer help you achieve it?",
    dua: "Rabbana afrigh 'alayna sabran wa tawaffana muslimeen."
  },
  {
    id: '5',
    day: 5,
    arabicAyah: "وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ",
    ayah: "And hasten to forgiveness from your Lord and a garden as wide as the heavens and earth, prepared for the righteous.",
    reflectionText: "Ramadan is a race towards mercy. We should not delay our repentance or our good deeds. The gates of Paradise are open.",
    journalQuestion: "What is one thing you are holding onto that you need to ask forgiveness for today?",
    dua: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni."
  },
  {
    id: '6',
    day: 6,
    arabicAyah: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ",
    ayah: "So by mercy from Allah, [O Muhammad], you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you.",
    reflectionText: "Kindness and gentleness are signs of a heart touched by divine mercy. Our character while fasting should reflect this softness.",
    journalQuestion: "How can you show more leniency and kindness to those around you today, especially when you feel tired or hungry?",
    dua: "Allahumma ahsin khuluqi kama ahsanta khalqi."
  },
  {
    id: '7',
    day: 7,
    arabicAyah: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
    ayah: "Indeed, prayer has been decreed upon the believers a decree of specified times.",
    reflectionText: "Our prayers anchor our day. In Ramadan, we find rhythm in the sacred timings of Suhoor, Salah, and Iftar.",
    journalQuestion: "How does observing the prayer times strictly change your perception of time and productivity?",
    dua: "Rabbi-j'alni muqeemas-salati wa min dhurriyyati."
  },
  {
    id: '8',
    day: 8,
    arabicAyah: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا",
    ayah: "This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.",
    reflectionText: "Gratitude for the gift of Islam is a central theme of a believer's life. We are blessed to have a clear path to follow.",
    journalQuestion: "What are three specific blessings of being a Muslim that you are most grateful for today?",
    dua: "Radhitu billahi Rabban wa bil-Islami deenan wa bi Muhammadin nabiyya."
  },
  {
    id: '9',
    day: 9,
    arabicAyah: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
    ayah: "Say, 'Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.'",
    reflectionText: "Total devotion means living every moment for the sake of Allah. Ramadan helps us realign our entire existence with this purpose.",
    journalQuestion: "How can you turn a mundane daily task into an act of worship today?",
    dua: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatika."
  },
  {
    id: '10',
    day: 10,
    arabicAyah: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
    ayah: "But My mercy encompasses all things.",
    reflectionText: "As we conclude the first ten days—the days of Mercy—we reflect on how Allah's love and compassion surround us even when we fail.",
    journalQuestion: "Where have you seen Allah's mercy manifest in your life during the past ten days?",
    dua: "Rabbi-ghfir warham wa Anta khayrur-rahimeen."
  },
  {
    id: '11',
    day: 11,
    arabicAyah: "إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آيَاتُهُ زَادَتْهُمْ إِيمَانًا",
    ayah: "The believers are only those who, when Allah is mentioned, their hearts become fearful, and when His verses are recited to them, it increases them in faith.",
    reflectionText: "Entering the days of Forgiveness, we seek to soften our hearts so they vibrate with the mention of our Creator.",
    journalQuestion: "Does your heart feel softer today than it did on Day 1? What has contributed to this change?",
    dua: "Ya Muqallibal-qulub, thabbit qalbi 'ala deenik."
  },
  {
    id: '12',
    day: 12,
    arabicAyah: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
    ayah: "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase.",
    reflectionText: "Charity is not just about helping others; it is a purification for our own souls. It removes greed and attachment to the material world.",
    journalQuestion: "In what way can you give today—whether it's wealth, time, or a kind word—to purify your heart?",
    dua: "Allahumma barik lana feema razaqtana."
  },
  {
    id: '13',
    day: 13,
    arabicAyah: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayah: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.",
    reflectionText: "In a world of noise and anxiety, Dhikr (remembrance) is the only true source of tranquility. Let your tongue stay moist with His praise.",
    journalQuestion: "When do you feel most at peace? How can you incorporate more Dhikr into those moments?",
    dua: "Subhanallahi wa bihamdihi, Subhanallahil-'Azheem."
  },
  {
    id: '14',
    day: 14,
    arabicAyah: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    ayah: "If you are grateful, I will surely increase you [in favor].",
    reflectionText: "Gratitude is the key to abundance. When we focus on what we have, Allah blesses us with more. When we focus on what we lack, we lose sight of His grace.",
    journalQuestion: "List five small things you often take for granted but are deeply grateful for today.",
    dua: "Alhamdulillah 'ala kulli hal."
  },
  {
    id: '15',
    day: 15,
    arabicAyah: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا وَّالَّذِينَ هُم مُّحْسِنُونَ",
    ayah: "Indeed, Allah is with those who fear Him and those who are doers of good.",
    reflectionText: "We are halfway through. This is the time to renew our Ihsan—doing everything as if we see Allah, or knowing that He sees us.",
    journalQuestion: "How can you elevate the quality of your worship today? What would 'excellence' look like in your next prayer?",
    dua: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatika."
  },
  {
    id: '16',
    day: 16,
    arabicAyah: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى",
    ayah: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa.",
    reflectionText: "Reflecting on the miraculous journeys of the soul. Our prayers are our own 'Mi'raj'—a way to ascend and meet our Lord daily.",
    journalQuestion: "Do you treat your prayer as a meeting with the Divine, or as a task to be completed?",
    dua: "Allahumma inni as'aluka hubbak wa hubba man yuhibbuk."
  },
  {
    id: '17',
    day: 17,
    arabicAyah: "إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    ayah: "When the youths retreated to the cave and said, 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.'",
    reflectionText: "Sometimes we must retreat from the world to find ourselves and our Lord. Ramadan is our spiritual cave.",
    journalQuestion: "What distractions do you need to 'retreat' from for the remainder of this month?",
    dua: "Rabbana atina mil-ladunka rahmatan wa hayyi' lana min amrina rashada."
  },
  {
    id: '18',
    day: 18,
    arabicAyah: "قَالَ رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي",
    ayah: "[Moses] said, 'My Lord, expand for me my breast [with assurance] and ease for me my task.'",
    reflectionText: "True ease comes from an expanded heart. When Allah opens our chests, even the most difficult path becomes manageable.",
    journalQuestion: "What 'tightness' are you feeling in your heart? Ask Allah to expand it with His light.",
    dua: "Rabbi-shrah li sadri wa yassir li amri."
  },
  {
    id: '19',
    day: 19,
    arabicAyah: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    ayah: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reflectionText: "The prayer of Yunus (AS) in the belly of the whale is the ultimate cry of the soul in distress. Admission of our faults is the first step to relief.",
    journalQuestion: "What 'darkness' are you currently in? How can this Dua be your light to get out?",
    dua: "La ilaha illa Anta subhanaka inni kuntu minaz-zhalimeen."
  },
  {
    id: '20',
    day: 20,
    arabicAyah: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    ayah: "Allah is the Light of the heavens and the earth.",
    reflectionText: "As we enter the final ten nights, we search for the ultimate light. May Allah illuminate our hearts, our homes, and our graves.",
    journalQuestion: "How can you be a source of light for someone else today?",
    dua: "Allahummaj-'al fi qalbi nuran wa fi basari nuran."
  },
  {
    id: '21',
    day: 21,
    arabicAyah: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    ayah: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    reflectionText: "The first of the last ten nights. We pray for our families and for our legacy. We seek to be leaders in goodness.",
    journalQuestion: "What kind of spiritual legacy do you want to leave for your children or those who look up to you?",
    dua: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun."
  },
  {
    id: '22',
    day: 22,
    arabicAyah: "إِنَّ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ... أَعَدَّ اللَّهُ لَهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا",
    ayah: "Indeed, the Muslim men and Muslim women, the believing men and believing women... Allah has prepared for them forgiveness and a great reward.",
    reflectionText: "Equality in spiritual potential. Every soul has the chance to reach the highest stations through devotion and consistency.",
    journalQuestion: "Which of the qualities mentioned in Surah Ahzab v35 do you feel you need to work on most?",
    dua: "Allahumma inni as'alukal-jannata wa ma qarraba ilayha min qawlin aw 'amal."
  },
  {
    id: '23',
    day: 23,
    arabicAyah: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    ayah: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah.'",
    reflectionText: "Despair is a trick of the devil. Allah's mercy is greater than any sin. It is never too late to turn back.",
    journalQuestion: "Is there a sin you think is too big to be forgiven? Remind yourself of this verse and let it go.",
    dua: "Astaghfirullahal-'Azheem wa atubu ilayh."
  },
  {
    id: '24',
    day: 24,
    arabicAyah: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    ayah: "And your Lord says, 'Call upon Me; I will respond to you.'",
    reflectionText: "The promise of response. Allah loves to be asked. These final nights are for the most sincere and desperate of our requests.",
    journalQuestion: "Make a list of 10 things you want to ask Allah for tonight. Be bold in your requests.",
    dua: "Allahumma inni as'aluka min khayri ma sa'alaka minhu nabiyyuka Muhammad."
  },
  {
    id: '25',
    day: 25,
    arabicAyah: "وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
    ayah: "And those who have responded to their lord and established prayer and whose affair is [determined by] consultation among themselves.",
    reflectionText: "Community and consultation. We are not meant to walk this path alone. We support each other in faith.",
    journalQuestion: "Who in your community can you reach out to today to offer support or seek advice?",
    dua: "Allahumma-llif bayna qulubina."
  },
  {
    id: '26',
    day: 26,
    arabicAyah: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
    ayah: "The believers are but brothers, so make settlement between your brothers.",
    reflectionText: "Brotherhood and sisterhood. Ramadan is a time to mend broken relationships and forgive those who have wronged us.",
    journalQuestion: "Is there someone you are holding a grudge against? Can you find it in your heart to forgive them for Allah's sake?",
    dua: "Allahumma-ghfir lana wa li ikhwaninal-ladheena sabaquna bil-iman."
  },
  {
    id: '27',
    day: 27,
    arabicAyah: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ",
    ayah: "Indeed, We sent the Qur'an down during the Night of Decree.",
    reflectionText: "The night better than a thousand months. A lifetime of worship in a single night. Seek it with every fiber of your being.",
    journalQuestion: "If tonight is Laylatul Qadr, how would you spend every single second of it?",
    dua: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni."
  },
  {
    id: '28',
    day: 28,
    arabicAyah: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    ayah: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
    reflectionText: "Taqwa is the solution to every problem. When we put Allah first, He opens doors we didn't even know existed.",
    journalQuestion: "Reflect on a time when Allah provided for you from an unexpected source. How did that feel?",
    dua: "Hasbunallahu wa ni'mal wakeel."
  },
  {
    id: '29',
    day: 29,
    arabicAyah: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ayah: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
    reflectionText: "Ease is not what comes after hardship; it is what accompanies it. Allah never gives a burden without the strength to carry it.",
    journalQuestion: "What ease have you found within the hardships of this month's fasting?",
    dua: "Allahumma la sahla illa ma ja'altahu sahla."
  },
  {
    id: '30',
    day: 30,
    arabicAyah: "وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ",
    ayah: "And [He wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.",
    reflectionText: "We have reached the end. We celebrate not because the fast is over, but because we were guided to complete it. Our hearts are full of Takbir and Shukr.",
    journalQuestion: "How has your soul changed over these 30 days? What will you carry forward into the rest of the year?",
    dua: "Allahu Akbar, Allahu Akbar, La ilaha illallah, Allahu Akbar, Allahu Akbar, wa lillahil-hamd."
  }
];

const MainContent: React.FC = () => {
  const { role } = useAuth();
  const { theme } = useTheme();

  const ramadanDay = (() => {
    const now = new Date();
    const start = RAMADAN_2026.startDate;
    const diffTime = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (now < start) return 0;
    return Math.min(30, diffDays);
  })();

  const progressPercent = (ramadanDay / 30) * 100;

  useEffect(() => {
    const observerOptions = { 
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once active, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#D4AF37] selection:text-[#0a1128] overflow-x-hidden pattern-islamic ${
      theme === 'dark' 
        ? 'bg-[#0a1128] text-[#f1f5f9]' 
        : 'bg-[#fdfcf0] text-[#0a1128]'
    }`}>
      <Navbar />
      
      {/* Background Floating Element */}
      <div className={`fixed top-[15%] -right-[10%] w-[600px] h-[600px] pointer-events-none animate-slow-spin select-none transition-opacity duration-1000 ${
        theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.07]'
      }`}>
        <svg viewBox="0 0 24 24" fill="#D4AF37">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center pt-20">
          <div className="text-center lg:text-left reveal">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">NoorNest Premium Experience</span>
            </div>
            <h1 className={`font-serif text-6xl md:text-8xl font-medium mb-8 leading-[1.05] tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Elevate Your <br /><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F1D279] to-[#D4AF37] bg-[length:200%_auto] animate-shimmer">Spirit</span></h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 font-light leading-relaxed">A curated digital sanctuary for the modern believer. Experience a month of growth, reflection, and sacred traditions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <a href="#tracker" className="group relative w-full sm:w-auto px-12 py-5 bg-[#D4AF37] text-[#050a14] font-bold tracking-widest rounded-full overflow-hidden transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 text-center text-xs uppercase">Begin Experience</a>
              <a href="#calendar" className={`w-full sm:w-auto px-12 py-5 border font-bold tracking-widest rounded-full transition-all duration-300 text-center text-xs uppercase ${
                theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}>Daily Reflections</a>
            </div>
          </div>
          <div className="relative flex justify-center items-center reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="relative animate-float-luxury">
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[80px] rounded-full animate-glow-pulse"></div>
              
              {/* Decorative Crescent behind lantern */}
              <div className={`absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 transition-opacity duration-1000 ${
                theme === 'dark' ? 'opacity-10' : 'opacity-20'
              }`}>
                <svg viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              </div>

              <svg width="320" height="440" viewBox="0 0 280 400" fill="none" className="drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                {/* Top Ring */}
                <circle cx="140" cy="30" r="12" stroke="#D4AF37" strokeWidth="3" />
                
                {/* Top Cap */}
                <path d="M140 42L195 95H85L140 42Z" fill="#D4AF37" />
                <path d="M100 95C100 75 180 75 180 95" stroke="#D4AF37" strokeWidth="2" fill="none" />
                
                {/* Main Body Frame */}
                <path d="M80 95H200V310H80V95Z" stroke="#D4AF37" strokeWidth="4" fill={theme === 'dark' ? 'rgba(212, 175, 55, 0.05)' : 'rgba(212, 175, 55, 0.02)'} />
                
                {/* Vertical Pillars */}
                <rect x="105" y="95" width="3" height="215" fill="#D4AF37" opacity="0.6" />
                <rect x="172" y="95" width="3" height="215" fill="#D4AF37" opacity="0.6" />
                
                {/* Decorative Arches */}
                <path d="M80 135C100 115 120 115 140 135C160 115 180 115 200 135" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M80 270C100 290 120 290 140 270C160 290 180 290 200 270" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.8" />
                
                {/* Inner Light/Glow */}
                <circle cx="140" cy="205" r="65" fill="url(#luxuryLanternGlow)" />
                
                {/* Base */}
                <path d="M70 310H210L225 355H55L70 310Z" fill="#D4AF37" />
                <rect x="85" y="355" width="110" height="12" rx="6" fill="#D4AF37" />

                <defs>
                  <radialGradient id="luxuryLanternGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(140 205) rotate(90) scale(110)">
                    <stop stopColor="#F1D279" />
                    <stop offset="0.5" stopColor="#D4AF37" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Section (Conditional) */}
      {role === 'admin' && (
        <section id="admin" className={`py-32 border-y scroll-mt-20 ${theme === 'dark' ? 'bg-[#0a1128] border-white/5' : 'bg-white border-slate-100'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <AdminDashboard />
          </div>
        </section>
      )}

      {/* Tracker Section */}
      <section id="tracker" className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-white text-[#0a1128]' : 'bg-slate-100 text-slate-900'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Discipline & Grace</span>
             <h2 className="font-serif text-5xl md:text-6xl mb-6">Ramadan Journey</h2>
          </div>
          <RamadanTracker />
        </div>
      </section>

      {/* Quran Section */}
      <section id="quran" className={`py-32 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a1128]' : 'bg-white'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Divine Revelation</span>
             <h2 className={`font-serif text-5xl md:text-6xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quran Sanctuary</h2>
          </div>
          <QuranTracker />
        </div>
      </section>

      {/* Printables Section */}
      <section id="printables" className={`py-32 relative ${theme === 'dark' ? 'bg-slate-50 text-[#0a1128]' : 'bg-slate-200 text-slate-900'}`}>
        <div className="container mx-auto px-6 reveal">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Physical Tools</span>
             <h2 className="font-serif text-5xl md:text-6xl mb-6">Sacred Resources</h2>
          </div>
          <PrintablesGallery />
        </div>
      </section>

      {/* Reflections Section */}
      <section id="calendar" className={`py-32 scroll-mt-20 ${theme === 'dark' ? 'bg-[#0a1128]' : 'bg-white'}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto reveal">
             <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Daily Wisdom</span>
             <h2 className={`font-serif text-5xl md:text-6xl mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Meditations</h2>
             <p className="text-slate-500 font-light">A journey through the 30 days of Ramadan, offering a moment of peace and contemplation for every soul.</p>
          </div>

          {/* Today's Focus - Now at the Top */}
          <div className={`mb-16 p-8 md:p-12 rounded-3xl border reveal max-w-5xl mx-auto ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex-1">
                <h3 className={`font-serif text-3xl mb-8 ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-[#0a1128]'}`}>Today's Focus</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Best Time for Dua</p>
                      <p className="text-slate-500 text-sm font-light leading-relaxed">The last third of the night and just before Iftar are the most sacred moments for your heart's requests.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Daily Act of Kindness</p>
                      <p className="text-slate-500 text-sm font-light leading-relaxed">Share a meal, offer a smile, or help a neighbor. Small deeds carry immense weight this month.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`md:w-64 shrink-0 md:pl-10 md:border-l ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Ramadan Progress</p>
                <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className={`text-[10px] italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Day {ramadanDay} of 30 • {ramadanDay <= 10 ? 'Days of Mercy' : ramadanDay <= 20 ? 'Days of Forgiveness' : 'Days of Protection'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {REFLECTIONS.slice(0, 6).map((reflection, idx) => (
                <div key={reflection.id} className="reveal h-full" style={{ transitionDelay: `${idx * 0.1}s` }}>
                  <ReflectionCard reflection={reflection} />
                </div>
              ))}
            </div>
            <div className="mt-16 text-center reveal">
              <button className={`px-12 py-4 border rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-luxury ${
                theme === 'dark' ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}>
                Explore Full 30-Day Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section id="traditions" className="py-32 px-6 max-w-7xl mx-auto text-center relative z-10 reveal">
        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Sacred Legacy</span>
        <h2 className="font-serif text-5xl md:text-6xl text-[#D4AF37] mb-20">Ancient Roots</h2>
        <TraditionsSection />
      </section>

      <footer className={`py-24 border-t text-center ${theme === 'dark' ? 'bg-[#0a1128] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <p className={`font-serif text-xl mb-4 tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>NoorNest</p>
        <p className="text-slate-500 text-[10px] tracking-[0.5em] uppercase">&copy; 1445 AH • Premium Spiritual Lifestyle</p>
      </footer>

      <style>{`
        @keyframes slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-slow-spin { animation: slow-spin 120s linear infinite; }
        @keyframes float-luxury { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(1deg); } }
        .animate-float-luxury { animation: float-luxury 8s ease-in-out infinite; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .animate-shimmer { animation: shimmer 4s linear infinite; background-size: 200% 200%; }
        @keyframes glow-pulse { 0%, 100% { opacity: 0.15; transform: scale(0.95); } 50% { opacity: 0.3; transform: scale(1.05); } }
        .animate-glow-pulse { animation: glow-pulse 5s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  </AuthProvider>
);

export default App;
